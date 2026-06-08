# Memory Capsule Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn sbandzach.com into a post-wedding "memory capsule" that opens as a quiet ivory editorial album and escalates into a dark cinematic film as you scroll, filled with ~50 curated photos and 4 dance-floor video clips.

**Architecture:** Keep the existing content-driven Next.js 14 architecture. Curated media is dropped into `public/media/wedding/{ceremony,cocktail,reception,afterparty}` and discovered by `media:build` (already supports video + posters). A new content file `content/capsule.ts` defines the narrative as ordered sections, each with a **tone** (ivory → dusk → dark → darker) and a layout (feature / gallery / grid / film). New components render those sections; existing `Lightbox`, `Reveal` are reused. The light→dark background gradient per section IS the "turn it up" mechanic.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind (brand tokens only), Framer Motion, sharp, ffmpeg (clip compression + posters).

**Verification:** No unit-test harness exists; this is visual. Each task is verified with `npx tsc --noEmit` (typecheck), `npm run build` (must succeed), and `npm run dev` + a Playwright screenshot (desktop 1440 + mobile 390) reviewed by eye. Commit after each task.

---

## File structure

- **Create** `public/media/wedding/ceremony/*` — Morning/Aisle/Details photos + `meta.json`
- **Create** `public/media/wedding/cocktail/*` — Party-gathers photos + `meta.json`
- **Create** `public/media/wedding/reception/*` — reception photos + `reception-film.mp4`/poster + `meta.json`
- **Create** `public/media/wedding/afterparty/*` — party photos + 3 clips/posters + `meta.json`
- **Create** `scripts/curate-import.mjs` — one-shot: copy/rename/optimize originals + compress clips + extract posters
- **Create** `content/capsule.ts` — narrative sections (tone, copy, item ids, layout) + id→MediaItem resolver
- **Create** `components/Film.tsx` — lazy autoplay-muted-loop video w/ reduced-motion fallback
- **Create** `components/CapsuleHero.tsx` — full-bleed featured photo with title overlay
- **Create** `components/CapsuleChapter.tsx` — renders one section (tone bg, intro, feature/gallery/grid/film) + Lightbox
- **Create** `components/CapsuleOutro.tsx` — closing line, settle
- **Modify** `app/page.tsx` — render hero + capsule sections + supporting chapters
- **Modify** `app/globals.css` — add `.tone-*` background classes + `.capsule-grid`
- **Modify** `content/site.ts` — past-tense hero copy
- **Modify** `content/schedule.ts` / `components/Schedule.tsx` heading — past tense ("as it happened")

---

## Curated selection (source → destination)

Sources: photos `~/dev/sbz-curate/orig/<IMG>.jpg`, clips `~/dev/sbz-curate/clips/<IMG>.MP4`.

| dest folder | dest name | source | caption |
|---|---|---|---|
| ceremony | the-kiss (featured, hero) | IMG_0054 | — |
| ceremony | morning-01 | IMG_0001 | before the ceremony |
| ceremony | morning-02 | IMG_0009 | |
| ceremony | morning-03 | IMG_0013 | |
| ceremony | morning-04 | IMG_0063 | |
| ceremony | morning-05 | IMG_0044 | |
| ceremony | morning-06 | IMG_0002 | |
| ceremony | aisle-01 | IMG_1679 | down the aisle |
| ceremony | couple-01 | IMG_0055 | on the green |
| ceremony | couple-02 | IMG_0019 | |
| ceremony | couple-03 | IMG_0053 | |
| ceremony | couple-04 | IMG_9277 | mr. & mrs. copenhaver |
| ceremony | detail-01 | IMG_0026 | in their words |
| ceremony | detail-02 | IMG_0065 | |
| ceremony | detail-03 | IMG_0027 | |
| ceremony | detail-04 | IMG_0066 | |
| ceremony | detail-05 | IMG_0050 | the cake |
| cocktail | gather-01 | IMG_1582 | the bridal party |
| cocktail | gather-02..12 | IMG_1585, IMG_1588, IMG_1685, IMG_1690, IMG_9234, IMG_9237, IMG_0043, IMG_0046, IMG_0070, IMG_0201, IMG_4374 | |
| reception | recep-01 | IMG_0110 | cutting the cake |
| reception | recep-02..04 | IMG_0176, IMG_0177, IMG_0119 | |
| reception | reception-film (video) | IMG_7967 | the first dance |
| afterparty | party-01..06 | IMG_0097, IMG_0098, IMG_0089, IMG_0090, IMG_0096, IMG_0049 | |
| afterparty | party-film-1 (video) | IMG_7981 | |
| afterparty | party-film-2 (video) | IMG_7985 | |
| afterparty | party-film-3 (video) | IMG_7992 | until the lights came up |

