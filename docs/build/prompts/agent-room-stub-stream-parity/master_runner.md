# Agent Room stub ↔ stream parity — master runner

**Canonical location:** `movemental-ai/docs/build/prompts/agent-room-stub-stream-parity/`  
**Target agent:** Cursor / Claude Code executing one prompt at a time  
**Reviewer agent:** A second agent runs **[PAR-07](./07-reviewer-sign-off-audit.md)** after PAR-06 — independent sign-off, may fix scoped defects, blocks merge on failure  
**Primary repos:** `movemental-ai` **+** `movemental-ai-agents` (PAR-03, PAR-04)  
**Predecessor:** [INT master runner](../integration-agent-backend/master_runner.md) (INT-07 Done ✅, default `"stream"`)  
**Last updated:** 2026-06-10

---

## 1. Problem statement (as observed)

The Agent Room is **two products behind one UI**, not one state machine with a clean script→AI handoff.

### 1.1 Architecture today

| Layer | Shared? | Notes |
| --- | --- | --- |
| Shell (`AgentRoomView`, mast / screen / voice / composer) | ✅ | Mode-agnostic layout |
| Ink layer (`inkLine`, `drawGesture`, Caveat voice, SVG gestures) | ✅ | Stub `say` and stream `text_delta`/`ink_gesture` use the same primitives |
| Controller | ❌ | `useAgentRoomStub` **or** `useAgentRoomStream` — never both; selected at build time via `AGENT_ROOM_MODE` |
| Choreography source | ❌ | Stub: `data/scenes.ts` + `playScene`. Stream: SSE chunks from engine + **partial** local script |
| Composer chips | ❌ | Stub: `run(sceneName)`. Stream: `sendMessage(utterance)` |
| Beat interactivity | ❌ | Stub: local `beatScene()`. Stream: prop-driven beat + agent turns; stub handlers are no-ops in `StreamScreen` |

There is **no runtime handoff** between stub and stream. The only handoff *inside* stream is `agent_handoff` (host → diagnostician during a live turn).

### 1.2 The regression that surfaced this

When INT-07 flipped the default to `"stream"`, **local opening choreography stopped running on load**. Stream showed the static hero + `DEFAULT_SUGGESTIONS` but never played the scripted `say` + underline gesture from `SCENES.opening` until a partial fix landed in `opening-choreography.ts` (stream-only, intro acts only).

That fix is **symptomatic**: stream mode assumed the LLM would replace stub choreography entirely, but product intent treats the opening (and likely other beats) as **deterministic performance**, not model output.

### 1.3 Known gaps (from INT-07 sign-off + code review)

| Gap | Impact |
| --- | --- |
| Lead chip: stub → `beatIntro` scene; stream → sends string to LLM | Different path, copy, timing, gestures for the same label |
| `movemental-room-script.md` says stub is default; `mode.ts` defaults to `stream` | Operators and agents follow wrong SSOT |
| `room-host.md` not fully reconciled to stub script; `gesture_at` under-instructed | Agent *can* gesture (INT-04) but often *won't* |
| Stream failure → error voice only; no local scene fallback | Engine-down UX worse than stub despite stub still being in repo |
| Beat → full readback multi-step not proven live end-to-end | Highest-value stub flow may diverge silently in stream |
| Partial local script in stream (opening only) vs full stub graph | Undefined boundary of “what must stay scripted” |

### 1.4 What is **not** broken (do not rip out)

- Dual-mode switch with stub as **permanent offline fallback** (INT guardrail) — keep.
- SSE act carriers mirroring stub acts (`text_delta`, `ui_render`, `ink_gesture`, `suggest`) — keep.
- Shared screen registry (INT-02) — keep.
- Generation-token cancellation when user acts during local choreography — keep.

---

## 2. Desired state

### 2.1 Product model (target architecture)

```text
┌─────────────────────────────────────────────────────────────┐
│  LOCAL CHOREOGRAPHY LAYER (deterministic, no LLM)           │
│  • Opening intro (say + gesture) — always on load/replay    │
│  • Optional: beatIntro bridge, beat tap micro-choreography   │
│    where stub SSOT defines fixed ink (policy in PAR-01)     │
└──────────────────────────┬──────────────────────────────────┘
                           │ handoff: first composer action OR
                           │ explicit “enter guided path” beat
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  LIVE AGENT LAYER (stream SSE)                              │
│  • Model-authored say/show/gesture/suggest within rails     │
│  • Engine prompt + tools aligned to movemental-room-script  │
└──────────────────────────┬──────────────────────────────────┘
                           │ on engine error (policy PAR-05)
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  OFFLINE FALLBACK (stub mode OR optional stream degrade)    │
│  • Full SCENES graph, zero network                          │
└─────────────────────────────────────────────────────────────┘
```

