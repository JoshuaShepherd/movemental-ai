# AF-04 — Ink voice and SVG gesture layer

**Prompt ID:** AF-04  
**Target agent:** Cursor / Claude Code  
**Primary repo:** `movemental-ai`  
**Blocks:** AF-03  
**Last updated:** 2026-06-09

---

## 1. Role and stance

Port `movemental-agentic-front-end/js/ink.js` to React hooks/components. This is the signature interaction layer — ink voice typing effect and hand-drawn gestures.

Skills: **`gsap-react`** (optional alternative to rAF), **`responsive-audit`** (overlay sizing).

---

## 2. Goal

Implement:

1. **`inkLine(text)`** — Caveat voice line with clip-path reveal + nib SVG animation
2. **`drawGesture(kind, target)`** — underline, circle, arrow on DOM targets
3. **`clearInk()`** — remove SVG paths
4. **`sizeOverlay()`** — sync SVG dimensions to screen zone on resize

Respect `prefers-reduced-motion: reduce` (prototype skips animation).

---

## 3. Source reference

File: `js/ink.js`

| Function | Behavior |
| --- | --- |
| `inkLine` | Append `.vline`, animate `.vspan` clip-path, move `.nib` |
| `underline` | Rough path under element bbox |
| `circle` | Elliptical rough circle around element |
| `arrowTo` | Curved arrow pointing at element |
| `resolveEl` | Selector string or element |
| `localRect` | Element rect relative to `#screen` |

CSS classes: `.vline`, `.vline.old`, `.vspan`, `.nib`, `.stroke` (filter `#rough`)

SVG defs: `#rough`, `#marker` (marker used by lead chips — AF-11)

---

## 4. React architecture

### 4.1 Components / hooks

```text
components/agent-room/ink/
  ink-overlay.tsx       # SVG + InkFilters defs
  ink-voice.tsx         # Voice zone lines
  use-ink-gestures.ts   # drawGesture, clearInk, sizeOverlay
  use-ink-line.ts       # inkLine promise API
```

### 4.2 Context integration

Expose from `AgentRoomProvider`:

```ts
inkLine(text: string): Promise<void>
drawGesture(kind: 'underline' | 'circle' | 'arrow', target: string | HTMLElement): Promise<void>
clearInk(): void
```

Runner (AF-05) calls these — do not import runner into ink hooks.

### 4.3 Target resolution

Port `sheet.querySelector` behavior — targets like `'#phrase'` are relative to sheet ref.

### 4.4 Resize

```tsx
useEffect(() => {
  const ro = new ResizeObserver(() => sizeOverlay());
  ro.observe(screenEl);
  return () => ro.disconnect();
}, []);
```

Also call on font load (`document.fonts.ready`).

---

## 5. HTML → React notes

| Vanilla | React |
| --- | --- |
| `document.createElement('div')` voice lines | `setVoiceLines` state queue, max 2 lines |
| `document.createElementNS` paths | Ref to SVG group, append path elements |
| `requestAnimationFrame` loop | Keep rAF OR GSAP timeline — match timing constants from source |
| `sleep(ms)` | `await new Promise(r => setTimeout(r, ms))` with reduced-motion → 0 |

Duration constants from source:

- Ink line: `Math.max(620, text.length * 38)` ms
- Underline draw: 520ms
- Circle: 760ms
- Arrow shaft+head: 560ms + 200ms

---

## 6. Definition of Done

- [ ] Voice line renders in Caveat, ink-blue, with nib animation.
- [ ] Old line fades to `.old` style when new line arrives.
- [ ] Gestures draw on `#phrase` in opening scene (manual test).
- [ ] `clearInk` removes paths before new screen.
- [ ] Reduced motion skips animations.
- [ ] `pnpm typecheck` passes.
- [ ] §10 + master runner updated.

---

## 7. Verification

1. Temporarily call `inkLine('Test line')` and `drawGesture('underline', '#phrase')` from a dev button.
2. Compare timing/visual to prototype `npx serve` + replay opening scene.
3. Console: no SVG attribute errors.

---

## §10 Attempt log

<!-- Hook API, timing tweaks, known deltas. -->

### 2026-06-09 — AF-04 ink voice + gesture layer

**Files created**

