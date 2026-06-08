"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/hotel", label: "Hotel" },
  { href: "/industry", label: "Industry" },
  { href: "/rsa", label: "RSA" },
  { href: "/building", label: "Building" },
  { href: "/chi-siamo", label: "Chi Siamo" },
  { href: "/contatti", label: "Contatti" },
];

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3 glass-nav shadow-nav" : "py-6 glass-nav-transparent"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/logo.png"
            alt="QuickConnext"
            width={40}
            height={40}
            className="w-9 h-9 object-contain transition-transform duration-500 group-hover:scale-105"
            priority
          />
          <div className="flex flex-col leading-none">
            <span className="font-serif text-[20px] font-semibold tracking-tight text-brand-navy">
              QuickConnext
            </span>
            <span className="text-[9.5px] text-brand-teal uppercase tracking-[0.32em] font-semibold mt-1">
              Building
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-9">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative text-[13px] font-medium tracking-wide transition-colors py-1 ${
                  isActive
                    ? "text-brand-navy"
                    : "text-brand-stone hover:text-brand-navy"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-brand-teal transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center">
          <Link href="/contatti" className="cta-button-primary group">
            Prenota una demo
            <ArrowRight
              size={14}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-brand-navy hover:text-brand-teal transition-colors p-1"
          aria-label="Apri menu"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 top-[64px] bg-brand-navy-dark/40 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0.08, duration: 0.45 }}
              className="fixed right-0 top-[64px] bottom-0 w-4/5 max-w-sm bg-brand-ivory border-l border-brand-line z-40 p-8 flex flex-col justify-between lg:hidden"
            >
              <div className="flex flex-col mt-2">
                {navLinks.map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`font-serif text-2xl py-3.5 border-b border-brand-line transition-colors ${
                        isActive
                          ? "text-brand-teal"
                          : "text-brand-navy hover:text-brand-teal"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              <div className="mb-10">
                <Link
                  href="/contatti"
                  className="w-full justify-center cta-button-primary py-4 flex"
                >
                  Prenota una demo
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