**Handoff rule:** Local choreography **ends** when the visitor sends a composer action (chip or typed text). The opening generation token is bumped; local `playScene` stops; SSE owns subsequent turns. REPLAY resets to opening screen + replays local choreography only (not a blank agent session unless product says otherwise — document in PAR-05).

### 2.2 Parity rule (reviewer-facing)

For every **visitor-visible move** in [`docs/movemental-room-script.md`](../../../movemental-room-script.md), the parity matrix (PAR-00) must classify it as:

| Class | Meaning |
| --- | --- |
| **LOCAL** | Must run identically from `SCENES`/client without LLM in stream mode |
| **AGENT** | May be model-driven in stream; engine prompt + tools must document intent |
| **STUB-ONLY** | Offline/demo only; stream may omit if explicitly accepted |
| **GAP** | Not implemented in stream; must be fixed or reclassified before sign-off |

No unclassified GAP rows at PAR-07 sign-off (reviewer gate).

### 2.3 Documentation truth

One page answers “what runs on `/agent` by default?”:

- Default mode: `stream` (env override: `NEXT_PUBLIC_AGENT_ROOM_MODE=stub`)
- Local choreography list (with file pointers)
- When the LLM takes over
- How to run fully offline

---

## 3. Definition of done (program-level)

A reviewer agent can check **all** of the following before marking this pack Done:

### 3.1 Behavior

- [ ] **Opening:** On `/agent` load and REPLAY in **stream** mode, scripted ink voice + `#phrase` underline appear without any network call (already partially true — PAR-01 hardens contract + tests).
- [ ] **Parity matrix:** PAR-00 artifact committed; every script scene/move has LOCAL / AGENT / STUB-ONLY / GAP classification; zero unresolved GAP without operator sign-off note in §10.
- [ ] **Lead chip:** Stream path for “Get a clear next AI step” matches product decision (either LOCAL `beatIntro` choreography then agent, or documented AGENT path with prompt guaranteeing equivalent `ui_render` + gesture — not accidental divergence).
- [ ] **Beat flow:** Live stream completes at least one full reality-check answer cycle with valid gesture targets (`#opts`, `[data-oi]`) and reaches readback or documented AGENT equivalent.
- [ ] **Gestures live:** At least one `ink_gesture` emitted by engine during a scripted E2E turn (not only client-local opening).
- [ ] **Stub unchanged:** `NEXT_PUBLIC_AGENT_ROOM_MODE=stub` → zero network, full `SCENES` graph, byte-identical to pre-PAR baseline for opening + one inner scene (regression spot-check).

### 3.2 Engine (cross-repo)

- [ ] `room-host.md` (and seed) reconciled to stub SSOT for Guide-phase moves (PAR-04).
- [ ] `gesture_at` + `suggest_chips` usage documented with screen/target allow-list examples tied to room script scenes.
- [ ] No dead tool names in prompt (INT-07 class of bug).

### 3.3 Tests & docs

- [ ] Unit tests for opening choreography + stream contract (path alias working or relative imports).
- [ ] E2E: stream load shows voice line (no send); stub unchanged; live beat path (engine-gated).
- [ ] `movemental-room-script.md`, `src/components/agent-room/README.md`, and PAR-05 policy doc aligned on defaults and handoff.

### 3.4 Reviewer checklist (PAR-07 — independent Claude session)

Executed via [07-reviewer-sign-off-audit.md](./07-reviewer-sign-off-audit.md). Summary:

- [ ] Read PAR-00 matrix — agree with classifications or document waivers.
- [ ] Diff does not merge stub/stream hooks into one untyped path (INT-05 guardrail).
- [ ] No new fetch on load beyond local choreography.
- [ ] ADR amendment appended (do not erase AF-01 / INT-07 history).
- [ ] `pnpm typecheck` · `pnpm lint` · `pnpm test:run` green (evidence in sign-off doc).
- [ ] Verdict: **Approved** | **Approved with reviewer fixes** | **Changes requested** (no merge on the last).

---

## 4. Mandatory agent protocol (every session)

You are the **Stub↔Stream Parity runner**.

1. **Read this file first** in a new context window.
2. Execute prompts in **Recommended order** unless PAR-00 matrix reorders priorities.
3. After each prompt: update the **Master status table** below, append **Session changelog**, append child **§10 Attempt log**.
4. Run verification in **both repos** when cross-repo.
5. **Do not regress stub mode** — zero network, ever.
6. **Do not collapse modes** into a single controller — extend stream with a documented local layer instead.
7. Never mark **Done** without PAR-07 reviewer **Approved** (or **Approved with reviewer fixes**).

---

## 5. Master status table

