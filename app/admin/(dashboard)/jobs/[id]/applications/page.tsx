import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/auth';
import { getJobForEdit, getApplications } from '@/app/actions/jobs';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ApplicationsList from '@/components/admin/ApplicationsList';

interface PageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = 'force-dynamic';

export default async function JobApplicationsPage({ params }: PageProps) {
  await requireAdmin();
  const { id } = await params;

  const [job, applications] = await Promise.all([
    getJobForEdit(id),
    getApplications(id),
  ]);

  if (!job) notFound();

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
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
          Αιτήσεις
        </div>
        <h2 className="text-2xl font-bold text-slate-800 font-heading">
          {job.title}
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          {applications.length === 0
            ? 'Δεν υπάρχουν αιτήσεις ακόμα.'
            : `${applications.length} ${applications.length === 1 ? 'αίτηση' : 'αιτήσεις'} υποβλήθηκαν.`}
        </p>
      </div>

      <ApplicationsList initialApplications={applications} />
    </div>
  );
}
