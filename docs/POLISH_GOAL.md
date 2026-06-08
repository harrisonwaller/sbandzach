# WEDDING SITE — AUTONOMOUS POLISH GOAL

**Project:** sbandzach.com — a permanent memory time-capsule of Sara Beth &
Zachary's wedding (Lake Oconee, GA · June 6, 2026). Next.js 14 (App Router, TS),
Tailwind, Framer Motion, deploy target Vercel.

**North star:** this must feel *magical and premium on a phone* — something the
family reopens for years to *feel* the day, not scroll past like a Facebook
album. Quiet-luxury / editorial. **Luxury = restraint.** When a choice is
between "more" and "more tasteful," choose tasteful.

**Your job:** run an autonomous **audit → spec → enhance → review → CEO-rollup**
loop that makes the site measurably better against the scorecard below, for as
many cycles as it takes, **without breaking anything.** Lock the taste decisions
at the human gate; then automate the craft.

---

## REPO GROUND TRUTH (read before doing anything)

- **Narrative source of truth:** `content/capsule.ts` — an ordered array of
  chapters. Each chapter has `tone` (ivory→dusk→dark→darker), `layout`
  (`feature` | `grid` | `film`), `featuredId`, `itemIds[]`, `filmIds[]`. The
  page is `app/page.tsx` → `CapsuleHero` + `capsule.map(CapsuleChapter)` +
  `Vault` + `Finale` + `Footer`. **This file, not the photos, is where you
  re-sequence the story.**
- **Current chapters (the locked order — do NOT reorder):**
  Hero (altar kiss) → I `lake` (the weekend, boats) → II `ready` (getting ready)
  → III `ceremony` (dip kiss + processional video) → IV `green` (on the green)
  → V `details` (the little things) → VI `reception` → VII `party` (until the
  lights came up) → Finale (fireworks) → Footer.
- **Media pipeline (NEVER edit `content/generated-media.json` by hand):**
  1. Drop files into `public/media/wedding/<chapter>/` where `<chapter>` ∈
     `friday | ceremony | cocktail | reception | afterparty` (also top-level
     `engagement/`). Folder → chapter mapping lives in `scripts/media-build.ts`.
  2. Add/update that folder's `meta.json`: per-file `caption` (lowercase, tender,
     ≤4 words, or ""), `focusY` (e.g. `"32%"` — where faces sit), optional `id`.
  3. Run `npm run media:build` → regenerates the manifest with dimensions +
     blur placeholders. Default `id` = `<chapter>-<filename-stem>`.
  4. Reference the `id` in `content/capsule.ts`.
- **Captions voice:** lowercase, tender, specific, ≤4 words. Good: "almost
  time", "just married", "the girls", "everyone we love", "the last song",
  "one more, over the lake". No clichés ("magical day", "happily ever after").

### CONTENT YOU HAVE ACCESS TO (for curation)
- **In repo, already wired:** ~71 photos/videos across the chapters.
- **In repo, UNUSED — candidates:** `public/media/engagement/` (20 engagement
  photos) and 12 deliberately-cut frames still on disk (back-of-dress
  `ceremony-cer-03`, repeat bridesmaid/board/cake/dance shots — `git`-tracked,
  listed by `npm run media:build` vs `capsule.ts`).
- **The big trove — NOT yet imported:** `/Users/harrisonwaller/Downloads`
  (~208 image/video files, mixed `.JPG/.HEIC/.MOV/.MP4`, many duplicates and
  out-takes). **This is the main curation job.** Treat it as raw — most are
  not keepers.

---

## ⚠️ HARD-WON TRAPS — violating any of these breaks the site or wastes hours

1. **NEVER run `npm run build` while the dev server (`next dev`) is running.**
   Both share `distDir: .next.nosync` (this checkout lives in iCloud — see
   README). A build *clobbers the dev server's chunks* → live page goes blank
   (404 on all `/_next/static/...`). For type safety use **`npx tsc --noEmit`**
   and **`npm run lint`**. To run a real production build / Lighthouse: **stop
   the dev server first**, build, measure, then restart `npm run dev`.
