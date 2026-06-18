# 12 — Assessments & diagnostics admin

**Priority:** 12 (review AI Reality + integrity instruments — support + coaching)  
**Prompt ID:** ranked-12-assessments-and-diagnostics-admin  
**Primary repo:** `movemental-visual-editor-main`  
**Depends on:** [02](./02-organizations-tenant-directory.md)  
**Supabase project:** `movemental` — `vhaiiiykcukrlyvwlgip`  
**Last updated:** 2026-06-18

---

## The prompt

> Build **`/admin/assessments`** — staff console to browse organization and user assessment results: AI Reality map, SSSS integrity diagnostic, sandbox staff readiness submissions, dual intelligence — with filters, export, and deep links to org detail.
>
> ### 0. Read first
>
> 1. `movemental-ai`: `docs/build/notes/ai-reality-assessment-instruments-inventory.md`
> 2. Schema tables: `ai_reality_results`, `ai_reality_org_results`, `integrity_diagnostic_submissions`, `sandbox_staff_readiness_submissions`, `user_assessments`, `assessment_results`
> 3. `movemental-ai`: `/dashboard/ai-reality` — customer view reference
> 4. Sibling archive reference: `dashboard/admin/assessments/phase-02/` (if present in docs)
>
> ### 1. Product model
>
> | Instrument | Primary table | Admin need |
> | --- | --- | --- |
> | AI Reality (org) | `ai_reality_org_results` | Cohort compare, org drill-down |
> | AI Reality (user) | `ai_reality_results` | Individual submissions |
> | Integrity diagnostic | `integrity_diagnostic_submissions` | Review + follow-up flag |
> | Sandbox readiness | `sandbox_staff_readiness_submissions` | Staff review queue |
> | Generic assessments | `user_assessments` / `assessment_results` | Future unified view |
>
> ### 2. Live database truth (Supabase MCP)
>
> ```sql
> select count(*) from ai_reality_results;
> select count(*) from ai_reality_org_results;
> select count(*) from integrity_diagnostic_submissions;
> select count(*) from sandbox_staff_readiness_submissions;
> ```
>
> ### 3. UI — `/admin/assessments`
>
> - Sub-nav tabs per instrument (or unified table with type column)
> - Filters: org, date range, completion status
> - Row: org name, submitter email, score summary, submitted at
> - Detail drawer: full JSON payload formatted + link to org + optional share token info
> - **No PII export** without capability `ops.audit.read` or founder
>
> ### 4. Data layer
>
> - Domain services under `src/lib/services/admin/assessments/` — never expose raw simplified CRUD
> - Join org name/slug on all list queries
> - Paginate (assessments can grow fast)
>
> ### 5. API routes
>
> - `GET /api/admin/assessments/ai-reality`
> - `GET /api/admin/assessments/integrity-diagnostic`
> - `GET /api/admin/assessments/sandbox-readiness`
> - `GET /api/admin/assessments/[id]` — typed by instrument
>
> Capability: `ops.onboarding.console` (v1) or new `ops.assessments.read`
>
> ### 6. Guardrails
>
> - RLS-aware: staff service role or staff RLS policies — match existing admin patterns
> - Share tokens display masked; full token copy founder-only
> - Do not mutate assessment answers from admin (read-only v1)
>
> ### 7. Sign-off checklist
>
> - [ ] Each instrument tab loads live counts from MCP
> - [ ] Drill-down to org detail works
> - [ ] Customer `/dashboard/ai-reality` data matches admin detail for same org
> - [ ] `pnpm validate:all` green
