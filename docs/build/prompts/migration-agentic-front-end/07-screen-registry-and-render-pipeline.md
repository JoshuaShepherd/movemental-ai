# AF-07 — Screen registry and render pipeline

**Prompt ID:** AF-07  
**Target agent:** Cursor / Claude Code  
**Primary repo:** `movemental-ai`  
**Blocks:** AF-06  
**Last updated:** 2026-06-09

---

## 1. Role and stance

Port `js/screens.js` **`renderScreen(id, opts)`** into a React screen router. This is the central switch connecting runner `show` acts to UI.

Skills: **`design-section`**, **`frontend-patterns`** (component registry).

---

## 2. Goal

1. Define `ScreenId` union matching closed set.
2. Implement `renderScreen` as React state update + component map.
3. Port scroll-class toggling and sheet className logic.
4. Wire event bindings that were inline in `screens.js` (beat options, path drawers, contact form) as component props.

---

## 3. Screen registry

```ts
// src/lib/agent-room/screens/registry.ts
export const SCREEN_IDS = [
  "home", "beat", "readback", "safety", "confirm", "path",
  "founders", "leader", "about", "contact", "pricing", "faq",
] as const;

export type ScreenId = (typeof SCREEN_IDS)[number];
```

Component map (implement bodies in AF-08–AF-10):

```tsx
const SCREEN_COMPONENTS: Record<ScreenId, ComponentType<ScreenProps>> = {
  home: HomeScreen,
  beat: BeatScreen,
  // ...
};
```

---

## 4. `renderScreen` behavior port

From `screens.js` opening logic:

| Screen id | `screenEl` scroll | `sheet` class | Special |
| --- | --- | --- | --- |
| home | add `scroll` | `sheet home settle` | Leader face clicks → `leaderScene(i)` |
| beat | remove | `sheet settle` | `opts.qi` question index |
| readback | add | `sheet settle` | Uses `mapRead` state |
| safety, confirm, leader, founders, path, about, contact, pricing, faq | add | varies | CRUMB on some |

Implement:

```ts
function applyScreenChrome(id: ScreenId, sheetClass: string, scroll: boolean): void
```

Call from runner before mounting screen component.

---

## 5. Shared chrome

### 5.1 `CRUMB` — back to home

Port crumb button HTML from profiles builders — appears on inner screens.

### 5.2 `settle` animation

CSS `@keyframes settle` — apply class on sheet mount (CSS module).

### 5.3 `bandHTML()` / leader band

Home screen includes portrait band — lives in `HomeScreen` (AF-08).

---

## 6. Screen router component

```tsx
export function ScreenRouter({ screen, opts }: { screen: ScreenId; opts: ShowAct }) {
  const Component = SCREEN_COMPONENTS[screen];
  return (
    <Component
      opts={opts}
      onBeatAnswer={...}
      onLeaderSelect={...}
      disabled={busy}
    />
  );
}
```

Replace existing `screen/screen.tsx` stream-based switch with stub router when `AGENT_ROOM_MODE === "stub"`.

Keep stream renderer behind mode flag for AF-90.

---

## 7. HTML → React migration workflow (per screen)

For each screen in AF-08–AF-10:

1. Open `movemental-agentic-front-end/pages/<path>.html` in browser OR read static HTML.
2. Extract `.sheet` inner markup (ignore duplicate head/mast if present in full doc).
3. Convert class → CSS module.
4. Replace inline `style="--i:N"` with React `style={{ "--i": i } as CSSProperties}`.
5. Move string templates to JSX; map arrays with `.map()`.

---

## 8. Definition of Done

- [ ] `ScreenId` type enforced; invalid ids fail typecheck.
- [ ] Runner `show` act updates React screen state.
- [ ] Scroll class toggles correctly per prototype table.
- [ ] Placeholder components render screen id label (until AF-08 fills in).
- [ ] Stream `Screen` component still works when mode is `stream`.
- [ ] `pnpm typecheck` passes.
- [ ] §10 + master runner updated.

---

## §10 Attempt log

<!-- Registry path, placeholder status, stream/stub switch location. -->

