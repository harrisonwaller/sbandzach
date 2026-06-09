"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { MediaItem } from "@/content/media";
import { type CapsuleSection, resolve } from "@/content/capsule";
import { Reveal } from "@/components/Reveal";
import { Lightbox } from "@/components/Lightbox";
import { Film } from "@/components/Film";

const ease = [0.16, 1, 0.3, 1] as const;

/** A descriptive alt/archival label for a frame that has no caption. */
function altFor(item: MediaItem, label: string): string {
  return item.caption || `Sara Beth & Zachary — ${label}`;
}

/**
 * Renders one chapter of the capsule: a tone-coloured section (the escalation),
 * an editorial intro, then photos and/or films in one of four layouts. Photos
 * open in the shared Lightbox; films autoplay in view.
 */
export function CapsuleChapter({ section }: { section: CapsuleSection }) {
  const featured = section.featuredId ? resolve([section.featuredId])[0] : undefined;
  const photos = resolve(section.itemIds);
  const films = resolve(section.filmIds);

  // The lightbox spans every still in this chapter (featured first).
  const lightboxItems: MediaItem[] = [...(featured ? [featured] : []), ...photos];
  const [index, setIndex] = useState<number | null>(null);
  const openAt = (item: MediaItem) => setIndex(lightboxItems.findIndex((m) => m.id === item.id));
  const chapterLabel = `${section.title} ${section.titleEm}`.trim();

  return (
    <section id={section.id} className={`tone-section tone-${section.tone}`}>
      <div className="mx-auto mb-12 max-w-chapter text-center">
        <Reveal>
          <p className="chapter-mark">{section.mark}</p>
          <h2 className="chapter-title mx-auto">
            {section.title} <em>{section.titleEm}</em>.
          </h2>
          {section.blurb && (
            <p className="capsule-blurb mx-auto mt-6 text-center">{section.blurb}</p>
          )}
        </Reveal>
      </div>

      {/* FEATURE — one large frame, then a grid of the rest. */}
      {section.layout === "feature" && featured && (
        <Reveal>
          <FeatureFrame item={featured} label={chapterLabel} onOpen={() => openAt(featured)} />
        </Reveal>
      )}

      {/* A clip inside a non-film chapter — e.g. the processional in the ceremony,
         placed between the feature frame and the grid. */}
      {section.layout !== "film" && films.length > 0 && (
        <Reveal className="mt-4">
          <div className="space-y-4">
            {films.map((f) => (
              <Film key={f.id} film={f} className="max-w-chapter" />
            ))}
          </div>
        </Reveal>
      )}

      {/* GRID / GALLERY / the photo half of FEATURE — cells cascade in. */}
      {section.layout !== "film" && photos.length > 0 && (
        <PhotoGrid photos={photos} label={chapterLabel} onOpen={openAt} className="mt-4" />
      )}

      {/* FILM — interleave each clip with a slice of stills (crescendo). */}
      {section.layout === "film" && (
        <FilmReel films={films} photos={photos} label={chapterLabel} onOpen={openAt} />
      )}

      <Lightbox
        items={lightboxItems}
        index={index}
        onClose={() => setIndex(null)}
        onIndexChange={setIndex}
      />
    </section>
  );
}

function FeatureFrame({ item, label, onOpen }: { item: MediaItem; label: string; onOpen: () => void }) {
  // Landscape features run full-bleed; portrait features sit in a centred,
  // properly-proportioned frame so a single/pair subject is never cropped to a
  // thin head-and-shoulders band.
  const portrait = !!item.width && !!item.height && item.height > item.width;
  return (
    <button
      onClick={onOpen}
      aria-label={item.caption || "View photograph"}
      className={
        portrait
          ? "relative mx-auto block aspect-[4/5] max-h-[84svh] w-full max-w-[780px] overflow-hidden bg-cream-deep"
          : "relative block h-[64svh] max-h-[760px] w-full overflow-hidden bg-cream-deep sm:h-[78svh]"
      }
    >
      <Image
        src={item.src}
        alt={altFor(item, label)}
        fill
        sizes={portrait ? "(max-width: 800px) 100vw, 780px" : "100vw"}
        placeholder={item.blurDataURL ? "blur" : "empty"}
        blurDataURL={item.blurDataURL}
        className="object-cover"
        style={{ objectPosition: `center ${item.focusY ?? "32%"}` }}
      />
      {item.caption && (
        <span
          className="absolute bottom-5 left-5 font-serif text-[0.9rem] lowercase italic text-cream/90"
          style={{ letterSpacing: "0.2em", textShadow: "0 2px 18px rgba(0,0,0,0.6)" }}
        >
          {item.caption}
        </span>
      )}
    </button>
  );
}

function PhotoGrid({
  photos,
  label,
  onOpen,
  className,
}: {
  photos: MediaItem[];
  label: string;
  onOpen: (item: MediaItem) => void;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const parent = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.07, delayChildren: reduce ? 0 : 0.04 } },
  };
  const child = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.85, ease } } };

  return (
    <motion.div
      className={`capsule-grid${className ? ` ${className}` : ""}`}
      data-count={photos.length}
      variants={parent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      {photos.map((p, i) => {
        const wide = !!p.width && !!p.height && p.width > p.height * 1.2;
        return (
        <motion.button
          key={p.id}
          variants={child}
          className={`cell${wide ? " wide" : ""}`}
          onClick={() => onOpen(p)}
          aria-label={`View photograph ${i + 1} of ${photos.length}`}
        >
          <Image
            src={p.src}
            alt={altFor(p, label)}
            fill
            // the grid caps at 1400px, so cells top out near 470px (930px wide)
            sizes={
              wide
                ? "(max-width: 760px) 100vw, (max-width: 1400px) 66vw, 930px"
                : "(max-width: 760px) 50vw, (max-width: 1400px) 33vw, 470px"
            }
            placeholder={p.blurDataURL ? "blur" : "empty"}
            blurDataURL={p.blurDataURL}
            className="object-cover"
            style={p.focusY ? { objectPosition: `center ${p.focusY}` } : undefined}
          />
        </motion.button>
        );
      })}
    </motion.div>
  );
}

/** Each film, full width, followed by a grid slice of stills — film, photos,
 *  film, photos … so the energy keeps building toward the last clip. */
function FilmReel({
  films,
  photos,
  label,
  onOpen,
}: {
  films: MediaItem[];
  photos: MediaItem[];
  label: string;
  onOpen: (item: MediaItem) => void;
}) {
  const groups = Math.max(films.length, 1);
  const per = Math.ceil(photos.length / groups);

  return (
    <div className="space-y-4">
      {films.map((film, i) => {
        const slice = photos.slice(i * per, (i + 1) * per);
        return (
          <div key={film.id} className="space-y-4">
            <Reveal>
              <Film film={film} className="max-w-chapter" />
            </Reveal>
            {slice.length > 0 && (
              <PhotoGrid photos={slice} label={label} onOpen={onOpen} />
            )}
          </div>
        );
      })}
      {/* any stills beyond the last film group */}
      {photos.length > per * groups && (
        <PhotoGrid photos={photos.slice(per * groups)} label={label} onOpen={onOpen} />
      )}
    </div>
  );
}
