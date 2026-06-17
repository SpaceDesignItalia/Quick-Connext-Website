"use client";

import Image from "next/image";
import {
  createElement,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  animate,
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  type Variants,
} from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Check, Minus, Sparkles, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LiveArchitecture } from "@/components/LiveArchitecture";
import { SystemSchema } from "@/components/SystemSchema";
import { RoomExplorer } from "@/components/RoomExplorer";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { HotelCommandCenter } from "./HotelCommandCenter";
import { RoiCalculator } from "./RoiCalculator";
import type {
  RoomExplorerSection,
  SceneCard,
  SectorConfig,
  StatPause,
  SystemSchemaSection,
} from "./types";

/* Animated numeric value: "−45%" counts up from 0 when scrolled into view. */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const match = value.match(/^([+\-−]?)(\d+)(.*)$/);
  const [display, setDisplay] = useState(() =>
    match ? `${match[1]}0${match[3]}` : value,
  );

  useEffect(() => {
    if (!isInView || !match) return;
    const controls = animate(0, parseInt(match[2], 10), {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(`${match[1]}${Math.round(v)}${match[3]}`),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

/* Sticky chapter nav with scrollspy + reading progress bar. */
interface SceneNavItem {
  id: string;
  label: string;
  live?: boolean;
}

function SceneNav({ items }: { items: SceneNavItem[] }) {
  const [active, setActive] = useState(-1);
  const chipRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const line = window.innerHeight * 0.4;
        let current = -1;
        items.forEach((item, i) => {
          const el = document.getElementById(item.id);
          if (el && el.getBoundingClientRect().top <= line) current = i;
        });
        setActive(current);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [items]);

  useEffect(() => {
    if (active < 0) return;
    const el = chipRefs.current[active];
    const nav = el?.parentElement;
    if (!el || !nav) return;
    // Center the chip by scrolling only the nav container — never the window.
    nav.scrollTo({
      left: el.offsetLeft - (nav.clientWidth - el.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, [active]);

  return (
    <div className="sticky top-[68px] z-40 border-b border-border bg-white/85 backdrop-blur-xl">
      <nav
        aria-label="Sezioni della pagina"
        className="no-scrollbar mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-5 sm:px-8"
      >
        {items.map((item, i) => (
          <button
            key={item.id}
            ref={(el) => {
              chipRefs.current[i] = el;
            }}
            onClick={() =>
              document
                .getElementById(item.id)
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className={cn(
              "relative flex shrink-0 items-center gap-1.5 whitespace-nowrap px-3.5 py-3.5 text-[13px] font-medium transition-colors",
              active === i
                ? "text-brand"
                : item.live
                  ? "text-foreground hover:text-brand"
                  : "text-muted-foreground hover:text-foreground",
            )}
          >
            {item.live && (
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-bright opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-brand-bright" />
              </span>
            )}
            {item.label}
            {active === i && (
              <motion.span
                layoutId="sceneNavIndicator"
                className="absolute inset-x-3 bottom-0 h-[2px] rounded-full bg-brand"
                transition={{ type: "spring", stiffness: 420, damping: 36 }}
              />
            )}
          </button>
        ))}
      </nav>
      <motion.div
        aria-hidden
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-brand/60 to-brand-bright/60"
        style={{ scaleX: scrollYProgress, opacity: 0.35 }}
      />
    </div>
  );
}

const SECTION_PY = "py-[60px]";

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const motionTags = {
  div: motion.div,
  span: motion.span,
  li: motion.li,
  section: motion.section,
} as const;

function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: keyof typeof motionTags;
}) {
  const MotionTag = motionTags[as];
  return (
    <MotionTag
      className={className}
      variants={revealVariants}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </MotionTag>
  );
}

function SectionLabel({
  children,
  className,
  tone = "light",
}: {
  children: React.ReactNode;
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

function NotificationCard({
  icon: Icon,
  title,
  detail,
  status,
  tone = "light",
  delay = 0,
  className,
}: {
  icon: LucideIcon;
  title: string;
  detail: string;
  status?: string;
  tone?: "light" | "dark";
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "pointer-events-none flex w-max max-w-[16rem] items-start gap-3 rounded-2xl p-3 pr-4",
        tone === "light" ? "glass-card" : "glass-card-dark",
        className,
      )}
    >
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-xl",
          tone === "light" ? "bg-brand/10 text-brand" : "bg-brand-bright/15 text-brand-bright",
        )}
      >
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-bright opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-brand-bright" />
          </span>
          <p
            className={cn(
              "truncate text-[13px] font-semibold",
              tone === "light" ? "text-foreground" : "text-navy-foreground",
            )}
          >
            {title}
          </p>
        </div>
        <p
          className={cn(
            "mt-0.5 text-xs leading-snug",
            tone === "light" ? "text-muted-foreground" : "text-navy-muted",
          )}
        >
          {detail}
        </p>
        {status && (
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-brand-bright">
            {status}
          </p>
        )}
      </div>
    </motion.div>
  );
}

function SceneImage({
  src,
  beforeSrc,
  alt,
  cards = [],
  before = [],
  className,
  imageClassName,
  priority = false,
  rounded = "rounded-3xl",
  scrollDelay = 0,
  size = "default",
}: {
  src: string;
  beforeSrc?: string;
  alt: string;
  cards?: Array<SceneCard & { delay?: number; float?: boolean }>;
  before?: string[];
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  rounded?: string;
  scrollDelay?: number;
  size?: "default" | "dominant";
}) {
  const liveCards =
    cards.length > 0 ? (
      <>
        {cards.map((card, i) => {
          const { position, float = true, ...cardProps } = card;
          return (
            <motion.div
              key={i}
              className={cn("absolute hidden sm:block", position)}
              animate={float ? { y: [0, -8, 0] } : undefined}
              transition={
                float
                  ? { duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }
                  : undefined
              }
            >
              <NotificationCard {...cardProps} delay={cardProps.delay ?? i * 0.15} />
            </motion.div>
          );
        })}
      </>
    ) : undefined;

  return (
    <div className={cn("relative", size === "dominant" && "h-full min-h-[55vh] lg:min-h-[78vh]", className)}>
      <BeforeAfterSlider
        src={src}
        beforeSrc={beforeSrc}
        alt={alt}
        priority={priority}
        rounded={rounded}
        imageClassName={imageClassName}
        scrollDelay={scrollDelay}
        size={size}
        beforeBadges={before}
        afterOverlay={liveCards}
      />
    </div>
  );
}

/* Living scene clip — a looping, muted micro-animation that replaces the
   before/after slider when a scene provides a `video`. The source photo is the
   poster, so it degrades to the exact still if the clip can't play. */
function SceneVideo({
  src,
  poster,
  alt,
  cards = [],
  className,
  rounded = "rounded-3xl",
  size = "default",
}: {
  src: string;
  poster: string;
  alt: string;
  cards?: Array<SceneCard & { delay?: number; float?: boolean }>;
  className?: string;
  rounded?: string;
  size?: "default" | "dominant";
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const inViewRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(inViewRef, { margin: "-10%" });

  // Save the visitor's battery/CPU: only run the clip while it's on screen.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isInView) {
      const p = v.play();
      if (p) p.catch(() => {});
    } else {
      v.pause();
    }
  }, [isInView]);

  return (
    <div ref={inViewRef} className={cn("relative", size === "dominant" && "h-full", className)}>
      <div
        className={cn(
          "relative overflow-hidden bg-navy",
          rounded,
          size === "dominant" ? "min-h-[55vh] lg:min-h-[78vh]" : "aspect-[16/11]",
        )}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          aria-label={alt}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <span className="pointer-events-none absolute right-4 top-4 z-[1] flex items-center gap-1.5 rounded-full bg-navy/55 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-bright backdrop-blur-sm">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-bright opacity-70" />
            <span className="relative inline-flex size-1.5 rounded-full bg-brand-bright" />
          </span>
          Con QuickConnext
        </span>
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-navy/30 via-transparent to-transparent" />
      </div>

      {cards.length > 0 && (
        <div className="pointer-events-none absolute inset-0 z-10">
          {cards.map((card, i) => {
            const { position, float = true, ...cardProps } = card;
            return (
              <motion.div
                key={i}
                className={cn("absolute hidden sm:block", position)}
                animate={float ? { y: [0, -8, 0] } : undefined}
                transition={
                  float
                    ? { duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }
                    : undefined
                }
              >
                <NotificationCard {...cardProps} delay={cardProps.delay ?? i * 0.15} />
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function StatPauseBand({
  value,
  label,
  explanation,
}: Pick<StatPause, "value" | "label" | "explanation">) {
  return (
    <section className="relative overflow-hidden bg-[#040810]">
      <div className="tech-grid-dark absolute inset-0 opacity-60" aria-hidden />
      <div
        className="absolute inset-0 bg-[radial-gradient(55%_70%_at_50%_50%,rgba(0,196,204,0.10),transparent)]"
        aria-hidden
      />
      <div className={cn("relative mx-auto max-w-7xl px-5 text-center sm:px-8", SECTION_PY)}>
        <Reveal>
          <p className="font-display text-[120px] font-black leading-[0.85] tracking-tighter text-brand-bright sm:text-[140px] lg:text-[168px]">
            <CountUp value={value} />
          </p>
          <p className="mt-5 text-lg font-semibold uppercase tracking-[0.22em] text-white/75 sm:text-xl">
            {label}
          </p>
          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-white/45 sm:text-lg">
            {explanation}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* KNX system-topology band — the real connection schema, made alive. The navy
   diagram panel stays contained on a light section (navy used sparingly). */
function SystemSchemaBand({ schema }: { schema: SystemSchemaSection }) {
  return (
    <section className="bg-surface">
      <div className={cn("mx-auto max-w-5xl px-5 sm:px-8", SECTION_PY)}>
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel className="justify-center">{schema.label}</SectionLabel>
          <h2 className="mt-6 text-balance font-display text-3xl font-extrabold leading-[1.1] text-foreground sm:text-4xl">
            {schema.title}
          </h2>
          {schema.subtitle && (
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{schema.subtitle}</p>
          )}
        </Reveal>
        <Reveal delay={1} className="mt-10">
          <SystemSchema />
        </Reveal>
      </div>
    </section>
  );
}

/* Interactive "explore the room" band — a clean photo with cinematic zoom and
   code-rendered text callouts (no baked-in labels). Navy stage on light bg. */
function RoomExplorerBand({ section }: { section: RoomExplorerSection }) {
  return (
    <section className="bg-surface">
      <div className={cn("mx-auto max-w-5xl px-5 sm:px-8", SECTION_PY)}>
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel className="justify-center">{section.label}</SectionLabel>
          <h2 className="mt-6 text-balance font-display text-3xl font-extrabold leading-[1.1] text-foreground sm:text-4xl">
            {section.title}
          </h2>
          {section.subtitle && (
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{section.subtitle}</p>
          )}
        </Reveal>
        <Reveal delay={1} className="mt-10">
          <RoomExplorer image={section.image} />
        </Reveal>
      </div>
    </section>
  );
}

function StatGrid({
  stats,
  tone = "light",
  columns,
  disableHover = false,
}: {
  stats: Array<{ value: string; label: string }>;
  tone?: "light" | "dark";
  columns?: string;
  disableHover?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid gap-px overflow-hidden rounded-3xl",
        tone === "light" ? "bg-border" : "bg-white/10",
        columns ?? "grid-cols-2 lg:grid-cols-4",
      )}
    >
      {stats.map((s, i) => (
        <Reveal
          key={s.label}
          delay={i}
          className={cn(
            "flex flex-col gap-2 p-6 sm:p-8",
            !disableHover && "group transition-colors",
            tone === "light"
              ? disableHover ? "bg-background" : "bg-background hover:bg-surface"
              : disableHover ? "bg-navy" : "bg-navy hover:bg-[#0E1F3A]",
          )}
        >
          <CountUp
            value={s.value}
            className={cn(
              "font-display text-3xl font-extrabold tracking-tight sm:text-4xl",
              !disableHover && "origin-left transition-transform duration-300 group-hover:scale-[1.04]",
              tone === "light" ? "text-brand" : "text-brand-bright",
            )}
          />
          <span
            className={cn(
              "text-sm leading-snug",
              tone === "light" ? "text-muted-foreground" : "text-navy-muted",
            )}
          >
            {s.label}
          </span>
        </Reveal>
      ))}
    </div>
  );
}

function HeroDemoCard({
  title,
  detail,
  status,
}: {
  title: string;
  detail: string;
  status?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card min-w-[200px] max-w-[340px] rounded-2xl border-2 border-brand/30 p-5 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.5),0_0_0_1px_rgba(0,196,204,0.15)] sm:min-w-[280px] sm:p-6"
    >
      <div className="flex items-start gap-2.5">
        <span className="relative mt-1 flex size-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-bright opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-brand-bright" />
        </span>
        <p className="text-[13px] font-bold leading-snug text-foreground sm:text-sm">{title}</p>
      </div>
      <p className="mt-2.5 text-[13px] leading-relaxed text-muted-foreground sm:text-sm">{detail}</p>
      {status && (
        <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">
          {status}
        </p>
      )}
    </motion.div>
  );
}

/* Rotating feed of real platform events — the hero shows the product working. */
function HeroLiveCard({
  events,
  demoAnchor = false,
}: {
  events: { title: string; detail: string }[];
  demoAnchor?: boolean;
}) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % events.length), 3400);
    return () => clearInterval(t);
  }, [events.length]);
  const e = events[idx];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card w-[340px] max-w-[86vw] rounded-2xl border-2 border-brand/30 p-5 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.5),0_0_0_1px_rgba(0,196,204,0.15)]"
    >
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-brand">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-bright opacity-60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-brand-bright" />
          </span>
          QuickConnext OS · live
        </span>
        <span className="flex gap-1">
          {events.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1 rounded-full transition-all duration-300",
                i === idx ? "w-4 bg-brand" : "w-1 bg-brand/25",
              )}
            />
          ))}
        </span>
      </div>
      <div className="mt-3 min-h-[3.4rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[13px] font-bold leading-snug text-foreground sm:text-sm">
              {e.title}
            </p>
            <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
              {e.detail}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
      {demoAnchor && (
        <a
          href="#demo"
          className="mt-3 inline-flex items-center gap-1.5 border-t border-border pt-3 text-[12px] font-semibold text-brand transition-colors hover:text-brand-teal-dark w-full"
        >
          Guarda la regia completa, live
          <ArrowRight className="size-3.5" />
        </a>
      )}
    </motion.div>
  );
}

