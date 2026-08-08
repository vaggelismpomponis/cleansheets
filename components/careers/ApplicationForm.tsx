'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, CheckCircle2, XCircle, Loader2, FileText, X } from 'lucide-react';
import { submitApplication } from '@/app/actions/jobs';

const formSchema = z.object({
  full_name: z.string().min(2, 'Το ονοματεπώνυμο είναι υποχρεωτικό'),
  email: z.string().email('Εισάγετε έγκυρο email'),
  phone: z.string().min(8, 'Εισάγετε έγκυρο τηλέφωνο'),
  cover_letter: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ApplicationFormProps {
  jobId: string;
  jobTitle: string;
}

export function ApplicationForm({ jobId, jobTitle }: ApplicationFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvError, setCvError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setCvError('');
    if (!file) { setCvFile(null); return; }

    if (file.size > 5 * 1024 * 1024) {
      setCvError('Το αρχείο δεν πρέπει να υπερβαίνει τα 5MB');
      return;
    }
    const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowed.includes(file.type)) {
      setCvError('Επιτρέπονται μόνο αρχεία PDF, DOC και DOCX');
      return;
    }
    setCvFile(file);
  };

  const onSubmit = async (values: FormValues) => {
    setStatus('loading');
    setErrorMsg('');

    const fd = new FormData();
    fd.append('full_name', values.full_name);
    fd.append('email', values.email);
    fd.append('phone', values.phone);
    if (values.cover_letter) fd.append('cover_letter', values.cover_letter);
    if (cvFile) fd.append('cv', cvFile);

    const result = await submitApplication(jobId, fd);

    if (result.success) {
      setStatus('success');
      reset();
      setCvFile(null);
    } else {
      setStatus('error');
      setErrorMsg(result.error ?? 'Κάτι πήγε στραβά. Δοκιμάστε ξανά.');
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white border border-teal/20 rounded-2xl p-8 text-center shadow-sm"
      >
        <div className="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-teal" />
        </div>
        <h3 className="text-xl font-bold text-navy font-heading mb-2">
          Η αίτησή σας υποβλήθηκε!
        </h3>
        <p className="text-muted text-sm leading-relaxed max-w-xs mx-auto mb-6">
          Λάβαμε την αίτησή σας για τη θέση <strong className="text-navy">{jobTitle}</strong>. Θα επικοινωνήσουμε μαζί σας σύντομα.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-sm font-semibold text-teal hover:underline"
        >
          Υποβολή νέας αίτησης
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Full name */}
      <div>
        <label htmlFor="app-full-name" className="block text-sm font-semibold text-navy mb-1.5">
          Ονοματεπώνυμο <span className="text-red-400">*</span>
        </label>
        <input
          id="app-full-name"
          type="text"
          placeholder="π.χ. Γιώργης Παπαδόπουλος"
          {...register('full_name')}
          className="w-full border border-border rounded-xl px-4 py-3 text-sm text-navy placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/60 transition"
        />
        {errors.full_name && (
          <p className="mt-1.5 text-xs text-red-500">{errors.full_name.message}</p>
        )}
      </div>

      {/* Email + Phone row */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="app-email" className="block text-sm font-semibold text-navy mb-1.5">
            Email <span className="text-red-400">*</span>
          </label>
          <input
            id="app-email"
            type="email"
            placeholder="email@example.com"
            {...register('email')}
            className="w-full border border-border rounded-xl px-4 py-3 text-sm text-navy placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/60 transition"
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="app-phone" className="block text-sm font-semibold text-navy mb-1.5">
            Τηλέφωνο <span className="text-red-400">*</span>
          </label>
          <input
            id="app-phone"
            type="tel"
            placeholder="69XXXXXXXX"
            {...register('phone')}
            className="w-full border border-border rounded-xl px-4 py-3 text-sm text-navy placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/60 transition"
          />
          {errors.phone && (
            <p className="mt-1.5 text-xs text-red-500">{errors.phone.message}</p>
          )}
        </div>
      </div>

      {/* CV Upload */}
      <div>
        <label className="block text-sm font-semibold text-navy mb-1.5">
          Βιογραφικό Σημείωμα (CV)
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="hidden"
          id="app-cv-input"
        />
        {!cvFile ? (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full border-2 border-dashed border-border rounded-xl p-5 text-center text-sm text-muted hover:border-teal/40 hover:bg-teal/5 hover:text-teal transition-all group"
          >
            <Upload className="w-5 h-5 mx-auto mb-2 text-muted-light group-hover:text-teal transition-colors" />
            <span className="font-medium">Κάντε κλικ για να επισυνάψετε CV</span>
            <span className="block text-xs text-muted-light mt-0.5">PDF, DOC, DOCX — έως 5MB</span>
          </button>
        ) : (
          <div className="flex items-center gap-3 border border-teal/20 bg-teal/5 rounded-xl px-4 py-3">
            <FileText className="w-5 h-5 text-teal shrink-0" />
            <span className="text-sm font-medium text-navy truncate flex-1">{cvFile.name}</span>
            <button
              type="button"
              onClick={() => { setCvFile(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
              className="shrink-0 p-1 rounded-full hover:bg-red-50 hover:text-red-500 text-muted-light transition-colors"
              aria-label="Αφαίρεση αρχείου"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        {cvError && <p className="mt-1.5 text-xs text-red-500">{cvError}</p>}
      </div>

      {/* Cover letter */}
      <div>
        <label htmlFor="app-cover-letter" className="block text-sm font-semibold text-navy mb-1.5">
          Συνοδευτικό Μήνυμα <span className="text-muted-light font-normal">(προαιρετικό)</span>
        </label>
        <textarea
          id="app-cover-letter"
          rows={4}
          placeholder="Πείτε μας λίγα λόγια για εσάς και γιατί σας ενδιαφέρει αυτή η θέση..."
          {...register('cover_letter')}
          className="w-full border border-border rounded-xl px-4 py-3 text-sm text-navy placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/60 transition resize-none"
        />
      </div>

      {/* Error message */}
      <AnimatePresence>
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600"
          >
            <XCircle className="w-4 h-4 shrink-0" />
            {errorMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        id="submit-application-btn"
        className="w-full bg-teal hover:bg-teal-dark text-white font-bold rounded-xl px-6 py-3.5 text-sm transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-teal/20 hover:-translate-y-0.5 active:translate-y-0"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Υποβολή...
          </>
        ) : (
          'Υποβολή Αίτησης'
        )}
      </button>

      <p className="text-xs text-muted-light text-center">
        Τα στοιχεία σας θα χρησιμοποιηθούν αποκλειστικά για την αξιολόγηση της αίτησής σας.
      </p>
    </form>
  );
}
