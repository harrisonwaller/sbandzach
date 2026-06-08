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
    blurb: "Down the aisle with her dad, the vows by the lake, and the moment it was real.",
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
    blurb: "The wedding party, the cake by the water, and everyone we love.",
    tone: "dusk",
    layout: "feature",
    featuredId: "cocktail-green-01",
    itemIds: [
      "cocktail-green-02",
      "cocktail-green-03",
      "cocktail-green-04",
      "cocktail-green-05",
      "cocktail-cake",
    ],
  },
  {
    id: "party",
    mark: "Chapter IV",
    title: "Until the lights",
    titleEm: "came up",
    blurb: "The lights came down, the floor filled up, and it stayed full until the very last song.",
    tone: "darker",
    layout: "film",
    // Three clips — the purple reception, then the teal peak — each followed by
    // a slice of the floor, so the energy keeps building toward the last song.
    filmIds: ["reception-film", "party-film-2", "party-film"],
    itemIds: [
      // warm / purple — couple + family
      "reception-dance-01",
      "reception-dance-02",
      "reception-dance-03",
      "reception-dance-04",
      "reception-dance-05",
      "reception-dance-06",
      "reception-dance-07",
      // teal — the peak of the night
      "afterparty-party-01",
      "afterparty-party-02",
      "afterparty-party-03",
      "afterparty-party-04",
      "afterparty-party-05",
      "afterparty-party-06",
      "afterparty-party-07",
      "afterparty-party-08",
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
