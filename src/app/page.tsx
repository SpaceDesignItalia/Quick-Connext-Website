"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, type Variants } from "framer-motion";
import { useState, type ReactNode } from "react";
import {
  type LucideIcon,
  ArrowRight,
  Thermometer,
  Lightbulb,
  KeyRound,
  ShieldCheck,
  Gauge,
  Plug,
  Network,
  Wrench,
  ArrowUpRight,
  Calendar,
} from "lucide-react";
import { blogPosts } from "@/data/blog-posts";

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

// ─── SceneImage ───────────────────────────────────────────────────────────────

function SceneImage({
  src,
  alt,
  cards = [],
  className,
  imageClassName,
  priority = false,
  rounded = "rounded-3xl",
}: {
  src: string;
  alt: string;
  cards?: Array<{
    icon: LucideIcon;
    title: string;
    detail: string;
    status?: string;
    tone?: "light" | "dark";
    delay?: number;
    position: string;
    float?: boolean;
  }>;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  rounded?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <div className={cn("relative aspect-[16/11] overflow-hidden", rounded)}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className={cn("object-cover", imageClassName)}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent" />
      </div>
      {cards.map((card, i) => {
        const { position, float = true, ...cardProps } = card;
        return (
          <motion.div
            key={i}
            className={cn("absolute z-10", position)}
            animate={float ? { y: [0, -8, 0] } : undefined}
            transition={
              float
                ? { duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }
                : undefined
            }
          >
            <NotificationCard {...cardProps} delay={cardProps.delay ?? i * 0.15} />
          </motion.div>
        );
      })}
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
    live: "Camera 412 · 22° · check-in ok",
  },
  {
    href: "/industry",
    label: "Industria",
    tagline: "Stabilimenti efficienti e sicuri",
    img: IMAGES.sectorIndustria,
    live: "Linea 3 · consumo -18% oggi",
  },
  {
    href: "/rsa",
    label: "RSA / Sanitario",
    tagline: "Ambienti di cura connessi",
    img: IMAGES.sectorRsa,
    live: "Reparto B · clima ottimale",
  },
  {
    href: "/building",
    label: "Edifici",
    tagline: "Uffici e direzionali smart",
    img: IMAGES.sectorEdifici,
    live: "Piano 4 · accessi 142 · ok",
  },
] as const;

function SectorPanels() {
  const [active, setActive] = useState(0);

  return (
    <div className="flex h-[380px] gap-2 sm:h-[460px]">
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
                <div className="mt-3 hidden w-max items-center gap-2 rounded-full glass-card-dark px-3 py-1.5 sm:flex">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-bright opacity-70" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-brand-bright" />
                  </span>
                  <span className="text-[11px] font-medium text-white/85">{p.live}</span>
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
            "flex flex-col gap-2 p-6 sm:p-8",
            tone === "light" ? "bg-background" : "bg-navy",
          )}
        >
          <span
            className={cn(
              "font-display text-3xl font-extrabold tracking-tight sm:text-4xl",
              tone === "light" ? "text-brand" : "text-brand-bright",
            )}
          >
            {s.value}
          </span>
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
  { value: "+30%", label: "soddisfazione ospiti" },
  { value: "−45%", label: "guasti non pianificati" },
  { value: "−60%", label: "incidenti di sicurezza" },
  { value: "+2", label: "classi energetiche APE" },
  { value: "+15%", label: "valore dell'immobile" },
  { value: "+100M€", label: "progetti gestiti" },
  { value: "95%", label: "tasso approvazione pratiche" },
];

const protocols = ["KNX", "Modbus", "BACnet", "MQTT", "API aperte"];

