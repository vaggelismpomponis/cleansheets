'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import {
  History,
  Save,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  FileText,
  TrendingUp,
} from 'lucide-react';
import type { ChangeLogEntry, UserChangeStat } from '@/app/actions/content';

interface HistoryTimelineProps {
  entries: ChangeLogEntry[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  userStats: UserChangeStat[];
}

// ── Helpers ────────────────────────────────────────────────────

function formatRelativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const s = Math.floor(diff / 1000);
  if (s < 60) return 'μόλις τώρα';
  const m = Math.floor(s / 60);
  if (m < 60) return `${m} λεπτά πριν`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} ώρες πριν`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d} μέρες πριν`;
  return new Date(iso).toLocaleDateString('el-GR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function formatAbsoluteTime(iso: string): string {
  return new Date(iso).toLocaleString('el-GR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

function getInitials(email: string | null): string {
  if (!email) return '?';
  const parts = email.split('@')[0].split(/[._-]/);
  return parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('');
}

const AVATAR_COLORS = [
  'from-teal-400 to-teal-600',
  'from-violet-400 to-violet-600',
  'from-amber-400 to-amber-600',
  'from-rose-400 to-rose-600',
  'from-sky-400 to-sky-600',
  'from-emerald-400 to-emerald-600',
];

function avatarColor(email: string | null): string {
  if (!email) return AVATAR_COLORS[0];
  let hash = 0;
  for (let i = 0; i < email.length; i++) hash = (hash * 31 + email.charCodeAt(i)) | 0;
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

const SECTION_LABELS: Record<string, string> = {
  hero: 'Hero',
  problem: 'Πρόβλημα',
  services: 'Υπηρεσίες',
  testimonials: 'Αξιολογήσεις',
  pricing: 'Τιμολόγηση',
  faq: 'FAQ',
  'lead-form': 'Φόρμα',
  footer: 'Footer',
};

function sectionLabel(s: string) {
  return SECTION_LABELS[s] ?? s;
}

function truncate(value: string | null, max = 120): string {
  if (!value) return '—';
  return value.length > max ? value.slice(0, max) + '…' : value;
}

// ── Components ─────────────────────────────────────────────────

function StatCard({ label, value, icon: Icon, color }: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-center gap-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="text-xl font-bold text-slate-800 leading-none">{value}</div>
        <div className="text-xs text-slate-400 mt-0.5">{label}</div>
      </div>
    </div>
  );
}

function UserStatCard({ stat, rank }: { stat: UserChangeStat; rank: number }) {
  const color = avatarColor(stat.email);
  return (
    <div className="flex items-center gap-3 bg-white rounded-xl border border-slate-200 px-4 py-3 shadow-sm">
      <div
        className={`w-8 h-8 rounded-full bg-gradient-to-br ${color} flex items-center justify-center shrink-0`}
      >
        <span className="text-white text-[10px] font-bold">{getInitials(stat.email)}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-semibold text-slate-700 truncate">{stat.email}</div>
        <div className="text-[10px] text-slate-400">#{rank} πιο ενεργός</div>
      </div>
      <div className="text-sm font-bold text-teal shrink-0">{stat.count}</div>
    </div>
  );
}

function EntryCard({ entry }: { entry: ChangeLogEntry }) {
  const isSave = entry.action === 'save';
  const color = avatarColor(entry.changed_by_email);
  const hasValueChange = entry.old_value !== null || entry.new_value !== null;

  return (
    <div className="relative flex gap-4 group">
      {/* Timeline dot + line */}
      <div className="flex flex-col items-center shrink-0">
        <div
          className={`w-8 h-8 rounded-full bg-gradient-to-br ${color} flex items-center justify-center shadow-sm border-2 border-white z-10`}
        >
          <span className="text-white text-[10px] font-bold">
            {getInitials(entry.changed_by_email)}
          </span>
        </div>
        <div className="w-px flex-1 bg-slate-200 mt-1" />
      </div>

      {/* Card */}
      <div className="flex-1 bg-white border border-slate-200 rounded-xl p-4 shadow-sm mb-3 group-hover:border-teal/30 group-hover:shadow-md transition-all duration-200">
        {/* Header row */}
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Action badge */}
            {isSave ? (
              <span className="inline-flex items-center gap-1 bg-teal/10 text-teal border border-teal/20 rounded-full px-2.5 py-0.5 text-[11px] font-semibold">
                <Save className="w-3 h-3" />
                Αποθήκευση
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-600 border border-amber-200 rounded-full px-2.5 py-0.5 text-[11px] font-semibold">
                <RotateCcw className="w-3 h-3" />
                Επαναφορά
              </span>
            )}
            {/* Section breadcrumb */}
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <FileText className="w-3 h-3 text-slate-400" />
              <span className="font-medium text-slate-700">{sectionLabel(entry.section)}</span>
              <span className="text-slate-300">/</span>
              <span className="font-mono text-[11px] text-slate-500">{entry.content_key}</span>
            </span>
          </div>

          {/* Timestamps */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 shrink-0" title={formatAbsoluteTime(entry.changed_at)}>
            <Clock className="w-3 h-3" />
            <span>{formatRelativeTime(entry.changed_at)}</span>
            <span className="text-slate-300">·</span>
            <span>{formatAbsoluteTime(entry.changed_at)}</span>
          </div>
        </div>

        {/* Who */}
        <div className="flex items-center gap-1.5 mb-3 text-xs text-slate-500">
          <User className="w-3 h-3 text-slate-400" />
          <span className="font-medium text-slate-600">{entry.changed_by_email ?? 'Άγνωστος'}</span>
        </div>

        {/* Before / After diff */}
        {hasValueChange && (
          <div className="space-y-1.5 text-[11px]">
            {entry.old_value !== null && (
              <div className="bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
                <span className="text-rose-400 font-semibold mr-2">−  Πριν:</span>
                <span className="text-rose-700 font-mono break-all">{truncate(entry.old_value)}</span>
              </div>
            )}
            {entry.new_value !== null && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                <span className="text-emerald-500 font-semibold mr-2">+  Μετά:</span>
                <span className="text-emerald-700 font-mono break-all">{truncate(entry.new_value)}</span>
              </div>
            )}
            {entry.action === 'reset' && (
              <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-500 italic">
                Επαναφορά στην προεπιλεγμένη τιμή
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Pagination controls ────────────────────────────────────────

function PaginationBar({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  if (totalPages <= 1) return null;

  // Generate page numbers to show: always show first, last, current ±1
  const pages: (number | '…')[] = [];
  const visited = new Set<number>();
  const add = (n: number) => {
    if (n >= 1 && n <= totalPages && !visited.has(n)) {
      visited.add(n);
      pages.push(n);
    }
  };
  add(1);
  if (currentPage - 2 > 2) pages.push('…');
  add(currentPage - 1);
  add(currentPage);
  add(currentPage + 1);
  if (currentPage + 2 < totalPages - 1) pages.push('…');
  add(totalPages);

  return (
    <div className={`flex items-center justify-center gap-1.5 pt-4 transition-opacity ${isPending ? 'opacity-50' : ''}`}>
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1 || isPending}
        className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:text-teal hover:border-teal/40 hover:bg-teal/5 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        aria-label="Προηγούμενη σελίδα"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {pages.map((p, i) =>
        p === '…' ? (
          <span key={`ellipsis-${i}`} className="w-8 h-8 flex items-center justify-center text-slate-400 text-sm">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => goToPage(p as number)}
            disabled={isPending}
            className={`w-8 h-8 rounded-lg border text-sm font-medium transition-all ${
              p === currentPage
                ? 'bg-teal text-white border-teal shadow-sm'
                : 'border-slate-200 text-slate-600 hover:border-teal/40 hover:text-teal hover:bg-teal/5'
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages || isPending}
        className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:text-teal hover:border-teal/40 hover:bg-teal/5 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        aria-label="Επόμενη σελίδα"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────

export function HistoryTimeline({
  entries,
  totalCount,
  currentPage,
  pageSize,
  userStats,
}: HistoryTimelineProps) {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  return (
    <div className="space-y-6">
      {/* Summary stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <StatCard
          label="Σύνολο αλλαγών"
          value={totalCount}
          icon={History}
          color="bg-teal/10 text-teal"
        />
        <StatCard
          label="Αποθηκεύσεις"
          value={entries.filter((e) => e.action === 'save').length > 0
            ? totalCount - entries.filter((e) => e.action === 'reset').length
            : '—'}
          icon={Save}
          color="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          label="Επαναφορές"
          value={entries.filter((e) => e.action === 'reset').length > 0
            ? entries.filter((e) => e.action === 'reset').length
            : '—'}
          icon={RotateCcw}
          color="bg-amber-50 text-amber-600"
        />
      </div>

      {/* Per-user activity */}
      {userStats.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-slate-400" />
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Δραστηριότητα ανά χρήστη
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            {userStats.map((stat, i) => (
              <UserStatCard key={stat.email} stat={stat} rank={i + 1} />
            ))}
          </div>
        </div>
      )}

      {/* Timeline */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <History className="w-4 h-4 text-slate-400" />
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Χρονολόγιο αλλαγών
          </h3>
          <span className="ml-auto text-[11px] text-slate-400">
            Σελίδα {currentPage} / {totalPages} · {totalCount} συνολικά
          </span>
        </div>

        {entries.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <History className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Δεν υπάρχουν καταχωρήσεις ακόμα.</p>
            <p className="text-xs mt-1">Κάνε μια αλλαγή για να εμφανιστεί εδώ.</p>
          </div>
        ) : (
          <div>
            {entries.map((entry) => (
              <EntryCard key={entry.id} entry={entry} />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      <PaginationBar currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
