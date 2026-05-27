"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { MediaItem } from "@/content/media";

const ease = [0.16, 1, 0.3, 1] as const;

/** Deterministic, organic-looking peaks for the silent placeholder track. */
function decorativePeaks(seed: string, n = 240): number[] {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const rand = () => {
    h = (h * 1664525 + 1013904223) >>> 0;
    return h / 0xffffffff;
  };
  const out: number[] = [];
  for (let i = 0; i < n; i++) {
    const t = i / n;
    // a gentle swell with fine grain on top
    const envelope = 0.35 + 0.5 * Math.sin(Math.PI * t) * Math.sin(Math.PI * t);
    const grain = 0.45 + 0.55 * rand();
    out.push(Math.min(1, envelope * grain));
  }
  return out;
}

export function VoiceTrack({
  track,
  side,
}: {
  track: MediaItem;
  side: "left" | "right";
}) {
  const waveRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<any>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [progress, setProgress] = useState(0);

  const isPlaceholder = track.src.includes("placeholder");
  const isVideo = track.type === "video";
  const lines = (track.transcript ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const activeLine =
    lines.length > 0
      ? Math.min(lines.length - 1, Math.floor(progress * lines.length))
      : -1;

  // Initialise wavesurfer for this track. Audio tracks only; video uses the
  // <video> element directly as ambient texture.
  useEffect(() => {
    if (isVideo || !waveRef.current) return;
    let destroyed = false;
    let ws: any;

    (async () => {
      const WaveSurfer = (await import("wavesurfer.js")).default;
      if (destroyed || !waveRef.current) return;
      ws = WaveSurfer.create({
        container: waveRef.current,
        height: 56,
        waveColor: "rgba(245, 240, 230, 0.32)",
        progressColor: "#c69b6d",
        cursorColor: "transparent",
        barWidth: 2,
        barGap: 3,
        barRadius: 4,
        normalize: true,
      });
      wsRef.current = ws;

      // Placeholder is silent — render decorative peaks instead of a flat line.
      if (isPlaceholder) {
        ws.load(track.src, [decorativePeaks(track.id)], 16);
      } else {
        ws.load(track.src);
      }

      ws.on("ready", () => !destroyed && setReady(true));
      ws.on("play", () => setPlaying(true));
      ws.on("pause", () => setPlaying(false));
      ws.on("finish", () => {
        setPlaying(false);
        setProgress(1);
      });
      ws.on("timeupdate", (t: number) => {
        const d = ws.getDuration() || 16;
        setProgress(d ? t / d : 0);
      });
    })();

    return () => {
      destroyed = true;
      try {
        ws?.destroy();
      } catch {}
      wsRef.current = null;
    };
  }, [track.id, track.src, isPlaceholder, isVideo]);

  const videoElRef = useRef<HTMLVideoElement>(null);

  function toggle() {
    setExpanded(true);
    if (isVideo) {
      const v = videoElRef.current;
      if (!v) return;
      if (v.paused) {
        v.play();
        setPlaying(true);
      } else {
        v.pause();
        setPlaying(false);
      }
      return;
    }
    wsRef.current?.playPause();
  }

  // Auto-scroll the active transcript line into view.
  const lineRefs = useRef<(HTMLLIElement | null)[]>([]);
  useEffect(() => {
    if (activeLine < 0) return;
    lineRefs.current[activeLine]?.scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
  }, [activeLine]);

  const hasMedia = (track.speakerPhoto || isVideo) && expanded;

  return (
    <div className="relative flex min-h-[88svh] w-full items-center justify-center overflow-hidden px-6 py-24 sm:px-10">
      {/* Edge-bleed media (emerges on play) */}
      <AnimatePresence>
        {hasMedia && (
          <motion.div
            key="bleed"
            className="pointer-events-none absolute inset-y-0 z-0 hidden sm:block"
            style={{
              width: "42%",
              [side]: 0,
            }}
            initial={{ opacity: 0, x: side === "left" ? -40 : 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease }}
          >
            {isVideo ? (
              <video
                ref={videoElRef}
                src={track.src}
                poster={track.thumbnail}
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              />
            ) : (
              track.speakerPhoto && (
                <Image
                  src={track.speakerPhoto}
                  alt={track.speaker ?? ""}
                  fill
                  sizes="42vw"
                  className="object-cover"
                />
              )
            )}
            {/* fade the inner edge into the dark */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(${
                  side === "left" ? "90deg" : "270deg"
                }, transparent 0%, rgba(15,13,11,0.2) 45%, var(--voices-bg) 100%)`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
        {/* Pull-quote */}
        {track.pullQuote && (
          <p
            className="font-serif font-light italic text-cream"
            style={{
              fontSize: "clamp(1.7rem, 4.2vw, 3.1rem)",
              lineHeight: 1.3,
            }}
          >
            &ldquo;{track.pullQuote}&rdquo;
          </p>
        )}

        {/* Attribution */}
        <p
          className="mt-8 font-display text-[0.78rem] uppercase"
          style={{
            color: "var(--gold-soft)",
            letterSpacing: "0.4em",
            textIndent: "0.4em",
          }}
        >
          {track.speakerRole ? `${track.speakerRole} — ` : ""}
          <span className="text-cream/80">{track.speaker}</span>
        </p>

        {/* Play button — thin circle, no label */}
        <button
          onClick={toggle}
          aria-label={playing ? "Pause" : "Play"}
          className="group mt-10 flex h-16 w-16 items-center justify-center rounded-full transition-transform duration-500"
          style={{ border: "1px solid var(--gold-soft)" }}
        >
          <span
            className="transition-opacity duration-300 group-hover:opacity-80"
            style={{ color: "var(--cream)" }}
          >
            {playing ? (
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
                <rect x="4" y="3" width="3" height="12" fill="currentColor" />
                <rect x="11" y="3" width="3" height="12" fill="currentColor" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
                <path d="M5 3.5l9 5.5-9 5.5z" fill="currentColor" />
              </svg>
            )}
          </span>
        </button>

        {/* Waveform + transcript appear once expanded */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              key="expanded"
              className="mt-12 w-full"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease }}
            >
              <div
                ref={waveRef}
                className={`mx-auto w-full max-w-xl ${isVideo ? "hidden" : ""}`}
                aria-hidden
              />
              {!ready && !isVideo && (
                <p className="mt-3 font-serif text-[0.8rem] italic text-cream/30">
                  loading…
                </p>
              )}

              {lines.length > 0 && (
                <ul className="mx-auto mt-10 max-h-[34svh] max-w-xl space-y-3 overflow-y-auto px-2 text-center">
                  {lines.map((line, i) => (
                    <li
                      key={i}
                      ref={(el) => {
                        lineRefs.current[i] = el;
                      }}
                      className="font-serif text-[1.15rem] leading-relaxed transition-colors duration-500"
                      style={{
                        color:
                          i === activeLine
                            ? "var(--gold-soft)"
                            : "rgba(245,240,230,0.32)",
                      }}
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
