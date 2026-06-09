# Curation notes — polish pass (June 2026)

Flags only — nothing here was removed. Owner decides.

## Mis-filed / suspect files

- **`wedding/ceremony/kiss-alt.jpg`** is not a kiss: it's a portrait of three
  guests (mom in blue, woman in pink, young boy) on the lawn. It isn't shown in
  any chapter today, but it sits in the ceremony folder under a wrong name.
  Rename/re-file it (it's a nice frame — could suit "On the green") or hide it.

## Unused bench (in `public/media`, not placed in any chapter)

- `reception/dance-01..07.jpg`, `dancefloor.jpg`, `dancing.jpg`,
  `firstdance.jpg`, `board-girls.jpg`, `board-toast.jpg`, `floor-kiss.jpg`,
  `party-02..08.jpg`, `fireworks.jpg` (phone) — all still `public`, so they
  would appear if an Archive chapter is ever re-mounted. If they're permanently
  benched, mark them `"visibility": "hidden"` in the folder's `meta.json`.

## Grid-squaring opportunity

- The reception grid runs 16 layout units (14 photos, 2 wide) — one short of
  filling its last row, which is why the send-off now stands alone as a
  centred closing frame. That reads as intentional, but if you'd rather have
  a full final row, adding **one** more portrait still (e.g. `firstdance.jpg`
  or `floor-kiss.jpg` from the bench) would square it exactly.

## Soft frames (kept, flagged)

- `reception/couple-film.jpg` and `reception/cake-film.jpg` are video-still
  grabs — noticeably softer than their neighbours at desktop cell size.
  They earn their place as moments; swap only if sharper frames of the same
  moments surface.
- `afterparty/film-3.mp4` is 19.5s of dark confetti footage and resists
  compression (5.7 MB after re-encode, the heaviest asset on the page). If a
  shorter cut (~10s) exists, it would halve again.

## Over-budget but kept for quality

- `cocktail/party-pro.jpg` (638 KB) and `cocktail/bridesmaids-pro.jpg`
  (625 KB) sit just over the 600 KB photo budget; recompressing them further
  produced visible generation loss, so they stay.
