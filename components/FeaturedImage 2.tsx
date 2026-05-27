import Image from "next/image";
import { featuredImage } from "@/content/media";

/**
 * The first full photographic moment — a single full-bleed frame after the
 * hero, with a quiet italic caption bottom-left.
 */
export function FeaturedImage() {
  const img = featuredImage();
  if (!img) return null;

  return (
    <section className="relative h-[80svh] w-full overflow-hidden bg-ink sm:h-[100svh]">
      <Image
        src={img.src}
        alt={img.title ?? "Sara Beth and Zachary"}
        fill
        priority
        sizes="100vw"
        placeholder={img.blurDataURL ? "blur" : "empty"}
        blurDataURL={img.blurDataURL}
        className="object-cover"
        style={{ filter: "contrast(1.02) saturate(0.96)", objectPosition: "center 38%" }}
      />
      {/* gentle bottom scrim so the caption stays legible on any frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background:
            "linear-gradient(0deg, rgba(0,0,0,0.35) 0%, transparent 100%)",
        }}
      />
      {img.caption && (
        <figcaption
          className="absolute bottom-6 left-6 font-serif text-[0.95rem] lowercase italic text-cream sm:bottom-10 sm:left-10"
          style={{
            letterSpacing: "0.22em",
            textShadow: "0 2px 20px rgba(0,0,0,0.5)",
          }}
        >
          {img.caption}
        </figcaption>
      )}
    </section>
  );
}
