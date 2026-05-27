"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  ARCHIVE_CHAPTERS,
  type Chapter,
  type MediaItem,
} from "@/content/media";
import { Lightbox } from "@/components/Lightbox";
import { Reveal } from "@/components/Reveal";

/**
 * Chapter VI — The Archive. The "go deep" gallery of every approved frame from
 * the weekend, with filter chips per part of the day. Renders only once there
 * are weekend photographs; before then the Forthcoming chapter speaks for it.
 */
export function Archive({ photos }: { photos: MediaItem[] }) {
  const [filter, setFilter] = useState<Chapter | "all">("all");
  const [index, setIndex] = useState<number | null>(null);

  // Only show chips that actually have photos behind them.
  const available = useMemo(
    () => ARCHIVE_CHAPTERS.filter((c) => photos.some((p) => p.chapter === c.key)),
    [photos],
  );

  const shown = useMemo(
    () => (filter === "all" ? photos : photos.filter((p) => p.chapter === filter)),
    [photos, filter],
  );

  if (photos.length === 0) return null;

  return (
    <section id="archive" className="bg-cream-deep">
      <div className="mx-auto max-w-gallery px-6 py-[var(--section-y)] sm:px-10">
        <Reveal>
          <p className="chapter-mark">Chapter VI</p>
          <h2 className="chapter-title mb-8">
            The <em>archive</em>.
          </h2>

          <div className="mb-12 flex flex-wrap gap-x-2 gap-y-3">
            <Chip active={filter === "all"} onClick={() => setFilter("all")}>
              All
            </Chip>
            {available.map((c) => (
              <Chip
                key={c.key}
                active={filter === c.key}
                onClick={() => setFilter(c.key)}
              >
                {c.label}
              </Chip>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
            {shown.map((p, i) => (
              <button
                key={p.id}
                className="gallery-cell aspect-[4/5]"
                onClick={() => setIndex(i)}
                aria-label={`View ${p.caption ?? "photograph"}`}
              >
                <Image
                  src={p.thumbnail ?? p.src}
                  alt={p.caption ?? ""}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  placeholder={p.blurDataURL ? "blur" : "empty"}
                  blurDataURL={p.blurDataURL}
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <Lightbox
        items={shown}
        index={index}
        onClose={() => setIndex(null)}
        onIndexChange={setIndex}
      />
    </section>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="font-display text-[0.7rem] uppercase transition-colors duration-300"
      style={{
        letterSpacing: "0.34em",
        textIndent: "0.34em",
        padding: "0.55rem 1.1rem",
        border: `1px solid ${active ? "var(--gold)" : "var(--rule)"}`,
        color: active ? "var(--gold)" : "var(--stone)",
        background: active ? "rgba(168,120,65,0.06)" : "transparent",
      }}
    >
      {children}
    </button>
  );
}
