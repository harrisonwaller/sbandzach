import Image from "next/image";
import { finaleImage } from "@/content/capsule";
import { Reveal } from "@/components/Reveal";

/**
 * The closing full-bleed frame — fireworks over the lake at the end of the
 * night. The book opens on a quiet kiss and shuts on the sky lighting up; this
 * bleeds straight into the ink footer, so the page never lifts back to cream.
 */
export function Finale() {
  const img = finaleImage();
  if (!img) return null;

  return (
    <section
      aria-label="Fireworks over the lake"
      className="relative flex min-h-[86svh] flex-col items-center justify-end overflow-hidden bg-[#0a0712] px-6 pb-[14vh] text-center"
    >
      <Image
        src={img.src}
        alt="Fireworks over the lake"
        fill
        sizes="100vw"
        placeholder={img.blurDataURL ? "blur" : "empty"}
        blurDataURL={img.blurDataURL}
        // Cover-fill on phones (the portrait frame fills tall screens); on wider
        // screens contain it so the whole shot — fireworks AND the couple on the
        // dock — is visible instead of a cropped band of dark sky.
        className="object-cover md:object-contain"
        style={{ objectPosition: `center ${img.focusY ?? "50%"}` }}
      />
      {/* fade the bottom into the ink footer (kept subtle so it never crops the shot) */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,7,18,0) 0%, rgba(10,7,18,0.85) 100%)",
        }}
      />
      <Reveal className="relative">
        <p
          className="font-serif text-[1.15rem] lowercase italic text-cream/85"
          style={{ letterSpacing: "0.16em", textShadow: "0 2px 18px rgba(0,0,0,0.7)" }}
        >
          one more, over the lake
        </p>
      </Reveal>
    </section>
  );
}
