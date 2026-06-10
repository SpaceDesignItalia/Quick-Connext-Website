"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Hotel,
  Factory,
  HeartPulse,
  Building2,
  type LucideIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type NavLink = {
  href: string;
  label: string;
  match?: (pathname: string) => boolean;
};

const SERVICES: {
  href: string;
  title: string;
  desc: string;
  icon: LucideIcon;
}[] = [
  {
    href: "/hotel",
    title: "Hotel",
    desc: "Comfort camera, risparmio energetico e check-in connesso.",
    icon: Hotel,
  },
  {
    href: "/industry",
    title: "Industria",
    desc: "Monitoraggio impianti, energia e continuità produttiva.",
    icon: Factory,
  },
  {
    href: "/rsa",
    title: "RSA",
    desc: "Sicurezza, clima e gestione ambienti per la cura.",
    icon: HeartPulse,
  },
  {
    href: "/building",
    title: "Edifici",
    desc: "Uffici e direzionali a impatto zero, certificati BACS.",
    icon: Building2,
  },
];

const SERVICE_PATHS = SERVICES.map((s) => s.href);

const navLinks: NavLink[] = [
  { href: "/", label: "Home", match: (p) => p === "/" },
  {
    href: "/progetti",
    label: "Case study",
    match: (p) => p.startsWith("/progetti"),
  },
  { href: "/blog", label: "Blog", match: (p) => p.startsWith("/blog") },
  {
    href: "/chi-siamo",
    label: "Chi siamo",
    match: (p) => p.startsWith("/chi-siamo"),
  },
  {
    href: "/contatti",
    label: "Contatti",
    match: (p) => p.startsWith("/contatti"),
  },
];

function isServicesActive(pathname: string) {
  return SERVICE_PATHS.some((path) => pathname.startsWith(path));
}

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openServices = useCallback(() => {
    if (servicesCloseTimer.current) {
      clearTimeout(servicesCloseTimer.current);
      servicesCloseTimer.current = null;
    }
    setServicesOpen(true);
  }, []);

  const scheduleCloseServices = useCallback(() => {
    servicesCloseTimer.current = setTimeout(() => setServicesOpen(false), 120);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setMobileServicesOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-brand-line bg-white shadow-nav">
      <div className="relative mx-auto flex h-[68px] max-w-[1280px] items-center justify-between px-5 md:px-10">
        <Link href="/" className="relative z-10 flex shrink-0 items-center gap-3 group">
          <Image
            src="/logo.png"
            alt="QuickConnext"
            width={40}
            height={40}
            className="h-9 w-9 object-contain transition-transform duration-500 group-hover:scale-105"
            priority
          />
          <div className="flex flex-col leading-none">
            <span className="text-[20px] font-semibold tracking-tight text-brand-navy">
              QuickConnext
            </span>
            <span className="mt-1 text-[9.5px] font-semibold uppercase tracking-[0.32em] text-brand-teal">
              Building
            </span>
          </div>
        </Link>

        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 lg:flex">
          {navLinks.slice(0, 1).map((link) => (
            <NavItem key={link.href} link={link} pathname={pathname} />
          ))}

          <div onMouseEnter={openServices} onMouseLeave={scheduleCloseServices}>
            <button
              type="button"
              className={`flex items-center gap-1 rounded-full px-4 py-2 text-[13px] font-medium transition-colors ${
                isServicesActive(pathname) || servicesOpen
                  ? "bg-brand-ivory-deep text-brand-navy"
                  : "text-brand-stone hover:bg-brand-ivory-deep/70 hover:text-brand-navy"
              }`}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
            >
              Servizi
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  servicesOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {navLinks.slice(1).map((link) => (
            <NavItem key={link.href} link={link} pathname={pathname} />
          ))}
        </nav>

        <div className="relative z-10 flex items-center gap-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 text-brand-navy transition-colors hover:text-brand-teal lg:hidden"
            aria-label={isOpen ? "Chiudi menu" : "Apri menu"}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {servicesOpen && (
          <motion.div
            key="services-dropdown"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed inset-x-0 top-[68px] z-50 hidden flex-col items-center pt-3 lg:flex"
            onMouseEnter={openServices}
            onMouseLeave={scheduleCloseServices}
          >
            <div className="w-[min(92vw,680px)] px-5">
              <div className="overflow-hidden rounded-2xl border border-brand-line bg-white shadow-card">
                <div className="grid grid-cols-2 gap-1 p-3">
                  {SERVICES.map((service) => {
                    const Icon = service.icon;
                    const active = pathname.startsWith(service.href);
                    return (
                      <Link
                        key={service.href}
                        href={service.href}
                        className={`group flex gap-3 rounded-xl p-4 transition-colors ${
                          active
                            ? "bg-brand-ivory-deep"
                            : "hover:bg-brand-ivory-deep/60"
                        }`}
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-ivory text-brand-stone transition-colors group-hover:text-brand-teal">
                          <Icon className="h-5 w-5" strokeWidth={1.6} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[15px] font-semibold text-brand-navy">
                            {service.title}
                          </p>
                          <p className="mt-1 text-[13px] leading-snug text-brand-stone">
                            {service.desc}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
                <Link
                  href="/contatti"
                  className="flex items-center justify-between border-t border-brand-line bg-brand-ivory px-5 py-4 text-[13px] text-brand-stone transition-colors hover:bg-brand-ivory-deep hover:text-brand-navy"
                >
                  <span>Non sai da dove partire? Raccontaci il problema</span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 top-[68px] z-40 bg-brand-navy-dark/30 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0.08, duration: 0.45 }}
              className="fixed right-0 top-[68px] bottom-0 z-40 flex w-4/5 max-w-sm flex-col overflow-y-auto border-l border-brand-line bg-white p-6 lg:hidden"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-xl px-3 py-3 text-[15px] font-medium transition-colors ${
                      link.match?.(pathname)
                        ? "bg-brand-ivory-deep text-brand-navy"
                        : "text-brand-stone hover:bg-brand-ivory hover:text-brand-navy"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                <button
                  type="button"
                  onClick={() => setMobileServicesOpen((v) => !v)}
                  className={`flex items-center justify-between rounded-xl px-3 py-3 text-left text-[15px] font-medium transition-colors ${
                    isServicesActive(pathname) || mobileServicesOpen
                      ? "bg-brand-ivory-deep text-brand-navy"
                      : "text-brand-stone hover:bg-brand-ivory hover:text-brand-navy"
                  }`}
                >
                  Servizi
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      mobileServicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-1 pb-2 pl-2">
                        {SERVICES.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            className={`rounded-lg px-3 py-2.5 text-sm transition-colors ${
                              pathname.startsWith(service.href)
                                ? "bg-brand-ivory-deep font-medium text-brand-navy"
                                : "text-brand-stone hover:bg-brand-ivory hover:text-brand-navy"
                            }`}
                          >
                            {service.title}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavItem({ link, pathname }: { link: NavLink; pathname: string }) {
  const isActive = link.match?.(pathname) ?? pathname === link.href;

  return (
    <Link
      href={link.href}
      className={`rounded-full px-4 py-2 text-[13px] font-medium transition-colors ${
        isActive
          ? "bg-brand-ivory-deep text-brand-navy"
          : "text-brand-stone hover:bg-brand-ivory-deep/70 hover:text-brand-navy"
      }`}
    >
      {link.label}
    </Link>
  );
}
