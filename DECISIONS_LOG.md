# DECISIONS LOG — autonomous polish run

Append-only. Newest at top.

## Cycle 19 — 2026-06-09 — Five more rehearsal-dinner frames (owner)
Owner sent 5 more (2 HEIC + 3 JPG). HEICs came through small (768x1024) — kept native,
no upscale. Attire/context all rehearsal dinner:
- People: board-moms (bride + 3 at the seating wall), board-friend (bride + friend w/
  champagne), girls-group (the whole group under the chandelier, film look).
- Details: night-before ('the night before' welcome sign + florals), apron ('The
  Copenhavers' catering apron + passed bites) — editorial texture.
- **Rehearsal grid now 12** (+ feature). Re-ordered the whole grid: lead on the 'night
  before' sign, alternate the four dark seating-wall shots across rows so they don't
  clump, weave details (apron, candlelit table) between people, groups at the tail.
**Verified:** tsc clean; 5 new ids present; 0 console errors; all upright, crops clean.

## Cycle 18 — 2026-06-09 — Three rehearsal-dinner frames (owner)
Owner sent 3 pro photos for the rehearsal dinner; attire confirms (white halter dress +
navy blazer / cream pants). Rehearsal-dinner photos live under reception-* ids:
- **+3 to the rehearsal grid (now 7):** couple-film (film-stamped portrait by the bar),
  board-couples ('please find your seat' at the seating wall), girls-gowns ('the girls',
  five in colourful gowns). Ordered so the two seating-board shots sit together.
**Verified:** tsc clean; new ids present; 0 console errors; all three upright, good crops.

## Cycle 17 — 2026-06-09 — Three pro frames, attire-sorted (owner)
Owner sent 3 pro photos "for the reception." Sorted by attire (owner's own rule):
- **Reception grid +2:** the B&W couple looking back on the checkerboard floor
  (dance-bw) and the mother-son dance (mother-son, 'with his mom'). Grid now 9, with
  the two B&W frames (dance-bw + bw-lift) spaced apart so they don't clump.
- **After-party +1 (NOT reception):** the petal send-off (send-off, 'the send-off') —
  bride in her short dress + groom in the white dinner jacket = the grand exit, so it
  closes the after-party grid and leads into the fireworks finale, not mid-reception.
**Verified:** tsc clean; new ids present; 0 console errors; all three upright with good
crops; reception grid + party send-off render correctly.

## Cycle 16 — 2026-06-09 — After-party / reception re-sort + B&W kiss (owner)
Owner caught reception-attire footage sitting in the after-party and a redundant kiss:
- **Added** the B&W 'BIRTHDAY GROOM' sparkler-cake kiss to the after-party grid
  (birthday-kiss.jpg, portrait, 'happy birthday, groom'), in floor-kiss's old slot.
- **Removed** afterparty floor-kiss entirely — it echoed the hero (the lakeside kiss).
- **Moved to reception:** 'the last song' bridesmaids-dance clip (party-film, recaptioned
  'all the girls') + the 'rolling on the river' band clip (afterparty-film-3). Reception
  films now [reception-film, party-film, film-3] — the two band clips separated by the
  girls' clip so the near-duplicates don't sit back-to-back.
- **Dropped** party-film-2 (a near-duplicate of party-film). File kept on disk.
- After-party film is now just the DJ fog-cannon opener ('the lights came up') + the grid.
**Verified:** tsc clean; integrity (no missing refs); 0 console errors; birthday kiss
renders upright with good crop; floor-kiss gone; reception clips separated.
**Note for owner:** reception now carries 3 clips; reception-film and the rolling-on-the-
river clip are similar angles of the same song — say the word and I'll drop one.

## Cycle 15 — 2026-06-09 — Pro reception photos + finale upgrade (owner)
Added 6 professional reception/fireworks frames (downscaled 2200px, mozjpeg, all <800KB):
- **Reception feature → father-daughter dance** (reception-fd-dance, 'with her dad').
  Warm tent light, clean crop; bumped the chapter from a phone snap to the pro frame.
- **Reception grid:** added pro dancing, b/w lift, guests-at-table alongside the
  cake-cut, first-dance, cheers, band (7 items).
- **Finale upgraded** to the photographer's fireworks frame (afterparty-fireworks-pro)
  via finaleImage() — falls back to the phone shot if missing.
- **Party grid:** added the fireworks-cheer frame at the tail.
**Verified:** tsc clean; integrity (no dupes/missing); 0 console errors; reception
feature + pro finale render with good crops in screenshots.

## Cycle 14 — 2026-06-09 — Subagent swarm review + premium-scroll enhancements
Ran 5 specialist subagents (2 visual, motion, performance, UX). Implemented the
high-value, no-content-needed wins:
- **Motion/scroll feel:** gold scroll-progress hairline (ScrollProgress.tsx);
  staggered grid-cell reveals (cascade in); hero slow Ken-Burns zoom; finale
  'breath' (slow bloom + delayed caption). All gate on prefers-reduced-motion.
- **Visual:** bumped portrait feature frames 640→780px (agents flagged them as
  'timid' with dead margins) — more presence, still no crop.
- **Engineering/keepsake:** videos preload='none' (kills 6 metadata fetches +
  unintended full-clip downloads on scroll); film-3 11→8.8MB; real alt text
  derived from chapter+names (a11y + 10-yr archive); <noscript> resilience so the
  album is readable if JS ever fails; removed stray 'FeaturedImage 2.tsx'.
**Verified:** tsc + prod build clean; 0 console errors; progress bar renders;
bigger features render; reduced-motion respected.
**Backlog (needs owner content/decision):** first-dance song w/ mute toggle;
'how they met' + opening/closing lines; chapter-nav rail; day timeline; vault
'discovered' polish; per-photo share cards; scroll-linked continuous tone wash.


## Cycle 13 — 2026-06-09 — More media + ceremony fix (owner)
- Getting ready: added the bridesmaid-robes detail (IMG_0626, HEIC rotated upright).
- Ceremony: removed the mislabeled 'kiss-alt' — it was a guest family (woman in
  blue, girl in pink, a boy), not the kiss. Ceremony grid now 3 (aisle, aerial, portrait).
- Until the lights came up: added TWO videos — the DJ fog-cannon **opener at the
  TOP** + the band-dancing clip; plus an afterparty group photo. Party now opens
  on a film.
**Audit:** tsc clean; no dup/missing ids; kiss-alt fully removed; 6 videos; 0
broken images. Manifest 116 items.

## Cycle 12 — 2026-06-09 — Pro details + reception film shots; rehearsal video relocated
**Added (owner-provided pro photos):**
- The little things: feature → **hydrangea cocktail bar**; grid → **seating
  chart**, **dusk bar over the lake**, cocktails sign, cake. (benched the white
  tent + phone champagne shot.)
- Reception: added two **film-grain** shots — the bride's cheers + the packed
  dance floor (landscape, wide cell). Dropped a redundant dance still.
**Fixed (owner catch):** the processional clip shows EMPTY SEATS → it's the
rehearsal, not the ceremony. Moved it out of the ceremony into **The weekend**
(layout already supports inline film) and relabeled it "the rehearsal".
**Audit:** tsc clean; no dup/missing ids; 0 broken images; 4 videos; no
horizontal overflow. Manifest 112 items.


## Cycle 11 — 2026-06-09 — Feature crops fixed (portrait framing)
**Problem (owner):** portrait feature photos — esp. the bride + mom — were cut to
a thin head-and-shoulders band by the wide full-bleed feature frame.
**Root cause:** `FeatureFrame` forced every feature into a ~2:1 box; a 2:3
portrait only shows ~32% of its height there, cropping single/pair subjects.
**Changed:** `FeatureFrame` is now orientation-aware — portrait images render in
a centred 4:5 frame (max-w 640px, max-h 82svh) so the whole subject shows;
landscape features stay full-bleed. No content moved; pure layout fix.
**Verified:** tsc clean; re-captured every feature — bride+mom, bride-lawn,
dip-kiss, bridal-party all show complete, faces safe; full-chapter balance reads
as intentional editorial (centred portrait → grid). Mobile: portrait feature
goes full-width 4:5, no overflow.

## Cycle 10 — 2026-06-09 — Professional photos added (owner-provided)
**Input:** 9 pro photographer shots (45MP). Cataloged by 2 subagents; downscaled
to ≤2200px, all <800 KB, orientation clean.
**Changed — pro now LEADS every wedding-day chapter (phone versions benched):**
- ceremony: feature → **pro dip-kiss**; grid → **pro aisle (bride + dad)**,
  **aerial drone** of the lakeside ceremony, the kiss, a portrait.
- getting ready: feature → **bride + mom** (intimate); grid → **the dress on the
  hanger**, the steps, robes, flower girls, mirror.
- on the green: feature → **pro bridal party** (full lineup at Waterview Pub);
  grid → pro bridesmaids w/ train, **two wedding-day family portraits**,
  couple + groomsmen, couple + friends.
**Benched (phone, replaced):** ceremony-dipkiss/aisle/portrait-02,
cocktail-party-full/lineup/portrait-03, ceremony-ready-04/02.
**Verified:** tsc clean; image cache cleared; screenshots of all three chapters —
pro shots render, crops good, faces in frame. Manifest 107 items.

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
