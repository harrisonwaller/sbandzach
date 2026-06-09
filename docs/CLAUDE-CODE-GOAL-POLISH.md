# /goal — SBANDZACH.COM · THE POLISH PASS

## CONTEXT

sbandzach.com is live. The wedding happened (June 6, 2026) and the capsule is
full: hero kiss, eight chronological chapters that dim from ivory album to
midnight film, fireworks finale, hidden Vault. The bones are right. The owner
likes it. **This is not a redesign.** This is the last 5% — the chef's-kiss
pass that takes "really good" to "they paid a million dollars for it."

Read `docs/CLAUDE-CODE-GOAL.md` Section 9 (tone) and Section 5 (rubric) first.
Both still govern. Then read `DECISIONS_LOG.md` so you don't re-litigate
settled decisions (attire-based photo sorting, tone escalation, orientation-
aware feature frames, the numeric date over roman numerals, etc.).

The working loop, screenshot tooling (`scripts/`, `shot-tmp.mjs`, `audit/`),
and scorecard already exist from the build phase. Reuse them.

---

## ABSOLUTE NON-NEGOTIABLES (DO NOT REGRESS)

- The narrative is locked: chapter order, chapter titles, tone escalation
  (ivory → dusk → dark → darker), hero image, fireworks finale.
- No new chapters, no new dependencies, no design-system changes (palette,
  Italiana/Cormorant pairing, paper grain, hairline rules stay exactly as-is).
- Photo curation is the owner's call. You may *reorder within a chapter* for
  rhythm and *flag* weak/duplicate frames in a report — you may not remove or
  add photos to chapters without surfacing it first.
- Every chapter keeps its featured frame. Faces are sacred: no crop may clip
  a face, in any cell, at any viewport.
- Reduced-motion behavior, blur placeholders, lazy video, and the Vault
  easter egg (060626) must all still work after every iteration.
- Visual quality may never drop in service of performance. If a compression
  pass is visible at 100% zoom on a 27" display, it went too far.

---

## THE WORK — in priority order

### 1. Media weight (the biggest real win)

**Videos — ~28 MB total today.** Re-encode every `.mp4` in `public/media/`:
H.264, CRF ~23–26, `-preset slow`, audio stripped (they autoplay muted), max
1080p on the long edge, `-movflags +faststart`. Targets: `afterparty/film-3.mp4`
8.6 MB → ≤3.5 MB; everything else proportional; **total video budget ≤ 12 MB.**
Verify each clip visually after encoding (play it, screenshot a frame) — no
blocking, no banding in the dark party clips. Keep originals in a `_originals/`
folder that is gitignored, then rebuild the manifest.

**Photos.** Audit every JPEG against its largest rendered size (feature frames
render ≤ ~1600px wide on a 1440 display; grid cells far smaller). Recompress
outliers (mozjpeg, quality ~80–82, resize to ≤2000px long edge — feature
frames may keep 2200px). Budget: **no photo over 600 KB, median under 250 KB.**
Same visual-verification rule as videos.

### 2. Responsive `sizes` correctness (free quality + free speed)

- `capsule-grid` cells declare `sizes="(max-width: 760px) 50vw, 33vw"` but
  `.wide` cells span two columns (~66vw) — they're being served a
  half-resolution image. Fix: pass per-cell sizes (wide vs normal).
- The Finale renders the same image twice; the blurred ambient-fill copy
  requests `sizes="100vw"` for an image that's blurred to mush. Serve it a
  small variant (e.g. `sizes="33vw"`) — invisible change, big byte win.
- Sweep every other `<Image>` for the same class of bug (Hero, Gallery,
  Archive, Lightbox, FeatureFrame portrait/landscape variants).

### 3. Crop & focus audit (the detail people actually feel)

For every photo *as rendered* (grid cell, wide cell, feature frame, mobile
2-up), screenshot it and check: are faces whole, is the subject centered,
does the default `objectPosition` (28%/32% upper-third bias) fight any
specific photo? Fix per-photo with `focusY` in the manifest meta — never by
changing the global default. Pay special attention to: portrait feature
frames on mobile, `.wide` landscape cells, and the dark party shots where
subjects are off-center.

### 4. Rhythm & pacing of the dense chapters

"The rehearsal dinner" (13 stills) and "The reception" (14 stills + 4 films)
read as the least-curated stretches of the scroll. Without removing photos:
- Reorder within each chapter so like-images don't sit adjacent (two
  board-shots, two group-shots in a row, etc.) and wide cells break the grid
  at deliberate intervals rather than wherever they land.