2. **HEIC photos carry EXIF orientation that `next/image` STRIPS without
   applying** → they render **sideways** on the site even though Preview/Read
   shows them upright. To import a HEIC correctly:
   `sips -s format jpeg in.heic --out tmp.jpg` then
   `sharp(tmp).rotate().resize({width:2200,height:2200,fit:'inside'}).jpeg({quality:90})`
   — `.rotate()` with no args BAKES the orientation and strips the tag. Verify
   `sharp(out).metadata().orientation` is `undefined`/`1` and dims look portrait.
   Do NOT pre-rotate with `sips -r` first (double-rotation bug).
3. **Videos:** `.MOV` → `.MP4` via
   `ffmpeg -i in.MOV -an -c:v libx264 -crf 23 -movflags +faststart out.mp4`
   (`-an` = muted, required for autoplay), then drop a poster frame
   `out.jpg` beside it (the build consumes it as the thumbnail). Films autoplay
   muted + loop in-view; that's intentional.
4. **After replacing a source image, clear `.next.nosync/cache/images`** or the
   dev server keeps serving the stale optimized version.
5. **Downscale imports to ≤2200px long edge** (`sips -Z 2200` / sharp resize).
   Originals are 4032px/12MP; the dev image optimizer chokes on many large files
   at once (this is why some grids look slow/blurry in dev — it largely
   disappears in the production build).
6. The Messages-attachment paths the owner pastes are sometimes **iCloud-offloaded
   (0 bytes / missing)**. If a source file isn't readable, log it and skip — do
   not fabricate.

---

## STEP 0 — HUMAN GATE (do this FIRST, then STOP and wait for approval)

Before any autonomous loop:

1. **Inventory** every image/video in `public/media/**`, `public/media/engagement/`,
   and `/Users/harrisonwaller/Downloads`. Record path, dimensions, size, format.
2. **Visually look at each candidate** (use subagents to parallelize — split the
   trove across several catalog agents; each returns a table of
   `file | orientation | 1-line description | suggested chapter | caption |
   focusY | dup-group | quality-flag`). Flag blurry, low-res (<1600px long edge),
   badly exposed, and near-duplicates. Group dupes; pick the single best of each.
3. **Propose a curation manifest per chapter** — 1 hero + 4–6 supporting
   (Reception/Party may run denser as a mosaic). Map every keeper to a chapter,
   pick video anchors, and explicitly call out:
   - **Getting Ready & Ceremony need MORE** (owner feedback) — find the best
     additional getting-ready and ceremony candidates from the trove.
   - **Reception vs. "Until the lights came up" overlap** — these currently
     share too many same-looking shots. Reception = warm dinner / family /
     first dance / band (purple). Party = late-night teal/blue dance floor.
     Sort each shot to exactly one and cut the cross-section duplicates.
4. **Output the manifest as `docs/MANIFEST_PROPOSAL.md` and STOP.** Do not start
   the loop until the owner approves it. The approved manifest is a **locked
   input** — the loop never re-decides which photos are "best."

---

## SCORECARD (the fitness function)

