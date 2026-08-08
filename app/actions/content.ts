'use server';

import { after } from 'next/server';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/auth';

export interface ContentRow {
  section: string;
  content_key: string;
  content_value: string;
  content_type?: 'text' | 'json';
}

export interface ChangeLogEntry {
  id: string;
  changed_at: string;
  changed_by: string | null;
  changed_by_email: string | null;
  section: string;
  content_key: string;
  action: 'save' | 'reset';
  old_value: string | null;
  new_value: string | null;
}

export interface ChangeLogResult {
  entries: ChangeLogEntry[];
  totalCount: number;
  error?: string;
}

export interface UserChangeStat {
  email: string;
  count: number;
}

// ──────────────────────────────────────────────────────────────
// Internal: fire-and-forget audit log writer (runs after response)
// ──────────────────────────────────────────────────────────────

async function writeChangeLog(
  userId: string,
  userEmail: string,
  section: string,
  content_key: string,
  action: 'save' | 'reset',
  old_value: string | null,
  new_value: string | null
) {
  try {
    const supabase = await createClient();
    await supabase.from('content_change_log').insert({
      changed_by: userId,
      changed_by_email: userEmail,
      section,
      content_key,
      action,
      old_value,
      new_value,
    });
  } catch {
    // Logging must never break content saves — swallow errors silently
  }
}

// Fetch the current stored value for a field (to capture old_value)
async function fetchCurrentValue(
  supabase: Awaited<ReturnType<typeof createClient>>,
  section: string,
  content_key: string
): Promise<string | null> {
  const { data } = await supabase
    .from('site_content')
    .select('content_value')
    .eq('section', section)
    .eq('content_key', content_key)
    .maybeSingle();

  return data?.content_value ?? null;
}

// ──────────────────────────────────────────────────────────────
// Save a single content field to Supabase (upsert)
// ──────────────────────────────────────────────────────────────

export async function saveContent(
  section: string,
  content_key: string,
  content_value: string,
  content_type: 'text' | 'json' = 'text'
): Promise<{ success: boolean; error?: string }> {
  const user = await requireAdmin();

  const supabase = await createClient();

  // Capture old value before upsert (for audit log)
  const old_value = await fetchCurrentValue(supabase, section, content_key);

  const { error } = await supabase.from('site_content').upsert(
    {
      section,
      content_key,
      content_value,
      content_type,
      updated_by: user.id,
    },
    { onConflict: 'section,content_key' }
  );

  if (error) return { success: false, error: error.message };

  revalidatePath('/');
  revalidatePath('/services');
  revalidatePath('/careers');
  revalidatePath('/admin');

  // Write audit log after the response is sent (non-blocking)
  after(() =>
    writeChangeLog(
      user.id,
      user.email ?? 'unknown',
      section,
      content_key,
      'save',
      old_value,
      content_value
    )
  );

  return { success: true };
}

// ──────────────────────────────────────────────────────────────
// Save multiple content fields at once
// ──────────────────────────────────────────────────────────────

export async function saveBulkContent(
  items: ContentRow[]
): Promise<{ success: boolean; error?: string }> {
  const user = await requireAdmin();

  const supabase = await createClient();

  // Capture old values for each item (in parallel)
  const oldValues = await Promise.all(
    items.map((item) => fetchCurrentValue(supabase, item.section, item.content_key))
  );

  const rows = items.map((item) => ({
    ...item,
    content_type: item.content_type ?? 'text',
    updated_by: user.id,
  }));

  const { error } = await supabase
    .from('site_content')
    .upsert(rows, { onConflict: 'section,content_key' });

  if (error) return { success: false, error: error.message };

  revalidatePath('/');
  revalidatePath('/services');
  revalidatePath('/admin');

  // Write one audit log entry per field, after the response
  after(async () => {
    for (let i = 0; i < items.length; i++) {
      await writeChangeLog(
        user.id,
        user.email ?? 'unknown',
        items[i].section,
        items[i].content_key,
        'save',
        oldValues[i],
        items[i].content_value
      );
    }
  });

  return { success: true };
}

// ──────────────────────────────────────────────────────────────
// Reset a single field to its static default (delete from DB)
// ──────────────────────────────────────────────────────────────

export async function resetContent(
  section: string,
  content_key: string
): Promise<{ success: boolean; error?: string }> {
  const user = await requireAdmin();

  const supabase = await createClient();

  // Capture the value being reset before deleting
  const old_value = await fetchCurrentValue(supabase, section, content_key);

  const { error } = await supabase
    .from('site_content')
    .delete()
    .eq('section', section)
    .eq('content_key', content_key);

  if (error) return { success: false, error: error.message };

  revalidatePath('/');
  revalidatePath('/services');
  revalidatePath('/admin');

  after(() =>
    writeChangeLog(
      user.id,
      user.email ?? 'unknown',
      section,
      content_key,
      'reset',
      old_value,
      null
    )
  );

  return { success: true };
}

// ──────────────────────────────────────────────────────────────
// Get all saved content for display in admin dashboard
// ──────────────────────────────────────────────────────────────

export async function getAllSavedContent(): Promise<ContentRow[]> {
  await requireAdmin();

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('site_content')
    .select('section, content_key, content_value, content_type, updated_at')
    .order('updated_at', { ascending: false });

  if (error || !data) return [];
  return data;
}

// ──────────────────────────────────────────────────────────────
// Get paginated change log (super-admin only — caller must guard)
// ──────────────────────────────────────────────────────────────

const PAGE_SIZE = 50;

export async function getChangeLog(page: number = 1): Promise<ChangeLogResult> {
  await requireAdmin();

  const supabase = await createClient();
  const offset = (page - 1) * PAGE_SIZE;

  // Total count (for pagination controls)
  const { count, error: countError } = await supabase
    .from('content_change_log')
    .select('*', { count: 'exact', head: true });

  if (countError) {
    return { entries: [], totalCount: 0, error: countError.message };
  }

  // Page of entries
  const { data, error } = await supabase
    .from('content_change_log')
    .select(
      'id, changed_at, changed_by, changed_by_email, section, content_key, action, old_value, new_value'
    )
    .order('changed_at', { ascending: false })
    .range(offset, offset + PAGE_SIZE - 1);

  if (error) {
    return { entries: [], totalCount: count ?? 0, error: error.message };
  }

  return {
    entries: (data ?? []) as ChangeLogEntry[],
    totalCount: count ?? 0,
  };
}
