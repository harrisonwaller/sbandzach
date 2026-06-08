"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/content/site";
import { heroImage } from "@/content/capsule";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * The opening frame — the kiss on the green, full-bleed, with the names laid
 * over it. Pure "quiet luxury": this is the album cover before the film begins.
 */
export function CapsuleHero() {
  const reduce = useReducedMotion();
  const img = heroImage();

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0 : 0.9, delay: reduce ? 0 : delay, ease },
  });

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-end overflow-hidden px-6 pb-[11vh] text-center"
    >
      {img && (
        <Image
          src={img.src}
          alt="Sara Beth and Zachary"
          fill
          priority
          sizes="100vw"
          placeholder={img.blurDataURL ? "blur" : "empty"}
          blurDataURL={img.blurDataURL}
          className="object-cover"
          style={{ objectPosition: `center ${img.focusY ?? "32%"}` }}
        />
      )}
      {/* veil for legibility — darker at top and bottom, lighter in the middle */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(14,11,8,0.38) 0%, rgba(14,11,8,0.10) 30%, rgba(14,11,8,0.30) 62%, rgba(14,11,8,0.74) 100%)",
        }}
      />

      <div className="relative">
        <motion.p
          className="mb-7 font-serif text-[1.05rem] italic text-cream/90"
          style={{ letterSpacing: "0.18em" }}
          {...rise(0.2)}
        >
          {site.eyebrow}
        </motion.p>

        <motion.h1
          className="font-display text-cream"
          style={{ fontSize: "clamp(3.2rem, 10vw, 8.5rem)", lineHeight: 0.94, letterSpacing: "-0.01em" }}
          {...rise(0.35)}
        >
          <span className="block">{site.names.first}</span>
          <span className="my-1 block font-serif text-[0.4em] font-light italic text-gold-soft">&amp;</span>
          <span className="block">{site.names.second}</span>
        </motion.h1>

        <motion.div className="mt-10" {...rise(0.8)}>
          <div
            className="font-serif text-[0.95rem] font-semibold uppercase text-cream"
            style={{ letterSpacing: "0.22em" }}
          >
            {site.dateNumeric}
          </div>
          <div className="mt-2 font-serif text-[1.15rem] italic text-cream/80" style={{ letterSpacing: "0.04em" }}>
            {site.location}
          </div>
        </motion.div>
      </div>

      <motion.div
        aria-hidden
        className="absolute bottom-9 left-1/2 font-serif text-[0.75rem] lowercase italic text-cream/70"
        style={{ letterSpacing: "0.3em", x: "-50%" }}
        initial={{ opacity: 0 }}
        animate={reduce ? { opacity: 0.6 } : { opacity: [0, 0.6, 0], y: [-3, 2, -3] }}
        transition={reduce ? { duration: 0 } : { delay: 1.4, duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        their day, kept
      </motion.div>
    </section>
  );
}
