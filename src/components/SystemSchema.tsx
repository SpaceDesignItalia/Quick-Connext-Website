"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  Blinds,
  Cable,
  Camera,
  Cpu,
  DoorOpen,
  Flame,
  LayoutGrid,
  Lightbulb,
  Monitor,
  Network,
  Plug,
  Radio,
  ScanLine,
  Smartphone,
  Tablet,
  Thermometer,
  ToggleRight,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Schema di sistema, vivo ───────────────────────────────────────────────────
   La topologia reale dell'impianto, non un disegno statico: la supervisione in
   alto (App + Connext Box + Web), il modulo DIN, il bus KNX energizzato e, sotto,
   i dispositivi di campo che pilotano gli impianti dell'edificio. Un segnale gira
   di continuo sul bus, accende un dispositivo e i carichi che governa.
   Etichette dei dispositivi dallo schema connessioni QuickConnext (KNX).
──────────────────────────────────────────────────────────────────────────── */

type Field = {
  icon: LucideIcon;
  label: string;
  line: string;
  loads: number[]; // indici in LOADS che questo dispositivo governa
};

// Carichi / impianti gestiti — ordine fisso, referenziato da Field.loads
const LOADS: { icon: LucideIcon; label: string }[] = [
  { icon: Wind, label: "Climatizzazione" },
  { icon: Lightbulb, label: "Illuminazione" },
  { icon: DoorOpen, label: "Controllo accessi" },
  { icon: Blinds, label: "Tapparella" },
  { icon: Flame, label: "Pompa di calore" },
  { icon: Camera, label: "Telecamere" },
];

const FIELD: Field[] = [
  {
    icon: ScanLine,
    label: "Lettore badge",
    line: "Lettore badge camera → attivazione camera e controllo accessi",
    loads: [2],
  },
  {
    icon: ToggleRight,
    label: "Attuatore",
    line: "Attuatore → comanda climatizzazione, illuminazione e tapparelle",
    loads: [0, 1, 3],
  },
  {
    icon: Thermometer,
    label: "Termostato",
    line: "Termostato → regolazione del clima della camera",
    loads: [0],
  },
  {
    icon: LayoutGrid,
    label: "Pulsantiera",
    line: "Pulsantiera sensorizzata → scenari e comandi in camera",
    loads: [1, 3],
  },
  {
    icon: Tablet,
    label: "Display touch",
    line: "Display touch → supervisione e controllo dalla camera",
    loads: [0, 1],
  },
  {
    icon: Radio,
    label: "Sensore",
    line: "Sensore → presenza e occupazione pilotano clima e luci",
    loads: [0, 1],
  },
  {
    icon: Cable,
    label: "Interfaccia",
    line: "Interfaccia → integra pompa di calore e telecamere IP",
    loads: [4, 5],
  },
];

const SUPERVISION: { icon: LucideIcon; name: string; sub: string }[] = [
  { icon: Smartphone, name: "App", sub: "QuickConnext" },
  { icon: Monitor, name: "Web · PC", sub: "supervisione" },
];

// centro orizzontale (%) della colonna i su n colonne uguali
const colX = (i: number, n: number) => ((i + 0.5) / n) * 100;

