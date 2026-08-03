"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle, Shield, Clock } from "lucide-react";
import type { SiteContent } from "@/lib/get-content";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const formSchema = z.object({
  email: z.string().email("Μη έγκυρο email"),
  phone: z.string().min(10, "Μη έγκυρο τηλέφωνο"),
  honeypot: z.string().max(0),
});

type FormData = z.infer<typeof formSchema>;

interface LeadFormProps {
  siteContent: SiteContent;
}

export default function LeadForm({ siteContent }: LeadFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { honeypot: "" },
  });

  const onSubmit = async (data: FormData) => {
    if (data.honeypot) return;
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form submitted:", data);
    setIsSubmitted(true);
  };

  const content = siteContent.leadForm;

  return (
    <section id="contact" className="relative py-20 md:py-28 overflow-hidden bg-white">
      {/* Top divider */}
      <div className="section-divider absolute top-0 left-0" />

      {/* Subtle teal accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-teal/[0.04] blur-[100px] rounded-full pointer-events-none" />

      {/* Top accent line */}
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
              className="section-label mb-6 block"
            >
              Επικοινωνία
            </motion.span>

            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-slate-800 leading-tight mb-2"
            >
              {content.title} —
            </motion.h2>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold gradient-text leading-tight mb-6"
            >
              {content.titleAccent}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-base text-slate-500 mb-10 max-w-md leading-relaxed"
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
                    <item.icon className="w-4 h-4 text-teal" />
                  </div>
                  <span className="text-sm text-slate-600">{item.text}</span>
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
                >
                  <Card className="bg-white border-slate-200 shadow-sm">
                    <CardContent className="p-10 text-center flex flex-col items-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                        className="w-16 h-16 rounded-xl bg-teal/10 flex items-center justify-center mb-6"
                      >
                        <CheckCircle className="w-8 h-8 text-teal" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-slate-800 mb-3">
                        {content.successMessage}
                      </h3>
                      <p className="text-slate-400 text-sm">
                        Ελέγξτε το email σας για περισσότερες λεπτομέρειες.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div key="form">
                  <Card className="bg-white border-slate-200 shadow-sm">
                    <CardContent className="p-6 sm:p-8">
                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Email */}
                        <div>
                          <label htmlFor="email" className="block text-xs font-semibold text-slate-500 mb-2 tracking-wide uppercase">
                            {content.fields.email.label}
                          </label>
                          <Input
                            {...register("email")}
                            id="email"
                            type="email"
                            placeholder={content.fields.email.placeholder}
                            className={`h-12 bg-white text-slate-800 border-slate-200 hover:border-slate-300 focus-visible:ring-teal/30 placeholder:text-slate-300 transition-all ${errors.email ? "border-red-300 focus-visible:ring-red-300" : ""
                              }`}
                          />
                          {errors.email && (
                            <p className="text-red-500 text-xs mt-1.5">{errors.email.message}</p>
                          )}
                        </div>

                        {/* Phone */}
                        <div>
                          <label htmlFor="phone" className="block text-xs font-semibold text-slate-500 mb-2 tracking-wide uppercase">
                            {content.fields.phone.label}
                          </label>
                          <Input
                            {...register("phone")}
                            id="phone"
                            type="tel"
                            placeholder={content.fields.phone.placeholder}
                            className={`h-12 bg-white text-slate-800 border-slate-200 hover:border-slate-300 focus-visible:ring-teal/30 placeholder:text-slate-300 transition-all ${errors.phone ? "border-red-300 focus-visible:ring-red-300" : ""
                              }`}
                          />
                          {errors.phone && (
                            <p className="text-red-500 text-xs mt-1.5">{errors.phone.message}</p>
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
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full h-12 bg-teal hover:bg-teal-dark text-white text-base font-semibold shadow-md shadow-teal/15 transition-all hover:shadow-lg hover:shadow-teal/20 group"
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
                              <Send className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                            </>
                          )}
                        </Button>

                        {/* Trust micro-copy */}
                        <p className="text-center text-[11px] text-slate-400 mt-4">
                          {content.trustMicroCopy}
                        </p>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
