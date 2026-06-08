# DECISIONS LOG — autonomous polish run

Append-only. Newest at top.

## Cycle 2 — 2026-06-08 — Hero name placement
**Changed:** Hero split to top/bottom (`justify-between`) — names ride high over
the open sky, date+place sit low over the platform, so the kiss stays clear in
the middle instead of being overlaid by the headline. Scrim re-weighted
top+bottom heavy, middle clear. Headline clamp trimmed (8.5rem→7.6rem) so two
names never crowd the faces.
**Verified:** tsc clean; desktop + mobile (390px) screenshots — faces clear on
both, names legible over sky.

## Cycle 1 — 2026-06-08 — Step 0 curation + first enhancement pass
**Branch:** `polish/goal-run`

**Audited:** the `~/Downloads` trove (183 files → 129 unique after md5 dedupe),
cataloged by 7 parallel vision subagents against the chapter taxonomy.

**Changed:**
- Inventoried + visually cataloged 129 unique candidates → `docs/MANIFEST_PROPOSAL.md`.
- Imported 14 curated picks (rotate-baked, ≤2200px) and wired them in:
  - **Ceremony** gained the real moments — `ceremony-aisle` (her dad walking her
    down the aisle, ballgown) + `ceremony-kiss-alt`. Grid now a clean 2×2.
  - **Getting ready** enriched then **deduped** to 4 distinct frames (robes,
    flower girls, mirror, bustle) — removed a duplicate bustle + duplicate mirror.
  - **On the green** now leads with the **full-wedding-party** hero (`cocktail-party-full`)
    + a wide bridesmaid lineup; dropped the dim overcast `cocktail-green-01`.
  - **The little things** now features the **candlelit dinner table** (`reception-table`).
  - **Reception** (warm/structured) gained couple-cocktail, cake-cutting,
    groomsmen-night; **separated from Party by light** — removed the generic
    purple dance frames (`reception-dance-01..03`, `board-toast`) that overlapped.
  - **Until the lights came up** (teal energy) gained `handsup`, `embrace`,
    `mom-dance`; trimmed redundant teal stills.
- Earlier same session (pre-loop): fixed desktop fireworks (`object-contain`),
  4-photo grids → 2×2, baked HEIC EXIF orientation, processional video support.

**Verified:** `npx tsc --noEmit` clean; dev server 200; no duplicate ids in
`capsule.ts`; screenshots of ready/ceremony/green/reception confirm correct
orientation + composition. Media manifest: 93 photos / 4 videos.

**CEO note:** addresses owner feedback — ceremony + getting-ready now substantive;
reception↔party de-overlapped by light. Watch items: reception runs 8 supporting
(intentional, all distinct); some dev-only image-optimization blur (production
resolves). Next: source the party's better *videos* (owner to provide); consider
the lace-keyhole detail (p019) for "The little things".

**Reversibility:** all changes on `polish/goal-run`; this is a single coherent
commit. Held imports + bench list documented in the manifest.
