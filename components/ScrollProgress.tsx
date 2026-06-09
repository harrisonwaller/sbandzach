"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

/**
 * A 1px gold hairline pinned to the very top that fills as you move through the
 * scroll — a quiet wayfinder for a long narrative, and a nod to the film-reel.
 * Decorative only; hidden under reduced motion.
 */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 30, mass: 0.4 });

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left"
      style={{ scaleX, background: "linear-gradient(90deg, var(--gold-soft), var(--gold))" }}
    />
  );
}
