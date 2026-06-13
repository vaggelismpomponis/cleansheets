"use client";

import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import { siteContent } from "@/lib/content";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white/60 relative overflow-hidden">
      {/* Top accent line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12"
        >
          {/* Brand Column */}
          <motion.div variants={fadeInUp} className="col-span-2 md:col-span-4 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-md bg-gradient-to-br from-teal to-teal-dark flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18"/>
                  <path d="M3 12h18"/>
                  <path d="M3 18h18"/>
                  <path d="M20 6l-2 12H6L4 6"/>
                </svg>
              </div>
              <span className="text-base font-bold text-white font-heading tracking-tight">
                {siteContent.brand.name}
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs text-white/40">
              {siteContent.footer.description}
            </p>
          </motion.div>

          {/* Service Links */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-white/80 font-semibold text-xs tracking-wider uppercase mb-4">
              {siteContent.footer.columns.service.title}
            </h4>
            <ul className="space-y-2.5">
              {siteContent.footer.columns.service.links.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("#") ? (
                    <a href={link.href} className="text-sm text-white/40 hover:text-teal-light transition-colors">
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className="text-sm text-white/40 hover:text-teal-light transition-colors">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Coverage Links */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-white/80 font-semibold text-xs tracking-wider uppercase mb-4">
              {siteContent.footer.columns.coverage.title}
            </h4>
            <ul className="space-y-2.5">
              {siteContent.footer.columns.coverage.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-white/40 hover:text-teal-light transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-white/80 font-semibold text-xs tracking-wider uppercase mb-4">
              {siteContent.footer.columns.legal.title}
            </h4>
            <ul className="space-y-2.5">
              {siteContent.footer.columns.legal.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-white/40 hover:text-teal-light transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-white/80 font-semibold text-xs tracking-wider uppercase mb-4">
              {siteContent.footer.contact.title}
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${siteContent.footer.contact.email}`}
                  className="flex items-center gap-2 text-sm text-white/40 hover:text-teal-light transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  {siteContent.footer.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteContent.footer.contact.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-sm text-white/40 hover:text-teal-light transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 shrink-0" />
                  {siteContent.footer.contact.phone}
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/25" suppressHydrationWarning>
            {siteContent.brand.copyright}
          </p>
          <p className="text-[11px] text-white/25">
            Σχεδιάσμος & Υλοποίηση: <a className="text-teal-light/60 hover:text-teal-light transition-colors" href="https://ebomponis.vercel.app" target="_blank" rel="noopener noreferrer">Vaggelis Bomponis</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
