import { requireAdmin } from '@/lib/auth';
import { getAllJobs } from '@/app/actions/jobs';
import { JobsTable } from '@/components/admin/JobsTable';
import Link from 'next/link';
import { Plus, Briefcase } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminJobsPage() {
  await requireAdmin();
  const jobs = await getAllJobs();

  const activeCount = jobs.filter((j) => j.is_active).length;
  const totalApplications = jobs.reduce((sum, j) => sum + j.application_count, 0);

  return (
    <div>
      {/* Page header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Διαχείριση
          </div>
          <h2 className="text-2xl font-bold text-slate-800 font-heading">Αγγελίες Εργασίας</h2>
          <p className="text-slate-500 text-sm mt-1">
            Δημιουργία, επεξεργασία και παρακολούθηση αγγελιών εργασίας.
          </p>
        </div>
        <Link
          href="/admin/jobs/new"
          className="flex items-center gap-2 bg-teal hover:bg-teal-dark text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-all duration-200 shadow-sm hover:shadow-md shrink-0"
        >
          <Plus className="w-4 h-4" />
          Νέα Αγγελία
        </Link>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Σύνολο Αγγελιών', value: jobs.length, icon: Briefcase },
          { label: 'Ενεργές', value: activeCount, icon: Briefcase },
          { label: 'Αιτήσεις', value: totalApplications, icon: Briefcase },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm text-center">
            <div className="text-2xl font-extrabold text-slate-800 font-heading">{value}</div>
            <div className="text-xs text-slate-400 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Jobs table */}
      <JobsTable jobs={jobs} />
    </div>
  );
}
