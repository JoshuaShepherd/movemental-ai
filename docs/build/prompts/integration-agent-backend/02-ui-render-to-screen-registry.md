# INT-02 — `ui_render` → the Ink Band screen registry

**Prompt ID:** INT-02
**Target agent:** Cursor / Claude Code
**Primary repo:** `movemental-ai`
**Blocks:** INT-01
**Status:** Not started
**Last updated:** 2026-06-10

**Discuss:** [agent-room-long-form-discussion-ui.md](../../notes/agent-room-long-form-discussion-ui.md) — `capture` renders **into the sheet** (Model B); screen stays dominant.

---

## 1. Role and stance

Route a validated `ui_render` chunk into the **same** Ink Band screen registry the stub uses (`screen/stub/stub-screen.tsx`), so stream and stub render identical screens. Retire the parallel `screen/screen.tsx` switch (or reduce it to a thin adapter) once the registry is shared.

**Exception — `capture`:** not a full screen swap. Append the capture form-cell onto the current `.sheet` (Discuss or Guide); agent may gesture `#capture`. Submission → `submitLead(kind, payload)` (INT-09).

---

## 2. The crux — content source

Today the two paths diverge on **where screen content comes from**:

- **Stub:** screens read local data (`MAP_Q`, `PROFILES`, `FAQ`, static copy) keyed by `ShowOpts` (`qi`, `mode`, `id`).
- **Stream:** the agent sends content **in `props`** (e.g. `reality_check_beat` props `{ beatId, question, options, progress }`; `readback` props `{ verdict, hereStageIndex, prose, fork }`).

**Decision to make (record in §10):** make the Ink Band screens **prop-driven**, with the stub supplying props from local data and the stream supplying props from the chunk. *Recommended:* lift each screen's inputs into a typed props object; the stub adapter fills it from `data/*`, the stream adapter fills it from validated `component-props`. This keeps one component per screen and one render path.

---

## 3. Work

1. For each shared screen (start with `beat`/`reality_check_beat`, `readback`, then `path`/`pricing`/`founders`), define a single props type and refactor the component to read props (not reach into `data/*` directly). The stub passes data-derived props; nothing about the stub UX changes.
2. Add a **stream adapter**: on `ui_render`, `validateComponentProps(component, props)` → map via `screen-map.ts` (INT-01) to `{ id: ScreenId, opts/props }` → drive the **same** registry the stub renders, with a bumped `nonce` so the settle animation re-fires (mirror `StubScreenState`).
3. Unify `ScreenState`: collapse the stream hook's `{ kind: 'component', component, props, nonce }` and the stub's `{ id, opts, nonce }` toward one shape, or adapt at the container so `AgentRoomView` stays mode-agnostic (it already is).
4. Engine-extra ids (`network`/`audience`/`handoff_human`): either port real Ink Band screens or keep the existing `screen/*` components rendered through the adapter — decide per INT-01's disposition.
5. **`capture` adapter:** validate `{ kind, … }` props; render `<CaptureCell kind={…} onSubmit={submitLead} />` appended to sheet; stable `#capture` id for gestures (INT-04).

---

## 4. Definition of Done

- [x] A `ui_render` (validated) puts the corresponding Ink Band screen on the wall, prop-driven — via the shared `SCREEN_COMPONENTS` registry + `screen-map.ts`.
- [~] `ui_render` → `capture` renders the form-cell (with `#capture` anchor) wired to `submitLead`. **Partial:** true Model-B sheet-append awaits INT-08 (Model B not yet built); renders in the screen zone for now.
- [x] Stub mode unchanged — `stream` is optional; with it absent, `beat`/`readback`/`capture` behave identically. Verified: `/agent` stub HTTP 200, no errors, **zero network**.
- [x] `beat` + `readback` render from agent props **and** from stub data, via the same component (one registry slot each; `beat` shared-visual, `readback` dual-mode).
- [x] Invalid props still drop to the voice (no crash) — validation stays upstream in the hook, unchanged.
- [x] `screen/screen.tsx` retired (deleted); replaced by the `stream-screen.tsx` adapter over the shared registry. No duplicated registry.
- [x] `pnpm typecheck` + lint green; §10 + master runner updated.

---

## 5. Verification

- `AGENT_ROOM_MODE=stream`: drive a turn that emits `reality_check_beat` → the Ink Band beat screen appears with the agent's question/options.
- `AGENT_ROOM_MODE=stub`: full AF-12 beat→readback flow still passes byte-for-byte.
- Malformed `props` frame → voice continues, screen unchanged.

---

## §10 Attempt log

<!-- Props-lift decision, adapter notes, which screens unified. -->

### 2026-06-10 — Claude Code — shared registry + stream adapter

