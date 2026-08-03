"use client";

import { use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Sparkles,
  SprayCan,
  Camera,
  CalendarRange,
  Building2,
  Check,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { siteContent } from "@/lib/content";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";

const iconMap = {
  Sparkles,
  SprayCan,
  Camera,
  CalendarRange,
  Building2,
};

interface StepItem {
  step: string;
  title: string;
  description: string;
}

interface FeatureItem {
  title: string;
  description: string;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function SingleServicePage({ params }: PageProps) {
  const { slug } = use(params);

  const allServices = [
    ...siteContent.servicesPage.items,
    ...siteContent.airbnbServicesPage.items,
    ...siteContent.hotelServicesPage.items,
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawService = allServices.find((s: any) => s.slug === slug);

  if (!rawService) {
    notFound();
  }

  // Cast safely
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const service = rawService as any;

  const iconName = service.icon || "Building2";
  const IconComp = iconMap[iconName as keyof typeof iconMap] || Sparkles;

  const howItWorksList: StepItem[] = service.howItWorks || [];
  const featuresList: (string | FeatureItem)[] = service.features || [];

  return (
    <>
      <Navbar siteContent={siteContent} />
      <main className="min-h-screen bg-warm-white">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-slate-100">
          <div className="absolute bottom-0 left-0 right-0 animated-gradient-line" />
          <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-teal/[0.05] blur-[100px] rounded-full pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.div variants={fadeInUp}>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-teal transition-colors mb-8 bg-white border border-slate-200 px-4 py-2 rounded-full shadow-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Όλες οι Υπηρεσίες
                </Link>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="w-16 h-16 rounded-2xl bg-teal/10 text-teal flex items-center justify-center mx-auto mb-6 border border-teal/20"
              >
                <IconComp className="w-8 h-8" />
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-800 leading-tight tracking-tight max-w-4xl mx-auto"
              >
                {service.title}
              </motion.h1>

              {service.tagline && (
                <motion.p
                  variants={fadeInUp}
                  className="mt-4 text-xl text-teal font-medium max-w-2xl mx-auto"
                >
                  {service.tagline}
                </motion.p>
              )}

              <motion.p
                variants={fadeInUp}
                className="mt-6 text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed font-light"
              >
                {service.description}
              </motion.p>

              <motion.div variants={fadeInUp} className="mt-10">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2.5 bg-teal hover:bg-teal-dark text-white px-8 py-4 rounded-lg text-base font-semibold transition-all duration-300 shadow-lg shadow-teal/20 hover:shadow-teal/30"
                >
                  Ζητήστε Προσφορά
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* How it works & Features section */}
        <section className="section-padding bg-warm-white relative">
          <div className="section-divider absolute top-0 left-0" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* How It Works (if available) */}
            {howItWorksList.length > 0 && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={staggerContainer}
                className="mb-20"
              >
                <motion.div variants={fadeInUp} className="text-center max-w-2xl mx-auto mb-12">
                  <span className="section-label justify-center mb-3">Διαδικασία</span>
                  <h2 className="text-3xl sm:text-4xl font-bold text-navy">Πώς Λειτουργεί</h2>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {howItWorksList.map((step, idx) => (
                    <motion.div
                      key={idx}
                      variants={fadeInUp}
                      className="bg-white border border-card-border rounded-xl p-6 relative card-hover"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal to-teal-dark text-white font-bold flex items-center justify-center mb-4 shadow-sm">
                        {step.step}
                      </div>
                      <h3 className="text-lg font-bold text-navy mb-2">{step.title}</h3>
                      <p className="text-sm text-muted leading-relaxed">{step.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Features list */}
            {featuresList.length > 0 && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={staggerContainer}
              >
                <motion.div variants={fadeInUp} className="text-center max-w-2xl mx-auto mb-12">
                  <span className="section-label justify-center mb-3">Χαρακτηριστικά</span>
                  <h2 className="text-3xl sm:text-4xl font-bold text-navy">Τι Περιλαμβάνει η Υπηρεσία</h2>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuresList.map((feature, idx) => {
                    const title = typeof feature === "string" ? feature : feature.title;
                    const desc = typeof feature === "string" ? null : feature.description;

                    return (
                      <motion.div
                        key={idx}
                        variants={fadeInUp}
                        className="bg-white border border-card-border hover:border-teal/30 rounded-2xl p-6 lg:p-8 card-hover"
                      >
                        <h3 className="text-lg font-bold text-navy mb-2">{title}</h3>
                        {desc && <p className="text-sm text-muted leading-relaxed">{desc}</p>}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA section */}
        <section className="section-padding bg-slate-50 relative overflow-hidden text-center">
          <div className="section-divider absolute top-0 left-0" />
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
              Ενδιαφέρεστε για την Υπηρεσία;
            </h2>
            <p className="text-base text-slate-500 mb-8 leading-relaxed">
              Επικοινωνήστε μαζί μας σήμερα για μια δωρεάν εκτίμηση και προσαρμοσμένο πλάνο.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2.5 bg-teal hover:bg-teal-dark text-white px-8 py-4 rounded-lg text-base font-semibold transition-all duration-300 shadow-xl shadow-teal/20"
            >
              Ξεκινήστε Δωρεάν
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer siteContent={siteContent} />
    </>
  );
}
