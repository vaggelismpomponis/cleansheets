"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle, Shield, Clock } from "lucide-react";
import { siteContent } from "@/lib/content";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const formSchema = z.object({
  email: z.string().email("Μη έγκυρο email"),
  phone: z.string().min(10, "Μη έγκυρο τηλέφωνο"),
  honeypot: z.string().max(0), // Anti-spam honeypot
});

type FormData = z.infer<typeof formSchema>;

export default function LeadForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      honeypot: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    // Honeypot check
    if (data.honeypot) return;

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form submitted:", data);
    setIsSubmitted(true);
  };

  const content = siteContent.leadForm;

  return (
    <section id="contact" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy-dark" />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(13,148,136,0.1),transparent_50%)]" />

      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 animated-gradient-line" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Copy */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-teal-light mb-6"
            >
              <span className="w-6 h-px bg-teal-light" />
              Επικοινωνία
            </motion.span>

            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight mb-2"
            >
              {content.title} —
            </motion.h2>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-teal-light leading-tight mb-6"
            >
              {content.titleAccent}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-base text-white/50 mb-10 max-w-md leading-relaxed"
            >
              {content.subtitle}
            </motion.p>

            {/* Trust points */}
            <motion.div variants={staggerContainer} className="space-y-3.5">
              {[
                { icon: CheckCircle, text: "Δωρεάν αξιολόγηση χωρίς δεσμεύσεις" },
                { icon: Clock, text: "Απάντηση εντός 24 ωρών" },
                { icon: Shield, text: "Ασφαλής επικοινωνία — χωρίς spam" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-teal/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-teal-light" />
                  </div>
                  <span className="text-sm text-white/60">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/[0.06] backdrop-blur-xl rounded-xl p-10 text-center border border-white/[0.08]"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                    className="w-16 h-16 rounded-xl bg-teal/15 flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="w-8 h-8 text-teal-light" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {content.successMessage}
                  </h3>
                  <p className="text-white/40 text-sm">
                    Ελέγξτε το email σας για περισσότερες λεπτομέρειες.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="bg-white/[0.04] backdrop-blur-xl rounded-xl p-6 sm:p-8 border border-white/[0.06]"
                >
                  <div className="space-y-5">
                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-xs font-medium text-white/50 mb-2 tracking-wide uppercase">
                        {content.fields.email.label}
                      </label>
                      <input
                        {...register("email")}
                        id="email"
                        type="email"
                        placeholder={content.fields.email.placeholder}
                        className={`w-full bg-white/[0.04] border rounded-lg px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:ring-1 focus:ring-teal transition-all ${
                          errors.email
                            ? "border-red-400/50"
                            : "border-white/[0.08] hover:border-white/[0.15]"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-400 text-xs mt-1.5">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-xs font-medium text-white/50 mb-2 tracking-wide uppercase">
                        {content.fields.phone.label}
                      </label>
                      <input
                        {...register("phone")}
                        id="phone"
                        type="tel"
                        placeholder={content.fields.phone.placeholder}
                        className={`w-full bg-white/[0.04] border rounded-lg px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:ring-1 focus:ring-teal transition-all ${
                          errors.phone
                            ? "border-red-400/50"
                            : "border-white/[0.08] hover:border-white/[0.15]"
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-red-400 text-xs mt-1.5">{errors.phone.message}</p>
                      )}
                    </div>

                    {/* Honeypot (hidden) */}
                    <input
                      {...register("honeypot")}
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      className="absolute opacity-0 w-0 h-0 pointer-events-none"
                      aria-hidden="true"
                    />

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full group inline-flex items-center justify-center gap-2.5 bg-teal hover:bg-teal-light text-white py-3.5 rounded-lg text-base font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-teal/20 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                      ) : (
                        <>
                          {content.submitCta}
                          <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </>
                      )}
                    </button>

                    {/* Trust micro-copy */}
                    <p className="text-center text-[11px] text-white/30">
                      🔒 {content.trustMicroCopy}
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
