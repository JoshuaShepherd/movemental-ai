# AF-90 — Deferred: agent backend integration

**Prompt ID:** AF-90  
**Target agent:** Cursor / Claude Code  
**Status:** **Deferred** — do not execute until operator explicitly requests after AF-12 sign-off.  
**Last updated:** 2026-06-09

---

## 1. Purpose of this document

Records what **intentionally stays out** of AF-00–AF-12 and outlines a **future prompt pack** for wiring the migrated React UI to the live agent stack. Reading this during stub migration helps avoid accidental scope creep.

---

## 2. Out of scope for HTML→React migration

| Item | Location | Why deferred |
| --- | --- | --- |
| SSE stream consumption | `use-agent-room-stream.ts` | Requires live model |
| Stream API route | `src/app/api/agent-room/stream/route.ts` | Backend dependency |
| Stream chunk contract | `src/lib/agent-room/stream-chunk.ts` | Keep in sync with `movemental-ai-agents` |
| Component prop validation | `component-props.ts` | Agent-driven props |
| Supabase / agents tables | `src/lib/db/schema.ts` | Persistence layer |
| `movemental-ai-agents` package | External repo | Agent registry + tools |
| `getProfile()` RAG swap | `profiles.ts` seam | Data backend |
| Contact form POST | `/api/contact` | Product wiring |
| Auth / tenant / dashboard | platform-wide | Not part of ink-band UI |

---

## 3. What stub migration must preserve for AF-90

From `movemental-agentic-front-end/docs/notes/intent-and-migration.md`:

### 3.1 Act vocabulary mapping

| Prototype act | Stream event (target) |
| --- | --- |
| `say` | `text_delta` |
| `show` | `ui_render` |
| `gesture` | `ink_gesture` (may need engine extension) |
| `suggest` | TBD — chips from agent or tool |
| `wait` / `clear` | Client-side interpretation |

### 3.2 Closed screen set

Agent `ui_render.component` IDs in `stream-chunk.ts` must align with migrated screens:

```ts
// Current engine IDs — reconcile with Ink Band screen set during integration
"reality_check_beat" | "readback" | "path" | "pricing" | "network" |
"audience" | "founders" | "handoff_human"
```

Integration work includes **ID harmonization** (`home` vs opening hero, `faq`/`about`/`contact`/`safety`/`leader` missing from current enum).

### 3.3 Mode switch

AF-01 introduces `AGENT_ROOM_MODE`. AF-90 flips default to `"stream"` when ready:

```env
NEXT_PUBLIC_AGENT_ROOM_MODE=stream
```

---

## 4. Future integration phases (sketch)

When operator requests AF-90 execution, split into a **new prompt pack** (suggested):

| Phase | Focus |
| --- | --- |
| INT-00 | Preflight: engine reachability + contract-drift baseline (read-only; prepended, mirrors AF-00). |
| INT-01 | Harmonize `ComponentId` ↔ Ink Band `ScreenId` + **`capture`** (one mapping SSOT). |
| INT-02 | Map `ui_render` chunks to `ScreenRouter` (+ capture on sheet). |
| INT-03 | Map `text_delta` to streaming ink voice (+ Discuss passage routing). |
| INT-04 | Add `ink_gesture` to engine + client (cross-repo). |
| INT-05 | Replace `SCENES` with agent-driven acts (adds the `suggest` carrier + Discuss chips). |
| INT-06 | Wire `getProfile()` to corpus/RAG (`movement_leader_corpus_data`). |
| INT-08 | Discuss phase + **Model B** UI ([design spec](../../notes/agent-room-long-form-discussion-ui.md)). |
| INT-09 | Discuss transition + **`capture` `kind:'discuss'`** + stub gate + sessionStorage. |
| INT-10 | **`phase` in POST** + Option A phase-aware prompt + live Discuss stream. |
| INT-07 | E2E live + fallback; flip default to `"stream"`. |

---

## 5. Guardrails during stub work (AF-00–AF-12)

- **Do not delete** `use-agent-room-stream.ts` or stream types.
- **Do not** remove `/api/agent-room/stream` route.
- **Do not** merge stub runner and stream hook into one untyped path — keep mode flag.
- **Do** structure screen components to accept props from both stub opts and validated `component-props`.

---

## 6. References

| Doc / path | Role |
| --- | --- |
| `movemental-agentic-front-end/docs/notes/intent-and-migration.md` | Product intent |
| `src/lib/agent-room/stream-chunk.ts` | Client stream contract |
| `movemental-ai-agents` | Engine SSE + agent catalog |
| AF-01 architecture ADR | stub vs stream |

---

## §10 Attempt log

<!-- Record operator decision to start integration; link to future INT pack when created. -->

### 2026-06-10 — Operator opened the gate; INT prompt pack authored (Claude Code)

After AF-12 sign-off, the operator (Joshua Shepherd) chose **"author the INT prompt pack"** — scope and stage the live integration without wiring the backend yet. **No code changed**; stub remains the default and the stream path is still untouched.

The new pack lives at **[`docs/build/prompts/integration-agent-backend/`](../integration-agent-backend/master_runner.md)** and operationalizes §4's sketch:

- **INT-00** — Preflight: engine reachability + contract-drift baseline (read-only; prepended, mirrors AF-00).
- **INT-01** — Harmonize `ComponentId` ↔ Ink Band `ScreenId` (one mapping SSOT).
- **INT-02** — `ui_render` → the shared Ink Band screen registry (prop-driven screens).
- **INT-03** — `text_delta` → streaming ink voice.
- **INT-04** — `ink_gesture`: new chunk + render-tool (engine + client, cross-repo).
- **INT-05** — Replace `SCENES` with agent-driven acts (adds the `suggest` carrier).
- **INT-06** — `getProfile()` → corpus/RAG (`movement_leader_corpus_data`).
- **INT-07** — E2E live + fallback; flip default to `"stream"`.

Each child prompt is grounded in the real seams (`stream-chunk.ts`, `component-props.ts`, `use-agent-room-stream.ts`, `screen/screen.tsx`, the proxy route, and the engine's `render-tools.tool.ts` / `ai/types.ts`). **Discuss** (Model B, capture, phase-aware agent) is specified in [agent-room-long-form-discussion-ui.md](../../notes/agent-room-long-form-discussion-ui.md) and built in INT-08…INT-10. Execution remains **operator-gated** and **cross-repo** (`movemental-ai` + `movemental-ai-agents`). AF-90 stays the deferral record; the INT master runner now owns execution.
