'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Trash2 } from 'lucide-react';

interface ConfirmModalProps {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  /** 'danger' (red) or 'warning' (amber). Defaults to 'danger'. */
  variant?: 'danger' | 'warning';
}

export function ConfirmModal({
  open,
  title,
  description,
  confirmLabel = 'Διαγραφή',
  cancelLabel = 'Άκυρο',
  onConfirm,
  onCancel,
  variant = 'danger',
}: ConfirmModalProps) {
  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onCancel]);

  const isDanger = variant === 'danger';

  const iconBg = isDanger
    ? 'bg-teal/10 text-teal'
    : 'bg-amber-100 text-amber-600';

  // Match exactly the button pattern used in FieldEditor & ArrayEditor
  const confirmBtn = isDanger
    ? 'bg-teal/15 hover:bg-teal/25 text-teal border border-teal/30 cursor-pointer'
    : 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-600 border border-amber-500/30 cursor-pointer';

  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 bg-slate-800/20 backdrop-blur-[2px] z-50"
            onClick={onCancel}
            aria-hidden="true"
          />

          {/* Dialog */}
          <motion.div
            key="dialog"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="pointer-events-auto bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-sm p-6 relative">
              {/* Close ✕ */}
              <button
                onClick={onCancel}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Cancel"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Icon */}
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${iconBg}`}>
                <Trash2 className="w-5 h-5" />
              </div>

              {/* Content */}
              <h2
                id="confirm-modal-title"
                className="text-base font-bold text-slate-800 font-heading mb-1.5"
              >
                {title}
              </h2>
              {description && (
                <p className="text-sm text-slate-500 leading-relaxed mb-6">
                  {description}
                </p>
              )}

              {/* Actions */}
              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={onCancel}
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
                >
                  {cancelLabel}
                </button>
                <button
                  onClick={onConfirm}
                  className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${confirmBtn}`}
                >
                  {confirmLabel}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
