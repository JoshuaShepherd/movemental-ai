# 07 — Movement leader applications review

**Priority:** 7 (pipeline tool — 0 rows today but required for growth)  
**Prompt ID:** ranked-07-movement-leader-applications-review  
**Primary repo:** `movemental-visual-editor-main`  
**Depends on:** [01](./01-admin-shell-rbac-and-navigation.md), [05](./05-organization-detail-lifecycle-actions.md)  
**Supabase project:** `movemental` — `vhaiiiykcukrlyvwlgip`  
**Last updated:** 2026-06-18

---

## The prompt

> Ship **`/admin/movement-leader-applications`** — staff review queue for inbound movement leader applicants: list, detail, assign reviewer, approve/decline/hold, and on approve trigger leader row + magic link + deep link to org provisioning (prompt 05).
>
> ### 0. Read first
>
> 1. Sibling: `src/app/(dashboard)/admin/movement-leader-applications/`
> 2. Sibling: `docs/build/prompts/admin-yes-to-onboarding-flow.md`
> 3. Sibling: `src/app/api/admin/movement-leader-applications/**`
> 4. Table: `movement_leader_applications` in Drizzle schema (both repos)
>
> ### 1. Product model
>
> ```text
> Public apply → movement_leader_applications
>   → staff review → approve → movement_leaders row + email
>   → "Start account" on org detail (prompt 05) → full tenant
> ```
>
> **Approve is one-shot** — duplicate approve returns `ALREADY_APPROVED`; use magic link reissue for retries.
>
> ### 2. Live database truth (Supabase MCP)
>
> ```sql
> select enumlabel from pg_enum
> join pg_type on pg_enum.enumtypid = pg_type.oid
> where pg_type.typname = 'movement_leader_application_status';
>
> select status, count(*) from movement_leader_applications group by status;
> -- empty table 2026-06-18 — build against schema + sibling fixtures
> ```
>
> ### 3. UI — list page
>
> - Filters: status, assigned reviewer, date range
> - Columns: applicant name, email, status, submitted, reviewer, slug proposal
> - Row → `/admin/movement-leader-applications/[id]`
>
> ### 4. UI — detail page
>
> - Application payload (structured + raw JSON fallback)
> - Research links if `research_slug` present
> - Staff notes (reuse onboarding notes pattern or application-specific table)
> - Actions: Assign to me | Mark under review | On hold | Decline (reason) | **Approve & create leader**
> - Post-approve: show magic link copy panel + links to roster org detail / start account
>
> ### 5. API (port from sibling)
>
> - `GET /api/admin/movement-leader-applications`
> - `GET /api/admin/movement-leader-applications/[id]`
> - `POST /api/admin/movement-leader-applications/[id]/approve-and-start`
> - `GET /api/admin/movement-leader-applications/staff-reviewers`
> - Decline / hold endpoints per sibling
>
> Capability: `ops.applications.review`
>
> ### 6. Guardrails
>
> - Decline requires reason stored on row
> - Approve does **not** silently skip org creation — surface “Start account” CTA if org missing
> - RLS: staff-only reads on applications
>
> ### 7. Sign-off checklist
>
> - [ ] List renders empty state gracefully
> - [ ] Seed one test application in dev → full review flow works
> - [ ] Approve creates `movement_leaders` row verifiable in MCP
> - [ ] Magic link surfaced staff-only
> - [ ] E2E approve flow (dev seed)
