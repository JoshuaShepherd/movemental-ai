# AF-03 — Route, shell, and three-zone layout

**Prompt ID:** AF-03  
**Target agent:** Cursor / Claude Code  
**Primary repo:** `movemental-ai`  
**Blocks:** AF-02  
**Last updated:** 2026-06-09

---

## 1. Role and stance

Implement the **physical shell** from `movemental-agentic-front-end/index.html` as React structure. Match DOM zones exactly:

```html
<header class="mast">…</header>
<section id="screen">…</section>
<div class="voice" id="voice">…</div>
<div class="composer">…</div>
```

Skills: **`design-section`** (structure), **`responsive-audit`**.

---

## 2. Goal

1. Align `src/app/agent/page.tsx` + layout with 100dvh no-scroll shell.
2. Build `Mast`, `ScreenZone`, `VoiceZone` wrapper components.
3. Port shell CSS from `ink-band.css` (mast, screen flex, voice min-height, composer padding).
4. Verify marketing chrome is hidden on this route.

---

## 3. Layout specification

### 3.1 Mast

From prototype:

- Logo: `m<span class="d"></span>vemental` — dot is a circle using `--border`
- Click logo → `goHome()` (wire in AF-05)
- Optional: crumb button on inner screens (absolute top-right on `.sheet`)

Compare with existing `agent-room.tsx` mast — **reconcile to prototype**, not oat copy.

### 3.2 Screen zone (`#screen`)

- `flex: 1 1 auto; position: relative; overflow: hidden`
- Radial gradient background (line 20 of `ink-band.css`)
- Inner `.sheet` with left margin rule (`::before` red line) — except `.sheet.home`
- Toggle `.scroll` class on `#screen` for scrollable screens (see `screens.js` line 3)

### 3.3 Voice zone

- `min-height: 4.7rem`, `--surface` background, top border
- Hosts ink voice lines (AF-04)

### 3.4 Composer zone

- Suggestion chips row + input line + replay legend
- Full implementation AF-11; scaffold empty regions here

---

## 4. Route integration

### 4.1 Check `proxy.ts`

Confirm `/agent` sets shell mode so site nav/footer do not render. If missing, add rewrite/header per existing pattern in repo.

### 4.2 Metadata

Keep SEO metadata on `page.tsx` but ensure `overflow: hidden` on html/body for this route only (agent layout).

### 4.3 Hydration

Retain `AgentRoomShell` hydration guard pattern — static fallback should use same ink-band tokens (update `agent-room-fallback.tsx`).

---

## 5. HTML → React checklist

| HTML | React |
| --- | --- |
| `#screen` | `<ScreenZone ref={screenRef} className={scroll ? 'scroll' : ''}>` |
| `#sheet` | `<div className={cn('sheet', sheetClass)} ref={sheetRef}>` |
| `#ink` SVG | Child of ScreenZone, `position: absolute; inset: 0` |
| IDs for JS | Refs on context provider |

Create `AgentRoomProvider` with refs: `screenEl`, `sheetEl`, `inkSvg`, `voiceEl`.

---

## 6. Definition of Done

- [ ] `/agent` renders four zones with correct flex column and 100dvh.
- [ ] Sheet margin rule visible on non-home screens.
- [ ] Screen zone gradient matches prototype.
- [ ] Logo/home button present (handler may noop until AF-05).
- [ ] No page-level scroll on `/agent`.
- [ ] `pnpm typecheck` passes.
- [ ] §10 + master runner updated.

---

## 7. Verification

Chrome DevTools MCP:

1. Navigate to `/agent`
2. Snapshot — four zones present
3. Console clean
4. Resize to mobile — padding clamps match `clamp()` values

Compare with static `movemental-agentic-front-end/index.html` via `npx serve`.

---

## §10 Attempt log

<!-- Shell component paths, proxy notes, screenshot delta. -->

### 2026-06-09 — AF-03 four-zone shell

**Reconciled to the prototype, not the oat copy.** The oat build had three zones
(mast / stage / composer) with the **voice embedded in the composer** and an
oat-style mast (corner menu, "start over", Field-Edition id). The prototype's
`index.html` is four zones with a **separate voice band** and a **logo-only**
mast — that's what shipped.

**Files created**

