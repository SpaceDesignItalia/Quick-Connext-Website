"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { animate, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface BeforeAfterSliderProps {
  src: string;
  /** Optional distinct image for the "Prima" side; defaults to src with desaturation. */
  beforeSrc?: string;
  alt: string;
  className?: string;
  rounded?: string;
  priority?: boolean;
  imageClassName?: string;
  scrollDelay?: number;
  size?: "default" | "dominant";
  /** Problem chips revealed on the "Prima" side. */
  beforeBadges?: string[];
  /** Live data cards tied to the "Con QuickConnext" side. */
  afterOverlay?: ReactNode;
}

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

export function BeforeAfterSlider({
  src,
  beforeSrc,
  alt,
  className,
  rounded = "rounded-3xl",
  priority = false,
  imageClassName,
  scrollDelay = 0,
  size = "default",
  beforeBadges = [],
  afterOverlay,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-60px" });
  const hasAnimated = useRef(false);
  const isDragging = useRef(false);
  const isHovering = useRef(false);
  const [position, setPosition] = useState(88);
  const [scrubEnabled, setScrubEnabled] = useState(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;
    const timeout = setTimeout(() => {
      animate(88, 38, {
        duration: 1.8,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (v) => setPosition(v),
        onComplete: () => setScrubEnabled(true),
      });
    }, scrollDelay * 150);
    return () => clearTimeout(timeout);
  }, [isInView, scrollDelay]);

  const updateFromClientX = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(96, Math.max(4, x)));
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!scrubEnabled) return;
    isDragging.current = true;
    containerRef.current?.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!scrubEnabled || !isDragging.current) return;
    updateFromClientX(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    containerRef.current?.releasePointerCapture(e.pointerId);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!scrubEnabled || isDragging.current || !isHovering.current) return;
    updateFromClientX(e.clientX);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative touch-none select-none",
        scrubEnabled && "cursor-col-resize",
        className,
      )}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={() => {
        isHovering.current = true;
      }}
      onMouseLeave={() => {
        isHovering.current = false;
      }}
      onMouseMove={handleMouseMove}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          rounded,
          size === "dominant"
            ? "min-h-[55vh] lg:min-h-[78vh]"
            : "aspect-[16/11]",
        )}
      >
        {/* AFTER — base layer (right / revealed side) */}
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className={cn("object-cover", imageClassName)}
          sizes="(max-width: 1024px) 100vw, 50vw"
          draggable={false}
        />
        <span className="pointer-events-none absolute right-4 top-4 z-[1] flex items-center gap-1.5 rounded-full bg-navy/55 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-bright backdrop-blur-sm">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-bright opacity-70" />
            <span className="relative inline-flex size-1.5 rounded-full bg-brand-bright" />
          </span>
          Con QuickConnext
        </span>

        {/* BEFORE — desaturated, dim: the building "switched off" */}
        <div
          className="absolute inset-0 z-[2]"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={beforeSrc ?? src}
            alt=""
            aria-hidden
            fill
            className={cn(
              "object-cover",
              !beforeSrc && "grayscale brightness-[0.62] contrast-[0.92]",
              imageClassName,
            )}
            sizes="(max-width: 1024px) 100vw, 50vw"
            draggable={false}
          />
          {!beforeSrc && <div className="absolute inset-0 bg-navy/25" />}
          <span className="pointer-events-none absolute left-4 top-4 z-[1] rounded-full bg-black/45 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/70 backdrop-blur-sm">
            Prima
          </span>

          {/* Concrete problems of the "before" world */}
          {beforeBadges.length > 0 && (
            <div
              className="pointer-events-none absolute bottom-4 left-4 z-[1] hidden flex-col items-start gap-2 transition-opacity duration-200 sm:flex"
              style={{ opacity: clamp01((position - 50) / 20) }}
            >
              {beforeBadges.map((b) => (
                <span
                  key={b}
                  className="flex items-center gap-2 rounded-lg border border-amber-300/25 bg-black/55 px-3 py-1.5 text-[12px] font-medium text-amber-100/90 backdrop-blur-sm"
                >
                  <X className="size-3 shrink-0 text-amber-300/80" strokeWidth={3} />
                  {b}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Divider handle */}
        <div
          className="absolute inset-y-0 z-[3] w-px -translate-x-1/2 bg-white shadow-[0_0_12px_rgba(0,0,0,0.45)]"
          style={{ left: `${position}%` }}
        >
          <div className="absolute left-1/2 top-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-0.5 rounded-full border-2 border-white/90 bg-navy/70 shadow-lg backdrop-blur-sm">
            <ChevronLeft className="size-3 text-white/80" strokeWidth={3} />
            <ChevronRight className="size-3 text-white/80" strokeWidth={3} />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-[4] bg-gradient-to-t from-navy/25 via-transparent to-transparent" />
      </div>

      {/* Live data cards — they belong to the "after" world and fade out
          as the divider reveals the "before" side. */}
      {afterOverlay && (
        <div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-200"
          style={{ opacity: clamp01((66 - position) / 20) }}
        >
          {afterOverlay}
        </div>
      )}
    </div>
  );
}