// ─── HomePage ─────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main className="bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 sm:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_50%_at_70%_0%,var(--brand-soft),transparent)]" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <SectionLabel>Building Automation & Control System</SectionLabel>
              <h1 className="mt-6 text-balance font-display text-[2.7rem] font-extrabold leading-[1.02] tracking-tight text-foreground sm:text-6xl">
                Tutto il tuo edificio.{" "}
                <span className="text-brand">Una sola piattaforma.</span>
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
                Clima, illuminazione, accessi, sicurezza ed energia connessi e controllati da un
                unico sistema. Funziona con qualsiasi marca grazie ai protocolli aperti. Senza
                vendor lock-in.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contatti" size="lg">
                  Richiedi una demo <ArrowRight className="size-4" />
                </ButtonLink>
                <ButtonLink href="/hotel" size="lg" variant="outline">
                  Scopri le soluzioni
                </ButtonLink>
              </div>
            </Reveal>
            <Reveal delay={1} className="hidden lg:block">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pb-2">
                {protocols.map((p) => (
                  <span key={p} className="text-sm font-semibold text-muted-foreground">
                    {p}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Compatibile con i protocolli e i dispositivi di qualsiasi produttore.
              </p>
            </Reveal>
          </div>

          <Reveal delay={1} className="mt-12">
            <SectorPanels />
          </Reveal>
        </div>
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
              QuickConnext mette sotto un unico controllo tutto ciò che oggi vive in sistemi
              separati. Meno fornitori, meno problemi, una sola interfaccia per chi gestisce
              l&apos;edificio.
            </p>
            <div className="mt-9 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {domains.map((d, i) => (
                <Reveal key={d.title} delay={i}>
                  <div className="flex gap-3.5">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
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
            <SceneImage
              src={IMAGES.hotelRoom}
              alt="Camera d'albergo gestita dalla piattaforma QuickConnext"
              className="lg:pl-6"
              cards={[
                {
                  icon: Thermometer,
                  title: "Clima ottimale",
                  detail: "22°C · umidità 45%",
                  position: "left-4 top-6 sm:-left-6 sm:top-10",
                  tone: "light",
                },
                {
                  icon: Plug,
                  title: "Risparmio attivo",
                  detail: "Camera libera · stand-by",
                  status: "−28% consumo",
                  position: "bottom-6 right-4 sm:-right-6 sm:bottom-12",
                  tone: "light",
                },
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* Open protocols band */}
      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <SectionLabel>Nessun vincolo</SectionLabel>
              <h2 className="mt-6 font-display text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
                Protocolli aperti. Zero vendor lock-in.
              </h2>
            </Reveal>
            <Reveal delay={1}>
              <p className="text-lg leading-relaxed text-muted-foreground">
                KNX, Modbus, BACnet e API aperte: QuickConnext dialoga con i dispositivi che hai già
                e con quelli che sceglierai domani. Resti libero di scegliere marche e fornitori,
                senza essere legato a un unico produttore.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {protocols.map((p) => (
                  <span
                    key={p}
                    className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground"
                  >
                    <Network className="size-4 text-brand" /> {p}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats — navy */}
      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
          <Reveal className="max-w-2xl">
            <SectionLabel tone="dark">Risultati misurabili</SectionLabel>
            <h2 className="mt-6 text-balance font-display text-4xl font-extrabold leading-[1.05] text-navy-foreground sm:text-5xl">
              Numeri che il direttore vuole vedere.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-navy-muted">
              Dati medi rilevati sui progetti QuickConnext nei primi 12 mesi di esercizio.
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
            Normativa, tecnologia e casi d&apos;uso reali per chi gestisce edifici intelligenti.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {blogPosts.map((post, i) => (
            <Reveal key={post.slug} delay={i}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-background ring-1 ring-black/5 transition-colors hover:border-brand/40"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-brand">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="size-3.5" />
                      {post.date}
                    </span>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-brand">
                    {post.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand transition-all group-hover:gap-3">
                    Leggi l&apos;articolo
                    <ArrowRight className="size-4" />
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
        subtitle="Prenota una demo gratuita: ti mostriamo QuickConnext applicato alla tua struttura, con numeri e scenari reali."
      />

      <Footer />
    </main>
  );
}
