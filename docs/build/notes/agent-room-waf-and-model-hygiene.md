# Agent Room — WAF workaround and host model (Workstream F)

**Status:** Proposed / operator reference (2026-06-17)  
**Requires sign-off before production changes.**

## Cloudflare WAF (`/turn` vs `/stream`)

### Current workaround

- Browser POST: `/api/agent-room/turn` ([`stream-route-handler.ts`](../../src/lib/agent-room/stream-route-handler.ts))
- Engine upstream: `/api/agents/stream` (unchanged)
- Reason: Cloudflare WAF on `www.movemental.ai` blocks POST requests whose path contains the substring `stream`.

### Proposed allow-rule (do not apply without infra sign-off)

Create a Cloudflare WAF custom rule or WAF exception:

| Field | Value |
|-------|--------|
| Host | `www.movemental.ai` (and preview hosts if needed) |
| Method | `POST` |
| Path | `/api/agent-room/turn` **or** upstream `/api/agents/stream` if proxy is reverted |
| Action | Allow (skip managed rules that match on `stream`) |

After the rule is verified in staging, optionally rename the public path back to `/api/agent-room/stream` for clarity — only if product wants the name aligned; functionally `/turn` is fine once documented.

## Host model configuration

### SSOT

`room-host` and `room-diagnostician` models are pinned in [`movemental-ai-agents/scripts/seed-agent-room.ts`](../../../movemental-ai-agents/scripts/seed-agent-room.ts) (`AGENT_SEEDS[].model`). The runtime reads the model from the `agents` table after `pnpm seed:agent-room`.

**Current seed (2026-06):** both agents use `claude-opus-4-6`.

### Changing the model (staging / evaluation only)

1. Edit `AGENT_SEEDS` in `seed-agent-room.ts` (e.g. `claude-sonnet-4-6` or `claude-haiku-4-5-20251001` for host only).
2. Run `pnpm seed:agent-room` in `movemental-ai-agents`.
3. Run `pnpm test:room-host` and spot-check §19 operator checklist in [`agent-platform-complete-reference.md`](./agent-platform-complete-reference.md).

**Do not change production model without explicit sign-off.**

## Sonnet vs Haiku vs Opus (recommendation)

After Workstreams A (output guardrail) and B (deterministic Safety verdict):

| Model | Pros | Cons |
|-------|------|------|
| **Haiku** | Lowest cost/latency | Higher prose drift; more guardrail corrections on price/commitment; weaker free-text routing |
| **Sonnet** | Good balance of cost and instruction-following | Still needs guardrails; higher cost than Haiku |
| **Opus (current)** | Best adherence to handoff + tool discipline | Highest cost per AGENT turn |

**Recommendation:** Keep **Opus** for `room-host` on the public front door until transcript volume (Workstream C) and guardrail violation rates are measured in staging. If cost becomes the constraint, trial **Sonnet** for `room-host` first — not Haiku — while keeping **Opus** for `room-diagnostician` read-back quality. Haiku is only appropriate if guardrail correction rate stays near zero in staging probes.
