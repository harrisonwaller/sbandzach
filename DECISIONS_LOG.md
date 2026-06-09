# DECISIONS LOG — autonomous polish run

Append-only. Newest at top.

## Cycle 9 — 2026-06-09 — Image/video QA audit
**Audited:** every section at 1440px + a DOM check for broken/unloaded images.
**Result:** 0 broken, 0 sideways, all visible and reasonably cropped. Two real
issues found and fixed:
1. `portrait-groomsmen` + `portrait-friends` (bright daytime cocktail portraits)
   sat in the dark evening **reception** — tonally jarring and chronologically
   early. Moved to **On the green** (daytime portraits); benched the busy
   `champagne-bar` to keep that grid orphan-free (lineup is a wide cell).
   Reception is now tonally coherent (cake → purple dance floor).
2. `cocktail-cake` was a back-of-bride shot redundant with the front-on
   `cake-cut`; removed from **The little things** → clean row of three details.
**Verified:** tsc clean; green grid lays out 6 cells (no orphan), reception 2×2,
details single row; re-screenshotted all three.

## Cycle 8 — 2026-06-09 — Share preview + favicon
**Audited:** metadata had Open Graph title/description but **no image** → texting
the link showed a blank/text-only card; no favicon either.
**Changed:**
- Composed a 1200×630 share card `public/og.jpg` — the kiss (smart-cropped to the
  couple) with "the best day / Sara Beth & Zachary / 06.06.2026 · Lake Oconee".
- Wired `openGraph.images` + `twitter: summary_large_image` in `app/layout.tsx`.
- Added `app/icon.png` (512) + `app/apple-icon.png` (180) — an "S·Z" serif
  monogram on cream (Next auto-wires favicon + touch icon).
**Verified:** tsc clean; dev HTML emits og:image/twitter:image; `/og.jpg` 200;
favicon + OG card visually checked.
**Why it matters:** this site exists to be *shared* — the link now previews as a
premium card instead of a blank rectangle.

## Cycle 7 — 2026-06-08 — Correctness audit + video weight
**Audited (correctness, post-restructure):** the reception "dance" stills + the
reception clip show the bride in the short party dress + groom's white jacket
under the band's purple light — that's the *late reception* (she changed
mid-reception), same event, correctly placed (not the teal after-party). No
mis-sorts found. detail-champagne has no event markers (left as a wedding detail).
**Changed:** recompressed all 4 videos (crf 26, resolution preserved, faststart,
backups in /tmp/vids-bak): processional 7.4→4.6 MB, reception-film 4.8→3.8,
party-film-2 3.0→2.4, party-film 1.6→1.3. Total video ~16.8→12.1 MB; media 50→48 MB.
**Verified:** every re-encode decodes; spot-checked a frame — clean, no
artifacts. Images still 0 over 800 KB. tsc clean.

## Cycle 6 — 2026-06-08 — Chronology correction (owner feedback)
**Problem:** photos were in the wrong events. Read attire as the timeline —
navy blazer + halter dress = pre-wedding; black tux + ballgown = wedding day.
**Found mis-sorted:** the "find your seat" seating board, the candlelit indoor
dinner, the navy-blazer couple cocktail, and the blazered groomsmen were the
**rehearsal dinner** but sat in the wedding **reception**; the colorful-gown
group was the **bridal luncheon** but sat in "on the green."
**Changed:** re-sequenced to true order — The weekend (luncheon + rehearsal) →
**The rehearsal dinner** (new section) → Getting ready → Ceremony → On the green
→ The little things → Reception (wedding-only: cake, first dance, band, tux
portraits) → After-party → fireworks. Moved the wedding-reception clip into the
reception; details now features the white wedding tent (was the rehearsal-dinner
table). Verified by screenshot that each section's attire is internally
consistent (no navy blazers in the reception, no ballgown in the weekend).
**Verified:** tsc clean; weekend/rehearsal/reception screenshots confirm correct
event grouping.

## Cycle 5 — 2026-06-08 — CEO review + convergence
**Reviewed:** full-page desktop scroll (25,883px) + mobile section sweep.
**Verdict:** the story coheres — ivory lakeside opener → dusk → dark reception →
teal party → fireworks; light→dark escalation intact; no blank/broken sections,
no jarring adjacent duplicates, no horizontal overflow at 390px. Hero, chapters,
films, finale all render.
**Convergence:** further *safe* autonomous wins are exhausted. Remaining items
all require the owner and are intentionally NOT done unsupervised:
- party afterparty **videos** (owner to provide files),
- **Lighthouse** pass (needs a production build = dev server stopped, Trap #1),
- **merge to main / deploy** decision.
Did NOT gold-plate or make risky taste edits without oversight, per goal rails.

## Cycle 4 — 2026-06-08 — Mobile pass (390px)
**Audited:** layout at 390px across photo-heavy chapters.
**Result:** scrollWidth == innerWidth (no horizontal overflow); grids reflow to
2-up; wide/landscape cells go full-width; films sized correctly. No change
needed — verification only.

## Cycle 3 — 2026-06-08 — Asset weight
**Audited:** 8 source images > 800 KB (largest 1058 KB).
**Changed:** recompressed all 8 (mozjpeg q82, ≤2000px) in place → largest image
now 575 KB; 0 images over 800 KB. Rebuilt manifest. Videos left as-is (lazy,
off critical path).
**Verified:** `find ... -size +800k` returns 0; media:build clean (98 items).

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
