# 05 — Organization detail & lifecycle actions

**Priority:** 5 (deep tenant ops — where operators spend most time after directory)  
**Prompt ID:** ranked-05-organization-detail-lifecycle-actions  
**Primary repo:** `movemental-visual-editor-main`  
**Depends on:** [02](./02-organizations-tenant-directory.md)  
**Supabase project:** `movemental` — `vhaiiiykcukrlyvwlgip`  
**Last updated:** 2026-06-18

---

## The prompt

> Build **`/admin/organizations/[orgId]`** — the operator command center for one tenant: metadata, memberships, lifecycle actions (start account, reissue magic link, promote stage, set entitlements), and deep links to onboarding, profile editor, and enrollments.
>
> ### 0. Read first
>
> 1. Sibling: `src/app/(dashboard)/admin/organizations/[orgId]/AdminOrgDetailClient.tsx`
> 2. Sibling: `docs/build/prompts/admin-platform-operations-center-prompt.md` §1.3 “Start leader account”
> 3. Sibling: `.claude/skills/movemental-tenant-provision/SKILL.md`
> 4. Sibling: `src/hooks/admin/use-admin-roster-lifecycle.ts` — magic link, start account
>
> ### 1. Product model
>
> **One page, tabbed sections:**
>
> | Tab | Content |
> | --- | --- |
> | Overview | Org metadata, stage, cohort, settings JSON viewer (read-only v1), entitlements |
> | Members | `organization_memberships` table + link to user admin |
> | Onboarding | Embedded checklist summary + link to `/admin/onboarding` filtered |
> | Actions | Lifecycle buttons (see below) |
> | Profile | Movement leaders only — embed prompt 11 preview stub |
>
> **Lifecycle actions** (capability-gated, idempotent):
>
> | Action | Service | Notes |
> | --- | --- | --- |
> | Start leader account | `startLeaderAccount` / tenant-provision skill | Creates auth + org + membership if missing |
> | Reissue magic link | `POST /api/admin/roster/[slug]/reissue-magic-link` | Staff-only URL in response |
> | Switch active tenant | `POST /api/admin/active-organization` | Sets cookie for impersonation-style editing |
> | Promote `current_stage` | PATCH org — **confirm modal** | safety → sandbox → skills → solutions |
> | Set workspace courses | PATCH `organizations.settings.workspaceCourses` | `{ safety: true, … }` |
>
> ### 2. Live database truth (Supabase MCP)
>
> ```sql
> select id, slug, name, current_stage, settings, account_owner_id
> from organizations
> where slug = 'alan-hirsch';
>
> select om.user_id, om.role, om.status, up.email
> from organization_memberships om
> join user_profiles up on up.id = om.user_id
> where om.organization_id = (select id from organizations where slug = 'alan-hirsch' limit 1);
> ```
>
> ### 3. API routes
>
> | Method | Route | Purpose |
> | --- | --- | --- |
> | GET | `/api/admin/organizations/[orgId]` | Full detail DTO |
> | PATCH | `/api/admin/organizations/[orgId]` | Metadata, stage, settings (Zod validated) |
> | POST | `/api/admin/organizations/[orgId]/start-account` | Ordered provisioning checklist |
> | POST | `/api/admin/organizations/[orgId]/reissue-magic-link` | Auth invite |
>
> Extend existing sibling routes where present — do not duplicate.
>
> ### 4. UI requirements
>
> - Breadcrumb: Organizations → {name}
> - Header: org name, slug, lane badge, lifecycle pill
> - Action bar: Switch tenant | Open customer dashboard (new tab with org context) | Start account
> - Danger zone: stage promotion, deactivate org (defer deactivate if no column)
> - Copy-to-clipboard for magic link (never log full link server-side in production logs)
> - Loading / error boundaries per tab
>
> ### 5. Guardrails
>
> - Every write returns `Result<T>` with auditable payload
> - **Approve ≠ provision** — “Start account” must be explicit even after application approval
> - Implementation orgs hide Profile tab and leader-specific actions
>
> ### 6. Sign-off checklist
>
> - [ ] Open Alan Hirsch org — correct owner, stage `safety`, memberships listed
> - [ ] Start account idempotent on already-provisioned org (reports skipped steps)
> - [ ] Magic link reissue works for test user
> - [ ] workspaceCourses patch reflects in customer `/dashboard/safety` gate
> - [ ] `pnpm validate:all` green
