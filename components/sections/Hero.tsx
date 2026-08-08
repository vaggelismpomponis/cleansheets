"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { SiteContent } from "@/lib/get-content";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLivePreview } from "@/components/LivePreviewProvider";

interface HeroProps {
  siteContent: SiteContent;
}

export default function Hero({ siteContent: initialContent }: HeroProps) {
  const { siteContent } = useLivePreview();

  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-svh flex items-center overflow-hidden bg-slate-100"
    >
      {/* Background Image — visible but light */}
      <div className="absolute inset-0">
        <Image
          src="/hero-bg.png"
          alt=""
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        {/* Light directional overlay — keeps text side clear */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/75 to-white/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-100/80 via-transparent to-transparent" />
      </div>

      {/* Subtle teal glow top-right */}
      <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-teal/[0.05] blur-[120px] rounded-full pointer-events-none" />

      {/* Animated gradient accent line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 animated-gradient-line" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 lg:pt-36 pb-12 md:pb-16 lg:pb-20">
        <div className="max-w-3xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Label */}
            <motion.div variants={fadeInUp} className="mb-8">
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-teal">
                <span className="w-6 h-px bg-teal" />
                Νέα υπηρεσία στην Ελλάδα
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-5xl lg:text-7xl font-extrabold text-slate-800 leading-[1.08] tracking-tight"
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
              className="mt-4 md:mt-5 lg:mt-7 text-base sm:text-lg md:text-base lg:text-xl text-slate-500 max-w-xl leading-relaxed font-light"
            >
              {siteContent.hero.subheadline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeInUp}
              className="mt-6 md:mt-7 lg:mt-10 flex flex-col sm:flex-row gap-4"
            >
              <Button
                onClick={() => handleScroll("#contact")}
                className="bg-teal hover:bg-teal-dark text-white h-14 px-8 rounded-lg text-base font-semibold shadow-lg shadow-teal/20 transition-all hover:shadow-xl hover:shadow-teal/25 group"
              >
                {siteContent.hero.ctaPrimary}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Link
                href="/services"
                className="h-14 px-8 rounded-lg text-base font-semibold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all inline-flex items-center justify-center group shadow-sm"
              >
                {siteContent.hero.ctaSecondary}
                <ChevronDown className="w-4 h-4 ml-2 group-hover:translate-y-0.5 transition-transform text-slate-400" />
              </Link>
            </motion.div>

            {/* Trust Stats */}
            <motion.div
              variants={fadeInUp}
              className="mt-8 md:mt-10 lg:mt-16 flex justify-center sm:block"
            >
              <Card className="bg-white border-slate-200 shadow-md inline-flex p-1">
                <CardContent className="flex items-center justify-center gap-8 p-4 sm:px-8 sm:py-5">
                  {siteContent.hero.trustStats.map((stat, i) => (
                    <div key={i} className="flex items-center gap-8">
                      <div className="flex flex-col items-center justify-center text-center">
                        <div className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight text-center">
                          {stat.value}
                        </div>
                        <div className="text-xs text-slate-400 font-medium tracking-wide uppercase mt-1 text-center">
                          {stat.label}
                        </div>
                      </div>
                      {i < siteContent.hero.trustStats.length - 1 && (
                        <div className="w-px h-10 bg-slate-200" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
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
          className="w-5 h-8 rounded-full border border-slate-300 flex items-start justify-center pt-1.5"
        >
          <motion.div className="w-1 h-1.5 rounded-full bg-slate-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
