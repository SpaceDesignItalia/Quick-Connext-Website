"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/* Le animazioni CSS rispettano già prefers-reduced-motion (globals.css);
   questo estende la stessa cortesia a tutte le animazioni framer-motion:
   con reduced-motion attivo i transform si fermano, le opacity restano. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
