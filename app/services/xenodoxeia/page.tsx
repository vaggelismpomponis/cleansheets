"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Building2, Check, ArrowRight, ArrowLeft } from "lucide-react";
import { siteContent } from "@/lib/content";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";

interface StepItem {
  step: string;
  title: string;
  description: string;
}

interface FeatureItem {
  title: string;
  description: string;
}

interface ServiceItem {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  howItWorks: readonly StepItem[];
  features: readonly FeatureItem[];
}

export default function HotelServicesPage() {
  const pageContent = siteContent.hotelServicesPage;

  return (
    <>
      <Navbar siteContent={siteContent} />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-navy">
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy-light/30 to-navy" />
          <div className="absolute bottom-0 left-0 right-0 animated-gradient-line" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.div variants={fadeInUp}>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-teal-light transition-colors mb-8"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Όλες οι Υπηρεσίες
                </Link>
              </motion.div>

              <motion.span
                variants={fadeInUp}
                className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-teal-light mb-6"
              >
                <span className="w-6 h-px bg-teal-light" />
                Ξενοδοχεία
              </motion.span>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight"
              >
                {pageContent.title}
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="mt-6 text-lg sm:text-xl text-white/50 max-w-3xl mx-auto leading-relaxed font-light"
              >
                {pageContent.subtitle}
              </motion.p>

              {/* Quick nav pills */}
              <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap justify-center gap-2">
                {pageContent.items.map((item: ServiceItem) => (
                  <a
                    key={item.slug}
                    href={`#${item.slug}`}
                    className="group inline-flex items-center gap-2 bg-white/[0.05] border border-white/[0.08] hover:border-teal/30 hover:bg-white/[0.08] px-4 py-2 rounded-lg text-xs font-medium text-white/70 hover:text-teal-light transition-all duration-300"
                  >
                    <Building2 className="w-3.5 h-3.5 text-teal-light/60" />
                    {item.title}
                  </a>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Service Detail Sections */}
        {pageContent.items.map((service: ServiceItem, index: number) => {
          const isEven = index % 2 === 1;
          const num = String(index + 1).padStart(2, "0");

          return (
            <section
              key={service.slug}
              id={service.slug}
              className={`section-padding relative overflow-hidden scroll-mt-20 ${isEven ? "bg-warm-white" : "bg-white"}`}
            >
              <div className="section-divider absolute top-0 left-0" />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Service Header */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={staggerContainer}
                  className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16 ${isEven ? "lg:flex-row-reverse" : ""}`}
                >
                  <motion.div variants={fadeInUp} className={`${isEven ? "lg:order-2" : ""}`}>
                    <div className="flex items-center gap-4 mb-6">
                      <span className="number-badge text-lg">{num}</span>
                      <div className="w-12 h-12 rounded-xl bg-teal/8 text-teal flex items-center justify-center">
                        <Building2 className="w-6 h-6" />
                      </div>
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-3 tracking-tight">
                      {service.title}
                    </h2>
                    <p className="text-base text-teal font-medium mb-4">{service.tagline}</p>
                    <p className="text-muted leading-relaxed text-[15px]">{service.description}</p>

                    <div className="mt-8">
                      <Link
                        href="/#contact"
                        className="group inline-flex items-center gap-2 bg-teal hover:bg-teal-light text-white px-7 py-3.5 rounded-lg text-base font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-teal/20"
                      >
                        Ξεκινήστε Σήμερα
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>

                  {/* How It Works */}
                  <motion.div variants={fadeInUp} className={`${isEven ? "lg:order-1" : ""}`}>
                    <div className="bg-warm-white border border-card-border rounded-xl p-7 lg:p-8">
                      <h3 className="text-base font-bold text-navy mb-6 flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-lg bg-teal/8 text-teal flex items-center justify-center text-xs font-bold">?</span>
                        Πώς Λειτουργεί
                      </h3>
                      <div className="space-y-5">
                        {service.howItWorks.map((step: StepItem, sIdx: number) => (
                          <div key={sIdx} className="flex gap-4">
                            <div className="shrink-0">
                              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-teal to-teal-dark text-white flex items-center justify-center text-xs font-bold shadow-sm">
                                {step.step}
                              </div>
                              {sIdx < service.howItWorks.length - 1 && (
                                <div className="w-px h-4 bg-teal/15 mx-auto mt-1" />
                              )}
                            </div>
                            <div className="pt-1">
                              <h4 className="text-sm font-bold text-navy mb-0.5">{step.title}</h4>
                              <p className="text-xs text-muted leading-relaxed">{step.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={staggerContainer}
                >
                  <motion.h3 variants={fadeInUp} className="text-lg font-bold text-navy mb-8 text-center tracking-tight">
                    Τι Περιλαμβάνει
                  </motion.h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {service.features.map((feature: FeatureItem, fIdx: number) => (
                      <motion.div
                        key={fIdx}
                        variants={fadeInUp}
                        className="group bg-white border border-card-border hover:border-teal/15 rounded-xl p-5 transition-all duration-300 hover:shadow-sm"
                      >
                        <div>
                          <h4 className="text-sm font-bold text-navy mb-1 group-hover:text-teal transition-colors">
                            {feature.title}
                          </h4>
                          <p className="text-xs text-muted leading-relaxed">{feature.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </section>
          );
        })}
      </main>
      <Footer siteContent={siteContent} />
    </>
  );
}
