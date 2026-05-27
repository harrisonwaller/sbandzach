"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { MediaItem } from "@/content/media";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * A quiet, dark lightbox shared by the Gallery and the Archive. Arrow keys and
 * on-screen arrows navigate; ESC or a click on the backdrop closes.
 */
export function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: {
  items: MediaItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}) {
  const open = index !== null;

  const go = useCallback(
    (dir: number) => {
      if (index === null) return;
      const next = (index + dir + items.length) % items.length;
      onIndexChange(next);
    },
    [index, items.length, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    // lock scroll while open
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, go, onClose]);

  const current = index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          className="fixed inset-0 z-[500] flex items-center justify-center"
          style={{ background: "rgba(12,10,8,0.94)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Photograph viewer"
        >
          {/* close */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center text-cream/70 transition-colors duration-300 hover:text-cream sm:right-8 sm:top-8"
          >
            <span className="font-serif text-2xl leading-none">×</span>
          </button>

          {/* prev / next */}
          <LightboxArrow dir="left" onClick={(e) => { e.stopPropagation(); go(-1); }} />
          <LightboxArrow dir="right" onClick={(e) => { e.stopPropagation(); go(1); }} />

          <motion.figure
            key={current.id}
            className="relative flex max-h-[88svh] max-w-[92vw] flex-col items-center"
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative"
              style={{
                width: "min(92vw, 78svh)",
                aspectRatio: `${current.width ?? 1} / ${current.height ?? 1}`,
                maxHeight: "82svh",
              }}
            >
              <Image
                src={current.src}
                alt={current.caption ?? current.title ?? ""}
                fill
                sizes="92vw"
                placeholder={current.blurDataURL ? "blur" : "empty"}
                blurDataURL={current.blurDataURL}
                className="object-contain"
              />
            </div>
            {current.caption && (
              <figcaption
                className="mt-4 font-serif text-[0.9rem] lowercase italic text-cream/70"
                style={{ letterSpacing: "0.2em" }}
              >
                {current.caption}
              </figcaption>
            )}
            <div
              className="mt-1 font-display text-[0.7rem] uppercase text-cream/35"
              style={{ letterSpacing: "0.4em", textIndent: "0.4em" }}
            >
              {index! + 1} / {items.length}
            </div>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function LightboxArrow({
  dir,
  onClick,
}: {
  dir: "left" | "right";
  onClick: (e: React.MouseEvent) => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === "left" ? "Previous" : "Next"}
      className={`absolute top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-cream/60 transition-colors duration-300 hover:text-cream ${
        dir === "left" ? "left-3 sm:left-6" : "right-3 sm:right-6"
      }`}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
