"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * A restrained scroll-reveal: a slow fade-up the first time an element enters
 * the viewport. Honors reduced-motion.
 *
 * The element type never changes between server and client renders — under
 * reduced motion we keep the same motion element and actively animate it to the
 * visible state, which clears the hidden inline style the server baked in.
 * (Switching to a plain element would leave that opacity:0 stuck.)
 */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "figure";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  const motionProps = reduce
    ? {
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0 },
      }
    : {
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "0px 0px -12% 0px" },
        transition: { duration: 1.1, delay, ease },
      };

  return (
    <MotionTag className={className} initial={{ opacity: 0, y }} {...motionProps}>
      {children}
    </MotionTag>
  );
}
