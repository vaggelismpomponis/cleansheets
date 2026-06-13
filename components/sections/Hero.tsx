"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { siteContent } from "@/lib/content";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function Hero() {
  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-navy"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-bg.png"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/30" />
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-40" />

      {/* Animated gradient accent line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 animated-gradient-line" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-36 pb-20">
        <div className="max-w-3xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Label */}
            <motion.div variants={fadeInUp} className="mb-8">
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-teal-light">
                <span className="w-6 h-px bg-teal-light" />
                Νέα υπηρεσία στην Ελλάδα
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] tracking-tight"
            >
              {siteContent.hero.headline}
              <br />
              <span className="gradient-text">
                {siteContent.hero.headlineAccent}
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeInUp}
              className="mt-7 text-lg sm:text-xl text-white/60 max-w-xl leading-relaxed font-light"
            >
              {siteContent.hero.subheadline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeInUp}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => handleScroll("#contact")}
                className="group inline-flex items-center justify-center gap-2.5 bg-teal hover:bg-teal-light text-white px-8 py-4 rounded-lg text-base font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-teal/20 cursor-pointer"
              >
                {siteContent.hero.ctaPrimary}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <Link
                href="/services"
                className="group inline-flex items-center justify-center gap-2.5 border border-white/20 hover:border-white/40 text-white/80 hover:text-white px-8 py-4 rounded-lg text-base font-semibold transition-all duration-300 hover:bg-white/5"
              >
                {siteContent.hero.ctaSecondary}
                <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </Link>
            </motion.div>

            {/* Trust Stats */}
            <motion.div
              variants={fadeInUp}
              className="mt-16 flex items-center gap-10"
            >
              {siteContent.hero.trustStats.map((stat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-xs text-white/40 font-medium tracking-wide uppercase mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                  {i < siteContent.hero.trustStats.length - 1 && (
                    <div className="w-px h-10 bg-white/10 ml-7" />
                  )}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
        >
          <motion.div className="w-1 h-1.5 rounded-full bg-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
