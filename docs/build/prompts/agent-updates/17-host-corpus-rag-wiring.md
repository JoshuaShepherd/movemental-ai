# AU-17 — Host corpus RAG wiring

**Prompt ID:** au-17-host-rag  
**Target agent:** Cursor / Claude Code  
**Primary repo:** `movemental-ai-agents`  
**Last updated:** 2026-06-18  
**Source:** [agent-platform-complete-reference.md](../../notes/agent-platform-complete-reference.md) §9.2 · [corpus-and-rag.md](../agents/agent-room/corpus-and-rag.md) if present

Paste the block below into a fresh agent turn.

---

## Problem statement

`room-host` supports optional `file_search` when `OPENAI_VECTOR_STORE_ID` is set. Without it, the host is **canon-only** — insufficient for institution-specific depth. Wire and document RAG for staging/production.

---

## The prompt

> You are wiring **corpus RAG (`file_search`)** for the agent-room host in `movemental-ai-agents` and documenting the operator setup in movemental-ai.
>
> ### 0. Orient first
>
> - `movemental-ai-agents` — grep `file_search`, `OPENAI_VECTOR_STORE_ID`, `vector`
> - `docs/build/agents/agent-room/corpus-and-rag.md`
> - Seed: `room-host.md` — when to search vs render
> - KB files: `docs/build/agents/agent-room/files/public/movemental-kb-*.md`
>
> ### 1. Verify tool registration
>
> - `file_search` assigned to `room-host` slug
> - Gated: no vector store id → tool not offered (no runtime throw)
> - Progress chunk: "searching the archive" already handled client-side?
>
> ### 2. Corpus sync checklist
>
> Document steps to refresh vector store:
> 1. Which files are indexed (KB phases, research archive)
> 2. CLI or script to upload (existing script in agents repo?)
> 3. Env vars: `OPENAI_VECTOR_STORE_ID`, `OPENAI_API_KEY`
>
> If no sync script exists, add minimal `scripts/sync-room-corpus.ts` that uploads `docs/build/agents/agent-room/files/public/*.md` — or document manual OpenAI dashboard steps.
>
> ### 3. Prompt policy
>
> Update `room-host.md`:
> - Search before answering org-specific factual questions
> - Still use render tools for product UI (path, pricing, beat)
> - Cite internal doc titles in prose when grounded; never invent statistics
> - Off-corpus → honest uncertainty + `offer_human_handoff`
>
> Run `pnpm seed:agent-room` after prompt edit.
>
> ### 4. Integration test
>
> - Mock or live test: host turn with question answered from KB (grep unique phrase from kb file)
> - Without env: host still responds canon-only, no crash
>
> ### 5. movemental-ai docs
>
> Add operator section to [agent-platform-complete-reference.md](../../notes/agent-platform-complete-reference.md) §15.2 — RAG setup steps.

---

## Definition of done

- [ ] `file_search` gated on env; registered for host
- [ ] Corpus sync documented or scripted
- [ ] Host prompt search policy seeded
- [ ] Test proves search path OR documents manual verification steps
- [ ] No client-side API keys

## Verification commands

```bash
# movemental-ai-agents
pnpm test:room-host
pnpm typecheck
```

## Do not

- Expose vector store id client-side
- Let host invent citations not in retrieval results
- Index PII or internal-only docs without review