| Path | Role |
| --- | --- |
| `src/components/agent-room/ink/gesture-paths.ts` | **Pure** path-math (`underlinePath`/`circlePath`/`arrowPaths`) ported from `ink.js` — rect in → SVG `d` out, testable without a DOM. `jit()` wobble via `Math.random` (overridable `rng`). |
| `src/components/agent-room/ink/use-ink-gestures.ts` | `useInkGestures()` — owns the 3 stage refs; `drawGesture` (underline/circle/arrow), `clearInk`, `sizeOverlay`. Imperative SVG (no React state); module-scoped `syncOverlay`/`localRect`/`drawPath` helpers; `ResizeObserver` + `fonts.ready` resize. |
| `src/components/agent-room/ink/use-ink-voice.ts` | `useInkVoice()` — the ≤2-line queue + per-line promise resolvers so `inkLine(text)` resolves when the line finishes drawing (lets the AF-05 runner `await` a `say`). |
| `src/components/agent-room/ink/ink-voice.tsx` | `VoiceLine` (self-animating cosine-eased clip-path reveal + nib rAF, `max(620,len*38)`ms) + `InkVoice` list renderer. |

**Files changed**

| Path | Change |
| --- | --- |
| `src/components/agent-room/agent-room-context.tsx` | Provider now instantiates the ink layer; context exposes `inkLine`/`drawGesture`/`clearInk`/`clearVoice`/`voiceLines`/`resolveLine`. New `useInk()` accessor (refs via `useAgentRoomRefs()`). Dev-only `window.__agentRoomInk` test seam (stripped in prod). |
| `src/components/agent-room/shell/voice-zone.tsx` | Renders the ink `voiceLines` (self-animating) as the primary voice source; `error` first, streaming `voice.text` as fallback. |

**Context API (AF-04 §4.2 contract):** `inkLine(text): Promise<void>`,
`drawGesture(kind, target): Promise<void>`, `clearInk(): void` — exposed via
`useInk()`. The runner (AF-05) consumes these; the ink hooks do **not** import the
runner.

**React-architecture decisions / deviations**

- **Voice = React-state queue** (§5 option), not imperative `createElement`. Each
  `VoiceLine` owns its write-on animation and reports completion, which is how the
  `inkLine` promise resolves — clean Promise↔render coordination without DOM
  surgery inside a React-controlled container.
- **Gestures = imperative** SVG path appends on `inkSvg` (no re-render per stroke),
  exactly as the prototype. `.stroke` class comes from the module (`styles.stroke`);
  `filter:url(#rough)` resolves against the global filter id from AF-03.
- **`useInkGestures` owns the 3 stage refs** (`useRef`) rather than receiving them
  as a param. This was required to satisfy the repo's React-Compiler lint rule
  (`react-hooks/preserve-manual-memoization`): refs passed as params read as
  reactive (exhaustive-deps wants them listed) but listing refs breaks the
  compiler's memoization preservation — a catch-22 that only locally-created refs
  avoid (the stream hook works the same way). The provider consumes the returned
  refs; `voiceEl` stays a provider-local `useRef`.
- **`ink-overlay.tsx` stayed in `shell/`** (from AF-03) rather than `ink/` per
  §4.1 — it's the shell's SVG host with the filter defs; no functional difference.
- **Timing constants ported verbatim:** ink line `max(620, len*38)`; underline
  520ms; circle 760ms; arrow 560+200ms; cosine ease + nib `sin(raw*38)*0.6` jitter.

**Verification — headless Chromium (Playwright) via the `__agentRoomInk` seam:**

- [x] Voice line renders in **Caveat**, **ink-blue** (`rgb(34,64,155)` = `#22409B`),
  with the nib; clip-path animates to full reveal in **646 ms** (≈ `max(620, …)`).
- [x] Old line fades to `.old` (computed opacity **0.34**) when a new line arrives;
  queue capped at 2.
- [x] `drawGesture('underline', …)` appends exactly **1** stroke `<path>`; `clearInk`
  → **0** paths.
- [x] Reduced motion (`reducedMotion: 'reduce'`) skips animation — `inkLine` resolves
  in **5 ms** with `clip-path: none` (vs 646 ms normal).
- [x] **No console / SVG-attribute errors** in either mode.
- [x] `pnpm typecheck` green; `eslint` on all AF-04 files clean (0/0).

**Known deltas (intentional, resolved later):**

- Gesture **manual test targeted `h1`**, not `#phrase` — the oat opening hero has
  no `#phrase`/`#faces` ids yet; those land when the home screen is rebuilt (AF-08),
  at which point the opening scene's `underline #phrase` / `arrow #opts` / faces
  `.lit` wiring reconnects. `drawGesture` already resolves selectors against the
  sheet, so it works the moment those ids exist.
- The `say`→`inkLine`, `gesture`→`drawGesture`, `clear`→`clearInk` **act wiring** is
  AF-05 (the runner); AF-04 only builds and proves the layer.