- Check the film placements in the reception: four stacked clips between the
  feature and the grid may be too much in one block — interleaving or
  re-ordering within the existing component capabilities is allowed.
- Verify no grid ends in an orphan cell at desktop (3-col) or mobile (2-col)
  widths. The `data-count="4"` 2×2 rule exists; check counts 5, 7, 10, 13, 14.
- Produce `audit/CURATION_NOTES.md` flagging any frame that is blurry, near-
  duplicate, or weaker than its neighbors — owner decides, you don't delete.

### 5. Performance & polish sweep

- Lighthouse mobile (throttled): perf ≥ 90, a11y ≥ 95, best-practices ≥ 95.
  Record scores in the scorecard each iteration.
- LCP: the hero image is `priority` — confirm it's also preloaded as the
  correct responsive variant and that the loader overlay never delays it.
- CLS = 0: scroll the full page at 1440px and 390px watching for any shift
  (film posters, lightbox open/close, font swap).
- Caption coverage: every feature frame should have its lowercase-italic
  caption; grid photos with empty captions get descriptive `alt` text (many
  currently fall back to the generic site label — write real alts from the
  photo content: "the bridesmaids on the lawn", not "Sara Beth & Zachary —
  The reception").
- Lightbox: keyboard nav, focus trap, swipe on mobile, and adjacent-image
  preloading so arrow-stepping never shows a blank frame.
- OG image: confirm `/og.jpg` exists, is current (the kiss, not a
  placeholder), and renders correctly in an unfurl preview.
- 404/favicon/apple-icon sanity check.

### 6. Chef's-kiss details (only after 1–5 are green)

- Scroll-linked tone transitions: the hard cut between `dusk` and `dark`
  sections — would a longer shared gradient seam make the dimming feel more
  cinematic? Prototype, screenshot, judge against restraint; revert if it
  draws attention to itself.
- The ChapterNav and ScrollProgress on dark sections: verify contrast and
  that the active-chapter state is legible at every tone.
- Film play-affordance ring: confirm it disappears the moment autoplay
  starts and never flashes on fast scroll.
- Mobile finale: the 2:3 frame at 88svh — check it breathes on a 390×844
  viewport and the caption doesn't crowd the frame.
- One full read-through as the couple: scroll the entire site top to bottom,
  slowly, on desktop and phone profiles. Note anything that breaks the spell
  — that list is the next iteration's worklist.

---

## THE LOOP

Reuse the build-phase loop with these parameters:

- **Branch:** `polish/chefs-kiss`. One commit per iteration:
  `polish-{N}: {persona} — {summary}`.
- **Step A — Snapshot:** full-page screenshots at 1440×900 and 390×844,
  plus per-chapter crops, into `audit/polish-{N}/`.
- **Step B — Score:** the original 8-dimension rubric, **plus two new rows:**
  - **Weight** — total page bytes (photos, video, JS) vs budgets above.
  - **Crop integrity** — % of rendered cells with whole faces / centered
    subjects (target: 100%).
- **Step C–E:** pick the 2–3 lowest dimensions, adopt a persona
  (Art Director / Mobile Designer / Performance Reviewer / Copy Editor /
  Photo Editor — new persona: judges crops, ordering, and rhythm like a
  magazine photo editor closing an issue), fix narrowly, verify with fresh
  screenshots **before** committing. `npx tsc --noEmit` clean and
  `npm run media:build` idempotent at every commit.
- **Minimum 4, maximum 8 iterations.**

### Stopping criteria (ALL true)

1. Video total ≤ 12 MB; no photo > 600 KB; all visually verified lossless-
   to-the-eye.
2. Every `<Image>` has correct `sizes` for every layout it appears in.
3. Crop integrity 100% at both viewports.
4. Lighthouse mobile: perf ≥ 90, a11y ≥ 95, recorded in scorecard.
5. The dense chapters read with deliberate rhythm; `CURATION_NOTES.md`
   written for the owner.
6. Two consecutive iterations with no score movement (convergence).
7. The full-scroll "as the couple" pass produces an empty list.

If criteria aren't met by iteration 8, stop and write
`audit/POLISH_UNRESOLVED.md` for Harrison.

---

## TONE, RE-READ EVERY ITERATION

This pass is invisible by design. Nobody should be able to point at what
changed — the site should simply feel *faster, calmer, more inevitable*.
If a change is noticeable as a change, it's probably wrong.

Restraint over expression. If anything feels clever — strip it.

## BEGIN.
