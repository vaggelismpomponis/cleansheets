import { requireAdmin } from '@/lib/auth';
import { getAllJobs, getApplications } from '@/app/actions/jobs';
import Link from 'next/link';
import { ArrowLeft, Briefcase } from 'lucide-react';
import ApplicationsList from '@/components/admin/ApplicationsList';

interface PageProps {
  searchParams: Promise<{ job?: string }>;
}

export const dynamic = 'force-dynamic';

export default async function ApplicationsPage({ searchParams }: PageProps) {
  await requireAdmin();
  const { job: selectedJobId } = await searchParams;

  const [jobs, applications] = await Promise.all([
    getAllJobs(),
    getApplications(selectedJobId),
  ]);

  const currentJob = jobs.find((j) => j.id === selectedJobId);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/jobs"
          className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-teal mb-4 transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Πίσω στις αγγελίες
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Διαχείριση CVs
            </div>
            <h2 className="text-2xl font-bold text-slate-800 font-heading">
              {currentJob ? `Αιτήσεις: ${currentJob.title}` : 'Όλες οι Αιτήσεις'}
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              {applications.length === 0
                ? 'Δεν υπάρχουν αιτήσεις.'
                : `${applications.length} ${applications.length === 1 ? 'αίτηση' : 'αιτήσεις'}`}
            </p>
          </div>

          {/* Job Position Filter */}
          {jobs.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-500 shrink-0 flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                Θέση:
              </span>
              <form method="GET" className="inline-block">
                <select
                  name="job"
                  defaultValue={selectedJobId || 'all'}
                  // Auto submit on change via JS in server component or client handler
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all cursor-pointer"
                >
                  <option value="all">Όλες οι θέσεις ({jobs.reduce((acc, j) => acc + j.application_count, 0)})</option>
                  {jobs.map((j) => (
                    <option key={j.id} value={j.id}>
                      {j.title} ({j.application_count})
                    </option>
                  ))}
                </select>
                <noscript>
                  <button type="submit" className="ml-2 text-xs bg-teal text-white px-2 py-1 rounded">
                    Φίλτρο
                  </button>
                </noscript>
              </form>
            </div>
          )}
        </div>
      </div>

      <ApplicationsList initialApplications={applications} jobs={jobs} selectedJobId={selectedJobId || 'all'} />
    </div>
  );
}
