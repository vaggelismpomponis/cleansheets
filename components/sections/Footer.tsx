"use client";

import { motion } from "framer-motion";
import { Mail, Phone, PhoneCall, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import type { SiteContent } from "@/lib/get-content";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import Logo from "@/components/Logo";
import { useLivePreview } from "@/components/LivePreviewProvider";

interface FooterProps {
  siteContent: SiteContent;
}

export default function Footer({ siteContent: initialContent }: FooterProps) {
  const { siteContent } = useLivePreview();
  return (
    <footer className="bg-[#27272A] text-slate-400 relative overflow-hidden">
      {/* Top accent line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-600 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12"
        >
          {/* Brand Column */}
          <motion.div variants={fadeInUp} className="col-span-1 sm:col-span-2 md:col-span-4 lg:col-span-1">
            <div className="mb-4">
              <Logo
                brandName={siteContent.brand.name}
                theme="dark"
                size="md"
              />
            </div>
            <p className="text-sm leading-relaxed max-w-xs text-white">
              {siteContent.footer.description}
            </p>
          </motion.div>

          {/* Service Links */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-white text-sm font-bold tracking-wide uppercase mb-5">
              {siteContent.footer.columns.service.title}
            </h4>
            <ul className="space-y-2.5">
              {siteContent.footer.columns.service.links.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("#") ? (
                    <a href={link.href} className="text-sm text-white hover:text-teal-light transition-colors">
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className="text-sm text-white hover:text-teal-light transition-colors">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Coverage Links */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-white text-sm font-bold tracking-wide uppercase mb-5">
              {siteContent.footer.columns.coverage.title}
            </h4>
            <ul className="space-y-2.5">
              {siteContent.footer.columns.coverage.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-white hover:text-teal-light transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-white text-sm font-bold tracking-wide uppercase mb-5">
              {siteContent.footer.columns.legal.title}
            </h4>
            <ul className="space-y-2.5">
              {siteContent.footer.columns.legal.links.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("#") ? (
                    <a href={link.href} className="text-sm text-white hover:text-teal-light transition-colors">
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className="text-sm text-white hover:text-teal-light transition-colors">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-white text-sm font-bold tracking-wide uppercase mb-5">
              {siteContent.footer.contact.title}
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${siteContent.footer.contact.email}`}
                  className="flex items-center gap-2 text-sm text-white hover:text-teal-light transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  {siteContent.footer.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteContent.footer.contact.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-sm text-white hover:text-teal-light transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 shrink-0" />
                  {siteContent.footer.contact.phone}
                </a>
              </li>
              {siteContent.footer.contact.landline && (
                <li>
                  <a
                    href={`tel:${siteContent.footer.contact.landline.replace(/\s/g, "")}`}
                    className="flex items-center gap-2 text-sm text-white hover:text-teal-light transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5 shrink-0" />
                    {siteContent.footer.contact.landline}
                  </a>
                </li>
              )}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-zinc-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-[11px] text-white">
            <span suppressHydrationWarning>{siteContent.brand.copyright}</span>
            <span className="text-zinc-600">•</span>
            <Link
              href="/admin"
              className="text-zinc-400 hover:text-teal-light transition-colors flex items-center gap-1"
            >
              <LayoutDashboard className="w-3 h-3" />
              <span>Admin Dashboard</span>
            </Link>
          </div>
          <p className="text-[11px] text-white">
            Σχεδιάσμος &amp; Υλοποίηση:{" "}
            <a
              className="text-teal-light hover:text-white transition-colors"
              href="https://ebomponis.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vaggelis Bomponis
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