export function SystemSchema({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-15%" });
  const [booted, setBooted] = useState(false);
  const [active, setActive] = useState(0);
  const [tick, setTick] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setBooted(true), 450);
    return () => clearTimeout(t);
  }, [inView]);

  useEffect(() => {
    if (!booted || !inView || hovered !== null) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % FIELD.length);
      setTick((k) => k + 1);
    }, 1900);
    return () => clearInterval(id);
  }, [booted, inView, hovered]);

  const focus = hovered ?? active;
  const focusDevice = FIELD[focus];
  const activeLoads = new Set(focusDevice.loads);
  const pulseX = colX(focus, FIELD.length);

  return (
    <div
      ref={ref}
      className={cn(
        "relative w-full min-w-0 overflow-hidden rounded-3xl bg-navy p-5 shadow-card sm:p-7",
        className,
      )}
    >
      <div className="tech-grid-dark pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_0%,rgba(176, 90, 51,0.16),transparent)]"
        aria-hidden
      />

      <div className="relative">
        {/* header */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-bright">
            Schema di sistema
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-brand-bright/25 bg-brand-bright/[0.08] px-2.5 py-1 font-mono text-[9.5px] font-semibold uppercase tracking-[0.16em] text-brand-bright">
            <span className="relative flex size-1.5">
              <span className="relative inline-flex size-1.5 rounded-full bg-brand-bright" />
            </span>
            KNX-IP
          </span>
        </div>

        {/* horizontal-scroll keeps the topology intact on small screens */}
        <div className="no-scrollbar mt-5 overflow-x-auto">
          <div className="min-w-[680px]">
            {/* ── Tier 1 · Supervisione ─────────────────────────────────── */}
            <RailLabel>Supervisione · Cloud &amp; App</RailLabel>
            <div className="mt-2 flex items-stretch justify-center gap-3">
              <ClientCard {...SUPERVISION[0]} />
              {/* Connext Box — the brain */}
              <div className="relative flex flex-col items-center justify-center rounded-xl border border-brand-bright/60 bg-brand-bright/[0.12] px-4 py-3 text-center">
                {booted && (
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-xl"
                    animate={{
                      boxShadow: [
                        "0 0 0px 0px rgba(176, 90, 51,0.0)",
                        "0 0 24px 2px rgba(176, 90, 51,0.55)",
                        "0 0 0px 0px rgba(176, 90, 51,0.0)",
                      ],
                    }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
                <span className="relative flex size-9 items-center justify-center rounded-lg bg-brand-bright text-navy">
                  <Cpu className="size-5" />
                </span>
                <span className="relative mt-1.5 text-[13px] font-bold leading-tight text-white">
                  Connext Box
                </span>
                <span className="relative font-mono text-[8.5px] uppercase tracking-[0.08em] text-navy-muted">
                  server KNX-IP
                </span>
              </div>
              <ClientCard {...SUPERVISION[1]} />
            </div>

            <Drop />

            {/* ── Tier 2 · Modulo DIN ──────────────────────────────────── */}
            <div className="mx-auto flex w-max items-stretch gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-2">
              <RailModule icon={Network} name="Interfaccia KNX/IP" sub="gateway" />
              <RailModule icon={Plug} name="Alimentatore" sub="ridondabile" />
            </div>

            <Drop />

            {/* ── BUS KNX ───────────────────────────────────────────────── */}
            <div className="flex items-center justify-between px-0.5">
              <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-brand-bright/80">
                Bus KNX
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-navy-muted">
                campo · dispositivi
              </span>
            </div>
            <div className="relative mt-1.5 h-3">
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden
              >
                <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(176, 90, 51,0.22)" strokeWidth="3" />
                <line
                  x1="0"
                  y1="50"
                  x2="100"
                  y2="50"
                  stroke="rgba(176, 90, 51,0.85)"
                  strokeWidth="3"
                  strokeDasharray="6 10"
                  className={booted ? "trace-march" : undefined}
                />
              </svg>
              {booted && (
                <motion.span
                  key={`pulse-${focus}-${tick}`}
                  aria-hidden
                  className="absolute top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-teal-light shadow-[0_0_10px_2px_rgba(176, 90, 51,0.8)]"
                  initial={{ left: "50%", opacity: 0 }}
                  animate={{ left: `${pulseX}%`, opacity: [0, 1, 1, 0.6] }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              )}
            </div>

            {/* ── Tier 3 · Dispositivi di campo ─────────────────────────── */}
            <div className="grid grid-cols-7 gap-1.5">
              {FIELD.map((d, i) => {
                const Icon = d.icon;
                const isFocus = i === focus;
                return (
                  <div
                    key={d.label}
                    className="flex flex-col items-center"
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <span
                      className={cn(
                        "h-4 w-px transition-colors duration-300",
                        isFocus ? "bg-brand-teal-light" : "bg-brand-bright/30",
                      )}
                    />
                    <div
                      className={cn(
                        "flex w-full cursor-default flex-col items-center gap-1 rounded-xl border px-1 py-2 text-center transition-all duration-300",
                        isFocus
                          ? "border-brand-bright/70 bg-brand-bright/[0.14] shadow-[0_0_22px_-4px_rgba(176, 90, 51,0.7)] scale-[1.05]"
                          : "border-white/10 bg-white/[0.04]",
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-7 items-center justify-center rounded-lg transition-colors duration-300",
                          isFocus ? "bg-brand-bright text-navy" : "bg-brand-bright/10 text-brand-bright",
                        )}
                      >
                        <Icon className="size-3.5" />
                      </span>
                      <span
                        className={cn(
                          "text-[9px] font-semibold leading-tight transition-colors duration-300",
                          isFocus ? "text-white" : "text-white/70",
                        )}
                      >
                        {d.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* link campo → impianti */}
            <div className="flex justify-center">
              <span className="h-5 w-px bg-brand-bright/30" />
            </div>

            {/* ── Tier 4 · Impianti gestiti ─────────────────────────────── */}
            <div className="flex items-center justify-between px-0.5">
              <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-brand-bright/80">
                Impianti gestiti
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-navy-muted">
                carichi
              </span>
            </div>
            <div className="relative mt-1.5 h-2">
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden
              >
                <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(176, 90, 51,0.18)" strokeWidth="2.5" />
                <line
                  x1="0"
                  y1="50"
                  x2="100"
                  y2="50"
                  stroke="rgba(176, 90, 51,0.5)"
                  strokeWidth="2.5"
                  strokeDasharray="3 7"
                  className={booted ? "trace-march" : undefined}
                />
              </svg>
            </div>
            <div className="grid grid-cols-6 gap-1.5">
              {LOADS.map((l, i) => {
                const Icon = l.icon;
                const lit = activeLoads.has(i);
                return (
                  <div key={l.label} className="flex flex-col items-center">
                    <span
                      className={cn(
                        "h-3.5 w-px transition-colors duration-300",
                        lit ? "bg-brand-teal-light" : "bg-brand-bright/25",
                      )}
                    />
                    <div
                      className={cn(
                        "flex w-full flex-col items-center gap-1 rounded-lg border px-1 py-1.5 text-center transition-all duration-300",
                        lit
                          ? "border-brand-bright/55 bg-brand-bright/[0.1]"
                          : "border-white/[0.07] bg-white/[0.02]",
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-6 items-center justify-center rounded-md transition-colors duration-300",
                          lit ? "bg-brand-bright/85 text-navy" : "bg-white/[0.06] text-brand-bright/70",
                        )}
                      >
                        <Icon className="size-3" />
                      </span>
                      <span
                        className={cn(
                          "text-[8.5px] font-medium leading-tight transition-colors duration-300",
                          lit ? "text-white/90" : "text-white/55",
                        )}
                      >
                        {l.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* narration console — lo schema si racconta */}
        <div className="mt-5 flex items-center gap-2.5 rounded-xl border border-white/10 bg-black/25 px-3 py-2.5">
          <span className="relative flex size-2 shrink-0">
            <span className="absolute inline-flex h-full w-full live-ring rounded-full bg-brand-bright" />
            <span className="relative inline-flex size-2 rounded-full bg-brand-bright" />
          </span>
          <div className="min-w-0 flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={focus}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="truncate text-[12px] leading-snug text-white/80"
              >
                {focusDevice.line}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function RailLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-brand-bright/80">
      {children}
    </span>
  );
}

function ClientCard({
  icon: Icon,
  name,
  sub,
}: {
  icon: LucideIcon;
  name: string;
  sub: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3 text-center">
      <span className="flex size-8 items-center justify-center rounded-lg bg-brand-bright/10 text-brand-bright">
        <Icon className="size-4" />
      </span>
      <span className="mt-1.5 text-[11.5px] font-bold leading-tight text-white/90">{name}</span>
      <span className="font-mono text-[8px] uppercase tracking-[0.08em] text-navy-muted">{sub}</span>
    </div>
  );
}

function RailModule({
  icon: Icon,
  name,
  sub,
}: {
  icon: LucideIcon;
  name: string;
  sub: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2">
      <span className="flex size-7 items-center justify-center rounded-lg bg-brand-bright/10 text-brand-bright">
        <Icon className="size-3.5" />
      </span>
      <div className="text-left">
        <span className="block text-[11px] font-bold leading-tight text-white/90">{name}</span>
        <span className="block font-mono text-[8px] uppercase tracking-[0.08em] text-navy-muted">
          {sub}
        </span>
      </div>
    </div>
  );
}

function Drop() {
  return (
    <div className="flex justify-center">
      <span className="h-5 w-px bg-brand-bright/35" />
    </div>
  );
}
