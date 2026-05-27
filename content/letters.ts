/**
 * The Letters wall — Chapter V. Shorter words from people who didn't give a
 * full speech. Pure text, so they live here rather than in the media pipeline.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * TO ADD A REAL LETTER (after the wedding):
 *   Copy one block below, replace the quote and the name, and set placeholder
 *   to false. Keep them short — one or two sentences. Remove the placeholders.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * The entries marked `placeholder: true` are sample text used only to show the
 * layout before real notes are gathered. They are NOT words anyone has said.
 * They never go to print and are filtered out when real letters exist.
 */
export type Letter = {
  id: string;
  quote: string;
  speaker: string;
  speakerRole?: string;
  /** Larger cards anchor the asymmetric layout. */
  size?: "sm" | "md" | "lg";
  placeholder?: boolean;
};

const placeholders: Letter[] = [
  {
    id: "ph-1",
    quote: "This is where a few short words will live — the ones too brief for a toast, too true to leave unsaid.",
    speaker: "A sample card",
    speakerRole: "Placeholder",
    size: "lg",
    placeholder: true,
  },
  {
    id: "ph-2",
    quote: "Real notes from family and friends arrive after the weekend. The layout is shown here with sample text.",
    speaker: "A sample card",
    speakerRole: "Placeholder",
    size: "sm",
    placeholder: true,
  },
  {
    id: "ph-3",
    quote: "Each note keeps the voice of whoever wrote it — a line, a memory, a small blessing for the road south.",
    speaker: "A sample card",
    speakerRole: "Placeholder",
    size: "md",
    placeholder: true,
  },
  {
    id: "ph-4",
    quote: "Some will be funny. Some will be quiet. They'll sit together here the way a guest book does.",
    speaker: "A sample card",
    speakerRole: "Placeholder",
    size: "sm",
    placeholder: true,
  },
];

/** Real letters go here. While empty, the placeholders demonstrate the layout. */
const real: Letter[] = [];

export const letters: Letter[] = real.length > 0 ? real : placeholders;

/** True while only sample cards are present — drives the "forthcoming" note. */
export const lettersArePlaceholder = real.length === 0;
