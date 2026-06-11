# Agent Room — construction SSOT

**Purpose:** Human-editable documentation for the `/agent` room agents (`room-host`, `room-diagnostician`). Edit these files, then hand the folder back to an agent to apply changes in `movemental-ai-agents` and re-seed.

**Live surface:** `https://movemental.ai/agent` (public, anonymous)  
**Engine repo:** `movemental-ai-agents`  
**UI repo:** `movemental-ai` (proxy + Ink Band client only)

---

## What lives where (sync map)

| Concern | Edit here (docs) | Applied in code | Runtime store |
|--------|-------------------|-----------------|---------------|
| Host system prompt | [`prompts/room-host.md`](./prompts/room-host.md) | `scripts/seed-data/prompts/room-host.md` | `agents.system_prompt` |
| Diagnostician prompt | [`prompts/room-diagnostician.md`](./prompts/room-diagnostician.md) | `scripts/seed-data/prompts/room-diagnostician.md` | `agents.system_prompt` |
| Tool definitions + assignments | [`tools.md`](./tools.md) | `scripts/seed-agent-room.ts` (`TOOL_SEEDS`, `ASSIGNMENTS`) | `agent_tools`, `agent_tool_assignments` |
| Models / temperature / tokens | [`models-and-tenant.md`](./models-and-tenant.md) | `scripts/seed-agent-room.ts` (`AGENT_SEEDS`) | `agents.model`, etc. |
| Handoff host → diagnostician | [`handoffs.md`](./handoffs.md) | `seed-agent-room.ts` + `request_diagnosis` tool | `agent_handoffs` |
| Discuss phase policy | [`runtime/discuss-phase-block.md`](./runtime/discuss-phase-block.md) | `src/lib/ai/runtime/agent-runner.ts` (`DISCUSS_PROMPT_BLOCK`) | Appended at runtime when `phase=discuss` |
| Corpus / RAG | [`corpus-and-rag.md`](./corpus-and-rag.md) + [`files/`](./files/) | `corpus_bindings` + tool assignment + `file-search.tool.ts` | DB + OpenAI vector store |
| Human decisions log | [`construction-decisions.md`](./construction-decisions.md) | — | — |

**Rule:** The running agent reads the **database**, not git. After any prompt/tool/model change, run:

```bash
# In movemental-ai-agents
pnpm seed:agent-room
```

Discuss-phase block changes require an **engine deploy** (code), not only a seed.

---

## Apply workflow (for operators)

1. Edit files in this directory.
2. Copy prompt `.md` files into `movemental-ai-agents/scripts/seed-data/prompts/` (or ask an agent to sync).
3. Update `seed-agent-room.ts` if tools, models, or assignments changed.
4. Run `pnpm seed:agent-room` with `TENANT_ORG_ID` set to the pinned org (see [`models-and-tenant.md`](./models-and-tenant.md)).
5. Restart engine if code changed; smoke-test `/agent`.

---

## Agent pair at a glance

| Slug | Role | Model | Invoked |
|------|------|-------|---------|
| `room-host` | Reality check, screens, conversion, Discuss | `claude-opus-4-6` | Every turn (default) |
| `room-diagnostician` | One-shot read-back after reality check | `claude-opus-4-6` | Handoff only |

Provider for chat: **Anthropic (Claude Opus 4.6)** for both agents via `movemental-ai-agents` model registry.  
Retrieval (`file_search`): **OpenAI vector store** (separate API — see [`corpus-and-rag.md`](./corpus-and-rag.md)).

---

## Index

- [Construction decisions](./construction-decisions.md) — locked product choices and open questions
- [Models and tenant](./models-and-tenant.md) — org id, env vars, seed commands
- [Tools](./tools.md) — full tool catalog, assignments, gesture allow-list
- [Corpus and RAG](./corpus-and-rag.md) — `file_search`, vector store setup, corpus scope
- [Corpus files](./files/README.md) — upload-ready docs, manifest, sync script (`pnpm agent-room:corpus:sync`)
- [Handoffs](./handoffs.md) — host → diagnostician contract
- [Runtime assembly](./runtime/runtime-assembly.md) — context injection, hybrid mode, client POST fields
- [Discuss phase block](./runtime/discuss-phase-block.md) — runtime-appended prompt (Guide → Discuss)

Prompts:

- [room-host.md](./prompts/room-host.md)
- [room-diagnostician.md](./prompts/room-diagnostician.md)
