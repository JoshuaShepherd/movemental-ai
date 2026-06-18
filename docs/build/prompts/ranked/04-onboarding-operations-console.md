# 04 — Onboarding operations console

**Priority:** 4 (daily unblock tool for 41 orgs — APIs exist, UI needs restoration)  
**Prompt ID:** ranked-04-onboarding-operations-console  
**Primary repo:** `movemental-visual-editor-main` (UI) — APIs in both repos  
**Depends on:** [01](./01-admin-shell-rbac-and-navigation.md), [02](./02-organizations-tenant-directory.md)  
**Supabase project:** `movemental` — `vhaiiiykcukrlyvwlgip`  
**Last updated:** 2026-06-18

---

## The prompt

> Restore and elevate the **Onboarding operations console** at `/admin/onboarding` — staff view of every org's checklist progress, prep unlocks (corpus, themes, affiliates, agent test), staff notes, and complete-on-behalf actions. Port from archived `movemental-ai` UI and sibling visual-editor implementation.
>
> ### 0. Read first
>
> 1. `movemental-ai`: `_archive/pre-marketing-migration-2026-06/app/(dashboard)/admin/onboarding/`
> 2. `movemental-ai`: `src/lib/services/onboarding/onboarding.service.ts` — `listDashboardAdminOnboardingOrgs`, unlock helpers
> 3. `movemental-ai`: `src/app/api/admin/onboarding/*` (list, unlock, notes, complete-on-behalf, `[organizationId]`)
> 4. Sibling: `src/app/(dashboard)/admin/onboarding/admin-onboarding-client.tsx`
>
> ### 1. Product model
>
> | Action | API | Capability |
> | --- | --- | --- |
> | List org rollups | `GET /api/admin/onboarding/list` | `ops.onboarding.console` |
> | Org detail | `GET /api/admin/onboarding/[organizationId]` | same |
> | Unlock prep task | `POST /api/admin/onboarding/unlock` | same |
> | Add staff note | `POST /api/admin/onboarding/notes` | same |
> | Complete task on behalf | `POST /api/admin/onboarding/complete-on-behalf` | same |
>
> **Prep task keys:** `corpus_review`, `affiliates_review`, `themes_review`, `agent_test`
>
> ### 2. Live database truth (Supabase MCP)
>
> ```sql
> select count(*) as orgs, count(*) filter (where onboarding_completed_at is not null) as completed
> from organizations;
> -- 41 orgs, 0 completed (2026-06-18)
>
> select task_key, status, count(*)
> from onboarding_tasks
> group by task_key, status
> order by task_key, status;
> ```
>
> ### 3. UI requirements
>
> #### List page `/admin/onboarding`
>
> - Table columns: Organization (name + slug), Persona badge, Phase label, Last activity, Cohort start, Stuck indicator, Prep unlock buttons
> - Prep unlock: one button per locked prep task → confirm → POST unlock
> - Link org name → `/admin/organizations/[orgId]` (prompt 05)
> - Link slug → `/admin/organizations?kind=…` filtered
> - Filter: stuck only, movement_leader only, implementation_org only
>
> #### Detail (optional v1 — can live on org detail page)
>
> - Full task checklist with statuses
> - Staff notes thread (chronological)
> - Complete-on-behalf with task picker + reason field
>
> ### 4. Data layer
>
> - **Do not regenerate** onboarding domain logic — call existing service functions
> - If dashboard repo lacks routes, **port** route handlers from `movemental-ai` verbatim (adjust imports)
> - Hooks: `useAdminOnboardingList`, `useUnlockPrepTask`, `useStaffOnboardingNotes`
>
> ### 5. Design
>
> - Warm Scholarly Authority table styling (sibling dashboard)
> - Destructive actions (complete-on-behalf) require typed confirm
> - Show `last_edited_by` / timestamps on unlock actions where available
>
> ### 6. Guardrails
>
> - Unlock is **single-org, single-task** — no bulk unlock without explicit product approval
> - **Never** set `onboarding_completed_at` to “fix” stuck leaders unless explicit ops runbook
> - All mutations staff-gated server-side
>
> ### 7. Sign-off checklist
>
> - [ ] 41 orgs listed with accurate phase/stuck signals
> - [ ] Unlock corpus for one org → task status updates in MCP
> - [ ] Notes persist and reload
> - [ ] Archived movemental-ai UX parity or better
> - [ ] E2E: staff unlock flow in Playwright
