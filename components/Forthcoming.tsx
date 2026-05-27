import { forthcoming } from "@/content/forthcoming";
import { Reveal } from "@/components/Reveal";

/**
 * Chapter VII — Forthcoming. The graceful "gathered after, kept here" note for
 * everything that fills in once the weekend has happened. Removed post-wedding.
 */
export function Forthcoming() {
  return (
    <section id="forthcoming" className="bg-cream-deep">
      <div className="mx-auto max-w-[760px] px-6 py-[var(--section-y)] text-center sm:px-10">
        <Reveal>
          <p className="chapter-mark" style={{ marginBottom: "1.75rem" }}>
            {forthcoming.mark}
          </p>
          <h2 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-tight">
            {forthcoming.title}{" "}
            <em className="font-serif font-light italic text-gold">
              {forthcoming.titleEm}
            </em>
            .
          </h2>
          <p className="mx-auto mt-7 max-w-prose font-serif text-[1.25rem] italic leading-relaxed text-ink-soft">
            {forthcoming.text}
          </p>
        </Reveal>

        <Reveal>
          <ul className="mt-14 flex flex-wrap justify-center gap-x-3 gap-y-4">
            {forthcoming.cards.map((c, i) => (
              <li key={c} className="flex items-center">
                {i > 0 && (
                  <span aria-hidden className="mr-3 text-gold/50">
                    ·
                  </span>
                )}
                <span
                  className="font-display text-[0.7rem] uppercase text-stone"
                  style={{ letterSpacing: "0.4em", textIndent: "0.4em" }}
                >
                  {c}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
