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
    quote: "Here is where a few short words will live — the ones too brief for a toast, too true to leave unsaid.",
    speaker: "",
    size: "lg",
    placeholder: true,
  },
  {
    id: "ph-2",
    quote: "A line, a memory, a small blessing for the road south.",
    speaker: "",
    size: "sm",
    placeholder: true,
  },
  {
    id: "ph-3",
    quote: "Each note will keep the voice of whoever wrote it.",
    speaker: "",
    size: "md",
    placeholder: true,
  },
  {
    id: "ph-4",
    quote: "Some funny, some quiet — gathered together the way a guest book is.",
    speaker: "",
    size: "sm",
    placeholder: true,
  },
];

/** Real letters go here. While empty, the placeholders demonstrate the layout. */
const real: Letter[] = [];

export const letters: Letter[] = real.length > 0 ? real : placeholders;

/** True while only sample cards are present — drives the "forthcoming" note. */
export const lettersArePlaceholder = real.length === 0;
