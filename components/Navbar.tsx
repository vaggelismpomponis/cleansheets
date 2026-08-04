"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ChevronDown, SprayCan, Building2, Layers } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SiteContent } from "@/lib/get-content";
import Logo from "@/components/Logo";
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
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
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
    setIsServicesOpen(false);
    if (isHashLink(href)) {
      if (pathname === "/") {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = `/${href}`;
      }
    }
  };

  const serviceSubItems = [
    {
      label: "Όλες οι Υπηρεσίες",
      href: "/services",
      description: "Πλήρης κατάλογος & επισκόπηση",
      icon: Layers,
    },
    {
      label: "Υπηρεσίες για Airbnb",
      href: "/services/airbnb",
      description: "Καθαρισμός, σεντόνια & διαχείριση",
      icon: SprayCan,
    },
    {
      label: "Υπηρεσίες για Ξενοδοχεία",
      href: "/services/xenodoxeia",
      description: "Καμαριέρες, λάντζα & εστίαση",
      icon: Building2,
    },
  ];

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
            className="flex items-center group cursor-pointer"
            onClick={() => {
              setIsOpen(false);
              if (pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <Logo
              brandName={siteContent.brand.name}
              size="md"
              theme="light"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {siteContent.nav.links.map((link) => {
              if (link.href === "/services") {
                return (
                  <div
                    key={link.href}
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <button
                      type="button"
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all duration-300 cursor-pointer ${
                        isScrolled
                          ? "text-muted hover:text-navy hover:bg-light-gray"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      } ${isServicesOpen ? "bg-slate-100/80 text-navy" : ""}`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isServicesOpen ? "rotate-180 text-teal" : "opacity-60"
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          className="absolute left-0 top-full pt-2 w-64 z-50"
                        >
                          <div className="bg-white/95 backdrop-blur-xl border border-slate-200/80 rounded-2xl shadow-xl p-2 space-y-1">
                            {serviceSubItems.map((subItem) => {
                              const IconComponent = subItem.icon;
                              const isActive = pathname === subItem.href;
                              return (
                                <Link
                                  key={subItem.href}
                                  href={subItem.href}
                                  onClick={() => setIsServicesOpen(false)}
                                  className={`flex items-start gap-3 p-2.5 rounded-xl transition-all duration-200 group ${
                                    isActive
                                      ? "bg-teal/8 text-teal font-semibold"
                                      : "hover:bg-slate-50 text-slate-700 hover:text-navy"
                                  }`}
                                >
                                  <div className="w-8 h-8 rounded-lg bg-navy/5 text-navy/70 group-hover:bg-teal group-hover:text-white flex items-center justify-center shrink-0 transition-colors mt-0.5 shadow-inner">
                                    <IconComponent className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <div className="text-xs font-bold leading-snug group-hover:text-teal transition-colors">
                                      {subItem.label}
                                    </div>
                                    <div className="text-[11px] text-slate-400 font-normal leading-tight mt-0.5">
                                      {subItem.description}
                                    </div>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return isHashLink(link.href) ? (
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
              );
            })}
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
              <div className="flex flex-col pt-12 px-6 gap-2">
                <div className="pb-6 border-b border-border/60">
                  <Logo brandName={siteContent.brand.name} size="sm" theme="light" />
                </div>
                {siteContent.nav.links.map((link, i) => {
                  if (link.href === "/services") {
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                        className="border-b border-border/50 py-2"
                      >
                        <button
                          type="button"
                          onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                          className="w-full flex items-center justify-between py-2 text-left cursor-pointer group"
                        >
                          <span className="text-base font-medium text-navy group-hover:text-teal transition-colors">
                            {link.label}
                          </span>
                          <div className={`p-1.5 rounded-lg border transition-all duration-200 ${
                            isMobileServicesOpen
                              ? "border-teal/30 text-teal bg-teal/5"
                              : "border-slate-200 text-slate-500"
                          }`}>
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${
                                isMobileServicesOpen ? "rotate-180" : ""
                              }`}
                            />
                          </div>
                        </button>

                        <AnimatePresence>
                          {isMobileServicesOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="pl-3 space-y-2 pt-1 pb-2 overflow-hidden"
                            >
                              {serviceSubItems.map((sub) => (
                                <Link
                                  key={sub.href}
                                  href={sub.href}
                                  onClick={() => {
                                    setIsOpen(false);
                                    setIsMobileServicesOpen(false);
                                  }}
                                  className="flex items-center gap-2.5 text-xs font-semibold text-slate-600 hover:text-teal py-1.5"
                                >
                                  <sub.icon className="w-3.5 h-3.5 text-teal" />
                                  <span>{sub.label}</span>
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  }

                  return isHashLink(link.href) ? (
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
                  );
                })}
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