**Hard / measurable (loop owns these fully):**
- `npx tsc --noEmit` clean; `npm run lint` clean; production build succeeds
  (built with dev server stopped — see Trap #1); zero console errors; zero
  broken assets/links.
- Lighthouse **mobile** (production build): Performance ≥ 90, Accessibility ≥ 95,
  Best Practices ≥ 95, SEO ≥ 95. (Baseline was Perf 92 / A11y 100.)
- Total page weight < 8 MB; largest single asset < 800 KB; every image ≤ 2200px.
- Every image via `next/image` with `sizes` + lazy + blur placeholder (no raw
  `<img>`); every film has a poster + is muted/loop/playsInline.
- One motion-token set (durations/easing/stagger) used everywhere
  (`--ease-editorial`, Reveal's 1.1s, hero rises). No new ad-hoc animations.
- Clean layout at **390 / 768 / 1440px**. No horizontal scroll. Tap targets ≥44px.
- All media has alt text / captions where appropriate.

**Craft rubric (CEO scores 1–5 from screenshots; target ≥ 4 each):**
- Spacing rhythm / vertical pacing feels intentional, not crammed — and **no
  orphaned single photo** dangling under a grid (4 items → 2×2, etc.).
- Clear hierarchy: one hero per chapter, supporting shots subordinate.
- Motion subtle and restrained.
- Every photo sits in the correct chapter; the day reads as a chronological story.
- Reception/party lower-quality phone shots read as *energy* (tight grid / film
  reel), not full-bleed under a magnifying glass.
- **Film ↔ photo alignment in the `party` chapter** (owner feedback): clips and
  the still slices around them feel intentionally paced, not random. Love the
  energy — make the rhythm deliberate.

---

## THE LOOP (per cycle)

Run across the chapters and the cross-cutting criteria (perf, a11y, motion,
responsive, SEO):

1. **AUDITOR** — score current state vs. the scorecard. Every finding needs
   `file:line` evidence + an impact rank. No claim without evidence; capture a
   real before-number.
2. **SPEC WRITER** — turn the top findings into ONE bounded change spec each,
   with explicit acceptance criteria.
3. **IMPLEMENTER** — make ONE spec's change on a git branch. `npx tsc --noEmit`
   + `npm run lint`. Self-verify against acceptance criteria. (Screenshot via
   the Playwright pattern in `scripts/` against the running dev server.)
4. **REVIEWER** — re-measure. Confirm the target metric improved **and** no
   other scorecard metric regressed (incl. a screenshot diff for craft). If it
   regressed anything, **REJECT and revert the branch.**
5. **COMMIT** each verified win to git with a message stating before→after.
6. **CEO (every 5 cycles)** — review full-site screenshots at 390/768/1440 vs.
   the north star + craft rubric. Set next priorities, kill scope creep and
   over-animation, enforce restraint, decide if done.

---

## HARD RAILS (never violate)

- Type-check + lint must pass before any commit; a real production build must
  pass (dev stopped) before declaring a Lighthouse number. Broken = auto-revert.
- No regressions: a change that lowers any other scorecard metric is rejected.
- One git commit per verified win → every step reversible.
- **Evidence rule:** never log "improved X" without a real before/after number.
  No hallucinated wins. No fabricated file contents.
- **Append-only `DECISIONS_LOG.md`:** every cycle logs what was audited, the one
  change made, the metric delta, and CEO notes — so the owner can read exactly
  what happened overnight.
- **DO NOT TOUCH:** the approved photo manifest; the chapter order / narrative;
  the cream→dark tone escalation; the hero (altar kiss); the custom-domain /
  Vercel config; `content/generated-media.json` (regenerate via `media:build`).
- **POLISH is autonomous. NEW FEATURES are not.** If a backlog item below would
  genuinely help, write a spec and flag it for approval — do NOT build it
  unsupervised.

---

## STOP CONDITION (definition of done)

Stop and write a final summary when EITHER:
- all hard targets met AND CEO scores every craft item ≥ 4 AND two consecutive
  full passes produce no net improvement; OR
- 40 cycles elapse (report status + remaining gaps).

Do not loop forever gold-plating. When in doubt, stop and ask.

---

## KNOWN ISSUES TO FIX FIRST (owner feedback, 2026-06-08)

1. **Getting Ready & Ceremony feel thin** — add the best additional shots from
   the trove (Step 0). Ceremony's only true ceremony media is the processional
   clip + the dip kiss; find more real ceremony/aisle/vow frames if they exist.
2. **Reception ↔ Party same-look overlap** — biggest issue; dedup and
   differentiate (see Step 0 §3). The party chapter "needs a ton of work."
3. **Party film↔photo pacing** — align clips with their still slices.
4. **(fixed 2026-06-08, keep regression-guarded):** desktop fireworks finale now
   `object-contain` so the whole shot shows; 4-photo grids lay out 2×2 (no
   orphan); HEIC orientation baked. Don't reintroduce these.

---

## 10x BACKLOG (CEO may spec; owner approves before building — do NOT auto-build)

- **Video woven in with sound** — vows/toasts click-to-play with audio;
  first-look & send-off autoplay muted + loop as ambiance.
- **Sound** — optional ambient track / their first-dance song, clear mute toggle.
- **The details Facebook flattens** — menu, flowers, rings, handwritten vows.
- **A guestbook / message wall** — guests add a memory; keeps the site alive.
- **Their story / timeline** — how they met, the day's timeline, a closing line.
- **Tactile premium feel** — film-grain, blur-up, slow parallax hero.