function CinematicHero({ config }: { config: SectorConfig }) {
  return (
    <section className="relative min-h-[88vh] overflow-hidden sm:min-h-[92vh]">
      {/* the hotel "switches itself on": grayscale → colour, like the product promise */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.12, filter: "grayscale(1) brightness(0.55)" }}
        animate={{ scale: 1, filter: "grayscale(0) brightness(1)" }}
        transition={{ duration: 2.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ scale: [1, 1.07] }}
          transition={{
            duration: 26,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "linear",
            delay: 2.4,
          }}
        >
          <Image
            src={config.heroImage}
            alt={config.heroTitle}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </motion.div>
      </motion.div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.35) 55%, rgba(4,8,16,0.88) 100%)",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(70%_50%_at_30%_35%,rgba(0,196,204,0.10),transparent)]" />

      <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col px-5 pb-10 pt-36 sm:min-h-[92vh] sm:px-8 sm:pb-14 sm:pt-44">
        <div className="max-w-4xl">
          <Reveal>
            <SectionLabel tone="dark" className="text-white/80 [&>span]:bg-white/50">
              {config.heroLabel}
            </SectionLabel>
            <h1 className="mt-6 text-left font-display text-[clamp(3rem,12vw,4.5rem)] font-black leading-[0.95] tracking-tight text-white sm:text-[5.5rem] lg:text-[6.5rem]">
              {config.heroTitle}
              {config.heroAccent && (
                <span className="text-brand-bright">{config.heroAccent}</span>
              )}
            </h1>
            <p className="mt-6 max-w-xl text-left text-pretty text-lg leading-relaxed text-white/75">
              {config.heroSubtitle}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contatti" size="lg">
                Richiedi una demo <ArrowRight className="size-4" />
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        {(config.heroLiveEvents?.length || config.heroDemoCard) && (
          <motion.div
            className="mt-auto pt-10 sm:absolute sm:bottom-10 sm:left-8 sm:pt-0 lg:bottom-14 lg:left-8"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            {config.heroLiveEvents?.length ? (
              <HeroLiveCard
                events={config.heroLiveEvents}
                demoAnchor={!!config.interactive?.commandCenter}
              />
            ) : (
              config.heroDemoCard && (
                <HeroDemoCard
                  title={config.heroDemoCard.title}
                  detail={config.heroDemoCard.detail}
                  status={config.heroDemoCard.status}
                />
              )
            )}
          </motion.div>
        )}

        {/* KPI strip — bottom right */}
        {config.heroKpis && config.heroKpis.length > 0 && (
          <div className="absolute bottom-10 right-8 hidden lg:flex lg:divide-x lg:divide-white/15">
            {config.heroKpis.map((kpi, i) => (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.7 + i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="px-7 first:pl-0 last:pr-0"
              >
                <p className="font-display text-3xl font-extrabold tracking-tight text-brand-bright">
                  {kpi.value}
                </p>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white/55">
                  {kpi.label}
                </p>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

function GridSection({ grid }: { grid: NonNullable<SectorConfig["grid"]> }) {
  return (
    <section className={cn("mx-auto max-w-7xl px-5 sm:px-8", SECTION_PY)}>
      <Reveal className="max-w-2xl">
        {grid.label && <SectionLabel>{grid.label}</SectionLabel>}
        <h2 className="mt-6 font-display text-3xl font-extrabold leading-[1.1] text-foreground sm:text-4xl">
          {grid.title}
        </h2>
        {grid.subtitle && (
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{grid.subtitle}</p>
        )}
      </Reveal>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {grid.features.map((f, i) => (
          <Reveal key={f.title} delay={i}>
            <div className="group h-full rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-card">
              <span className="flex size-11 items-center justify-center rounded-xl bg-brand/10 text-brand transition-transform duration-300 group-hover:scale-110">
                {createElement(f.icon, { className: "size-5" })}
              </span>
              <h3 className="mt-4 text-base font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* Contained 3D-render showcase — the building "opened up", every system in
   view at once. The render sits in a light viewer frame (no edge crop). */
function BuildingShowcase({
  showcase,
}: {
  showcase: NonNullable<SectorConfig["buildingShowcase"]>;
}) {
  return (
    <section className="bg-surface">
      <div className={cn("mx-auto max-w-7xl px-5 sm:px-8", SECTION_PY)}>
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <SectionLabel>{showcase.label}</SectionLabel>
            <h2 className="mt-6 text-balance font-display text-3xl font-extrabold leading-[1.1] text-foreground sm:text-4xl">
              {showcase.title}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{showcase.text}</p>
            {showcase.highlights && showcase.highlights.length > 0 && (
              <ul className="mt-7 flex flex-wrap gap-3">
                {showcase.highlights.map((h) => (
                  <li
                    key={h.label}
                    className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-[13px] font-semibold text-foreground"
                  >
                    {createElement(h.icon, { className: "size-4 text-brand" })}
                    {h.label}
                  </li>
                ))}
              </ul>
            )}
          </Reveal>

          <Reveal delay={1}>
            <div className="relative overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-black/5">
              {/* viewer toolbar */}
              <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-2.5">
                <span className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-black/10" />
                  <span className="size-2.5 rounded-full bg-black/10" />
                  <span className="size-2.5 rounded-full bg-brand/60" />
                </span>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Edificio connesso
                </span>
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-bright opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-brand-bright" />
                </span>
              </div>
              <div className="tech-grid relative aspect-[4/3] overflow-hidden bg-white">
                <Image
                  src={showcase.image}
                  alt={showcase.title}
                  fill
                  className="object-contain p-3 sm:p-5"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
              </div>
            </div>
            {showcase.caption && (
              <p className="mt-4 text-center text-sm text-muted-foreground">{showcase.caption}</p>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CtaBand({
  label = "Prenota una demo",
  title,
  subtitle,
  image = "/images/cta-night.png",
}: {
  label?: string;
  title: string;
  subtitle: string;
  image?: string;
}) {
  return (
    <section className="relative min-h-[420px] overflow-hidden">
      <Image src={image} alt="" aria-hidden fill className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-navy/85" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(0,196,204,0.08),transparent)]" />
      <div className="relative mx-auto max-w-3xl px-5 py-24 text-center sm:px-8 sm:py-28">
        <Reveal>
          <SectionLabel tone="dark" className="justify-center">
            {label}
          </SectionLabel>
          <h2 className="mt-6 text-balance font-display text-4xl font-extrabold leading-[1.05] text-navy-foreground sm:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-navy-muted">
            {subtitle}
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contatti" size="lg">
              Richiedi una demo gratuita <ArrowRight className="size-4" />
            </ButtonLink>
            <ButtonLink
              href="/contatti"
              size="lg"
              variant="outline"
              className="border-white/25 bg-transparent text-navy-foreground hover:bg-white/10 hover:text-navy-foreground"
            >
              Parla con un esperto
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function SectorPage({ config }: { config: SectorConfig }) {
  const navItems: SceneNavItem[] = [
    ...config.scenes.map((s, i) => ({ id: `scene-${i}`, label: s.label })),
    ...(config.interactive?.commandCenter
      ? [{ id: "demo", label: "La regia, live", live: true }]
      : []),
  ];
  const statsHeading = config.statsSection ?? {
    label: "Risultati misurabili",
    title: "L'impatto, in numeri.",
  };
  const comparisonHeading = config.comparisonSection ?? {
    label: "Il confronto",
    title: "QuickConnext vs system integrator tradizionale",
  };
  const assistanceHeading = config.assistanceSection ?? {
    label: "Assistenza",
    title: "Non sei mai solo.",
    subtitle:
      "Un partner unico per progetto, installazione e supporto. Plug & play, senza fermare la tua attività.",
  };
  const gridBeforeScenes = config.grid && config.gridPosition === "before";
  const assistStats = config.assistance.filter((a) => a.stat);
  const assistRest = config.assistance.filter((a) => !a.stat);

  return (
    <main className="bg-background">
      {/* Hero */}
      {config.heroVariant === "cinematic" ? (
        <CinematicHero config={config} />
      ) : (
        <section className="relative min-h-[520px] overflow-hidden sm:min-h-[600px]">
          <Image
            src={config.heroImage}
            alt={config.heroTitle}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/92 via-navy/70 to-navy/30" />
          <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-36 sm:px-8 sm:pb-28 sm:pt-44">
            <div className="max-w-2xl">
              <Reveal>
                <SectionLabel tone="dark">{config.heroLabel}</SectionLabel>
                <h1 className="mt-6 text-balance font-display text-[2.6rem] font-extrabold leading-[1.02] tracking-tight text-navy-foreground sm:text-6xl">
                  {config.heroTitle}
                  {config.heroAccent && <span className="text-brand-bright">{config.heroAccent}</span>}
                </h1>
                <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-navy-muted">
                  {config.heroSubtitle}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href="/contatti" size="lg">
                    Richiedi una demo <ArrowRight className="size-4" />
                  </ButtonLink>
                </div>
              </Reveal>
            </div>
            {config.heroCards.length > 0 && (
              <div className="pointer-events-none mt-12 hidden flex-wrap gap-4 lg:flex">
                {config.heroCards.map((c, i) => (
                  <Reveal key={i} delay={i + 1}>
                    <div className="glass-card-dark flex w-max items-center gap-3 rounded-2xl px-4 py-3">
                      <span className="flex size-9 items-center justify-center rounded-xl bg-brand-bright/15 text-brand-bright">
                        {createElement(c.icon, { className: "size-4" })}
                      </span>
                      <div>
                        <p className="text-[13px] font-semibold text-navy-foreground">{c.title}</p>
                        <p className="text-xs text-navy-muted">{c.detail}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Sticky chapter navigation */}
      {!config.hideSceneNav && navItems.length > 1 && <SceneNav items={navItems} />}

      {/* Intro */}
      {!config.hideIntro && (
        <section className={cn("mx-auto max-w-3xl px-5 text-center sm:px-8", SECTION_PY)}>
          <Reveal>
            <SectionLabel className="justify-center">{config.introLabel}</SectionLabel>
            <h2 className="mt-6 text-balance font-display text-3xl font-extrabold leading-[1.1] text-foreground sm:text-4xl">
              {config.introTitle}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{config.introText}</p>
          </Reveal>
        </section>
      )}

      {config.marketStats && config.marketStats.length > 0 && (
        <section className="bg-surface">
          <div className={cn("mx-auto max-w-7xl px-5 sm:px-8", SECTION_PY)}>
            <StatGrid
              stats={config.marketStats}
              columns="grid-cols-1 sm:grid-cols-3"
              disableHover
            />
            {config.marketStatsSource && (
              <p className="mt-6 text-center text-sm text-muted-foreground">{config.marketStatsSource}</p>
            )}
          </div>
        </section>
      )}

      {config.buildingShowcase && <BuildingShowcase showcase={config.buildingShowcase} />}

      {gridBeforeScenes && config.grid && <GridSection grid={config.grid} />}

      {/* Scene features */}
      {config.scenes.map((scene, i) => {
        const reverse = i % 2 === 1;
        const shaded = i % 2 === 1;
        const isDominant = scene.layout === "dominant";
        const showStatPause = config.statPause?.afterSceneIndex === i;

        return (
          <div key={scene.title}>
            <section
              id={`scene-${i}`}
              className={cn(
                "scroll-mt-[120px]",
                shaded && "bg-surface",
                isDominant && "min-h-screen",
              )}
            >
              <div
                className={cn(
                  "mx-auto max-w-7xl px-5 sm:px-8",
                  SECTION_PY,
                  isDominant && "flex min-h-screen flex-col justify-center",
                )}
              >
                <div
                  className={cn(
                    "grid items-center gap-12",
                    isDominant
                      ? "lg:grid-cols-[0.85fr_1.15fr] lg:gap-16"
                      : "lg:grid-cols-2",
                  )}
                >
                  <Reveal className={cn(reverse && "lg:order-2", isDominant && "lg:py-8")}>
                    <SectionLabel>{scene.label}</SectionLabel>
                    <h3
                      className={cn(
                        "mt-5 text-balance font-display font-extrabold leading-[1.1] text-foreground",
                        isDominant ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl",
                      )}
                    >
                      {scene.title}
                    </h3>
                    <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{scene.desc}</p>
                    <ul
                      className={cn(
                        "mt-6 grid gap-3",
                        scene.bullets.length > 4 && "lg:grid-cols-2 lg:gap-x-6",
                      )}
                    >
                      {scene.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3">
                          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                            <Check className="size-3" />
                          </span>
                          <span className="text-[15px] leading-relaxed text-foreground/80">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                  <Reveal delay={1} className={cn(reverse && "lg:order-1", isDominant && "h-full")}>
                    {scene.visual === "live-architecture" ? (
                      <LiveArchitecture />
                    ) : scene.video ? (
                      <SceneVideo
                        src={scene.video}
                        poster={scene.image}
                        alt={scene.title}
                        cards={scene.cards}
                        size={isDominant ? "dominant" : "default"}
                        className={isDominant ? "lg:-mr-8 xl:-mr-12" : undefined}
                      />
                    ) : (
                      <SceneImage
                        src={scene.image}
                        beforeSrc={scene.beforeImage}
                        alt={scene.title}
                        cards={scene.cards}
                        before={scene.before}
                        scrollDelay={i}
                        size={isDominant ? "dominant" : "default"}
                        className={isDominant ? "lg:-mr-8 xl:-mr-12" : undefined}
                      />
                    )}
                  </Reveal>
                </div>
              </div>
            </section>
            {showStatPause && config.statPause && (
              <StatPauseBand {...config.statPause} />
            )}
            {config.systemSchema?.afterSceneIndex === i && (
              <SystemSchemaBand schema={config.systemSchema} />
            )}
            {config.roomExplorer?.afterSceneIndex === i && (
              <RoomExplorerBand section={config.roomExplorer} />
            )}
          </div>
        );
      })}

      {/* Grid features */}
      {!gridBeforeScenes && config.grid && <GridSection grid={config.grid} />}

      {/* Interactive live demo — the synthesis of all chapters */}
      {config.interactive?.commandCenter && <HotelCommandCenter />}

      {/* Stats */}
      <section className="bg-navy">
        <div className={cn("mx-auto max-w-7xl px-5 sm:px-8", SECTION_PY)}>
          <Reveal className="max-w-2xl">
            <SectionLabel tone="dark">{statsHeading.label}</SectionLabel>
            <h2 className="mt-6 text-balance font-display text-4xl font-extrabold leading-[1.05] text-navy-foreground sm:text-5xl">
              {statsHeading.title}
            </h2>
            {statsHeading.subtitle && (
              <p className="mt-5 text-lg leading-relaxed text-navy-muted">{statsHeading.subtitle}</p>
            )}
          </Reveal>
          <div className="mt-12">
            <StatGrid stats={config.stats} tone="dark" />
          </div>
        </div>
      </section>

      {/* Interactive ROI calculator */}
      {config.interactive?.roi && <RoiCalculator />}

      {/* Comparison */}
      <section className={cn("mx-auto max-w-6xl px-5 sm:px-8", SECTION_PY)}>
        <Reveal className="max-w-2xl">
          <SectionLabel>{comparisonHeading.label}</SectionLabel>
          <h2 className="mt-6 font-display text-3xl font-extrabold leading-[1.1] text-foreground sm:text-4xl">
            {comparisonHeading.title}
          </h2>
          {comparisonHeading.subtitle && (
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              {comparisonHeading.subtitle}
            </p>
          )}
        </Reveal>
        <Reveal delay={1} className="mt-10 overflow-x-auto overflow-y-hidden rounded-3xl border border-border">
          <div className="min-w-[640px]">
            <div className="grid grid-cols-[1.2fr_1fr_1fr] bg-surface text-sm font-semibold">
              <div className="p-4 sm:p-5 text-muted-foreground">Aspetto</div>
              <div className="relative flex items-center gap-2 border-x border-brand/20 bg-brand/[0.10] p-4 sm:p-5 text-brand">
                <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand to-brand-bright" />
                <Sparkles className="size-4" /> QuickConnext
              </div>
              <div className="p-4 sm:p-5 text-muted-foreground">
                {config.comparisonTraditionalLabel ?? "Integratore tradizionale"}
              </div>
            </div>
            {config.comparison.map((row, i) => (
              <div
                key={row.aspect}
                className={cn(
                  "grid grid-cols-[1.2fr_1fr_1fr] border-t border-border text-sm transition-colors hover:bg-brand/[0.03]",
                  i % 2 === 1 && "bg-surface/40",
                )}
              >
                <div className="p-4 sm:p-5 font-medium text-foreground">{row.aspect}</div>
                <div className="flex items-start gap-2 border-x border-brand/20 bg-brand/[0.06] p-4 sm:p-5 font-medium text-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                  <span>{row.quick}</span>
                </div>
                <div className="flex items-start gap-2 p-4 sm:p-5 text-muted-foreground">
                  {row.traditional.startsWith("~") ? (
                    <Minus className="mt-0.5 size-4 shrink-0 text-muted-foreground/60" />
                  ) : (
                    <X className="mt-0.5 size-4 shrink-0 text-muted-foreground/60" />
                  )}
                  <span>{row.traditional.replace(/^~/, "")}</span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Finance */}
      <section className="bg-surface">
        <div className={cn("mx-auto max-w-7xl px-5 sm:px-8", SECTION_PY)}>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <SectionLabel>{config.finance.label}</SectionLabel>
              <h2 className="mt-6 font-display text-3xl font-extrabold leading-[1.1] text-foreground sm:text-4xl">
                {config.finance.title}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{config.finance.text}</p>
            </Reveal>
            <Reveal delay={1}>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {config.finance.points.map((p) => (
                  <div
                    key={p.title}
                    className="group rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-card"
                  >
                    <h3 className="font-display text-2xl font-extrabold text-brand">
                      <CountUp value={p.title} />
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Assistance */}
      <section className={cn("mx-auto max-w-7xl px-5 sm:px-8", SECTION_PY)}>
        <Reveal className="max-w-2xl">
          <SectionLabel>{assistanceHeading.label}</SectionLabel>
          <h2 className="mt-6 font-display text-3xl font-extrabold leading-[1.1] text-foreground sm:text-4xl">
            {assistanceHeading.title}
          </h2>
          {assistanceHeading.subtitle && (
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              {assistanceHeading.subtitle}
            </p>
          )}
        </Reveal>
        {assistStats.length > 0 && (
          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-3">
            {assistStats.map((a, i) => (
              <Reveal key={a.title} delay={i} className="bg-background p-7 sm:p-8">
                <p className="font-display text-4xl font-extrabold tracking-tight text-brand sm:text-5xl">
                  {a.stat}
                </p>
                <h3 className="mt-3 text-base font-semibold text-foreground">{a.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{a.desc}</p>
              </Reveal>
            ))}
          </div>
        )}

        {assistRest.length > 0 && (
          <div
            className={cn(
              "grid gap-4 sm:grid-cols-2",
              assistStats.length > 0 ? "mt-5" : "mt-12",
            )}
          >
            {assistRest.map((a, i) => (
              <Reveal key={a.title} delay={i} className="h-full">
                <div className="flex h-full items-start gap-3.5 rounded-2xl border border-border bg-background p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-card">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    {createElement(a.icon, { className: "size-5" })}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">{a.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{a.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      <CtaBand
        label={config.ctaLabel}
        title={config.ctaTitle}
        subtitle={config.ctaSubtitle}
        image={config.ctaImage}
      />
    </main>
  );
}
