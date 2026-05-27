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
- **Chapter III · The Place** — Reynolds Lake Oconee and the Ritz-Carlton.
- **Chapter IV · The Voices** — the centerpiece. Press the play button on the
  sample track to see how it will work: a line floats up, a portrait eases in
  from the edge, a gold waveform plays, and the words highlight in time. Real
  toasts and dances slot straight into this after the wedding.
- **Chapter V · In Their Words** — the letters wall, shown with its layout in
  place and tender "in time" placeholders.
- **Forthcoming** — a graceful note about what the weekend will add.
- **A small secret.** Type `060626` anywhere and a hidden chapter opens. Don't
  tell everyone.

## Honest notes (so nothing surprises her)

- The **Voices** track is a *sample* — silent, with placeholder words that say
  so. It's there to show the experience, not to pretend a toast exists yet.
- The **Letters** cards are placeholders marked "— in time."
- **The Archive** (every weekend photo, with filters) and real Letters/Voices
  appear automatically once those files are added — see `docs/MEDIA_GUIDE.md`.

## What comes after the wedding

1. Drop the weekend photos, toast recordings, dance clips and letters into
   `public/media/…` (guide in `MEDIA_GUIDE.md`), run `npm run media:build`.
2. Flip `weekendHasHappened` to `true` in `content/site.ts` to retire the
   "Forthcoming" chapter once the real content has landed.
3. Deploy. The Archive lights up, the Voices fill with real toasts, and the
   Letters wall fills with real notes.

## The test it's built to pass

> *Would this still feel meaningful thirty years from now if they opened it?*

That's the bar. Quiet, editorial, theirs.
