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