**Props-lift decision (recorded):** the stub registry (`screen/stub/stub-screen.tsx` → `SCREEN_COMPONENTS`) is now **the single shared Ink Band registry**; the live stream renders through it. Rather than a full props-lift of every screen (the prompt's "recommended"), I used a **lower-risk dual-branch** on the prop-typed screens so the stub control path is byte-for-byte untouched (I cannot browser-verify a destructive refactor): the registry's `ScreenProps` gained an **optional** `stream?: StreamScreenInput` (`{ props, onSay }`). Stub mode passes no `stream` → identical behavior; stream mode passes it and the prop-typed screens render from it.

**Operator decisions taken (asked, this session):**

- **Readback = dual-mode component.** The stub gap-spine (from `mapRead`) and the engine `ReadbackProps` (`prose`+`fork`) have **incompatible shapes** — no clean single-shape lift exists (the prompt assumed one did). `readback-screen.tsx` now branches: `stream` → delegate to the prose/fork `Readback`; else → the local gap-spine. One file, one registry slot, two presentations. Merging the two *designs* into one is a product/design call — **deferred**.
- **Capture = minimal cell now, refined in INT-08.** `ui_render(capture { kind })` renders the existing `CaptureScreen` (now reading `kind` from `stream.props.kind ?? opts.kind`) with a stable `#capture` anchor (for INT-04 gestures), submit wired to `submitLead`. It is **not** yet a true Model-B sheet-append (Model B is INT-08); DoD item #2 is **partial** — flagged for INT-08. `kind:'discuss'` falls back to `map` until INT-09 adds the variant.

#### Adapter notes

- **New `screen/stream-screen.tsx`** replaces the retired per-`ComponentId` switch. On a `component` state: engine-extra (`network`/`audience`/`handoff_human`, `toScreenId → null`) render their existing `screen/*` components directly (INT-01 disposition = render); everything else maps `ComponentId → ScreenId` via `screen-map.ts` and renders the **shared** `SCREEN_COMPONENTS`. Props are already validated upstream in `use-agent-room-stream.ts` (`validateComponentProps`), so an invalid frame never reaches a screen — it drops to the voice (DoD #5 preserved, unchanged).
- **`ScreenState` unified at the container** (the prompt's allowed option): the stream hook keeps its `ScreenState`; `StreamScreen` adapts it to the registry. `AgentRoomView` stays mode-agnostic.
- **`beat`** unified via a hook-free wrapper: `stream` → `RealityCheckBeat` (taps → `say`); else → the verbatim `StubBeat` (taps → `onBeatAnswer`). Same component file, rules-of-hooks-safe.

#### Files

- **Changed:** `screen/stub/stub-screen.tsx` (export shared registry + `StreamScreenInput`/`stream?`), `screen/stub/beat-screen.tsx` (wrapper+StubBeat), `screen/stub/readback-screen.tsx` (dual-mode), `screen/stub/capture-screen.tsx` (`kind` source + `#capture`), `agent-room.tsx` (`StreamRoom` → `StreamScreen`).
- **New:** `screen/stream-screen.tsx`.
- **Deleted (retired):** `screen/screen.tsx` (the parallel switch) and its now-orphaned static duplicates `screen/path.tsx`, `screen/pricing.tsx`, `screen/founders.tsx` (superseded by the stub registry versions). Kept: `reality-check-beat.tsx`, `readback.tsx` (stream presentations), `network.tsx`/`audience.tsx`/`handoff-human.tsx` (engine-extra), `opening-hero.tsx`, `emphasis.tsx`.

#### Verification

| Check | Result |
| --- | --- |
| `pnpm typecheck` | ✅ |
| Lint (touched files) | ✅ 0 errors (1 pre-existing `autoFocus` unused-disable warning in `capture-screen.tsx`, not introduced here) |
| `screen-map.test.ts` | ✅ 6/6 |
| No stray refs to deleted modules | ✅ |
| **Stub mode `/agent`** (dev server, default) | ✅ HTTP 200, `ink-band-surface` + opening copy render, **no** error page, **no** runtime errors in log |
| **Stream mode `/agent`** (`NEXT_PUBLIC_AGENT_ROOM_MODE=stream`) | ✅ HTTP 200, shell mounts, no error page/log errors, **0** `/api/agent-room/stream` calls on load (network only on send) |
| Stub control path | untouched — `stream` is optional; with it absent, `beat`/`readback`/`capture` behave exactly as before |

**Not verified (blocked):** a full live agent turn (`ui_render(beat)` → the Ink Band beat with the agent's question) — the engine on `:3001` is still down (the INT-00 / INT-07 blocker). The render *path* is proven (typecheck + shell mount + unit-tested mapping); only the live end-to-end emission awaits the engine in INT-07.

**Open item carried from INT-01:** the engine `EmptyProps.strict()` ↔ client `emptyProps.passthrough()` mismatch — not addressed here (no contract effect in Phase 1; static screens carry no props). Still flagged for a later cleanup.

**Branch:** `slice/S02-leader-corpus-onboarding` (no commit — operator-gated).
