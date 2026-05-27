import { Reveal } from "@/components/Reveal";
import { ARCHIVE_CHAPTERS } from "@/content/media";

/**
 * A complete preview of a chapter whose real content hasn't arrived yet — it
 * shows the actual layout the section will use (the Voices track, the Archive
 * grid + filters, the Letters wall), so the full vision is visible now. Never
 * fake content; replaced by the real section once its media/letters exist.
 */
type Variant = "voices" | "letters" | "archive";
type Tone = "dark" | "cream" | "creamDeep";

const TONES: Record<Tone, { bg: string; text: string; line: string }> = {
  dark: { bg: "#0f0d0b", text: "var(--cream)", line: "rgba(198,155,109,0.5)" },
  cream: { bg: "var(--cream)", text: "var(--ink)", line: "rgba(124,83,32,0.4)" },
  creamDeep: {
    bg: "var(--cream-deep)",
    text: "var(--ink)",
    line: "rgba(124,83,32,0.4)",
  },
};

export function SectionPlaceholder({
  id,
  mark,
  title,
  titleEm,
  description,
  variant,
  tone = "cream",
}: {
  id: string;
  mark: string;
  title: string;
  titleEm: string;
  description: string;
  variant: Variant;
  tone?: Tone;
}) {
  const t = TONES[tone];
  const onDark = tone === "dark";
  const wide = variant !== "voices";

  return (
    <section id={id} style={{ background: t.bg, color: t.text }}>
      <div
        className={`mx-auto px-6 py-[var(--section-y)] text-center sm:px-10 ${
          wide ? "max-w-gallery" : "max-w-[760px]"
        }`}
      >
        <Reveal>
          <p
            className="chapter-mark"
            style={onDark ? { color: "var(--gold-soft)" } : undefined}
          >
            {mark}
          </p>
          <h2
            className="font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-tight"
            style={{ color: t.text }}
          >
            {title}{" "}
            <em
              className="font-serif font-light italic"
              style={{ color: onDark ? "var(--gold-soft)" : "var(--gold)" }}
            >
              {titleEm}
            </em>
            .
          </h2>
          <p
            className="mx-auto mt-6 max-w-[46ch] font-serif text-[1.2rem] leading-relaxed"
            style={{ color: onDark ? "rgba(245,240,230,0.72)" : "var(--ink-soft)" }}
          >
            {description}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12">
            {variant === "voices" && <VoicesPreview line={t.line} />}
            {variant === "letters" && <LettersPreview line={t.line} />}
            {variant === "archive" && <ArchivePreview line={t.line} />}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p
            className="mt-12 font-serif text-[0.82rem] font-semibold uppercase"
            style={{
              color: onDark ? "var(--gold-soft)" : "var(--gold-deep)",
              letterSpacing: "0.18em",
            }}
          >
            Kept here, after the weekend
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/** Previews the real Voices track: pull-quote line, play button, waveform. */
function VoicesPreview({ line }: { line: string }) {
  const bars = Array.from({ length: 53 }, (_, i) =>
    Math.round(5 + Math.abs(Math.sin(i * 0.6)) * 26 + (i % 4) * 3),
  );
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center" aria-hidden>
      {/* thin play button — non-interactive preview */}
      <div
        className="flex h-16 w-16 items-center justify-center rounded-full opacity-60"
        style={{ border: "1px solid var(--gold-soft)" }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18">
          <path d="M5 3.5l9 5.5-9 5.5z" fill="var(--cream)" />
        </svg>
      </div>
      {/* waveform */}
      <div className="mt-9 flex h-14 items-center gap-[3px]">
        {bars.map((h, i) => (
          <span
            key={i}
            style={{ width: 2, height: h, background: line, borderRadius: 2 }}
          />
        ))}
      </div>
      {/* transcript hint */}
      <div className="mt-9 w-full max-w-md space-y-3">
        {[0.9, 0.7, 0.5].map((w, i) => (
          <div
            key={i}
            className="mx-auto h-px"
            style={{ width: `${w * 100}%`, background: line, opacity: 0.5 }}
          />
        ))}
      </div>
    </div>
  );
}

/** Previews the Letters wall: a few mixed-size outlined cards. */
function LettersPreview({ line }: { line: string }) {
  const cards = [
    { h: 130 },
    { h: 96 },
    { h: 116 },
  ];
  return (
    <div
      className="mx-auto grid max-w-3xl grid-cols-1 gap-5 sm:grid-cols-3"
      aria-hidden
    >
      {cards.map((c, i) => (
        <div
          key={i}
          className="flex flex-col justify-center px-6"
          style={{
            borderTop: `1px solid ${line}`,
            minHeight: c.h,
          }}
        >
          <span
            className="font-display"
            style={{ fontSize: "2.5rem", lineHeight: 0.5, color: line }}
          >
            &ldquo;
          </span>
          <div className="mt-4 space-y-2">
            <div className="h-px w-full" style={{ background: line, opacity: 0.5 }} />
            <div className="h-px w-4/5" style={{ background: line, opacity: 0.5 }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Previews the Archive: the filter chips + a grid of empty frames. */
function ArchivePreview({ line }: { line: string }) {
  return (
    <div className="mx-auto max-w-gallery" aria-hidden>
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {["All", ...ARCHIVE_CHAPTERS.map((c) => c.label)].map((label, i) => (
          <span
            key={label}
            className="font-serif text-[0.7rem] font-semibold uppercase"
            style={{
              letterSpacing: "0.14em",
              padding: "0.5rem 1rem",
              border: `1px solid ${line}`,
              color: "var(--gold-deep)",
              opacity: i === 0 ? 0.9 : 0.6,
            }}
          >
            {label}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[4/5]"
            style={{ border: `1px solid ${line}`, opacity: 0.6 }}
          />
        ))}
      </div>
    </div>
  );
}
