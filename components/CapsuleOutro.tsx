import { site } from "@/content/site";
import { Reveal } from "@/components/Reveal";

/**
 * The settle — after the party, the page comes to rest on a dark, quiet close.
 */
export function CapsuleOutro() {
  return (
    <section className="tone-section tone-darker text-center">
      <Reveal>
        <p
          className="font-display text-cream/90"
          style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", letterSpacing: "0.01em" }}
        >
          {site.markFull}
        </p>
        <p
          className="mx-auto mt-7 max-w-[30ch] font-serif text-[1.2rem] font-light italic text-cream/70"
        >
          {site.closing}
        </p>
        <div aria-hidden className="mx-auto mt-9 h-px w-12" style={{ background: "var(--gold-soft)" }} />
      </Reveal>
    </section>
  );
}
