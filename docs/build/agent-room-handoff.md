# Agent Room — mode, local layer, and handoff

**Last updated:** 2026-06-10 (PAR-05)

---

## Default mode

| Env | Mode | Behavior |
| --- | --- | --- |
| *(unset)* | `stream` | Live SSE + local choreography on load |
| `NEXT_PUBLIC_AGENT_ROOM_MODE=stub` | `stub` | Full `SCENES` graph, zero network |

Mode is build-inlined via `src/lib/agent-room/mode.ts`.

---

## Three layers (target architecture)

```text
LOCAL CHOREOGRAPHY  →  LIVE AGENT (SSE)  →  OFFLINE FALLBACK (stub env)
```

### 1. Local choreography (no LLM)

**Module:** `src/lib/agent-room/local-choreography.ts`

| Beat | When |
| --- | --- |
| `OPENING` | `/agent` load, REPLAY (`reset`) |
| `BEAT_INTRO` | Stream lead chip "Get a clear next AI step" only |

Opening plays: wait → say → underline `#phrase`. No `/api/agent-room/stream` on load.

### 2. Live agent (SSE)

**Handoff:** First composer action classified **AGENT** (typed text, non-local chips, "Okay, map it" after beatIntro) bumps the local generation token, cancels local scenes, and POSTs to `/api/agent-room/stream`.

Subsequent turns: engine tools (`render_beat`, `gesture_at`, `show_*`, `request_diagnosis`, `suggest_chips`).

### 3. Offline fallback

**Option A (current):** Stream errors show an honest error voice. Operator sets `NEXT_PUBLIC_AGENT_ROOM_MODE=stub` for demos.

**Option B (not implemented):** Runtime degrade to stub controller on 502/503 — rejected PAR-05 2026-06-10.

---

## REPLAY

`↺ replay` / logo home:

- **Stream:** Clears session history, returns to opening hero, replays **LOCAL opening only** (not a blank agent session).
- **Stub:** `goHome()` → full `opening` scene including chips.

---

## Composer chips (stream)

See `src/lib/agent-room/composer-routing.ts` and the parity matrix. Lead chip → local `beatIntro`; other defaults → agent utterance.

---

## References

- Parity matrix: [`agent-room-stub-stream-parity-matrix.md`](./agent-room-stub-stream-parity-matrix.md)
- Stub script: [`movemental-room-script.md`](../movemental-room-script.md)
- Engine prompt: `movemental-ai-agents/scripts/seed-data/prompts/room-host.md`
- ADR: `src/components/agent-room/README.md`
