# Agent Room — handoffs

## Host → diagnostician

| Field | Value |
|-------|-------|
| From | `room-host` |
| To | `room-diagnostician` |
| Trigger (DB row) | `{ "trigger": "compose read-back", "context_transfer": "reality_check_answers" }` |
| Client action | Host calls `request_diagnosis` tool with full `answers[]` |
| Engine | Detects handoff envelope → emits `agent_handoff` chunk → continues run as diagnostician |

The diagnostician receives **one turn** to call `show_readback` (or `offer_human_handoff`). No chat text beside the tool call.

---

## Verdict rule (deterministic)

Computed by runtime / scene layer — **not** model-decided:

```
verdict = "past"  ONLY IF
  decision == "Yes — written and ratified"
  AND refusals == "Names specific refusals"

Otherwise verdict = "pre"
```

| verdict | hereStageIndex | Meaning |
|---------|----------------|---------|
| `pre` | 0 | Start at Safety |
| `past` | 1 | Safety done → point to Sandbox |

---

## Human handoff (both agents)

| Field | Value |
|-------|-------|
| Email | `josh@movemental.ai` (hard-coded in tool schema) |
| When | Off-domain, unreadable input, explicit ask for a person |

---

## Guide → Discuss (client phase, not DB handoff)

| Step | Behavior |
|------|----------|
| Visitor taps Discuss chip | `value: "enter-discuss"` |
| Client | Sets local Discuss phase; POST includes `phase: "discuss"` |
| Engine | Appends [`discuss-phase-block.md`](./runtime/discuss-phase-block.md) to system prompt |
| Host model | Unchanged slug — same `room-host` agent |

No second agent row for Discuss.

---

## SSE chunk types (operator reference)

Relevant chunks from engine → client:

| Chunk | Meaning |
|-------|---------|
| `text_delta` | Voice line streaming |
| `ui_render` | Screen component + props |
| `suggest` | Chip row |
| `agent_handoff` | Switching agent slug mid-stream |
| `error` | Tool/guardrail failure |

Full contract: `movemental-ai/src/lib/agent-room/stream-chunk.ts` (mirror in engine `ai/types.ts`).
