# sbandzach.com → The Memory Capsule

**Date:** 2026-06-08
**Status:** Design — awaiting approval
**Author:** Claude (with Harrison)

---

## 1. Summary & vision

The wedding (June 6, 2026, Lake Oconee, GA) is over. We are converting
sbandzach.com from a *pre-wedding* editorial site into a *post-wedding memory
capsule* built around ~119 phone/guest photos and 4 short dance-floor video
clips.

The chosen aesthetic is a **deliberate blend of two mockup directions**:

- **A — Quiet Luxury (editorial):** ivory, serif, Roman-numeral chapters,
  full-bleed featured photos, generous whitespace. The site's existing soul.
- **B — Cinematic Film:** near-black, full-bleed imagery, gold accents,
  autoplay video. Dramatic and immersive.

The unifying mechanic is an **escalation**: the page **opens quiet and ivory
(A) and gradually turns up into dark cinematic energy (B) as you scroll** —
mirroring the day itself, from the calm morning to the peak of the party.
Mockup C (modern mosaic) is rejected.

> Tagline for the build: *"Starts like a wedding album, ends like a wedding
> film."*

---

## 2. The core mechanic: light → dark escalation

A single scroll-driven tonal gradient ties A and B together. Each chapter has a
**tone** on a continuum from ivory to black; backgrounds, text color, image
scale, and grid density all shift along it.

| Stage | Chapters | Background | Text | Feel | Motion |
|---|---|---|---|---|---|
| **Quiet (A)** | Hero → Details | Ivory `#f6f1e9` | Ink `#2b2622` | Editorial, airy, slow | None — photos only |
| **Golden hour (transition)** | The Party Gathers | Warm dusk taupe `#e7dcc9 → #cdbfa6` | Ink | Warming, quickening | None — photos only |
| **Cinematic (B)** | Reception → Crescendo | Near-black `#0b0b0d` | Warm white `#ece7df`, gold `#c9a96a` | Dramatic, immersive, loud | Video enters & builds |
| **Settle** | Outro | Dark, easing | Soft | Calm close | None |

Implementation: per-section background classes (or a CSS custom property driven
by an IntersectionObserver) so the transition reads as a smooth dimming of the
lights. Respects `prefers-reduced-motion` (no scroll-jacking; pure CSS
transitions only).

---

## 3. Chapter-by-chapter structure (the capsule)

All counts are targets; final culling happens during the build using the
contact sheets in `~/dev/sbz-curate/`. Filenames refer to the originals.

### Hero — *Sara Beth & Zachary*
- Full-bleed **IMG_0054** (the kiss on the platform, lake behind). User-approved.
- Title in Italiana; subtitle past tense: *"the sixth of June, two thousand
  twenty-six · Lake Oconee, Georgia."*
- Dark veil over image for legibility. This is pure A.

### Chapter I — The Morning Of  *(quiet / ivory)*
- Mood: calm, before the vows. **No video.**
- Featured: **IMG_0001** (bride + maid, clubhouse).
- Gallery (~5): IMG_0009, IMG_0013, IMG_0063, IMG_0044, IMG_0002.

### Chapter II — Down the Aisle  *(quiet / ivory, grander)*
- Mood: the ceremony. Imagery gets bigger; still elegant.
- Featured: **IMG_1679** (aisle walk, sun flare).
- Gallery (~4): IMG_0055, IMG_0019, IMG_0053, IMG_9277 (couple on the green).

### Chapter III — In the Details  *(quiet / ivory, a breath)*
- Mood: the still life — the words, the flowers, the cake.
- Grid (~5): IMG_0026 & IMG_0065 (framed calligraphy), IMG_0027 & IMG_0066
  (florals), IMG_0050 (cake).

### Chapter IV — Golden Hour / The Party Gathers  *(transition / dusk)*
- Mood: friends, bridal party, guests arriving; warmth and energy rising.
  Background begins shifting from ivory toward dusk. **Still photo-only**, but
  the grid tightens and holds more images.
- Gallery (~10–12): bridal party — IMG_1582, IMG_1585, IMG_1588;
  guests — IMG_1685, IMG_1690, IMG_9234, IMG_9237; IMG_0043, IMG_0046,
  IMG_0070; cake table IMG_0201; a candid — IMG_4374.

### Chapter V — The Reception  *(cinematic / dark — the pivot)*
- Mood: lights down. Background goes near-black. **First video enters.**
- **Video (hero of the chapter): IMG_7967** — the couple dancing, intimate,
  full-bleed autoplay-muted-loop. This is the A→B turn.
- Supporting photos (~4, dark cinematic treatment): IMG_0110 (cake cutting),
  IMG_0176 (couple under tent), IMG_0177 (toast), IMG_0119 (couple, pink light).

### Chapter VI — Until the Lights Came Up  *(cinematic / dark — crescendo)*
- Mood: peak. Full-bleed motion, the room at full tilt.
- **Videos build in order:** IMG_7981 (wide floor, teal) → IMG_7985 (crowd
  building) → **IMG_7992** (4s peak, hands up — the climax).
- Best dance-floor photos interleaved (~6–8, brightest/sharpest only):
  IMG_0097, IMG_0098, IMG_0089, IMG_0090, IMG_0096, IMG_0049.

