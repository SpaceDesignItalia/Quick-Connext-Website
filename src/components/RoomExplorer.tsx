"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  Blinds,
  Lightbulb,
  LampDesk,
  Radio,
  Thermometer,
  UserCog,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Esplora la camera connessa ────────────────────────────────────────────────
   Una sola foto pulita della camera; il testo lo aggiunge il codice. La vista
   compie un tour cinematografico: zooma e scorre su ogni tecnologia mentre un
   callout spiega cosa fa. Le coordinate degli hotspot (x/y in %) seguono i punti
   reali della foto — vanno ritarate se si cambia immagine.
   Copy: solo dai documenti QuickConnext (comfort camere, accessi, energia).
──────────────────────────────────────────────────────────────────────────── */

type Hotspot = {
  icon: LucideIcon;
  label: string;
  text: string;
  x: number; // % dal bordo sinistro della foto
  y: number; // % dal bordo alto
};

const HOTSPOTS: Hotspot[] = [
  {
    icon: Radio,
    label: "Sensore di presenza",
    text: "Rileva presenza e occupazione: clima e luci si riducono da soli a camera vuota.",
    x: 50,
    y: 9,
  },
  {
    icon: Blinds,
    label: "Tende motorizzate",
    text: "Veneziane e tende motorizzate, integrate con la luce naturale e gli orari.",
    x: 27,
    y: 26,
  },
  {
    icon: Lightbulb,
    label: "Illuminazione",
    text: "Scenari di illuminazione personalizzabili: relax, lavoro, notte.",
    x: 82,
    y: 16,
  },
  {
    icon: Thermometer,
    label: "Clima per camera",
    text: "Clima HVAC per singola camera, regolato su presenza e occupazione.",
    x: 62,
    y: 66,
  },
  {
    icon: UserCog,
    label: "Profilo ospite",
    text: "Temperatura e luci preferite memorizzate e riproposte ad ogni soggiorno.",
    x: 87,
    y: 56,
  },
  {
    icon: LampDesk,
    label: "Area lavoro",
    text: "Scenario «lavoro»: luce funzionale e prese gestite all'occorrenza.",
    x: 16,
    y: 62,
  },
];

const ZOOM = 1.75;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export function RoomExplorer({
  image = "/images/hotel-room.png",
  className,
}: {
  image?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-15%" });
  const [booted, setBooted] = useState(false);
  const [focus, setFocus] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);

  // Power-on: brief overview, then begin the tour.
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => {
      setBooted(true);
      setFocus(0);
    }, 1100);
    return () => clearTimeout(t);
  }, [inView]);

  // Auto-tour across the room.
  useEffect(() => {
    if (!booted || !inView || paused) return;
    const id = setInterval(() => {
      setFocus((f) => ((f ?? -1) + 1) % HOTSPOTS.length);
    }, 3600);
    return () => clearInterval(id);
  }, [booted, inView, paused]);

  const active = focus !== null ? HOTSPOTS[focus] : null;
  const s = active ? ZOOM : 1;

  // Pan so the focused point sits centred, clamped so the photo always covers.
  const lim = (s - 1) / 2;
  const tx = active ? clamp((0.5 - active.x / 100) * s, -lim, lim) * 100 : 0;
  const ty = active ? clamp((0.5 - active.y / 100) * s, -lim, lim) * 100 : 0;

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-3xl bg-navy p-2.5 shadow-card sm:p-3",
        className,
      )}
    >
      <div
        className="relative overflow-hidden rounded-[1.1rem]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* stage */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-navy">
          {/* zooming / panning photo + markers (markers track the photo) */}
          <motion.div
            className="absolute inset-0"
            style={{ transformOrigin: "center center" }}
            animate={{ scale: s, x: `${tx}%`, y: `${ty}%` }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={image}
              alt="Camera d'hotel connessa"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 70vw"
            />
            {/* subtle dark wash for callout legibility */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-navy/10" />

            {HOTSPOTS.map((h, i) => {
              const isActive = i === focus;
              return (
                <button
                  key={h.label}
                  type="button"
                  onClick={() => setFocus(i)}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${h.x}%`, top: `${h.y}%` }}
                  aria-label={h.label}
                >
                  {/* counter-scale so the marker keeps a constant size while zoomed */}
                  <motion.span
                    className="relative flex items-center justify-center"
                    animate={{ scale: booted ? 1 / s : 1 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span
                      className={cn(
                        "absolute rounded-full transition-all duration-500",
                        isActive
                          ? "size-10 bg-brand-bright/20 ring-2 ring-brand-bright"
                          : "size-7 bg-brand-bright/10 ring-1 ring-brand-bright/60",
                      )}
                    />
                    {!isActive && (
                      <span className="absolute size-7 animate-ping rounded-full bg-brand-bright/40" />
                    )}
                    <span
                      className={cn(
                        "relative flex items-center justify-center rounded-full text-navy transition-all duration-500",
                        isActive ? "size-7 bg-brand-bright" : "size-3 bg-brand-bright",
                      )}
                    >
                      {isActive && <h.icon className="size-4" />}
                    </span>
                  </motion.span>
                </button>
              );
            })}
          </motion.div>

          {/* live badge */}
          <span className="pointer-events-none absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-brand shadow-sm backdrop-blur-sm">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-bright opacity-70" />
              <span className="relative inline-flex size-1.5 rounded-full bg-brand-bright" />
            </span>
            Esplora la camera
          </span>

          {/* callout — fixed in the corner, content swaps per hotspot */}
          <div className="pointer-events-none absolute bottom-3 left-3 z-10 max-w-[19rem]">
            <AnimatePresence mode="wait">
              {active && (
                <motion.div
                  key={focus}
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="glass-card-dark flex items-start gap-3 rounded-2xl p-3.5 pr-4"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-bright/15 text-brand-bright">
                    <active.icon className="size-[18px]" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-[15px] font-semibold leading-tight text-white">
                      {active.label}
                    </p>
                    <p className="mt-1 text-[12.5px] leading-snug text-white/70">{active.text}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* auto-tour progress — the tour advancing, frozen while you inspect */}
      <div className="mt-2.5 h-[3px] w-full overflow-hidden rounded-full bg-white/10">
        {booted && active && (
          <div
            key={focus}
            className="tour-progress h-full rounded-full bg-brand-bright"
            style={{
              animationDuration: "3600ms",
              animationPlayState: paused ? "paused" : "running",
            }}
          />
        )}
      </div>

      {/* tour navigation — chip strip */}
      <div className="no-scrollbar mt-2.5 flex items-center gap-1.5 overflow-x-auto px-0.5 pb-0.5">
        {HOTSPOTS.map((h, i) => {
          const isActive = i === focus;
          return (
            <button
              key={h.label}
              type="button"
              onClick={() => setFocus(i)}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[11px] font-semibold transition-all duration-300",
                isActive
                  ? "border-brand-bright/70 bg-brand-bright/15 text-white"
                  : "border-white/10 bg-white/[0.04] text-white/60 hover:text-white/90",
              )}
            >
              <h.icon className={cn("size-3.5", isActive ? "text-brand-bright" : "text-brand-bright/70")} />
              {h.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
