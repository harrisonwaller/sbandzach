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
      {/* Ambient fill: a blurred, dimmed copy of the frame bleeds to the edges so
          the portrait shot never shows dead letterbox bars on wide screens. */}
      <div aria-hidden className="absolute inset-0">
        <Image
          src={img.src}
          alt=""
          fill
          // blurred to mush behind the sharp frame — a small variant is plenty
          sizes="384px"
          className="scale-110 object-cover blur-2xl"
          style={{ objectPosition: `center ${img.focusY ?? "50%"}` }}
        />
        <div className="absolute inset-0 bg-[#0a0712]/55" />
      </div>
      {/* one slow exhale as the book shuts on the sky lighting up — the sharp,
          whole frame centred over the fill. The frame matches the photo's 2:3
          ratio, so object-cover fills it with no crop and stays crisp. */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: reduce ? 1 : 1.04, opacity: reduce ? 1 : 0.9 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: reduce ? 0 : 6, ease: "easeOut" }}
      >
        <div className="relative aspect-[2/3] h-[88svh] max-h-[1000px] max-w-[94vw] overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
          <Image
            src={img.src}
            alt="Fireworks over the lake — Sara Beth & Zachary"
            fill
            placeholder={img.blurDataURL ? "blur" : "empty"}
            blurDataURL={img.blurDataURL}
            className="object-cover"
            // 2:3 frame capped at 1000px tall — width never exceeds ~700px
            sizes="(max-width: 768px) 100vw, 700px"
            style={{ objectPosition: `center ${img.focusY ?? "50%"}` }}
          />
        </div>
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
