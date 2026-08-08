import { requireAdmin } from '@/lib/auth';
import { JobForm } from '@/components/admin/JobForm';
import { createJob } from '@/app/actions/jobs';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function NewJobPage() {
  await requireAdmin();

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
          Νέα Καταχώρηση
        </div>
        <h2 className="text-2xl font-bold text-slate-800 font-heading">Δημιουργία Αγγελίας</h2>
        <p className="text-slate-500 text-sm mt-1">
          Συμπληρώστε τα παρακάτω πεδία για να δημιουργήσετε νέα αγγελία εργασίας.
        </p>
      </div>

      <JobForm onSubmit={createJob} submitLabel="Δημιουργία Αγγελίας" />
    </div>
  );
}
