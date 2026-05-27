# Adding Photos, Videos & Voices — a plain-English guide

For Harrison. No coding required — you drop files into folders, optionally write
a small note next to them, and run one command. Take your time; nothing here can
break the site.

---

## The one rule

**All media lives under `public/media/`.** Each folder is a part of the site.
You add files, then run the build command. That's the whole loop.

---

## 1. Where each thing goes

```
public/media/
  engagement/        the engagement photos (already here — 20 of them)
  wedding/
    friday/          Friday welcome-drinks photos
    ceremony/        ceremony photos
    cocktail/        cocktail-hour photos
    reception/       reception photos
    afterparty/      after-party photos
  toasts/            audio recordings of toasts & speeches  (.mp3, .wav, .m4a)
  dances/            video clips of the dances             (.mp4, .mov)
  letters/           scanned letters or short audio notes
  vault/             private / candid things (hidden — see the Vault below)
  speakers/          headshots of whoever is speaking, for the Voices chapter
```

**Naming:** anything sensible works — `ceremony-01.jpg`, `first-dance.mp4`,
`best-man-cade.mp3`. Lowercase, no spaces (use dashes). The photos sort
alphabetically unless you set an order (see captions below).

---

## 2. Run the build

After adding or changing files, open Terminal in the project folder and run:

```bash
npm run media:build
```

You'll see a summary like `Found 47 photos, 12 videos, 8 audio, 3 letters.`
That's it — the site now knows about your new files. It is always safe to run
again, and it does nothing harmful if a folder is empty.

---

## 3. Captions, speakers & pull-quotes (optional)

To add a caption to a photo, a speaker name to a toast, or the highlighted line
of a speech, create a file called **`meta.json`** inside that folder. It maps a
filename to its details. Example for `public/media/toasts/meta.json`:

```json
{
  "best-man-cade.mp3": {
    "speaker": "Cade",
    "speakerRole": "Best Man",
    "pullQuote": "I have never seen him look at anyone the way he looks at her.",
    "speakerPhoto": "/media/speakers/cade.jpg",
    "transcript": "Line one of the speech.\nLine two.\nLine three.",
    "sortOrder": 1
  }
}
```

Every field is optional. The useful ones:

| Field | What it does |
|---|---|
| `caption` | small italic caption under/over a photo |
| `speaker` | the person's name (toasts, dances, letters) |
| `speakerRole` | e.g. `Best Man`, `Father of the Bride` — shown in gold small caps |
| `speakerPhoto` | path to their headshot (put the file in `speakers/`) |
| `pullQuote` | the one line that floats large before the audio plays |
| `transcript` | the full text; lines (separated by Enter) highlight as the audio plays |
| `sortOrder` | a number; lower numbers come first |
| `featured` | `true` to make a photo the big full-bleed image |

> Tip: the `"transcript"` uses `\n` for a line break, or just press Enter inside
> the quotes. Each line lights up in gold in turn while the recording plays.

---

## 4. The Letters wall (short written notes)

The Letters chapter shows short written quotes from people who didn't give a
full speech. These aren't files, so they live in one tidy text file:
**`content/letters.ts`**. Open it — there are clearly-marked sample cards and an
empty `real` list with instructions. Copy a block, change the words and the
name, and you're done. Run nothing; they appear on the next site build.

---

## 5. Videos (the dances)

Drop the clip in `dances/` (e.g. `first-dance.mp4`). For the best look, also
drop a single still frame beside it with the **same name** ending in `.jpg`
(e.g. `first-dance.jpg`) — that becomes the poster image so there's no black
flash before it plays.

---

## 6. The Vault (private)

Anything you put in `public/media/vault/` is hidden from the normal site. It
only appears for someone who types **`060626`** (the wedding date) on their
keyboard while on the page. Use it for candid or family-only moments.

---

## 7. Hiding something

To hide any single file without deleting it, add it to that folder's `meta.json`
with `"visibility": "hidden"`:

```json
{ "ceremony-14.jpg": { "visibility": "hidden" } }
```

---

## 8. Seeing it & putting it live

- **Preview on your computer:** `npm run dev`, then open the link it prints
  (usually `http://localhost:3000`).
- **Publish to the web:** `git add -A && git commit -m "new photos"` then
  `git push`. Vercel rebuilds and `sbandzach.com` updates within a minute or two.
  (One-time setup of Vercel is covered in the README.)

That's everything. When in doubt: add files → `npm run media:build` → preview.
