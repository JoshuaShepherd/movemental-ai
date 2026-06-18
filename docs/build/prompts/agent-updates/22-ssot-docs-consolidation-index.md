# AU-22 — SSOT docs consolidation index

**Prompt ID:** au-22-ssot-docs-index  
**Target agent:** Cursor / Claude Code  
**Primary repo:** `movemental-ai` (docs only)  
**Last updated:** 2026-06-18  
**Source:** consultation §7 Tier 6 · scattered agent-room notes

Paste the block below into a fresh agent turn.

---

## Problem statement

Agent room knowledge is split across **platform reference**, **chat UI SSOT**, **choreography SSOT**, **dock notes**, **long-form Discuss spec**, and **prompts**. Supersession dates and authority order are unclear — agents and humans edit the wrong file.

---

## The prompt

> You are creating the **agent room documentation index** — one entry point that lists every SSOT, its authority scope, supersession chain, and last verified date. **Docs only — no product code changes** except optional links from README files.
>
> ### 0. Orient first
>
> Inventory all notes matching:
> ```bash
> rg -l 'SSOT|supersedes|Authoritative' docs/build/notes docs/build/prompts docs/design --glob '*.md'
> ```
>
> Key files:
> - [agent-platform-complete-reference.md](../../notes/agent-platform-complete-reference.md)
> - [agent-room-chat-conversation-ui-ssot.md](../../notes/agent-room-chat-conversation-ui-ssot.md)
> - [agent-room-conversation-choreography-model-ssot.md](../../notes/agent-room-conversation-choreography-model-ssot.md)
> - [agent-home-dock-functionality-2026-06-15.md](../../notes/agent-home-dock-functionality-2026-06-15.md)
> - [agent-room-long-form-discussion-ui.md](../../notes/agent-room-long-form-discussion-ui.md)
> - [movemental-ui-ai-design-consultation-2026-06-18.md](../../notes/movemental-ui-ai-design-consultation-2026-06-18.md)
> - [docs/design/INK_BAND_DESIGN_CHAIN.md](../../../design/INK_BAND_DESIGN_CHAIN.md)
> - [docs/build/prompts/agent-updates/](../)
>
> ### 1. Create index file
>
> Path: `docs/build/notes/agent-room-documentation-index.md`
>
> Structure:
> ```markdown
> # Agent room — documentation index
> 
> ## Authority order (when docs conflict)
> 1. Live code + tests
> 2. Choreography SSOT (caption/thread invariants)
> 3. Chat UI SSOT (dock expanded/collapsed)
> 4. Platform complete reference (topology, engine, gaps)
> 5. Historical notes (dated)
> 
> ## SSOT registry
> | Doc | Scope | Status | Supersedes | Last verified |
> 
> ## Prompt registry
> | Prompt | Implements |
> 
> ## Deprecated / historical
> | Doc | Superseded by |
> ```
>
> ### 2. Fix cross-links
>
> In each SSOT header, add:
> ```markdown
> **Index:** [agent-room-documentation-index.md](./agent-room-documentation-index.md)
> ```
>
> Files to patch (headers only): platform reference, chat UI SSOT, choreography SSOT, consultation note.
>
> ### 3. Resolve known conflicts (document, don't rewrite product)
>
> | Topic | Winning SSOT | Notes |
> | --- | --- | --- |
> | Caption vs thread | choreography SSOT | Demoted chat UI §6 partial |
> | Default chip routing | composer-routing.ts + dock note §12 | 2026-06-17 screen-first |
> | Discuss layout | decision doc or long-form §5.1 | Flag if AU-10 open |
>
> ### 4. Link from CLAUDE.md
>
> One line under agent room section pointing to index (if CLAUDE mentions agent docs).
>
> ### 5. No code changes
>
> If you find code/doc drift, list in index **Drift backlog** table — don't fix in this PR unless trivial typo.

---

## Definition of done

- [ ] `agent-room-documentation-index.md` exists with ≥15 registry rows
- [ ] Authority order section explicit
- [ ] SSOT files link back to index
- [ ] Supersession chains for chat UI vs choreography documented
- [ ] No application code changed (except markdown links in CLAUDE/README)

## Verification commands

```bash
# Manual: open index, click links, confirm targets exist
rg 'agent-room-documentation-index' docs/
```

## Do not

- Delete historical notes
- Mark docs Done without reading supersession claims
- Change runtime behavior
