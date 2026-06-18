# 01 — Admin shell, RBAC, and navigation

**Priority:** 1 (foundation — block all other admin prompts until signed off)  
**Prompt ID:** ranked-01-admin-shell-rbac-and-navigation  
**Primary repo:** `movemental-visual-editor-main` (`dashboard.movemental.ai`)  
**Supabase project:** `movemental` — `vhaiiiykcukrlyvwlgip`  
**Admin principal:** `josh@movemental.ai` (`staff_role: founder`, `user_profiles.role: admin`)  
**Last updated:** 2026-06-18

---

## The prompt

> You are implementing the **foundational admin shell** for Movemental operations at `dashboard.movemental.ai`. Every subsequent admin surface mounts inside this shell. Do not build feature pages until this prompt is signed off.
>
> ### 0. Read first
>
> 1. Sibling: `movemental-visual-editor-main/src/lib/auth/require-ops-access.ts`
> 2. Sibling: `movemental-visual-editor-main/src/lib/auth/staff-capabilities.ts`
> 3. Sibling: `movemental-visual-editor-main/src/lib/navigation/admin-nav.ts`
> 4. Sibling: `docs/build/prompts/admin-unified-tenant-account-ops-prompt.md` (nav consolidation)
> 5. This repo: [TYPE_SAFETY_CHAIN.md](../../../architecture/TYPE_SAFETY_CHAIN.md) if touching shared types
>
> ### 1. Product model (lock before coding)
>
> | Surface | Who | Gate |
> | --- | --- | --- |
> | `/admin/*` | Active `staff_users` **or** `user_profiles.role = admin` | `requireOpsPageSession()` |
> | `/api/admin/*` | Same | `requireOpsApiSession()` |
> | Platform-only routes (future tenants root) | `isPlatformAdmin` | capability `ops.settings.platform` |
>
> **Josh bootstrap path:** platform admin with no `staff_users` row must resolve as `founder` capabilities (already in sibling `capabilitiesForRole`). Verify `josh@movemental.ai` has active `staff_users` row (MCP verified 2026-06-18).
>
> ### 2. Live database truth (Supabase MCP — re-verify)
>
> ```sql
> select up.email, up.role, su.staff_role, su.is_active
> from user_profiles up
> left join staff_users su on su.user_id = up.id
> where up.email = 'josh@movemental.ai';
>
> select staff_role, count(*) from staff_users where is_active group by staff_role;
> ```
>
> ### 3. Deliverables
>
> #### 3.1 Route group + layout
>
> - `src/app/(dashboard)/admin/layout.tsx` — server layout calling `requireOpsPageSession()`
> - `robots: { index: false, follow: false }` on all admin pages
> - Redirect unauthenticated → `/login?redirectTo=/admin/organizations`
> - Redirect non-ops → `/` (or customer dashboard — match sibling behavior)
>
> #### 3.2 Admin chrome (Ink Band / Warm Scholarly Authority)
>
> Reuse sibling dashboard shell components where they exist:
>
> - Left sidebar from `filterAdminNav(session.capabilities)` — **no dead links**; `comingSoon` items render disabled with tooltip
> - Top bar: operator email, **tenant switcher stub** (wired in prompt 02), sign out
> - Main scroll region with consistent page header pattern: eyebrow “Operations”, H1, optional actions slot
> - Mobile: collapsible sidebar drawer
>
> #### 3.3 Capability enforcement
>
> - Every nav item declares `capability` per `admin-nav.ts`
> - Page-level: `requireCapability(session, "ops.roster.read")` etc.
> - API-level: `requireCapabilityApi(session, key)` — return 403 JSON
> - **Founder** (`josh@movemental.ai`) sees full nav; **facilitator** sees Operations + read-only subset (no Users write, no Staff)
>
> #### 3.4 Admin index
>
> - `src/app/(dashboard)/admin/page.tsx` → redirect `/admin/organizations`
>
> #### 3.5 Session API
>
> - `GET /api/admin/session` — returns `{ authUserId, staffRole, capabilities, isPlatformAdmin }` for client nav hydration
> - Must not leak other users' data
>
> ### 4. Guardrails
>
> - **pnpm only.** Fix type errors bottom-up (`pnpm validate:all`).
> - **Never** expose admin routes without server-side gate (client-only hiding is insufficient).
> - **Never** widen capabilities in DB to “make UI work” — fix `staff_users` rows via audited ops SQL.
> - Reuse sibling code; do not fork RBAC matrix into a second module.
>
> ### 5. Phases
>
> | Phase | Work | Stop condition |
> | --- | --- | --- |
> | 0 | MCP verify Josh + staff matrix; baseline `pnpm validate:all` green | Red baseline → stop |
> | 1 | Port/align `require-ops-access`, `staff-capabilities`, `admin-nav` | Unit tests for capability matrix |
> | 2 | Admin layout + sidebar + `/admin` redirect | Logged-out → login redirect |
> | 3 | Session API + client nav filter | Josh sees all sections; facilitator sees subset |
> | 4 | Playwright smoke: auth gates | Spec in `tests/e2e/admin-shell.spec.ts` |
>
> ### 6. Sign-off checklist
>
> - [ ] Josh can sign in at dashboard.movemental.ai and land on `/admin/organizations` (after prompt 02) or `/admin` redirect
> - [ ] Non-staff user gets 403/redirect on `/admin/*`
> - [ ] Nav items match capabilities; no 404 links enabled
> - [ ] `pnpm typecheck` + `pnpm validate:all` green
> - [ ] Document admin URL in sibling `docs/SITE_MAP_AND_URL_REFERENCE.md`
>
> ### 7. Deferred
>
> - Command palette, AI panel (sibling shell extras) — optional polish
> - Audit log / Security pages (prompt 15)
