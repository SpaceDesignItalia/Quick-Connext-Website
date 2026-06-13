"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { animate, motion, useInView, type Variants } from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  type LucideIcon,
  ArrowRight,
  Thermometer,
  Lightbulb,
  KeyRound,
  ShieldCheck,
  Gauge,
  Wrench,
  ArrowUpRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  Timer,
  Headset,
} from "lucide-react";
import { blogPosts } from "@/data/blog-posts";
import { CountUp } from "@/components/sector/SectorPage";

// ─── Images (Unsplash) ────────────────────────────────────────────────────────

const IMAGES = {
  hotelRoom: "/images/hotel-room.png",
  heroHotel: "/images/hero-hotel.png",
  sectorIndustria: "/images/sector-industria.png",
  sectorRsa: "/images/sector-rsa.png",
  sectorEdifici: "/images/sector-edifici.png",
  ctaNight: "/images/cta-night.png",
} as const;

// ─── Reveal ───────────────────────────────────────────────────────────────────

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const motionTags = {
  div: motion.div,
  span: motion.span,
  li: motion.li,
  section: motion.section,
} as const;

function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: keyof typeof motionTags;
}) {
  const MotionTag = motionTags[as];
  return (
    <MotionTag
      className={className}
      variants={revealVariants}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </MotionTag>
  );
}

// ─── SectionLabel ─────────────────────────────────────────────────────────────

function SectionLabel({
  children,
  className,
  tone = "light",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]",
        tone === "light" ? "text-brand" : "text-brand-bright",
        className,
      )}
    >
      <span className={cn("h-px w-6", tone === "light" ? "bg-brand" : "bg-brand-bright")} />
      {children}
    </span>
  );
}

// ─── NotificationCard ─────────────────────────────────────────────────────────

function NotificationCard({
  icon: Icon,
  title,
  detail,
  status,
  tone = "light",
  delay = 0,
  className,
}: {
  icon: LucideIcon;
  title: string;
  detail: string;
  status?: string;
  tone?: "light" | "dark";
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "pointer-events-none flex w-max max-w-[16rem] items-start gap-3 rounded-2xl p-3 pr-4",
        tone === "light" ? "glass-card" : "glass-card-dark",
        className,
      )}
    >
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-xl",
          tone === "light" ? "bg-brand/10 text-brand" : "bg-brand-bright/15 text-brand-bright",
        )}
      >
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-bright opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-brand-bright" />
          </span>
          <p
            className={cn(
              "truncate text-[13px] font-semibold",
              tone === "light" ? "text-foreground" : "text-navy-foreground",
            )}
          >
            {title}
          </p>
        </div>
        <p
          className={cn(
            "mt-0.5 text-xs leading-snug",
            tone === "light" ? "text-muted-foreground" : "text-navy-muted",
          )}
        >
          {detail}
        </p>
        {status && (
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-brand-bright">
            {status}
          </p>
        )}
      </div>
    </motion.div>
  );
}

// ─── PlatformCompare — prima (sistemi separati) ↔ con QuickConnext ───────────

const compareNodes = [
  { icon: Thermometer, label: "Clima", x: 18, y: 22, vendor: "Fornitore A" },
  { icon: Lightbulb, label: "Luci", x: 74, y: 16, vendor: "Fornitore B" },
  { icon: KeyRound, label: "Accessi", x: 84, y: 50, vendor: "Fornitore C" },
  { icon: ShieldCheck, label: "Sicurezza", x: 13, y: 58, vendor: "Fornitore D" },
  { icon: Gauge, label: "Energia", x: 33, y: 78, vendor: "Fornitore E" },
  { icon: Wrench, label: "Manutenzione", x: 72, y: 76, vendor: "Fornitore F" },
];

