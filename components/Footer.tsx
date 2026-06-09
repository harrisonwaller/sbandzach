import { site } from "@/content/site";

/**
 * Dark ink. The mark, the closing line, the date. Nothing else.
 */
export function Footer() {
  return (
    <footer className="bg-ink px-6 pb-14 pt-24 text-center text-cream">
      <div
        // cream/45 measured 4.1:1 on ink — /55 clears the 4.5:1 AA bar
        className="font-serif text-[0.78rem] uppercase text-cream/55"
        style={{ letterSpacing: "0.34em", textIndent: "0.34em" }}
      >
        {site.markFull}
      </div>
      {/* the names, spelled out — the book closes on them, not a monogram */}
      <h2
        className="mt-5 font-display text-cream"
        style={{ fontSize: "clamp(2.1rem, 6vw, 3.4rem)", lineHeight: 1.0 }}
      >
        {site.names.first}{" "}
        <span className="font-serif text-[0.5em] font-light italic text-gold-soft">&amp;</span>{" "}
        {site.names.second}
      </h2>
      <p className="mx-auto mt-6 max-w-[32ch] font-serif text-[1.1rem] italic text-cream/75">
        {site.closing}
      </p>
      <hr className="hairline mx-auto my-9" style={{ background: "var(--gold-soft)" }} />
      <div
        className="font-serif text-[0.92rem] font-semibold uppercase"
        style={{ color: "var(--gold-soft)", letterSpacing: "0.2em" }}
      >
        {site.dateLong}
      </div>
      <div className="mt-2 font-serif text-[1rem] italic text-cream/60" style={{ letterSpacing: "0.04em" }}>
        {site.location}
      </div>
    </footer>
  );
}
