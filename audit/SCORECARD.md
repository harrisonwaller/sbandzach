# SBANDZACH.COM — Design Scorecard

The site is not done until all 8 rubric dimensions score ≥9/10, the micro-detail
checklist is 100%, and the stopping criteria in the goal doc are met.

## DO NOT REGRESS

Once true, these must stay true through every iteration:

- [ ] Names hit hard on first load — Italiana, line-height ≤0.95, generous space
- [ ] Uppercase labels tracked ≥0.3em (chapter marks, attire, date)
- [ ] Schedule on ink (#1a1612), not cream
- [ ] Voices on near-black; play button is a thin circle, not filled chunky
- [ ] Audio waveform is gold/honey, never blue/default
- [ ] Transcript line highlights in gold and follows playback
- [ ] All photos have blur placeholders, no layout shift
- [ ] Gallery has ≥3 aspect ratios in play, never a uniform grid
- [ ] Roman numerals everywhere a date appears
- [ ] Footer dark ink with cream text
- [ ] Focus rings are the custom gold outline, never browser blue
- [ ] Only palette colors used — no default Tailwind grays
- [ ] No private logistical content anywhere
- [ ] Vault opens on typing 060626
- [ ] Mobile: no horizontal scroll, hero names fit, tap targets ≥44px

---

## Rubric (0–10 each, target ≥9)

| Dimension | Description |
|---|---|
| Typography | Hierarchy, tracking on caps, intentional italics, editorial pairing |
| Spatial composition | Asymmetry where intended, structural whitespace, vertical rhythm |
| Color | Cream/ink/honey restraint, gold rare, photos do the color work |
| Motion | High-impact moments only, slow refined easing, restraint |
| Mobile | Re-thought layouts, clamp() type, ≥44px targets, no overflow |
| Emotional resonance | Names land, Voices quotes land, schedule = program, Vault = secret |
| Performance | Lighthouse mobile ≥90, lazy below fold, fonts preloaded, no CLS |
| Copy | No clichés, short & human, roman numerals, lowercase italic accents |

---

## Iteration log

### Iteration 1 — baseline
| Dim | Score | Note |
|---|---|---|
| Typography | 8 | Italiana/Cormorant pairing reads editorial; caps tracked ≥0.4em. |
| Spatial | 7.5 | Gallery collage + Voices strong; schedule/letters rhythm can tighten. |
| Color | 8.5 | Cream/ink/gold restraint excellent; photos do the work. |
| Motion | 7 | Loader/hero/reveals present; waveform not yet rendering (bug). |
| Mobile | 8 | Re-laid out, names fit, no overflow. |
| Emotional | 8 | Names land; Voices layout lands; Vault untested. |
| Performance | — | Not yet measured. |
| Copy | 8.5 | Roman numerals, lowercase italic accents, no clichés. |

Fixes made: reduced-motion accessibility bug (Reveal blanked sections).

### Iteration 2 — engineering / motion correctness
| Dim | Score | Note |
|---|---|---|
| Typography | 8.5 | — |
| Spatial | 7.5 | unchanged; next focus. |
| Color | 9 | gold waveform confirmed; palette airtight. |
| Motion | 8.5 | wavesurfer renders, transcript highlights in gold, hydration mismatch fixed. |
| Mobile | 8 | — |
| Emotional | 8.5 | Voices fully works; **Vault confirmed** (060626 reveals it). |
| Performance | — | pending Lighthouse. |
| Copy | 8.5 | — |

Fixes: wavesurfer init-on-expand (was initialising against a null ref); Hero
hydration mismatch removed (constant initial state); waveform made more visible.

### Iteration 3 — art director (spatial + typography)
| Dim | Score | Note |
|---|---|---|
| Typography | 9 | balanced title/quote line-breaks; tracking dialled in. |
| Spatial | 9 | schedule now reads as a printed program (right-aligned times + gutter rule); venue alternation clean. |
| Color | 9 | — |
| Motion | 8.5 | — |
| Mobile | 8 | next focus. |
| Emotional | 9 | program + columns + Voices + Vault all land. |
| Performance | — | measuring next. |
| Copy | 9 | footer now roman numerals (was spelled out). |

Micro-detail checklist run: all items pass except Lighthouse (pending iter 4).

### Iteration 4 — performance reviewer
**Lighthouse (mobile, production build):**
Performance **92** · Accessibility **100** · Best Practices **96** · SEO **100**
(FCP 1.5s · TBT 0ms · CLS 0 · LCP 3.3s — the loader's intentional reveal.)

| Dim | Score | Note |
|---|---|---|
| Typography | 9 | — |
| Spatial | 9 | — |
| Color | 9 | — |
| Motion | 9 | loader is now compositor-driven; hero names paint immediately. |
| Mobile | 8.5 | verified at 390px; no overflow; tap targets ok. |
| Emotional | 9 | names "hit hard on first load" (now instant under the lifting loader). |
| Performance | 9 | Lighthouse 92 ≥ 90 ✓ (CLS 0, TBT 0, A11y 100). |
| Copy | 9 | — |

Root cause fixed: a JS-mounted loader appeared after hydration and re-occluded
the LCP text (3.8s). Replaced with a server-rendered, CSS-faded loader; hero
names render statically. LCP 3.8s → 3.3s, performance 88 → 92.

### Iteration 5 — privacy + copy + mom preview
**Privacy review: PASSED.** No phone numbers, no shuttle/room-block/airbnb/flight
data, no PII. Only public Zola venue addresses appear. No /uploaded_files.

| Dim | Score | Note |
|---|---|---|
| Typography | 9 | — |
| Spatial | 9 | — |
| Color | 9 | — |
| Motion | 9 | — |
| Mobile | 9 | verified: no horizontal scroll; tap targets enlarged (topbar link, track markers). |
| Emotional | 9 | — |
| Performance | 9 | Lighthouse 92. |
| Copy | 9.5 | Letters cards now read "— in time" (was dev-y "PLACEHOLDER"); Voices reads "THE VOICES — FORTHCOMING". |

**Mom Preview verdict:** the names land on first load; the program reads like
printed stationery; the Voices pull-quote and gold waveform feel like a real
keepsake; the forthcoming notes are tender, not unfinished. This would move Beth.

### Iteration 6 — convergence check
Rubric scores unchanged from iter 5 (all ≥9) — the design has converged. One
interaction bug fixed: the Voices transcript auto-scroll used `scrollIntoView`,
which bubbled up and scrolled the whole window (a playing toast would yank the
page); now it scrolls only within the transcript box. Audit footer positioning
hardened. No score-moving changes remained.

| Dim | Final |
|---|---|
| Typography | 9 |
| Spatial composition | 9 |
| Color | 9 |
| Motion | 9 |
| Mobile | 9 |
| Emotional resonance | 9 |
| Performance | 9 (Lighthouse 92) |
| Copy | 9.5 |

---

## STOPPING CRITERIA — MET

1. ✅ All 8 rubric dimensions ≥9/10
2. ✅ Micro-detail checklist 100% (Lighthouse mobile 92 ≥90; tap targets; gold
   waveform; transcript highlight; roman numerals; ink schedule; vault; custom
   focus rings; palette-only colours; no CLS)
3. ✅ 6 iterations completed (minimum 5)
4. ✅ Converged — iteration 6 produced no rubric-score improvement (bug-fix only)
5. ✅ Privacy review passed — zero private logistical content
6. ✅ Mobile reviewed side-by-side with desktop — re-laid-out, no overflow, feels intentional
7. ✅ Mom Preview pass — "this would move Beth"

---

## Polish pass — 2026-06-09 (`polish/chefs-kiss`, screenshots in `polish-0/` baseline, `polish-1/` final)

Scored against the original 8 dimensions plus the two polish-phase rows
(Weight, Crop integrity) from `docs/CLAUDE-CODE-GOAL-POLISH.md`.

| Dimension | Before | After | Notes |
|---|---|---|---|
| Typography | 9 | 9 | untouched (locked) |
| Spatial composition | 8.5 | 9.5 | orphan cells now centred closing frames; reception re-paced to the night's chronology |
| Color | 9 | 9.5 | dusk→dark seam: the lights go down instead of cutting out |
| Motion | 9 | 9 | hero entrance identical, now CSS-driven (faster first paint, same feel) |
| Mobile | 8 | 9.5 | landscape features keep natural aspect (7-person frame no longer cropped to ~52%); rehearsal orphan becomes full-width closer |
| Emotional resonance | 9 | 9.5 | reception now ends band → fireworks → send-off standing alone |
| Performance | 7 | 9.5 | Lighthouse mobile (devtools throttling): perf 98 / a11y 100 / bp 100; LCP 1.7s; CLS 0; TBT 0ms. Videos 28→19.6 MB; photo median 276 KB |
| Copy | 9 | 9 | untouched; 33 descriptive alts added (alt → caption → fallback) |
| Weight (new) | 5 | 8.5 | video budget (≤12 MB) intentionally exceeded: film-3 (5.7 MB) keeps 19.5s of dark confetti footage banding-free — quality rule wins |
| Crop integrity (new) | 8 | 10 | every feature/cell verified whole-faced at 1440px and 390px |

Also fixed during the pass (found, not sought): hydration failure for
prefers-reduced-motion visitors (hero scroll cue + film play affordance were
conditionally rendered); stale video dimensions in the manifest after
re-encode; footer monogram below AA contrast.

Convergence: final read-through (hero → vault → finale, both viewports)
produced an empty breaks-the-spell list. Remaining owner decisions live in
`audit/CURATION_NOTES.md`.
