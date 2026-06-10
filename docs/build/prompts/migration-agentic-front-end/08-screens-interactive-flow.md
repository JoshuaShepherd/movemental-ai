# AF-08 — Screens: interactive flow (home, beat, readback, path)

**Prompt ID:** AF-08  
**Target agent:** Cursor / Claude Code  
**Primary repo:** `movemental-ai`  
**Blocks:** AF-07  
**Last updated:** 2026-06-09

---

## 1. Role and stance

Implement the **interactive core** of the agent room — screens that collect input and drive scene transitions.

Static references:

| Screen | Source HTML | Source JS |
| --- | --- | --- |
| Home | `pages/home.html` | `screens.js` `id==='home'` |
| Beat | `pages/beat/0.html` … `5.html` | `screens.js` + `map-q.js` |
| Readback | `pages/readback.html` | `screens.js` + `answerMap` in runner |
| Path | `pages/path.html` | `screens.js` + `bindPathDrawers` |

Skills: **`design-section`**, **`responsive-audit`**, **`visual-storytelling-audit`** (readback spine).

---

## 2. Goal

Full visual + interaction parity for four screens. Wire callbacks into runner state (`mapAnswers`, `mapRead`, `answerMap`, path drawer toggles).

---

## 3. Home screen

### 3.1 Markup (from prototype)

- Eyebrow: "Non-profit · Church · Institution · Leader"
- H1: "Navigate AI without eroding the trust…"
- Body with `#phrase` span for gesture target
- Leader portrait band (`bandHTML()` / `LEADERS`)

### 3.2 Interactions

- Face click → `play(leaderScene(i))` with flip rect capture (optional polish)
- Sheet class: `home` (no margin rule, centered)

### 3.3 React files

```text
components/agent-room/screens/home-screen.tsx
components/agent-room/screens/leader-band.tsx
```

---

## 4. Beat screen (reality check)

### 4.1 UI

- Beat progress: mono count + rail + fill animation (`beatDots(qi)`)
- Question `.q` from `MAP_Q[qi]`
- Option buttons `.opt` with stagger animation `--i`

### 4.2 Logic

Port `answerMap(qi, oi)` from runner/screens:

- Lock opts on select
- Advance qi or transition to readback scene
- Reset `mapAnswers` when `qi === 0`

### 4.3 Placeholder

Composer placeholder: "Tap an answer above, or type your own…"

---

## 5. Readback screen

### 5.1 UI

- Vertical spine with four stages (safety, sandbox, training, tech)
- Severity ticks, "you are here" elevation
- `#rbphrase` emphasis span

### 5.2 Data

Compute stage severity from `mapAnswers` / `mapRead` — port scoring from source runner.

---

## 6. Path screen

### 6.1 UI

- Stack card with expandable drawers (`path-drawer`, stages 1–4)
- Color ramps per stage CSS variables
- `bindPathDrawers` → React `useState` for active drawer

### 6.2 CSS priority

Path drawer transitions are complex — port literally from `ink-band.css` lines 101–128 before Tailwind simplification.

---

## 7. HTML → React checklist (each screen)

- [ ] Open static HTML snapshot; diff text content character-for-character
- [ ] Port all class names to CSS module
- [ ] Port `@keyframes` used by screen (optIn, beatGrow, rbIn, settle, faceIn)
- [ ] Replace `addEventListener` with React handlers
- [ ] Test mobile breakpoints from prototype `@media` blocks

---

## 8. Definition of Done

- [ ] Home matches `pages/home.html` (hero + band).
- [ ] Beat cycles through `MAP_Q` length; option select advances.
- [ ] Readback reflects answer pattern (manual test with known answers).
- [ ] Path drawers expand/collapse with stage colors.
- [ ] Gesture target `#phrase` exists on home for opening scene.
- [ ] `pnpm typecheck` passes.
- [ ] §10 + master runner updated.

---

## 9. Verification

Run stub opening → tap "Get a clear next AI step" → complete beat flow → readback.

Compare each step to `npx serve` prototype side-by-side at same viewport width.

---

## §10 Attempt log

<!-- Per-screen status, known copy deltas, test notes. -->

### 2026-06-09 — AF-08 interactive screens (home / beat / readback / path)

**Files created**

