'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { requireAdmin } from '@/lib/auth';

/** Only this email can perform user-management operations. */
const SUPER_ADMIN_EMAIL = 'ebomponis@gmail.com';

async function requireSuperAdmin() {
  const user = await requireAdmin();
  if (user.email !== SUPER_ADMIN_EMAIL) {
    throw new Error('Δεν επιτρέπεται η πρόσβαση.');
  }
  return user;
}

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

/**
 * Invite a new admin user by email — sends an invitation email via Supabase.
 * Requires an existing admin session.
 */
export async function inviteUserAction(
  _state: { error?: string; success?: string } | undefined,
  formData: FormData
): Promise<{ error?: string; success?: string }> {
  // Ensure caller is the super-admin
  await requireSuperAdmin();

  const email = (formData.get('email') as string)?.trim().toLowerCase();

  if (!email) {
    return { error: 'Το email είναι υποχρεωτικό.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: 'Μη έγκυρη μορφή email.' };
  }

  const adminClient = createAdminClient();
  const { error } = await adminClient.auth.admin.inviteUserByEmail(email, {
    // Use the explicit redirect base — must be whitelisted in Supabase → Auth → URL Configuration
    redirectTo: `${process.env.SUPABASE_REDIRECT_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/admin/invite`,
  });

  if (error) {
    // Log full error server-side for debugging
    console.error('[inviteUserAction] Supabase error:', JSON.stringify(error, null, 2));

    const msg = error.message ?? '';
    const errorStr = msg || JSON.stringify(error);

    if (errorStr.toLowerCase().includes('already')) {
      return { error: 'Ο χρήστης με αυτό το email υπάρχει ήδη.' };
    }
    if (errorStr.toLowerCase().includes('rate limit') || errorStr.toLowerCase().includes('rate_limit')) {
      return { error: 'Υπερβήκατε το όριο αποστολής email. Αναμείνετε λίγο και δοκιμάστε ξανά.' };
    }
    if (errorStr.toLowerCase().includes('invalid login') || errorStr.toLowerCase().includes('authentication failed') || errorStr.toLowerCase().includes('535')) {
      return { error: 'Λάθος SMTP username/password. Βεβαιωθείτε ότι χρησιμοποιείτε Google App Password (όχι τον κανονικό κωδικό Gmail).' };
    }
    if (!msg || errorStr === '{}') {
      return { error: 'Αποτυχία αποστολής email (άγνωστο σφάλμα). Ελέγξτε τα SMTP credentials στο Supabase Dashboard και βεβαιωθείτε ότι χρησιμοποιείτε Google App Password.' };
    }
    return { error: `Σφάλμα: ${errorStr}` };
  }

  return { success: `Η πρόσκληση στάλθηκε επιτυχώς στο ${email}.` };
}

/**
 * List all registered admin users — uses service role to bypass RLS.
 */
export async function listUsersAction(): Promise<{
  users: Array<{ id: string; email: string; created_at: string; last_sign_in_at: string | null; invited_at: string | null }>;
  error?: string;
}> {
  await requireSuperAdmin();

  const adminClient = createAdminClient();
  const { data, error } = await adminClient.auth.admin.listUsers();

  if (error) {
    return { users: [], error: error.message };
  }

  return {
    users: data.users.map((u) => ({
      id: u.id,
      email: u.email ?? '—',
      created_at: u.created_at,
      last_sign_in_at: u.last_sign_in_at ?? null,
      invited_at: ((u as unknown) as Record<string, unknown>).invited_at as string | null ?? null,
    })),
  };
}

/**
 * Delete an admin user by ID — irreversible.
 */
export async function deleteUserAction(userId: string): Promise<{ error?: string; success?: string }> {
  await requireSuperAdmin();

  // Prevent self-deletion
  const supabase = await createClient();
  const { data: { user: currentUser } } = await supabase.auth.getUser();
  if (currentUser?.id === userId) {
    return { error: 'Δεν μπορείς να διαγράψεις τον ίδιο σου τον λογαριασμό.' };
  }

  const adminClient = createAdminClient();
  const { error } = await adminClient.auth.admin.deleteUser(userId);

  if (error) {
    return { error: `Σφάλμα διαγραφής: ${error.message}` };
  }

  return { success: 'Ο χρήστης διαγράφηκε επιτυχώς.' };
}
