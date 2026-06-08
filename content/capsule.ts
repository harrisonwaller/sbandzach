/**
 * The Memory Capsule narrative. The page is an ordered list of sections, each
 * with a TONE on a light→dark continuum (ivory → dusk → dark → darker) — the
 * background dims as you scroll, so a quiet album turns into a film.
 *
 * Every photo here was chosen from full-size frames for STORY and EMOTION
 * (getting ready, walking in with her dad, the cake by the lake, the dance
 * floor) over repetitive posed shots — and near-duplicates were cut hard.
 */
import { allMedia, type MediaItem } from "@/content/media";

export type Tone = "ivory" | "dusk" | "dark" | "darker";
export type Layout = "feature" | "gallery" | "grid" | "film";

export type CapsuleSection = {
  id: string;
  mark: string;
  title: string;
  titleEm: string;
  blurb?: string;
  tone: Tone;
  layout: Layout;
  featuredId?: string;
  itemIds?: string[];
  filmIds?: string[];
};

export const capsule: CapsuleSection[] = [
  {
    id: "ready",
    mark: "Chapter I",
    title: "Getting",
    titleEm: "ready",
    blurb: "The lakehouse, the last laugh with the girls, the final few minutes of just us.",
    tone: "ivory",
    layout: "feature",
    featuredId: "ceremony-ready-01",
    itemIds: ["ceremony-ready-02", "ceremony-ready-03", "ceremony-ready-04"],
  },
  {
    id: "ceremony",
    mark: "Chapter II",
    title: "The",
    titleEm: "ceremony",
    blurb: "Down the aisle with her dad — and the vows on the green, with the lake behind them.",
    tone: "ivory",
    layout: "feature",
    featuredId: "ceremony-cer-01",
    itemIds: ["ceremony-cer-02", "ceremony-cer-03", "ceremony-cer-04"],
  },
  {
    id: "green",
    mark: "Chapter III",
    title: "On the",
    titleEm: "green",
    blurb: "The bridal party, the cake by the water, and everyone we love.",
    tone: "dusk",
    layout: "gallery",
    itemIds: [
      "cocktail-green-01",
      "cocktail-green-02",
      "cocktail-green-03",
      "cocktail-green-04",
      "cocktail-cake",
    ],
  },
  {
    id: "reception",
    mark: "Chapter IV",
    title: "The",
    titleEm: "reception",
    blurb: "Then the lights came down.",
    tone: "dark",
    layout: "film",
    filmIds: ["reception-film"],
    itemIds: ["reception-dance-01", "reception-dance-02"],
  },
  {
    id: "party",
    mark: "Chapter V",
    title: "Until the lights",
    titleEm: "came up",
    blurb: "The floor was full until the very last song.",
    tone: "darker",
    layout: "film",
    filmIds: ["party-film"],
    itemIds: [
      "afterparty-party-01",
      "afterparty-party-02",
      "afterparty-party-03",
      "afterparty-party-04",
    ],
  },
];

const BY_ID = new Map(allMedia({ includeVault: false }).map((m) => [m.id, m]));

/** Resolve an ordered list of ids to media items, skipping any that are missing. */
export function resolve(ids: string[] = []): MediaItem[] {
  return ids
    .map((id) => BY_ID.get(id))
    .filter((m): m is MediaItem => Boolean(m));
}

/** The single full-bleed hero frame — the kiss on the green. */
export function heroImage(): MediaItem | undefined {
  return BY_ID.get("hero-kiss");
}
