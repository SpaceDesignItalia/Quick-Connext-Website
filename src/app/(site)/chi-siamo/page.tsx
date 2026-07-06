"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
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

// ─── Page data ────────────────────────────────────────────────────────────────

const lineage = [
  {
    era: "Dal 2010",
    name: "Più Sviluppo S.r.l.",
    tag: "Impianti Integrati",
    desc: "La casa madre: esperienza finanziaria e gestionale al servizio delle imprese.",
  },
  {
    era: "Oggi",
    name: "QuickConnext Building",
    tag: "Building Automation",
    desc: "Il brand specialistico: identità tecnologica autonoma, firmware e integrazioni software proprietarie.",
  },
] as const;

const credentials = [
  { value: "+100M€", label: "progetti gestiti" },
  { value: "95%", label: "pratiche approvate" },
] as const;

const principles = [
  {
    n: "01",
    title: "Open protocol",
    desc: "Rifiutiamo i sistemi chiusi. Solo standard internazionali condivisi — KNX, Modbus, BACnet — per garantire la massima libertà futura del cliente.",
  },
  {
    n: "02",
    title: "Cloud & IoT sicuro",
    desc: "Monitoraggio e telecontrollo centralizzati su server europei ridondati, ad altissima sicurezza logica.",
  },
  {
    n: "03",
    title: "Design premium",
    desc: "Estetica ed ergonomia dell'interfaccia sono fondamentali: cruscotti puliti e intuitivi, in stile medtech.",
  },
  {
    n: "04",
    title: "Competenza dedicata",
    desc: "Dall'analisi delle planimetrie al collaudo finale, fino alle agevolazioni ESCo: personale interno su tutte le fasi del lavoro.",
  },
] as const;

/* Loghi ufficiali in /public/logos/partners; altezza calibrata per peso ottico. */
const brands = [
  { name: "ABB", src: "/logos/partners/abb.png", cls: "h-7" },
  { name: "Siemens", src: "/logos/partners/siemens.png", cls: "h-6" },
  { name: "Schneider Electric", src: "/logos/partners/schneider.png", cls: "h-8" },
  { name: "BTicino", src: "/logos/partners/bticino.png", cls: "h-7" },
  { name: "Vimar", src: "/logos/partners/vimar.png", cls: "h-9" },
  { name: "Ekinex", src: "/logos/partners/ekinex.svg", cls: "h-5" },
  { name: "Eelectron", src: "/logos/partners/eelectron.png", cls: "h-5" },
  { name: "Finder", src: "/logos/partners/finder.png", cls: "h-8" },
  { name: "MDT", src: "/logos/partners/mdt.svg", cls: "h-10" },
  { name: "Theben", src: "/logos/partners/theben.png", cls: "h-6" },
  { name: "Zennio", src: "/logos/partners/zennio.svg", cls: "h-6" },
] as const;

type Brand = (typeof brands)[number];

const rotateBrands = (n: number): Brand[] => [
  ...brands.slice(n),
  ...brands.slice(0, n),
];

/* Tre corsie che scorrono in direzioni alterne, a velocità diverse. */
const marqueeRows = [
  { items: rotateBrands(0), duration: 44, reverse: true },
  { items: rotateBrands(4), duration: 56, reverse: false },
  { items: rotateBrands(8), duration: 38, reverse: true },
] as const;

