"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, SprayCan, ShieldCheck, Camera, CalendarRange, Building2, ArrowUpRight } from "lucide-react";
import type { SiteContent } from "@/lib/get-content";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const iconMap = {
  Sparkles,
  SprayCan,
  ShieldCheck,
  Camera,
  CalendarRange,
  Building2,
};

interface ServicesProps {
  siteContent: SiteContent;
}

export default function Services({ siteContent }: ServicesProps) {
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
                href={"href" in service ? (service as { href: string }).href : "/services"}
                className="block group h-full"
              >
                <motion.div variants={fadeInUp} className="h-full">
                  <Card className="relative bg-white border-card-border hover:border-teal/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-400 h-full overflow-hidden">
                    <CardContent className="p-7 lg:p-8 flex flex-col h-full">
                      {/* Number + Icon row */}
                      <div className="flex items-start justify-between mb-6">
                        <Badge variant="secondary" className="font-heading text-xs font-bold text-muted-light bg-light-gray">
                          {num}
                        </Badge>
                        <div className="w-11 h-11 rounded-xl bg-navy/5 text-navy/60 flex items-center justify-center group-hover:bg-teal group-hover:text-white transition-all duration-400 shadow-inner">
                          <IconComponent className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-navy mb-3 tracking-tight group-hover:text-teal transition-colors duration-300">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-[15px] text-muted leading-relaxed mb-6 flex-1">
                        {service.description}
                      </p>

                      {/* Features — minimal */}
                      <ul className="space-y-2.5 mb-6 border-t border-border-light pt-6">
                        {service.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-3 text-[13px] text-navy/80 font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Learn More */}
                      <div className="flex items-center gap-1.5 text-sm font-semibold text-teal group-hover:text-teal-light transition-colors mt-auto">
                        <span>Μάθετε Περισσότερα</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
