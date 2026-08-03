'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

/**
 * Login action — validates email/password against Supabase Auth.
 */
export async function loginAction(
  _state: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string } | undefined> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Το email και ο κωδικός πρόσβασης είναι υποχρεωτικά.' };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: 'Μη έγκυρο email ή κωδικός πρόσβασης. Παρακαλώ δοκιμάστε ξανά.' };
  }

  redirect('/admin');
}

/**
 * Logout action — signs out and redirects to login.
 */
export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/admin/login');
}
