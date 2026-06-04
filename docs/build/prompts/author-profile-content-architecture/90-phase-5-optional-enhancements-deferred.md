# AP-90 — Phase 5: Optional enhancements (deferred)

**Prompt ID:** AP-90  
**Status:** **Deferred** — do not execute until operator promotes from backlog  
**Requires:** [AP-03](./03-phase-2-nav-simplification.md), [AP-04](./04-phase-3-onboarding-alignment.md)  
**Last updated:** 2026-06-03

---

## 1. Role and stance

This prompt captures **Phase 5 optional work** from the architecture proposal. Each item is a **separate mini-project** — do not batch without operator approval.

Only start when [`master_runner.md`](./master_runner.md) AP-00 through AP-05 are **Done** or explicitly waived.

---

## 2. Backlog items

### AP-90a — Studio catalog promotion bridge

**Goal:** Link research bibliography rows to published product entities.

| Layer | Work |
| --- | --- |
| L2b | Ensure `CorpusMediaItem.externalId` populated on promote |
| L3 | `promote-corpus-item.service.ts` — create/link `books` / `content_items` row |
| L6 | “In Studio” badge on `/profile` bibliography table |

**Do not** merge product CMS into `movement_leader_corpus_data`.

---

### AP-90b — Rename `network.dossier` → `dossier_sections`

**Goal:** Clarity without behavior change.

| Layer | Work |
| --- | --- |
| L1 | Optional column `dossier_sections jsonb` + backfill migration |
| L2b | `corpus-schema.ts` read both keys during transition |
| L3 | ETL writes new column; mappers prefer `dossier_sections` |

Requires coordinated migration in visual-editor + Supabase MCP verification.

---

### AP-90c — Inline section editing (admin pencil)

**Goal:** Ops edit leader-safe markdown in `/profile?org=` preview.

| Layer | Work |
| --- | --- |
| L4 | `PATCH /api/custom/dossier/sections/[slug]` — staff-only |
| L5 | `useDossierSectionMutation` — TanStack Query |
| L6 | Pencil UI per section; saves to corpus row or review workflow |

Spec reference: `admin-onboarding-content-inline-edit-prompt.md`.

---

### AP-90d — `at_glance` overrides + biography timeline convention

**Goal:** At a Glance completeness without duplicating full sections.

| Layer | Work |
| --- | --- |
| L3 | ETL: parse biography `## YYYY` headings → timeline stages |
| L2b | `at_glance` overrides schema tightened |
| L6 | `buildHomeData()` prefers overrides when present |

Document heading convention in movemental-ai research README.

---

## 3. Definition of Done (when promoted)

Each sub-item (90a–90d) gets its own PR and child §10 when pulled from backlog. This file’s DoD is N/A until promotion.

---

## 4. Promotion checklist

Operator moves AP-90a (or b/c/d) to active when:

- [ ] Roy + cohort dossiers wired (AP-01, AP-02).
- [ ] Nav simplification shipped or waived (AP-03).
- [ ] Review item parity verified (AP-04).
- [ ] Substrate prose patched or waived (AP-05).

Update `master_runner.md` — split AP-90 row into sub-rows or link new prompt file.

---

## 5. Attempt log (append-only)

| Date | Agent | Sub-item | Outcome |
| --- | --- | --- | --- |
| 2026-06-03 | build-prompt | — | Created deferred backlog |
