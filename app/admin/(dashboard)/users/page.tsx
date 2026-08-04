import { requireAdmin } from '@/lib/auth';
import { listUsersAction } from '@/app/actions/auth';
import { InviteUserForm } from '@/components/admin/InviteUserForm';
import { ShieldX } from 'lucide-react';

export const metadata = {
  title: 'Χρήστες · Admin · Ephtopia Cleans',
  robots: { index: false, follow: false },
};

/** Only this email can access user management. */
const SUPER_ADMIN_EMAIL = 'ebomponis@gmail.com';

export default async function UsersPage() {
  const currentUser = await requireAdmin();

  // Super-admin guard — only the owner email can manage users
  if (currentUser.email !== SUPER_ADMIN_EMAIL) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center mb-5">
          <ShieldX className="w-8 h-8 text-red-400" />
        </div>
        <h1 className="text-xl font-bold text-slate-800 mb-2">Δεν έχετε πρόσβαση</h1>
        <p className="text-slate-500 text-sm max-w-xs">
          Η διαχείριση χρηστών είναι διαθέσιμη μόνο για τον κύριο διαχειριστή του συστήματος.
        </p>
      </div>
    );
  }

  const { users, error } = await listUsersAction();

  return (
    <div>
      {/* Page header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-teal/10 border border-teal/20 rounded-full px-4 py-1.5 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
          <span className="text-xs font-semibold text-teal tracking-wide">Διαχείριση Πρόσβασης</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 font-heading mb-2">
          Χρήστες
        </h1>
        <p className="text-slate-500 text-sm">
          Κάλεσε νέους διαχειριστές μέσω email ή διαχειρίσου τους υπάρχοντες.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-6 text-red-600 text-sm">
          Σφάλμα φόρτωσης χρηστών: {error}
        </div>
      )}

      <InviteUserForm users={users} currentUserId={currentUser.id} />
    </div>
  );
}

