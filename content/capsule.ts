/**
 * The Memory Capsule narrative. The page is an ordered list of sections, each
 * with a TONE on a light→dark continuum (ivory → dusk → dark → darker) — the
 * background dims as you scroll, so a quiet album turns into a film.
 *
 * The story runs chronologically: the calm of the lake the days before, the
 * morning, the vows, the lawn, the details, the reception, and the party that
 * stayed full until the last song — then fireworks over the water.
 *
 * Reception vs. Party are deliberately separated by light: the reception is the
 * warm, structured half (family, the cake, the first dance, the band); the party
 * is pure teal-lit dance-floor energy.
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
    id: "lake",
    mark: "Chapter I",
    title: "By the",
    titleEm: "lake",
    blurb: "The days before — the water, the old wooden boat, the calm before it all.",
    tone: "ivory",
    layout: "feature",
    featuredId: "friday-bride-lawn",
    itemIds: [
      "friday-walk",
      "friday-boat-aerial",
      "friday-boat",
      "ceremony-cer-01",
      "ceremony-cer-02",
      "ceremony-cer-04",
    ],
  },
  {
    id: "ready",
    mark: "Chapter II",
    title: "Getting",
    titleEm: "ready",
    blurb: "The lakehouse, the robes, the last laugh with the girls before the dress.",
    tone: "ivory",
    layout: "feature",
    featuredId: "ceremony-ready-01",
    itemIds: [
      "ceremony-ready-05",
      "ceremony-groom-girls",
      "ceremony-ready-mirror",
      "ceremony-ready-02",
    ],
  },
  {
    id: "ceremony",
    mark: "Chapter III",
    title: "The",
    titleEm: "ceremony",
    blurb: "Down the aisle with her dad, the vows by the lake, and the kiss that made it theirs.",
    tone: "ivory",
    layout: "feature",
    featuredId: "ceremony-dipkiss",
    filmIds: ["ceremony-processional"],
    itemIds: ["ceremony-aisle", "ceremony-kiss-alt", "ceremony-portrait-01", "ceremony-portrait-02"],
  },
  {
    id: "green",
    mark: "Chapter IV",
    title: "On the",
    titleEm: "green",
    blurb: "The whole wedding party, the girls, and an afternoon on the lawn by the water.",
    tone: "dusk",
    layout: "feature",
    featuredId: "cocktail-party-full",
    itemIds: [
      "cocktail-lineup",
      "cocktail-friends",
      "cocktail-champagne-bar",
      "ceremony-ready-04",
      "cocktail-portrait-03",
    ],
  },
  {
    id: "details",
    mark: "Chapter V",
    title: "The little",
    titleEm: "things",
    blurb: "Champagne by the lake, the signature cocktails, candlelight, and a cake worth the wait.",
    tone: "dusk",
    layout: "feature",
    featuredId: "reception-table",
    itemIds: [
      "cocktail-detail-champagne",
      "cocktail-detail-cocktails",
      "cocktail-detail-cake",
      "reception-tent",
    ],
  },
  {
    id: "reception",
    mark: "Chapter VI",
    title: "The",
    titleEm: "reception",
    blurb: "Into the tent, the cake, the first dance, everyone we love — and a band that would not let anyone sit down.",
    tone: "dark",
    layout: "feature",
    featuredId: "reception-family",
    itemIds: [
      "reception-couple-cocktail",
      "reception-cake-cut",
      "reception-firstdance-crowd",
      "reception-band",
      "reception-groomsmen-night",
      "reception-board-party",
      "reception-portrait-groomsmen",
      "reception-portrait-friends",
    ],
  },
  {
    id: "party",
    mark: "Chapter VII",
    title: "Until the lights",
    titleEm: "came up",
    blurb: "The lights came down, the floor filled up, and it stayed full until the very last song.",
    tone: "darker",
    layout: "film",
    // Three clips — the purple reception, then the teal peak — each followed by
    // a slice of the floor, so the energy keeps building toward the last song.
    filmIds: ["reception-film", "party-film-2", "party-film"],
    itemIds: [
      "afterparty-handsup",
      "afterparty-joy",
      "afterparty-floor-kiss",
      "afterparty-embrace",
      "afterparty-mom-dance",
      "afterparty-party-01",
      "afterparty-party-02",
      "afterparty-party-03",
      "afterparty-party-04",
      "afterparty-hats",
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

/** The closing full-bleed frame — fireworks over the lake at the end of the night. */
export function finaleImage(): MediaItem | undefined {
  return BY_ID.get("afterparty-fireworks");
}
