# sbandzach.com

A public, luxury editorial wedding time-capsule for **Sara Beth Rountree &
Zachary Copenhaver** — June 6, 2026, Lake Oconee, Georgia. A gift and a
keepsake, not a utility site (RSVP, registry, travel and FAQ live on their Zola
page). Quiet luxury, editorial, built to still feel meaningful in thirty years.

> Built with the iteration loop and aesthetic rubric in
> [`docs/CLAUDE-CODE-GOAL.md`](docs/CLAUDE-CODE-GOAL.md). Final design scores and
> the per-iteration log are in [`audit/SCORECARD.md`](audit/SCORECARD.md).

## Stack

- **Next.js 14** (App Router, TypeScript) · **Tailwind CSS**
- **Framer Motion** — refined motion, used sparingly
- **sharp** + **plaiceholder** — image optimization & blur placeholders
- **wavesurfer.js v7** — audio waveforms in the Voices chapter
- Fonts: **Italiana** (display) + **Cormorant Garamond** (body/italic), self-hosted via `next/font`
- Deploy target: **Vercel**

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

Engagement photos are already fetched into `public/media/engagement/`. If you
ever need them again: `npm run media:fetch-zola`.

### Note on `node_modules` (this checkout lives in iCloud Drive)

To keep iCloud from syncing tens of thousands of dependency files, `node_modules`
is symlinked to `~/.sbandzach-build/node_modules` (outside iCloud) and the Next
build output uses `distDir: .next.nosync` locally. If `npm install` ever
replaces the symlink with a real folder, restore it with:

```bash
mv node_modules "$HOME/.sbandzach-build/node_modules"
ln -snf "$HOME/.sbandzach-build/node_modules" node_modules
```

None of this affects Vercel — there `distDir` is the standard `.next` and
dependencies install normally. On any non-iCloud machine you can ignore it
entirely and just `npm install`.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run media:fetch-zola` | One-time fetch of the 20 engagement photos |
| `npm run media:build` | Scan `public/media`, generate `content/generated-media.json` (types, dimensions, blur placeholders). Idempotent; safe on empty folders. |
| `npm run audit:screenshot` | Playwright screenshots of every view at 1440×900 and 390×844 → `audit/iter-{N}/` (`ITER=N`) |

## Adding photos, videos & voices

See [`docs/MEDIA_GUIDE.md`](docs/MEDIA_GUIDE.md) — a non-technical guide. In
short: drop files into the right `public/media/…` folder, optionally add a
`meta.json` for captions/speakers/pull-quotes, then run `npm run media:build`.

After the wedding, set `weekendHasHappened: true` in `content/site.ts` to retire
the "Forthcoming" chapter once real photos, voices and letters are in.

## Project structure

```
app/                Next App Router — layout, globals.css (design tokens), page
components/         Hero, FeaturedImage, Gallery, Schedule, Venue, Voices,
                    VoiceTrack, Letters, Archive, Forthcoming, Vault, Footer, …
content/            site, schedule, venue, media (typed), letters, vault — all
                    copy and data live here; nothing hardcoded in components
public/media/       photos, videos, audio (see MEDIA_GUIDE)
scripts/            media-build, media-fetch-zola, audit (Playwright)
docs/               MEDIA_GUIDE, PRIVACY_NOTES, MOM_PREVIEW, the goal brief
audit/              SCORECARD + per-iteration screenshots
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel: **New Project → Import** the repo. Framework auto-detects as
   Next.js; no build settings to change (`distDir` resolves to `.next` on
   Vercel automatically).
3. Deploy. You'll get a `*.vercel.app` URL.
4. **Attach the domain:** Project → Settings → Domains → add `sbandzach.com`
   (buy it through Vercel Domains or point your registrar's nameservers /
   records as Vercel instructs). HTTPS is automatic.
5. To publish updates: commit & push — Vercel rebuilds and `sbandzach.com`
   updates within a minute or two.

## Quality bar

- Lighthouse (mobile, production): **Performance 92 · Accessibility 100 ·
  Best Practices 96 · SEO 100** (CLS 0, TBT 0).
- Respects `prefers-reduced-motion`. Custom focus rings. Palette-only colours.
- No analytics, tracking pixels, social embeds, or guest upload forms — by design.

> Security note: this checkout pins Next.js to the latest patched 14.2.x. Two
> low-severity advisories remain against Next's bundled `postcss` (a CSS-stringify
> XSS that requires untrusted CSS input — not applicable to a static editorial
> site); clearing them would require Next 16, outside the locked stack.

## Read next

- [`docs/MEDIA_GUIDE.md`](docs/MEDIA_GUIDE.md) — add content (non-technical)
- [`docs/MOM_PREVIEW.md`](docs/MOM_PREVIEW.md) — what's ready vs. forthcoming
- [`docs/PRIVACY_NOTES.md`](docs/PRIVACY_NOTES.md) — what must never go live
- [`audit/SCORECARD.md`](audit/SCORECARD.md) — design scores & iteration log
