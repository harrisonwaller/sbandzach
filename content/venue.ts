/**
 * The Place. Two venues, stated plainly — where the ceremony is, where the
 * weekend's drinks and after party are. No prose, no pull-quotes. Imagery is
 * resolved at render time from the engagement set until dedicated venue
 * photography is added under /public/media.
 */
export type Venue = {
  mark: string;
  title: string;
  /** `em` marks the italic accent word inside the title. */
  titleEm: string;
  body: string[];
  /** Optional explicit image src; falls back to a strong engagement frame. */
  image?: string;
  imageAlt: string;
};

export const venues: Venue[] = [
  {
    mark: "i",
    title: "Great",
    titleEm: "Waters",
    body: [
      "The ceremony and reception are at the Great Waters Course at Reynolds Lake Oconee, about ninety minutes east of Atlanta.",
    ],
    imageAlt: "The shoreline at Reynolds Lake Oconee",
  },
  {
    mark: "ii",
    title: "The",
    titleEm: "Ritz-Carlton",
    body: [
      "Friday's welcome drinks and the Saturday after party are at The Ritz-Carlton, Lake Oconee, a few minutes from the course.",
    ],
    imageAlt: "The Ritz-Carlton at Lake Oconee",
  },
];
