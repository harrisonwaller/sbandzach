"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { MediaItem } from "@/content/media";

/**
 * A wedding clip that plays itself. It autoplays muted-and-looping only while
 * it is on screen (IntersectionObserver → battery + perf), and pauses when it
 * scrolls away. Under reduced-motion it never autoplays: the poster shows with
 * native controls so it can still be watched on demand.
 */
export function Film({ film, className }: { film: MediaItem; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().then(() => setStarted(true)).catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  const w = film.width ?? 16;
  const h = film.height ?? 9;
  const ar = `${w} / ${h}`;
  const portrait = h > w;

  return (
    <figure
      className={`relative mx-auto overflow-hidden bg-black ${className ?? ""}`}
      // Width-driven sizing keeps every clip in its true shape: portrait clips
      // stay tall and centred (capped so they never tower); landscape clips run
      // the full chapter width. No stretching, minimal crop.
      style={{ aspectRatio: ar, width: "100%", maxWidth: portrait ? 520 : undefined }}
    >
      <video
        ref={ref}
        src={film.src}
        poster={film.thumbnail}
        muted
        loop
        playsInline
        preload="none"
        controls={!!reduce}
        aria-label={film.caption ?? "Wedding clip"}
        className="h-full w-full object-cover"
      />
      {/* gentle scrim so a caption stays legible over motion */}
      {film.caption && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
            style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.45), transparent)" }}
          />
          <figcaption
            className="absolute bottom-5 left-5 font-serif text-[0.9rem] lowercase italic text-cream/90"
            style={{ letterSpacing: "0.2em", textShadow: "0 2px 18px rgba(0,0,0,0.7)" }}
          >
            {film.caption}
          </figcaption>
        </>
      )}
      {/* a hairline "play" affordance until it starts. Rendered unconditionally
          (a `!reduce &&` conditional hydration-mismatched for reduced-motion
          visitors) and hidden via CSS where native controls show instead. */}
      {!started && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center motion-reduce:hidden"
        >
          <span
            className="flex h-16 w-16 items-center justify-center rounded-full"
            style={{ border: "1px solid rgba(245,240,230,0.7)", background: "rgba(0,0,0,0.15)" }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
              <path d="M5 3.5l9 5.5-9 5.5z" fill="var(--cream)" />
            </svg>
          </span>
        </div>
      )}
    </figure>
  );
}
