"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { siteContent } from "@/lib/content";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-padding bg-cream relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-teal/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy/3 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
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
            {siteContent.testimonials.sectionLabel}
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-4"
          >
            {siteContent.testimonials.title}
          </motion.h2>

          {/* Review Score */}
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-md mt-4"
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-amber-400 fill-amber-400"
                />
              ))}
            </div>
            <span className="text-lg font-bold text-navy">
              {siteContent.testimonials.reviewScore}
            </span>
            <span className="text-muted text-sm">
              από {siteContent.testimonials.reviewCount}
            </span>
          </motion.div>
        </motion.div>

        {/* Testimonial Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {siteContent.testimonials.items.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="card-hover bg-white rounded-2xl p-8 relative group"
              style={{
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.04), 0 2px 4px -2px rgb(0 0 0 / 0.03)",
              }}
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-10 h-10 text-teal" />
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(item.rating)].map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 text-amber-400 fill-amber-400"
                  />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-navy text-lg leading-relaxed mb-6 font-medium italic">
                &ldquo;{item.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal/20 to-navy/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-navy">
                    {item.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-navy">{item.name}</div>
                  <div className="text-sm text-muted">
                    {item.city} · {item.properties}
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
