import { letters, lettersArePlaceholder, type Letter } from "@/content/letters";
import { Reveal } from "@/components/Reveal";

/**
 * Chapter V — Letters. A Vanity-Fair pull-quote spread: short notes in mixed
 * sizes, laid out as an asymmetric wall via CSS columns. Each card is an italic
 * quote with a small-caps attribution.
 */
const SIZE: Record<NonNullable<Letter["size"]>, string> = {
  lg: "text-[clamp(1.5rem,2.6vw,2.1rem)]",
  md: "text-[clamp(1.25rem,1.9vw,1.6rem)]",
  sm: "text-[clamp(1.1rem,1.5vw,1.3rem)]",
};

export function Letters() {
  return (
    <section id="letters" className="bg-cream">
      <div className="mx-auto max-w-chapter px-6 py-[var(--section-y)] sm:px-10">
        <Reveal>
          <p className="chapter-mark">Chapter V</p>
          <h2 className="chapter-title mb-3">
            In their <em>words</em>.
          </h2>
          {lettersArePlaceholder && (
            <p className="mt-4 max-w-[42ch] font-serif text-[1.05rem] italic text-stone">
              The notes themselves are gathered after the weekend. What follows
              shows the shape they'll take.
            </p>
          )}
        </Reveal>

        <Reveal>
          <div className="mt-14 [column-gap:clamp(1.5rem,3vw,3rem)] sm:[column-count:2] lg:[column-count:3]">
            {letters.map((l) => (
              <figure
                key={l.id}
                className="mb-8 break-inside-avoid border-t pt-6"
                style={{ borderColor: "var(--rule)" }}
              >
                <blockquote
                  className={`font-serif font-light italic leading-snug text-ink ${
                    SIZE[l.size ?? "md"]
                  } ${l.placeholder ? "text-ink-soft/80" : ""}`}
                >
                  &ldquo;{l.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4">
                  {l.placeholder ? (
                    <span className="font-serif text-[0.95rem] italic text-stone">
                      — in time
                    </span>
                  ) : (
                    <span
                      className="font-display text-[0.72rem] uppercase"
                      style={{
                        color: "var(--gold)",
                        letterSpacing: "0.32em",
                        textIndent: "0.32em",
                      }}
                    >
                      {l.speakerRole ? `${l.speakerRole} — ` : ""}
                      {l.speaker}
                    </span>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
