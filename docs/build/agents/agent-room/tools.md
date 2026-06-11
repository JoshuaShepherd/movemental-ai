# Agent Room — tools

Tools are registered in the engine (`registerTool` / `executeTool`), described in Postgres (`agent_tools`), and enabled per agent via `agent_tool_assignments`. Invalid props are **blocking**: the render is dropped and the model may receive an error chunk.

**Seed source:** `movemental-ai-agents/scripts/seed-agent-room.ts`

---

## Assignment matrix

### `room-host` (order matters for operator clarity, not execution)

| Order | Tool | Type | Purpose |
|------:|------|------|---------|
| 0 | `render_beat` | render | Reality-check question + option chips |
| 1 | `show_path` | render | Four-stage path (Safety → Solutions) |
| 2 | `show_pricing` | render | Full pricing screen |
| 3 | `show_network` | render | Leader constellation _(deferred in prompt)_ |
| 4 | `show_audience` | render | Audience picker _(deferred in prompt)_ |
| 5 | `show_founders` | render | Founders band _(deferred in prompt)_ |
| 6 | `offer_human_handoff` | action | Contact the team |
| 7 | `request_diagnosis` | handoff | Pass answers to diagnostician |
| 8 | `gesture_at` | ink | Underline / circle / arrow on DOM target |
| 9 | `suggest_chips` | suggest | Up to 4 next-step chips |
| 10 | `show_capture` | render | Form cell: `free` \| `paid` \| `map` \| `discuss` |
| 11 | `file_search` | knowledge | Depth retrieval over the Movemental corpus (OpenAI vector store) — **CON-06**. Only seeded when `OPENAI_VECTOR_STORE_ID` is set. |

### `room-diagnostician`

| Order | Tool | Purpose |
|------:|------|---------|
| 0 | `show_readback` | Path-placement read-back (only normal output) |
| 1 | `offer_human_handoff` | Escape hatch when input unreadable |

---

## Tool reference

### `render_beat`

```json
{
  "beatId": "org_kind | reality | visibility | decision | trust | refusals | worry",
  "question": "string (from HOST_SCENES at runtime; seed schema allows override)",
  "options": ["string", "..."],
  "progress": { "step": 1, "total": 6 }
}
```

Beat copy is normally **`[const]` from `HOST_SCENES`** in the UI repo; the model supplies `beatId` and the engine fills question/options when wired that way.

### `show_readback` (diagnostician only)

```json
{
  "verdict": "pre | past",
  "hereStageIndex": 0,
  "prose": { "lead": "string", "body": ["string"] },
  "fork": [{ "label": "string", "sub": "string", "intent": "pricing|path|handoff_human", "paid": false }],
  "handoffNote": "optional string"
}
```

`verdict` / `hereStageIndex` / `fork` are deterministic from scene data; model authors **`prose` only**.

### `show_capture`

```json
{ "kind": "free | paid | map | discuss" }
```

| kind | Use |
|------|-----|
| `free` | SafeGuide / field guide email capture |
| `paid` | SafeStart $1,000 enrollment |
| `map` | Soft gate after reality map |
| `discuss` | Long-form follow-up capture (~6–8 turns) |

### `gesture_at`

```json
{
  "screen": "home | beat | readback | capture",
  "kind": "underline | circle | arrow",
  "target": "#opts | #phrase | #hereStage | #rbphrase | #capture | [data-oi=\"N\"]"
}
```

Client allow-list in `movemental-ai` — invalid targets are dropped silently.

### `suggest_chips`

```json
{
  "chips": [
    { "label": "string", "value": "string", "lead": false }
  ]
}
```

Max 4 chips. Special sentinel: `value: "enter-discuss"` switches client to Discuss phase.

### `offer_human_handoff`

```json
{ "reason": "optional", "email": "josh@movemental.ai" }
```

`email` is fixed in schema (`const`).

### `request_diagnosis` (handoff payload)

```json
{
  "answers": [
    { "beatId": "string", "question": "string", "answer": "string" }
  ]
}
```

One object per beat, answers **verbatim**.

---

## Tools **not** assigned to room agents (platform)

Available in other seeds (e.g. Alan writing assistant):

| Tool | Backend | Notes |
|------|---------|-------|
| `file_search` | OpenAI vector store | Primary RAG — see [`corpus-and-rag.md`](./corpus-and-rag.md) |
| `search_corpus` | Postgres `search_corpus_semantic()` | Chunk search, optional `book_filter` |
| `list_corpus_books` | DB catalog | Explicit catalog requests only |

To enable `file_search` on `room-host`: add to `ASSIGNMENTS` in seed, link `corpus_binding_id`, update host prompt with when-to-search policy, re-seed.

---

## UI render mapping

Engine emits `ui_render` SSE chunks; client maps `component` → React screen in `movemental-ai/src/components/agent-room/screen/`. Tool name ≠ component name in all cases — follow `stream-chunk.ts` / `ui-render.ts` in the engine.

---

## Editing tools

1. Update JSON Schema in `TOOL_SEEDS` (keep in sync with Zod in `render-tools.tool.ts`)
2. Add/remove `ASSIGNMENTS` rows
3. Update prompt capability contracts (§4 in each prompt)
4. `pnpm seed:agent-room`
