# AF-05 — Scene runner and stub choreography

**Prompt ID:** AF-05  
**Target agent:** Cursor / Claude Code  
**Primary repo:** `movemental-ai`  
**Blocks:** AF-04  
**Last updated:** 2026-06-09

---

## 1. Role and stance

Port `js/runner.js` and wire **`useAgentRoomStub`** hook. The runner is the heart of the prototype — one `play()` function executes any scene.

**Do not** connect to `/api/agent-room/stream`. Import scene data from TS modules (AF-06 may run in parallel if imports are stubbed).

---

## 2. Goal

1. Implement `play(scene: Act[])` with generation counter (supersede on `goHome`).
2. Implement `run(name: SceneName)` lookup in `SCENES`.
3. Implement `goHome()` → increment gen, clear ink, `run('opening')`.
4. Boot opening scene on mount (match `app.js` font-ready boot).

---

## 3. Act types (`src/lib/agent-room/acts.ts`)

```ts
export type GestureKind = "underline" | "circle" | "arrow";

export type Act =
  | { wait: number }
  | { clear: true }
  | { say: string }
  | { show: ScreenId; qi?: number; mode?: string; leader?: number /* ... */ }
  | { gesture: GestureKind; target: string }
  | { suggest: Suggestion[] };

export type Suggestion = {
  label: string;
  to: SceneName;
  lead?: boolean;
};
```

Copy screen list from `js/app.js` contract comment.

---

## 4. Runner logic (from `runner.js`)

```ts
let busy = false;
let gen = 0;

async function play(scene: Act[], ctx: RunnerContext): Promise<void> {
  const myGen = ++gen;
  busy = true;
  for (const act of scene) {
    if (myGen !== gen) return;
    if ("wait" in act) await sleep(act.wait);
    else if ("clear" in act) ctx.clearInk();
    else if ("say" in act) await ctx.inkLine(act.say);
    else if ("show" in act) ctx.renderScreen(act.show, act);
    else if ("gesture" in act) await ctx.drawGesture(act.gesture, act.target);
    else if ("suggest" in act) ctx.setSuggestions(act.suggest);
  }
  if (myGen === gen) busy = false;
}
```

State exposed to UI:

- `busy` — disable input while scene plays
- `currentScreen` — for ScreenRouter
- `suggestions` — chip list
- `pendingFlip` — leader portrait flip rect (optional, from runner globals)

---

## 5. Hook: `useAgentRoomStub`

Replace placeholder from AF-01:

```ts
export function useAgentRoomStub() {
  // Returns same shape as stream hook where practical:
  // { screen, voice, suggestions, isStreaming: busy, sendMessage, reset: goHome, runScene }
}
```

`sendMessage` in stub mode:

- Parse regex routes from `js/app.js` `handleInput()` OR delegate to suggestion `to` scene names only until AF-11 completes full routing.

Minimum viable: suggestions + replay button call `run(name)`.

---

## 6. Scene boot

Match prototype:

```js
document.fonts.ready.then(() => { sizeOverlay(); run('opening'); });
```

In React:

```tsx
useEffect(() => {
  void document.fonts.ready.then(() => {
    sizeOverlay();
    run("opening");
  });
}, []);
```

---

## 7. Definition of Done

- [ ] Opening scene plays on load: show home → wait → say → gesture → suggest.
- [ ] `goHome` aborts in-flight scene via gen counter.
- [ ] `busy` blocks double-send.
- [ ] No network requests on `/agent`.
- [ ] `AGENT_ROOM_MODE === "stub"` uses this hook exclusively.
- [ ] `pnpm typecheck` passes.
- [ ] §10 + master runner updated.

---

## 8. Verification

| Action | Expected |
| --- | --- |
| Load `/agent` | Home screen + voice line + chips |
| Click logo during scene | Home replay |
| Tap "About Movemental" chip | Navigates scene to about (once screens exist) |
| Network tab | Empty of stream API |

---

## §10 Attempt log

<!-- Runner file paths, sendMessage scope, boot timing. -->

### 2026-06-09 — AF-05 scene runner + stub wired

**Structural fix first.** `useAgentRoomStub` was being called in `StubRoom`, which
sat **above** `AgentRoomProvider` (the provider was inside `AgentRoomView`), so the
stub couldn't reach the ink layer. Moved `AgentRoomProvider` up to wrap the mode
dispatch in `AgentRoom`; `AgentRoomView` no longer wraps it. Now both `StubRoom`
and `StreamRoom` render inside the provider and can use `useInk()`.

