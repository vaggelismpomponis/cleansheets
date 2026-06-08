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
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute -bottom-32 right-0 w-96 h-96 bg-teal/3 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block text-teal text-sm font-semibold tracking-wider uppercase mb-3"
          >
            {siteContent.pricing.sectionLabel}
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-4"
          >
            {siteContent.pricing.title}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-muted max-w-2xl mx-auto"
          >
            {siteContent.pricing.subtitle}
          </motion.p>

          {/* Monthly / Yearly Toggle */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center justify-center gap-4 mt-8"
          >
            <span
              className={`text-sm font-medium transition-colors ${
                !isYearly ? "text-navy" : "text-muted"
              }`}
            >
              {siteContent.pricing.toggle.monthly}
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 cursor-pointer ${
                isYearly ? "bg-teal" : "bg-navy/20"
              }`}
              aria-label="Toggle pricing period"
            >
              <motion.div
                layout
                className="absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md"
                style={{ left: isYearly ? "calc(100% - 26px)" : "2px" }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <span
              className={`text-sm font-medium transition-colors ${
                isYearly ? "text-navy" : "text-muted"
              }`}
            >
              {siteContent.pricing.toggle.yearly}
            </span>
            {isYearly && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center bg-teal/10 text-teal text-xs font-bold px-3 py-1 rounded-full"
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
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5 items-start"
        >
          {pricingTiers.map((tier, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className={`relative rounded-2xl p-6 lg:p-7 transition-all duration-300 ${
                tier.highlighted
                  ? "bg-navy text-white ring-2 ring-teal shadow-2xl scale-[1.02] lg:scale-105"
                  : tier.ghost
                  ? "bg-gradient-to-br from-light-gray/80 to-cream border border-dashed border-navy/20"
                  : "bg-white border border-card-border card-hover"
              }`}
            >
              {/* Badge */}
              {tier.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-teal text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                    {tier.badge}
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="mb-5 pt-2">
                <h3
                  className={`text-xl font-bold mb-1 ${
                    tier.highlighted ? "text-white" : "text-navy"
                  }`}
                >
                  {tier.name}
                </h3>
                <p
                  className={`text-sm ${
                    tier.highlighted ? "text-white/70" : "text-muted"
                  }`}
                >
                  {tier.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span
                    className={`text-4xl font-extrabold ${
                      tier.highlighted ? "text-white" : "text-navy"
                    }`}
                  >
                    {isYearly ? tier.priceYearly : tier.priceMonthly}
                  </span>
                  <span
                    className={`text-sm ${
                      tier.highlighted ? "text-white/60" : "text-muted"
                    }`}
                  >
                    {tier.priceSuffix}
                  </span>
                </div>
                <span
                  className={`text-xs ${
                    tier.highlighted ? "text-white/50" : "text-muted"
                  }`}
                >
                  {tier.properties}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-7">
                {tier.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-2.5">
                    {feature.included ? (
                      <Check
                        className={`w-4 h-4 mt-0.5 shrink-0 ${
                          tier.highlighted ? "text-teal-light" : "text-teal"
                        }`}
                      />
                    ) : (
                      <X
                        className={`w-4 h-4 mt-0.5 shrink-0 ${
                          tier.highlighted ? "text-white/30" : "text-gray-300"
                        }`}
                      />
                    )}
                    <span
                      className={`text-sm ${
                        feature.included
                          ? tier.highlighted
                            ? "text-white/90"
                            : "text-navy"
                          : tier.highlighted
                          ? "text-white/30"
                          : "text-gray-400"
                      }`}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => handleScroll("#contact")}
                className={`w-full group inline-flex items-center justify-center gap-2 py-3 rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer ${
                  tier.highlighted
                    ? "bg-teal hover:bg-teal-light text-white hover:shadow-lg"
                    : tier.ghost
                    ? "bg-navy text-white hover:bg-navy-light hover:shadow-lg"
                    : "bg-navy/5 text-navy hover:bg-navy hover:text-white"
                }`}
              >
                {tier.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Note */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center text-sm text-muted mt-8"
        >
          {siteContent.pricing.trustNote}
        </motion.p>
      </div>
    </section>
  );
}
