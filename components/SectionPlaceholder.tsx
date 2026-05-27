import { Reveal } from "@/components/Reveal";

/**
 * An elegant "after the weekend" preview for a chapter whose real content hasn't
 * arrived yet. Shows the chapter's place in the structure with a restrained
 * visual hint — never fake content. Replaced automatically by the real section
 * once its media/letters exist.
 */
type Variant = "waveform" | "frames" | "quote";
type Tone = "dark" | "cream" | "creamDeep";

const TONES: Record<Tone, { bg: string; text: string }> = {
  dark: { bg: "#0f0d0b", text: "var(--cream)" },
  cream: { bg: "var(--cream)", text: "var(--ink)" },
  creamDeep: { bg: "var(--cream-deep)", text: "var(--ink)" },
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
  const hintColor = onDark
    ? "rgba(198,155,109,0.55)"
    : "rgba(124,83,32,0.45)";

  return (
    <section id={id} style={{ background: t.bg, color: t.text }}>
      <div className="mx-auto max-w-[760px] px-6 py-[var(--section-y)] text-center sm:px-10">
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
            <em className="font-serif font-light italic" style={{ color: "var(--gold)" }}>
              {titleEm}
            </em>
            .
          </h2>

          <div className="mt-10 flex justify-center" aria-hidden>
            <Hint variant={variant} color={hintColor} />
          </div>

          <p
            className="mx-auto mt-10 max-w-[44ch] font-serif text-[1.2rem] leading-relaxed"
            style={{ color: onDark ? "rgba(245,240,230,0.7)" : "var(--ink-soft)" }}
          >
            {description}
          </p>
          <p
            className="mt-8 font-serif text-[0.8rem] font-semibold uppercase"
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

function Hint({ variant, color }: { variant: Variant; color: string }) {
  if (variant === "waveform") {
    // a quiet waveform silhouette
    const bars = Array.from({ length: 41 }, (_, i) => {
      const h = 6 + Math.abs(Math.sin(i * 0.7)) * 30 + (i % 3) * 4;
      return h;
    });
    return (
      <div className="flex h-12 items-center gap-[3px]">
        {bars.map((h, i) => (
          <span
            key={i}
            style={{
              width: 2,
              height: h,
              background: color,
              borderRadius: 2,
            }}
          />
        ))}
      </div>
    );
  }
  if (variant === "quote") {
    return (
      <span
        className="font-display"
        style={{ fontSize: "5rem", lineHeight: 0.6, color }}
      >
        &ldquo;
      </span>
    );
  }
  // frames: a small row of empty photo frames
  return (
    <div className="flex items-end gap-3">
      {[
        { w: 46, h: 58 },
        { w: 64, h: 48 },
        { w: 46, h: 58 },
      ].map((f, i) => (
        <span
          key={i}
          style={{ width: f.w, height: f.h, border: `1px solid ${color}` }}
        />
      ))}
    </div>
  );
}
