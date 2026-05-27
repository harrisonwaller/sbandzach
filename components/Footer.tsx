import { site } from "@/content/site";

/**
 * Dark ink. The mark, the closing line, the date. Nothing else.
 */
export function Footer() {
  return (
    <footer className="bg-ink px-6 pb-12 pt-20 text-center text-cream">
      <div
        className="font-display text-[1.4rem]"
        style={{ letterSpacing: "0.5em", textIndent: "0.5em" }}
      >
        {site.markFull}
      </div>
      <p className="mt-6 font-serif text-[1rem] italic text-cream/50">
        {site.closing}
      </p>
      <hr className="hairline mx-auto my-8" style={{ background: "var(--gold-soft)" }} />
      <div
        className="font-display text-[0.78rem] uppercase"
        style={{
          color: "var(--gold-soft)",
          letterSpacing: "0.45em",
          textIndent: "0.45em",
        }}
      >
        {site.dateRoman}
      </div>
    </footer>
  );
}
