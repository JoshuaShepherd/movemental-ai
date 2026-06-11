# Agent Room — architecture (ADR)

Migration target for the **Ink Band** prototype (`movemental-agentic-front-end`).
Authoritative prompt pack: [`docs/build/prompts/migration-agentic-front-end/`](../../../docs/build/prompts/migration-agentic-front-end/).
This ADR is set by **AF-01** and is binding for every later prompt.

## Status

Accepted — 2026-06-09 (AF-01). Supersedes ad-hoc decisions in the earlier
stream-mode build.

**Amended 2026-06-10 (INT-07): default is now `"stream"`.** The live agent
surface was proven end-to-end (proxy → `movemental-ai-agents` engine → SSE):
voice streams, the reality-check renders the beat, and conversion renders
`show_capture`; engine-down/misconfig degrades to an honest error voice (never
blank). `stub` remains the permanent **offline fallback** — set
`NEXT_PUBLIC_AGENT_ROOM_MODE=stub` for demos / engine-down. The §1 decision below
records the original AF-01 default (`stub`) and is kept as history. See
[INT-07](../../../docs/build/prompts/integration-agent-backend/07-e2e-live-and-fallback.md) §10.

**Amended 2026-06-10 (PAR-01): Local Choreography Layer in stream mode.**
Deterministic beats (`OPENING`, `BEAT_INTRO`) run client-side without SSE on
load and REPLAY. Handoff to the LLM on the first AGENT-classified composer
action. Policy: [`docs/build/agent-room-handoff.md`](../../../docs/build/agent-room-handoff.md);
matrix: [`docs/build/agent-room-stub-stream-parity-matrix.md`](../../../docs/build/agent-room-stub-stream-parity-matrix.md).
Fallback on engine error: **Option A** (env-only stub; no runtime degrade).

**Amended 2026-06-10 (HYB): Hybrid default — script first, agent on demand.**
Default mode is now **`"hybrid"`** (`useAgentRoomHybrid`): full local `SCENES`
runner for chips, leaders, beats, and regex-routed text; SSE only when
`move-classifier.ts` routes AGENT (unmatched typed input, Discuss phase, agent
chips). Shared SSE module: `agent-stream-turn.ts`. `stub` = zero-network;
`stream` = legacy full-AI regression. See
[`docs/build/agent-room-handoff.md`](../../../docs/build/agent-room-handoff.md).

**Amended 2026-06-10 (Discuss overlay / Model C):** When
`NEXT_PUBLIC_AGENT_ROOM_DISCUSS=1`, Layer 3 opens a full-screen `DiscussOverlay`
(via `discuss-entry.ts` triggers → `enterDiscuss()`). Guide stays unchanged when
the flag is off. See
[`docs/build/notes/agent-room-long-form-discussion-ui.md`](../../../docs/build/notes/agent-room-long-form-discussion-ui.md).

## Context

Two designs currently collide in `src/components/agent-room/`:

- the legacy stream build wired for a **live SSE agent**
  (`use-agent-room-stream.ts` → `/api/agent-room/stream` → `movemental-ai-agents`);
- the **Ink Band** prototype we are porting — a front-end-only, scripted
  experience (Playfair/Caveat/IBM Plex Mono tokens, ink voice + SVG gestures, a
  closed 12-screen set, choreography as data).

The AF-00 baseline (see `00-preflight-audit-and-baseline.md` §10) found they
differ in tokens, fonts, screen set, and copy — this is a fresh scoped surface,
not a restyle.

## Decision

### 1. Runtime mode switch — `hybrid` (default) · `stub` · `stream`

> **Current default (HYB amendment):** `"hybrid"`. INT-07/PAR history preserved above.

`src/lib/agent-room/mode.ts` exports `AGENT_ROOM_MODE: "stub" | "hybrid" | "stream"`,
defaulting to **`"hybrid"`** (`NEXT_PUBLIC_AGENT_ROOM_MODE` overrides).

