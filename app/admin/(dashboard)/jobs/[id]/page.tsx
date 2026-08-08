import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/auth';
import { getJobForEdit, updateJob } from '@/app/actions/jobs';
import { JobForm } from '@/components/admin/JobForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditJobPage({ params }: PageProps) {
  await requireAdmin();
  const { id } = await params;
  const job = await getJobForEdit(id);

  if (!job) notFound();

  const handleUpdate = updateJob.bind(null, id);

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
          Επεξεργασία
        </div>
        <h2 className="text-2xl font-bold text-slate-800 font-heading">{job.title}</h2>
        <p className="text-slate-500 text-sm mt-1">
          Επεξεργαστείτε τα στοιχεία της αγγελίας και πατήστε Αποθήκευση.
        </p>
      </div>

      <JobForm initialData={job} onSubmit={handleUpdate} submitLabel="Αποθήκευση Αλλαγών" />
    </div>
  );
}
