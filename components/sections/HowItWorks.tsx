"use client";

import { motion } from "framer-motion";
import { CalendarDays, Sparkles, Camera, ShieldCheck } from "lucide-react";
import { siteContent } from "@/lib/content";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const iconMap = {
  CalendarDays,
  Sparkles,
  Camera,
  ShieldCheck,
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block text-teal text-sm font-semibold tracking-wider uppercase mb-3"
          >
            {siteContent.howItWorks.sectionLabel}
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-4"
          >
            {siteContent.howItWorks.title}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-muted max-w-2xl mx-auto"
          >
            {siteContent.howItWorks.subtitle}
          </motion.p>
        </motion.div>

        {/* Steps */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="relative"
        >
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-24 left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-0.5 bg-gradient-to-r from-teal/20 via-teal/40 to-teal/20" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {siteContent.howItWorks.steps.map((step, i) => {
              const IconComponent = iconMap[step.icon as keyof typeof iconMap];
              return (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="relative text-center group"
                >
                  {/* Step number circle */}
                  <div className="relative mx-auto mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal/10 to-teal/5 flex items-center justify-center mx-auto group-hover:from-teal/20 group-hover:to-teal/10 transition-all duration-300">
                      <IconComponent className="w-9 h-9 text-teal" />
                    </div>
                    {/* Number badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center shadow-lg">
                      {step.number}
                    </div>
                    {/* Connector dot (desktop) */}
                    <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-teal opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <h3 className="text-lg font-bold text-navy mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed max-w-[260px] mx-auto">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
