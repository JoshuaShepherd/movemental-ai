# Build prompt — admin composition editor for `onbuilding_profile_sections`

**Prompt ID:** onbuilding-profile-sections-admin-composition-editor  
**Target agent:** Cursor / Claude Code  
**Primary repo:** `movemental-ai`  
**Supabase project:** `movemental` — `vhaiiiykcukrlyvwlgip`  
**Admin principal:** `josh@movemental.ai` only  
**Last updated:** 2026-06-18

Paste the block below into a fresh agent turn. Execute phases in order; do not skip preflight or layer validation.

---

## The prompt

> You are building an **admin-only** composition editor in `movemental-ai` that gives
> `josh@movemental.ai` full CRUD control over onbuilding profile content stored in
> `public.onbuilding_profile_sections`. The editor is a **staff ops surface**, not a
> leader-facing companion. Leaders continue to use the visual-editor companion in the
> sibling repo; this prompt ports the **data contract** and **markdown composition**
> patterns into a focused admin tool here.
>
> ### 0. Read first (authority order)
>
> 1. [docs/architecture/TYPE_SAFETY_CHAIN.md](../../architecture/TYPE_SAFETY_CHAIN.md) — six-layer waterfall, golden rule, shared DB topology.
> 2. [docs/build/notes/onbuilding-4-week-course-SSOT.md](../notes/onbuilding-4-week-course-SSOT.md) — what onbuilding means product-wise.
> 3. [docs/build/prompts/wire-safety-dashboard-and-auth.md](./wire-safety-dashboard-and-auth.md) — admin route + `isUserStaff` pattern to reuse.
> 4. **Sibling reference (read-only):** `movemental-visual-editor-main`
>    - Migration: `supabase/migrations/20260617120000_onbuilding_workspace.sql`
>    - Service: `src/lib/services/custom/onbuilding.service.ts`
>    - APIs: `src/app/api/custom/onbuilding/**`
>    - Composition UI: `src/components/onbuilding/companion/OnbuildingCompanion.tsx` + `SectionCard` + `OnboardingMarkdownEditor`
>    - Zod contracts: `src/lib/schemas/onbuilding.ts`
> 5. Design: [docs/design/INK_BAND_DESIGN_CHAIN.md](../../design/INK_BAND_DESIGN_CHAIN.md) — admin shell uses Ink Band utility surfaces (`.ink-band-surface` / `InkBandUtilityShell`), not agent-room sheet chrome.
>
> ### 1. Product model (lock before coding)
>
> | Surface | Who | Data | Purpose |
> | --- | --- | --- | --- |
> | `/onbuilding` (visual-editor) | Movement leader (owner) + staff | `onbuilding_profile_sections` scoped to session leader | Leader ratification workflow |
> | **`/admin/onbuilding`** (this build) | **`josh@movemental.ai` only** | Any leader's sections | Ops CRUD: create, reorder, edit markdown, delete, reset status |
> | Public `/onbuilding/*` routes (future) | Anonymous / authenticated readers | Ratified sections only | Not in scope for this prompt |
>
> **Composition editor** means: pick a movement leader → see ordered section list → edit each section's markdown in a rich editor with live preview → save to `body_md` with audit fields (`last_edited_by`, `last_edited_at`, `status`).
>
> **Out of scope (defer):** assets bucket uploads, template selection, task checklist, profile ratification ceremony, public page rendering. This prompt is **sections CRUD only**.
>
> ### 2. Live database truth (verified 2026-06-18 via Supabase MCP)
>
> Use Supabase MCP on project `vhaiiiykcukrlyvwlgip` to re-verify before you touch code:
>
> ```sql
> -- Table exists and is populated
> select count(*) as sections, count(distinct movement_leader_id) as leaders
> from onbuilding_profile_sections;
> -- Expect ~259 sections across ~15 leaders (counts may grow)
>
> -- Sample shape
> select section_key, title, ordinal, status, movement_leader_id
> from onbuilding_profile_sections
> order by movement_leader_id, ordinal
> limit 10;
>
> -- Admin principal
> select up.email, su.user_id, su.is_active
> from staff_users su
> join user_profiles up on up.id = su.user_id
> where up.email = 'josh@movemental.ai';
> -- Expect one active staff row (user_id 1fdb2992-9636-40b7-99c9-c39fab7c2980 at time of writing)
> ```
>
> **`onbuilding_profile_sections` columns (canonical):**
>
> | Column | Type | Notes |
> | --- | --- | --- |
> | `id` | uuid PK | |
> | `movement_leader_id` | uuid FK → `movement_leaders` | Tenant of the dossier |
> | `section_key` | text | Unique per leader; stable slug (e.g. `Identity`, `Frameworks`) |
> | `ordinal` | integer | Reading order; seed uses parsed number or `9999` |
> | `title` | text | Display heading |
> | `body_md` | text | Markdown body — SSOT for section content |
> | `source_section_key` | text nullable | Provenance from corpus seed |
> | `status` | text | `draft` \| `edited` \| `ratified` |
> | `last_edited_by` | uuid FK → `user_profiles` | Set on every save |
> | `last_edited_at` | timestamptz | Set on every save |
> | `ratified_by` / `ratified_at` | uuid / timestamptz | Leader ratification; admin may clear in ops |
> | `created_at` / `updated_at` | timestamptz | `updated_at` via trigger |
>
> **Unique constraint:** `(movement_leader_id, section_key)`.
>
> **RLS (already applied — do not weaken):**
>
> - SELECT / INSERT / UPDATE: movement leader owner **or** `is_movemental_staff(auth.uid())`
> - DELETE: **staff only** (`is_movemental_staff`)
> - `is_movemental_staff` checks `staff_users` where `is_active = true`
>
> **Read-only view:** `onbuilding_profile_sections_with_leader` joins leader `slug` + `full_name` for admin lists. Query via Drizzle raw SQL or add a thin list service — do not write to the view.
>
> **Gap in this repo:** `onbuilding_profile_sections` exists in live DB and `src/lib/supabase/database.types.ts`, but is **not** declared in `src/lib/db/schema.ts` yet. Layer 1 is the first code change.
>
> ### 3. Guardrails
>
> - **pnpm only.** Never `npm` / `yarn`.
> - **Shared DB.** Project `vhaiiiykcukrlyvwlgip`. Confirm with Supabase MCP before DDL. Prefer **no new migrations** — table + RLS already exist. Use `apply_migration` only if you discover a real gap (document why).
> - **Admin gate is app-layer + email allowlist.** Even though RLS allows all staff, **this UI and its API routes** must allow only `josh@movemental.ai`. Implement `requireOnbuildingAdmin()` (see Phase 4). Do not expose generated `/api/simplified/onbuilding-profile-sections` to the public internet without the same gate.
> - **Fix bottom-up.** Drizzle → Zod → services → routes → hooks → UI. Run `pnpm validate:all` after each layer touch.
> - **Do not hand-edit generated files** under `src/lib/schemas/`, `src/lib/services/simplified/`, `src/app/api/simplified/`, `src/hooks/simplified/`. Domain logic lives in sibling folders (`src/lib/services/onbuilding/`, `src/app/api/admin/onbuilding/`).
> - **Ink Band utility chrome** on admin pages. `robots: noindex`. Mirror `(studio)/layout.tsx` staff gate pattern.
> - **Supabase SSR canon.** `@supabase/ssr` with `getAll` / `setAll` only. Session refresh via `proxy.ts`.
> - **Result\<T\>** in services; consistent API errors `{ error: { code, message } }`.
>
> ### 4. What already exists in `movemental-ai` (REUSE)
>
> | Asset | Role |
> | --- | --- |
> | `movementLeaders` in `src/lib/db/schema.ts` | Leader picker |
> | `staffUsers` + `isUserStaff()` in `onboarding.service.ts` | Staff check (extend with email allowlist) |
> | `src/app/api/admin/safety/provision-enrollment/route.ts` | Admin API auth pattern |
> | `src/app/(studio)/layout.tsx` | Staff-gated Ink Band shell |
> | `_archive/.../admin/leaders/page.tsx` | Archived admin table UX reference |
> | `src/lib/movement-leader/substrate-corpus-sync.ts` | Corpus → `movement_leader_corpus_data.substrate_sections` (seed source) |
>
> ### 5. Phase 0 — Pre-flight (Supabase MCP + baseline)
>
> 1. Branch: `slice/Sxx-onbuilding-admin-composition-editor`.
> 2. `pnpm validate:all` and `pnpm typecheck` — green before changes.
> 3. **Supabase MCP `list_tables`** (`project_id: vhaiiiykcukrlyvwlgip`, `schemas: ["public"]`, `verbose: true`) — confirm `onbuilding_profile_sections`, `movement_leaders`, `staff_users`, view `onbuilding_profile_sections_with_leader`.
> 4. **Supabase MCP `execute_sql`** — run the verification queries in §2. Snapshot counts in your PR notes.
> 5. **Supabase MCP `list_migrations`** — confirm `20260617120000_onbuilding_workspace` (or equivalent) is applied. If table missing, stop and apply sibling migration via `apply_migration` (additive only).
> 6. Sign in locally as `josh@movemental.ai` and confirm `staff_users` row is active. If not, ops must fix via MCP/SQL — do not hard-code bypass.
>
> **Stop and ask** if baseline validation is red, table is missing, or josh is not active staff.
>
> ### 6. Phase 1 — Layer 1: Drizzle schema
>
> Add to `src/lib/db/schema.ts` (mirror visual-editor definition exactly):
>
> - `onbuildingProfileSections` → `onbuilding_profile_sections`
> - Optional but recommended for admin audit UI: `onbuildingRatifications` → `onbuilding_ratifications`
>
> Use existing helpers: `id()`, `createdAt()`, `updatedAt()`. FK references to `movementLeaders` and `userProfiles`.
>
> **Also align `staffUsers`** if drifted — live DB has `is_active` and `staff_role`; add columns to Drizzle if `db:check` flags mismatch.
>
> No `db:generate` in this repo — hand-maintain Layer 1 to match live DB.
>
> Run `pnpm db:check` → must return LOCKED.
>
> ### 7. Phase 2 — Layers 2–5: Generated backbone + domain schemas
>
> ```bash
> pnpm generate:schemas
> pnpm contracts:check
> pnpm generate:services
> pnpm generate:routes
> pnpm generate:hooks
> pnpm validate:all
> ```
>
> Generated CRUD gives you a safety net. **Do not expose it directly.** Admin routes call a **domain service** instead (Phase 5).
>
> Add hand-written Zod contracts in `src/lib/schemas/onbuilding-admin.ts` (do not edit generated `index.ts` exports block — import and re-export from a barrel if needed):
>
> ```typescript
> // Section create
> OnbuildingSectionCreateSchema = z.object({
>   movementLeaderId: z.string().uuid(),
>   sectionKey: z.string().min(1).max(200),
>   title: z.string().min(1).max(500),
>   bodyMd: z.string().default(""),
>   ordinal: z.number().int().nonnegative().optional(),
>   sourceSectionKey: z.string().optional(),
>   status: z.enum(["draft", "edited", "ratified"]).default("draft"),
> });
>
> // Section update (partial)
> OnbuildingSectionUpdateSchema = z.object({
>   title: z.string().min(1).max(500).optional(),
>   bodyMd: z.string().optional(),
>   ordinal: z.number().int().nonnegative().optional(),
>   sectionKey: z.string().min(1).max(200).optional(), // warn: changes break deep links
>   status: z.enum(["draft", "edited", "ratified"]).optional(),
>   clearRatification: z.boolean().optional(), // when true, null ratified_* fields
> });
>
> // Reorder batch
> OnbuildingSectionReorderSchema = z.object({
>   movementLeaderId: z.string().uuid(),
>   orderedSectionIds: z.array(z.string().uuid()).min(1),
> });
>
> // List filters
> OnbuildingSectionListSchema = z.object({
>   movementLeaderId: z.string().uuid(),
> });
> ```
>
> ### 8. Phase 3 — Admin auth helper
>
> Create `src/lib/auth/require-onbuilding-admin.ts`:
>
> ```typescript
> export const ONBUILDING_ADMIN_EMAIL = "josh@movemental.ai" as const;
>
> export async function requireOnbuildingAdmin(): Promise<
>   | { authUserId: string; email: string }
>   | { error: NextResponse }
> > {
>   // 1. supabase.auth.getUser() — 401 if missing
>   // 2. Load email from auth user (user.email) — normalize lowercase
>   // 3. if email !== ONBUILDING_ADMIN_EMAIL → 403 (generic message)
>   // 4. isUserStaff(authUserId) → 403 if false (belt-and-suspenders with RLS)
>   // 5. return { authUserId, email }
> }
> ```
>
> **Why email + staff?** RLS trusts `is_movemental_staff` for multiple staff accounts. Product requirement is **Josh-only** for this destructive CRUD surface. Email allowlist is the product gate; staff check keeps alignment with DB policies.
>
> Add server layout guard in `src/app/admin/onbuilding/layout.tsx` mirroring `(studio)/layout.tsx` but calling `requireOnbuildingAdmin()` and redirecting non-admins to `/agent`.
>
> ### 9. Phase 4 — Domain service (full CRUD)
>
> Create `src/lib/services/onbuilding/onbuilding-sections-admin.service.ts` with `Result<T>` methods:
>
> | Method | Behavior |
> | --- | --- |
> | `listLeadersWithSectionCounts()` | Join `movement_leaders` + section counts; sort by `full_name` |
> | `listSections(leaderId)` | All sections ordered by `ordinal`, `section_key` |
> | `getSection(leaderId, sectionId)` | Single row |
> | `createSection(actorId, input)` | Insert; default `ordinal` to `max+1` if omitted; set `last_edited_*`; status `draft` |
> | `updateSection(actorId, sectionId, patch)` | Update allowed fields; set `last_edited_by/at`; bump status to `edited` when `body_md` changes unless explicitly setting `status` |
> | `deleteSection(sectionId)` | Hard delete (staff RLS allows); return deleted id |
> | `reorderSections(actorId, leaderId, orderedIds)` | Transaction: set `ordinal` = index for each id |
> | `reseedSectionsFromCorpus(actorId, leaderId)` | **Optional ops action:** insert from `movement_leader_corpus_data.substrate_sections` using same SQL logic as seed migration — `ON CONFLICT DO NOTHING` only |
>
> **Audit rules on every mutating call:**
>
> - Set `last_edited_by = actorId`, `last_edited_at = now()`
> - Never overwrite `ratified_*` unless `clearRatification: true` or status moves away from `ratified`
>
> Port logic from visual-editor `patchOnbuildingSection` as the baseline for updates. Extend with create/delete/reorder absent there.
>
> ### 10. Phase 5 — Admin API routes
>
> All routes under `src/app/api/admin/onbuilding/sections/` — each starts with `requireOnbuildingAdmin()`.
>
> | Method | Path | Body / query | Response |
> | --- | --- | --- | --- |
> | GET | `/api/admin/onbuilding/leaders` | — | `{ success, data: { leaders: [{ id, slug, fullName, sectionCount }] } }` |
> | GET | `/api/admin/onbuilding/sections?movementLeaderId=` | query | `{ success, data: { sections: [...] } }` |
> | GET | `/api/admin/onbuilding/sections/[id]` | — | single section |
> | POST | `/api/admin/onbuilding/sections` | `OnbuildingSectionCreateSchema` | 201 + created row |
> | PATCH | `/api/admin/onbuilding/sections/[id]` | `OnbuildingSectionUpdateSchema` | updated row |
> | DELETE | `/api/admin/onbuilding/sections/[id]` | — | `{ success, data: { id } }` |
> | PUT | `/api/admin/onbuilding/sections/reorder` | `OnbuildingSectionReorderSchema` | refreshed list |
> | POST | `/api/admin/onbuilding/sections/reseed` | `{ movementLeaderId }` | `{ inserted: number }` (optional) |
>
> Validate with Zod `.safeParse()`. Map service errors to 400/404/500. Never leak stack traces.
>
> ### 11. Phase 6 — React hooks (Layer 5)
>
> Create `src/hooks/onbuilding/use-onbuilding-admin.ts` with TanStack Query:
>
> ```typescript
> export const onbuildingAdminKeys = {
>   all: ["onbuildingAdmin"] as const,
>   leaders: () => [...onbuildingAdminKeys.all, "leaders"] as const,
>   sections: (leaderId: string) => [...onbuildingAdminKeys.all, "sections", leaderId] as const,
>   section: (id: string) => [...onbuildingAdminKeys.all, "section", id] as const,
> };
> ```
>
> Mutations invalidate `sections(leaderId)` and `leaders()` (counts). Use `credentials: "include"` on fetch.
>
> ### 12. Phase 7 — Composition editor UI
>
> **Route:** `src/app/admin/onbuilding/page.tsx` + `layout.tsx` (Ink Band utility shell).
>
> **Layout (three-pane on `lg+`, stacked on mobile):**
>
> ```text
> ┌─────────────────────────────────────────────────────────────┐
> │ Eyebrow: Staff ops · Onbuilding composition                 │
> ├──────────────┬──────────────────────────┬───────────────────┤
> │ Leader list  │ Section list (ordered)   │ Editor + preview  │
> │ (col 1)      │ (col 2)                  │ (col 3)           │
> │              │ drag handles → reorder   │ title field       │
> │ search/filter│ status pills             │ markdown editor   │
> │ section count│ + / delete section       │ split preview     │
> │              │                          │ Save / Discard    │
> └──────────────┴──────────────────────────┴───────────────────┘
> ```
>
> **Leader picker (col 1):** Fetch `/api/admin/onbuilding/leaders`. Click row → load sections. Show `full_name`, `slug`, `sectionCount`.
>
> **Section list (col 2):**
>
> - Ordered by `ordinal`
> - Status chip: `draft` / `edited` / `ratified`
> - Actions: select, **Add section** (modal: `section_key`, `title`), **Delete** (confirm dialog — destructive)
> - **Reorder:** drag-and-drop (e.g. `@dnd-kit/core` if already in repo) or up/down buttons calling reorder API
>
> **Composition editor (col 3):**
>
> Port the visual-editor pattern:
>
> - `OnboardingMarkdownEditor` (Tiptap) + `markdown-tiptap` round-trip utilities
> - Read-only preview via `react-markdown` (already in repo or add)
>
> **Dependency step** — visual-editor pins Tiptap 3.20.x. Add to `movemental-ai`:
>
> ```bash
> pnpm add @tiptap/react @tiptap/starter-kit @tiptap/extension-link \
>   @tiptap/extension-placeholder @tiptap/extension-table @tiptap/pm
> ```
>
> Copy and adapt (do not symlink across repos):
>
> - `src/lib/onbuilding/markdown-tiptap.ts` from visual-editor
> - `src/components/onbuilding/onbuilding-markdown-editor.tsx` from `onboarding-markdown-editor.tsx`
> - Extension factory from `lesson-editor-extensions.ts` (minimal set: StarterKit, Link, Placeholder, Table)
>
> **Editor behavior:**
>
> - Local draft state while editing; **Save** PATCHes `bodyMd` + `title`
> - **Discard** resets draft from server
> - Show `last_edited_at` + status under toolbar
> - Optional: **Clear ratification** toggle when saving (sets status → `edited`, clears `ratified_*`)
>
> **Empty states:**
>
> - No leader selected → prompt to pick one
> - No sections → CTA "Add section" + optional "Reseed from corpus" if leader has `movement_leader_corpus_data`
>
> ### 13. Phase 8 — Supabase MCP verification (post-build)
>
> After implementing, use MCP to prove writes landed:
>
> ```sql
> -- Pick a test leader (use a non-production slug in dev)
> select id, slug from movement_leaders where slug = 'alan-hirsch' limit 1;
>
> -- After creating a test section via UI, confirm row
> select section_key, title, ordinal, status, last_edited_by, left(body_md, 80)
> from onbuilding_profile_sections
> where movement_leader_id = '<leader_uuid>'
> order by ordinal desc
> limit 5;
>
> -- After delete, confirm gone
> select count(*) from onbuilding_profile_sections where id = '<deleted_uuid>';
> ```
>
> Use Chrome DevTools MCP (or cursor-ide-browser) to walk the UI logged in as Josh.
>
> ### 14. Phase 9 — Tests
>
> **Vitest** (`tests/unit/onbuilding-sections-admin.test.ts`):
>
> - Zod schemas reject empty `section_key`, invalid UUIDs
> - Service reorder produces contiguous ordinals (mock db or test transaction)
>
> **Playwright** (`tests/e2e/onbuilding-admin.spec.ts`):
>
> - Unauthenticated `/admin/onbuilding` → redirect login
> - Non-josh staff (if test fixture exists) → 403 or redirect
> - Josh session: load leaders → select leader → open section → edit markdown → save → reload → text persists
> - Delete section with confirm → row gone from list
>
> Skip e2e if no Josh test auth fixture; document manual QA matrix instead.
>
> ### 15. Manual QA matrix (minimum)
>
> | # | Step | Expected |
> | --- | --- | --- |
> | 1 | Open `/admin/onbuilding` logged out | Redirect `/login?next=...` |
> | 2 | Open as non-josh staff | 403 or redirect away |
> | 3 | Open as josh@movemental.ai | Three-pane editor loads |
> | 4 | Select Alan Hirsch (or any leader) | Section list matches MCP count |
> | 5 | Create section `zz-test` | Appears in list + MCP row exists |
> | 6 | Edit body markdown, save | `body_md` + `status=edited` + `last_edited_by` set |
> | 7 | Reorder sections | `ordinal` values update in DB |
> | 8 | Delete test section | Row removed; ratified sections require confirm copy |
> | 9 | `pnpm validate:all` + `pnpm typecheck` | Green |
>
> ### 16. Sign-off checklist
>
> - [ ] Layer 1: `onbuilding_profile_sections` in Drizzle; `pnpm db:check` LOCKED
> - [ ] Layers 2–5 generated; domain service + admin routes pass validation
> - [ ] `requireOnbuildingAdmin()` enforces **josh@movemental.ai** on every admin route + layout
> - [ ] Full CRUD: create, read, update, delete, reorder
> - [ ] Composition editor: Tiptap markdown round-trip + preview
> - [ ] Supabase MCP post-write verification documented in PR
> - [ ] No public exposure of unguarded simplified CRUD routes
> - [ ] `robots: noindex` on admin pages
> - [ ] `pnpm typecheck` + `pnpm validate:all` green
>
> ### 17. Deferred (do not block sign-off)
>
> - Public onbuilding reader routes in `movemental-ai`
> - Ratification log UI (`onbuilding_ratifications`)
> - Asset upload manager (`onbuilding_assets` + storage bucket)
> - Template picker (`onbuilding_template_selection`)
> - Task checklist (`onbuilding_tasks`)
> - Expanding admin allowlist beyond Josh (would move constant to env / `staff_users` role flag)
>
> ---
>
> **When done:** Summarize files touched, MCP verification output, and any schema drift fixed. Link the admin URL (`/admin/onbuilding`) for Josh.

---

## Operator notes (for humans)

- **Josh auth:** `josh@movemental.ai` is in `staff_users` with `is_active = true` on project `vhaiiiykcukrlyvwlgip`. If login fails, fix auth separately — do not widen the admin gate.
- **Data volume:** ~259 sections across ~15 leaders as of 2026-06-18. Deletes are real — prefer test leaders for QA.
- **Seed source:** Sections were bulk-inserted from `movement_leader_corpus_data.substrate_sections` (`20260617120001_onbuilding_seed_sections.sql` in visual-editor). Reseed is non-destructive (`ON CONFLICT DO NOTHING`).
- **Sibling repo:** The leader-facing companion at `/onbuilding` in `movemental-visual-editor-main` patches `body_md` only. This admin tool extends with title/key/ordinal/delete/create for ops.
