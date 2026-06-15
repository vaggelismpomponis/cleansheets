"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, ShieldCheck, Camera, CalendarRange, ArrowUpRight } from "lucide-react";
import { siteContent } from "@/lib/content";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const iconMap = {
  Sparkles,
  ShieldCheck,
  Camera,
  CalendarRange,
};

export default function Services() {
  return (
    <section id="services" className="section-padding bg-warm-white relative overflow-hidden">
      {/* Top divider */}
      <div className="section-divider absolute top-0 left-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-2xl mx-auto text-center mb-16 lg:mb-20"
        >
          <motion.span variants={fadeInUp} className="section-label justify-center mb-4 block">
            {siteContent.services.sectionLabel}
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-navy mb-5 leading-tight"
          >
            {siteContent.services.title}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-muted leading-relaxed"
          >
            {siteContent.services.subtitle}
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid sm:grid-cols-2 gap-5 lg:gap-6"
        >
          {siteContent.services.items.map((service, i) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Sparkles;
            const num = String(i + 1).padStart(2, "0");
            return (
              <Link
                key={i}
                href="/services"
                className="block group"
              >
                <motion.div
                  variants={fadeInUp}
                  className="relative bg-white border border-card-border hover:border-teal/25 rounded-xl p-7 lg:p-8 card-hover overflow-hidden h-full"
                >
                  {/* Number + Icon row */}
                  <div className="flex items-start justify-between mb-6">
                    <span className="number-badge">{num}</span>
                    <div className="w-11 h-11 rounded-xl bg-navy/4 text-navy/60 flex items-center justify-center group-hover:bg-teal/10 group-hover:text-teal transition-all duration-400">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-navy mb-3 tracking-tight group-hover:text-teal transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[15px] text-muted leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Features — minimal */}
                  <ul className="space-y-2 mb-6 border-t border-border-light pt-5">
                    {service.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2.5 text-[13px] text-navy/80 font-medium">
                        <div className="w-1 h-1 rounded-full bg-teal shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Learn More */}
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-teal group-hover:text-teal-light transition-colors">
                    <span>Μάθετε Περισσότερα</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
