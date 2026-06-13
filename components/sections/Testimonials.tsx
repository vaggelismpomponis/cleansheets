"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { siteContent } from "@/lib/content";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function Testimonials() {
  const content = siteContent.testimonials;

  return (
    <section id="testimonials" className="relative py-20 md:py-28 overflow-hidden bg-navy">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy-light/50 to-navy" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-teal-light mb-4"
          >
            <span className="w-6 h-px bg-teal-light" />
            {content.sectionLabel}
            <span className="w-6 h-px bg-teal-light" />
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white mb-6 leading-tight"
          >
            {content.title}
          </motion.h2>

          {/* Review score badge */}
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-5 py-2.5"
          >
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
              ))}
            </div>
            <span className="text-sm font-semibold text-white">{content.reviewScore}</span>
            <span className="w-px h-4 bg-white/15" />
            <span className="text-xs text-white/50">{content.reviewCount}</span>
          </motion.div>
        </motion.div>

        {/* Testimonial Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-5 lg:gap-6"
        >
          {content.items.map((testimonial, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="relative bg-white/[0.04] border border-white/[0.08] rounded-xl p-7 lg:p-8 hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-400"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-teal/30 mb-5 -scale-x-100" />

              {/* Quote text */}
              <p className="text-white/80 text-[15px] leading-relaxed mb-7 font-light">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-5">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-gold text-gold" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-white/[0.06]">
                {/* Avatar placeholder */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal/30 to-teal-dark/30 flex items-center justify-center text-sm font-bold text-teal-light">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-white/40">
                    {testimonial.city} · {testimonial.properties}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
