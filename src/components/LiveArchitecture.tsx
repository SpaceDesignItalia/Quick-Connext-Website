"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  Blinds,
  Cable,
  Camera,
  Cpu,
  KeyRound,
  Lightbulb,
  Network,
  Plug,
  Radio,
  SlidersHorizontal,
  Sun,
  Thermometer,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ── The Connext Box, alive ───────────────────────────────────────────────────
   Not a diagram: a running system. The bus stays energised, and the box keeps
   routing real events out to the eight domains — each one lights up, shows a
   live reading and narrates what just happened. Hover a domain to inspect it.
──────────────────────────────────────────────────────────────────────────── */

type Domain = {
  icon: LucideIcon;
  label: string;
  controls: string;
  x: number; // % within the circuit field
  y: number;
  side: "left" | "right";
  events: { value: string; line: string }[];
};

const DOMAINS: Domain[] = [
  {
    icon: Thermometer,
    label: "Clima",
    controls: "Climatizzazione e HVAC",
    x: 20,
    y: 15,
    side: "left",
    events: [
      { value: "per zona", line: "Climatizzazione e HVAC regolati zona per zona" },
      { value: "su presenza", line: "Regolazione su sensori di presenza e occupazione" },
      { value: "ventilazione", line: "Riscaldamento, raffrescamento e ventilazione coordinati" },
    ],
  },
  {
    icon: Lightbulb,
    label: "Luci",
    controls: "Sistemi di illuminazione",
    x: 80,
    y: 15,
    side: "right",
    events: [
      { value: "per zona", line: "Illuminazione zona per zona, con DALI, KNX, 0-10V" },
      { value: "scenari", line: "Scenari di illuminazione programmabili" },
      { value: "su assenza", line: "Spegnimento automatico in assenza di presenza" },
    ],
  },
  {
    icon: KeyRound,
    label: "Accessi",
    controls: "Controllo accessi",
    x: 20,
    y: 38,
    side: "left",
    events: [
      { value: "badge aperto", line: "Controllo accessi con badge aperto e lettori standard" },
      { value: "no proprietari", line: "Nessuna carta proprietaria, nessun vincolo di fornitore" },
      { value: "profili", line: "Profili di accesso gestiti dall'unica piattaforma" },
    ],
  },
  {
    icon: Camera,
    label: "Sicurezza",
    controls: "TVCC e telecamere IP",
    x: 80,
    y: 38,
    side: "right",
    events: [
      { value: "TVCC", line: "TVCC e telecamere IP integrate nella supervisione" },
      { value: "diagnostica", line: "Diagnostica e supervisione centralizzata" },
      { value: "alert", line: "Alert proattivi su anomalie e scostamenti dai set-point" },
    ],
  },
  {
    icon: Radio,
    label: "Sensori",
    controls: "Sensori e qualità aria",
    x: 20,
    y: 61,
    side: "left",
    events: [
      { value: "CO₂", line: "Sensori di temperatura, presenza, CO₂, qualità dell'aria" },
      { value: "DCV", line: "Ventilazione DCV pilotata dai sensori CO₂" },
      { value: "luminosità", line: "Rilevazione di luminosità e occupazione" },
    ],
  },
  {
    icon: Blinds,
    label: "Schermature",
    controls: "Schermature e tapparelle",
    x: 80,
    y: 61,
    side: "right",
    events: [
      { value: "motorizzate", line: "Schermature e tapparelle motorizzate" },
      { value: "integrate", line: "Schermature integrate nell'unica piattaforma" },
    ],
  },
  {
    icon: Sun,
    label: "Rinnovabili",
    controls: "Fonti rinnovabili",
    x: 20,
    y: 84,
    side: "left",
    events: [
      { value: "fotovoltaico", line: "Fonti rinnovabili: fotovoltaico, pompe di calore, accumuli" },
      { value: "demand response", line: "Demand response sul carico HVAC col surplus fotovoltaico" },
      { value: "pompe di calore", line: "Pompe di calore monitorate e coordinate" },
    ],
  },
  {
    icon: SlidersHorizontal,
    label: "Interfacce",
    controls: "Interfacce utente",
    x: 80,
    y: 84,
    side: "right",
    events: [
      { value: "termostati", line: "Interfacce utente: termostati, display touch" },
      { value: "pulsantiere", line: "Pulsantiere sensorizzate" },
      { value: "supervisione", line: "Supervisione web e accesso remoto sicuro" },
    ],
  },
];

