# Agent Room — mode, local layer, and handoff

**Last updated:** 2026-06-10 (HYB hybrid handoff)

---

## Default mode

| Env | Mode | Behavior |
| --- | --- | --- |
| *(unset)* | **`hybrid`** | Full local `SCENES` runner; SSE only on classified unscripted moves |
| `NEXT_PUBLIC_AGENT_ROOM_MODE=stub` | `stub` | Full `SCENES` graph, **zero network** |
| `NEXT_PUBLIC_AGENT_ROOM_MODE=stream` | `stream` | Legacy full-AI path (`useAgentRoomStream`) for dev/regression |

Mode is build-inlined via [`src/lib/agent-room/mode.ts`](../src/lib/agent-room/mode.ts).

---

## Three layers

```text
LOCAL CHOREOGRAPHY  →  LIVE AGENT (SSE)  →  OFFLINE FALLBACK (stub env)
```

### 1. Local choreography (no LLM)

**Modules:** `src/lib/agent-room/data/scenes.ts`, `scene-runner.ts`, `use-agent-room-hybrid.ts` (or `use-agent-room-stub.ts` in stub mode)

| Move | Hybrid / stub |
| --- | --- |
| Load + REPLAY | `run("opening")` — say, gesture, chips |
| Suggestion chips | `run(to)` from `SCENES` |
| Leader portrait | `leaderScene(i)` + FLIP |
| Beat answers | `beatScene()` |
| Typed regex match | `routeInput()` → `run(target)` |

No `/api/agent-room/stream` on load.

### 2. Live agent (SSE)

**Module:** `src/lib/agent-room/agent-stream-turn.ts`  
**Classifier:** `src/lib/agent-room/move-classifier.ts`

**Handoff triggers (hybrid):**

| Trigger | Route |
| --- | --- |
| Typed text, no regex match | AGENT (`open_text`) |
| Discuss phase typed input | AGENT (`discuss`) |
| Agent `suggest` chip tap | AGENT (`agent_chip`) |

Each AGENT turn POSTs to `/api/agent-room/stream` with optional `roomContext` (screen, last scene, phase, map progress).

### 3. Offline fallback

| Mode | Behavior |
| --- | --- |
| `stub` env | Zero network; full graph |
| `hybrid` engine 502/503 | Error voice + local `FALLBACK_SAY` line; room stays on current screen |

---

## REPLAY

`↺ replay` / logo home:

- **Hybrid:** `goHome()` → full `run("opening")`; clears agent history/session
- **Stub:** same
- **Stream:** local opening choreography only + agent session reset

---

## Key files

| File | Role |
| --- | --- |
| `move-classifier.ts` | LOCAL vs AGENT routing SSOT |
| `use-agent-room-hybrid.ts` | Default controller |
| `agent-stream-turn.ts` | Shared SSE drain |
| `proxy-schema.ts` | `roomContext` on POST body |

---

## References

- Parity matrix: [`agent-room-stub-stream-parity-matrix.md`](./agent-room-stub-stream-parity-matrix.md)
- Hybrid sign-off: [`agent-room-hybrid-signoff.md`](./agent-room-hybrid-signoff.md)
- Stub script: [`movemental-room-script.md`](../movemental-room-script.md)
- Engine prompt §12: `movemental-ai-agents/scripts/seed-data/prompts/room-host.md`
- ADR: `src/components/agent-room/README.md`
- Reviewer: [`docs/build/prompts/checkers/agent-room-hybrid-handoff-review.md`](./prompts/checkers/agent-room-hybrid-handoff-review.md)