function BrandMarquee() {
  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden border-y border-brand-line py-10 sm:py-12">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-32"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-32"
        aria-hidden
      />
      <div className="flex flex-col gap-4 sm:gap-5">
        {marqueeRows.map((row, i) => (
          <div
            key={i}
            className="flex w-max"
            style={{
              animation: `marquee ${row.duration}s linear infinite`,
              animationDirection: row.reverse ? "reverse" : "normal",
            }}
          >
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className="flex gap-4 pr-4 sm:gap-5 sm:pr-5"
                aria-hidden={copy === 1}
              >
                {row.items.map((b) => (
                  <div
                    key={b.name}
                    className="group flex h-14 shrink-0 cursor-default items-center rounded-2xl border border-brand-line bg-white/70 px-7 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:bg-white sm:h-16 sm:px-9"
                  >
                    <Image
                      src={b.src}
                      alt={b.name}
                      width={220}
                      height={72}
                      unoptimized
                      className={cn(
                        "w-auto object-contain opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0",
                        b.cls,
                      )}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const certifications = [
  {
    code: "ISO 27001",
    title: "Gestione sicurezza informazioni",
    desc: "Certifica l'adozione di un Sistema di Gestione per la Sicurezza delle Informazioni: riservatezza, integrità e disponibilità dei dati.",
  },
  {
    code: "ISO 27017",
    title: "Sicurezza dei servizi cloud",
    desc: "Controlli avanzati di sicurezza logica per i servizi di cloud computing, sia lato fornitore che lato cliente.",
  },
  {
    code: "ISO 27018",
    title: "Protezione privacy in cloud",
    desc: "Protezione delle informazioni personali (PII) nel cloud pubblico, in piena conformità al GDPR europeo.",
  },
] as const;

const trustRow = [
  { value: "24", suffix: " mesi", label: "garanzia estesa di serie" },
  { value: "24", suffix: "h", label: "intervento on-site" },
  { value: "24", suffix: "/7", label: "assistenza con numero dedicato" },
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ChiSiamoPage() {
  return (
    <main className="bg-background">
      {/* HERO — la foto si accende: da spenta a viva, come un edificio connesso */}
      <section className="relative flex min-h-[78svh] items-end overflow-hidden bg-navy pt-[4.5rem]">
        <motion.div
          className="absolute inset-0"
          initial={{ filter: "grayscale(1) brightness(0.55)", scale: 1.06 }}
          animate={{ filter: "grayscale(0) brightness(1)", scale: 1 }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/images/edifici-meeting.png"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/20" />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_100%,rgba(176,90,51,0.14),transparent)]"
          aria-hidden
        />

        <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-28 sm:px-8 sm:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionLabel tone="dark">Chi siamo</SectionLabel>
            <h1 className="mt-6 max-w-3xl text-balance font-display text-4xl font-extrabold leading-[1.04] text-navy-foreground sm:text-6xl">
              L&apos;evoluzione intelligente degli spazi e degli edifici.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-navy-muted">
              QuickConnext Building nasce per ridisegnare il rapporto tra
              tecnologia ed edilizia: sistemi che semplificano la gestione
              operativa e rispettano l&apos;ambiente.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/15 pt-6"
          >
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-gold">
              Un progetto Più Sviluppo · Impianti Integrati dal 2010
            </span>
            <span className="hidden h-4 w-px bg-white/15 sm:block" aria-hidden />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
              ISO 27001 · 27017 · 27018
            </span>
          </motion.div>
        </div>
      </section>

      {/* DNA — il racconto + la linea di discendenza che si disegna */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <Reveal>
            <SectionLabel>Il nostro DNA</SectionLabel>
            <h2 className="mt-6 text-balance font-display text-4xl font-extrabold leading-[1.05] text-foreground sm:text-5xl">
              Un&apos;identità autonoma, focalizzata{" "}
              <span className="text-brand">sull&apos;eccellenza BACS.</span>
            </h2>
            <div className="mt-7 space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                QuickConnext Building è il brand specialistico di{" "}
                <span className="font-semibold text-foreground">
                  Più Sviluppo S.r.l.
                </span>
                , nato per rispondere alle esigenze di digitalizzazione ed
                efficientamento del settore proptech.
              </p>
              <p>
                La vera building automation supera i limiti
                dell&apos;installazione classica: frammentazione dei
                protocolli, contratti vincolanti, complessità di
                programmazione. Il nostro approccio software-defined crea un
                ecosistema flessibile su standard aperti.
              </p>
              <p>
                L&apos;obiettivo è chiaro: accompagnare hotel, aziende ed RSA
                verso l&apos;adeguamento normativo BACS, riducendo i consumi ed
                elevando l&apos;esperienza quotidiana di gestori e ospiti.
              </p>
            </div>
          </Reveal>

          {/* Lineage rail — la linea si disegna, i numeri contano */}
          <Reveal delay={1} className="lg:pt-10">
            <div className="relative pl-8 sm:pl-10">
              <div className="absolute inset-y-1 left-[5px] w-px bg-border" aria-hidden />
              <motion.div
                className="absolute inset-y-1 left-[5px] w-px origin-top bg-brand-gold"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden
              />
              <div className="space-y-12">
                {lineage.map((l, i) => (
                  <motion.div
                    key={l.name}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      duration: 0.6,
                      delay: 0.35 + i * 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative"
                  >
                    <span
                      className="absolute -left-8 top-1.5 size-[11px] rounded-full border-2 border-brand-gold bg-background sm:-left-10"
                      aria-hidden
                    />
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
                      {l.era} · {l.tag}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-bold text-foreground sm:text-3xl">
                      {l.name}
                    </h3>
                    <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted-foreground">
                      {l.desc}
                    </p>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
                  className="relative border-t border-border pt-8"
                >
                  <div className="flex flex-wrap gap-x-12 gap-y-6">
                    {credentials.map((c) => (
                      <div key={c.label}>
                        <CountUp
                          value={c.value}
                          className="font-display text-4xl font-extrabold tracking-tight text-brand sm:text-5xl"
                        />
                        <p className="mt-1.5 text-sm text-muted-foreground">{c.label}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MANIFESTO — quattro principi, in forma di registro editoriale */}
      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
          <Reveal className="max-w-2xl">
            <SectionLabel>Il manifesto</SectionLabel>
            <h2 className="mt-6 text-balance font-display text-4xl font-extrabold leading-[1.05] text-foreground sm:text-5xl">
              Quattro principi. Nessuna eccezione.
            </h2>
          </Reveal>

          <div className="mt-14">
            {principles.map((p, i) => (
              <Reveal key={p.n} delay={i}>
                <div className="group grid gap-3 border-t border-brand-line py-8 transition-colors last:border-b sm:grid-cols-[5rem_1fr_1.4fr] sm:items-baseline sm:gap-8 sm:py-10">
                  <span className="font-mono text-sm font-semibold tracking-[0.2em] text-brand">
                    {p.n}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-foreground transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 sm:text-3xl">
                    {p.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                    {p.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* I MARCHI — muro tipografico: compatibilità verificata */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
        <Reveal className="max-w-2xl">
          <SectionLabel>Ecosistema aperto</SectionLabel>
          <h2 className="mt-6 text-balance font-display text-4xl font-extrabold leading-[1.05] text-foreground sm:text-5xl">
            Solo primari marchi internazionali.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Compatibilità verificata con i principali costruttori KNX: puoi
            combinare marche diverse — o mantenere le apparecchiature esistenti
            — senza problemi di interoperabilità.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <BrandMarquee />
        </Reveal>
      </section>

      {/* CERTIFICAZIONI — navy, registro ISO + riga di fiducia */}
      <section className="relative overflow-hidden bg-navy">
        <div className="tech-grid-dark pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_50%_0%,rgba(176,90,51,0.10),transparent)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
          <Reveal className="max-w-2xl">
            <SectionLabel tone="dark">Standard di sicurezza europei</SectionLabel>
            <h2 className="mt-6 text-balance font-display text-4xl font-extrabold leading-[1.05] text-navy-foreground sm:text-5xl">
              Certificazioni &amp; conformità GDPR.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-navy-muted">
              Proteggiamo i dati operativi del tuo edificio e la privacy dei
              tuoi ospiti con i più alti standard internazionali.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-10 border-t border-white/10 pt-10 md:grid-cols-3 md:gap-8">
            {certifications.map((c, i) => (
              <Reveal key={c.code} delay={i}>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-gold">
                  Certificazione
                </p>
                <p className="mt-3 font-display text-3xl font-extrabold tracking-tight text-brand-bright">
                  {c.code}
                </p>
                <h3 className="mt-3 text-base font-bold text-navy-foreground">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-muted">{c.desc}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16 grid gap-10 border-t border-white/10 pt-10 sm:grid-cols-3">
            {trustRow.map((t) => (
              <div key={t.label}>
                <p className="font-display text-4xl font-extrabold tracking-tight text-navy-foreground sm:text-5xl">
                  <CountUp value={t.value} />
                  <span className="text-brand-bright">{t.suffix}</span>
                </p>
                <p className="mt-2 text-sm text-navy-muted">{t.label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative min-h-[380px] overflow-hidden">
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
              Un unico partner
            </SectionLabel>
            <h2 className="mt-6 text-balance font-display text-4xl font-extrabold leading-[1.05] text-navy-foreground sm:text-5xl">
              Raccontaci il tuo edificio.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-navy-muted">
              Progettazione, installazione e gestione con personale interno, in
              tutta Italia.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href="/contatti" size="lg">
                Contattaci <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink
                href="/progetti"
                size="lg"
                variant="outline"
                className="border-white/25 bg-transparent text-navy-foreground hover:bg-white/10 hover:text-navy-foreground"
              >
                Guarda i case study
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