### Outro / Footer  *(settle)*
- Return to calm. One quiet closing couple frame (IMG_9277 or IMG_0055).
- *"Sara Beth & Zachary · Lake Oconee · June 6, 2026."*

**Selected ≈ 50–58 photos** from 119. The ~35 near-identical tent/dance shots
collapse to ~8; the many bridesmaid lineups collapse to ~3–4 best.

---

## 4. Video handling

- **Source:** 4 clips, 4–12s, 1.5–4.2 MB each (~10 MB total).
- **Encode:** H.264, ≤1080p, CRF ~24, `-movflags +faststart`, audio stripped
  (`-an`) — they play muted. Each lands at a few MB.
- **Playback:** `autoplay muted loop playsinline`, lazy via IntersectionObserver
  (only plays when scrolled into view → perf + battery).
- **Poster:** first frame extracted as a JPEG poster so there's no black flash.
- **Reduced motion:** if `prefers-reduced-motion`, show the poster with a tap-to-
  play control instead of autoplaying. (Matches the site's accessibility bar.)
- **Placement is the escalation payload:** no video until Chapter V; the clips
  go intimate → wide → peak across V–VI.

---

## 5. Storage architecture

- **No cloud service, no cost.** Curated photos run through the existing
  `sharp` + `plaiceholder` pipeline into `public/media/…`. The 4 compressed
  clips sit alongside. Total well under ~100 MB → fine in the repo and on Vercel.
- **Future seam (documented, not built):** if a professional photographer
  gallery (full-res, many GB) or a long videographer film arrives, that — and
  only that — gets cloud hosting (Cloudflare R2 for stills/originals, Cloudflare
  Stream or Mux for long video). The content layer will reference media by a
  URL field so swapping a local path for a CDN URL is a one-line change per item.

---

## 6. Technical implementation (existing Next.js 14 codebase)

Work happens in the GitHub-backed clone at `~/dev/sbandzach` (not iCloud).

**Reuse:** `Hero`, `FeaturedImage`, `Gallery`, `Reveal`, `Lightbox`, `Footer`.

**Add:**
- `components/Film.tsx` — lazy autoplay-muted-loop video with poster +
  reduced-motion fallback.
- A chapter background/tone mechanism — either a `ChapterSection` wrapper that
  sets a `data-tone` and CSS handles the gradient, or a scroll-linked CSS
  variable. Keep it CSS-driven; no scroll-jacking.

**Content (nothing hardcoded in components — repo convention):**
- New `content/capsule.ts` (or extend `content/media.ts`) describing the chapter
  order, tone, copy, and the photo/video assignments above.
- Update `content/site.ts` and `content/schedule.ts` copy to past tense.

**Media build:**
- Extend `scripts/media-build.ts` to also handle video: detect `.mp4`, record
  dimensions/duration, and generate a poster JPEG. Photos keep current behavior
  (dimensions + blur placeholder → `content/generated-media.json`).
- HEIC originals are already converted to JPG in staging.

**Quality bar (unchanged):** keep Lighthouse mobile ≥ 90, CLS 0, reduced-motion
respected, palette-only colors, no analytics/tracking, no guest-upload forms.

---

## 7. Past-tense "memory" revamp

- Hero + intro copy: from countdown to keepsake (past tense).
- `Schedule` chapter: reframed as *"the weekend, as it happened"* (past tense)
  rather than an upcoming program — kept as a supporting chapter.
- Remove "forthcoming / coming soon" placeholders now that content exists (the
  site already auto-hides empty chapters).

---

## 8. Existing supporting chapters — disposition

These are preserved (the new capsule is the lead experience, they live below /
secondary):

- **In Frames (engagement gallery):** kept as a quiet prelude/archive — "before."
- **Great Waters (venue):** kept, copy gently past-tense.
- **The Weekend (schedule):** reframed past tense (see §7).
- **The Voices / In Their Words:** unchanged; auto-appear if/when toasts or
  guest notes are added later. No new content required now.

---

## 9. Workflow & deploy

1. Curate finals from `~/dev/sbz-curate/` → drop into `public/media/…`.
2. Compress the 4 clips → `public/media/…`.
3. `npm run media:build` → regenerates `content/generated-media.json` + posters.
4. `npm run dev` → preview the escalation locally; `npm run audit:screenshot`
   for desktop+mobile checks.
5. Commit & push → Vercel rebuilds `sbandzach.com` in ~1–2 min.

---

## 10. Out of scope (now)

- Professional photographer gallery / videographer film (future cloud add-on,
  §5 seam).
- Guest-upload forms (the site deliberately has none).
- New Voices/Letters content (appears automatically when provided).
- Mockup C (modern mosaic) — rejected.

---

## 11. Assumptions & open questions

- **A1:** These 119 photos + 4 clips are the content for v1; designed so a pro
  set can drop in later without a rebuild ("not sure yet" on pro media).
- **A2:** Final per-photo selection is delegated to Claude during the build,
  using this spec's shot list as the working edit (user said "you analyze and
  decide").
- **Q1:** Keep the engagement/venue/schedule supporting chapters *below* the new
  capsule on one long page, or move them behind a small secondary nav? (Default:
  below, one continuous scroll — matches the current single-page feel.)
- **Q2:** Any must-include photos or people not to cut? (Default: Claude curates
  for best images + balanced coverage of people/events.)
