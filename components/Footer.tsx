import { site } from "@/content/site";

/**
 * Dark ink. The mark, the closing line, the date. Nothing else.
 */
export function Footer() {
  return (
    <footer className="bg-ink px-6 pb-12 pt-20 text-center text-cream">
      <div
        className="font-serif text-[1.7rem] font-semibold text-cream"
        style={{ letterSpacing: "0.32em", textIndent: "0.32em" }}
      >
        {site.markFull}
      </div>
      <p className="mt-6 font-serif text-[1.1rem] italic text-cream/75">
        {site.closing}
      </p>
      <hr className="hairline mx-auto my-8" style={{ background: "var(--gold-soft)" }} />
      <div
        className="font-serif text-[0.95rem] font-medium uppercase"
        style={{
          color: "var(--gold-soft)",
          letterSpacing: "0.32em",
          textIndent: "0.32em",
        }}
      >
        {site.dateRoman}
      </div>
    </footer>
  );
}