function PlatformCompare() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-60px" });
  const hasAnimated = useRef(false);
  const isDragging = useRef(false);
  const isHovering = useRef(false);
  const [position, setPosition] = useState(88);
  const [scrubEnabled, setScrubEnabled] = useState(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;
    const timeout = setTimeout(() => {
      animate(88, 32, {
        duration: 1.8,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (v) => setPosition(v),
        onComplete: () => setScrubEnabled(true),
      });
    }, 350);
    return () => clearTimeout(timeout);
  }, [isInView]);

  const updateFromClientX = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(96, Math.max(4, x)));
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!scrubEnabled) return;
    isDragging.current = true;
    containerRef.current?.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!scrubEnabled || !isDragging.current) return;
    updateFromClientX(e.clientX);
  };
  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    containerRef.current?.releasePointerCapture(e.pointerId);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!scrubEnabled || isDragging.current || !isHovering.current) return;
    updateFromClientX(e.clientX);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative aspect-[16/13] touch-none select-none overflow-hidden rounded-3xl border border-border bg-background shadow-soft sm:aspect-[16/11]",
        scrubEnabled && "cursor-col-resize",
      )}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={() => {
        isHovering.current = true;
      }}
      onMouseLeave={() => {
        isHovering.current = false;
      }}
      onMouseMove={handleMouseMove}
    >
      {/* CON QUICKCONNEXT — everything talks to one platform */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_45%,rgba(0,196,204,0.08),transparent)]" />
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          {compareNodes.map((n) => (
            <line
              key={n.label}
              x1="50"
              y1="46"
              x2={n.x}
              y2={n.y}
              stroke="rgba(0,196,204,0.35)"
              strokeWidth="0.45"
            />
          ))}
        </svg>
        {compareNodes.map((n) => (
          <div
            key={n.label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            <div className="flex items-center gap-1.5 rounded-xl border border-brand/25 bg-white px-2 py-1.5 shadow-soft sm:gap-2 sm:px-2.5 sm:py-2">
              <span className="flex size-6 items-center justify-center rounded-lg bg-brand/10 text-brand sm:size-7">
                <n.icon className="size-3.5" />
              </span>
              <span className="text-[10px] font-semibold text-foreground sm:text-[11.5px]">
                {n.label}
              </span>
              <span className="ml-0.5 inline-flex size-1.5 rounded-full bg-brand-bright" />
            </div>
          </div>
        ))}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: "50%", top: "46%" }}
        >
          <div className="flex items-center gap-2.5 rounded-2xl border-2 border-brand/40 bg-white px-3 py-2 shadow-card sm:px-4 sm:py-2.5">
            <Image
              src="/logo.png"
              alt=""
              width={28}
              height={28}
              draggable={false}
              className="size-6 object-contain sm:size-7"
            />
            <div className="leading-none">
              <p className="text-[11px] font-bold text-foreground sm:text-[13px]">QuickConnext</p>
              <p className="mt-1 font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-brand sm:text-[9px]">
                Una piattaforma
              </p>
            </div>
          </div>
        </div>
        <span className="pointer-events-none absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-navy/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-bright backdrop-blur-sm sm:right-4 sm:top-4">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-bright opacity-70" />
            <span className="relative inline-flex size-1.5 rounded-full bg-brand-bright" />
          </span>
          Con QuickConnext
        </span>
        <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-brand/25 bg-brand/[0.07] px-3 py-1 text-[10px] font-semibold text-brand sm:text-[11px]">
          Un partner unico · Protocolli aperti
        </span>
      </div>

      {/* PRIMA — separate systems that don't talk to each other */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <div className="absolute inset-0 bg-[#ECEDEB]" />
        {compareNodes.map((n) => (
          <div
            key={n.label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            <div className="flex items-center gap-1.5 rounded-xl border border-black/10 bg-white/85 px-2 py-1.5 sm:gap-2 sm:px-2.5 sm:py-2">
              <span className="flex size-6 items-center justify-center rounded-lg bg-black/5 text-stone-500 sm:size-7">
                <n.icon className="size-3.5" />
              </span>
              <span className="leading-none">
                <span className="block text-[10px] font-semibold text-stone-600 sm:text-[11.5px]">
                  {n.label}
                </span>
                <span className="mt-1 block text-[8px] font-bold uppercase tracking-wide text-amber-700/90 sm:text-[9px]">
                  {n.vendor}
                </span>
              </span>
            </div>
          </div>
        ))}
        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-stone-800/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/85 backdrop-blur-sm sm:left-4 sm:top-4">
          Prima
        </span>
        <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-amber-600/25 bg-amber-500/10 px-3 py-1 text-[10px] font-semibold text-amber-700 sm:text-[11px]">
          Sistemi che non dialogano tra loro
        </span>
      </div>

      {/* Divider */}
      <div
        className="absolute inset-y-0 z-[3] w-px -translate-x-1/2 bg-navy/30 shadow-[0_0_12px_rgba(0,0,0,0.25)]"
        style={{ left: `${position}%` }}
      >
        <div className="absolute left-1/2 top-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-0.5 rounded-full border-2 border-white bg-navy/80 shadow-lg backdrop-blur-sm">
          <ChevronLeft className="size-3 text-white/85" strokeWidth={3} />
          <ChevronRight className="size-3 text-white/85" strokeWidth={3} />
        </div>
      </div>
    </div>
  );
}

