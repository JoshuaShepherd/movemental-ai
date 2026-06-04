# AP-06 — Research directory normalization

**Prompt ID:** AP-06  
**Target agent:** Cursor / Claude Code  
**Primary repos:** `movemental-ai` + `movemental-visual-editor-main`  
**Requires:** AP-00 → AP-05 complete  
**Plan SSOT:** [`../movement-leader-research-directory-normalization-plan.md`](../movement-leader-research-directory-normalization-plan.md)  
**Last updated:** 2026-06-04

---

## 1. Role and stance

Normalize all **15 tenant** research folders (`jamie-roach` excluded) to the Alan Hirsch master tree: canonical sidebar paths, `_staff/` / `_misc/` quarantine, empty stubs where research is absent, ETL/wire for merged vs substrate cohorts.

---

## 2. Goal

| Outcome | Target |
| --- | --- |
| Canonical paths | 22 paths + `reflected-understanding/<slug>.md` per tenant slug |
| Sidebar manifest | `README.md` per slug with populated \| empty status |
| Staff quarantine | gap-analysis, movemental-fit, legacy `{SLUG}_*` → `_staff/` |
| Merged cohort | `research:etl` → `publish` → `verify` green |
| Substrate cohort | **No** full ETL; `wire-dossier` only; frameworks exported to disk |

---

## 3. Tooling (movemental-ai)

| Script | Purpose |
| --- | --- |
| `pnpm research:tree-normalize` | Migrate legacy → canonical; create stubs; move `_staff`/`_misc` |
| `pnpm research:tree-check` | Assert all canonical paths exist |
| `pnpm research:export-frameworks` | Substrate `frameworks[]` → `content/frameworks.md` |

## 4. Tooling (visual-editor)

| Change | File |
| --- | --- |
| `profile/calling-profile.md` preferred path | `corpus-etl.ts` |
| Skip `_staff/**`, `_misc/**` in walks | `paths.ts`, `corpus-etl.ts` |

---

## 5. Definition of Done

- [x] All 15 tenant slugs pass `pnpm research:tree-check`
- [x] Alan Hirsch master: calling-profile, content-audit, frameworks on disk; staff/misc moved
- [x] Substrate wire-dossier re-run (9 keys where files populated)
- [x] Merged cohort ETL/publish/verify (10 slugs)
- [x] Rowland Smith summary scrubbed leader-safe; RU stub created
- [x] `manifest.json` regenerated
- [x] AP-06 registered in master runner; `research:tree-check` in validate gate

---

## 6. Attempt log

| Date | Agent | Summary |
| --- | --- | --- |
| 2026-06-04 | Cursor | Full normalization: normalize script × 15 slugs, export frameworks, ETL merged cohort, wire substrate dossier, manifest regen |
