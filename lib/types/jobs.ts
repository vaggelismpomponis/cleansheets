export type ApplicationStatus = 'new' | 'viewed' | 'rejected' | 'hired';

export interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  employment_type: 'full-time' | 'part-time' | 'contract';
  department: string;
  salary_range: string | null;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  contact_email: string;
  deadline: string | null;  // ISO date string 'YYYY-MM-DD'
  is_active: boolean;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

export interface JobApplication {
  id: string;
  job_id: string;
  job_title?: string;
  full_name: string;
  email: string;
  phone: string;
  cv_url: string | null;
  cv_view_url?: string | null;
  cover_letter: string | null;
  submitted_at: string;
  status: ApplicationStatus;
}

export interface JobWithApplicationCount extends Job {
  application_count: number;
}

export type ActionResult = { success: boolean; error?: string; id?: string };

export const STATUS_LABELS: Record<ApplicationStatus, { label: string; bg: string; hoverBg: string; text: string; border: string; hoverBorder: string }> = {
  new: { label: 'Νέα', bg: 'bg-blue-50', hoverBg: 'hover:bg-blue-100/80', text: 'text-blue-700', border: 'border-blue-200', hoverBorder: 'hover:border-blue-300' },
  viewed: { label: 'Προβλήθηκε', bg: 'bg-slate-100/80', hoverBg: 'hover:bg-slate-200/80', text: 'text-slate-700', border: 'border-slate-200', hoverBorder: 'hover:border-slate-300' },
  rejected: { label: 'Απορρίφθηκε', bg: 'bg-rose-50', hoverBg: 'hover:bg-rose-100/80', text: 'text-rose-700', border: 'border-rose-200', hoverBorder: 'hover:border-rose-300' },
  hired: { label: 'Προσλήφθηκε', bg: 'bg-amber-50', hoverBg: 'hover:bg-amber-100/80', text: 'text-amber-800', border: 'border-amber-200', hoverBorder: 'hover:border-amber-300' },
};
