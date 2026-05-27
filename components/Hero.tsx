"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { site } from "@/content/site";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  // The hidden state is identical on server and client (so hydration never
  // mismatches); reduced motion only collapses the timing to instant.
  const rise = (delay: number): Variants => ({
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 1.3, delay: reduce ? 0 : delay, ease },
    },
  });

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 pb-16 pt-32 text-center"
    >
      {/* faint warm glow, anchored to the page not the viewport noise */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% 42%, rgba(168,120,65,0.07) 0%, transparent 70%)",
        }}
      />

      <motion.p
        className="accent mb-9 text-[1.05rem] lowercase sm:mb-10"
        variants={rise(0.6)}
        initial="hidden"
        animate="show"
      >
        {site.eyebrow}
      </motion.p>

      <h1
        className="font-display text-ink"
        style={{
          fontSize: "clamp(3.4rem, 11vw, 9rem)",
          lineHeight: 0.92,
          letterSpacing: "-0.01em",
        }}
      >
        <motion.span
          className="block"
          variants={rise(1.0)}
          initial="hidden"
          animate="show"
        >
          {site.names.first}
        </motion.span>
        <motion.span
          className="my-1 block font-serif font-light italic text-gold"
          style={{ fontSize: "0.42em", lineHeight: 1 }}
          variants={rise(1.3)}
          initial="hidden"
          animate="show"
        >
          &amp;
        </motion.span>
        <motion.span
          className="block"
          variants={rise(1.6)}
          initial="hidden"
          animate="show"
        >
          {site.names.second}
        </motion.span>
      </h1>

      <motion.div
        className="mt-12"
        variants={rise(2.2)}
        initial="hidden"
        animate="show"
      >
        <div
          className="font-display uppercase text-ink"
          style={{
            fontSize: "clamp(0.95rem, 1.8vw, 1.25rem)",
            letterSpacing: "0.4em",
            textIndent: "0.4em",
          }}
        >
          {site.dateRoman}
        </div>
        <div
          className="mt-3 font-serif italic text-ink-soft"
          style={{ fontSize: "1.1rem", letterSpacing: "0.1em" }}
        >
          {site.location}
        </div>
      </motion.div>

      <motion.div
        aria-hidden
        className="mt-12 h-[60px] w-px origin-top bg-ink/40"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 0.4 }}
        transition={{ duration: reduce ? 0 : 1, delay: reduce ? 0 : 2.7, ease }}
      />

      <motion.div
        aria-hidden
        className="absolute bottom-10 left-1/2 font-serif text-[0.8rem] lowercase italic text-ink-soft"
        style={{ letterSpacing: "0.3em", x: "-50%" }}
        initial={{ opacity: 0 }}
        animate={
          reduce
            ? { opacity: 0.5 }
            : { opacity: [0, 0.55, 0], y: [-4, 2, -4] }
        }
        transition={
          reduce
            ? { duration: 0 }
            : { delay: 3.2, duration: 3, repeat: Infinity, ease: "easeInOut" }
        }
      >
        scroll
      </motion.div>
    </section>
  );
}