const SPINE_X = 50;

export function LiveArchitecture({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-15%" });
  const [booted, setBooted] = useState(false);
  const [active, setActive] = useState(0);
  const [tick, setTick] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  // Power-on once the panel is on screen.
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setBooted(true), 450);
    return () => clearTimeout(t);
  }, [inView]);

  // The box keeps routing events — pause the auto-cycle while inspecting a node.
  useEffect(() => {
    if (!booted || !inView || hovered !== null) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % DOMAINS.length);
      setTick((k) => k + 1);
    }, 1700);
    return () => clearInterval(id);
  }, [booted, inView, hovered]);

  const focus = hovered ?? active;
  const focusDomain = DOMAINS[focus];
  const focusEvent = focusDomain.events[tick % focusDomain.events.length];

  return (
    <div
      ref={ref}
      className={cn(
        "relative w-full min-w-0 overflow-hidden rounded-3xl bg-navy p-5 shadow-card sm:p-6",
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
            Connext Box
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-brand-bright/25 bg-brand-bright/[0.08] px-2.5 py-1 font-mono text-[9.5px] font-semibold uppercase tracking-[0.16em] text-brand-bright">
            <span className="relative flex size-1.5">
              <span className="relative inline-flex size-1.5 rounded-full bg-brand-bright" />
            </span>
            KNX-IP
          </span>
        </div>

        {/* DIN rail — the brain */}
        <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-2.5 sm:gap-2.5 sm:p-3">
          {[
            { icon: Plug, name: "Alimentatore", sub: "ridondabile", primary: false },
            { icon: Cpu, name: "Connext Box", sub: "server KNX-IP", primary: true },
            { icon: Network, name: "Interfaccia", sub: "KNX / IP", primary: false },
          ].map((m) => (
            <div
              key={m.name}
              className={cn(
                "relative flex flex-col items-center gap-1 rounded-xl border px-1.5 py-2.5 text-center",
                m.primary
                  ? "border-brand-bright/60 bg-brand-bright/[0.12]"
                  : "border-white/10 bg-white/[0.04]",
              )}
            >
              {m.primary && booted && (
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-xl"
                  animate={{ boxShadow: [
                    "0 0 0px 0px rgba(176, 90, 51,0.0)",
                    "0 0 22px 2px rgba(176, 90, 51,0.55)",
                    "0 0 0px 0px rgba(176, 90, 51,0.0)",
                  ] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              <span
                className={cn(
                  "relative flex size-8 items-center justify-center rounded-lg",
                  m.primary ? "bg-brand-bright text-navy" : "bg-white/10 text-brand-bright",
                )}
              >
                <m.icon className="size-4" />
              </span>
              <span
                className={cn(
                  "relative text-[10.5px] font-bold leading-tight sm:text-[12px]",
                  m.primary ? "text-white" : "text-white/85",
                )}
              >
                {m.name}
              </span>
              <span className="relative font-mono text-[8px] uppercase tracking-[0.08em] text-navy-muted sm:text-[8.5px]">
                {m.sub}
              </span>
            </div>
          ))}
        </div>

        {/* circuit field — spine + eight branches + live nodes */}
        <div className="relative mt-2 h-[300px] sm:h-[330px]">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            {/* spine */}
            <line
              x1={SPINE_X}
              y1="0"
              x2={SPINE_X}
              y2="96"
              stroke="rgba(176, 90, 51,0.22)"
              strokeWidth="0.5"
            />
            <line
              x1={SPINE_X}
              y1="0"
              x2={SPINE_X}
              y2="96"
              stroke="rgba(176, 90, 51,0.85)"
              strokeWidth="0.5"
              strokeDasharray="2 5"
              className={booted ? "trace-march" : undefined}
            />
            {/* branches */}
            {DOMAINS.map((d, i) => {
              const isFocus = i === focus;
              return (
                <g key={d.label}>
                  <line
                    x1={SPINE_X}
                    y1={d.y}
                    x2={d.x}
                    y2={d.y}
                    stroke={isFocus ? "rgba(176, 90, 51,0.9)" : "rgba(176, 90, 51,0.2)"}
                    strokeWidth={isFocus ? "0.6" : "0.4"}
                  />
                  <line
                    x1={SPINE_X}
                    y1={d.y}
                    x2={d.x}
                    y2={d.y}
                    stroke={isFocus ? "rgba(176, 90, 51,1)" : "rgba(176, 90, 51,0.55)"}
                    strokeWidth="0.4"
                    strokeDasharray="1.5 4"
                    className={
                      booted ? (isFocus ? "trace-march-fast" : "trace-march") : undefined
                    }
                  />
                  {/* junction on the spine */}
                  <circle cx={SPINE_X} cy={d.y} r={isFocus ? 1.1 : 0.7} fill={isFocus ? "#B05A33" : "rgba(176, 90, 51,0.5)"} />
                </g>
              );
            })}
            {/* travelling pulse to the focused node */}
            {booted && (
              <motion.circle
                key={`${focus}-${tick}`}
                r="1.3"
                fill="#B05A33"
                cy={focusDomain.y}
                initial={{ cx: SPINE_X, opacity: 0 }}
                animate={{ cx: focusDomain.x, opacity: [0, 1, 1, 0] }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />
            )}
          </svg>

          {/* nodes */}
          {DOMAINS.map((d, i) => {
            const Icon = d.icon;
            const isFocus = i === focus;
            const ev = d.events[tick % d.events.length];
            return (
              <div
                key={d.label}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${d.x}%`, top: `${d.y}%` }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* live readout chip */}
                <AnimatePresence>
                  {isFocus && (
                    <motion.div
                      initial={{ opacity: 0, y: 4, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.9 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className={cn(
                        "absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded-md border border-brand-bright/40 bg-navy/95 px-2 py-1 font-mono text-[9.5px] font-bold text-brand-bright shadow-[0_4px_16px_rgba(0,0,0,0.4)]",
                      )}
                    >
                      {ev.value}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div
                  className={cn(
                    "flex cursor-default flex-col items-center gap-1 rounded-xl border px-2 py-2 transition-all duration-300",
                    isFocus
                      ? "border-brand-bright/70 bg-brand-bright/[0.14] shadow-[0_0_22px_-4px_rgba(176, 90, 51,0.7)] scale-[1.06]"
                      : "border-white/10 bg-white/[0.04]",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-7 items-center justify-center rounded-lg transition-colors duration-300 sm:size-8",
                      isFocus ? "bg-brand-bright text-navy" : "bg-brand-bright/10 text-brand-bright",
                    )}
                  >
                    <Icon className="size-3.5 sm:size-4" />
                  </span>
                  <span
                    className={cn(
                      "text-[9.5px] font-semibold leading-none transition-colors duration-300 sm:text-[10.5px]",
                      isFocus ? "text-white" : "text-white/75",
                    )}
                  >
                    {d.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* narration console — the box explains itself */}
        <div className="mt-2 flex items-center gap-2.5 rounded-xl border border-white/10 bg-black/25 px-3 py-2.5">
          <span className="relative flex size-2 shrink-0">
            <span className="absolute inline-flex h-full w-full live-ring rounded-full bg-brand-bright" />
            <span className="relative inline-flex size-2 rounded-full bg-brand-bright" />
          </span>
          <div className="min-w-0 flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={`${focus}-${focusEvent.line}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="truncate text-[11.5px] leading-snug text-white/80"
              >
                <span className="font-mono text-brand-bright">{focusDomain.controls}</span>
                <span className="text-white/35"> · </span>
                {focusEvent.line}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
