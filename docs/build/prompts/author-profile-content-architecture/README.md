# Author Profile content architecture — prompt series

**Canonical location:** `movemental-ai/docs/build/prompts/author-profile-content-architecture/`  
**Strategy doc:** [`../../notes/author-profile-content-architecture-proposal.md`](../../notes/author-profile-content-architecture-proposal.md)  
**DB → frontend status (agent handoff):** [`../../notes/author-profile-database-to-frontend-status.md`](../../notes/author-profile-database-to-frontend-status.md)  
**Supabase table map (companion):** `movemental-visual-editor-main/docs/build/notes/movemental-research-content-supabase-tables.md`

---

## What this pack is

A **sequenced agent prompt program** to implement the Author Profile / dossier content architecture: normalize on-disk research, wire ETL → Supabase → `/profile`, simplify navigation, and align onboarding review with the corpus SSOT.

**Execute in order.** Start with [`master_runner.md`](./master_runner.md).

---

## Prompt index

| Order | ID | Prompt | Primary repo(s) | Blocks |
| ---: | --- | --- | --- | --- |
| 0 | AP-00 | [00-preflight-audit-and-baseline.md](./00-preflight-audit-and-baseline.md) | both + Supabase MCP | — |
| 1 | AP-01 | [01-phase-0-roy-moran-complete-dossier.md](./01-phase-0-roy-moran-complete-dossier.md) | movemental-ai + visual-editor | AP-00 |
| 2 | AP-02 | [02-phase-1-wire-dossier-extras-cohort.md](./02-phase-1-wire-dossier-extras-cohort.md) | movemental-ai + visual-editor | AP-01 |
| 3 | AP-03 | [03-phase-2-nav-simplification.md](./03-phase-2-nav-simplification.md) | visual-editor | AP-02 (recommended) |
| 4 | AP-04 | [04-phase-3-onboarding-alignment.md](./04-phase-3-onboarding-alignment.md) | visual-editor | AP-01 |
| 5 | AP-05 | [05-phase-4-substrate-leader-prose.md](./05-phase-4-substrate-leader-prose.md) | visual-editor + Supabase MCP | AP-00 |
| — | AP-90 | [90-phase-5-optional-enhancements-deferred.md](./90-phase-5-optional-enhancements-deferred.md) | both | AP-03, AP-04 |

---

## Repos

| Repo | Path (typical) | Role |
| --- | --- | --- |
| **movemental-ai** | This repo | Research SSOT on disk; strategy docs |
| **movemental-visual-editor-main** | Sibling checkout | Dashboard, ETL, `/profile` UI, `corpus-schema.ts` |

**Supabase project:** `movemental` · ref **`vhaiiiykcukrlyvwlgip`**

**Package manager:** `pnpm` only.

---

## Author Profile type-safety chain (escape hatch)

The dossier is **not** generic simplified CRUD. Types flow:

```text
Layer 1   movement_leader_corpus_data (+ movement_leaders)  → schema.ts
Layer 2b  corpus-schema.ts (MovementLeaderCorpus)           → hand-written SSOT
Layer 3   src/lib/services/movement-leader-research/*         → ETL, dossier-read
Layer 6   src/lib/author-dossier/* + corpus-content.ts        → view mappers (no DB I/O)
```

Do **not** wire `/profile` through generated `useMovementLeaderCorpusData*` hooks as the primary read path.

---

## Skills (read when relevant)

| Skill | When |
| --- | --- |
| `movemental-leader-corpus-upload` | Any ETL / publish / substrate rule |
| `movemental-tenant-provision` | Net-new leader missing `movement_leaders` row |
| Supabase MCP | Before/after DB changes; leader-safe audit queries |

---

## Related prompts (visual-editor)

| Document | Relationship |
| --- | --- |
| `movement-leader-corpus-and-welcome-letter-completion-prompt.md` | Prior cohort pipeline (overlaps Phase 0–1) |
| `author-profile-dossier-shell-prompt.md` | Shell already shipped; this pack fills content |
| `author-profile-at-a-glance-complete-build-prompt.md` | At a Glance widgets; Phase 2 may extend |