Narrative sections (capsule.ts), each with tone:
1. **I · The Morning Of** — `ivory`, feature `morning-01` + gallery `morning-02..06`
2. **II · Down the Aisle** — `ivory`, feature `aisle-01` + gallery `couple-01..04`
3. **III · In the Details** — `ivory`, grid `detail-01..05`
4. **IV · The Party Gathers** — `dusk`, gallery `gather-01..12`
5. **V · The Reception** — `dark`, film `reception-film` + gallery `recep-01..04`
6. **VI · Until the Lights Came Up** — `darker`, films `party-film-1..3` interleaved with gallery `party-01..06`

---

## Task 1: Import, optimize & compress curated media

**Files:** Create `scripts/curate-import.mjs`; outputs into `public/media/wedding/*`.

- [ ] **Step 1: Write the import script.** It maps each source→dest (table above), downscales photos to max 2000px q82 via sharp, compresses each clip with ffmpeg (`-vf scale='min(1280,iw)':-2 -c:v libx264 -crf 24 -preset slow -an -movflags +faststart`), and extracts a poster (`-ss <20%> -frames:v 1`) named `<stem>.jpg` beside each clip. Use a `MAP` array of `{src, destDir, name}` and a `CLIPS` array.

- [ ] **Step 2: Run it.** `node scripts/curate-import.mjs` → expect "wrote N photos, 4 clips, 4 posters". Verify: `find public/media/wedding -type f | wc -l` ≈ 50 photos + 4 mp4 + 4 posters.

- [ ] **Step 3: Verify sizes.** `du -sh public/media/wedding` should be < 60 MB.

- [ ] **Step 4: Commit.** `git add public/media/wedding scripts/curate-import.mjs && git commit -m "feat: import & optimize curated wedding media (50 photos + 4 clips)"`

## Task 2: Write meta.json captions + featured hero

**Files:** Create `meta.json` in each `public/media/wedding/<chapter>/`.

- [ ] **Step 1.** ceremony/meta.json: `{"_defaults":{"visibility":"public"}, "the-kiss.jpg":{"featured":true,"id":"hero-kiss","caption":""}, "morning-01.jpg":{"caption":"before the ceremony"}, "aisle-01.jpg":{"caption":"down the aisle"}, "couple-04.jpg":{"caption":"mr. & mrs. copenhaver"}, "detail-01.jpg":{"caption":"in their words"}, "detail-05.jpg":{"caption":"the cake"}}`
- [ ] **Step 2.** cocktail/meta.json: `{"gather-01.jpg":{"caption":"the bridal party"}}`
- [ ] **Step 3.** reception/meta.json: `{"recep-01.jpg":{"caption":"cutting the cake"}, "reception-film.mp4":{"caption":"the first dance","id":"reception-film"}}`
- [ ] **Step 4.** afterparty/meta.json: `{"party-film-3.mp4":{"caption":"until the lights came up","id":"party-film-3"}}` plus explicit ids `party-film-1`, `party-film-2`.
- [ ] **Step 5.** `npm run media:build` → expect "Found ~50 photos, 4 videos". No "no poster frame" warnings. Confirm `content/generated-media.json` contains `hero-kiss`, `reception-film`, `party-film-1..3` with `thumbnail` set.
- [ ] **Step 6: Commit.** `git add public/media content/generated-media.json && git commit -m "feat: media captions + featured hero, rebuild manifest"`

## Task 3: capsule.ts — narrative data + resolver

**Files:** Create `content/capsule.ts`.

