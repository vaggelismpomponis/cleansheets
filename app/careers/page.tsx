import { getActiveJobs } from '@/app/actions/jobs';
import { JobCard } from '@/components/careers/JobCard';
import { Briefcase, Users, TrendingUp, ArrowRight, Mail } from 'lucide-react';

export const revalidate = 60; // ISR — re-fetch every 60s

export default async function CareersPage() {
  const jobs = await getActiveJobs();

  return (
    <>
      {/* ──────────────── Hero — matches homepage style ──────────────── */}
      <section className="relative min-h-[55vh] flex items-center overflow-hidden bg-slate-100">
        {/* Light overlay gradient — same as homepage hero */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/75 to-white/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-100/80 via-transparent to-transparent" />

        {/* Subtle teal glow — top right, same as homepage */}
        <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-teal/[0.05] blur-[120px] rounded-full pointer-events-none" />

        {/* Animated gradient accent line at bottom — same as homepage */}
        <div className="absolute bottom-0 left-0 right-0 animated-gradient-line" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-32 pb-16 md:pb-20 w-full">
          <div className="max-w-3xl">
            {/* Section label — same style as homepage */}
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-teal mb-8">
              <span className="w-6 h-px bg-teal" />
              Θέσεις Εργασίας
            </span>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-7xl font-extrabold text-slate-800 leading-[1.08] tracking-tight mb-6">
              Καριέρα στην{' '}
              <br />
              <span className="gradient-text">Ephtopia Cleans</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-500 max-w-xl leading-relaxed font-light mb-10">
              Γίνε μέρος μιας ομάδας που κάνει τη διαφορά. Εργαζόμαστε με επαγγελματισμό,
              αξιοπιστία και μεράκι — και ψάχνουμε ανθρώπους που μοιράζονται τις ίδιες αξίες.
            </p>

            {/* Stats card — same white card as homepage trust stats */}
            <div className="bg-white border border-slate-200 shadow-md inline-flex rounded-xl p-1">
              <div className="flex items-center divide-x divide-slate-200">
                {[
                  { icon: Briefcase, value: `${jobs.length}`, label: 'Ανοιχτές Θέσεις' },
                  { icon: Users, value: '50+', label: 'Εργαζόμενοι' },
                  { icon: TrendingUp, value: '2026', label: 'Ίδρυση' },
                ].map(({ icon: Icon, value, label }) => (
                  <div key={label} className="flex flex-col items-center justify-center text-center px-6 sm:px-8 py-4 sm:py-5">
                    <div className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">{value}</div>
                    <div className="text-xs text-slate-400 font-medium tracking-wide uppercase mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── Job Listings ──────────────── */}
      <section className="section-padding bg-warm-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {jobs.length === 0 ? (
            /* Empty state */
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-white border border-border rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Briefcase className="w-8 h-8 text-muted-light" />
              </div>
              <h2 className="text-xl font-bold text-navy font-heading mb-3">
                Δεν υπάρχουν ανοιχτές θέσεις αυτή τη στιγμή
              </h2>
              <p className="text-muted text-sm max-w-md mx-auto leading-relaxed mb-8">
                Δεν έχουμε τρέχουσες αγγελίες, αλλά μπορείτε να μας στείλετε το βιογραφικό σας
                και θα επικοινωνήσουμε μαζί σας για μελλοντικές ευκαιρίες.
              </p>
              <a
                href="mailto:info@ephtopia.gr"
                className="inline-flex items-center gap-2 bg-teal hover:bg-teal-dark text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all duration-200 hover:shadow-lg hover:shadow-teal/20 hover:-translate-y-0.5"
              >
                <Mail className="w-4 h-4" />
                Στείλτε το βιογραφικό σας
              </a>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-1">
                    Αγγελίες Εργασίας
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-navy font-heading">
                    {jobs.length === 1 ? '1 ανοιχτή θέση' : `${jobs.length} ανοιχτές θέσεις`}
                  </h2>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 lg:gap-5">
                {jobs.map((job, i) => (
                  <JobCard key={job.id} job={job} index={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ──────────────── Bottom CTA — light style ──────────────── */}
      <section className="section-padding bg-white border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          {/* Section label */}
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-teal mb-6">
            <span className="w-6 h-px bg-teal" />
            Ανοιχτή Αίτηση
          </span>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-800 font-heading tracking-tight mb-4">
            Δεν βρήκες τη θέση που ψάχνεις;
          </h2>
          <p className="text-slate-500 text-base leading-relaxed mb-8 max-w-xl mx-auto">
            Στείλτε μας το βιογραφικό σας ούτως ή άλλως — ενημερωνόμαστε τακτικά για νέες ανάγκες
            και θα επικοινωνήσουμε μαζί σας άμεσα.
          </p>
          <a
            href="mailto:info@ephtopia.gr?subject=Αυτόκλητο Βιογραφικό"
            className="inline-flex items-center gap-2 bg-teal hover:bg-teal-dark text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-all duration-200 hover:shadow-lg hover:shadow-teal/20 hover:-translate-y-0.5"
          >
            Επικοινωνία &amp; Βιογραφικό
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </>
  );
}
