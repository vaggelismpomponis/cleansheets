"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { siteContent } from "@/lib/content";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function Problem() {
  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="problem" className="section-padding bg-warm-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block text-teal text-sm font-semibold tracking-wider uppercase mb-3"
          >
            {siteContent.problem.sectionLabel}
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy"
          >
            {siteContent.problem.title}
          </motion.h2>
        </motion.div>

        {/* Problem Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {siteContent.problem.cards.map((card, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="card-hover group bg-white rounded-2xl p-8 border border-card-border relative overflow-hidden"
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                <div className="text-5xl mb-5">{card.emoji}</div>
                <h3 className="text-xl font-bold text-navy mb-3">
                  {card.title}
                </h3>
                <p className="text-muted leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-teal to-teal-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </motion.div>

        {/* Transition CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mt-14"
        >
          <p className="text-lg text-muted mb-5">
            {siteContent.problem.transition}
          </p>
          <button
            onClick={() => handleScroll("#how-it-works")}
            className="group inline-flex items-center gap-2 text-teal font-semibold text-lg hover:gap-3 transition-all cursor-pointer"
          >
            {siteContent.problem.transitionCta}
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