| Path | Role |
| --- | --- |
| `src/components/agent-room/screen/stub/home-screen.tsx` | Audience eyebrow + trust H1 + `#phrase` body + leader band. |
| `src/components/agent-room/screen/stub/leader-band.tsx` | The 17-portrait "Built with & backed by" band (`bandHTML` port); faces → `onSelect` (AF-10). |
| `src/components/agent-room/screen/stub/beat-screen.tsx` | Mono count + ink rail/fill + question + staggered options; local lock/chosen on tap → `onBeatAnswer`. |
| `src/components/agent-room/screen/stub/readback-screen.tsx` | Vertical spine, 4 stages, Safety = `#hereStage`, severity ticks + gap lines from `mapRead`, `#rbphrase`. |
| `src/components/agent-room/screen/stub/path-screen.tsx` | The 4 stage drawers with per-stage color ramps; React accordion (`bindPathDrawers` port). |
| `src/lib/agent-room/beat-scenes.ts` | `beatScene(qi, oi, read)` — the `answerMap`/`beatStep` choreography (circle → reply → advance, or finish into readback with named gaps). |

**Files changed**

| Path | Change |
| --- | --- |
| `src/components/agent-room/ink-band.module.css` | Ported the screen-content CSS (shared `.q`/`.body`/`.honest`/`.sec`; band + `faceIn`; beat `dots`/rail/`optIn`; readback spine + `rbIn`; path drawers + ramps + reduced-motion), with Ink Band tokens. |
| `use-agent-room-stub.ts` | `mapAnswersRef` + `mapRead` state; `onBeatAnswer` = `answerMap` (record → `computeMapRead` → `play(beatScene)`); `show beat qi=0` resets answers; exposes `mapRead`. |
| `screen/stub/{stub-screen,placeholders}.tsx` | Registry points home/beat/readback/path at the real components; `ScreenProps` gains `mapRead`; placeholders trimmed to the remaining 8. |
| `agent-room.tsx` | `StubRoom` threads `mapRead` into `StubScreen`. |

**State threading (the crux).** The prototype's `mapAnswers`/`mapRead` globals
now live in the stub hook: answers in a ref (not displayed), the computed
`mapRead` in state (the readback renders it). `onBeatAnswer(qi, oi)` records the
answer, computes the read, and plays `beatScene`; the gesture targets are
selectors the screens expose — `[data-oi]` (circle the choice), `#opts` (arrow),
`#hereStage`/`#rbphrase` (readback). Each `show beat` re-mounts the beat screen
(nonce key), so its local lock/chosen state resets per question.

**Copy:** byte-identical to `pages/home.html` / `beat` / `readback.html` / `PATH_HTML`.

**Decisions / deviations**

- **Portrait band uses `<img>`** (one file-level eslint-disable) — small static
  assets with a custom grayscale→color hover filter; next/image adds nothing and
  would complicate the AF-10 FLIP. `id="faces"`/`id="ph-N"` kept for that FLIP.
- **Leader FLIP-to-hero is deferred** (AF-08 §3.2 "optional polish") to AF-10,
  where the leader screen lands; faces are clickable now (→ `onLeaderSelect`,
  no-op until AF-10).
- **CSS-module camelCase** for multi-word classes (`beatCount`, `pathDrawer`, …);
  `data-stage`/`data-oi` stay literal attributes (not hashed) so the gesture
  selectors and stage ramps resolve.

**Verification — headless Chromium (Playwright), reduced-motion, full flow:**

- [x] **Home**: eyebrow + `#phrase` + **17 faces** (first = "Alan Hirsch /
  Missional theologian"), centered home sheet.
- [x] **Beat**: boots at "01 / 06" with the question + `#opts` + 3 options;
  answering **cycled all six** questions, each tap advancing the count.
- [x] **Readback** reflects the answer pattern: answered q1→sev-3 safety,
  q6→sev-2 tech, clears elsewhere → "you are here" = **Safety**, both gap lines
  surfaced ("AI is already in use, unnamed and ungoverned" + "fragmented
  systems…"), **5 severity ticks** (3 + 2). `#rbphrase` present.
- [x] **Path**: 4 drawers, Safety open (panel `128px` vs `0px`); tapping drawer 2
  toggles `active = [F, T, F, F]` (accordion). Stage ramps via `data-stage`.
- [x] `#phrase` exists on home for the opening gesture.
- [x] `pnpm typecheck` green; `eslint` clean; **0 console errors**.
- Pixel side-by-side vs `npx serve` → AF-12.
