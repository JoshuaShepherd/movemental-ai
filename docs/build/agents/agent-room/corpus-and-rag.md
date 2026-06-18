# Agent Room — corpus and RAG (`file_search`)

## Short answer: yes, build it in OpenAI

In this stack, **`file_search` is an OpenAI vector store feature**, not a Claude native capability. The room can keep **Claude for chat** while **OpenAI indexes and searches** your documents.

```
Visitor message
    → movemental-ai /agent (UI)
    → movemental-ai-agents /api/agents/stream
    → Claude (room-host) decides to call file_search
    → OpenAI Responses API searches vector store vs_…
    → Results returned to Claude as tool output
    → Claude continues turn (voice + optional render tool)
```

You do **not** need to switch the chat model to GPT to use RAG.

---

## What exists today

| Layer | State |
|-------|-------|
| `file_search` tool implementation | ✅ `movemental-ai-agents/src/lib/tools/file-search.tool.ts` |
| `corpus_bindings` table | ✅ Schema + CRUD + `/agent-runtime` UI |
| Room host assignment | ✅ Gated on `OPENAI_VECTOR_STORE_ID` at seed (`seed-agent-room.ts`) |
| Room host `corpus_binding_id` | Optional — env fallback via `OPENAI_VECTOR_STORE_ID` |
| Movemental public corpus pack | ✅ `files/public/*.md` + PDFs — see manifest |
| Corpus sync script | ✅ `pnpm agent-room:corpus:sync` in `movemental-ai` |

---

## Enablement checklist

### 1. Create OpenAI vector store and upload files

In [OpenAI Platform](https://platform.openai.com/) (or API):

1. Create a **Vector Store** → note id `vs_…`
2. Upload files (PDF, MD, etc.) — field guides, pricing canon, path docs, FAQ
3. Wait for indexing to complete

**Canonical corpus pack:** [`files/`](./files/) — manifest, index, and upload script.

Public scope (resolved 2026-06-10):

| Document | Path |
|----------|------|
| KB Phase 1 — operating rules, Path, pricing, sources | `files/public/movemental-kb-phase-1.md` |
| KB Phase 2 — identity, origin, thesis | `files/public/movemental-kb-phase-2.md` |
| KB Phase 3 — Scenii, proof, honest status | `files/public/movemental-kb-phase-3.md` |
| KB Phase 4 — AI reality, Movemental AI use, product surface | `files/public/movemental-kb-phase-4.md` |
| The Talk — 15-minute narrative | `files/public/movemental-the-talk.md` |
| Safety Field Guide (Vol 1) | `files/public/pdf/safety-field-guide.pdf` |
| Sandbox Field Guide (Vol 2) | `files/public/pdf/sandbox-field-guide.pdf` |
| Evergreen Engine (Edition One) | `files/public/pdf/evergreen-engine.pdf` |

**8 documents total.** Field Guide PDFs are **canonical** for Safety/Sandbox methodology detail (override KB summaries).

**Exclude from vector store:** `files/internal/` (operator onboarding), files at `files/` root (use `public/` only), seeds, secrets, unreleased product. Phase 5 backlog: playbooks, FAQ verbatim, Training/Technology guides.

Sync:

```bash
pnpm agent-room:corpus:sync -- --dry-run
OPENAI_VECTOR_STORE_ID=vs_xxx pnpm agent-room:corpus:sync
```

See [`files/README.md`](./files/README.md) and [`files/MANIFEST.json`](./files/MANIFEST.json).

Alan tenant pattern: `pnpm seed:corpus-binding` with `OPENAI_VECTOR_STORE_ID`.

### 2. Register binding in Postgres

```sql
-- Or use pnpm seed:modular-runtime / /agent-runtime UI
INSERT INTO corpus_bindings (
  organization_id, slug, provider, provider_resource_id, filter_defaults, metadata, status
) VALUES (
  '6bc0fcf7-2e55-4914-b88d-c6eb49eb0d71',
  'movemental-room-canon',
  'openai_vector_store',
  'vs_YOUR_STORE_ID',
  '{"max_num_results": 6}',
  '{"purpose": "agent-room-public-canonical-docs"}',
  'active'
);
```

Provider enum (validated): `openai_vector_store` | `openai_file_search` | `supabase_pgvector` | `gemini_file` | `vertex_rag`

Only **`openai_vector_store`** / **`file_search`** path is implemented for the room today.

### 3. Link agent + assign tool

```sql
UPDATE agents
SET corpus_binding_id = '<binding-uuid>'
WHERE slug = 'room-host'
  AND organization_id = '6bc0fcf7-2e55-4914-b88d-c6eb49eb0d71';
```

In seed (preferred for reproducibility):

```typescript
// seed-agent-room.ts — add to ASSIGNMENTS:
{ agentSlug: "room-host", toolName: "file_search", order: 11 },
```

### 4. Prompt policy (host)

Seeded in `movemental-ai-agents/scripts/seed-data/prompts/room-host.md` (re-seed with `pnpm seed:agent-room`):

- Call `file_search` when the visitor asks for detail **not** in §5 Knowledge Canon
- Prefer canon for pricing/path/founders; use retrieval for long-form product docs
- Cite internal doc titles when grounded; never invent statistics
- Off-corpus → honest uncertainty + `offer_human_handoff`
- In **Discuss** phase, search before authoring when unsure
- Never cite retrieval results that contradict canon — canon wins

### 5. Re-seed and verify

```bash
pnpm seed:agent-room   # if tool assignment added to seed
# Smoke test: ask something only in uploaded docs
```

Trace fields: `agent_traces.corpus_binding_id` should populate when binding linked.

---

## Alternative: `search_corpus` (Postgres pgvector)

| | `file_search` | `search_corpus` |
|---|---------------|------------------|
| Index | OpenAI vector store | Supabase chunks (`search_corpus_semantic`) |
| Best for | Published docs, PDFs, markdown exports | Tenant book/article chunks already in DB |
| Room today | Planned | Not assigned |

Use **`search_corpus`** when content already lives in Movemental Postgres (Alan books, articles). Public marketing room likely starts with **`file_search`** over a small curated doc set.

---

## Environment

| Variable | Required for RAG |
|----------|------------------|
| `OPENAI_API_KEY` | Yes |
| `OPENAI_VECTOR_STORE_ID` | Fallback if no DB binding |
| `ANTHROPIC_API_KEY` | Yes (chat) — independent of RAG |

---

## Cost and latency notes

- Each `file_search` call hits OpenAI Responses API (`gpt-4o-mini` in current implementation)
- Opus host + `file_search` adds latency on search turns (~1–3s for retrieval)
- Consider restricting search to Discuss phase or explicit "tell me more" intents

---

## Sync with docs pack

When you change corpus scope or search policy, update:

1. This file (scope list)
2. [`construction-decisions.md`](./construction-decisions.md) open decisions table
3. [`prompts/room-host.md`](./prompts/room-host.md) retrieval section
