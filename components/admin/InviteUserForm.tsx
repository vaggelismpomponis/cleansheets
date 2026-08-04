'use client';

import React from 'react';
import { useActionState, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
  Trash2,
  UserCheck,
  Clock,
  ShieldAlert,
  Users,
} from 'lucide-react';
import { inviteUserAction, deleteUserAction } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';

type InviteState = { error?: string; success?: string } | undefined;

interface UserRow {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  invited_at: string | null;
}

interface InviteUserFormProps {
  users: UserRow[];
  currentUserId: string;
}

function formatDate(iso: string | null): string {
  if (!iso) return '—';
  return new Intl.DateTimeFormat('el-GR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso));
}

function UserStatusBadge({ user }: { user: UserRow }) {
  const hasSignedIn = !!user.last_sign_in_at;
  const isPendingInvite = !!user.invited_at && !hasSignedIn;

  if (isPendingInvite) {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-amber-50 text-amber-600 border border-amber-200 rounded-full px-2 py-0.5">
        <Clock className="w-2.5 h-2.5" />
        Σε αναμονή
      </span>
    );
  }
  if (hasSignedIn) {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-teal/10 text-teal border border-teal/25 rounded-full px-2 py-0.5">
        <UserCheck className="w-2.5 h-2.5" />
        Ενεργός
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-slate-100 text-slate-500 border border-slate-200 rounded-full px-2 py-0.5">
      <ShieldAlert className="w-2.5 h-2.5" />
      Αδρανής
    </span>
  );
}

function DeleteUserButton({ userId, email }: { userId: string; email: string }) {
  const [isPending, startTransition] = useTransition();
  const [deleteError, setDeleteError] = React.useState<string | null>(null);
  const router = useRouter();

  const handleDelete = () => {
    if (
      !confirm(
        `Είσαι σίγουρος ότι θέλεις να διαγράψεις τον χρήστη "${email}"; Αυτή η ενέργεια είναι μη αναστρέψιμη.`
      )
    )
      return;

    startTransition(async () => {
      const result = await deleteUserAction(userId);
      if (result.error) {
        setDeleteError(result.error);
      } else {
        router.refresh();
      }
    });
  };

  return (
    <div>
      {deleteError && <p className="text-red-500 text-[10px] mb-1">{deleteError}</p>}
      <button
        onClick={handleDelete}
        disabled={isPending}
        className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 border border-transparent hover:border-red-200 transition-all disabled:opacity-50 cursor-pointer"
        title="Διαγραφή χρήστη"
      >
        {isPending ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : (
          <Trash2 className="w-3.5 h-3.5" />
        )}
      </button>
    </div>
  );
}

export function InviteUserForm({ users, currentUserId }: InviteUserFormProps) {
  const [state, action, isPending] = useActionState<InviteState, FormData>(
    inviteUserAction,
    undefined
  );
  const formRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state?.success]);

  return (
    <div className="space-y-6">
      {/* Invite Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="h-[3px] bg-gradient-to-r from-transparent via-teal to-transparent opacity-60" />
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center">
              <Send className="w-5 h-5 text-teal" />
            </div>
            <div>
              <h2 className="font-bold text-slate-800 text-base">Πρόσκληση Νέου Χρήστη</h2>
              <p className="text-xs text-slate-400">
                Ο χρήστης θα λάβει email με σύνδεσμο πρόσβασης
              </p>
            </div>
          </div>

          {/* Feedback */}
          <AnimatePresence mode="wait">
            {state?.success && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 mb-5"
              >
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <p className="text-emerald-700 text-sm">{state.success}</p>
              </motion.div>
            )}
            {state?.error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-center gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5"
              >
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <p className="text-red-600 text-sm">{state.error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form ref={formRef} action={action} className="flex gap-3 flex-col sm:flex-row">
            <div className="relative flex-1">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                id="invite-email"
                name="email"
                type="email"
                autoComplete="off"
                required
                placeholder="νεος@admin.com"
                className="w-full bg-white border border-slate-200 hover:border-slate-300 focus:border-teal/50 focus:ring-1 focus:ring-teal/30 rounded-xl pl-10 pr-4 py-3 text-slate-800 text-sm placeholder-slate-300 focus:outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center justify-center gap-2 bg-teal/15 hover:bg-teal/25 text-teal border border-teal/30 px-5 py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Αποστολή...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Αποστολή Πρόσκλησης
                </>
              )}
            </button>
          </form>

          <p className="text-slate-400 text-[11px] mt-3 leading-relaxed">
            ⚠️ Ο προσκεκλημένος χρήστης θα έχει πλήρη πρόσβαση στον πίνακα διαχείρισης. Κάνε
            πρόσκληση μόνο σε έμπιστα άτομα.
          </p>
        </div>
      </div>

      {/* Users List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-slate-500" />
            </div>
            <div>
              <h2 className="font-bold text-slate-800 text-base">Εγγεγραμμένοι Χρήστες</h2>
              <p className="text-xs text-slate-400">
                {users.length} {users.length === 1 ? 'χρήστης' : 'χρήστες'} συνολικά
              </p>
            </div>
          </div>

          {users.length === 0 ? (
            <p className="text-slate-400 text-sm text-center py-8">Δεν βρέθηκαν χρήστες.</p>
          ) : (
            <div className="divide-y divide-slate-100">
              {users.map((user) => (
                <div key={user.id} className="flex items-center gap-4 py-3.5 group">
                  {/* Avatar */}
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal/30 to-teal/10 flex items-center justify-center shrink-0 border border-teal/20">
                    <span className="text-xs font-bold text-teal uppercase">
                      {user.email.charAt(0)}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-slate-700 truncate">
                        {user.email}
                      </span>
                      {user.id === currentUserId && (
                        <span className="text-[10px] font-semibold bg-slate-100 text-slate-500 border border-slate-200 rounded-full px-2 py-0.5">
                          Εσύ
                        </span>
                      )}
                      <UserStatusBadge user={user} />
                    </div>
                    <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                      <span className="text-[11px] text-slate-400">
                        Δημιουργία: {formatDate(user.created_at)}
                      </span>
                      {user.last_sign_in_at && (
                        <span className="text-[11px] text-slate-400">
                          Τελευταία σύνδεση: {formatDate(user.last_sign_in_at)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Delete */}
                  {user.id !== currentUserId && (
                    <DeleteUserButton userId={user.id} email={user.email} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
