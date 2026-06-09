"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { finaleImage } from "@/content/capsule";
import { Reveal } from "@/components/Reveal";

/**
 * The closing full-bleed frame — fireworks over the lake at the end of the
 * night. The book opens on a quiet kiss and shuts on the sky lighting up; this
 * bleeds straight into the ink footer, so the page never lifts back to cream.
 */
export function Finale() {
  const reduce = useReducedMotion();
  const img = finaleImage();
  if (!img) return null;

  return (
    <section
      aria-label="Fireworks over the lake"
      className="relative flex min-h-[86svh] flex-col items-center justify-end overflow-hidden bg-[#0a0712] px-6 pb-[14vh] text-center"
    >
      {/* one slow exhale as the book shuts on the sky lighting up */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        initial={{ scale: reduce ? 1 : 1.05, opacity: reduce ? 1 : 0.6 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: reduce ? 0 : 6, ease: "easeOut" }}
      >
        <Image
          src={img.src}
          alt="Fireworks over the lake — Sara Beth & Zachary"
          fill
          sizes="100vw"
          placeholder={img.blurDataURL ? "blur" : "empty"}
          blurDataURL={img.blurDataURL}
          // Cover-fill on phones (the portrait frame fills tall screens); on wider
          // screens contain it so the whole shot — fireworks AND the couple on the
          // dock — is visible instead of a cropped band of dark sky.
          className="object-cover md:object-contain"
          style={{ objectPosition: `center ${img.focusY ?? "50%"}` }}
        />
      </motion.div>
      {/* fade the bottom into the ink footer (kept subtle so it never crops the shot) */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,7,18,0) 0%, rgba(10,7,18,0.85) 100%)",
        }}
      />
      <Reveal className="relative">
        <p
          className="font-serif text-[1.15rem] lowercase italic text-cream/85"
          style={{ letterSpacing: "0.16em", textShadow: "0 2px 18px rgba(0,0,0,0.7)" }}
        >
          one more, over the lake
        </p>
      </Reveal>
    </section>
  );
}
