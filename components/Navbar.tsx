"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SiteContent } from "@/lib/get-content";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

interface NavbarProps {
  siteContent: SiteContent;
}

export default function Navbar({ siteContent }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHashLink = (href: string) => href.startsWith("#");

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (isHashLink(href)) {
      if (pathname === "/") {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = `/${href}`;
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group cursor-pointer"
            onClick={() => {
              setIsOpen(false);
              if (pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <span
              className={`text-lg font-bold font-heading tracking-tight transition-colors ${
                isScrolled ? "text-navy" : "text-slate-800"
              }`}
            >
              {siteContent.brand.name}
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {siteContent.nav.links.map((link) =>
              isHashLink(link.href) ? (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => handleNavClick(link.href)}
                  className={`px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all duration-300 cursor-pointer ${
                    isScrolled
                      ? "text-muted hover:text-navy hover:bg-light-gray"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all duration-300 cursor-pointer ${
                    isScrolled
                      ? "text-muted hover:text-navy hover:bg-light-gray"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
            <div
              className={`w-px h-5 mx-2 ${
                isScrolled ? "bg-border" : "bg-slate-200"
              }`}
            />
            <button
              onClick={() => handleNavClick("#contact")}
              className="bg-teal hover:bg-teal-light text-white font-semibold px-5 py-2.5 rounded-lg text-xs md:text-sm transition-all duration-300 shadow-md shadow-teal/20 hover:shadow-teal/30 hover:scale-[1.02] cursor-pointer"
            >
              {siteContent.nav.cta}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
              className={`md:hidden p-2 rounded-lg transition-colors cursor-pointer ${
                isScrolled
                  ? "text-navy hover:bg-light-gray"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0 flex flex-col border-border/50 bg-white/95 backdrop-blur-xl">
              <SheetTitle className="sr-only">Μενού Πλοήγησης</SheetTitle>
              <div className="flex flex-col pt-20 px-6 gap-2">
                {siteContent.nav.links.map((link, i) =>
                  isHashLink(link.href) ? (
                    <motion.button
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      onClick={() => handleNavClick(link.href)}
                      className="text-left py-4 text-base font-medium text-navy hover:text-primary transition-colors border-b border-border/50 cursor-pointer"
                    >
                      {link.label}
                    </motion.button>
                  ) : (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="block py-4 text-base font-medium text-navy hover:text-primary transition-colors border-b border-border/50 cursor-pointer"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  )
                )}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6"
                >
                  <button
                    onClick={() => handleNavClick("#contact")}
                    className="w-full bg-teal hover:bg-teal-light text-white font-semibold py-3.5 rounded-lg text-base transition-all duration-300 shadow-md shadow-teal/20 cursor-pointer"
                  >
                    {siteContent.nav.cta}
                  </button>
                </motion.div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}
