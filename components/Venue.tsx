import Image from "next/image";
import { venues } from "@/content/venue";
import { allMedia, type MediaItem } from "@/content/media";
import { Reveal } from "@/components/Reveal";

/**
 * Chapter III — The Place. Two venues in an alternating two-column layout, each
 * with restrained copy and a single pull-quote. Until dedicated venue
 * photography exists, the strongest atmospheric engagement frames stand in.
 */

// Atmospheric stand-in frames (coast / garden) keyed by media id.
const FALLBACK_IDS = ["engagement-engagement-16", "engagement-engagement-14"];

function fallbackImage(i: number): MediaItem | undefined {
  const all = allMedia();
  return (
    all.find((m) => m.id === FALLBACK_IDS[i]) ??
    all.filter((m) => m.type === "photo")[i]
  );
}

export function Venue() {
  return (
    <section id="place" className="bg-cream">
      <div className="mx-auto max-w-chapter px-6 py-[var(--section-y)] sm:px-10">
        <div className="space-y-24 sm:space-y-32">
          {venues.map((v, i) => {
            const img = v.image
              ? { src: v.image, blurDataURL: undefined as string | undefined }
              : fallbackImage(i);
            const imageLeft = i % 2 === 0;
            return (
              <Reveal key={v.mark} as="div">
                <div className="grid items-center gap-10 sm:grid-cols-2 sm:gap-16">
                  <div
                    className={`relative aspect-[4/5] overflow-hidden bg-cream-deep ${
                      imageLeft ? "sm:order-1" : "sm:order-2"
                    }`}
                  >
                    {img && (
                      <Image
                        src={img.src}
                        alt={v.imageAlt}
                        fill
                        sizes="(max-width: 640px) 100vw, 45vw"
                        placeholder={img.blurDataURL ? "blur" : "empty"}
                        blurDataURL={img.blurDataURL}
                        className="object-cover"
                      />
                    )}
                  </div>

                  <div className={imageLeft ? "sm:order-2" : "sm:order-1"}>
                    {i === 0 && <p className="chapter-mark">Chapter III</p>}
                    <h2 className="chapter-title mb-7">
                      {v.title} <em>{v.titleEm}</em>.
                    </h2>
                    <div className="max-w-prose space-y-5 font-serif text-[1.2rem] leading-relaxed text-ink-soft">
                      {v.body.map((p, j) => (
                        <p key={j}>{p}</p>
                      ))}
                    </div>
                    <hr className="hairline my-8" />
                    <p className="pull-quote max-w-[20ch] text-ink">
                      {v.pullQuote}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
