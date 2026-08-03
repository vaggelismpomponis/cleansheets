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
    <header className="h-[72px] border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 bg-white shrink-0 shadow-sm">
      <div className="flex items-center gap-3">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-slate-800 font-bold text-base font-heading leading-tight">
            {sectionTitle ?? 'Dashboard'}
          </h1>
          <p className="text-slate-400 text-xs">Ephtopia Cleans · Διαχείριση</p>
        </div>
      </div>

      <div className="flex items-center gap-2 lg:gap-3">
        {/* Email — hidden on very small screens */}
        <div className="hidden sm:flex items-center gap-2.5 px-3 py-2 rounded-lg bg-slate-100 border border-slate-200">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-teal/40 to-teal-dark/40 flex items-center justify-center">
            <User className="w-3.5 h-3.5 text-teal" />
          </div>
          <span className="text-xs text-slate-500 max-w-[120px] truncate">{user.email}</span>
        </div>

        <button
          onClick={handleLogout}
          disabled={isPending}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all text-xs font-medium disabled:opacity-50 cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isPending ? 'Αποσύνδεση...' : 'Αποσύνδεση'}</span>
        </button>
      </div>
    </header>
  );
}
