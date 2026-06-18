# 06 — Users, staff & access management

**Priority:** 6 (identity plane — after tenant directory stabilizes)  
**Prompt ID:** ranked-06-users-staff-and-access-management  
**Primary repo:** `movemental-visual-editor-main`  
**Depends on:** [01](./01-admin-shell-rbac-and-navigation.md)  
**Supabase project:** `movemental` — `vhaiiiykcukrlyvwlgip`  
**Last updated:** 2026-06-18

---

## The prompt

> Implement **`/admin/users`** and **`/admin/staff`** — full CRUD for platform identity: `auth.users` + `user_profiles`, org memberships, and `staff_users` with `staff_role` capabilities. Founder-only write on Users nav (`ops.users.write`); Staff management requires `ops.staff.manage`.
>
> ### 0. Read first
>
> 1. Sibling: `src/app/(dashboard)/admin/users/AdminUsersClient.tsx`
> 2. Sibling: `src/app/(dashboard)/admin/staff/AdminStaffClient.tsx`
> 3. Sibling: `src/lib/services/custom/admin-users.service.ts`
> 4. Sibling: `docs/build/prompts/admin-multi-tenant-users-and-authors-prompt.md`
> 5. `movemental-ai`: `src/lib/db/schema.ts` — `staffUsers`, `userProfiles`, `organizationMemberships`
>
> ### 1. Product model
>
> | Route | Purpose | Capability |
> | --- | --- | --- |
> | `/admin/users` | Global user directory + invite | `ops.users.write` (nav); read via `ops.users.read` future |
> | `/admin/users/[id]` | Profile, memberships, actions | same |
> | `/admin/staff` | `staff_users` CRUD, role assignment | `ops.staff.manage` |
>
> **Staff roles:** `founder` | `facilitator` | `support` | `engineer` → capabilities per `staff-capabilities.ts`
>
> ### 2. Live database truth (Supabase MCP)
>
> ```sql
> select up.email, up.role, su.staff_role, su.is_active
> from staff_users su
> join user_profiles up on up.id = su.user_id
> where su.is_active;
> -- 3 active staff (2026-06-18)
> ```
>
> ### 3. Users features
>
> - Search by email, name
> - Columns: email, display name, platform role, membership count, last active, created
> - **Invite user:** email + optional org membership (uses Supabase Admin `inviteUserByEmail` — server-only, service role in route handler)
> - Detail page: edit profile fields (safe subset), list memberships with role badges, add/remove membership
> - Link to org detail for each membership
>
> ### 4. Staff features
>
> - Table: email, staff_role, is_active, granted capabilities preview
> - Add staff: pick existing user_profile by email → set role → upsert `staff_users`
> - Deactivate staff: `is_active = false` (soft — do not delete auth user)
> - **Cannot** demote last founder without confirm + second founder exists
>
> ### 5. API routes
>
> Port sibling routes if missing:
>
> - `GET/POST /api/admin/users`
> - `GET/PATCH /api/admin/users/[id]`
> - `GET/POST/PATCH/DELETE /api/admin/staff`
> - `GET/POST /api/admin/users/[id]/memberships`
>
> All: `requireOpsApiSession()` + capability checks.
>
> ### 6. Guardrails
>
> - **Never** expose `SUPABASE_SERVICE_ROLE_KEY` client-side
> - Auth admin calls server-only in route handlers
> - **Never** share one auth login across humans
> - Validate all inputs with Zod; types from generated schemas
>
> ### 7. Sign-off checklist
>
> - [ ] Josh listed as founder staff
> - [ ] Invite flow creates auth user + profile (test email)
> - [ ] Add facilitator role → nav filters per capabilities (prompt 01)
> - [ ] Deactivate staff removes admin access on next request
> - [ ] `pnpm validate:all` green