- [ ] **Step 1.** Define types and data:
```ts
import { allMedia, type MediaItem } from "@/content/media";

export type Tone = "ivory" | "dusk" | "dark" | "darker";
export type Layout = "feature" | "gallery" | "grid" | "film";

export type CapsuleSection = {
  id: string; mark: string; title: string; titleEm: string;
  blurb?: string; tone: Tone; layout: Layout;
  featuredId?: string; itemIds?: string[]; filmIds?: string[];
};

export const capsule: CapsuleSection[] = [
  { id:"morning", mark:"Chapter I", title:"The Morning", titleEm:"of",
    blurb:"Before the vows — a bouquet, a quiet hour, the light off the water.",
    tone:"ivory", layout:"feature",
    featuredId:"ceremony-morning-01", itemIds:["ceremony-morning-02","ceremony-morning-03","ceremony-morning-04","ceremony-morning-05","ceremony-morning-06"] },
  { id:"aisle", mark:"Chapter II", title:"Down the", titleEm:"aisle",
    blurb:"On the green, with the lake behind them.",
    tone:"ivory", layout:"feature",
    featuredId:"ceremony-aisle-01", itemIds:["ceremony-couple-01","ceremony-couple-02","ceremony-couple-03","ceremony-couple-04"] },
  { id:"details", mark:"Chapter III", title:"In the", titleEm:"details",
    blurb:"The words, the flowers, the cake.",
    tone:"ivory", layout:"grid",
    itemIds:["ceremony-detail-01","ceremony-detail-02","ceremony-detail-03","ceremony-detail-04","ceremony-detail-05"] },
  { id:"gather", mark:"Chapter IV", title:"The party", titleEm:"gathers",
    blurb:"Golden hour — and everyone we love, gathering.",
    tone:"dusk", layout:"gallery",
    itemIds:["cocktail-gather-01","cocktail-gather-02","cocktail-gather-03","cocktail-gather-04","cocktail-gather-05","cocktail-gather-06","cocktail-gather-07","cocktail-gather-08","cocktail-gather-09","cocktail-gather-10","cocktail-gather-11","cocktail-gather-12"] },
  { id:"reception", mark:"Chapter V", title:"The", titleEm:"reception",
    blurb:"Then the lights came down.",
    tone:"dark", layout:"film",
    filmIds:["reception-film"], itemIds:["reception-recep-01","reception-recep-02","reception-recep-03","reception-recep-04"] },
  { id:"party", mark:"Chapter VI", title:"Until the lights", titleEm:"came up",
    blurb:"The floor was full until the very last song.",
    tone:"darker", layout:"film",
    filmIds:["party-film-1","party-film-2","party-film-3"], itemIds:["afterparty-party-01","afterparty-party-02","afterparty-party-03","afterparty-party-04","afterparty-party-05","afterparty-party-06"] },
];

const BY_ID = new Map(allMedia({ includeVault:false }).map((m) => [m.id, m]));
export function resolve(ids: string[] = []): MediaItem[] {
  return ids.map((id) => BY_ID.get(id)).filter((m): m is MediaItem => !!m);
}
```
- [ ] **Step 2.** Typecheck: `npx tsc --noEmit` → PASS. (Confirms every referenced id exists is NOT checked by tsc; verify at runtime in Task 7.)
- [ ] **Step 3: Commit.** `git add content/capsule.ts && git commit -m "feat: capsule narrative content model"`

## Task 4: Film component (lazy autoplay video)

**Files:** Create `components/Film.tsx`.

- [ ] **Step 1.** Implement, modeled on VoiceTrack's `<video>` usage:
```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { MediaItem } from "@/content/media";

export function Film({ film, className }: { film: MediaItem; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false); // in-view

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setShow(e.isIntersecting);
        if (reduce) return;
        if (e.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <figure className={`relative w-full overflow-hidden bg-black ${className ?? ""}`}>
      <video
        ref={ref}
        src={film.src}
        poster={film.thumbnail}
        muted
        loop
        playsInline
        preload="metadata"
        controls={reduce}
        className="h-full w-full object-cover"
        style={{ aspectRatio: `${film.width ?? 16} / ${film.height ?? 9}` }}
      />
      {film.caption && (
        <figcaption className="absolute bottom-5 left-5 font-serif text-[0.9rem] lowercase italic text-cream/90"
          style={{ letterSpacing: "0.2em", textShadow: "0 2px 18px rgba(0,0,0,0.7)" }}>
          {film.caption}
        </figcaption>
      )}
    </figure>
  );
}
```
Note: video width/height aren't in the manifest (only posters give blur). Pass `aspectRatio` from poster dims if absent → fallback 16/9 is fine; refine in Task 8 if needed.
- [ ] **Step 2.** `npx tsc --noEmit` → PASS.
- [ ] **Step 3: Commit.** `git add components/Film.tsx && git commit -m "feat: Film component — lazy autoplay video"`

## Task 5: Tone backgrounds + capsule grid CSS

**Files:** Modify `app/globals.css` (append).

- [ ] **Step 1.** Append:
```css
/* Capsule tones — the light→dark escalation. */
.tone-ivory  { background: var(--cream);       color: var(--ink); }
.tone-dusk   { background: #e3d6bf;            color: var(--ink); }
.tone-dark   { background: #131017;            color: var(--cream); }
.tone-darker { background: #0a0810;            color: var(--cream); }
.tone-dark .chapter-mark, .tone-darker .chapter-mark { color: var(--gold-soft); }
.tone-dark .chapter-title, .tone-darker .chapter-title { color: var(--cream); }
.tone-dark .capsule-blurb, .tone-darker .capsule-blurb { color: rgba(245,240,230,0.72); }
.tone-section { transition: background 0.6s var(--ease-editorial); }

/* a simple responsive masonry-ish grid for capsule galleries */
.capsule-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:clamp(0.5rem,1vw,1rem); max-width:1400px; margin:0 auto; }
.capsule-grid .cell { position:relative; overflow:hidden; aspect-ratio:4/5; background:var(--cream-deep); }
.capsule-grid .cell img { object-position:50% 25%; transition:transform 1.2s var(--ease-editorial); }
.capsule-grid .cell:hover img { transform:scale(1.03); }
@media (max-width:760px){ .capsule-grid{ grid-template-columns:repeat(2,1fr);} }
```
- [ ] **Step 2.** `npm run build` → PASS (CSS compiles).
- [ ] **Step 3: Commit.** `git add app/globals.css && git commit -m "feat: capsule tone backgrounds + grid"`

