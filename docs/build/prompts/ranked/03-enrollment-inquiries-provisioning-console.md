# 03 — Enrollment & inquiry provisioning console

**Priority:** 3 (7 unprovisioned Safety inquiries — immediate ops pain)  
**Prompt ID:** ranked-03-enrollment-inquiries-provisioning-console  
**Primary repo:** `movemental-visual-editor-main` (UI) + port service from `movemental-ai` (API)  
**Depends on:** [01](./01-admin-shell-rbac-and-navigation.md), [02](./02-organizations-tenant-directory.md)  
**Supabase project:** `movemental` — `vhaiiiykcukrlyvwlgip`  
**Last updated:** 2026-06-18

---

## The prompt

> Ship a staff **Enrollment Inbox** for the Safety Charter funnel: review `organization_inquiries`, provision org + membership + safety artifacts + workspace entitlements, and trigger signup email. Today provisioning is API-only in `movemental-ai` with no dashboard UI.
>
> ### 0. Read first
>
> 1. `movemental-ai`: [wire-safety-dashboard-and-auth.md](../wire-safety-dashboard-and-auth.md) — funnel model
> 2. `movemental-ai`: `src/app/api/admin/safety/provision-enrollment/route.ts`
> 3. `movemental-ai`: `src/lib/services/safety/provision-enrollment.ts`
> 4. `movemental-ai`: [home-to-safety-dashboard-flow-assessment.md](../home-to-safety-dashboard-flow-assessment.md)
>
> ### 1. Product model
>
> ```text
> Agent room /enroll → organization_inquiries (status: new)
>   → [staff] Provision → org + membership + safety_artifacts + workspaceCourses.safety
>   → email with /signup link
>   → customer /dashboard/safety
> ```
>
> | Surface | Who | Data |
> | --- | --- | --- |
> | `/admin/enrollments` | Staff (`ops.onboarding.console` or new `ops.enrollments.provision`) | `organization_inquiries` |
> | Detail drawer | Staff | inquiry + linked org (if provisioned) |
>
> ### 2. Live database truth (Supabase MCP)
>
> ```sql
> select status, count(*) from organization_inquiries group by status;
> -- 7 rows, all status = 'new' (2026-06-18)
>
> select id, contact_email, organization_name, status, created_at
> from organization_inquiries
> order by created_at desc
> limit 10;
> ```
>
> ### 3. Implementation
>
> #### 3.1 Port provisioning service (if missing in dashboard repo)
>
> Copy/adapt `provision-enrollment.ts` into sibling `src/lib/services/safety/` — **same idempotent semantics**, shared DB. Do not fork business logic divergently.
>
> #### 3.2 API routes (dashboard repo)
>
> | Method | Route | Behavior |
> | --- | --- | --- |
> | GET | `/api/admin/enrollments` | List inquiries with filters (status, date) |
> | GET | `/api/admin/enrollments/[id]` | Detail + provision history |
> | POST | `/api/admin/enrollments/[id]/provision` | Wrap `provisionEnrollment(inquiryId)` — staff gate |
> | POST | `/api/admin/enrollments/[id]/dismiss` | Mark rejected/spam (if column exists; else defer) |
>
> Gate: `requireOpsApiSession()` + capability (founder + facilitator).
>
> #### 3.3 UI — `/admin/enrollments`
>
> - Inbox table: org name, contact email, status badge, source, submitted date
> - Row expand or side panel: full inquiry JSON, duplicate detection hints
> - Primary CTA: **Provision workspace** — confirm modal listing what will be created
> - Success state: link to org in `/admin/organizations/[orgId]`, copy signup URL
> - Error handling: surface `Result` error codes (`orphan_inquiry`, `already_provisioned`, etc.)
> - Empty / all-provisioned states
>
> Add nav item under **Operations** in `admin-nav.ts` (after Organizations or Applications).
>
> ### 4. Guardrails
>
> - **Idempotent provision** — safe to retry; show skip vs created in UI toast
> - **Never** auto-provision without staff click
> - **Never** expose provision endpoint without staff gate
> - Audit log entry deferred to prompt 15 — log to console + structured server log for now
>
> ### 5. Sign-off checklist
>
> - [ ] All 7 `new` inquiries visible in inbox
> - [ ] Provision one test inquiry (use staging org email pattern) → org + membership + safety rows in MCP
> - [ ] Provision API matches movemental-ai behavior (parity test or shared test vectors)
> - [ ] Josh can complete flow without SQL
> - [ ] `pnpm validate:all` green in dashboard repo
