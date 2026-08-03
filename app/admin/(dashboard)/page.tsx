import { requireAdmin } from '@/lib/auth';
import Link from 'next/link';
import {
  Star,
  HelpCircle,
  FileText,
  Tag,
  Mail,
  Users,
  Layers,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';

const sections = [
  { href: '/admin/hero', label: 'Hero', icon: Star, description: 'Τίτλος, υπότιτλος, κουμπιά CTA, στατιστικά' },
  { href: '/admin/problem', label: 'Πρόβλημα', icon: Layers, description: 'Τίτλος ενότητας, κάρτες προβλημάτων, μεταβατικό κείμενο' },
  { href: '/admin/services', label: 'Υπηρεσίες', icon: FileText, description: 'Τίτλοι υπηρεσιών, περιγραφές, χαρακτηριστικά' },
  { href: '/admin/testimonials', label: 'Αξιολογήσεις', icon: Users, description: 'Σχόλια πελατών, ονόματα, πόλεις, βαθμολογίες' },
  { href: '/admin/pricing', label: 'Τιμολόγηση', icon: Tag, description: 'Ονόματα πακέτων, τιμές, λίστες χαρακτηριστικών' },
  { href: '/admin/faq', label: 'FAQ', icon: HelpCircle, description: 'Ερωτήσεις και απαντήσεις (προσθήκη/επεξεργασία/διαγραφή)' },
  { href: '/admin/lead-form', label: 'Φόρμα', icon: Mail, description: 'Ετικέτες φόρμας, placeholders, κείμενο CTA' },
  { href: '/admin/footer', label: 'Footer', icon: Layers, description: 'Στοιχεία επικοινωνίας, σύνδεσμοι, social URLs, περιγραφή' },
];

export default async function AdminDashboardPage() {
  const user = await requireAdmin();
  const firstName = user.email?.split('@')[0] ?? 'Admin';

  return (
    <div>
      {/* Welcome header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-teal/10 border border-teal/20 rounded-full px-4 py-1.5 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
          <span className="text-xs font-semibold text-teal tracking-wide">Διαχείριση Ενεργή</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 font-heading mb-2">
          Καλώς ήρθες, <span className="gradient-text">{firstName}</span>
        </h2>
        <p className="text-slate-500 text-sm">
          Επίλεξε μια ενότητα παρακάτω για να επεξεργαστείς το περιεχόμενο. Οι αλλαγές εμφανίζονται αμέσως.
        </p>
      </div>

      {/* Quick preview link */}
      <Link
        href="/"
        target="_blank"
        className="flex items-center gap-2.5 mb-8 w-fit text-slate-400 hover:text-teal text-sm transition-colors group"
      >
        <ExternalLink className="w-4 h-4" />
        <span>Προεπισκόπηση ιστότοπου</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </Link>

      {/* Section grid */}
      <div className="grid sm:grid-cols-2 gap-3 lg:gap-4 w-full">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.href}
              href={section.href}
              className="group flex items-center gap-3 sm:gap-4 bg-white hover:bg-slate-50 border border-slate-200 hover:border-teal/30 rounded-xl p-3.5 sm:p-5 transition-all duration-300 shadow-sm hover:shadow-md min-w-0"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-teal/10 flex items-center justify-center shrink-0 group-hover:bg-teal/20 transition-colors">
                <Icon className="w-5 h-5 text-teal/70 group-hover:text-teal transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-slate-700 group-hover:text-slate-900 text-sm transition-colors mb-0.5">
                  {section.label}
                </div>
                <div className="text-xs text-slate-400 leading-relaxed truncate">
                  {section.description}
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-teal/70 group-hover:translate-x-1 transition-all shrink-0" />
            </Link>
          );
        })}
      </div>

      {/* Help note */}
      <div className="mt-8 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <p className="text-slate-500 text-xs leading-relaxed">
          💡 <strong className="text-slate-600">Πώς λειτουργεί:</strong> Κάνε κλικ σε μια ενότητα για να επεξεργαστείς το περιεχόμενό της.
          Κάθε πεδίο έχει κουμπί <span className="text-teal">Αποθήκευση</span> — κάνε κλικ μετά από κάθε αλλαγή.
          Μπορείς επίσης να <span className="text-amber-500">επαναφέρεις οποιοδήποτε πεδίο</span> στην αρχική του τιμή.
          Οι αλλαγές εμφανίζονται αμέσως στον ιστότοπο μετά την αποθήκευση.
        </p>
      </div>
    </div>
  );
}