**Files**

| Path | Change |
| --- | --- |
| `src/lib/agent-room/scene-runner.ts` | Real runner core: `playScene(scene, ctx, gen)` (the prototype `play` act-loop with the `myGen !== gen` supersede guard) + `sleep` (reduced-motion → 0) + `RunnerContext`/`Generation` types. Framework-agnostic. |
| `src/lib/agent-room/data/scenes.ts` | **New** — minimal `SCENES` with only `opening` (full set is AF-06). |
| `src/components/agent-room/use-agent-room-stub.ts` | Rewritten from placeholder → the runner hook: `screen`/`suggestions`/`busy` state, `show`/`suggest`/`play`/`run`/`goHome`, `genRef`/`runRef`, fonts-ready boot. |
| `src/components/agent-room/composer.tsx` | New `ComposerChip` (`{label, lead?, onSelect}`) — chips carry a pre-bound action so stub (run scene) and stream (send utterance) share one composer. |
| `src/components/agent-room/use-agent-room-stream.ts` | Added `suggestions: ComposerChip[]` (DEFAULT chips → `onSay`; empty in a beat) so both modes satisfy the controller. |
| `src/components/agent-room/agent-room.tsx` | Provider moved to wrap the dispatch; `AgentRoomView` consumes `room.suggestions`. |
| `src/lib/agent-room/acts.ts` | `show` variant: replaced the `[opt]: unknown` index signature with explicit `qi?/mode?/id?` so `"wait" in act` narrowing works. |
| `src/components/agent-room/screen/opening-hero.tsx` | Added `id="phrase"` to the highlight span so the opening scene's `underline #phrase` has a target (until AF-08 rebuilds the home screen). |

**Runner design**

- **`playScene` is pure/standalone** (matches §4's `play(scene, ctx)`); the hook
  supplies a `RunnerContext` of act handlers wired to the ink layer + state
  setters, and holds the generation token in a ref (`{ value }`).
- **`goHome` (= `reset`)** bumps the generation, clears ink, and `run('opening')`
  — the gen bump makes any in-flight scene's loop bail at its next guard check.
- **Chips bind `to`→`run`** via a `runRef` set in an effect (avoids the
  run↔play↔suggest cycle without writing a ref during render).
- **`sendMessage` (typed input) is a deliberate no-op** for now (§5 "minimum
  viable"): suggestions + replay drive `run(name)`; regex routing is AF-11. It
  never fetches.
- **Boot** plays `opening` on `document.fonts.ready` (a `cancelled` guard tolerates
  StrictMode's double-mount); overlay sizing is already handled by the ink layer.

**Scope deltas (resolved later)**

- `show` only maps `home`→`{kind:'opening'}` today (the only ported screen); every
  other `ScreenId` falls back to opening with a `TODO(AF-07)`. The Ink Band screen
  registry + `ScreenState` reconciliation is **AF-07**.
- Chips whose target scene isn't in the minimal `SCENES` (e.g. `toBeat`, `whatIs`)
  are harmless no-ops until **AF-06** ports those scenes.

**Verification — headless Chromium (Playwright):**

- [x] Opening scene plays on load: voice line "Movemental meets leaders and
  organizations where they are…" writes on (clip-path 99.5% → 4.9%), the
  `underline #phrase` draws **1 stroke**, and **6 chips** appear (lead =
  "Get a clear next AI step", `.lead` highlight class present).
- [x] `busy` blocks double-send: mid-scene `data-busy="true"` and the **send button
  + chips are disabled** (the input stays focusable by design, like the prototype;
  the submit handler guards on `disabled`); released to enabled when the scene ends.
- [x] `goHome` (logo) supersedes the in-flight scene via the gen counter and
  replays — voice-line count stays **1** (no duplicate/leak).
- [x] **No network**: 0 requests to `/api/agent-room/stream` (0 `/api/*` calls at all).
- [x] `AGENT_ROOM_MODE === "stub"` uses this hook exclusively (default; stream hook
  never mounted).
- [x] `pnpm typecheck` green; `eslint` on touched files clean; **0 console errors**.
- Temporary `data-busy` instrument used to confirm the gating, then removed.
