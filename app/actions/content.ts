'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/auth';

export interface ContentRow {
  section: string;
  content_key: string;
  content_value: string;
  content_type?: 'text' | 'json';
}

/**
 * Save a single content field to Supabase (upsert).
 */
export async function saveContent(
  section: string,
  content_key: string,
  content_value: string,
  content_type: 'text' | 'json' = 'text'
): Promise<{ success: boolean; error?: string }> {
  const user = await requireAdmin();

  const supabase = await createClient();
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
  revalidatePath('/admin');
  return { success: true };
}

/**
 * Save multiple content fields at once.
 */
export async function saveBulkContent(
  items: ContentRow[]
): Promise<{ success: boolean; error?: string }> {
  const user = await requireAdmin();

  const supabase = await createClient();
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
  return { success: true };
}

/**
 * Reset a single field to its static default (delete from DB).
 */
export async function resetContent(
  section: string,
  content_key: string
): Promise<{ success: boolean; error?: string }> {
  await requireAdmin();

  const supabase = await createClient();
  const { error } = await supabase
    .from('site_content')
    .delete()
    .eq('section', section)
    .eq('content_key', content_key);

  if (error) return { success: false, error: error.message };

  revalidatePath('/');
  revalidatePath('/services');
  revalidatePath('/admin');
  return { success: true };
}

/**
 * Get all saved content for display in admin dashboard.
 */
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
