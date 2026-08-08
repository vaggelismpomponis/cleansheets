"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import type { SiteContent } from "@/lib/get-content";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useLivePreview } from "@/components/LivePreviewProvider";

interface TestimonialsProps {
  siteContent: SiteContent;
}

export default function Testimonials({ siteContent: initialContent }: TestimonialsProps) {
  const preview = useLivePreview();
  const content = (preview?.siteContent || initialContent).testimonials;

  return (
    <section id="testimonials" className="relative py-20 md:py-28 overflow-hidden bg-slate-50">
      {/* Top divider */}
      <div className="section-divider absolute top-0 left-0" />

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
            className="section-label justify-center mb-4 block"
          >
            {content.sectionLabel}
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-slate-800 mb-6 leading-tight"
          >
            {content.title}
          </motion.h2>

          {/* Review score badge */}
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-3 bg-white border border-slate-200 shadow-sm rounded-full px-5 py-2.5"
          >
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
              ))}
            </div>
            <span className="text-sm font-semibold text-slate-800">{content.reviewScore}</span>
            <span className="w-px h-4 bg-slate-200" />
            <span className="text-xs text-slate-400">{content.reviewCount}</span>
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
              className="relative bg-white border border-slate-200 rounded-xl p-7 lg:p-8 hover:border-teal/30 hover:shadow-md transition-all duration-300"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-teal/20 mb-5 -scale-x-100" />

              {/* Quote text */}
              <p className="text-slate-600 text-[15px] leading-relaxed mb-7 font-light">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-5">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-gold text-gold" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center text-sm font-bold text-teal">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-800">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-slate-400">
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
