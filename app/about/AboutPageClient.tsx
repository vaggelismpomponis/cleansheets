"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Sparkles,
  Clock,
  Camera,
  ArrowRight,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import type { SiteContent } from "@/lib/get-content";

const iconMap = {
  ShieldCheck,
  Sparkles,
  Clock,
  Camera,
};

interface AboutPageClientProps {
  siteContent: SiteContent;
}

export default function AboutPageClient({ siteContent }: AboutPageClientProps) {
  const about = siteContent.about;

  const handleContactScroll = () => {
    window.location.href = "/#contact";
  };

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative min-h-[52vh] flex items-end overflow-hidden bg-slate-100 pb-20 pt-36">
        {/* Animated bottom line */}
        <div className="absolute bottom-0 left-0 right-0 animated-gradient-line" />
        {/* Subtle teal glow */}
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-teal/[0.06] rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="section-label">
                {about.heroLabel}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-800 leading-[1.08] tracking-tight mb-6"
            >
              {about.title}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl text-slate-500 leading-relaxed max-w-2xl font-light"
            >
              {about.subtitle}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="bg-white border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border-light"
          >
            {about.stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="py-8 px-6 text-center"
              >
                <div className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-light font-medium tracking-wide uppercase">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Mission & Story ── */}
      <section className="section-padding bg-warm-white relative overflow-hidden">
        <div className="section-divider absolute top-0 left-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Mission */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerContainer}
            >
              <motion.span
                variants={fadeInUp}
                className="section-label mb-5 block"
              >
                {about.missionTitle}
              </motion.span>
              <motion.h2
                variants={fadeInUp}
                className="text-3xl sm:text-4xl font-bold text-navy leading-tight mb-6 tracking-tight"
              >
                {about.missionTitle}
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-[17px] text-muted leading-relaxed"
              >
                {about.missionText}
              </motion.p>
            </motion.div>

            {/* Story */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerContainer}
              className="relative"
            >
              {/* Decorative accent */}
              <div className="absolute -left-4 top-0 bottom-0 w-[3px] rounded-full bg-gradient-to-b from-teal via-teal/40 to-transparent" />
              <div className="pl-8">
                <motion.span
                  variants={fadeInUp}
                  className="section-label mb-5 block"
                >
                  {about.storyTitle}
                </motion.span>
                <motion.h2
                  variants={fadeInUp}
                  className="text-3xl sm:text-4xl font-bold text-navy leading-tight mb-6 tracking-tight"
                >
                  {about.storyTitle}
                </motion.h2>
                <motion.p
                  variants={fadeInUp}
                  className="text-[17px] text-muted leading-relaxed"
                >
                  {about.storyText}
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="section-divider absolute top-0 left-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <motion.span
              variants={fadeInUp}
              className="section-label justify-center mb-4 block"
            >
              Οι Αξίες μας
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-navy leading-tight tracking-tight"
            >
              Τι μας Κάνει Διαφορετικούς
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {about.values.map((value, i) => {
              const IconComponent =
                iconMap[value.icon as keyof typeof iconMap] || Sparkles;
              const num = String(i + 1).padStart(2, "0");
              return (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="group relative bg-warm-white rounded-xl p-7 border border-transparent hover:border-border transition-all duration-400 overflow-hidden"
                >
                  {/* Left accent */}
                  <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full bg-gradient-to-b from-teal/40 to-teal/10 group-hover:from-teal group-hover:to-teal/40 transition-all duration-500" />

                  <div className="pl-4">
                    <div className="flex items-start justify-between mb-5">
                      <span className="number-badge">{num}</span>
                      <div className="w-10 h-10 rounded-lg bg-teal/8 flex items-center justify-center text-teal group-hover:bg-teal/12 transition-colors duration-300">
                        <IconComponent className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-navy mb-2.5 tracking-tight">
                      {value.title}
                    </h3>
                    <p className="text-[14px] text-muted leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Legal Compliance ── */}
      <section className="section-padding bg-slate-50 relative overflow-hidden">
        <div className="section-divider absolute top-0 left-0" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal/[0.05] rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="mb-6">
                <span className="section-label justify-center">
                  Νομική Συμμόρφωση
                </span>
              </motion.div>

              <motion.h2
                variants={fadeInUp}
                className="text-3xl sm:text-4xl font-bold text-slate-800 leading-tight mb-6 tracking-tight"
              >
                {about.complianceTitle}
              </motion.h2>

              <motion.p
                variants={fadeInUp}
                className="text-[17px] text-slate-500 leading-relaxed mb-10"
              >
                {about.complianceText}
              </motion.p>

              {/* Compliance badges */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap justify-center gap-3"
              >
                {[
                  "Ποινικό Μητρώο",
                  "Ασφαλιστική Κάλυψη",
                  "Επαγγελματικές Πιστοποιήσεις",
                  "Νόμιμη Απασχόληση",
                ].map((badge, i) => (
                  <div
                    key={i}
                    className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-600 text-[13px] font-medium px-4 py-2.5 rounded-lg shadow-sm"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal shrink-0" />
                    {badge}
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Coverage ── */}
      <section className="section-padding bg-warm-white relative overflow-hidden">
        <div className="section-divider absolute top-0 left-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="flex flex-col lg:flex-row items-center lg:items-start gap-12"
          >
            <div className="flex-1 max-w-xl">
              <motion.span
                variants={fadeInUp}
                className="section-label mb-5 block"
              >
                {about.coverageTitle}
              </motion.span>
              <motion.h2
                variants={fadeInUp}
                className="text-3xl sm:text-4xl font-bold text-navy leading-tight mb-5 tracking-tight"
              >
                {about.coverageTitle}
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-[17px] text-muted leading-relaxed"
              >
                {about.coverageText}
              </motion.p>
            </div>

            <motion.div
              variants={fadeInUp}
              className="flex-1 grid grid-cols-2 gap-3 w-full max-w-sm"
            >
              {["Κέντρο Αθήνας", "Νότια Προάστια", "Βόρεια Προάστια", "Υπόλοιπο Αττικής"].map((city, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 bg-white border border-card-border rounded-xl px-4 py-4"
                >
                  <MapPin className="w-4 h-4 text-teal shrink-0" />
                  <span className="text-[14px] font-semibold text-navy">
                    {city}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="section-divider absolute top-0 left-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl font-bold text-navy mb-5 tracking-tight"
            >
              {about.ctaTitle}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-muted mb-10 leading-relaxed"
            >
              {about.ctaText}
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={handleContactScroll}
                className="group inline-flex items-center justify-center gap-2.5 bg-teal hover:bg-teal-light text-white px-8 py-4 rounded-lg text-base font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-teal/20 cursor-pointer"
              >
                {about.ctaButton}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <Link
                href="/services"
                className="group inline-flex items-center justify-center gap-2.5 border border-navy/20 hover:border-navy/40 text-navy/70 hover:text-navy px-8 py-4 rounded-lg text-base font-semibold transition-all duration-300 hover:bg-navy/4"
              >
                Δείτε τις Υπηρεσίες μας
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
