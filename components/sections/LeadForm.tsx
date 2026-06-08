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
  name: z.string().min(2, "Το ονοματεπώνυμο είναι υποχρεωτικό"),
  email: z.string().email("Μη έγκυρο email"),
  phone: z.string().min(10, "Μη έγκυρο τηλέφωνο"),
  properties: z.string().min(1, "Επιλέξτε αριθμό ακινήτων"),
  city: z.string().min(2, "Η πόλη είναι υποχρεωτική"),
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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(15,123,108,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(15,123,108,0.1),transparent_50%)]" />

      {/* Decorative shapes */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal/30 to-transparent" />
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-teal/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-teal/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Copy */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2"
            >
              {content.title} —
            </motion.h2>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-teal-light mb-6"
            >
              {content.titleAccent}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-white/70 mb-10 max-w-lg"
            >
              {content.subtitle}
            </motion.p>

            {/* Trust points */}
            <motion.div variants={staggerContainer} className="space-y-4">
              {[
                {
                  icon: CheckCircle,
                  text: "Δωρεάν αξιολόγηση χωρίς δεσμεύσεις",
                },
                { icon: Clock, text: "Απάντηση εντός 24 ωρών" },
                { icon: Shield, text: "Ασφαλής επικοινωνία — χωρίς spam" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="flex items-center gap-3"
                >
                  <item.icon className="w-5 h-5 text-teal-light shrink-0" />
                  <span className="text-white/80">{item.text}</span>
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
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-10 text-center border border-white/10"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 0.2,
                    }}
                    className="w-20 h-20 rounded-full bg-teal/20 flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="w-10 h-10 text-teal-light" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {content.successMessage}
                  </h3>
                  <p className="text-white/60">
                    Ελέγξτε το email σας για περισσότερες λεπτομέρειες.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10"
                >
                  <div className="space-y-5">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-white/80 mb-1.5"
                      >
                        {content.fields.name.label}
                      </label>
                      <input
                        {...register("name")}
                        id="name"
                        type="text"
                        placeholder={content.fields.name.placeholder}
                        className={`w-full bg-white/10 border rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-teal transition-all ${
                          errors.name
                            ? "border-red-400"
                            : "border-white/15 hover:border-white/30"
                        }`}
                      />
                      {errors.name && (
                        <p className="text-red-400 text-xs mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email & Phone row */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-white/80 mb-1.5"
                        >
                          {content.fields.email.label}
                        </label>
                        <input
                          {...register("email")}
                          id="email"
                          type="email"
                          placeholder={content.fields.email.placeholder}
                          className={`w-full bg-white/10 border rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-teal transition-all ${
                            errors.email
                              ? "border-red-400"
                              : "border-white/15 hover:border-white/30"
                          }`}
                        />
                        {errors.email && (
                          <p className="text-red-400 text-xs mt-1">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-white/80 mb-1.5"
                        >
                          {content.fields.phone.label}
                        </label>
                        <input
                          {...register("phone")}
                          id="phone"
                          type="tel"
                          placeholder={content.fields.phone.placeholder}
                          className={`w-full bg-white/10 border rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-teal transition-all ${
                            errors.phone
                              ? "border-red-400"
                              : "border-white/15 hover:border-white/30"
                          }`}
                        />
                        {errors.phone && (
                          <p className="text-red-400 text-xs mt-1">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Properties & City row */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="properties"
                          className="block text-sm font-medium text-white/80 mb-1.5"
                        >
                          {content.fields.properties.label}
                        </label>
                        <select
                          {...register("properties")}
                          id="properties"
                          defaultValue=""
                          className={`w-full bg-white/10 border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal transition-all appearance-none cursor-pointer ${
                            errors.properties
                              ? "border-red-400"
                              : "border-white/15 hover:border-white/30"
                          }`}
                        >
                          <option value="" disabled className="text-navy">
                            {content.fields.properties.placeholder}
                          </option>
                          {content.fields.properties.options.map((opt) => (
                            <option
                              key={opt.value}
                              value={opt.value}
                              className="text-navy"
                            >
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        {errors.properties && (
                          <p className="text-red-400 text-xs mt-1">
                            {errors.properties.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text-white/80 mb-1.5"
                        >
                          {content.fields.city.label}
                        </label>
                        <input
                          {...register("city")}
                          id="city"
                          type="text"
                          placeholder={content.fields.city.placeholder}
                          className={`w-full bg-white/10 border rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-teal transition-all ${
                            errors.city
                              ? "border-red-400"
                              : "border-white/15 hover:border-white/30"
                          }`}
                        />
                        {errors.city && (
                          <p className="text-red-400 text-xs mt-1">
                            {errors.city.message}
                          </p>
                        )}
                      </div>
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
                      className="w-full group inline-flex items-center justify-center gap-2 bg-teal hover:bg-teal-light text-white py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-teal/25 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                      ) : (
                        <>
                          {content.submitCta}
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>

                    {/* Trust micro-copy */}
                    <p className="text-center text-xs text-white/50">
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
