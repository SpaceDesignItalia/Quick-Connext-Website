"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { BellRing, Check, Moon, Thermometer, Users, Wind } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Il turno di notte, live ─────────────────────────────────────────────────
   Il racconto in tre tempi di una notte in struttura: tutto tranquillo, una
   chiamata dalla Stanza 22, la risposta in 1m 40s. Animazioni lente e
   discrete: qui il prodotto è la serenità, non lo spettacolo.
──────────────────────────────────────────────────────────────────────────── */

type Phase = "quiet" | "call" | "handled";

const PHASE_AFTER: Record<Phase, Phase> = {
  quiet: "call",
  call: "handled",
  handled: "quiet",
};

const PHASE_MS: Record<Phase, number> = {
  quiet: 3600,
  call: 3200,
  handled: 3800,
};

const NARRATION: Record<Phase, string> = {
  quiet: "Clima notte attivo in ogni stanza · CO₂ 620 ppm, aria nella norma",
  call: "Chiamata dalla Stanza 22 — instradata al personale di turno, con priorità",
  handled: "Chiamata gestita in 1m 40s · evento tracciato nello storico",
};

const STAFF_STATUS: Record<Phase, string> = {
  quiet: "In ascolto",
  call: "Notifica ricevuta",
  handled: "Risposta 1m 40s",
};

const ROOMS = [
  { n: 17, reading: "22,5°" },
  { n: 18, reading: "23°" },
  { n: 19, reading: "22°" },
  { n: 20, reading: "23°" },
  { n: 21, reading: "22,5°" },
  { n: 22, reading: "23°" },
];

const CALL_ROOM = 22;

export function RsaCareBoard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-15%" });
  const [booted, setBooted] = useState(false);
  const [phase, setPhase] = useState<Phase>("quiet");

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setBooted(true), 400);
    return () => clearTimeout(t);
  }, [inView]);

  // The night unfolds on its own — paused while off screen.
  useEffect(() => {
    if (!booted || !inView) return;
    const t = setTimeout(() => setPhase((p) => PHASE_AFTER[p]), PHASE_MS[phase]);
    return () => clearTimeout(t);
  }, [phase, booted, inView]);

  return (
    <div
      ref={ref}
      className="relative w-full min-w-0 overflow-hidden rounded-3xl bg-navy p-5 shadow-card sm:p-6"
    >
      <div className="tech-grid-dark pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_0%,rgba(194,163,107,0.10),transparent)]"
        aria-hidden
      />

      <div className="relative">
        {/* header */}
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-bright">
            Reparto · Piano 2
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-2.5 py-1 font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em] text-white/70">
            <Moon className="size-3 text-brand-gold" />
            Turno di notte
          </span>
        </div>

        {/* rooms */}
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5">
          {ROOMS.map((room) => {
            const isCallRoom = room.n === CALL_ROOM;
            const calling = isCallRoom && phase === "call";
            const handled = isCallRoom && phase === "handled";
            return (
              <div
                key={room.n}
                className={cn(
                  "relative rounded-xl border px-3 py-2.5 transition-all duration-500",
                  calling
                    ? "border-brand-bright/70 bg-brand-bright/[0.12] shadow-[0_0_22px_-6px_rgba(199,122,79,0.7)]"
                    : handled
                      ? "border-emerald-400/40 bg-emerald-400/[0.06]"
                      : "border-white/10 bg-white/[0.03]",
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.12em] text-white/55">
                    Stanza {room.n}
                  </span>
                  {calling ? (
                    <span className="relative flex size-4 items-center justify-center">
                      <span className="absolute inline-flex size-2.5 live-ring rounded-full bg-brand-bright" />
                      <BellRing className="relative size-3.5 text-brand-bright" />
                    </span>
                  ) : handled ? (
                    <motion.span
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 420, damping: 24 }}
                      className="flex size-4 items-center justify-center rounded-full bg-emerald-400/90 text-navy"
                    >
                      <Check className="size-2.5" strokeWidth={3.5} />
                    </motion.span>
                  ) : (
                    <span className="size-1.5 rounded-full bg-brand-gold/70" />
                  )}
                </div>
                <div className="mt-1.5 flex items-center gap-1.5">
                  {room.n === 18 ? (
                    <>
                      <Wind className="size-3 text-white/45" />
                      <span className="text-[12px] font-semibold text-white/85">620 ppm</span>
                    </>
                  ) : (
                    <>
                      <Thermometer className="size-3 text-white/45" />
                      <span className="text-[12px] font-semibold text-white/85">{room.reading}</span>
                    </>
                  )}
                </div>
                <p
                  className={cn(
                    "mt-1 font-mono text-[8.5px] uppercase tracking-[0.1em] transition-colors duration-500",
                    calling ? "text-brand-bright" : handled ? "text-emerald-300/90" : "text-white/40",
                  )}
                >
                  {calling ? "Chiamata" : handled ? "Gestita" : "Comfort notte"}
                </p>
              </div>
            );
          })}
        </div>

        {/* staff bar — where the call lands */}
        <div className="mt-3 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3">
          <span
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-500",
              phase === "call" ? "bg-brand-bright text-navy" : "bg-white/10 text-brand-bright",
            )}
          >
            <Users className="size-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-bold text-white">Personale di turno</p>
            <AnimatePresence mode="wait">
              <motion.p
                key={phase}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "font-mono text-[9.5px] uppercase tracking-[0.12em]",
                  phase === "handled" ? "text-emerald-300/90" : "text-white/55",
                )}
              >
                {STAFF_STATUS[phase]}
              </motion.p>
            </AnimatePresence>
          </div>
          {/* the routed notification slides in while the call is live */}
          <AnimatePresence>
            {phase !== "quiet" && (
              <motion.span
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.12em]",
                  phase === "call"
                    ? "border-brand-bright/40 bg-brand-bright/[0.1] text-brand-bright"
                    : "border-emerald-400/40 bg-emerald-400/[0.08] text-emerald-300",
                )}
              >
                {phase === "call" ? (
                  <>
                    <BellRing className="size-2.5" />
                    Stanza 22
                  </>
                ) : (
                  <>
                    <Check className="size-2.5" strokeWidth={3} />
                    1m 40s
                  </>
                )}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* narration console */}
        <div className="mt-2 flex items-center gap-2.5 rounded-xl border border-white/10 bg-black/25 px-3 py-2.5">
          <span className="relative flex size-2 shrink-0">
            <span
              className={cn(
                "absolute inline-flex h-full w-full rounded-full bg-brand-bright",
                phase === "call" && "live-ring",
              )}
            />
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
                <span className="font-mono text-brand-bright">03:12</span>
                <span className="text-white/35"> · </span>
                {NARRATION[phase]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
