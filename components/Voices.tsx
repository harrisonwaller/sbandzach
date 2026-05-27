"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MediaItem } from "@/content/media";
import { VoiceTrack } from "@/components/VoiceTrack";

/**
 * Chapter IV — The Voices. The emotional centerpiece. Each toast or dance is a
 * viewport-sized track: pull-quote first, then attribution, then a thin play
 * button. On play the waveform, transcript and an edge-bleed portrait emerge.
 * Thin markers at the top and the arrow keys move between tracks.
 *
 * Built fully now; seeded with one placeholder track. Real voices arrive after
 * the wedding via /public/media/toasts and /dances (see MEDIA_GUIDE).
 */
export function Voices({ tracks }: { tracks: MediaItem[] }) {
  const [i, setI] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useRef(false);

  const count = tracks.length;
  const go = useCallback(
    (dir: number) => setI((p) => (p + dir + count) % count),
    [count],
  );

  // Arrow keys move between tracks — but only while this chapter is on screen
  // and no lightbox has claimed the keyboard.
  useEffect(() => {
    if (count <= 1) return;
    const onKey = (e: KeyboardEvent) => {
      if (!inView.current) return;
      if (document.body.style.overflow === "hidden") return; // lightbox open
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count, go]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => (inView.current = entry.isIntersecting),
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  if (count === 0) return null;
  const track = tracks[i];

  return (
    <section
      id="voices"
      ref={sectionRef}
      className="relative text-cream"
      style={{ ["--voices-bg" as string]: "#0f0d0b", background: "#0f0d0b" }}
    >
      {/* Top: chapter mark + track markers */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 pt-7 sm:px-10">
        <span
          className="font-display text-[0.7rem] uppercase"
          style={{
            color: "var(--gold)",
            letterSpacing: "0.45em",
            textIndent: "0.45em",
          }}
        >
          Chapter IV
        </span>
        <div className="pointer-events-auto flex items-center gap-4">
          <div className="flex items-center gap-2">
            {tracks.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => setI(idx)}
                aria-label={`Track ${idx + 1}`}
                className="h-px w-7 transition-colors duration-500"
                style={{
                  background:
                    idx === i ? "var(--gold-soft)" : "rgba(245,240,230,0.22)",
                }}
              />
            ))}
          </div>
          <span
            className="hidden font-display text-[0.65rem] uppercase text-cream/40 sm:inline"
            style={{ letterSpacing: "0.3em", textIndent: "0.3em" }}
          >
            Track {i + 1} of {count}
          </span>
        </div>
      </div>

      <VoiceTrack track={track} side={i % 2 === 0 ? "right" : "left"} />

      {/* Prev / next */}
      {count > 1 && (
        <>
          <VoicesArrow dir="left" onClick={() => go(-1)} />
          <VoicesArrow dir="right" onClick={() => go(1)} />
        </>
      )}
    </section>
  );
}

function VoicesArrow({
  dir,
  onClick,
}: {
  dir: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === "left" ? "Previous voice" : "Next voice"}
      className={`absolute top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-cream/40 transition-colors duration-300 hover:text-gold-soft ${
        dir === "left" ? "left-2 sm:left-5" : "right-2 sm:right-5"
      }`}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
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
