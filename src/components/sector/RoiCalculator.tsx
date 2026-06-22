"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { animate, motion, useInView } from "framer-motion";
import { ArrowRight, BadgeEuro, Leaf, TrendingUp, Wrench } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

function formatEuro(n: number) {
  return new Intl.NumberFormat("it-IT", { maximumFractionDigits: 0 }).format(n);
}

/* Smoothly animates towards a changing numeric target. */
function AnimatedEuro({ value, className }: { value: number; className?: string }) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);
  useEffect(() => {
    const controls = animate(prev.current, value, {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    });
    prev.current = value;
    return () => controls.stop();
  }, [value]);
  return <span className={className}>{formatEuro(Math.round(display))}</span>;
}

function SliderRow({
  label,
  valueLabel,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  valueLabel: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="mb-2.5 flex items-baseline justify-between gap-4">
        <label className="text-[15px] font-medium text-foreground">{label}</label>
        <span className="font-mono text-[15px] font-semibold tabular-nums text-brand">
          {valueLabel}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-border outline-offset-4"
        style={{ accentColor: "var(--brand-teal)" }}
        aria-label={label}
      />
    </div>
  );
}

export function RoiCalculator() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [rooms, setRooms] = useState(60);
  const [occupancy, setOccupancy] = useState(70);
  const [bill, setBill] = useState(7200);
  const billTouched = useRef(false);

  /* Until the user touches the bill slider, estimate it from rooms+occupancy. */
  const handleRooms = (v: number) => {
    setRooms(v);
    if (!billTouched.current) setBill(Math.round((v * 120 * (occupancy / 70)) / 100) * 100);
  };
  const handleOccupancy = (v: number) => {
    setOccupancy(v);
    if (!billTouched.current) setBill(Math.round((rooms * 120 * (v / 70)) / 100) * 100);
  };
  const handleBill = (v: number) => {
    billTouched.current = true;
    setBill(v);
  };

  const yearly = bill * 12;
  const savingLow = yearly * 0.25;
  const savingHigh = yearly * 0.4;
  const savingMid = yearly * 0.32;

  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-[60px] sm:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            <span className="h-px w-6 bg-brand" />
            Quanto vale per te
          </span>
          <h2 className="mt-6 text-balance font-display text-3xl font-extrabold leading-[1.1] text-foreground sm:text-4xl">
            Calcola il risparmio del tuo hotel.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Tre dati e ti diamo una stima concreta, basata sui risultati reali
            dei progetti QuickConnext (−25/40% sui costi energetici).
          </p>
        </div>

        <div
          ref={ref}
          className="mt-12 grid overflow-hidden rounded-3xl border border-border bg-background shadow-card lg:grid-cols-[1fr_0.9fr]"
        >
          {/* Inputs */}
          <div className="space-y-9 p-7 sm:p-10">
            <SliderRow
              label="Numero di camere"
              valueLabel={`${rooms}`}
              min={10}
              max={250}
              step={5}
              value={rooms}
              onChange={handleRooms}
            />
            <SliderRow
              label="Occupazione media annua"
              valueLabel={`${occupancy}%`}
              min={40}
              max={95}
              step={5}
              value={occupancy}
              onChange={handleOccupancy}
            />
            <SliderRow
              label="Spesa energetica mensile"
              valueLabel={`${formatEuro(bill)} €`}
              min={1000}
              max={60000}
              step={500}
              value={bill}
              onChange={handleBill}
            />
            <p className="text-[13px] leading-relaxed text-muted-foreground/80">
              Stima indicativa su dati medi di settore. L&apos;analisi puntuale
              sulla tua struttura è gratuita e senza impegno.
            </p>
          </div>

          {/* Results */}
          <div className="relative overflow-hidden bg-navy p-7 text-white sm:p-10">
            <div
              className="absolute inset-0 bg-[radial-gradient(70%_60%_at_80%_0%,rgba(0,126,120,0.16),transparent)]"
              aria-hidden
            />
            <div className="relative">
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/50">
                Risparmio energetico stimato
              </p>
              <p className="mt-3 font-display text-5xl font-extrabold tracking-tight text-brand-bright sm:text-6xl">
                {inView ? <AnimatedEuro value={savingMid} /> : "—"}
                <span className="ml-2 text-xl font-bold text-white/55">€/anno</span>
              </p>
              <p className="mt-2 font-mono text-[13px] tabular-nums text-white/45">
                range prudente–ottimistico:{" "}
                {inView ? (
                  <>
                    <AnimatedEuro value={savingLow} /> – <AnimatedEuro value={savingHigh} /> €
                  </>
                ) : (
                  "—"
                )}
              </p>

              <div className="mt-8 space-y-3.5 border-t border-white/10 pt-7">
                <ResultRow icon={Wrench} text="−45% interventi urgenti e fermi impianto" />
                <ResultRow icon={TrendingUp} text="Fino a +2 classi energetiche APE, +15% valore immobile" />
                <ResultRow icon={BadgeEuro} text="Con il modello ESCo: 0€ di investimento iniziale" />
                <ResultRow icon={Leaf} text="Agevolazioni gestite da noi: 95% di pratiche approvate" />
              </div>

              <div className="mt-9">
                <ButtonLink href="/contatti" size="lg" className="w-full justify-center sm:w-auto">
                  Ricevi l&apos;analisi gratuita <ArrowRight className="size-4" />
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultRow({ icon: Icon, text }: { icon: typeof Wrench; text: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-start gap-3"
    >
      <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-brand-bright/15 text-brand-bright">
        <Icon className="size-3.5" />
      </span>
      <p className="text-[15px] leading-relaxed text-white/80">{text}</p>
    </motion.div>
  );
}
