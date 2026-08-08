'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Euro, Briefcase, Building2, CalendarDays, ArrowRight } from 'lucide-react';
import type { Job } from '@/app/actions/jobs';

const employmentTypeLabel: Record<string, string> = {
  'full-time': 'Πλήρης Απασχόληση',
  'part-time': 'Μερική Απασχόληση',
  contract: 'Σύμβαση',
};

const employmentTypeColor: Record<string, string> = {
  'full-time': 'bg-teal/10 text-teal border border-teal/20',
  'part-time': 'bg-blue-50 text-blue-600 border border-blue-200',
  contract: 'bg-amber-50 text-amber-600 border border-amber-200',
};

interface JobCardProps {
  job: Job;
  index?: number;
}

function formatDeadline(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('el-GR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function isExpiringSoon(dateStr: string): boolean {
  const d = new Date(dateStr);
  const diff = d.getTime() - Date.now();
  return diff > 0 && diff < 7 * 24 * 60 * 60 * 1000;
}

export function JobCard({ job, index = 0 }: JobCardProps) {
  const typeLabel = employmentTypeLabel[job.employment_type] ?? job.employment_type;
  const typeColor = employmentTypeColor[job.employment_type] ?? 'bg-slate-100 text-slate-600';
  const expired = job.deadline ? new Date(job.deadline) < new Date() : false;
  const soonExpiring = job.deadline ? isExpiringSoon(job.deadline) : false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link
        href={`/careers/${job.id}`}
        className="group block bg-white border border-border rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-teal/25 transition-all duration-300 card-hover"
        aria-label={`Δείτε αγγελία: ${job.title}`}
      >
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          {/* Icon + department */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-teal/10 flex items-center justify-center shrink-0 group-hover:bg-teal/20 transition-colors">
              <Briefcase className="w-5 h-5 text-teal" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-muted uppercase tracking-wider mb-0.5">
                {job.department}
              </div>
              <h3 className="font-bold text-navy text-base leading-snug group-hover:text-teal transition-colors line-clamp-2 font-heading">
                {job.title}
              </h3>
            </div>
          </div>

          {/* Employment type badge */}
          <span className={`shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${typeColor}`}>
            {typeLabel}
          </span>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-4 text-sm text-muted">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-muted-light" />
            {job.location}
          </span>
          {job.salary_range && (
            <span className="flex items-center gap-1.5">
              <Euro className="w-3.5 h-3.5 shrink-0 text-muted-light" />
              {job.salary_range}
            </span>
          )}
          {job.deadline && (
            <span className={`flex items-center gap-1.5 ${expired ? 'text-red-400' : soonExpiring ? 'text-amber-500' : ''}`}>
              <CalendarDays className="w-3.5 h-3.5 shrink-0" />
              {expired
                ? 'Έληξε'
                : `Έως ${formatDeadline(job.deadline)}`}
              {soonExpiring && !expired && (
                <span className="text-[10px] font-bold bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded-full">
                  Λήγει σύντομα
                </span>
              )}
            </span>
          )}
        </div>

        {/* Description preview */}
        <p className="text-sm text-muted leading-relaxed line-clamp-2 mb-5">
          {job.description}
        </p>

        {/* CTA */}
        <div className="flex items-center gap-1.5 text-sm font-semibold text-teal group-hover:gap-2.5 transition-all">
          <Building2 className="w-4 h-4" />
          <span>Δείτε την αγγελία</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </motion.div>
  );
}
