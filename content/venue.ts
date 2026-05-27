/**
 * The Place. Two venues, restrained copy, one pull-quote each. The lake does
 * the rest. Imagery is resolved at render time from the engagement set until
 * dedicated venue photography is added under /public/media.
 */
export type Venue = {
  mark: string;
  title: string;
  /** `em` marks the italic accent word inside the title. */
  titleEm: string;
  body: string[];
  pullQuote: string;
  /** Optional explicit image src; falls back to a strong engagement frame. */
  image?: string;
  imageAlt: string;
};

export const venues: Venue[] = [
  {
    mark: "i",
    title: "A place by the",
    titleEm: "water",
    body: [
      "Reynolds Lake Oconee sits on nineteen thousand acres of Georgia lake country, an hour and a half east of Atlanta. The Great Waters course was carved into the shoreline by Jack Nicklaus thirty years ago, and the clubhouse looks out over water that goes still at dusk.",
      "For one weekend in June it holds a wedding. The ceremony at the water's edge, the reception just beyond it, and the long evening that follows.",
    ],
    pullQuote: "Everyone gathers. Everyone stays. The lake holds it all.",
    imageAlt: "The shoreline at Reynolds Lake Oconee",
  },
  {
    mark: "ii",
    title: "And a room to",
    titleEm: "return to",
    body: [
      "The Ritz-Carlton at Lake Oconee keeps the bookends of the weekend — Friday's welcome drinks and the after party that runs past midnight on Saturday.",
      "Stone fireplaces, a long porch, the lake again through the trees. A place to arrive on Friday and not quite leave until Sunday.",
    ],
    pullQuote: "Somewhere south of where they began, and somewhere to come home to.",
    imageAlt: "The Ritz-Carlton at Lake Oconee",
  },
];
