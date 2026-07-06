"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useRef, type ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CountUp } from "@/components/sector/SectorPage";

// ─── Reveal ───────────────────────────────────────────────────────────────────

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={revealVariants}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({
  children,
  className,
  tone = "light",
}: {
  children: ReactNode;
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

/* La foto entra spenta, in bianco e nero, e si accende a colori:
   la stessa promessa del prodotto. */
function SwitchOnImage({
  src,
  alt,
  chip,
}: {
  src: string;
  alt: string;
  chip: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  return (
    <div
      ref={ref}
      className="group relative aspect-[4/3] overflow-hidden rounded-3xl shadow-card"
    >
      <motion.div
        className="absolute inset-0"
        initial={{ filter: "grayscale(1) brightness(0.72)", scale: 1.07 }}
        animate={
          inView ? { filter: "grayscale(0) brightness(1)", scale: 1 } : undefined
        }
        transition={{ duration: 1.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-navy/45 via-transparent to-transparent" />
      <span className="absolute bottom-4 left-4 rounded-full glass-card-dark px-3.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-white/90">
        {chip}
      </span>
    </div>
  );
}

// ─── Dati ─────────────────────────────────────────────────────────────────────

const credentials = [
  { value: "+100M€", label: "progetti gestiti" },
  { value: "95%", label: "pratiche approvate" },
  { value: "24/7", label: "assistenza dedicata" },
] as const;

const projects = [
  {
    id: "hotel-alpine",
    chapter: "01",
    sector: "Hotel",
    location: "Dolomiti, IT",
    title: "Hotel Alpine Resort",
    desc: "Integrazione HVAC per zona, accessi keyless e supervisione energetica su 120 camere. Riduzione consumi del 32% nel primo anno.",
    image: "/images/hero-hotel.png",
    stats: [
      { value: "120", label: "camere connesse" },
      { value: "−32%", label: "consumi energia" },
      { value: "KNX + BACnet", label: "protocolli aperti" },
    ],
    href: "/hotel",
  },
  {
    id: "plant-bergamo",
    chapter: "02",
    sector: "Industria",
    location: "Bergamo, IT",
    title: "Stabilimento Produttivo Bergamo",
    desc: "Monitoraggio impianti, data logging e controllo carichi su linea produttiva. Allarmi predittivi e dashboard operativa centralizzata.",
    image: "/images/industria-warehouse.png",
    stats: [
      { value: "12.000", label: "m² supervisionati" },
      { value: "24/7", label: "monitoraggio impianti" },
      { value: "Modbus RTU", label: "integrazione linea" },
    ],
    href: "/industry",
  },
  {
    id: "rsa-lombardia",
    chapter: "03",
    sector: "RSA / Sanitario",
    location: "Lombardia, IT",
    title: "RSA Lombardia Centro",
    desc: "Controllo ambientale reparti, rilevazione incendi integrata e gestione accessi per personale e visitatori con tracciabilità completa.",
    image: "/images/rsa-common.png",
    stats: [
      { value: "180", label: "posti letto" },
      { value: "Classe A", label: "livello BACS" },
      { value: "ISO 27001", label: "sicurezza dei dati" },
    ],
    href: "/rsa",
  },
  {
    id: "hq-milano",
    chapter: "04",
    sector: "Edifici",
    location: "Milano, IT",
    title: "Sede Direzionale Milano",
    desc: "Retrofit BACS su edificio direzionale anni '90: illuminazione DALI, termoregolazione a zone e qualità dell'aria per 8 piani open space.",
    image: "/images/edifici-lobby.png",
    stats: [
      { value: "8", label: "piani open space" },
      { value: "+2", label: "classi APE" },
      { value: "DALI + KNX", label: "illuminazione e bus" },
    ],
    href: "/building",
  },
] as const;

// ─── Pagina ───────────────────────────────────────────────────────────────────

export default function ProgettiPage() {
  return (
    <main className="bg-background pt-[4.5rem]">
      {/* HERO editoriale su carta */}
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-24">
        <Reveal>
          <SectionLabel>Case study</SectionLabel>
          <h1 className="mt-6 max-w-3xl text-balance font-display text-4xl font-extrabold leading-[1.04] tracking-tight text-foreground sm:text-6xl">
            Edifici reali.{" "}
            <span className="text-brand">Risultati misurabili.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Ogni installazione QuickConnext unifica clima, luce, accessi e
            sicurezza in un&apos;unica piattaforma di controllo.
          </p>
        </Reveal>

        <Reveal
          delay={1}
          className="mt-12 flex flex-wrap gap-x-14 gap-y-6 border-t border-brand-line pt-8"
        >
          {credentials.map((c) => (
            <div key={c.label}>
              <CountUp
                value={c.value}
                className="font-display text-3xl font-extrabold tracking-tight text-brand sm:text-4xl"
              />
              <p className="mt-1 text-sm text-muted-foreground">{c.label}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* I PROGETTI — capitoli alternati, le foto si accendono */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8">
        {projects.map((p, i) => {
          const imageRight = i % 2 === 1;
          return (
            <article
              key={p.id}
              className="relative border-t border-brand-line py-16 sm:py-20"
            >
              <span
                className="pointer-events-none absolute -top-2 right-0 select-none font-display text-[7rem] font-extrabold leading-none text-foreground/[0.05] sm:text-[10rem]"
                aria-hidden
              >
                {p.chapter}
              </span>

              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <Reveal className={cn(imageRight && "lg:order-2")}>
                  <SwitchOnImage
                    src={p.image}
                    alt={p.title}
                    chip={`${p.sector} · ${p.location}`}
                  />
                </Reveal>

                <Reveal delay={1} className={cn(imageRight && "lg:order-1")}>
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
                    {p.chapter} · {p.sector}
                  </p>
                  <h2 className="mt-4 text-balance font-display text-3xl font-extrabold leading-[1.08] text-foreground sm:text-4xl">
                    {p.title}
                  </h2>
                  <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    {p.location}
                  </p>
                  <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                    {p.desc}
                  </p>

                  <div className="mt-8 grid grid-cols-3 gap-6 border-t border-brand-line pt-6">
                    {p.stats.map((s) => (
                      <div key={s.label}>
                        <CountUp
                          value={s.value}
                          className="font-display text-xl font-extrabold tracking-tight text-foreground sm:text-2xl"
                        />
                        <p className="mt-1 text-xs leading-snug text-muted-foreground sm:text-[13px]">
                          {s.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={p.href}
                    className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand transition-all hover:gap-3.5"
                  >
                    Scopri la soluzione {p.sector}
                    <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5" />
                  </Link>
                </Reveal>
              </div>
            </article>
          );
        })}
      </section>

      {/* CTA */}
      <section className="relative mt-8 min-h-[380px] overflow-hidden">
        <Image
          src="/images/cta-night.png"
          alt=""
          aria-hidden
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy/85" />
        <div className="relative mx-auto max-w-3xl px-5 py-24 text-center sm:px-8">
          <Reveal>
            <SectionLabel tone="dark" className="justify-center">
              Prenota una demo
            </SectionLabel>
            <h2 className="mt-6 text-balance font-display text-4xl font-extrabold leading-[1.05] text-navy-foreground sm:text-5xl">
              Il prossimo progetto è il tuo.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-navy-muted">
              Una demo gratuita sulla tua struttura: numeri e scenari reali.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href="/contatti" size="lg">
                Contattaci <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink
                href="/#settori"
                size="lg"
                variant="outline"
                className="border-white/25 bg-transparent text-navy-foreground hover:bg-white/10 hover:text-navy-foreground"
              >
                Esplora i settori
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