| Order | ID | Prompt | Status | Last touched | Branch | Blockers / notes |
| ---: | --- | --- | --- | --- | --- | --- |
| 0 | PAR-00 | [00-parity-audit-and-matrix.md](./00-parity-audit-and-matrix.md) | **Done** | 2026-06-10 | — | Matrix at `docs/build/agent-room-stub-stream-parity-matrix.md` |
| 1 | PAR-01 | [01-local-choreography-layer.md](./01-local-choreography-layer.md) | **Done** | 2026-06-10 | — | `local-choreography.ts` + unit tests |
| 2 | PAR-02 | [02-composer-routing-parity.md](./02-composer-routing-parity.md) | **Done** | 2026-06-10 | — | `composer-routing.ts`; lead → beatIntro local |
| 3 | PAR-03 | [03-beat-readback-engine-contract.md](./03-beat-readback-engine-contract.md) | **Done** | 2026-06-10 | — | Fixture tests; client targets verified; live engine-gated |
| 4 | PAR-04 | [04-room-host-script-reconciliation.md](./04-room-host-script-reconciliation.md) | **Done** | 2026-06-10 | — | `room-host.md` gesture policy + beatIntro entry |
| 5 | PAR-05 | [05-docs-drift-and-fallback-policy.md](./05-docs-drift-and-fallback-policy.md) | **Done** | 2026-06-10 | — | Option A fallback; handoff doc |
| 6 | PAR-06 | [06-parity-e2e-signoff.md](./06-parity-e2e-signoff.md) | **Done** | 2026-06-10 | — | Draft sign-off + e2e stream-local block |
| 7 | PAR-07 | [07-reviewer-sign-off-audit.md](./07-reviewer-sign-off-audit.md) | **Done** | 2026-06-10 | — | **Approved with reviewer fixes** — fixed beatIntro stale-chip gen race; GAP G1–G4 accepted as engine-gated. Sign-off doc finalized. |

---

## 6. Recommended execution order

```text
PAR-00  Read-only parity matrix (stub script vs stream behavior)
  ↓
PAR-01  Local choreography layer (opening + policy for other LOCAL beats)
  ↓
PAR-02  Composer routing parity (chips + typed input semantics)
  ↓
PAR-03  Beat → readback live contract (engine tools + client targets)     ← cross-repo
PAR-04  room-host.md ↔ movemental-room-script reconciliation             ← cross-repo
  ↓
PAR-05  Docs + fallback policy (ADR, room script, optional degrade)
  ↓
PAR-06  E2E tests + draft sign-off doc (executor)
  ↓
PAR-07  Independent reviewer audit (Claude) — approve, fix, or block merge
```

PAR-03 and PAR-04 may overlap after PAR-00 is Done. **PAR-07 must be last** — fresh reviewer context, after PAR-06 draft exists.

---

## 7. Session changelog

| Date | Agent | Prompt | Summary |
| --- | --- | --- | --- |
| 2026-06-10 | Cursor | — | Pack authored from post-INT-07 architecture review (opening regression + dual-mode seams). |
| 2026-06-10 | Cursor | PAR-07 | Added independent Claude reviewer sign-off prompt (final merge gate). |
| 2026-06-10 | Cursor | PAR-00–06 | Parity matrix, local choreography layer, composer routing, engine prompt gesture policy, docs/handoff, unit + e2e tests, draft sign-off. |
| 2026-06-10 | Claude | PAR-07 | Independent review. **Approved with reviewer fixes.** Phases A–E pass: UI typecheck/lint(touched)/unit 22/22 ✅, engine typecheck + 154/154 ✅, guardrails G1–G6 ✅, docs stream-default truth ✅. **Fixed 1 blocker:** `playBeatIntro.then()` re-set stale "Okay, map it" chip over a live turn when the visitor acted mid-beatIntro — added a generation guard. GAP G1–G4 accepted as engine-gated (live e2e closure pending operator engine-up run). Sign-off doc finalized. |

---

## 8. References

| Doc | Role |
| --- | --- |
| [`docs/movemental-room-script.md`](../../../movemental-room-script.md) | Stub performance SSOT (needs mode-default update in PAR-05) |
| [`src/lib/agent-room/opening-choreography.ts`](../../../src/lib/agent-room/opening-choreography.ts) | Introductory local layer in stream (partial PAR-01) |
| [`src/lib/agent-room/mode.ts`](../../../src/lib/agent-room/mode.ts) | Mode switch (`stream` default) |
| [`src/components/agent-room/README.md`](../../../src/components/agent-room/README.md) | ADR |
| [INT-05](../integration-agent-backend/05-scenes-to-agent-tool-surface.md) | Act → carrier mapping; mode boundary guardrails |
| [INT-07](../integration-agent-backend/07-e2e-live-and-fallback.md) | Known deltas at flip |