## Task 6: CapsuleHero + CapsuleChapter + CapsuleOutro

**Files:** Create `components/CapsuleHero.tsx`, `components/CapsuleChapter.tsx`, `components/CapsuleOutro.tsx`.

- [ ] **Step 1: CapsuleHero** — full-bleed featured photo, title overlay, scrim, scroll cue. Reads `featuredImage()`; title from `site.names`; subtitle past tense.
- [ ] **Step 2: CapsuleChapter** — props `{ section: CapsuleSection }`. Wraps in `<section class="tone-section tone-<tone>">`, renders intro (chapter-mark/title/blurb via Reveal), then by layout:
  - `feature`: full-bleed `FeaturedImage`-style block for `featuredId` + a `capsule-grid` of `itemIds`.
  - `gallery`/`grid`: `capsule-grid` of `itemIds`.
  - `film`: interleave `filmIds` (Film) with `itemIds` (grid). For Chapter VI, alternate film, grid-pair, film, grid-pair, film.
  - Click any photo → existing `Lightbox` (local index state over resolved items).
- [ ] **Step 3: CapsuleOutro** — dark settle with `site.closing` and `site.markFull`.
- [ ] **Step 4.** `npx tsc --noEmit` → PASS.
- [ ] **Step 5: Commit.** `git add components/CapsuleHero.tsx components/CapsuleChapter.tsx components/CapsuleOutro.tsx && git commit -m "feat: capsule hero, chapter, outro components"`

## Task 7: Wire up the page

**Files:** Modify `app/page.tsx`, `content/site.ts`.

- [ ] **Step 1.** site.ts: change `eyebrow` to a past-tense memory line (e.g. `"a memory · lake oconee"`) and add `heroSub: "the sixth of june · two thousand twenty-six"`.
- [ ] **Step 2.** Rewrite page body:
```tsx
<TopBar />
<main>
  <CapsuleHero />
  {capsule.map((s) => <CapsuleChapter key={s.id} section={s} />)}
  <CapsuleOutro />
  {/* supporting, reframed past tense */}
  <Gallery photos={engagementPhotos()} />   {/* "before" */}
  <Venue />
  <Schedule />
</main>
<Footer />
```
Drop the empty Voices/Letters/Archive placeholders (the capsule IS the archive now).
- [ ] **Step 3.** `npm run build` → PASS. Watch for any `resolve()` returning fewer items than ids (log a warning in CapsuleChapter dev-only if `resolve(ids).length !== ids.length`).
- [ ] **Step 4: Commit.** `git add app/page.tsx content/site.ts && git commit -m "feat: assemble memory capsule page"`

## Task 8: Visual QA + polish pass

**Files:** as needed.

- [ ] **Step 1.** `npm run dev`; screenshot desktop (1440) + mobile (390) full-page via Playwright. Review by eye: hero legible, tone gradient reads as escalation, videos autoplay in view, galleries balanced, captions correct, mobile not broken.
- [ ] **Step 2.** Fix issues found (object-position on any badly-cropped photo via meta.json, video aspect ratios, spacing between tones, ensure dusk→dark transition isn't jarring).
- [ ] **Step 3.** `npm run build` PASS; reduced-motion check (videos show controls, no autoplay).
- [ ] **Step 4: Commit.** `git commit -am "polish: capsule visual QA pass"`

## Task 9: Deploy

- [ ] **Step 1.** `git push` → Vercel auto-builds. Confirm `sbandzach.com` updates and videos play on mobile Safari.
- [ ] **Step 2.** Update README "Adding photos" note if folder conventions changed.

---

## Self-review notes
- **Spec coverage:** hero (Task 6) ✓, escalation tones (Task 5) ✓, 6 chapters with exact photos/videos (Tasks 2–3) ✓, video lazy-autoplay + reduced-motion (Task 4) ✓, no-cloud storage (Task 1, all local) ✓, past-tense revamp (Task 7) ✓, supporting chapters kept (Task 7) ✓.
- **Open Q1 (supporting chapters placement):** default chosen — kept below the capsule on one scroll.
- **Open Q2 (must-keep people):** none specified; Claude curated for coverage. Revisit if user names anyone.
- **Risk:** video intrinsic width/height not in manifest → Film uses poster-derived/fallback aspect ratio; acceptable, refined in Task 8.
