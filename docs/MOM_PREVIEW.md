# Mom Preview — what to show Beth tonight

A quick map of what's finished and what fills in after the weekend, so you can
share it with confidence before the photographs and voices exist.

## Ready now (show this)

- **The opening.** The "S · Z" mark lifts to reveal their names in full. This is
  the moment — let it load on its own.
- **The names & date.** Sara Beth & Zachary, VI · VI · MMXXVI, Lake Oconee.
- **The featured frame** — the black-and-white columns shot, full screen.
- **Chapter I · In Frames** — all twenty engagement photographs, in an editorial
  collage. Tap any photo for the full-screen viewer (arrows / Esc to close).
- **Chapter II · The Weekend** — the schedule, set like a printed program on
  ink: Friday welcome drinks, the ceremony, the reception, the after-party.
- **Chapter III · The Place** — where the ceremony/reception are (Great Waters)
  and where the welcome drinks and after party are (the Ritz-Carlton). Plain.
- **A small secret.** Type `060626` anywhere and a hidden chapter opens. Don't
  tell everyone.

## What's intentionally not here yet

The site is a *time capsule* — it fills in after the weekend. Until then, three
chapters stay quietly absent (no placeholders, no "coming soon"):

- **The Voices** — toast and dance recordings (each plays with a waveform, an
  edge-bleed portrait, and a transcript that highlights in time).
- **In Their Words** — short written notes from family and friends.
- **The Archive** — every approved photo from the weekend, with day-by-day filters.

These are fully built; they appear the moment their content is added.

## What comes after the wedding

1. Drop the weekend photos, toast recordings, dance clips and letters into
   `public/media/…` (guide in `MEDIA_GUIDE.md`), run `npm run media:build`.
   For written notes, edit `content/letters.ts`.
2. Deploy (`git push`). The Voices fill with toasts, the Letters wall fills with
   notes, and the Archive lights up — automatically, no code changes.

## The test it's built to pass

> *Would this still feel meaningful thirty years from now if they opened it?*

That's the bar. Quiet, editorial, theirs.
