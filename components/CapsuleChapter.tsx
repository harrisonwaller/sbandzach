"use client";

import { useState } from "react";
import Image from "next/image";
import type { MediaItem } from "@/content/media";
import { type CapsuleSection, resolve } from "@/content/capsule";
import { Reveal } from "@/components/Reveal";
import { Lightbox } from "@/components/Lightbox";
import { Film } from "@/components/Film";

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
          <FeatureFrame item={featured} onOpen={() => openAt(featured)} />
        </Reveal>
      )}

      {/* GRID / GALLERY / the photo half of FEATURE. */}
      {section.layout !== "film" && photos.length > 0 && (
        <Reveal className="mt-4">
          <PhotoGrid photos={photos} onOpen={openAt} />
        </Reveal>
      )}

      {/* FILM — interleave each clip with a slice of stills (crescendo). */}
      {section.layout === "film" && (
        <FilmReel films={films} photos={photos} onOpen={openAt} />
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

function FeatureFrame({ item, onOpen }: { item: MediaItem; onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      aria-label={item.caption || "View photograph"}
      className="relative block h-[64svh] max-h-[760px] w-full overflow-hidden bg-cream-deep sm:h-[78svh]"
    >
      <Image
        src={item.src}
        alt={item.caption ?? ""}
        fill
        sizes="100vw"
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
  onOpen,
}: {
  photos: MediaItem[];
  onOpen: (item: MediaItem) => void;
}) {
  return (
    <div className="capsule-grid">
      {photos.map((p, i) => (
        <button
          key={p.id}
          className="cell"
          onClick={() => onOpen(p)}
          aria-label={`View photograph ${i + 1} of ${photos.length}`}
        >
          <Image
            src={p.src}
            alt={p.caption ?? ""}
            fill
            sizes="(max-width: 760px) 50vw, 33vw"
            placeholder={p.blurDataURL ? "blur" : "empty"}
            blurDataURL={p.blurDataURL}
            className="object-cover"
            style={p.focusY ? { objectPosition: `center ${p.focusY}` } : undefined}
          />
        </button>
      ))}
    </div>
  );
}

/** Each film, full width, followed by a grid slice of stills — film, photos,
 *  film, photos … so the energy keeps building toward the last clip. */
function FilmReel({
  films,
  photos,
  onOpen,
}: {
  films: MediaItem[];
  photos: MediaItem[];
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
              <Reveal>
                <PhotoGrid photos={slice} onOpen={onOpen} />
              </Reveal>
            )}
          </div>
        );
      })}
      {/* any stills beyond the last film group */}
      {photos.length > per * groups && (
        <Reveal>
          <PhotoGrid photos={photos.slice(per * groups)} onOpen={onOpen} />
        </Reveal>
      )}
    </div>
  );
}