// ─── PlatformDashboard — software mockup shown in the hero viewer ─────────────

/* Live sensor pins laid over the stylised floor plan. Coordinates are % of the
   plan box; each pulses to read as a live device on the platform. */
const planPins = [
  { label: "Clima", x: 26, y: 30 },
  { label: "Accessi", x: 70, y: 24 },
  { label: "Energia", x: 50, y: 62 },
  { label: "Sicurezza", x: 82, y: 66 },
  { label: "Luci", x: 20, y: 72 },
];

const railIcons = [Gauge, Thermometer, KeyRound, ShieldCheck, Wrench];

const dashKpis = [
  { label: "Consumi oggi", value: "412", unit: "kWh", trend: "−18%" },
  { label: "Comfort medio", value: "97", unit: "%", trend: "+4%" },
  { label: "Allarmi attivi", value: "0", unit: "", trend: "OK" },
];

function PlatformDashboard() {
  return (
    <div className="relative flex aspect-[4/3] overflow-hidden bg-surface">
      {/* nav rail */}
      <div className="hidden w-12 shrink-0 flex-col items-center gap-3 border-r border-border bg-white py-3 sm:flex">
        <Image src="/logo.png" alt="" width={24} height={24} className="size-6 object-contain" />
        <span className="h-px w-5 bg-border" />
        {railIcons.map((Icon, i) => (
          <span
            key={i}
            className={cn(
              "flex size-7 items-center justify-center rounded-lg",
              i === 0 ? "bg-brand/10 text-brand" : "text-muted-foreground/55",
            )}
          >
            <Icon className="size-3.5" />
          </span>
        ))}
      </div>

      {/* main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* header strip */}
        <div className="flex items-center justify-between border-b border-border bg-white px-3 py-2 sm:px-4">
          <div className="min-w-0">
            <p className="truncate text-[11px] font-bold text-foreground sm:text-xs">
              Edificio Centrale
            </p>
            <p className="truncate font-mono text-[8.5px] uppercase tracking-[0.14em] text-muted-foreground sm:text-[9px]">
              12.480 m² · 6 piani · 142 dispositivi
            </p>
          </div>
          <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-brand/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-brand">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
            </span>
            Live
          </span>
        </div>

        {/* body */}
        <div className="grid flex-1 grid-cols-[1.5fr_1fr] gap-2 p-2.5 sm:gap-2.5 sm:p-3">
          {/* floor plan */}
          <div className="relative overflow-hidden rounded-xl border border-border bg-white p-2.5">
            <p className="font-mono text-[8.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:text-[9px]">
              Planimetria · Piano 3
            </p>
            <div className="relative mt-1.5 aspect-[4/3]">
              <svg viewBox="0 0 200 150" className="h-full w-full" aria-hidden>
                <rect x="6" y="6" width="188" height="138" rx="4" fill="none" stroke="var(--brand-line)" strokeWidth="1.5" />
                <line x1="6" y1="86" x2="194" y2="86" stroke="var(--brand-line)" strokeWidth="1.2" />
                <line x1="78" y1="6" x2="78" y2="86" stroke="var(--brand-line)" strokeWidth="1.2" />
                <line x1="134" y1="6" x2="134" y2="86" stroke="var(--brand-line)" strokeWidth="1.2" />
                <line x1="96" y1="86" x2="96" y2="144" stroke="var(--brand-line)" strokeWidth="1.2" />
                <rect x="6" y="6" width="188" height="138" rx="4" fill="rgba(0,196,204,0.025)" />
              </svg>
              {planPins.map((p) => (
                <span
                  key={p.label}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                >
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-teal opacity-50" />
                    <span className="relative inline-flex size-2 rounded-full bg-brand-teal ring-2 ring-white" />
                  </span>
                </span>
              ))}
            </div>
          </div>

          {/* right column */}
          <div className="flex min-w-0 flex-col gap-2 sm:gap-2.5">
            {/* energy sparkline */}
            <div className="flex-1 rounded-xl border border-border bg-white p-2.5">
              <div className="flex items-baseline justify-between">
                <p className="font-mono text-[8.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:text-[9px]">
                  Energia
                </p>
                <p className="text-[9px] font-bold text-brand">−18%</p>
              </div>
              <p className="mt-0.5 font-display text-lg font-extrabold leading-none text-foreground">
                412<span className="ml-0.5 text-[10px] font-semibold text-muted-foreground">kWh</span>
              </p>
              <svg viewBox="0 0 120 40" className="mt-1.5 h-9 w-full" preserveAspectRatio="none" aria-hidden>
                <defs>
                  <linearGradient id="dashSpark" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(0,196,204,0.28)" />
                    <stop offset="100%" stopColor="rgba(0,196,204,0)" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 30 L15 26 L30 28 L45 18 L60 22 L75 12 L90 16 L105 8 L120 11 L120 40 L0 40 Z"
                  fill="url(#dashSpark)"
                />
                <motion.path
                  d="M0 30 L15 26 L30 28 L45 18 L60 22 L75 12 L90 16 L105 8 L120 11"
                  fill="none"
                  stroke="var(--brand-teal)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, delay: 0.6, ease: "easeInOut" }}
                />
              </svg>
            </div>
            {/* status rows */}
            <div className="rounded-xl border border-border bg-white p-2">
              {[
                { Icon: Thermometer, label: "Clima", val: "21,5°" },
                { Icon: KeyRound, label: "Accessi", val: "Aperti" },
                { Icon: ShieldCheck, label: "Sicurezza", val: "Armato" },
              ].map((r, i) => (
                <div
                  key={r.label}
                  className={cn(
                    "flex items-center gap-2 py-1",
                    i > 0 && "border-t border-border/70",
                  )}
                >
                  <span className="flex size-5 items-center justify-center rounded-md bg-brand/10 text-brand">
                    <r.Icon className="size-3" />
                  </span>
                  <span className="flex-1 truncate text-[10px] font-medium text-foreground">
                    {r.label}
                  </span>
                  <span className="text-[10px] font-semibold text-muted-foreground">{r.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* KPI footer */}
        <div className="grid grid-cols-3 gap-px border-t border-border bg-border">
          {dashKpis.map((k) => (
            <div key={k.label} className="bg-white px-2.5 py-2">
              <p className="truncate font-mono text-[7.5px] uppercase tracking-[0.12em] text-muted-foreground sm:text-[8px]">
                {k.label}
              </p>
              <p className="mt-0.5 flex items-baseline gap-1">
                <span className="font-display text-sm font-extrabold leading-none text-foreground">
                  {k.value}
                  {k.unit && (
                    <span className="ml-0.5 text-[8px] font-semibold text-muted-foreground">
                      {k.unit}
                    </span>
                  )}
                </span>
                <span className="text-[8px] font-bold text-brand">{k.trend}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SectorPanels ─────────────────────────────────────────────────────────────

const sectorPanels = [
  {
    href: "/hotel",
    label: "Hotel",
    tagline: "L'hotel che si gestisce da solo",
    img: IMAGES.heroHotel,
    chip: "Accessi · Comfort camera · Energia",
  },
  {
    href: "/industry",
    label: "Industria",
    tagline: "Stabilimenti efficienti e sicuri",
    img: IMAGES.sectorIndustria,
    chip: "Impianti · Consumi · Continuità",
  },
  {
    href: "/rsa",
    label: "RSA / Sanitario",
    tagline: "Ambienti di cura connessi",
    img: IMAGES.sectorRsa,
    chip: "Sicurezza · Clima · Qualità dell'aria",
  },
  {
    href: "/building",
    label: "Edifici",
    tagline: "Uffici e direzionali smart",
    img: IMAGES.sectorEdifici,
    chip: "BACS · Termoregolazione · Accessi",
  },
] as const;

function SectorPanels() {
  const [active, setActive] = useState(0);
  const paused = useRef(false);

  /* No sector is privileged: panels take turns until the user points one. */
  useEffect(() => {
    const t = setInterval(() => {
      if (!paused.current) setActive((a) => (a + 1) % sectorPanels.length);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      id="settori"
      className="flex h-[380px] scroll-mt-24 gap-2 sm:h-[460px]"
      onMouseEnter={() => {
        paused.current = true;
      }}
      onMouseLeave={() => {
        paused.current = false;
      }}
    >
      {sectorPanels.map((p, i) => {
        const isActive = i === active;
        return (
          <Link
            key={p.href}
            href={p.href}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            className={cn(
              "group relative block overflow-hidden rounded-2xl ring-1 ring-black/5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              isActive ? "flex-[3]" : "flex-[1]",
            )}
          >
            <Image
              src={p.img}
              alt={p.label}
              fill
              priority={i === 0}
              className={cn(
                "object-cover transition-transform duration-700",
                isActive ? "scale-105" : "scale-100",
              )}
              sizes="(max-width: 1024px) 100vw, 70vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 transition-opacity duration-300">
              <div
                className={cn(
                  "flex items-end justify-between gap-2",
                  isActive ? "opacity-100" : "opacity-0 lg:opacity-100",
                )}
              >
                <div className={cn(!isActive && "lg:[writing-mode:vertical-rl] lg:rotate-180")}>
                  <h3 className="font-display text-lg font-bold text-navy-foreground sm:text-xl">
                    {p.label}
                  </h3>
                  <p
                    className={cn(
                      "text-xs text-white/70 transition-all duration-300",
                      isActive ? "opacity-100" : "hidden",
                    )}
                  >
                    {p.tagline}
                  </p>
                </div>
                <span
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-bright text-navy transition-all",
                    isActive ? "opacity-100" : "opacity-0",
                  )}
                >
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
              {isActive && (
                <div className="mt-3 hidden w-max rounded-full glass-card-dark px-3.5 py-1.5 sm:block">
                  <span className="text-[11px] font-medium text-white/85">{p.chip}</span>
                </div>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}

// ─── StatGrid ─────────────────────────────────────────────────────────────────

function StatGrid({
  stats,
  tone = "light",
  columns,
}: {
  stats: Array<{ value: string; label: string }>;
  tone?: "light" | "dark";
  columns?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-px overflow-hidden rounded-3xl",
        tone === "light" ? "bg-border" : "bg-white/10",
        columns ?? "grid-cols-2 lg:grid-cols-4",
      )}
    >
      {stats.map((s, i) => (
        <Reveal
          key={s.label}
          delay={i}
          className={cn(
            "group flex flex-col gap-2 p-6 transition-colors duration-300 sm:p-8",
            tone === "light"
              ? "bg-background hover:bg-surface"
              : "bg-navy hover:bg-[#0E1F3A]",
          )}
        >
          <CountUp
            value={s.value}
            className={cn(
              "origin-left font-display text-3xl font-extrabold tracking-tight transition-transform duration-300 group-hover:scale-105 sm:text-4xl",
              tone === "light" ? "text-brand" : "text-brand-bright",
            )}
          />
          <span
            className={cn(
              "text-sm leading-snug",
              tone === "light" ? "text-muted-foreground" : "text-navy-muted",
            )}
          >
            {s.label}
          </span>
        </Reveal>
      ))}
    </div>
  );
}

// ─── CtaBand ──────────────────────────────────────────────────────────────────

function CtaBand({
  label = "Prenota una demo",
  title,
  subtitle,
}: {
  label?: string;
  title: string;
  subtitle: string;
}) {
  return (
    <section className="relative min-h-[420px] overflow-hidden">
      <Image
        src={IMAGES.ctaNight}
        alt=""
        aria-hidden
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-navy/85" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(0,196,204,0.08),transparent)]" />
      <div className="relative mx-auto max-w-3xl px-5 py-24 text-center sm:px-8 sm:py-28">
        <Reveal>
          <SectionLabel tone="dark" className="justify-center">
            {label}
          </SectionLabel>
          <h2 className="mt-6 text-balance font-display text-4xl font-extrabold leading-[1.05] text-navy-foreground sm:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-navy-muted">
            {subtitle}
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contatti" size="lg">
              Richiedi una demo gratuita <ArrowRight className="size-4" />
            </ButtonLink>
            <ButtonLink
              href="/contatti"
              size="lg"
              variant="outline"
              className="border-white/25 bg-transparent text-navy-foreground hover:bg-white/10 hover:text-navy-foreground"
            >
              Parla con un esperto
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Page data ────────────────────────────────────────────────────────────────

const domains = [
  { icon: Thermometer, title: "Clima & HVAC", desc: "Temperatura, umidità e ventilazione ottimizzate stanza per stanza." },
  { icon: Lightbulb, title: "Illuminazione", desc: "Scenari intelligenti, presenza e luce naturale gestite in automatico." },
  { icon: KeyRound, title: "Controllo accessi", desc: "Badge, varchi e profili ospite gestiti da un unico cruscotto." },
  { icon: ShieldCheck, title: "Sicurezza", desc: "Videosorveglianza, allarmi e antincendio sempre sotto controllo." },
  { icon: Gauge, title: "Energia", desc: "Monitoraggio dei consumi in tempo reale e risparmio misurabile." },
  { icon: Wrench, title: "Manutenzione", desc: "Diagnostica e analisi predittiva per evitare i guasti." },
];

const stats = [
  { value: "−35%", label: "consumi energetici" },
  { value: "+30%", label: "soddisfazione di ospiti e utenti" },
  { value: "−45%", label: "guasti non pianificati" },
  { value: "−60%", label: "incidenti di sicurezza" },
  { value: "+2", label: "classi energetiche APE" },
  { value: "+15%", label: "valore dell'immobile" },
  { value: "+100M€", label: "progetti gestiti" },
  { value: "95%", label: "tasso approvazione pratiche" },
];

const processSteps = [
  {
    n: "01",
    title: "Sopralluogo e analisi",
    desc: "Studiamo la tua struttura, gli impianti esistenti e i consumi reali.",
  },
  {
    n: "02",
    title: "Progetto su misura",
    desc: "Impianto e interfaccia software disegnati sulle esigenze della tua attività.",
  },
  {
    n: "03",
    title: "Installazione chiavi in mano",
    desc: "Personale interno per hardware, cablaggio e configurazione, senza fermare l'attività.",
  },
  {
    n: "04",
    title: "Gestione e assistenza",
    desc: "Controllo da remoto, manutenzione preventiva e supporto 24/7 con intervento in 24 ore.",
  },
];

const trustChips = [
  { icon: BadgeCheck, label: "Garanzia 24 mesi" },
  { icon: Timer, label: "Intervento on-site in 24h" },
  { icon: Headset, label: "Assistenza 24/7" },
  { icon: ShieldCheck, label: "ISO 27001 · 27017 · 27018" },
];


// ─── HomePage ─────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main className="bg-background">
      <Header />

      {/* Hero — navy stage */}
      <section className="relative overflow-hidden bg-navy pt-28 sm:pt-32">
        <div
          className="tech-grid-dark pointer-events-none absolute inset-0 opacity-70 [mask-image:linear-gradient(to_bottom,black_45%,transparent_95%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_-5%,rgba(0,196,204,0.16),transparent)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-32 top-1/4 size-[28rem] rounded-full bg-brand/10 blur-[140px]"
          aria-hidden
        />

        <div className="relative mx-auto max-w-7xl px-5 pb-8 sm:px-8 sm:pb-12">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
            <Reveal>
              <SectionLabel tone="dark">Building Automation & Control System</SectionLabel>
              <h1 className="mt-6 text-balance font-display text-[2.7rem] font-extrabold leading-[1.02] tracking-tight text-white sm:text-6xl xl:text-[4.2rem]">
                Tutto il tuo edificio.{" "}
                <span className="text-brand-bright">Una sola piattaforma.</span>
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-white/65">
                Clima, luci, accessi, sicurezza ed energia in un unico sistema.
                Con le migliori marche, senza vendor lock-in.
              </p>
              <div className="mt-8">
                <ButtonLink href="/contatti" size="lg">
                  Richiedi una demo <ArrowRight className="size-4" />
                </ButtonLink>
              </div>
              {/* what we actually do — the company's craft, first screen */}
              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6 sm:gap-6">
                {[
                  { n: "01", t: "Progettiamo", d: "l'impianto su misura per la tua struttura" },
                  { n: "02", t: "Installiamo", d: "chiavi in mano, senza fermare l'attività" },
                  { n: "03", t: "Gestiamo", d: "assistenza 24/7 e manutenzione" },
                ].map((s) => (
                  <div key={s.n}>
                    <span className="font-mono text-[10px] font-semibold tracking-[0.18em] text-brand-bright/80">
                      {s.n}
                    </span>
                    <p className="mt-1 font-display text-base font-bold text-white sm:text-lg">
                      {s.t}
                    </p>
                    <p className="mt-1 text-xs leading-snug text-white/50 sm:text-[13px]">
                      {s.d}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Digital twin viewer — the platform shows your building, live */}
            <div className="relative">
              <div
                className="pointer-events-none absolute -bottom-10 left-1/2 h-20 w-4/5 -translate-x-1/2 rounded-[50%] bg-brand/25 blur-3xl"
                aria-hidden
              />
              <motion.div
                initial={{ opacity: 0, y: 28, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-3xl bg-white shadow-[0_45px_100px_-30px_rgba(0,0,0,0.65)] ring-1 ring-white/15"
              >
                {/* viewer toolbar */}
                <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-2.5">
                  <span className="flex gap-1.5">
                    <span className="size-2.5 rounded-full bg-black/10" />
                    <span className="size-2.5 rounded-full bg-black/10" />
                    <span className="size-2.5 rounded-full bg-brand/60" />
                  </span>
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    QuickConnext · Cruscotto edificio
                  </span>
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-bright opacity-60" />
                    <span className="relative inline-flex size-2 rounded-full bg-brand-bright" />
                  </span>
                </div>
                {/* software mockup — the platform's control room, on brand */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <PlatformDashboard />
                </motion.div>
              </motion.div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <NotificationCard
                  icon={Thermometer}
                  title="Clima per zona"
                  detail="Si regola sulla presenza reale"
                  tone="dark"
                  delay={0.9}
                  className="max-w-none w-full"
                />
                <NotificationCard
                  icon={KeyRound}
                  title="Accessi tracciati"
                  detail="Badge e varchi da un cruscotto"
                  tone="dark"
                  delay={1.1}
                  className="max-w-none w-full"
                />
                <NotificationCard
                  icon={Gauge}
                  title="Consumi in tempo reale"
                  detail="Elettrico, termico e idrico"
                  tone="dark"
                  delay={1.3}
                  className="max-w-none w-full"
                />
                <NotificationCard
                  icon={Wrench}
                  title="Anomalia prevista"
                  detail="Intervento pianificato in anticipo"
                  status="Manutenzione preventiva"
                  tone="dark"
                  delay={1.5}
                  className="max-w-none w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* breathing room before the straddling sector panels */}
        <div className="h-12 sm:h-16" aria-hidden />
      </section>

      {/* Sectors — straddling the navy/white seam */}
      <section className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[55%] bg-navy" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <SectorPanels />
          </Reveal>
        </div>
      </section>

      {/* Cosa facciamo — the company's craft, spelled out */}
      <section className="mx-auto max-w-7xl px-5 pt-24 sm:px-8 sm:pt-28">
        <Reveal className="max-w-3xl">
          <SectionLabel>Cosa facciamo</SectionLabel>
          <h2 className="mt-6 text-balance font-display text-4xl font-extrabold leading-[1.05] text-foreground sm:text-5xl">
            Un unico partner, dall&apos;inizio alla fine.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Progettiamo, installiamo e gestiamo l&apos;automazione del tuo
            edificio: personale interno, in tutta Italia.
          </p>
        </Reveal>

        <div className="relative mt-14">
          <div
            className="absolute left-7 right-7 top-7 hidden h-px bg-gradient-to-r from-brand/60 via-brand/25 to-border lg:block"
            aria-hidden
          />
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {processSteps.map((s, i) => (
              <Reveal key={s.n} delay={i}>
                <div className="relative">
                  <div className="relative flex size-14 items-center justify-center rounded-2xl border border-brand/30 bg-background font-display text-lg font-extrabold text-brand shadow-soft">
                    {s.n}
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-12 flex flex-wrap items-center gap-3">
          {trustChips.map((t) => (
            <span
              key={t.label}
              className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-[13px] font-semibold text-foreground"
            >
              <t.icon className="size-4 text-brand" /> {t.label}
            </span>
          ))}
        </Reveal>
      </section>

      {/* Platform intro */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionLabel>La piattaforma</SectionLabel>
            <h2 className="mt-6 text-balance font-display text-4xl font-extrabold leading-[1.05] text-foreground sm:text-5xl">
              Una piattaforma. Ogni sistema.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Tutto ciò che oggi vive in sistemi separati, sotto un unico
              controllo: meno fornitori, una sola interfaccia.
            </p>
            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {domains.map((d, i) => (
                <Reveal key={d.title} delay={i} className="h-full">
                  <div className="group flex h-full gap-3.5 rounded-2xl border border-border bg-background p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-card">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors duration-300 group-hover:bg-brand-teal group-hover:text-white">
                      <d.icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-foreground">{d.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{d.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
          <Reveal delay={1}>
            <div className="lg:pl-6">
              <PlatformCompare />
              <p className="mt-4 text-center text-xs text-muted-foreground">
                Trascina o passa il mouse: prima ↔ con QuickConnext
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats — navy */}
      <section className="relative overflow-hidden bg-navy">
        <div className="tech-grid-dark pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_50%_0%,rgba(0,196,204,0.10),transparent)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
          <Reveal className="max-w-2xl">
            <SectionLabel tone="dark">Risultati misurabili</SectionLabel>
            <h2 className="mt-6 text-balance font-display text-4xl font-extrabold leading-[1.05] text-navy-foreground sm:text-5xl">
              L&apos;impatto, in numeri.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-navy-muted">
              I risultati medi dei progetti QuickConnext Building.
            </p>
          </Reveal>
          <div className="mt-12">
            <StatGrid stats={stats} tone="dark" />
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal className="max-w-2xl">
          <SectionLabel>Insights &amp; novità</SectionLabel>
          <h2 className="mt-6 text-balance font-display text-4xl font-extrabold leading-[1.05] text-foreground sm:text-5xl">
            Dal nostro blog.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Normativa, tecnologia e casi reali per chi gestisce edifici
            intelligenti.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {blogPosts.map((post, i) => (
            <Reveal key={post.slug} delay={i}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-card"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.16em] text-brand">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Calendar className="size-3" />
                      {post.date}
                    </span>
                  </div>
                  <h3 className="font-display text-[16px] font-bold leading-snug text-foreground transition-colors group-hover:text-brand">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted-foreground [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden">
                    {post.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand transition-all group-hover:gap-2.5">
                    Leggi l&apos;articolo
                    <ArrowRight className="size-3.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 flex justify-center">
          <ButtonLink href="/blog" variant="outline" size="lg">
            Vedi tutti gli articoli <ArrowRight className="size-4" />
          </ButtonLink>
        </Reveal>
      </section>

      <CtaBand
        title="Pronto a vedere il tuo edificio connesso?"
        subtitle="Una demo gratuita sulla tua struttura: numeri e scenari reali."
      />

      <Footer />
    </main>
  );
}
