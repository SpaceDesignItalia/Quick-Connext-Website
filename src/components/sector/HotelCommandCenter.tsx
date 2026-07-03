"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BedDouble,
  Droplets,
  KeyRound,
  Leaf,
  Lightbulb,
  Moon,
  ShieldCheck,
  Sparkles,
  Thermometer,
  TriangleAlert,
  Wrench,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

type RoomState = "free" | "occupied" | "eco" | "alert";

interface Room {
  id: string;
  state: RoomState;
  temp: number;
}

interface FeedEvent {
  key: number;
  time: string;
  icon: LucideIcon;
  text: string;
  tone: "default" | "ok" | "warn";
}

/* Deterministic initial layout — same on server and client. */
const INITIAL_STATES: RoomState[] = [
  "occupied", "free", "occupied", "eco", "free", "occupied",
  "free", "occupied", "occupied", "free", "eco", "occupied",
  "occupied", "free", "occupied", "occupied", "free", "eco",
];

function initRooms(): Room[] {
  return INITIAL_STATES.map((state, i) => {
    const floor = 3 - Math.floor(i / 6);
    const num = (i % 6) + 1;
    return {
      id: `${floor}0${num}`,
      state,
      temp: state === "occupied" ? 21 + (i % 2) : state === "eco" ? 18 : 17,
    };
  });
}

