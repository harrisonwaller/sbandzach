/**
 * The Memory Capsule narrative. The page is an ordered list of sections, each
 * with a TONE on a light→dark continuum (ivory → dusk → dark → darker) — the
 * background dims as you scroll, which is the whole "quiet album that turns into
 * a film" idea. Sections reference media by id; resolve() looks them up from the
 * generated manifest. Nothing here is hardcoded in components.
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
    id: "morning",
    mark: "Chapter I",
    title: "The morning",
    titleEm: "of",
    blurb: "Before the vows — a bouquet, a quiet hour, the light off the water.",
    tone: "ivory",
    layout: "feature",
    featuredId: "ceremony-morning-01",
    itemIds: [
      "ceremony-morning-02",
      "ceremony-morning-03",
      "ceremony-morning-04",
      "ceremony-morning-05",
      "ceremony-morning-06",
    ],
  },
  {
    id: "aisle",
    mark: "Chapter II",
    title: "Down the",
    titleEm: "aisle",
    blurb: "On the green, with the lake behind them.",
    tone: "ivory",
    layout: "feature",
    featuredId: "ceremony-aisle-01",
    itemIds: [
      "ceremony-couple-01",
      "ceremony-couple-02",
      "ceremony-couple-03",
      "ceremony-couple-04",
    ],
  },
  {
    id: "details",
    mark: "Chapter III",
    title: "In the",
    titleEm: "details",
    blurb: "The words, the flowers, the cake.",
    tone: "ivory",
    layout: "grid",
    itemIds: [
      "ceremony-detail-01",
      "ceremony-detail-02",
      "ceremony-detail-03",
      "ceremony-detail-04",
      "ceremony-detail-05",
    ],
  },
  {
    id: "gather",
    mark: "Chapter IV",
    title: "The party",
    titleEm: "gathers",
    blurb: "Golden hour — and everyone we love, gathering.",
    tone: "dusk",
    layout: "gallery",
    itemIds: [
      "cocktail-gather-01",
      "cocktail-gather-02",
      "cocktail-gather-03",
      "cocktail-gather-04",
      "cocktail-gather-05",
      "cocktail-gather-06",
      "cocktail-gather-07",
      "cocktail-gather-08",
      "cocktail-gather-09",
      "cocktail-gather-10",
      "cocktail-gather-11",
      "cocktail-gather-12",
    ],
  },
  {
    id: "reception",
    mark: "Chapter V",
    title: "The",
    titleEm: "reception",
    blurb: "Then the lights came down.",
    tone: "dark",
    layout: "film",
    filmIds: ["reception-film"],
    itemIds: [
      "reception-recep-01",
      "reception-recep-02",
      "reception-recep-03",
      "reception-recep-04",
    ],
  },
  {
    id: "party",
    mark: "Chapter VI",
    title: "Until the lights",
    titleEm: "came up",
    blurb: "The floor was full until the very last song.",
    tone: "darker",
    layout: "film",
    filmIds: ["party-film-1", "party-film-2", "party-film-3"],
    itemIds: [
      "afterparty-party-01",
      "afterparty-party-02",
      "afterparty-party-03",
      "afterparty-party-04",
      "afterparty-party-05",
      "afterparty-party-06",
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
