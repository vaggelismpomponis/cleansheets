import 'server-only';
import { cache } from 'react';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

/**
 * Verify the current session — returns user or null.
 * Wrapped in React cache() so it's only called once per request.
 */
export const getSession = cache(async () => {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;
  return user;
});

/**
 * Require admin session — redirects to login if not authenticated.
 * Use this in admin page Server Components.
 */
export const requireAdmin = cache(async () => {
  const user = await getSession();
  if (!user) {
    redirect('/admin/login');
  }
  return user;
});
