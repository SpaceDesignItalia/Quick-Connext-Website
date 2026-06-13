"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
} from "react";
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
import { cn } from "@/lib/utils";

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

const NAV_EASE = [0.22, 1, 0.36, 1] as const;

const navShellTransition = {
  duration: 0.38,
  ease: NAV_EASE,
};

function isServicesActive(pathname: string) {
  return SERVICE_PATHS.some((path) => pathname.startsWith(path));
}

function LogoMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group flex shrink-0 items-center">
      <Image
        src={compact ? "/logo.png" : "/logo-navbar.png"}
        alt="QuickConnext Building"
        width={compact ? 40 : 1024}
        height={compact ? 40 : 180}
        className={cn(
          "object-contain transition-transform group-hover:scale-[1.02]",
          compact
            ? "h-9 w-9 sm:h-10 sm:w-10"
            : "h-9 w-auto object-left sm:h-10",
        )}
        priority
      />
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(72);
  const headerRef = useRef<HTMLElement>(null);
  const servicesCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateDropdownTop = useCallback(() => {
    if (!headerRef.current) return;
    setDropdownTop(headerRef.current.getBoundingClientRect().bottom + 10);
  }, []);

  const openServices = useCallback(() => {
    if (servicesCloseTimer.current) {
      clearTimeout(servicesCloseTimer.current);
      servicesCloseTimer.current = null;
    }
    setServicesOpen(true);
  }, []);

  const scheduleCloseServices = useCallback(() => {
    servicesCloseTimer.current = setTimeout(() => setServicesOpen(false), 140);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setMobileServicesOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setCompact((prev) => {
        if (!prev && y > 56) return true;
        if (prev && y < 24) return false;
        return prev;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useLayoutEffect(() => {
    updateDropdownTop();
    window.addEventListener("resize", updateDropdownTop);
    window.addEventListener("scroll", updateDropdownTop, { passive: true });
    return () => {
      window.removeEventListener("resize", updateDropdownTop);
      window.removeEventListener("scroll", updateDropdownTop);
    };
  }, [compact, updateDropdownTop]);

  useLayoutEffect(() => {
    updateDropdownTop();
    const t = window.setTimeout(updateDropdownTop, 400);
    return () => window.clearTimeout(t);
  }, [servicesOpen, compact, updateDropdownTop]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current);
    };
  }, []);

  const mobileOverlayTop = compact ? "top-16" : "top-[72px]";

  return (
    <>
      <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 min-h-[72px]">
        <AnimatePresence initial={false}>
          {compact ? (
            <motion.div
              key="nav-compact"
              initial={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={navShellTransition}
              className="absolute inset-x-0 top-0 flex justify-center px-3 pt-3 sm:px-4"
            >
              <div className="flex max-w-[calc(100vw-1.5rem)] items-center justify-center">
                <div className="flex items-center gap-1 rounded-full border border-brand-line/70 bg-white/95 py-1.5 pl-2 pr-2 shadow-[0_10px_40px_-12px_rgba(10,22,40,0.2)] backdrop-blur-xl sm:gap-1.5 sm:pl-2.5 sm:pr-2.5">
                  <LogoMark compact />
                  <DesktopNav
                    pathname={pathname}
                    compact
                    servicesOpen={servicesOpen}
                    onOpenServices={openServices}
                    onCloseServices={scheduleCloseServices}
                  />
                  <MobileMenuButton isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="nav-full"
              initial={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={navShellTransition}
              className="absolute inset-x-0 top-0 h-[72px] w-full border-b border-brand-line/80 bg-white shadow-[0_1px_0_rgba(229,231,235,0.6)]"
            >
              <div className="absolute left-5 top-1/2 z-10 -translate-y-1/2 sm:left-8">
                <LogoMark />
              </div>

              <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
                <DesktopNav
                  pathname={pathname}
                  compact={false}
                  servicesOpen={servicesOpen}
                  onOpenServices={openServices}
                  onCloseServices={scheduleCloseServices}
                />
              </div>

              <div className="absolute right-5 top-1/2 z-10 -translate-y-1/2 sm:right-8 lg:hidden">
                <MobileMenuButton isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {servicesOpen && (
          <motion.div
            key="services-dropdown"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 z-50 hidden justify-center px-4 lg:flex"
            style={{ top: dropdownTop }}
            onMouseEnter={openServices}
            onMouseLeave={scheduleCloseServices}
          >
            <div className="w-full max-w-[680px]">
              <div className="overflow-hidden rounded-2xl border border-brand-line bg-white/95 shadow-card backdrop-blur-xl">
                <div className="grid grid-cols-2 gap-1 p-3">
                  {SERVICES.map((service) => {
                    const Icon = service.icon;
                    const active = pathname.startsWith(service.href);
                    return (
                      <Link
                        key={service.href}
                        href={service.href}
                        className={cn(
                          "group flex gap-3 rounded-xl p-4 transition-colors",
                          active ? "bg-brand-ivory-deep" : "hover:bg-brand-ivory-deep/60",
                        )}
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-ivory text-brand-stone transition-colors group-hover:bg-brand-teal/10 group-hover:text-brand-teal">
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
              className={cn(
                "fixed inset-0 z-40 bg-brand-navy-dark/30 backdrop-blur-sm lg:hidden",
                mobileOverlayTop,
              )}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "fixed right-0 bottom-0 z-40 flex w-[min(88vw,22rem)] flex-col overflow-y-auto border-l border-brand-line bg-white p-5 lg:hidden",
                mobileOverlayTop,
              )}
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "rounded-xl px-4 py-3.5 text-[15px] font-medium transition-colors",
                      link.match?.(pathname)
                        ? "bg-brand-ivory-deep text-brand-navy"
                        : "text-brand-stone hover:bg-brand-ivory hover:text-brand-navy",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}

                <button
                  type="button"
                  onClick={() => setMobileServicesOpen((v) => !v)}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-4 py-3.5 text-left text-[15px] font-medium transition-colors",
                    isServicesActive(pathname) || mobileServicesOpen
                      ? "bg-brand-ivory-deep text-brand-navy"
                      : "text-brand-stone hover:bg-brand-ivory hover:text-brand-navy",
                  )}
                >
                  Settori
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      mobileServicesOpen && "rotate-180",
                    )}
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
                      <div className="flex flex-col gap-1 pb-2 pl-3">
                        {SERVICES.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            className={cn(
                              "rounded-lg px-4 py-2.5 text-sm transition-colors",
                              pathname.startsWith(service.href)
                                ? "bg-brand-ivory-deep font-medium text-brand-navy"
                                : "text-brand-stone hover:bg-brand-ivory hover:text-brand-navy",
                            )}
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
    </>
  );
}

function MobileMenuButton({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="rounded-full p-2 text-brand-navy transition-colors hover:bg-brand-ivory hover:text-brand-teal lg:hidden"
      aria-label={isOpen ? "Chiudi menu" : "Apri menu"}
    >
      {isOpen ? <X size={22} /> : <Menu size={22} />}
    </button>
  );
}

function DesktopNav({
  pathname,
  compact,
  servicesOpen,
  onOpenServices,
  onCloseServices,
}: {
  pathname: string;
  compact: boolean;
  servicesOpen: boolean;
  onOpenServices: () => void;
  onCloseServices: () => void;
}) {
  return (
    <nav className="flex items-center gap-0.5">
      {navLinks.slice(0, 1).map((link) => (
        <NavItem key={link.href} link={link} pathname={pathname} compact={compact} />
      ))}

      <div onMouseEnter={onOpenServices} onMouseLeave={onCloseServices}>
        <button
          type="button"
          className={cn(
            "relative flex items-center gap-1 rounded-full font-medium transition-colors",
            compact ? "px-3 py-2 text-[12.5px]" : "px-4 py-2.5 text-[13px]",
            isServicesActive(pathname) || servicesOpen
              ? "text-brand-navy"
              : "text-brand-stone hover:text-brand-navy",
          )}
          aria-expanded={servicesOpen}
          aria-haspopup="true"
        >
          {(isServicesActive(pathname) || servicesOpen) && (
            <span className="absolute inset-0 rounded-full bg-brand-ivory-deep" />
          )}
          <span className="relative z-10 flex items-center gap-1">
            Settori
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 transition-transform duration-200",
                servicesOpen && "rotate-180",
              )}
            />
          </span>
        </button>
      </div>

      {navLinks.slice(1).map((link) => (
        <NavItem key={link.href} link={link} pathname={pathname} compact={compact} />
      ))}
    </nav>
  );
}

function NavItem({
  link,
  pathname,
  compact,
}: {
  link: NavLink;
  pathname: string;
  compact: boolean;
}) {
  const isActive = link.match?.(pathname) ?? pathname === link.href;

  return (
    <Link
      href={link.href}
      className={cn(
        "relative rounded-full font-medium transition-colors",
        compact ? "px-3 py-2 text-[12.5px]" : "px-4 py-2.5 text-[13px]",
        isActive ? "text-brand-navy" : "text-brand-stone hover:text-brand-navy",
      )}
    >
      {isActive && (
        <span className="absolute inset-0 rounded-full bg-brand-ivory-deep" />
      )}
      <span className="relative z-10">{link.label}</span>
    </Link>
  );
}
