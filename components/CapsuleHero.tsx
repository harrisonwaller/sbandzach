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

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-between overflow-hidden px-6 pt-[13vh] pb-[15vh] text-center"
    >
      {img && (
        <motion.div
          aria-hidden
          className="absolute inset-0"
          initial={{ scale: 1 }}
          animate={{ scale: reduce ? 1 : 1.06 }}
          transition={{ duration: reduce ? 0 : 18, ease: "easeOut" }}
        >
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
        </motion.div>
      )}
      {/* veil for legibility — darker at top and bottom, lighter in the middle */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(14,11,8,0.55) 0%, rgba(14,11,8,0.14) 30%, rgba(14,11,8,0.06) 52%, rgba(14,11,8,0.24) 74%, rgba(14,11,8,0.7) 100%)",
        }}
      />

      {/* names ride high over the open sky; the kiss stays clear in the middle.
          CSS-animated (not framer) so the page's largest paint — the names —
          appears on first paint instead of waiting out hydration. */}
      <div className="relative">
        <p
          className="hero-rise mb-6 font-serif text-[1.05rem] italic text-cream/90"
          style={{ letterSpacing: "0.18em", animationDelay: "0.2s" }}
        >
          {site.eyebrow}
        </p>

        <h1
          className="hero-rise font-display text-cream"
          style={{
            fontSize: "clamp(3rem, 9vw, 7.6rem)",
            lineHeight: 0.94,
            letterSpacing: "-0.01em",
            animationDelay: "0.35s",
          }}
        >
          <span className="block">{site.names.first}</span>
          <span className="my-1 block font-serif text-[0.4em] font-light italic text-gold-soft">&amp;</span>
          <span className="block">{site.names.second}</span>
        </h1>
      </div>

      {/* date + place sit low over the platform */}
      <div className="hero-rise relative" style={{ animationDelay: "0.8s" }}>
        <div
          className="font-serif text-[0.95rem] font-semibold uppercase text-cream"
          style={{ letterSpacing: "0.22em" }}
        >
          {site.dateNumeric}
        </div>
        <div className="mt-2 font-serif text-[1.15rem] italic text-cream/80" style={{ letterSpacing: "0.04em" }}>
          {site.location}
        </div>
      </div>

      <motion.div
        aria-hidden
        className="absolute bottom-9 left-1/2 flex flex-col items-center gap-2 font-serif text-[0.75rem] lowercase italic text-cream/65"
        style={{ letterSpacing: "0.3em", x: "-50%" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: reduce ? 0.6 : 0.65 }}
        transition={{ delay: reduce ? 0 : 1.6, duration: reduce ? 0 : 1.4, ease }}
      >
        their day, kept
        {/* always in the SSR tree (a `!reduce &&` conditional hydration-mismatched
            for reduced-motion visitors); CSS hides it for them instead */}
        <motion.span
          aria-hidden
          className="block h-7 w-px origin-top bg-cream/40 motion-reduce:hidden"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 2.1, duration: 1, ease }}
        />
      </motion.div>
    </section>
  );
}
