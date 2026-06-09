/**
 * The Memory Capsule narrative — in true chronological order:
 *   the weekend (bridal luncheon + rehearsal) → the rehearsal dinner →
 *   getting ready → the ceremony → on the green → the little things →
 *   the reception → the after-party → fireworks.
 *
 * Photos are sorted by EVENT, read off the attire: navy blazer + the bride's
 * halter dress = pre-wedding (luncheon / rehearsal / rehearsal dinner); the
 * black tux + the satin ballgown = the wedding day; short dresses under teal
 * light = the after-party. Each section dims the background a little further,
 * so a quiet album warms into a film.
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
    id: "weekend",
    mark: "Chapter I",
    title: "The",
    titleEm: "weekend",
    blurb: "The luncheon, the rehearsal, the lake — the days that led to the day.",
    tone: "ivory",
    layout: "feature",
    featuredId: "friday-bride-lawn",
    filmIds: ["ceremony-processional"],
    itemIds: [
      "friday-walk",
      "friday-boat-aerial",
      "friday-boat",
      "cocktail-friends",
      "ceremony-cer-01",
      "ceremony-cer-02",
    ],
  },
  {
    id: "rehearsal",
    mark: "Chapter II",
    title: "The rehearsal",
    titleEm: "dinner",
    blurb: "The night before — find your seat, candlelight, and everyone we love.",
    tone: "dusk",
    layout: "feature",
    featuredId: "reception-family",
    itemIds: [
      "reception-night-before",
      "reception-couple-film",
      "reception-board-couples",
      "reception-couple-cocktail",
      "reception-board-friend",
      "reception-apron",
      "reception-board-moms",
      "reception-table",
      "reception-board-party",
      "reception-girls-gowns",
      "reception-girls-group",
      "reception-groomsmen-night",
    ],
  },
  {
    id: "ready",
    mark: "Chapter III",
    title: "Getting",
    titleEm: "ready",
    blurb: "The lakehouse, the robes, the last laugh with the girls before the dress.",
    tone: "ivory",
    layout: "feature",
    featuredId: "ceremony-ready-mom",
    itemIds: [
      "ceremony-ready-dress",
      "ceremony-ready-01",
      "ceremony-ready-05",
      "ceremony-groom-girls",
      "ceremony-ready-mirror",
      "ceremony-ready-details",
    ],
  },
  {
    id: "ceremony",
    mark: "Chapter IV",
    title: "The",
    titleEm: "ceremony",
    blurb: "Down the aisle with her dad, the vows by the lake, and the kiss that made it theirs.",
    tone: "ivory",
    layout: "feature",
    featuredId: "ceremony-dipkiss-pro",
    itemIds: [
      "ceremony-groom-altar",
      "ceremony-flower-girls",
      "ceremony-aisle-pro",
      "ceremony-aerial",
      "ceremony-platform-kiss",
      "ceremony-kiss-wide-film",
      "ceremony-recessional-bw",
      "ceremony-bride-bouquet-film",
    ],
  },
  {
    id: "green",
    mark: "Chapter V",
    title: "On the",
    titleEm: "green",
    blurb: "The whole wedding party, the girls, and an afternoon on the lawn by the water.",
    tone: "dusk",
    layout: "feature",
    featuredId: "cocktail-party-pro",
    itemIds: [
      "cocktail-bridesmaids-pro",
      "ceremony-portrait-01",
      "cocktail-family-day-01",
      "cocktail-family-day-02",
      "reception-portrait-groomsmen",
      "reception-portrait-friends",
    ],
  },
  {
    id: "details",
    mark: "Chapter VI",
    title: "The little",
    titleEm: "things",
    blurb: "Champagne by the lake, the signature cocktails, and a cake worth the wait.",
    tone: "dusk",
    layout: "feature",
    featuredId: "cocktail-bar-hydrangea",
    itemIds: [
      "cocktail-seating-chart",
      "cocktail-bar-dusk",
      "cocktail-detail-cocktails",
      "cocktail-detail-cake",
    ],
  },
  {
    id: "reception",
    mark: "Chapter VII",
    title: "The",
    titleEm: "reception",
    blurb: "Into the tent, the cake, the first dance, and a band that would not let anyone sit down.",
    tone: "dark",
    layout: "feature",
    featuredId: "reception-fd-dance",
    filmIds: ["reception-film", "party-film", "afterparty-film-3"],
    itemIds: [
      "reception-cake-cut",
      "reception-firstdance-crowd",
      "reception-dance-bw",
      "reception-dancing",
      "reception-mother-son",
      "reception-bride-cheers",
      "reception-bw-lift",
      "reception-guests-table",
      "reception-band",
    ],
  },
  {
    id: "party",
    mark: "Chapter VIII",
    title: "Until the lights",
    titleEm: "came up",
    blurb: "The lights came down, the floor filled up, and it stayed full until the very last song.",
    tone: "darker",
    layout: "film",
    filmIds: ["afterparty-opener"],
    itemIds: [
      "afterparty-handsup",
      "afterparty-joy",
      "afterparty-group",
      "afterparty-embrace",
      "afterparty-birthday-kiss",
      "afterparty-mom-dance",
      "afterparty-party-01",
      "afterparty-party-02",
      "afterparty-party-03",
      "afterparty-party-04",
      "afterparty-hats",
      "afterparty-fireworks-cheer",
      "afterparty-send-off",
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

/** The closing full-bleed frame — fireworks over the lake at the end of the night
 *  (the photographer's frame; falls back to the phone shot if missing). */
export function finaleImage(): MediaItem | undefined {
  return BY_ID.get("afterparty-fireworks-pro") ?? BY_ID.get("afterparty-fireworks");
}