| Path | Role |
| --- | --- |
| `src/components/agent-room/ink-band.module.css` | New shell module — `.room`/`.mast`/`.logo`/`.screen`(+`.scroll`)/`.sheet`(+`::before` margin rule, `.home`)/`.settle`/`.ink`/`.stroke`/`.voice`/`.vline`/`.nib`/`.composer`/`.sugg`/`.chip`(+`.lead`)/`.line`/`.field`/`.send`/`.legend`/`.replay`. Ported verbatim from `ink-band.css` with `--color-ink-band-*` / `--font-ink-*` tokens. |
| `src/components/agent-room/agent-room-context.tsx` | `AgentRoomProvider` + `useAgentRoomRefs` exposing the four refs (`screenEl`/`sheetEl`/`inkSvg`/`voiceEl`) — the React replacement for the prototype's `#screen`/`#sheet`/`#ink`/`#voice` globals. Consumed by AF-04/AF-05. |
| `src/components/agent-room/shell/mast.tsx` | `Mast` — wordmark `m·vemental`, logo → `onHome`. |
| `src/components/agent-room/shell/screen-zone.tsx` | `ScreenZone` — `#screen` gradient stage + `.sheet` (margin rule / `.home`) + `<InkOverlay/>`; owns `screenEl`/`sheetEl`. |
| `src/components/agent-room/shell/ink-overlay.tsx` | `InkOverlay` — the `#ink` SVG + `#rough`/`#marker` filter defs (global ids so `url(#…)` resolves); owns `inkSvg`. |
| `src/components/agent-room/shell/voice-zone.tsx` | `VoiceZone` — the `.voice` band; owns `voiceEl`; static line for now (AF-04 animates). |

**Files changed**

| Path | Change |
| --- | --- |
| `src/components/agent-room/composer.tsx` | Rewritten to the prototype `.composer` (chips + input + **replay** legend) on the ink-band module; **voice removed** (now in `VoiceZone`). Props: `suggestions`/`disabled`/`onSay`/`onReplay`. |
| `src/components/agent-room/agent-room.tsx` | `AgentRoomView` recomposed into `AgentRoomProvider → .room → Mast / ScreenZone / VoiceZone / Composer`; dropped the oat `CornerMenu`. Stub/stream dispatch unchanged. |

**Transitional state (by design).** The active-screen *content* is still the oat
`<Screen>` (opening-hero etc.) rendered inside the new `.sheet` — those screens
are rewritten in AF-07–AF-10. So the shell is prototype-faithful while the
content is mid-migration; double max-width (`.sheet` 56rem vs oat `.stageIn`
44rem) is expected until then.

**Proxy / chrome (§4.1):** unchanged — `/agent` already sets `x-movemental-shell:
room` (verified AF-01); no marketing nav/footer. 100dvh + `overflow:hidden` live
on `.room` (the prototype put them on `body`; scoping to `.room` keeps it off the
document).

**Fallback (§4.3):** `agent-room-fallback.tsx` left as-is — it already paints
ink-band tokens via the AF-02 bridge + the `.ink-band-surface` layout scope. A
dedicated ink-band fallback restyle rides with the screen rewrites (AF-08–AF-10).

**SVG filters (AF-02 §4.4 carry-over):** the `#rough` / `#marker` defs are now in
the shell (`InkOverlay`); the gesture *drawing* loop is AF-04.

**Verification (DoD) — headless Chromium (Playwright) against the hydrated room:**

- [x] Four zones render in a 100dvh flex column — `header` mast (`mvemental`),
  `section` screen (`position:relative`, **radial-gradient** present), `.voice`
  (`min-height` 75.2px = 4.7rem), composer (input + replay both present).
- [x] Sheet margin rule — `::before` width `1.5px`; suppressed on `.home`.
  (Visible-on-non-home confirmation needs a non-opening screen → AF-07+/AF-12,
  since stub only emits `opening` today.)
- [x] Screen-zone gradient matches prototype (`radial-gradient(120% 80% at 50% 0% …)`).
- [x] Logo/home button present (→ `reset`; `goHome` semantics in AF-05).
- [x] No page-level scroll (`document.scrollingElement.scrollHeight ≤ innerHeight`).
- [x] `#ink` overlay absolute with both filters (`["rough","marker"]`).
- [x] **Console clean** (0 errors/pageerrors).
- [x] `pnpm typecheck` green; `eslint` on the 7 touched files clean (0/0).
- AF-90 guardrails intact (no stream/agents/db/auth wiring).

_Note: the SSR document is the static `AgentRoomFallback` (hydration guard) — the
four-zone room is client-rendered, so it's verified via a real browser, not curl._
