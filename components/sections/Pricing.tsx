"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, ArrowRight } from "lucide-react";
import { siteContent } from "@/lib/content";
import { pricingTiers } from "@/lib/constants";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pricing" className="section-padding bg-white relative overflow-hidden">
      {/* Top divider */}
      <div className="section-divider absolute top-0 left-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-14"
        >
          <motion.span variants={fadeInUp} className="section-label justify-center mb-4 block">
            {siteContent.pricing.sectionLabel}
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-navy mb-5 leading-tight"
          >
            {siteContent.pricing.title}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-muted max-w-xl mx-auto"
          >
            {siteContent.pricing.subtitle}
          </motion.p>

          {/* Toggle */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center justify-center gap-3 mt-8"
          >
            <span className={`text-sm font-medium transition-colors ${!isYearly ? "text-navy" : "text-muted-light"}`}>
              {siteContent.pricing.toggle.monthly}
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 cursor-pointer ${isYearly ? "bg-teal" : "bg-navy/15"
                }`}
              aria-label="Toggle pricing period"
            >
              <motion.div
                layout
                className="absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white shadow-sm"
                style={{ left: isYearly ? "calc(100% - 21px)" : "3px" }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={`text-sm font-medium transition-colors ${isYearly ? "text-navy" : "text-muted-light"}`}>
              {siteContent.pricing.toggle.yearly}
            </span>
            {isYearly && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center bg-gold/10 text-gold text-[11px] font-bold px-2.5 py-1 rounded-md tracking-wide"
              >
                {siteContent.pricing.toggle.discount}
              </motion.span>
            )}
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 items-start"
        >
          {pricingTiers.map((tier, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className={`relative rounded-xl transition-all duration-300 ${tier.highlighted
                  ? "bg-navy text-white shadow-xl ring-1 ring-teal/30 lg:scale-[1.03]"
                  : tier.ghost
                    ? "bg-warm-white border border-dashed border-navy/15"
                    : "bg-white border border-card-border card-hover"
                }`}
            >
              {/* Badge */}
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-gold to-gold-light text-navy text-[10px] font-bold px-4 py-1 rounded-md shadow-md whitespace-nowrap tracking-wide uppercase">
                    {tier.badge}
                  </span>
                </div>
              )}

              <div className="p-6 lg:p-7">
                {/* Header */}
                <div className="mb-5 pt-1">
                  <h3 className={`text-lg font-bold mb-1 tracking-tight ${tier.highlighted ? "text-white" : "text-navy"}`}>
                    {tier.name}
                  </h3>
                  <p className={`text-xs ${tier.highlighted ? "text-white/50" : "text-muted-light"}`}>
                    {tier.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-3xl font-extrabold tracking-tight ${tier.highlighted ? "text-white" : "text-navy"}`}>
                      {isYearly ? tier.priceYearly : tier.priceMonthly}
                    </span>
                    <span className={`text-xs ${tier.highlighted ? "text-white/40" : "text-muted-light"}`}>
                      {tier.priceSuffix}
                    </span>
                  </div>
                  <span className={`text-[11px] ${tier.highlighted ? "text-white/35" : "text-muted-light"}`}>
                    {tier.properties}
                  </span>
                </div>

                {/* Divider */}
                <div className={`w-full h-px mb-5 ${tier.highlighted ? "bg-white/10" : "bg-border-light"}`} />

                {/* Features */}
                <ul className="space-y-2.5 mb-6">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      {feature.included ? (
                        <Check className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${tier.highlighted ? "text-teal-light" : "text-teal"}`} />
                      ) : (
                        <X className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${tier.highlighted ? "text-white/20" : "text-border"}`} />
                      )}
                      <span className={`text-[13px] leading-snug ${feature.included
                          ? tier.highlighted ? "text-white/80" : "text-navy/80"
                          : tier.highlighted ? "text-white/20" : "text-muted-light"
                        }`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => handleScroll("#contact")}
                  className={`w-full group inline-flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-sm transition-all duration-300 cursor-pointer ${tier.highlighted
                      ? "bg-teal hover:bg-teal-light text-white hover:shadow-lg"
                      : tier.ghost
                        ? "bg-navy text-white hover:bg-navy-light hover:shadow-lg"
                        : "bg-navy/[0.03] text-navy hover:bg-navy hover:text-white"
                    }`}
                >
                  {tier.cta}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Note */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center text-xs text-muted-light mt-8"
        >
          {siteContent.pricing.trustNote}
        </motion.p>
      </div>
    </section>
  );
}
