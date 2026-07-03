"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ButtonLink } from "@/components/ui/button";
import { LiveArchitecture } from "@/components/LiveArchitecture";
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
  ArrowRight,
  Thermometer,
  Lightbulb,
  KeyRound,
  ShieldCheck,
  Gauge,
  Wrench,
  Search,
  PencilRuler,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Calendar,
  BadgeCheck,
  Timer,
  Headset,
  Hotel,
  Factory,
  HeartPulse,
  Building2,
  Network,
  Boxes,
  RefreshCw,
  Cable,
  Unlock,
  Check,
  BadgeEuro,
  PiggyBank,
  TrendingUp,
  Users,
} from "lucide-react";
import type { BlogPost } from "@/types/blog";
import { CountUp } from "@/components/sector/SectorPage";

// ─── Images (Unsplash) ────────────────────────────────────────────────────────

const IMAGES = {
  hotelRoom: "/images/hotel-room.png",
  heroHotel: "/images/hero-hotel.png",
  sectorHotel: "/images/hero-hotel.png",
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
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_45%,rgba(0,126,120,0.08),transparent)]" />
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
              stroke="rgba(0,126,120,0.35)"
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
              src="/logo-brand.png"
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
        <span className="pointer-events-none absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-brand shadow-sm backdrop-blur-sm sm:right-4 sm:top-4">
          <span className="relative flex size-1.5">
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

// ─── SectorPanels ─────────────────────────────────────────────────────────────

const sectorPanels = [
  {
    href: "/hotel",
    label: "Hotel",
    tagline: "L'hotel che si gestisce da solo",
    img: IMAGES.sectorHotel,
    chip: "Accessi · Comfort camera · Energia",
    icon: Hotel,
  },
  {
    href: "/industry",
    label: "Industria",
    tagline: "Stabilimenti efficienti e sicuri",
    img: IMAGES.sectorIndustria,
    chip: "Impianti · Consumi · Continuità",
    icon: Factory,
  },
  {
    href: "/rsa",
    label: "RSA / Sanitario",
    tagline: "Ambienti di cura connessi",
    img: IMAGES.sectorRsa,
    chip: "Sicurezza · Clima · Qualità dell'aria",
    icon: HeartPulse,
  },
  {
    href: "/building",
    label: "Edifici",
    tagline: "Uffici e direzionali smart",
    img: IMAGES.sectorEdifici,
    chip: "BACS · Termoregolazione · Accessi",
    icon: Building2,
  },
] as const;

/* The hero itself: the four sectors, full-bleed. 2×2 grid on mobile,
   expanding panels on desktop. No sector is privileged — they take turns
   until the visitor points one. */