### 2026-06-09 — AF-07 screen registry + render pipeline

**Files created**

| Path | Role |
| --- | --- |
| `src/components/agent-room/screen/stub/stub-screen.tsx` | The registry + router (`renderScreen` port): `StubScreenState` (`{ id, opts, nonce }`), `ScreenProps`, the `Record<ScreenId, ComponentType<ScreenProps>>` map, and the `StubScreen` router. |
| `src/components/agent-room/screen/stub/placeholders.tsx` | 12 placeholder screen components (one per `ScreenId`), each a labeled stub. `HomeScreen` keeps a real-ish hero + `#phrase` so the opening gesture still lands. |

**Files changed**

| Path | Change |
| --- | --- |
| `src/lib/agent-room/acts.ts` | Added `ShowOpts` (`{ qi?, mode?, id? }`); `show` act = `{ show: ScreenId } & ShowOpts`. |
| `src/lib/agent-room/scene-runner.ts` | `RunnerContext.show` is now `(id, opts: ShowOpts) => void`; `playScene` extracts opts from the act. |
| `src/components/agent-room/use-agent-room-stub.ts` | `screen` is now `StubScreenState`; `show` swaps it (bumping `nonce`, clearing voice on `home`); added `onBeatAnswer`/`onLeaderSelect` (no-op seams for AF-08/AF-10). |
| `src/components/agent-room/agent-room.tsx` | Split into a presentational `AgentRoomView` (takes `screenNode`/`home`/`scroll`/`screenKey` + controls) fed by two mode containers: `StubRoom` renders `<StubScreen>`, `StreamRoom` keeps `<Screen>`. |

**Design decisions**

- **`ScreenId` reused from `acts.ts`** (the AF-01 closed set) rather than a second
  `SCREEN_IDS` in `screens/registry.ts` — one source of truth. The *component*
  registry lives in `stub-screen.tsx`. The `Record<ScreenId, …>` map is exhaustive,
  so a missing/typo'd id fails typecheck.
- **Two render paths, selected by mode — not unified.** The stub renders by
  `ScreenId`; the live stream keeps rendering by `ComponentId` via the existing
  `Screen` switch. AgentRoomView is presentational so both feed it. Reconciling the
  two id spaces (the stream enum lacks `home`/`about`/`faq`/…, adds
  `network`/`audience`/`handoff_human`) stays **AF-90 / INT-01** — deliberately not
  done here.
- **Scroll/home chrome derived in the container** from the screen state, per the
  §4 table: `scroll = id !== "beat"` (beat is the only non-scroll screen); `home =
  id === "home"` (centered, margin-rule-free sheet). `nonce` re-fires `settle`.
- **Beat/leader interaction props threaded but no-op.** `onBeatAnswer` (→
  `beatStep`) and `onLeaderSelect` (→ `leaderScene`) are wired through the router
  as props; their bodies land with the real beat (AF-08) and leader (AF-10) screens.
- **Placeholders, not the oat screens.** The oat `screen/*` components stay for the
  stream path; the stub registry points at fresh placeholders that AF-08–AF-10
  replace. `CRUMB` (§5.1) ships with the static screens in AF-09.

**Verification — headless Chromium (Playwright):**

- [x] **Stub** (`/agent`, default): boots to the `home` screen (real hero copy +
  `#phrase`, `home` sheet class, `overflow-y: auto`). Tapping **About Movemental**
  → `whatIs` scene → `show: "about"` swaps the sheet to the `about` placeholder
  (margin-rule sheet, still scrolls). Tapping **Map where we actually stand** →
  `toBeat` → `show: "beat"` → the `beat` placeholder with **`overflow-y: hidden`
  (no scroll)** — the scroll table holds. 0 console errors, 0 `/api` calls.
- [x] **Stream** (`NEXT_PUBLIC_AGENT_ROOM_MODE=stream`): `/agent` renders the oat
  opening hero ("AI is already inside your organization…") via the `Screen` switch,
  mast + composer present, **no stream fetch on load**, 0 errors.
- [x] `pnpm typecheck` green; `eslint` on all touched files clean.