- **`hybrid`** — `useAgentRoomHybrid`: local `play()` runner + SSE on classified
  unscripted moves (`move-classifier.ts`, `agent-stream-turn.ts`).
- **`stub`** — `useAgentRoomStub` + local `play()` runner. **No network.**
- **`stream`** — `useAgentRoomStream` + `/api/agent-room/stream` (legacy dev path).

`AgentRoom` dispatches `HybridRoom` | `StubRoom` | `StreamRoom`.

Both hooks return the same `AgentRoomController` shape, so `AgentRoomView` (the
three-zone shell) is mode-agnostic.

### 2. Scoped design surface

The room gets its **own** Ink Band token ramp, applied via a scoped wrapper
class (`.ink-band-surface`, introduced in AF-02). Marketing nav/footer are
already suppressed on `/agent` via `proxy.ts` (`x-movemental-shell: room`,
verified AF-01).

### 3. Component boundaries (full client island, no Server Components)

```
AgentRoomShell (client, hydration guard) ── AgentRoomFallback (SSR, no-JS)
  └─ AgentRoom (mode dispatcher)
       └─ StubRoom | HybridRoom | StreamRoom
            └─ AgentRoomView
                 ├─ Mast (logo = goHome, corner menu)
                 ├─ Stage  (scroll container + ink SVG overlay)  ← AF-03/04
                 │    └─ Screen  (registry switch on screen id)  ← AF-07
                 ├─ Voice line
                 └─ Composer (suggest chips + input)             ← AF-11
```

Data lives in plain TS modules under `src/lib/agent-room/data/` — **no fetch**.

### 4. Preserve prototype contracts verbatim

The closed screen set + act vocabulary + one-runner rule are ported verbatim
into `src/lib/agent-room/acts.ts`. A scene is an ordered `Act[]`; the single
runner (`play`, AF-05) performs any scene; choreography is **data**, not code.
`getProfile()` stays the single per-leader content seam (RAG swap-point, AF-90).

### 5. HTML → React mapping rules

| Prototype pattern | React target |
| --- | --- |
| `innerHTML` builders (`profiles.js`) | JSX components + typed props |
| Global DOM refs (`sheet`/`voice`/`ink`) | `useRef` + `AgentRoomContext` (AF-03) |
| `renderScreen(id, opts)` switch | `<Screen screen={id} opts={opts} />` (AF-07) |
| Script load order | ES module imports |
| CSS class strings | CSS-module classes |
| Listeners on dynamic HTML | React event props |

### 6. Disposition of existing `agent-room` code

| Asset | Action |
| --- | --- |
| `stream-chunk.ts`, `component-props.ts`, `proxy-schema.ts` | **Keep** — unused in stub mode (AF-90) |
| `use-agent-room-stream.ts`, `api/agent-room/stream/route.ts` | **Keep** — opt-in via mode flag; wire in AF-90 |
| `screen/network.tsx`, `audience.tsx`, `handoff-human.tsx`, `emphasis.tsx` | **Keep** — engine-only screens, not in the Ink Band set |
| `agent-room.module.css` | **Removed** — all styles in `ink-band.module.css` |
| `screen/*` (opening-hero, beat, readback, path, pricing, founders) | **Rewrite** against prototype HTML, not oat copy (AF-08–AF-10) |

## Consequences

- Default `/agent` now renders the **stub** room. Until AF-05 ports the runner,
  the stub is a placeholder (opening hero, no-op composer) — an intentional,
  documented regression for the migration window. Set
  `NEXT_PUBLIC_AGENT_ROOM_MODE=stream` to use the live agent meanwhile.
- `ScreenState`/`VoiceState` are shared from `use-agent-room-stream.ts` for now;
  they get reconciled to the wider Ink Band screen IDs when the registry lands
  (AF-07).
- No SSE, agents package, DB, auth, or tenant context is in scope for AF-02–AF-12.
