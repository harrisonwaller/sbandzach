/**
 * Site-wide constants. The single source of truth for names, dates and tone.
 * Nothing here is logistical — no addresses live in this file (see schedule.ts,
 * and even there, only the public Zola-listed venues appear).
 */
export const site = {
  names: { first: "Sara Beth", second: "Zachary" },
  date: "June 6, 2026",
  dateRoman: "VI · VI · MMXXVI",
  dateLong: "June Sixth · Two Thousand Twenty-Six",
  location: "Lake Oconee, Georgia",
  tagline: "From Georgia, With Love",
  domain: "sbandzach.com",

  /** Monogram marks used in the loader, top bar and footer. */
  mark: "S · Z",
  markFull: "S B · Z",

  /** The line that closes the site. */
  closing: "For all the days along the way.",

  /** Lowercase italic accent shown above the names on the hero. */
  eyebrow: "from georgia, with love",
} as const;

/**
 * The Vault easter egg passphrase — the wedding date as digits (06·06·26).
 * Typing it anywhere on the site reveals the hidden chapter.
 */
export const VAULT_CODE = "060626";

export type Site = typeof site;
