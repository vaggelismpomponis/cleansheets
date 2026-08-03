"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function CookieNotice() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("ephtopia-cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("ephtopia-cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDismiss = () => {
    localStorage.setItem("ephtopia-cookie-consent", "dismissed");
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
          <Card className="max-w-3xl mx-auto bg-navy text-white shadow-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 border border-white/[0.06] backdrop-blur-xl">
            <Cookie className="w-5 h-5 text-teal shrink-0 mt-0.5 sm:mt-0" />
            <p className="text-sm text-white/70 flex-1 leading-relaxed">
              Χρησιμοποιούμε cookies για τη βελτίωση της εμπειρίας σας.
              Συνεχίζοντας, αποδέχεστε τη{" "}
              <a href="#" className="text-teal hover:text-teal-light underline transition-colors">
                Πολιτική Απορρήτου
              </a>
              .
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <Button
                onClick={handleAccept}
                className="bg-teal hover:bg-teal-light text-white shadow-lg shadow-teal/20"
                size="sm"
              >
                Αποδοχή
              </Button>
              <Button
                onClick={handleDismiss}
                variant="ghost"
                size="icon"
                className="text-white/40 hover:text-white/80 hover:bg-white/10"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
