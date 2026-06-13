"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";

export default function CookieNotice() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cleansheets-cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cleansheets-cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDismiss = () => {
    localStorage.setItem("cleansheets-cookie-consent", "dismissed");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
        >
          <div className="max-w-3xl mx-auto bg-navy text-white rounded-xl shadow-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 border border-white/[0.06]">
            <Cookie className="w-4 h-4 text-teal-light shrink-0 mt-0.5 sm:mt-0" />
            <p className="text-xs text-white/60 flex-1 leading-relaxed">
              Χρησιμοποιούμε cookies για τη βελτίωση της εμπειρίας σας.
              Συνεχίζοντας, αποδέχεστε τη{" "}
              <a href="#" className="text-teal-light underline hover:text-teal">
                Πολιτική Απορρήτου
              </a>
              .
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleAccept}
                className="bg-teal hover:bg-teal-light text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer"
              >
                Αποδοχή
              </button>
              <button
                onClick={handleDismiss}
                className="text-white/30 hover:text-white/60 p-1.5 transition-colors cursor-pointer"
                aria-label="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
