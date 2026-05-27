"use client";

import { useState } from "react";
import Image from "next/image";
import type { MediaItem } from "@/content/media";
import { Lightbox } from "@/components/Lightbox";
import { Reveal } from "@/components/Reveal";

/**
 * Chapter I — In Frames. A magazine collage of the engagement set. Cells cycle
 * through a rhythm of large, tall, paired and full-width shapes so the grid is
 * never uniform; very wide source frames get their own panorama band.
 */

// {c: column span /12, r: row span}. Every cell is taller-than-or-equal to its
// width in px, so the square source photos crop on the SIDES, never top/bottom —
// faces are always preserved. Asymmetry comes from size, not from wide crops.
const PATTERN: { c: number; r: number; feature?: boolean }[] = [
  { c: 7, r: 8, feature: true }, // big near-square
  { c: 5, r: 8 }, //                 tall portrait (pairs to 12)
  { c: 4, r: 5 }, //                 portrait triptych
  { c: 4, r: 5 },
  { c: 4, r: 5 },
  { c: 6, r: 7 }, // near-square pair
  { c: 6, r: 7 },
];

function tileFor(i: number, item: MediaItem) {
  const ar = item.width && item.height ? item.width / item.height : 1;
  if (ar > 1.9) return { c: 12, r: 3, feature: true }; // true panorama band
  return PATTERN[i % PATTERN.length];
}

export function Gallery({ photos }: { photos: MediaItem[] }) {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <section id="frames" className="bg-cream py-[var(--section-y)]">
      <div className="mx-auto mb-14 max-w-chapter px-6 sm:px-10">
        <Reveal>
          <p className="chapter-mark">Chapter I</p>
          <h2 className="chapter-title">
            In <em>frames</em>.
          </h2>
        </Reveal>
      </div>

      <div className="px-4 sm:px-10">
        <Reveal>
          <div className="gallery-grid">
            {photos.map((p, i) => {
              const t = tileFor(i, p);
              return (
                <button
                  key={p.id}
                  className={`gallery-cell ${t.feature ? "g-feature" : ""}`}
                  style={{ gridColumn: `span ${t.c}`, gridRow: `span ${t.r}` }}
                  onClick={() => setIndex(i)}
                  aria-label={`View photograph ${i + 1} of ${photos.length}`}
                >
                  <Image
                    src={p.src}
                    alt={p.caption ?? ""}
                    fill
                    sizes="(max-width: 900px) 50vw, 40vw"
                    placeholder={p.blurDataURL ? "blur" : "empty"}
                    blurDataURL={p.blurDataURL}
                    className="object-cover"
                  />
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>

      <Lightbox
        items={photos}
        index={index}
        onClose={() => setIndex(null)}
        onIndexChange={setIndex}
      />
    </section>
  );
}
