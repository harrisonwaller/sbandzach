/**
 * The Memory Capsule narrative. The page is an ordered list of sections, each
 * with a TONE on a light→dark continuum (ivory → dusk → dark → darker) — the
 * background dims as you scroll, which is the whole "quiet album that turns into
 * a film" idea. Sections reference media by id; resolve() looks them up from the
 * generated manifest. Nothing here is hardcoded in components.
 *
 * Photo assignments were verified against full-size frames (not thumbnails), so
 * each chapter holds what it claims: the morning is getting-ready, the vows are
 * the ceremony, the green is the bridal party + the cake, and the dark chapters
 * are the tented reception and the dance floor.
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
    blurb: "Before the vows — getting ready, a bouquet, the light off the water.",
    tone: "ivory",
    layout: "feature",
    featuredId: "ceremony-morning-01",
    itemIds: [
      "ceremony-couple-03",
      "ceremony-detail-04",
      "ceremony-detail-05",
      "ceremony-morning-05",
      "cocktail-gather-12",
    ],
  },
  {
    id: "vows",
    mark: "Chapter II",
    title: "The",
    titleEm: "vows",
    blurb: "Down the aisle, on the green, with the lake behind them.",
    tone: "ivory",
    layout: "feature",
    featuredId: "ceremony-aisle-01",
    itemIds: ["ceremony-detail-01", "ceremony-couple-02", "ceremony-morning-02"],
  },
  {
    id: "green",
    mark: "Chapter III",
    title: "On the",
    titleEm: "green",
    blurb: "The bridal party, the families, the cake — and everyone we love, gathering.",
    tone: "dusk",
    layout: "gallery",
    itemIds: [
      "cocktail-gather-01",
      "cocktail-gather-03",
      "cocktail-gather-04",
      "cocktail-gather-08",
      "ceremony-morning-03",
      "cocktail-gather-06",
      "cocktail-gather-07",
      "cocktail-gather-11",
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
    itemIds: ["reception-recep-04", "ceremony-couple-01", "afterparty-party-06"],
  },
  {
    id: "party",
    mark: "Chapter V",
    title: "Until the lights",
    titleEm: "came up",
    blurb: "The floor was full until the very last song.",
    tone: "darker",
    layout: "film",
    filmIds: ["party-film-1", "party-film-2", "party-film-3"],
    itemIds: [
      "reception-recep-01",
      "afterparty-party-01",
      "afterparty-party-02",
      "afterparty-party-03",
      "afterparty-party-05",
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
