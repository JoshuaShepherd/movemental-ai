# Agent Room — models, tenant, and seed

## Pinned tenant

| Field | Value |
|-------|-------|
| Organization UUID | `6bc0fcf7-2e55-4914-b88d-c6eb49eb0d71` |
| Env (UI proxy) | `AI_AGENTS_TENANT_ORG_ID` in `movemental-ai` |
| Env (engine) | `TENANT_ORG_ID` in `movemental-ai-agents` |

Both must match. The public `/api/agent-room/stream` proxy forwards this org on every request.

---

## Agent rows (seeded)

### `room-host`

| Field | Value |
|-------|-------|
| `agent_type` | `conversational` |
| `model` | `claude-opus-4-6` |
| `temperature` | `0.6` |
| `max_tokens` | `1500` |
| `stream_enabled` | `true` |
| `corpus_binding_id` | _null today_ |
| `prompt_pack_id` | _null today_ |

### `room-diagnostician`

| Field | Value |
|-------|-------|
| `agent_type` | `synthesis` |
| `model` | `claude-opus-4-6` |
| `temperature` | `0.4` |
| `max_tokens` | `2000` |
| `stream_enabled` | `true` |
| `corpus_binding_id` | _null today_ |
| `prompt_pack_id` | _null today_ |

Models must exist in `movemental-ai-agents/src/lib/ai/model-registry.ts`. Adding a new model requires registering the adapter **before** changing the seed.

---

## Environment variables

### `movemental-ai` (room UI + proxy)

| Variable | Purpose |
|----------|---------|
| `AI_AGENTS_BASE_URL` | Engine origin (e.g. `http://localhost:3001`) |
| `AI_AGENTS_SERVICE_SECRET` | Bearer for service-to-service calls |
| `AI_AGENTS_TENANT_ORG_ID` | Org whose `agents` rows to use |

### `movemental-ai-agents` (engine)

| Variable | Purpose |
|----------|---------|
| `ANTHROPIC_API_KEY` | Claude models (host + diagnostician) |
| `OPENAI_API_KEY` | Required for `file_search` tool |
| `OPENAI_VECTOR_STORE_ID` | Fallback vector store if no `corpus_bindings` row |
| `DATABASE_URL` | Postgres (shared Movemental Supabase) |
| `TENANT_ORG_ID` | Default org for seeds and dev |

---

## Seed commands

```bash
# Agent definitions (prompts, tools, assignments, handoff)
cd movemental-ai-agents
TENANT_ORG_ID=6bc0fcf7-2e55-4914-b88d-c6eb49eb0d71 pnpm seed:agent-room

# Optional: corpus_bindings row (OpenAI vector store pointer)
OPENAI_VECTOR_STORE_ID=vs_xxxxxxxx pnpm seed:modular-runtime
# or dedicated: pnpm seed:corpus-binding
```

Idempotent upsert — safe to re-run after every prompt edit.

---

## Studio UI

Staff can assign `corpus_binding_id` and `prompt_pack_id` per agent at **`/agent-runtime`** (`movemental-ai`). Retrieval still executes on the provider API (OpenAI), not in Postgres.

---

## Adding a model (checklist)

1. Add adapter in `movemental-ai-agents/src/lib/ai/adapters/` if needed
2. Register id in `model-registry.ts` and `KNOWN_MODEL_IDS`
3. Update `AGENT_SEEDS` in `seed-agent-room.ts`
4. Re-run `pnpm seed:agent-room`
5. Verify trace in `agent_traces` / PostHog if enabled
