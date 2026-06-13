"use client";

import { motion } from "framer-motion";
import { ArrowRight, UserX, ShieldAlert, Clock } from "lucide-react";
import { siteContent } from "@/lib/content";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const iconMap = {
  UserX,
  ShieldAlert,
  Clock,
};

export default function Problem() {
  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="problem" className="section-padding bg-white relative overflow-hidden">
      {/* Top divider */}
      <div className="section-divider absolute top-0 left-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-2xl mb-16 lg:mb-20"
        >
          <motion.span variants={fadeInUp} className="section-label mb-4 block">
            {siteContent.problem.sectionLabel}
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-navy mb-5 leading-tight"
          >
            {siteContent.problem.title}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-muted leading-relaxed"
          >
            {siteContent.problem.subtitle}
          </motion.p>
        </motion.div>

        {/* Problem Cards — Editorial style with left accent */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {siteContent.problem.cards.map((card, i) => {
            const IconComponent = iconMap[card.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="group relative bg-warm-white rounded-xl p-7 lg:p-8 border border-transparent hover:border-border transition-all duration-400"
              >
                {/* Left accent bar */}
                <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full bg-gradient-to-b from-teal/40 to-teal/10 group-hover:from-teal group-hover:to-teal/40 transition-all duration-500" />

                <div className="pl-4">
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-teal/8 flex items-center justify-center mb-5 text-teal group-hover:bg-teal/12 transition-colors duration-300">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg font-bold text-navy mb-2.5 tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-[15px] text-muted leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Transition CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mt-14 lg:mt-16 flex flex-col sm:flex-row items-center gap-4 justify-center"
        >
          <p className="text-muted text-base">
            {siteContent.problem.transition}
          </p>
          <button
            onClick={() => handleScroll("#services")}
            className="group inline-flex items-center gap-2 text-teal font-semibold text-sm hover:gap-3 transition-all cursor-pointer"
          >
            {siteContent.problem.transitionCta}
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
