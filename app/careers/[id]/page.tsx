import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getJob } from '@/app/actions/jobs';
import { ApplicationForm } from '@/components/careers/ApplicationForm';
import {
  MapPin,
  Clock,
  Briefcase,
  CalendarDays,
  Mail,
  ArrowLeft,
  CheckCircle,
  Star,
  Gift,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const job = await getJob(id);
  if (!job) return { title: 'Θέση Εργασίας | Ephtopia Cleans' };
  return {
    title: `${job.title} | Καριέρα — Ephtopia Cleans`,
    description: job.description.slice(0, 155),
  };
}

const employmentTypeLabel: Record<string, string> = {
  'full-time': 'Πλήρης Απασχόληση',
  'part-time': 'Μερική Απασχόληση',
  contract: 'Σύμβαση',
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('el-GR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function JobDetailPage({ params }: PageProps) {
  const { id } = await params;
  const job = await getJob(id);

  if (!job) notFound();

  const isExpired = job.deadline ? new Date(job.deadline) < new Date() : false;

  return (
    <div className="bg-warm-white min-h-screen pt-24 md:pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <Link
          href="/careers"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-teal mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Πίσω στις αγγελίες
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* ── Left column: Job details ── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header card */}
            <div className="bg-white border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-xs font-semibold text-muted uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-full">
                  {job.department}
                </span>
                <span className="text-xs font-semibold text-teal bg-teal/10 border border-teal/20 px-2.5 py-1 rounded-full">
                  {employmentTypeLabel[job.employment_type] ?? job.employment_type}
                </span>
                {isExpired && (
                  <span className="text-xs font-semibold text-red-500 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
                    Η αγγελία έχει λήξει
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-navy font-heading leading-tight mb-5">
                {job.title}
              </h1>

              {/* Meta grid */}
              <div className="grid sm:grid-cols-2 gap-3 text-sm text-muted">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-muted-light" />
                  </div>
                  <div>
                    <div className="text-[11px] text-muted-light font-medium uppercase tracking-wide">Τοποθεσία</div>
                    <div className="text-navy font-semibold">{job.location}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                    <Briefcase className="w-4 h-4 text-muted-light" />
                  </div>
                  <div>
                    <div className="text-[11px] text-muted-light font-medium uppercase tracking-wide">Τύπος</div>
                    <div className="text-navy font-semibold">{employmentTypeLabel[job.employment_type]}</div>
                  </div>
                </div>

                {job.salary_range && (
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4 text-muted-light" />
                    </div>
                    <div>
                      <div className="text-[11px] text-muted-light font-medium uppercase tracking-wide">Αμοιβή</div>
                      <div className="text-navy font-semibold">{job.salary_range}</div>
                    </div>
                  </div>
                )}

                {job.deadline && (
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isExpired ? 'bg-red-50' : 'bg-slate-100'}`}>
                      <CalendarDays className={`w-4 h-4 ${isExpired ? 'text-red-400' : 'text-muted-light'}`} />
                    </div>
                    <div>
                      <div className="text-[11px] text-muted-light font-medium uppercase tracking-wide">Προθεσμία</div>
                      <div className={`font-semibold ${isExpired ? 'text-red-500' : 'text-navy'}`}>
                        {formatDate(job.deadline)}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-muted-light" />
                  </div>
                  <div>
                    <div className="text-[11px] text-muted-light font-medium uppercase tracking-wide">Επικοινωνία</div>
                    <a href={`mailto:${job.contact_email}`} className="text-teal font-semibold hover:underline">
                      {job.contact_email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
              <h2 className="text-xs font-bold text-muted uppercase tracking-widest mb-4 pb-3 border-b border-slate-100">
                Περιγραφή Θέσης
              </h2>
              <p className="text-muted leading-relaxed whitespace-pre-line text-sm">
                {job.description}
              </p>
            </div>

            {/* Responsibilities */}
            {job.responsibilities.length > 0 && (
              <div className="bg-white border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
                <h2 className="text-xs font-bold text-muted uppercase tracking-widest mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
                  <Star className="w-3.5 h-3.5 text-gold" />
                  Αρμοδιότητες
                </h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted">
                      <CheckCircle className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements */}
            {job.requirements.length > 0 && (
              <div className="bg-white border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
                <h2 className="text-xs font-bold text-muted uppercase tracking-widest mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-teal" />
                  Απαιτήσεις
                </h2>
                <ul className="space-y-3">
                  {job.requirements.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal shrink-0 mt-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            {job.benefits.length > 0 && (
              <div className="bg-white border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
                <h2 className="text-xs font-bold text-muted uppercase tracking-widest mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
                  <Gift className="w-3.5 h-3.5 text-gold" />
                  Παροχές
                </h2>
                <ul className="space-y-3">
                  {job.benefits.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted">
                      <Gift className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* ── Right column: Application form ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              {isExpired ? (
                <div className="bg-white border border-border rounded-2xl p-6 shadow-sm text-center">
                  <CalendarDays className="w-10 h-10 text-red-400 mx-auto mb-3" />
                  <h3 className="font-bold text-navy font-heading mb-2">Η αγγελία έχει λήξει</h3>
                  <p className="text-sm text-muted mb-4">
                    Η προθεσμία για αυτή τη θέση έχει παρέλθει.
                  </p>
                  <Link
                    href="/careers"
                    className="text-sm font-semibold text-teal hover:underline"
                  >
                    Δείτε άλλες αγγελίες →
                  </Link>
                </div>
              ) : (
                <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
                  <div className="mb-5">
                    <h2 className="text-lg font-extrabold text-navy font-heading mb-1">
                      Υποβολή Αίτησης
                    </h2>
                    <p className="text-xs text-muted leading-relaxed">
                      Συμπληρώστε τα παρακάτω για να υποβάλετε την αίτησή σας για τη θέση{' '}
                      <strong className="text-navy">{job.title}</strong>.
                    </p>
                  </div>
                  <ApplicationForm jobId={job.id} jobTitle={job.title} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
