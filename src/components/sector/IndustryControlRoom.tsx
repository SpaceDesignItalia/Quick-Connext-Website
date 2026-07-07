"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  Activity,
  Gauge,
  ShieldCheck,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

/* ── La sala controllo, live ─────────────────────────────────────────────────
   Non un'immagine: la supervisione al lavoro. La curva di carico si disegna,
   il bilanciamento tiene i consumi sotto la soglia di picco e il feed racconta
   la diagnostica predittiva — gli stessi eventi citati nelle scene sopra.
──────────────────────────────────────────────────────────────────────────── */

const EVENTS: { icon: LucideIcon; title: string; detail: string; status: string }[] = [
  {
    icon: Zap,
    title: "Picco di carico in avvicinamento",
    detail: "Bilanciamento automatico dei carichi",
    status: "Picco evitato",
  },
  {
    icon: Activity,
    title: "Compressore 2",
    detail: "Anomalia prevista tra 6 giorni",
    status: "Intervento pianificato",
  },
  {
    icon: Wrench,
    title: "Impianti",
    detail: "97% operativi · diagnostica continua",
    status: "Tutto regolare",
  },
  {
    icon: ShieldCheck,
    title: "Area logistica",
    detail: "Accessi tracciati, sorveglianza attiva",
    status: "Tutto regolare",
  },
];

const DEPARTMENTS = [
  { name: "Reparto produzione", value: "−21% oggi", width: "62%" },
  { name: "Climatizzazione", value: "ottimizzata", width: "44%" },
  { name: "Carichi elettrici", value: "bilanciati", width: "53%" },
];

/* Profilo di carico del giorno (y piccola = carico alto, soglia a y=18):
   la curva grigia "senza gestione" sfora la soglia; quella terracotta,
   con i carichi bilanciati, resta sempre sotto. */
const THRESHOLD_Y = 18;
const PATH_UNMANAGED =
  "M0,48 C12,46 20,38 30,30 C38,23 44,11 52,9.5 C58,8.5 64,11 70,17 C78,25 88,34 100,37";
const PATH_MANAGED =
  "M0,48 C12,46 20,38 30,30 C38,24 44,21 52,20 C58,19.6 64,20 70,22 C78,26 88,34 100,37";

