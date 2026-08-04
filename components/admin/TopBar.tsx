'use client';

import { useTransition } from 'react';
import { logoutAction } from '@/app/actions/auth';
import { LogOut, User, Menu } from 'lucide-react';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface TopBarProps {
  user: SupabaseUser;
  sectionTitle?: string;
  onMenuClick?: () => void;
}

export function TopBar({ user, sectionTitle, onMenuClick }: TopBarProps) {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction();
    });
  };

  return (
    <header className="h-16 sm:h-[72px] border-b border-slate-200 flex items-center justify-between px-3 sm:px-4 lg:px-6 bg-white shrink-0 shadow-sm w-full min-w-0">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-1.5 sm:p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors shrink-0"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <h1 className="text-slate-800 font-bold text-sm sm:text-base font-heading leading-tight truncate">
            {sectionTitle ?? 'Dashboard'}
          </h1>
          <p className="text-slate-400 text-[10px] sm:text-xs truncate">Ephtopia Cleans · Διαχείριση</p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        {/* Email — hidden on small screens */}
        <div className="hidden sm:flex items-center gap-2.5 px-3 py-2 rounded-lg bg-slate-100 border border-slate-200">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-teal/40 to-teal-dark/40 flex items-center justify-center">
            <User className="w-3.5 h-3.5 text-teal" />
          </div>
          <span className="text-xs text-slate-500 max-w-[120px] truncate">{user.email}</span>
        </div>

        <button
          onClick={handleLogout}
          disabled={isPending}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 hover:border-rose-300 transition-all text-xs font-semibold disabled:opacity-50 cursor-pointer shrink-0 shadow-xs"
          title="Αποσύνδεση"
          aria-label="Αποσύνδεση"
        >
          <LogOut className="w-3.5 h-3.5 text-rose-600" />
          <span className="hidden sm:inline">{isPending ? 'Αποσύνδεση...' : 'Αποσύνδεση'}</span>
        </button>
      </div>
    </header>
  );
}
