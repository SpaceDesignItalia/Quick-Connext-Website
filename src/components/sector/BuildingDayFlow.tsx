"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { BadgeCheck, Gauge, Lightbulb, Thermometer } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Una giornata dell'edificio, live ────────────────────────────────────────
   Quattro momenti della giornata: i piani si popolano e si svuotano, clima e
   luci seguono l'occupazione e il carico dell'edificio scende dove non c'è
   nessuno. La promessa BACS raccontata in un solo pannello.
──────────────────────────────────────────────────────────────────────────── */

const PHASES = [
  {
    time: "07:30",
    label: "Apertura",
    note: "L'edificio si accende solo dove serve: reception attiva, piani in comfort progressivo.",
    load: 34,
  },
  {
    time: "10:00",
    label: "Piena attività",
    note: "Presenze al completo: clima e luci seguono l'occupazione, piano per piano.",
    load: 86,
  },
  {
    time: "13:30",
    label: "Pausa",
    note: "Sale riunioni libere in eco automatico, senza alcun intervento manuale.",
    load: 62,
  },
  {
    time: "19:30",
    label: "Chiusura",
    note: "Piani vuoti in modalità eco: i consumi si azzerano dove non c'è nessuno.",
    load: 18,
  },
] as const;

/* occ[i] = persone presenti (0–4) nel momento i della giornata */
const FLOORS = [
  { name: "P3", zone: "Direzione", occ: [0, 3, 2, 0] },
  { name: "P2", zone: "Uffici", occ: [1, 4, 4, 0] },
  { name: "P1", zone: "Sale riunioni", occ: [0, 4, 1, 0] },
  { name: "PT", zone: "Reception", occ: [2, 3, 3, 1] },
] as const;

export function BuildingDayFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-15%" });
  const [booted, setBooted] = useState(false);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setBooted(true), 400);
    return () => clearTimeout(t);
  }, [inView]);

  // The day advances on its own while the panel is visible.
  useEffect(() => {
    if (!booted || !inView) return;
    const id = setInterval(() => setPhase((p) => (p + 1) % PHASES.length), 3400);
    return () => clearInterval(id);
  }, [booted, inView]);

  const current = PHASES[phase];

  return (
    <div
      ref={ref}
      className="relative w-full min-w-0 overflow-hidden rounded-3xl bg-navy p-5 shadow-card sm:p-6"
    >
      <div className="tech-grid-dark pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_0%,rgba(176,90,51,0.12),transparent)]"
        aria-hidden
      />

      <div className="relative">
        {/* header + day timeline */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-bright">
            Edificio direzionale
          </span>
          <div className="flex items-center gap-1">
            {PHASES.map((p, i) => (
              <button
                key={p.time}
                onClick={() => setPhase(i)}
                aria-label={`Vai al momento ${p.label}, ore ${p.time}`}
                aria-pressed={i === phase}
                className={cn(
                  // before: estende l'area di tap a ~44px senza toccare il visual
                  "relative rounded-full px-3 py-1.5 font-mono text-[9.5px] font-semibold tracking-[0.08em] transition-all duration-300 before:absolute before:-inset-y-2 before:inset-x-0 before:content-['']",
                  i === phase
                    ? "bg-brand-bright text-navy"
                    : "text-white/45 hover:text-white/75",
                )}
              >
                {p.time}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-[1.5fr_1fr]">
          {/* the building, floor by floor */}
          <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 sm:p-4">
            {FLOORS.map((floor) => {
              const occ = floor.occ[phase];
              const active = occ > 0;
              return (
                <div
                  key={floor.name}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-all duration-700",
                    active
                      ? "border-brand-bright/35 bg-brand-bright/[0.07]"
                      : "border-white/10 bg-white/[0.02]",
                  )}
                >
                  <span className="w-7 shrink-0 font-mono text-[10px] font-bold text-white/60">
                    {floor.name}
                  </span>
                  <span className="hidden w-24 shrink-0 text-[11px] font-semibold text-white/80 sm:block">
                    {floor.zone}
                  </span>
                  {/* occupancy */}
                  <span className="flex flex-1 items-center gap-1">
                    {Array.from({ length: 4 }).map((_, d) => (
                      <span
                        key={d}
                        className={cn(
                          "size-1.5 rounded-full transition-all duration-700",
                          d < occ ? "bg-brand-bright" : "bg-white/15",
                        )}
                      />
                    ))}
                  </span>
                  {/* climate + lights follow the people */}
                  <span className="flex shrink-0 items-center gap-2">
                    <Thermometer
                      className={cn(
                        "size-3.5 transition-colors duration-700",
                        active ? "text-brand-bright" : "text-white/25",
                      )}
                    />
                    <Lightbulb
                      className={cn(
                        "size-3.5 transition-colors duration-700",
                        active ? "text-brand-gold" : "text-white/25",
                      )}
                    />
                    <span
                      className={cn(
                        "w-14 rounded-full border px-1.5 py-0.5 text-center font-mono text-[8.5px] font-bold uppercase tracking-[0.08em] transition-all duration-700",
                        active
                          ? "border-brand-bright/40 text-brand-bright"
                          : "border-white/15 text-white/45",
                      )}
                    >
                      {active ? "comfort" : "eco"}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>

          {/* building load + compliance */}
          <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[12px] font-bold text-white">Carico edificio</p>
              <AnimatePresence mode="wait">
                <motion.span
                  key={phase}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="font-mono text-[10px] font-bold text-brand-bright"
                >
                  {current.label}
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/[0.08]">
              <motion.span
                className="block h-full rounded-full bg-gradient-to-r from-brand to-brand-bright"
                initial={{ width: 0 }}
                animate={booted ? { width: `${current.load}%` } : {}}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/45">
              Clima e luci seguono le presenze
            </p>

            <div className="mt-auto flex flex-col gap-2 border-t border-white/10 pt-3">
              <div className="flex items-center gap-2">
                <Gauge className="size-3.5 shrink-0 text-brand-bright" />
                <p className="text-[11.5px] font-semibold text-white/85">
                  −33% consumi <span className="font-normal text-white/50">sull&apos;edificio</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <BadgeCheck className="size-3.5 shrink-0 text-brand-gold" />
                <p className="text-[11.5px] font-semibold text-white/85">
                  BACS Classe B <span className="font-normal text-white/50">· pronto per il 2026</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* narration console */}
        <div className="mt-3 flex items-center gap-2.5 rounded-xl border border-white/10 bg-black/25 px-3 py-2.5">
          <span className="relative flex size-2 shrink-0">
            <span className="relative inline-flex size-2 rounded-full bg-brand-bright" />
          </span>
          <div className="min-w-0 flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={phase}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="truncate text-[11.5px] leading-snug text-white/80"
              >
                <span className="font-mono text-brand-bright">{current.time}</span>
                <span className="text-white/35"> · </span>
                {current.note}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
