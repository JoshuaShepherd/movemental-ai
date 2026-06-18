# 02 — Organizations tenant directory

**Priority:** 2 (SSOT hub — all ops flows deep-link from here)  
**Prompt ID:** ranked-02-organizations-tenant-directory  
**Primary repo:** `movemental-visual-editor-main`  
**Depends on:** [01-admin-shell-rbac-and-navigation.md](./01-admin-shell-rbac-and-navigation.md)  
**Supabase project:** `movemental` — `vhaiiiykcukrlyvwlgip`  
**Last updated:** 2026-06-18

---

## The prompt

> Build the **Organizations** admin directory — the single place operators find every tenant. This **supersedes** standalone `/admin/roster`, `/admin/authors`, and `/admin/tenants` lists (redirect old routes here with query params).
>
> ### 0. Read first
>
> 1. Sibling: `src/app/(dashboard)/admin/organizations/AdminOrganizationsClient.tsx` (partial — extend, don't rewrite blindly)
> 2. Sibling: `src/lib/services/admin-organizations.service.ts`
> 3. Sibling: `docs/build/prompts/admin-unified-tenant-account-ops-prompt.md`
> 4. Sibling: `src/lib/dashboard/dashboard-persona.ts` — `movement_leader` vs `implementation_org`
>
> ### 1. Product model
>
> ```text
> Organizations (THE directory)
>   ├─ movement_leader tenants (39 orgs) — slug aligns with movement_leaders.slug
>   └─ implementation_org tenants (2 orgs) — organization_type = organization
> ```
>
> **Tabs:** All | Movement leaders | Implementation orgs  
> **Columns:** Name, slug, lane badge, lifecycle stage, owner, onboarding %, current_stage (safety/sandbox/…), cohort, last activity, actions  
> **Search:** name, slug, owner email, owner display name  
> **Row click:** `/admin/organizations/[orgId]` (prompt 05)
>
> ### 2. Live database truth (Supabase MCP)
>
> ```sql
> select organization_type, count(*) from organizations group by organization_type;
> -- individual: 39, organization: 2 (2026-06-18)
>
> select o.slug, o.name, o.current_stage, o.onboarding_completed_at,
>        up.email as owner_email
> from organizations o
> left join user_profiles up on up.id = o.account_owner_id
> order by o.name
> limit 10;
> ```
>
> ### 3. Data layer (six-layer chain)
>
> | Layer | Location |
> | --- | --- |
> | 1 | `organizations`, `organization_memberships`, `movement_leaders`, `onboarding_tasks` — already in Drizzle |
> | 2 | Zod via `pnpm generate:schemas` after any schema touch |
> | 3 | **Domain:** extend `admin-organizations.service.ts` — `listOrganizationsForAdmin()`, derive lifecycle + completeness % |
> | 4 | `GET /api/admin/organizations`, `GET /api/admin/organizations/[orgId]` |
> | 5 | `useAdminOrganizations`, `useAdminOrganizationDetail` hooks |
> | 6 | `AdminOrganizationsClient` + server page |
>
> **Lifecycle derivation** (no new column required for v1):
>
> | Stage | Signals |
> | --- | --- |
> | `not_started` | No onboarding tasks / no owner |
> | `onboarding` | `onboarding_completed_at` null, tasks exist |
> | `active` | `onboarding_completed_at` set |
> | `paused` / `alumni` | future: `organizations.settings.lifecycleStatus` |
>
> ### 4. UI requirements (state-of-the-art)
>
> - Data table with sticky header, column sort, empty states
> - Lane badges (movement leader vs implementation org) — distinct color tokens
> - Completeness bar from onboarding task rollup (reuse onboarding service patterns from `movemental-ai` `listDashboardAdminOnboardingOrgs`)
> - **Switch tenant** action (capability `ops.tenants.switch`) — sets active org cookie via `POST /api/admin/active-organization` (exists in sibling)
> - Bulk export CSV (optional v1.1 — defer if tight)
> - `noindex` metadata
>
> ### 5. Redirects (consolidation)
>
> | Legacy route | Target |
> | --- | --- |
> | `/admin/roster` | `/admin/organizations?kind=movement_leader` |
> | `/admin/authors` | `/admin/organizations?kind=movement_leader` |
> | `/admin/tenants` | `/admin/organizations` |
>
> ### 6. Guardrails
>
> - **One SSOT list** — do not add a fourth parallel roster page
> - Queries must not leak cross-tenant PII in list responses (owner email is OK for staff)
> - `Result<T>` in services; paginate if >100 rows (41 orgs today — full load OK)
>
> ### 7. Sign-off checklist
>
> - [ ] 41 orgs visible with correct lane badges
> - [ ] Search + tab filters work
> - [ ] Legacy routes redirect
> - [ ] Switch tenant updates cookie and header context
> - [ ] `pnpm validate:all` green
> - [ ] Playwright: open org list as Josh, verify row count ≥ 41