function SectorHero() {
  const [active, setActive] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    const t = setInterval(() => {
      if (!paused.current) setActive((a) => (a + 1) % sectorPanels.length);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      id="settori"
      className="grid h-full scroll-mt-24 grid-cols-2 grid-rows-2 gap-2.5 lg:flex lg:grid-rows-1"
      onMouseEnter={() => {
        paused.current = true;
      }}
      onMouseLeave={() => {
        paused.current = false;
      }}
    >
      {sectorPanels.map((p, i) => {
        const isActive = i === active;
        const Icon = p.icon;
        return (
          <Link
            key={p.href}
            href={p.href}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            aria-label={`${p.label} · ${p.tagline}`}
            className={cn(
              "group relative block overflow-hidden rounded-2xl ring-1 ring-white/10 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:rounded-3xl",
              isActive ? "lg:flex-[2.6]" : "lg:flex-[1]",
            )}
          >
            <Image
              src={p.img}
              alt={p.label}
              fill
              priority={i < 2}
              className={cn(
                "object-cover transition-transform duration-[1200ms] ease-out",
                isActive ? "scale-100" : "scale-105",
              )}
              sizes="(max-width: 1024px) 50vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/35 to-navy/5" />
            <div className="absolute inset-0 bg-gradient-to-tr from-brand/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* top — sector icon */}
            <div className="absolute inset-x-0 top-0 flex items-center justify-end p-3 sm:p-5">
              <span className="flex size-8 items-center justify-center rounded-full border border-white/15 bg-white/10 text-brand-bright backdrop-blur-sm sm:size-10">
                <Icon className="size-4 sm:size-5" />
              </span>
            </div>

            {/* bottom — label, tagline, cta */}
            <div className="absolute inset-x-0 bottom-0 p-3 sm:p-6">
              <div className="flex items-end justify-between gap-2">
                <div className={cn(!isActive && "lg:[writing-mode:vertical-rl] lg:rotate-180")}>
                  <h3 className="font-display text-lg font-extrabold leading-tight text-white sm:text-2xl">
                    {p.label}
                  </h3>
                  <p
                    className={cn(
                      "mt-1 max-w-[15rem] text-[13px] leading-snug text-white/70 sm:text-sm",
                      isActive ? "block" : "hidden",
                      "max-lg:block",
                    )}
                  >
                    {p.tagline}
                  </p>
                </div>
                <span
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-bright text-navy shadow-lg transition-all",
                    isActive ? "opacity-100" : "opacity-0",
                    "max-lg:opacity-100",
                  )}
                >
                  <ArrowUpRight className="size-4 sm:size-5" />
                </span>
              </div>
              {isActive && (
                <div className="mt-3 hidden w-max rounded-full glass-card-dark px-3.5 py-1.5 lg:block">
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
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(176, 90, 51,0.08),transparent)]" />
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
              Contattaci <ArrowRight className="size-4" />
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

// ─── RegulationPanel — la normativa, con un conto alla rovescia vivo ──────────

const COUNTDOWN_TARGET = "2029-12-31T00:00:00";

const timelineSteps = [
  { date: "3 giu 2026", title: "Classe B obbligatoria", note: "impianti > 290 kW", status: "active" as const },
  { date: "lug 2027", title: "Indicatore SRI", note: "smart readiness", status: "upcoming" as const },
  { date: "31 dic 2029", title: "Soglia a 70 kW", note: "platea ×4–5", status: "upcoming" as const },
];

function useCountdown(targetIso: string) {
  const [t, setT] = useState<{ d: number; h: number; m: number; s: number } | null>(null);
  useEffect(() => {
    const target = new Date(targetIso).getTime();
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetIso]);
  return t;
}

function RegulationPanel() {
  const cd = useCountdown(COUNTDOWN_TARGET);
  const pad = (n: number) => String(n).padStart(2, "0");
  const units = cd
    ? [
        { v: String(cd.d), l: "giorni" },
        { v: pad(cd.h), l: "ore" },
        { v: pad(cd.m), l: "min" },
        { v: pad(cd.s), l: "sec" },
      ]
    : ["giorni", "ore", "min", "sec"].map((l) => ({ v: "––", l }));

  return (
    <div className="relative overflow-hidden rounded-3xl bg-navy p-6 shadow-card sm:p-9">
      <div className="tech-grid-dark pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_0%,rgba(176, 90, 51,0.13),transparent)]"
        aria-hidden
      />
      <div className="relative">
        {/* Live countdown */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-bright">
              Conto alla rovescia normativo
            </p>
            <p className="mt-2 max-w-sm text-lg leading-snug text-white/70">
              All&apos;estensione dell&apos;obbligo BACS agli impianti{" "}
              <span className="font-semibold text-white">oltre 70 kW</span>.
            </p>
          </div>
          <div className="flex gap-2.5 sm:gap-3">
            {units.map((u) => (
              <div
                key={u.l}
                className="flex min-w-[60px] flex-col items-center rounded-xl border border-white/10 bg-white/[0.04] px-2.5 py-2.5 sm:min-w-[70px]"
              >
                <span className="font-mono text-2xl font-extrabold tabular-nums text-brand-bright sm:text-3xl">
                  {u.v}
                </span>
                <span className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.12em] text-navy-muted">
                  {u.l}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="relative mt-11">
          <div className="absolute inset-x-1 top-[13px] h-px bg-white/15" aria-hidden />
          <div className="absolute left-1 top-[13px] h-px w-[6%] bg-brand-bright/80" aria-hidden />
          <div className="relative grid grid-cols-3">
            {timelineSteps.map((s, i) => {
              const align = i === 0 ? "items-start text-left" : i === 1 ? "items-center text-center" : "items-end text-right";
              const isActive = s.status === "active";
              return (
                <div key={s.date} className={cn("flex flex-col", align)}>
                  <span
                    className={cn(
                      "flex size-7 items-center justify-center rounded-full border-2",
                      isActive
                        ? "border-brand-bright bg-brand-bright text-navy"
                        : "border-white/25 bg-navy text-white/40",
                    )}
                  >
                    {isActive ? (
                      <Check className="size-3.5" strokeWidth={3} />
                    ) : (
                      <span className="size-1.5 rounded-full bg-white/40" />
                    )}
                  </span>
                  <div className="mt-3.5">
                    <span
                      className={cn(
                        "inline-block rounded-full px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.1em]",
                        isActive ? "bg-brand-bright/15 text-brand-bright" : "bg-white/[0.06] text-white/45",
                      )}
                    >
                      {isActive ? "In vigore" : "In arrivo"}
                    </span>
                    <p className="mt-2 font-mono text-[12px] font-semibold text-white/75">{s.date}</p>
                    <p className="mt-0.5 text-[13.5px] font-bold leading-tight text-white">{s.title}</p>
                    <p className="mt-0.5 text-[11px] text-navy-muted">{s.note}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-brand-bright/25 bg-brand-bright/[0.07] px-3 py-1.5 text-[11.5px] font-semibold text-brand-bright">
          <span className="relative flex size-1.5">
            <span className="relative inline-flex size-1.5 rounded-full bg-brand-bright" />
          </span>
          Oggi sei qui: la Classe B è già legge
        </p>
      </div>
    </div>
  );
}

// ─── Page data ────────────────────────────────────────────────────────────────

const productSpecs = [
  { icon: Network, label: "KNX-IP nativo", desc: "Supervisione web e accesso remoto sicuro, senza server di terze parti." },
  { icon: Cable, label: "Bus a 2 fili", desc: "Dati e alimentazione sullo stesso doppino: cablaggio minimo, posa rapida." },
  { icon: ShieldCheck, label: "Alimentatore ridondabile", desc: "Continuità di servizio garantita anche in caso di guasto." },
  { icon: Boxes, label: "Plug & play", desc: "Aggiungi nuovi dispositivi in autonomia, con qualunque marchio compatibile." },
  { icon: RefreshCw, label: "Aggiornamenti OTA", desc: "Nuove funzioni distribuite via rete, senza interventi in cantiere." },
  { icon: Unlock, label: "Zero vendor lock-in", desc: "KNX, Modbus e BACnet: standard aperti, nessun vincolo di fornitore." },
] as const;

const incentives = [
  {
    icon: BadgeEuro,
    name: "Transizione 5.0",
    value: "fino al 45%",
    desc: "Credito d'imposta per i progetti che riducono i consumi energetici. Cumulabile con altri incentivi.",
  },
  {
    icon: PiggyBank,
    name: "Conto Termico 3.0",
    value: "fino al 40%",
    desc: "Copertura delle spese, max 60 €/m². Include BACS, sensori, software e integrazione con le rinnovabili.",
  },
  {
    icon: TrendingUp,
    name: "Ecobonus terziario",
    value: "detrazione",
    desc: "Riqualificazione energetica di involucro, impianti e BACS, con detrazione fiscale dedicata.",
  },
] as const;

const domains = [
  { icon: Thermometer, title: "Clima & HVAC", desc: "Temperatura, umidità e ventilazione ottimizzate stanza per stanza." },
  { icon: Lightbulb, title: "Illuminazione", desc: "Scenari intelligenti, presenza e luce naturale gestite in automatico." },
  { icon: KeyRound, title: "Controllo accessi", desc: "Badge, varchi e profili ospite gestiti da un unico cruscotto." },
  { icon: ShieldCheck, title: "Sicurezza", desc: "Videosorveglianza, allarmi e antincendio sempre sotto controllo." },
  { icon: Gauge, title: "Energia", desc: "Monitoraggio dei consumi in tempo reale e risparmio misurabile." },
  { icon: Wrench, title: "Manutenzione", desc: "Diagnostica e analisi predittiva per evitare i guasti." },
];

const statPillars = [
  {
    icon: Gauge,
    title: "Efficienza",
    stat: { value: "−35%", label: "consumi energetici" },
    desc: "Il clima segue la presenza e le luci si spengono negli ambienti vuoti: i consumi si riducono zona per zona.",
    secondary: { value: "+2", label: "classi energetiche APE" },
  },
  {
    icon: Users,
    title: "Comfort",
    stat: { value: "+30%", label: "soddisfazione di ospiti e utenti" },
    desc: "Comfort costante e personalizzato in ogni ambiente: più recensioni positive e utenti che tornano.",
  },
  {
    icon: ShieldCheck,
    title: "Sicurezza",
    stat: { value: "−60%", label: "incidenti di sicurezza" },
    desc: "Videosorveglianza, allarmi e antincendio in un'unica supervisione; la diagnostica risolve i guasti prima che diventino disservizi.",
    secondary: { value: "−45%", label: "guasti non pianificati" },
  },
  {
    icon: TrendingUp,
    title: "Redditività",
    stat: { value: "+15%", label: "valore dell'immobile" },
    desc: "L'investimento si ripaga con i risparmi energetici realmente generati, e l'edificio è già conforme alla normativa BACS.",
  },
] as const;

const statCredentials = [
  { value: "+100M€", label: "progetti gestiti" },
  { value: "95%", label: "tasso di approvazione delle pratiche" },
] as const;

const processSteps = [
  {
    icon: Search,
    title: "Sopralluogo e analisi",
    desc: "Studiamo la tua struttura, gli impianti esistenti e i consumi reali.",
  },
  {
    icon: PencilRuler,
    title: "Progetto su misura",
    desc: "Impianto e interfaccia software disegnati sulle esigenze della tua attività.",
  },
  {
    icon: Wrench,
    title: "Installazione chiavi in mano",
    desc: "Personale interno per hardware, cablaggio e configurazione, senza fermare l'attività.",
  },
  {
    icon: Headset,
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

const HOME_BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: "direttiva-bacs-2026",
    title: "Direttiva BACS 2026: cosa cambia per il tuo edificio",
    excerpt:
      "La normativa europea impone sistemi di automazione negli edifici non residenziali. Ecco come prepararsi in tempo e quali scadenze tenere d'occhio.",
    category: "Normativa",
    categoryIds: [],
    date: "12 giu 2026",
    readTime: "5 min",
    image: IMAGES.sectorEdifici,
  },
  {
    id: 2,
    slug: "risparmio-energetico-hotel",
    title: "Come un hotel ha ridotto i consumi del 28% con il BACS",
    excerpt:
      "Clima, illuminazione e accessi integrati in un'unica piattaforma: il caso di una struttura ricettiva da 120 camere in Lombardia.",
    category: "Casi studio",
    categoryIds: [],
    date: "28 mag 2026",
    readTime: "7 min",
    image: IMAGES.heroHotel,
  },
  {
    id: 3,
    slug: "vendor-lock-in",
    title: "Vendor lock-in: perché l'open protocol fa la differenza",
    excerpt:
      "BACnet, Modbus, KNX: scegliere protocolli aperti significa libertà di scelta, manutenzione semplificata e investimenti protetti nel tempo.",
    category: "Tecnologia",
    categoryIds: [],
    date: "15 mag 2026",
    readTime: "4 min",
    image: IMAGES.sectorIndustria,
  },
];


// ─── HomePage ─────────────────────────────────────────────────────────────────

export default function HomePage({ blogPosts = [] }: { blogPosts?: BlogPost[] }) {
  const displayPosts =
    blogPosts.length > 0 ? blogPosts.slice(0, 3) : HOME_BLOG_POSTS;
  return (
    <main className="bg-background">
      <Header />

      {/* HERO — the four sectors, full-bleed: the first thing the visitor sees */}
      <section className="relative h-[100svh] min-h-[34rem] overflow-hidden bg-navy pt-[4.5rem]">
        <div className="h-full w-full p-3 sm:p-4">
          <SectorHero />
        </div>
      </section>

      {/* The text — right after the sectors, as the client asked */}
      <section className="relative mx-auto max-w-7xl px-5 pt-20 pb-16 sm:px-8 sm:pt-28 sm:pb-20">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-16">
          <Reveal>
            <SectionLabel>Building Automation & Control System</SectionLabel>
            <h1 className="mt-6 text-balance font-display text-4xl font-extrabold leading-[1.04] tracking-tight text-foreground sm:text-5xl xl:text-[3.6rem]">
              Tutto il tuo edificio.{" "}
              <span className="text-brand">Una sola piattaforma.</span>
            </h1>
          </Reveal>
          <Reveal delay={1}>
            <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
              Clima, luci, accessi, sicurezza ed energia in un unico sistema,
              con qualsiasi marca e senza vendor lock-in. Progettiamo,
              installiamo e gestiamo l&apos;automazione del tuo edificio con
              personale interno, in tutta Italia.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contatti" size="lg">
                Contattaci <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink href="#settori" size="lg" variant="outline">
                Esplora i settori
              </ButtonLink>
            </div>
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
            edificio: personale interno, in tutta Italia. Un progetto{" "}
            <span className="font-semibold text-foreground">Più Sviluppo</span>.
          </p>
        </Reveal>

        <div className="relative mt-14">
          <div
            className="absolute left-7 right-7 top-7 hidden h-px bg-gradient-to-r from-brand/60 via-brand/25 to-border lg:block"
            aria-hidden
          />
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {processSteps.map((s, i) => (
              <Reveal key={s.title} delay={i}>
                <div className="relative">
                  <div className="relative flex size-14 items-center justify-center rounded-2xl border border-brand/30 bg-background text-brand shadow-soft">
                    <s.icon className="size-6" strokeWidth={1.75} />
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

      {/* Il prodotto — Connext Box */}
      <section className="relative overflow-hidden bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-16">
            <Reveal className="min-w-0">
              <SectionLabel>Il prodotto · Connext Box</SectionLabel>
              <h2 className="mt-6 text-balance font-display text-4xl font-extrabold leading-[1.05] text-foreground sm:text-5xl">
                Un solo box.{" "}
                <span className="text-brand">Tutto l&apos;edificio.</span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Connext Box è la piattaforma KNX-IP modulare che riunisce in un
                unico dispositivo gli otto domini tecnologici dell&apos;edificio:
                clima, luci, accessi, sicurezza, sensori, schermature, energia e
                interfacce. Standard aperti, cablaggio minimo, nessun vendor
                lock-in.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {productSpecs.map((s, i) => (
                  <Reveal key={s.label} delay={i} className="h-full">
                    <div className="group flex h-full gap-3.5 rounded-2xl border border-border bg-background p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-card">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors duration-300 group-hover:bg-brand-teal group-hover:text-white">
                        <s.icon className="size-5" />
                      </span>
                      <div>
                        <h3 className="text-[15px] font-semibold text-foreground">
                          {s.label}
                        </h3>
                        <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
            <Reveal delay={1} className="min-w-0">
              <LiveArchitecture />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Perché ora — normativa + incentivi */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal className="max-w-3xl">
          <SectionLabel>Perché adesso · Normativa BACS</SectionLabel>
          <h2 className="mt-6 text-balance font-display text-4xl font-extrabold leading-[1.05] text-foreground sm:text-5xl">
            La Classe B non è un&apos;opzione. <span className="text-brand">È già legge.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Dal 3 giugno 2026 i sistemi BACS di Classe B sono obbligatori per gli
            edifici non residenziali sopra i 290 kW, e nel 2029 la soglia scende
            a 70 kW. Chi si muove oggi arriva pronto, e finanzia l&apos;intervento
            con gli incentivi in vigore.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <RegulationPanel />
        </Reveal>

        {/* Incentivi */}
        <Reveal className="mt-20 max-w-2xl">
          <SectionLabel>Finanza di progetto</SectionLabel>
          <h3 className="mt-5 font-display text-2xl font-bold text-foreground sm:text-3xl">
            Azzera il costo del tuo investimento.
          </h3>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            Identifichiamo e gestiamo internamente gli incentivi, spesso
            cumulabili. E con il modello ESCo finanziamo l&apos;intervento:
            l&apos;investimento si ripaga con i risparmi energetici realmente
            generati.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {incentives.map((inc, i) => (
            <Reveal key={inc.name} delay={i} className="h-full">
              <div className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-card">
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors duration-300 group-hover:bg-brand-teal group-hover:text-white">
                  <inc.icon className="size-5" />
                </span>
                <p className="mt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {inc.name}
                </p>
                <p className="mt-1 font-display text-3xl font-extrabold tracking-tight text-brand">
                  {inc.value}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {inc.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <ButtonLink href="/contatti" size="lg">
            Richiedi l&apos;audit di fattibilità <ArrowRight className="size-4" />
          </ButtonLink>
          <span className="text-sm text-muted-foreground">
            Stima del payback e simulazione incentivi entro 10 giorni lavorativi.
          </span>
        </Reveal>
      </section>

      {/* Stats — navy */}
      <section className="relative overflow-hidden bg-navy">
        <div className="tech-grid-dark pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_50%_0%,rgba(176, 90, 51,0.10),transparent)]"
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
          {/* Pilastri con contesto: ogni numero risponde a un "perché" dichiarato */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {statPillars.map((g, i) => (
              <Reveal
                key={g.title}
                delay={i}
                className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition-colors hover:bg-white/[0.06] sm:p-8"
              >
                <div className="flex items-center gap-2.5">
                  <g.icon className="size-4 text-brand-gold" strokeWidth={2.25} />
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-gold">
                    {g.title}
                  </span>
                </div>
                <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <CountUp
                    value={g.stat.value}
                    className="font-display text-5xl font-extrabold tracking-tight text-brand-bright"
                  />
                  <span className="text-base font-semibold text-navy-foreground">
                    {g.stat.label}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-navy-muted">{g.desc}</p>
                {"secondary" in g && g.secondary && (
                  <div className="mt-auto flex items-baseline gap-2 pt-5">
                    <span className="font-display text-xl font-extrabold text-navy-foreground">
                      {g.secondary.value}
                    </span>
                    <span className="text-sm text-navy-muted">{g.secondary.label}</span>
                  </div>
                )}
              </Reveal>
            ))}
          </div>
          {/* Referenze aziendali: fuori dai risultati di prodotto, come riga di fiducia */}
          <Reveal className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 border-t border-white/10 pt-8">
            {statCredentials.map((c) => (
              <div key={c.label} className="flex items-baseline gap-2.5">
                <span className="font-display text-2xl font-extrabold tracking-tight text-navy-foreground">
                  {c.value}
                </span>
                <span className="text-sm text-navy-muted">{c.label}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

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
        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3 lg:gap-8">
          {displayPosts.map((post, i) => (
            <Reveal key={post.slug} delay={i} className="h-full">
              <article
                aria-label={post.title}
                className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-background ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-card"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-muted/40 via-background to-brand/5">
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display text-3xl font-bold text-brand/15 select-none">
                        QC
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="size-3.5" />
                      {post.date}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      · {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-brand sm:text-xl">
                    {post.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand transition-all group-hover:gap-2.5">
                    Leggi l&apos;articolo
                    <ArrowRight className="size-4" />
                  </span>
                </div>
              </article>
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
