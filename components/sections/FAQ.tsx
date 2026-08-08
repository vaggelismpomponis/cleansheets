"use client";

import { motion } from "framer-motion";
import type { SiteContent, FAQItem } from "@/lib/get-content";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLivePreview } from "@/components/LivePreviewProvider";

interface FAQProps {
  siteContent: SiteContent;
  faqItems: FAQItem[];
}

export default function FAQ({ siteContent: initialContent, faqItems: initialFaq }: FAQProps) {
  const { siteContent, faqItems } = useLivePreview();
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section id="faq" className="section-padding bg-warm-white relative overflow-hidden">
      {/* JSON-LD for FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Top divider */}
      <div className="section-divider absolute top-0 left-0" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-12 lg:mb-14"
        >
          <motion.span variants={fadeInUp} className="section-label justify-center mb-4 block">
            {siteContent.faq.sectionLabel}
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-navy leading-tight"
          >
            {siteContent.faq.title}
          </motion.h2>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          <Accordion className="space-y-4">
            {faqItems.map((item, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <AccordionItem
                  value={`item-${i}`}
                  className="bg-white rounded-xl border border-card-border px-5 sm:px-6 hover:border-teal/30 transition-colors data-[state=open]:border-teal/50 data-[state=open]:shadow-md"
                >
                  <AccordionTrigger className="text-left text-[15px] sm:text-base font-semibold text-navy hover:text-teal hover:no-underline py-5">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[15px] text-muted leading-relaxed pb-6">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