function now() {
  return new Date().toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

const ROOM_STYLE: Record<RoomState, string> = {
  free: "border-white/10 bg-white/[0.04] text-white/45",
  occupied: "border-brand/45 bg-brand/15 text-white",
  eco: "border-emerald-400/35 bg-emerald-400/10 text-emerald-100/90",
  alert: "border-amber-400/60 bg-amber-400/15 text-amber-100 animate-pulse",
};

const ROOM_DOT: Record<RoomState, string> = {
  free: "bg-white/25",
  occupied: "bg-brand-bright",
  eco: "bg-emerald-400",
  alert: "bg-amber-400",
};

const STATE_LABEL: Record<RoomState, string> = {
  free: "Libera · stand-by",
  occupied: "Occupata · comfort attivo",
  eco: "Eco · consumi ridotti",
  alert: "Anomalia rilevata",
};

let eventKey = 1;

export function HotelCommandCenter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { margin: "200px 0px" });
  const [rooms, setRooms] = useState<Room[]>(initRooms);
  const [events, setEvents] = useState<FeedEvent[]>([]);
  const [clock, setClock] = useState("--:--:--");
  const [savings, setSavings] = useState(247.4);
  const [pulseRoom, setPulseRoom] = useState<string | null>(null);
  const [nightDim, setNightDim] = useState(false);
  const [story, setStory] = useState<string | null>(null);
  const storyTimeouts = useRef<Array<ReturnType<typeof setTimeout>>>([]);
  const roomsRef = useRef(rooms);
  roomsRef.current = rooms;

  /* Narrates what's happening, step by step, in plain words. */
  const tellStory = useCallback(
    (steps: Array<[number, string]>, clearAfter = 6000) => {
      storyTimeouts.current.forEach(clearTimeout);
      storyTimeouts.current = steps.map(([delay, text]) =>
        setTimeout(() => setStory(text), delay),
      );
      const lastDelay = steps[steps.length - 1]?.[0] ?? 0;
      storyTimeouts.current.push(
        setTimeout(() => setStory(null), lastDelay + clearAfter),
      );
    },
    [],
  );

  useEffect(() => {
    const timeouts = storyTimeouts.current;
    return () => timeouts.forEach(clearTimeout);
  }, []);

  const pushEvent = useCallback(
    (icon: LucideIcon, text: string, tone: FeedEvent["tone"] = "default") => {
      setEvents((prev) => {
        if (prev[0]?.text === text) return prev; // avoid back-to-back duplicates
        return [{ key: eventKey++, time: now(), icon, text, tone }, ...prev].slice(0, 6);
      });
    },
    [],
  );

  const setRoomState = useCallback((id: string, state: RoomState, temp?: number) => {
    setRooms((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, state, temp: temp ?? r.temp } : r,
      ),
    );
    setPulseRoom(id);
    setTimeout(() => setPulseRoom((p) => (p === id ? null : p)), 1600);
  }, []);

  /* Live clock */
  useEffect(() => {
    const tick = () =>
      setClock(new Date().toLocaleTimeString("it-IT", { hour12: false }));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  /* Seed feed on mount */
  useEffect(() => {
    pushEvent(ShieldCheck, "Tutti i sistemi operativi — diagnostica completata", "ok");
    pushEvent(Droplets, "Piscina — 28,1° · pH 7,3 · cloro regolare");
    pushEvent(Thermometer, "Camera 304 — Presenza rilevata: clima a 22°");
  }, [pushEvent]);

  /* Ambient simulation — runs only while visible */
  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      const current = roomsRef.current;
      const roll = Math.random();
      setSavings((s) => +(s + Math.random() * 0.4 + 0.1).toFixed(1));

      if (roll < 0.22) {
        const free = current.filter((r) => r.state === "free");
        if (free.length > 1) {
          const room = free[Math.floor(Math.random() * free.length)];
          setRoomState(room.id, "occupied", 22);
          pushEvent(KeyRound, `Camera ${room.id} — Check-in: clima a 22°, scenario Benvenuto`, "ok");
          return;
        }
      }
      if (roll < 0.38) {
        const occupied = current.filter((r) => r.state === "occupied");
        if (occupied.length > 3) {
          const room = occupied[Math.floor(Math.random() * occupied.length)];
          setRoomState(room.id, "eco", 18);
          pushEvent(Leaf, `Camera ${room.id} — Camera libera: stand-by intelligente`, "ok");
          return;
        }
      }
      if (roll < 0.55) {
        const occupied = current.filter((r) => r.state === "occupied");
        if (occupied.length > 0) {
          const room = occupied[Math.floor(Math.random() * occupied.length)];
          pushEvent(Thermometer, `Camera ${room.id} — Ventilazione ottimizzata sulla presenza`);
          return;
        }
      }
      if (roll < 0.7) {
        const t = ["27,9", "28,0", "28,1", "28,2"][Math.floor(Math.random() * 4)];
        const ph = ["7,2", "7,3", "7,4"][Math.floor(Math.random() * 3)];
        pushEvent(Droplets, `Piscina — ${t}° · pH ${ph} · cloro regolare`);
        return;
      }
      if (roll < 0.85) {
        pushEvent(Lightbulb, "Lobby — Scenario luci aggiornato sull'ora del giorno");
        return;
      }
      pushEvent(Activity, "HVAC — Trend consumi sotto la media stagionale", "ok");
    }, 3400);
    return () => clearInterval(interval);
  }, [inView, pushEvent, setRoomState]);

  /* Scenario: simulated check-in */
  const simulateCheckIn = useCallback(() => {
    const free = roomsRef.current.filter((r) => r.state === "free");
    if (free.length === 0) return;
    const room = free[Math.floor(Math.random() * free.length)];
    pushEvent(KeyRound, `Camera ${room.id} — Badge attivato alla reception`, "ok");
    setRoomState(room.id, "occupied", 22);
    tellStory([
      [0, "Un ospite ritira il badge alla reception…"],
      [1100, `La camera ${room.id} si prepara da sola: clima a 22°, luci di benvenuto, tende aperte.`],
      [3000, "Nessuna chiamata, nessun giro ai piani: è successo tutto in automatico."],
    ]);
    setTimeout(() => {
      pushEvent(Thermometer, `Camera ${room.id} — Clima 22° · luci Benvenuto · tende aperte`, "ok");
    }, 1100);
  }, [pushEvent, setRoomState, tellStory]);

  /* Scenario: night mode */
  const simulateNight = useCallback(() => {
    setNightDim(true);
    pushEvent(Moon, "Aree comuni — Scenario notte: luci al 20%, clima ridotto", "ok");
    setRooms((prev) =>
      prev.map((r) => (r.state === "free" ? { ...r, temp: 16 } : r)),
    );
    tellStory([
      [0, "È l'una di notte: le aree comuni scendono al minimo."],
      [1400, "Luci al 20% e clima ridotto dove non c'è nessuno — guarda le camere libere."],
      [3000, "Potenza giù del 18%: l'hotel risparmia mentre dorme."],
    ]);
    setTimeout(() => {
      pushEvent(Zap, "Carichi bilanciati — potenza ridotta del 18%", "ok");
      setNightDim(false);
    }, 2600);
  }, [pushEvent, tellStory]);

  /* Scenario: technical anomaly caught early */
  const simulateAlert = useCallback(() => {
    const candidates = roomsRef.current.filter((r) => r.state !== "alert");
    const room = candidates[Math.floor(Math.random() * candidates.length)];
    const prev = room.state;
    setRoomState(room.id, "alert");
    pushEvent(TriangleAlert, `Camera ${room.id} — Anomalia prevista: fancoil, trend anomalo`, "warn");
    tellStory([
      [0, `Il sistema nota un trend anomalo sul fancoil della camera ${room.id}…`],
      [1600, "Allarme prima del guasto: l'intervento è già nell'agenda del tecnico."],
      [3800, "Risolto. L'ospite non si è accorto di nulla."],
    ]);
    setTimeout(() => {
      setRoomState(room.id, prev === "alert" ? "free" : prev);
      pushEvent(Wrench, `Camera ${room.id} — Intervento pianificato: nessun impatto sugli ospiti`, "ok");
    }, 3800);
  }, [pushEvent, setRoomState, tellStory]);

  /* Manual toggle on room click */
  const toggleRoom = useCallback(
    (room: Room) => {
      if (room.state === "alert") return;
      if (room.state === "occupied") {
        setRoomState(room.id, "eco", 18);
        pushEvent(Leaf, `Camera ${room.id} — Check-out: stand-by intelligente`, "ok");
        tellStory([
          [0, `Check-out della ${room.id}: la camera entra in stand-by e i consumi scendono quasi a zero.`],
        ]);
      } else {
        setRoomState(room.id, "occupied", 22);
        pushEvent(KeyRound, `Camera ${room.id} — Check-in manuale dalla regia`, "ok");
        tellStory([
          [0, `Check-in sulla ${room.id}: clima e luci si attivano da soli, prima che l'ospite salga.`],
        ]);
      }
    },
    [pushEvent, setRoomState, tellStory],
  );

  const occupied = rooms.filter((r) => r.state === "occupied").length;
  const power = (42 + occupied * 1.8).toFixed(0);

  return (
    <section
      ref={sectionRef}
      id="demo"
      className="relative scroll-mt-[120px] overflow-hidden bg-[#040810]"
    >
      <div className="tech-grid-dark absolute inset-0 opacity-50" aria-hidden />
      <div
        className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(176, 90, 51,0.10),transparent)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-5 py-[60px] sm:px-8">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-bright">
            <span className="h-px w-6 bg-brand-bright" />
            La regia, live
          </span>
          <h2 className="mt-6 text-balance font-display text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl">
            Tutto questo, in{" "}
            <span className="text-brand-bright">un&apos;unica schermata.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/60">
            La schermata che il tuo staff guarda ogni giorno.{" "}
            <span className="font-semibold text-white/85">
              Provala: clicca una camera o lancia uno scenario.
            </span>
          </p>
        </div>

        {/* Console */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-[#081020]/90 shadow-[0_40px_120px_-30px_rgba(176, 90, 51,0.25)] backdrop-blur">
          {/* Title bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-3.5 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="size-2.5 rounded-full bg-brand-bright/70" />
              </span>
              <p className="text-[13px] font-semibold tracking-wide text-white/80">
                QuickConnext OS
                <span className="ml-2 hidden text-white/40 sm:inline">
                  · Hotel Belvedere ····
                </span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden items-center gap-2 text-[12px] font-medium text-brand-bright sm:flex">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full live-ring rounded-full bg-brand-bright" />
                  <span className="relative inline-flex size-2 rounded-full bg-brand-bright" />
                </span>
                Tutti i sistemi operativi
              </span>
              <span className="font-mono text-[13px] tabular-nums text-white/60">
                {clock}
              </span>
            </div>
          </div>

          <div className="grid gap-px bg-white/[0.06] lg:grid-cols-[1.25fr_0.75fr]">
            {/* Room grid */}
            <div className={cn("bg-[#081020] p-5 transition-opacity duration-700 sm:p-6", nightDim && "opacity-70")}>
              <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/45">
                  Camere — Piani 1–3
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-white/45">
                  <Legend dot="bg-brand-bright">Occupata</Legend>
                  <Legend dot="bg-white/25">Libera</Legend>
                  <Legend dot="bg-emerald-400">Eco</Legend>
                  <Legend dot="bg-amber-400">Anomalia</Legend>
                </div>
              </div>
              <p className="mb-3.5 text-[11.5px] text-white/35">
                Ogni riquadro è una camera, col suo stato e la sua temperatura.{" "}
                <span className="text-white/55">Cliccane una</span> per fare
                check-in o check-out.
              </p>
              <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-6">
                {rooms.map((room) => (
                  <button
                    key={room.id}
                    onClick={() => toggleRoom(room)}
                    title={STATE_LABEL[room.state]}
                    className={cn(
                      "group relative flex aspect-[5/4] flex-col justify-between rounded-xl border p-2.5 text-left transition-all duration-300 hover:scale-[1.04] hover:border-brand-bright/70",
                      ROOM_STYLE[room.state],
                      pulseRoom === room.id &&
                        "ring-2 ring-brand-bright ring-offset-2 ring-offset-[#081020]",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[12px] font-semibold tabular-nums">
                        {room.id}
                      </span>
                      <span className={cn("size-1.5 rounded-full", ROOM_DOT[room.state])} />
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <BedDouble className="size-3.5 opacity-60" />
                      <span className="font-mono tabular-nums opacity-80">
                        {room.temp}°
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Scenario buttons */}
              <div className="mt-6">
                <p className="mb-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/45">
                  Prova uno scenario
                </p>
                <div className="flex flex-col gap-2.5 sm:flex-row">
                  <ScenarioButton
                    onClick={simulateCheckIn}
                    icon={KeyRound}
                    title="Arriva un ospite"
                    sub="La camera si prepara da sola al check-in"
                  />
                  <ScenarioButton
                    onClick={simulateNight}
                    icon={Moon}
                    title="Scende la notte"
                    sub="Le aree vuote riducono i consumi"
                  />
                  <ScenarioButton
                    onClick={simulateAlert}
                    icon={TriangleAlert}
                    title="Guasto in arrivo"
                    sub="Lo vediamo prima che lo veda l'ospite"
                  />
                </div>
              </div>
            </div>

            {/* Right: KPIs + live feed */}
            <div className="flex flex-col bg-[#081020]">
              <div className="grid grid-cols-3 gap-px bg-white/[0.06]">
                <Kpi label="Potenza" value={`${power} kW`} icon={Zap} />
                <Kpi label="Occupate" value={`${occupied}/18`} icon={BedDouble} />
                <Kpi label="Risparmio oggi" value={`${savings.toFixed(0)} €`} icon={Leaf} />
              </div>
              <div className="flex-1 border-t border-white/10 p-5 sm:p-6">
                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/45">
                  Eventi in tempo reale
                </p>
                <p className="mb-3 mt-1 text-[11.5px] text-white/35">
                  È quello che vede il tuo staff: l&apos;hotel si racconta da solo,
                  nessuno insegue gli impianti.
                </p>
                <ul className="space-y-2">
                  <AnimatePresence initial={false}>
                    {events.map((e) => (
                      <motion.li
                        key={e.key}
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2.5">
                          <span
                            className={cn(
                              "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg",
                              e.tone === "warn"
                                ? "bg-amber-400/15 text-amber-300"
                                : e.tone === "ok"
                                  ? "bg-brand-bright/15 text-brand-bright"
                                  : "bg-white/[0.06] text-white/60",
                            )}
                          >
                            <e.icon className="size-3.5" />
                          </span>
                          <div className="min-w-0">
                            <p className="text-[13px] leading-snug text-white/85">
                              {e.text}
                            </p>
                            <p className="mt-0.5 font-mono text-[11px] tabular-nums text-white/35">
                              {e.time}
                            </p>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              </div>
            </div>
          </div>

          {story && (
            <div className="flex items-center gap-3 border-t border-white/10 bg-[#0A1626] px-5 py-3.5 sm:px-6">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-bright/20 text-brand-bright transition-colors duration-300">
                <Sparkles className="size-4" />
              </span>
              <AnimatePresence mode="wait">
                <motion.p
                  key={story}
                  initial={{ opacity: 0, y: 7 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -7 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="text-[13px] font-medium leading-snug text-white/90 sm:text-sm"
                >
                  {story}
                </motion.p>
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Legend({ dot, children }: { dot: string; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={cn("size-1.5 rounded-full", dot)} />
      {children}
    </span>
  );
}

function ScenarioButton({
  onClick,
  icon: Icon,
  title,
  sub,
}: {
  onClick: () => void;
  icon: LucideIcon;
  title: string;
  sub: string;
}) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-1 items-start gap-3 rounded-2xl border border-brand-bright/25 bg-brand-bright/[0.07] px-4 py-3 text-left transition-all duration-200 hover:border-brand-bright/50 hover:bg-brand-bright/15 active:scale-[0.98]"
    >
      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-bright/15 text-brand-bright transition-transform duration-200 group-hover:scale-110">
        <Icon className="size-4" />
      </span>
      <span>
        <span className="block text-[13px] font-bold text-brand-bright">{title}</span>
        <span className="mt-0.5 block text-[11.5px] leading-snug text-white/55">{sub}</span>
      </span>
    </button>
  );
}

function Kpi({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
}) {
  return (
    <div className="bg-[#081020] px-4 py-4">
      <div className="flex items-center gap-1.5 text-white/40">
        <Icon className="size-3" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em]">
          {label}
        </span>
      </div>
      <motion.p
        key={value}
        initial={{ opacity: 0.4 }}
        animate={{ opacity: 1 }}
        className="mt-1.5 font-mono text-lg font-semibold tabular-nums text-white"
      >
        {value}
      </motion.p>
    </div>
  );
}
