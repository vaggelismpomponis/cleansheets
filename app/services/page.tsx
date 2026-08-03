"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, SprayCan, Camera, CalendarRange, Building2, ArrowRight, Check } from "lucide-react";
import { siteContent } from "@/lib/content";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";

const iconMap = { Sparkles, SprayCan, Camera, CalendarRange, Building2 };

export default function ServicesLandingPage() {
  const { items: categories, title, subtitle } = siteContent.servicesPage;

  return (
    <>
      <Navbar siteContent={siteContent} />
      <main className="min-h-screen bg-warm-white">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-slate-100">
          <div className="absolute bottom-0 left-0 right-0 animated-gradient-line" />
          <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-teal/[0.05] blur-[100px] rounded-full pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.span
                variants={fadeInUp}
                className="section-label justify-center mb-6 block"
              >
                Οι Υπηρεσίες μας
              </motion.span>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-800 leading-tight tracking-tight max-w-4xl mx-auto"
              >
                {title}
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="mt-6 text-lg sm:text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-light"
              >
                {subtitle}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Category Cards Section */}
        <section className="section-padding bg-warm-white relative">
          <div className="section-divider absolute top-0 left-0" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
            >
              {categories.map((cat, idx) => {
                const IconComponent = iconMap[cat.icon as keyof typeof iconMap] || Sparkles;
                const num = String(idx + 1).padStart(2, "0");

                return (
                  <motion.div key={cat.slug} variants={fadeInUp}>
                    <Link href={`/services/${cat.slug}`} className="group block h-full">
                      <div className="relative bg-white border border-card-border hover:border-teal/30 rounded-2xl p-8 lg:p-10 card-hover h-full flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                        {/* Accent side bar */}
                        <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-full bg-gradient-to-b from-teal/40 to-teal/10 group-hover:from-teal group-hover:to-teal/40 transition-all duration-500" />

                        <div>
                          {/* Header badge & icon */}
                          <div className="flex items-center justify-between mb-6 pl-2">
                            <span className="text-xs font-bold tracking-widest text-teal/80 uppercase bg-teal/8 px-3 py-1 rounded-full border border-teal/15">
                              Υπηρεσία {num}
                            </span>
                            <div className="w-12 h-12 rounded-xl bg-navy/5 text-navy flex items-center justify-center group-hover:bg-teal group-hover:text-white transition-all duration-300">
                              <IconComponent className="w-6 h-6" />
                            </div>
                          </div>

                          {/* Title & description */}
                          <h2 className="text-2xl font-bold text-navy mb-3 tracking-tight group-hover:text-teal transition-colors duration-300 pl-2">
                            {cat.title}
                          </h2>
                          <p className="text-[15px] text-muted leading-relaxed mb-6 pl-2 line-clamp-3">
                            {cat.description}
                          </p>

                          {/* Key Features */}
                          <div className="border-t border-border-light pt-6 mt-4 pl-2">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-navy/40 mb-3">
                              Βασικα Πλεονεκτηματα
                            </h3>
                            <ul className="space-y-2.5">
                              {cat.features.slice(0, 3).map((f, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-sm text-navy/80 font-medium">
                                  <div className="w-5 h-5 rounded-md bg-teal/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-teal/20 transition-colors">
                                    <Check className="w-3.5 h-3.5 text-teal stroke-[3]" />
                                  </div>
                                  <span>{typeof f === "string" ? f : f.title}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* CTA Link */}
                        <div className="mt-8 pt-4 border-t border-border-light/60 flex items-center justify-between pl-2">
                          <span className="text-sm font-semibold text-teal group-hover:text-teal-light transition-colors">
                            Δείτε Αναλυτικά
                          </span>
                          <div className="w-8 h-8 rounded-full bg-teal/8 group-hover:bg-teal group-hover:text-white text-teal flex items-center justify-center transition-all duration-300">
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Bottom CTA section */}
        <section className="section-padding bg-slate-50 relative overflow-hidden">
          <div className="section-divider absolute top-0 left-0" />
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4 tracking-tight">
                Έτοιμοι να Ξεκινήσετε;
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-base text-slate-500 mb-8 leading-relaxed font-light">
                Συμπληρώστε τα στοιχεία σας και θα επικοινωνήσουμε εντός 24 ωρών.
              </motion.p>
              <motion.div variants={fadeInUp}>
                <Link
                  href="/#contact"
                  className="group inline-flex items-center gap-2.5 bg-teal hover:bg-teal-dark text-white px-8 py-4 rounded-lg text-base font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-teal/20"
                >
                  Ξεκινήστε Δωρεάν
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer siteContent={siteContent} />
    </>
  );
}
