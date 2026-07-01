# The Movemental Agent Room — Phase 1 build status

> **Historical snapshot (2026-06-05).** Superseded for shipped behavior by [agent-platform-complete-reference.md](./agent-platform-complete-reference.md) and [agent-room-prompt-baseline.md](./agent-room-prompt-baseline.md). **§3 handoff is resolved** (2026-06) — do not treat as blocking.

**Created:** 2026-06-05
**Brief:** "Build Brief — The Movemental Agent Room (Phase 1)"
**Build split (your call):** engine → `movemental-ai-agents`; room → `movemental-ai`; room UI paused until prototypes are provided.

---

## TL;DR

The **engine + protocol layer is built, typechecked, and tested** in `movemental-ai-agents`. The **client stream contract** is built in `movemental-ai`. The **room UI is intentionally not built** (waiting on your prototypes). One DoD item — the host→diagnostician **handoff** — is blocked on a missing engine primitive and needs a decision (see §3).

Two corrections to the brief, confirmed against the repos before building:
- The engine (`StreamChunk`, `tool-executor`, `agent-runner`, `/api/agents/stream`) lives in **`movemental-ai-agents`**, not `movemental-ai`. `movemental-ai` has the agent *schema* + a front-end + an existing engine proxy, so it hosts the room and consumes the engine.
- The registry pins **`claude-haiku-4-5-20251001`** and **`claude-opus-4-6`** — there is no `claude-opus-4-8`. The seed uses the real registered ids (no placeholder model, per brief §8.3). If you want Opus 4.8, add it to `src/lib/ai/model-registry.ts` first, then change the diagnostician's `model`.

---

## 1. Done — engine + protocol (`movemental-ai-agents`)

| Area | File | What |
|------|------|------|
| Protocol | `src/lib/ai/types.ts` | Added the `ui_render` `StreamChunk` variant + the closed `ComponentId` enum (the honesty rail). |
| Gate | `src/lib/ai/runtime/ui-render.ts` (new) | `defineRenderTool` (Zod prop validation = the **blocking** guardrail), the render/error envelope, `interpretToolOutput`, `toolResultContentForModel`. Invalid props → **no render**, an `error` chunk, and a log — never a swallowed `catch {}`. |
| Tools | `src/lib/tools/render-tools.tool.ts` (new) | 8 render tools with Phase-1 Zod prop schemas. Fully live: `render_reality_check_beat`, `show_readback`, `show_path`, `offer_human_handoff`. Static placeholders: `show_pricing`, `show_network`, `show_audience`, `show_founders`. Registered via `register-builtins.ts`. |
| Runner | `src/lib/ai/runtime/agent-runner.ts` | `streamAgent` now emits a typed `ui_render` (or `error`) chunk from the render envelope across all three provider tool-result branches; the model receives only a small `{ rendered }` ack. No in-band string sentinels. |
| Seed | `scripts/seed-agent-room.ts` (new) + `scripts/seed-data/prompts/room-host.md`, `room-diagnostician.md` | `room-host` (Haiku, runs every turn) + `room-diagnostician` (Opus-4-6, read-back) agents, the 8 render `agent_tools`, tool assignments (host = repertoire; diagnostician = `show_readback`), and the host→diagnostician handoff row. Prompts verbatim from brief §6, incl. the reality-check beats + deterministic verdict rule. `pnpm seed:agent-room`. |

**Verification:** `pnpm typecheck` → **0 errors repo-wide**. `pnpm test:run` → **140/140 pass**. New `src/lib/ai/runtime/ui-render.test.ts` → **4/4 pass** (proves valid→render, invalid→blocked error, plain→passthrough, replace honored). SSE serialization (`streaming.ts`) passes `ui_render` through generically — no change needed.

Real per-turn token `usage` is already logged by the engine (`logTurnUsage`) — DoD §8 satisfied; no fake telemetry introduced.

## 2. Done — client contract (`movemental-ai`)

- `src/lib/agent-room/stream-chunk.ts` (new) — Zod `StreamChunk` mirror incl. `ui_render` + `ComponentId`, `parseStreamChunk` (drops malformed), and an incremental `parseSSEBuffer` (handles partial buffers / multi-line `data:`). Protocol only; **typecheck 0 errors**. This is the seam the room hook + proxy route will consume.

## 3. OPEN DECISION — the host→diagnostician handoff (DoD §9.5)

The brief assumes "the host hands off via the existing `agent_handoff` chunk." **That primitive is dormant:** the runner *handles* `agent_handoff` and `resolveHandoff` exists, but **no adapter or tool ever *emits* an `agent_handoff`** from a model action. So today the diagnostician will not be invoked automatically (the seed creates the agent + handoff row, but nothing fires it).

Recommended fix (mirrors the `ui_render` pattern, contained): add a **handoff tool** (`request_diagnosis`) whose handler returns a handoff envelope; in `streamAgentInner`, after the tool-result branches, detect it → `yield {type:"agent_handoff"}` → `resolveHandoff(...)` → `yield* streamAgentInner(next agent, message = reality-check answers)` → return. The design choice to confirm: **how the reality-check answers transfer** to the diagnostician (recommend: pass them as the diagnostician's user `message`, JSON-serialized, so its prompt reads them as the turn). ~30–50 lines in the runner + a tool. Say the word and I'll wire it.

Until then, an interim option is to let the **host** call `show_readback` directly (single-agent), losing the Opus-composed quality the brief wants — not recommended as the final state.

## 4. HELD — room UI (`movemental-ai`), pending prototypes

Not built, by your choice ("I'll provide the prototypes"). When Agent Room UI prototypes land:
- `/agent` three-zone room shell (screen / voice / input, `100dvh`, no page scroll, corner hamburger, static crawlable fallback).
- Four live React components (`reality_check_beat`, `readback`, `path`, `handoff_human`) consuming the Zod-typed props; placeholders for the rest.
- Stream hook (`use-agent-chat-stream` analog) with the `ui_render` case, built on `src/lib/agent-room/stream-chunk.ts`.
- Proxy route to the engine stream (model on the existing `/api/onboarding/agent-chat`).
- Style with **Concept Modern** (`concept-modern-ui` skill, `src/app/globals.css`, `docs/design/DESIGN.md`) — same tokens as the marketing site.

## 5. How to run what exists

```bash
# in movemental-ai-agents
pnpm typecheck && pnpm test:run                 # 0 errors, 144 tests
TENANT_ORG_ID=<org-uuid> pnpm seed:agent-room   # creates room-host + room-diagnostician + tools
# then POST to /api/agents/stream with agentSlug "room-host" (needs ANTHROPIC_API_KEY)
```

DoD scorecard: §9.1 ✅ · §9.2 ✅ (blocking gate, tested) · §9.3 ⏸ (room UI held) · §9.4 ✅ engine-side (host prompt + tools seeded; needs server run to observe) · §9.5 ⛔ (handoff primitive — §3) · §9.6 ✅ engine-side (offer_human_handoff tool + prompt rail) · §9.7 ✅ (4 live tools implemented) · §9.8 ✅ (real usage, one path, real model ids, no swallowed guardrails).