export function IndustryControlRoom() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-15%" });
  const [booted, setBooted] = useState(false);
  const [event, setEvent] = useState(0);

  // Power-on once the panel is on screen.
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setBooted(true), 350);
    return () => clearTimeout(t);
  }, [inView]);

  // The feed keeps routing events while visible.
  useEffect(() => {
    if (!booted || !inView) return;
    const id = setInterval(() => setEvent((e) => (e + 1) % EVENTS.length), 3200);
    return () => clearInterval(id);
  }, [booted, inView]);

  const ev = EVENTS[event];
  const EvIcon = ev.icon;

  return (
    <div
      ref={ref}
      className="relative w-full min-w-0 overflow-hidden rounded-3xl bg-navy p-5 shadow-card sm:p-6"
    >
      <div className="tech-grid-dark pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_0%,rgba(176,90,51,0.14),transparent)]"
        aria-hidden
      />

      <div className="relative">
        {/* header */}
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-bright">
            Supervisione stabilimento
          </span>
          <span className="rounded-full border border-white/15 bg-white/[0.05] px-2.5 py-1 font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em] text-white/70">
            KNX · Modbus · BACnet
          </span>
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-[1.45fr_1fr]">
          {/* load-profile chart */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-[12px] font-bold text-white">Profilo di carico · oggi</p>
              <div className="flex items-center gap-3 font-mono text-[8.5px] uppercase tracking-[0.1em]">
                <span className="flex items-center gap-1.5 text-brand-bright">
                  <span className="h-[2px] w-4 rounded-full bg-brand-bright" />
                  con QuickConnext
                </span>
                <span className="hidden items-center gap-1.5 text-white/40 sm:flex">
                  <span className="h-[2px] w-4 rounded-full border-t border-dashed border-white/40" />
                  senza gestione
                </span>
              </div>
            </div>

            <div className="relative mt-3 h-[190px] sm:h-[210px]">
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 100 56"
                preserveAspectRatio="none"
                aria-hidden
              >
                {/* faint horizontal guides */}
                {[10, 25, 40].map((y) => (
                  <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="0.3" />
                ))}
                {/* peak threshold */}
                <line
                  x1="0"
                  y1={THRESHOLD_Y}
                  x2="100"
                  y2={THRESHOLD_Y}
                  stroke="rgba(194,163,107,0.55)"
                  strokeWidth="0.4"
                  strokeDasharray="2 2"
                />
                {/* without load management — crosses the threshold */}
                <motion.path
                  d={PATH_UNMANAGED}
                  fill="none"
                  stroke="rgba(255,255,255,0.28)"
                  strokeWidth="0.7"
                  strokeDasharray="2 2"
                  initial={{ pathLength: 0 }}
                  animate={booted ? { pathLength: 1 } : {}}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                {/* with QuickConnext — peak shaved, always under the line */}
                <motion.path
                  d={PATH_MANAGED}
                  fill="none"
                  stroke="#C77A4F"
                  strokeWidth="0.9"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={booted ? { pathLength: 1 } : {}}
                  transition={{ duration: 2, ease: "easeInOut", delay: 0.25 }}
                />
              </svg>

              {/* threshold tag */}
              <span className="absolute right-0 font-mono text-[8.5px] uppercase tracking-[0.1em] text-brand-gold" style={{ top: "26%" }}>
                soglia di picco
              </span>

              {/* the moment the product earns its keep */}
              <AnimatePresence>
                {booted && (
                  <motion.span
                    initial={{ opacity: 0, y: 8, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: 2.1, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-[38%] top-[4%] flex items-center gap-1.5 whitespace-nowrap rounded-md border border-brand-bright/40 bg-navy/95 px-2 py-1 font-mono text-[9px] font-bold text-brand-bright shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
                  >
                    <Zap className="size-2.5" />
                    Picco evitato · carichi bilanciati
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* per-department monitoring */}
          <div className="flex flex-col gap-2.5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-[12px] font-bold text-white">Consumi per reparto</p>
            {DEPARTMENTS.map((d, i) => (
              <div key={d.name} className="mt-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-[11px] font-semibold text-white/80">{d.name}</span>
                  <span className="font-mono text-[10px] font-bold text-brand-bright">{d.value}</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
                  <motion.span
                    className="block h-full rounded-full bg-gradient-to-r from-brand to-brand-bright"
                    initial={{ width: 0 }}
                    animate={booted ? { width: d.width } : {}}
                    transition={{ duration: 1.1, delay: 0.5 + i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
            ))}
            <div className="mt-auto flex items-center gap-2 border-t border-white/10 pt-3">
              <Gauge className="size-3.5 shrink-0 text-brand-gold" />
              <p className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-white/55">
                Report energetici automatici
              </p>
            </div>
          </div>
        </div>

        {/* event console — predictive maintenance narrates itself */}
        <div className="mt-3 flex items-center gap-3 rounded-xl border border-white/10 bg-black/25 px-3.5 py-3">
          <span className="relative flex size-2 shrink-0">
            <span className="absolute inline-flex h-full w-full live-ring rounded-full bg-brand-bright" />
            <span className="relative inline-flex size-2 rounded-full bg-brand-bright" />
          </span>
          <div className="min-w-0 flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={event}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="flex min-w-0 items-center gap-2.5"
              >
                <EvIcon className="size-3.5 shrink-0 text-brand-bright" />
                <p className="truncate text-[11.5px] leading-snug text-white/80">
                  <span className="font-semibold text-white">{ev.title}</span>
                  <span className="text-white/35"> · </span>
                  {ev.detail}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
          <AnimatePresence mode="wait">
            <motion.span
              key={event}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="hidden shrink-0 rounded-full border border-brand-bright/30 bg-brand-bright/[0.08] px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-brand-bright sm:block"
            >
              {ev.status}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
