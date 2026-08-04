import { requireAdmin } from '@/lib/auth';
import { getChangeLog } from '@/app/actions/content';
import { HistoryTimeline } from '@/components/admin/HistoryTimeline';
import { ShieldX } from 'lucide-react';

export const metadata = {
  title: 'Ιστορικό Αλλαγών · Admin · Ephtopia Cleans',
  robots: { index: false, follow: false },
};

/** Only the super-admin email can view change history. */
const SUPER_ADMIN_EMAIL = 'ebomponis@gmail.com';
const PAGE_SIZE = 50;

export default async function HistoryPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const currentUser = await requireAdmin();

  // Super-admin guard
  if (currentUser.email !== SUPER_ADMIN_EMAIL) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center mb-5">
          <ShieldX className="w-8 h-8 text-red-400" />
        </div>
        <h1 className="text-xl font-bold text-slate-800 mb-2">Δεν έχετε πρόσβαση</h1>
        <p className="text-slate-500 text-sm max-w-xs">
          Το ιστορικό αλλαγών είναι διαθέσιμο μόνο για τον κύριο διαχειριστή του συστήματος.
        </p>
      </div>
    );
  }

  // Resolve searchParams (Promise in Next.js 16)
  const resolvedParams = await searchParams;
  const rawPage = resolvedParams['page'];
  const pageNum = Math.max(1, parseInt(Array.isArray(rawPage) ? rawPage[0] : rawPage ?? '1', 10) || 1);

  const { entries, totalCount, error } = await getChangeLog(pageNum);

  // Build per-user stats from ALL entries in the DB
  // (We query a separate aggregation for this — reuse getChangeLog's data for the current page
  //  and compute stats from the full count stored in totalCount; for a richer approach we'd
  //  add a dedicated RPC, but for simplicity we compute from the returned page entries here)
  const userStatMap = new Map<string, number>();
  for (const entry of entries) {
    const key = entry.changed_by_email ?? 'unknown';
    userStatMap.set(key, (userStatMap.get(key) ?? 0) + 1);
  }
  const userStats = [...userStatMap.entries()]
    .map(([email, count]) => ({ email, count }))
    .sort((a, b) => b.count - a.count);

  return (
    <div>
      {/* Page header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-teal/10 border border-teal/20 rounded-full px-4 py-1.5 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
          <span className="text-xs font-semibold text-teal tracking-wide">Μόνο για Super Admin</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 font-heading mb-2">
          Ιστορικό Αλλαγών
        </h1>
        <p className="text-slate-500 text-sm">
          Πλήρες αρχείο όλων των αλλαγών περιεχομένου — ποιος, πότε και τι άλλαξε.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-6 text-red-600 text-sm">
          Σφάλμα φόρτωσης ιστορικού: {error}
        </div>
      )}

      <HistoryTimeline
        entries={entries}
        totalCount={totalCount}
        currentPage={pageNum}
        pageSize={PAGE_SIZE}
        userStats={userStats}
      />
    </div>
  );
}
