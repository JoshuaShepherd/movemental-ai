# 08 — Cohorts & wave management

**Priority:** 8 (organize 41 orgs into operator-visible waves)  
**Prompt ID:** ranked-08-cohorts-and-wave-management  
**Primary repo:** `movemental-visual-editor-main`  
**Depends on:** [02](./02-organizations-tenant-directory.md)  
**Supabase project:** `movemental` — `vhaiiiykcukrlyvwlgip`  
**Last updated:** 2026-06-18

---

## The prompt

> Implement **`/admin/cohorts`** and **`/admin/cohorts/[slug]`** — staff management of onboarding waves: list cohorts, assign orgs via `organizations.cohort_id` / `cohort_start_date`, view members, link to org detail.
>
> ### 0. Read first
>
> 1. Sibling: `src/app/(dashboard)/admin/cohorts/`
> 2. Schema: `cohorts`, `organizations.cohort_id`, `organizations.cohort_start_date` in Drizzle
> 3. Sibling: `docs/build/prompts/admin-platform-operations-center-prompt.md` — cohort language
>
> ### 1. Product model
>
> | Route | Purpose |
> | --- | --- |
> | `/admin/cohorts` | All cohorts with member counts, start dates |
> | `/admin/cohorts/[slug]` | Members table, links to org detail |
>
> **Organizations list** (prompt 02) should accept `?cohort=` filter once this ships.
>
> ### 2. Live database truth (Supabase MCP)
>
> ```sql
> select count(*) from cohorts;
> select cohort_id, count(*) from organizations group by cohort_id;
> select cohort_start_date, count(*) from organizations group by cohort_start_date order by 1;
> ```
>
> ### 3. Data layer
>
> | Entity | CRUD |
> | --- | --- |
> | `cohorts` | list, create, update name/slug/dates (if table populated) |
> | `organizations` | PATCH `cohort_id`, `cohort_start_date` from admin UI |
>
> Domain service: `admin-cohorts.service.ts` with `Result<T>`.
>
> ### 4. UI requirements
>
> - Cohort cards or table: name, slug, start date, member count, status
> - Create cohort modal (name, slug, start date)
> - Detail: member orgs with onboarding % + link to `/admin/organizations/[id]`
> - Bulk assign: select orgs from directory → add to cohort (v1.1 OK to defer)
> - Empty state when no cohort rows — offer “Create first cohort”
>
> ### 5. API routes
>
> - `GET/POST /api/admin/cohorts`
> - `GET/PATCH /api/admin/cohorts/[slug]`
> - `POST /api/admin/cohorts/[slug]/members` — assign org IDs
>
> Capability: `ops.roster.read` (read), `ops.roster.write` (mutate)
>
> ### 6. Guardrails
>
> - Assigning cohort does **not** auto-complete onboarding
> - Slug uniqueness enforced at DB + Zod
>
> ### 7. Sign-off checklist
>
> - [ ] Cohort list loads from live data
> - [ ] Assign org to cohort → MCP confirms `cohort_id` / date
> - [ ] Organizations directory filter by cohort works
> - [ ] `pnpm validate:all` green
