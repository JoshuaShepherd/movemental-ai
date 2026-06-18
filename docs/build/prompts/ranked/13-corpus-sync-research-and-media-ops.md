# 13 — Corpus sync, research publish & media ops

**Priority:** 13 (prep unlock companion — bridge research → agent corpus)  
**Prompt ID:** ranked-13-corpus-sync-research-and-media-ops  
**Primary repo:** `movemental-visual-editor-main`  
**Depends on:** [04](./04-onboarding-operations-console.md), [11](./11-author-profile-dossier-admin.md)  
**Supabase project:** `movemental` — `vhaiiiykcukrlyvwlgip`  
**Last updated:** 2026-06-18

---

## The prompt

> Ship admin tools for **corpus lifecycle ops**: trigger movement-leader corpus sync, review corpus items, publish research bridge output, and manage onboarding video ordering — the backend companions to onboarding prep unlocks.
>
> ### 0. Read first
>
> 1. Sibling: `POST /api/admin/movement-leader-corpus-sync`
> 2. `movemental-ai`: `src/lib/movement-leader/substrate-corpus-sync.ts`
> 3. Sibling: `/admin/onboarding/videos` + `use-admin-onboarding-videos`
> 4. Sibling: `docs/build/plans/movement-leader-research-database-status.md`
> 5. Tables: `corpus_review_items`, `movement_leader_corpus_data`, `corpus_bindings`
>
> ### 1. Product model
>
> | Surface | Purpose |
> | --- | --- |
> | Org detail → Corpus tab | Status, last sync, trigger sync, review queue |
> | `/admin/onboarding/videos` | CRUD + reorder onboarding video catalog |
> | `/admin/corpus` (optional hub) | Cross-org corpus health dashboard |
>
> ### 2. Live database truth (Supabase MCP)
>
> ```sql
> select status, count(*) from corpus_review_items group by status;
> select count(*) from movement_leader_corpus_data;
> select count(*) from corpus_bindings;
> ```
>
> ### 3. Corpus sync action
>
> - Button on org detail: **Sync corpus from research substrate**
> - Calls existing sync service (idempotent)
> - Progress states: idle → running → success/error with structured log
> - Ties to onboarding prep task `corpus_review` unlock (prompt 04)
>
> ### 4. Onboarding videos admin
>
> Port sibling `/admin/onboarding/videos`:
>
> - List with drag reorder
> - CRUD title, URL, duration, active flag
> - APIs: `/api/admin/onboarding-videos` + `[id]` + `reorder`
>
> ### 5. Research publish (async)
>
> - Surface CLI jobs as admin-triggered background task where safe (`research:bridge`, `research:publish`) — **document** if CLI-only for v1
> - Never block HTTP request on long publish; return job id + poll status
>
> ### 6. Guardrails
>
> - Sync and publish are org-scoped — require `organizationId` on every call
> - Capability: `ops.authors.corpus.publish` for sync; `ops.onboarding.console` for videos
> - Rate-limit sync triggers per org (e.g. 1/min)
>
> ### 7. Sign-off checklist
>
> - [ ] Corpus sync for test slug updates `movement_leader_corpus_data` verifiable in MCP
> - [ ] Onboarding videos reorder persists
> - [ ] Corpus review items visible on org corpus tab
> - [ ] `pnpm validate:all` green
