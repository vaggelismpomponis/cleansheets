import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/auth';
import { getJobForEdit, getApplications } from '@/app/actions/jobs';
import Link from 'next/link';
import { ArrowLeft, Download, Eye, Mail, Phone, User, CalendarDays, FileText } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('el-GR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
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

      {applications.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
          <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <User className="w-7 h-7 text-slate-400" />
          </div>
          <p className="text-slate-500 text-sm">Δεν υπάρχουν αιτήσεις για αυτή τη θέση.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app, i) => (
            <div
              key={app.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-teal/10 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-teal">
                      {app.full_name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 text-sm">{app.full_name}</div>
                    <div className="text-xs text-slate-400">Αίτηση #{i + 1}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <CalendarDays className="w-3.5 h-3.5" />
                  {formatDate(app.submitted_at)}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                <a
                  href={`mailto:${app.email}`}
                  className="flex items-center gap-2 text-sm text-slate-600 hover:text-teal transition-colors"
                >
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  {app.email}
                </a>
                <a
                  href={`tel:${app.phone}`}
                  className="flex items-center gap-2 text-sm text-slate-600 hover:text-teal transition-colors"
                >
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  {app.phone}
                </a>
              </div>

              {app.cover_letter && (
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-4">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">
                    Συνοδευτικό Μήνυμα
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                    {app.cover_letter}
                  </p>
                </div>
              )}

              {app.cv_url ? (
                <div className="flex items-center gap-2">
                  <a
                    href={app.cv_view_url || app.cv_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-teal bg-slate-100 hover:bg-teal/10 border border-slate-200 hover:border-teal/20 px-3 py-1.5 rounded-lg transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Προβολή CV
                  </a>
                  <a
                    href={app.cv_url}
                    download={`CV_${app.full_name.trim().replace(/\s+/g, '_')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal hover:text-teal-dark bg-teal/10 hover:bg-teal/15 border border-teal/20 px-3 py-1.5 rounded-lg transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Λήψη CV
                  </a>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 text-xs text-slate-400 bg-slate-100 px-3 py-1.5 rounded-lg">
                  <FileText className="w-3.5 h-3.5" />
                  Δεν επισυνάφθηκε CV
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
