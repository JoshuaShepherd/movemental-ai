# Authenticated dashboard surface — reconnaissance audit

> **Staleness warning (2026-05):** Sections below mix historical snapshots with the current tree. For **accurate routing and chrome**, read first: [`dashboard-route-prefix-matrix.md`](./dashboard-route-prefix-matrix.md), [`nested-chrome-exceptions.md`](./nested-chrome-exceptions.md), and [`docs/build/prompts/dashboard-shell-and-navigation-architecture-prompt.md`](../prompts/dashboard-shell-and-navigation-architecture-prompt.md). The live shell is **`AuthenticatedShell`** (not `DashboardShell`). Product sidebars exist for **SandboxLive**, **SafeStart**, and **Leader** under `(dashboard)`.

**Scope:** Read-only inventory of the movemental-ai codebase. No build plan, no refactors.

**Primary code locations:** `src/app/(dashboard)/`, `src/app/(studio)/`, `src/components/authenticated/`, `src/components/dashboard/`, `src/components/program/`, `src/components/onboarding/`, `proxy.ts`, `src/lib/authenticated/product-context.ts`, `src/lib/supabase/middleware.ts`, `next.config.ts`, `src/lib/program/`, `src/lib/db/schema.ts`.

---

## 1. Authentication and dashboard segments

### Where authenticated content lives

| Segment (route group) | URL prefix(es) | Layout / gate file |
|----------------------|----------------|-------------------|
| `(dashboard)` | `/dashboard`, `/dashboard/*`, `/welcome`, `/onboarding` (rewrites), `/program`, `/program/*`, `/admin`, `/admin/*`, `/sandboxlive`, `/sandboxlive/*`, `/safestart`, `/safestart/*`, `/leader`, `/leader/*` (except public `/leader/apply` when shipped) | `src/app/(dashboard)/layout.tsx` |
| `(studio)` | `/agent-runtime` | `src/app/(studio)/layout.tsx` |

There is **no** separate `(app)` or `(authenticated)` route group beyond these. Staff admin includes **`/admin/onboarding`**, **`/admin/leaders`**, **`/admin/design-tokens`**.

### More than one segment?

**Yes — two:**

1. **`(dashboard)`** — Customer / tenant workspace: `AuthenticatedShell`, org switching (`?org=`), onboarding panel, Program, SandboxLive, SafeStart, Leader, teaching, staff admin links.
2. **`(studio)`** — Staff-only **agent runtime** (`isUserStaff`). Minimal content wrapper; **same marketing chrome suppression** as dashboard via `proxy.ts` (`x-movemental-shell: dashboard`).

**Conceptual distinction:** `(dashboard)` is the shared signed-in hub. `(studio)` is internal operator tooling.

Personas inside `(dashboard)` are **not** separate route trees: `implementation_org` vs `movement_leader` is resolved in services and changes copy, Program nav label, and template ordering.

### Authentication mechanism

- **Supabase Auth (SSR)** via `@supabase/ssr` in `src/lib/supabase/middleware.ts` (`updateSession`): refreshes session on matched requests; uses `getAll` / `setAll` for cookies.
- **Login UI:** `src/app/(site)/login/page.tsx` — **email + password** (`signInWithPassword`).
- **`(dashboard)/layout.tsx`:** If no `user`, redirects to `/login?next=…`. If user has **zero** org memberships, redirects **unless** the path is an allowed **Leader workspace** path and a movement leader row exists.
- **`(studio)/layout.tsx`:** If no user → `/login?next=…`. If user is not staff → redirect to `/dashboard`.
- **`proxy.ts`:** Sets `x-movemental-shell: dashboard`, `x-pathname`, and optional `x-dashboard-org-slug` for every prefix in `AUTHENTICATED_PATH_PREFIXES` (see `proxy.ts` and [`dashboard-route-prefix-matrix.md`](./dashboard-route-prefix-matrix.md)).

---

## 2. Every dashboard route — full enumeration

**Static / fixed routes**

| Route | File path | What it does | Status | Linked from nav? | Design notes |
|-------|-------------|--------------|--------|------------------|--------------|
| `/dashboard` | `src/app/(dashboard)/dashboard/page.tsx` | Workspace overview: persona copy, at-a-glance tiles, next onboarding steps, module cards | **Live** | Yes (`AuthenticatedShell` / Workspace nav) | Semantic tokens |
| `/welcome` | `src/app/(dashboard)/welcome/page.tsx` | Full onboarding checklist (client) | **Partial** | Yes | Workspace nav |
| `/dashboard/teaching/claude-skills` | `src/app/(dashboard)/dashboard/teaching/claude-skills/page.tsx` | Claude skills guide | **Live** | Yes | See nested chrome note |
| `/program` | `src/app/(dashboard)/program/page.tsx` | Safety + Sandbox template index | **Live** | Yes | — |
| `/sandboxlive`, `/sandboxlive/*` | `src/app/(dashboard)/sandboxlive/**` | SandboxLive product (phases, cohort, org admin) | **Live** | Yes | Sidebar from manifest |
| `/safestart`, `/safestart/*` | `src/app/(dashboard)/safestart/**` | SafeStart product | **Live** | Yes | Sidebar |
| `/leader`, `/leader/*` | `src/app/(dashboard)/leader/**` | Leader workspace | **Live** | Yes | Sidebar |
| `/admin/onboarding` | `src/app/(dashboard)/admin/onboarding/page.tsx` | Staff onboarding table | **Live** (staff) | Yes | — |
| `/admin/leaders` | `src/app/(dashboard)/admin/leaders/page.tsx` | Staff leaders list | **Live** (staff) | Yes | — |
| `/admin/design-tokens` | `src/app/(dashboard)/admin/design-tokens/page.tsx` | Staff design QA | **Live** (staff) | Yes | — |

**Onboarding step routes** — unchanged pattern: `/onboarding/:step` rewrites to `/dashboard/onboarding/:step`.

**Studio route**

| Route | File path | What it does | Status | Linked? |
|-------|-----------|--------------|--------|---------|
| `/agent-runtime` | `src/app/(studio)/agent-runtime/page.tsx` | Agent × corpus × prompt packs | **Live** (staff) | **Yes** (staff: “Agent runtime” in Workspace nav / dropdown) |

**Public auth pages** — `/login`, `/forgot-password` under `(site)` with marketing chrome.

---

## 3. The dashboard chrome (navigation, layout, persistent UI)

### Persistent UI

| Element | File path | Role |
|---------|-----------|------|
| Workspace chrome | `src/components/authenticated/authenticated-shell.tsx` | Midnight header; org switcher; **Tier A** links from `getWorkspacePrimaryNavItems` (`src/lib/authenticated/workspace-primary-nav.ts`); **Workspace** dropdown on small screens and when a product badge hides horizontal links; optional **product sidebar** |
| Product + sidebar resolution | `src/lib/authenticated/product-context.ts` + `(dashboard)/layout.tsx` | Pathname → `productContext` + sidebar sections |
| Org context | `src/components/dashboard/dashboard-org-context.tsx` | `?org=` + provider |
| Onboarding strip | `src/components/onboarding/onboarding-panel.tsx` | Inside layout above `children` (hidden on Leader-only product paths per layout rules) |
| Root chrome suppression | `src/app/layout.tsx` | When `x-movemental-shell === "dashboard"`, omits `SiteHeader` / `SiteFooter` |

### Sidebar nav items

**Product sidebars** (desktop, `md+`): SandboxLive phases + cohort + optional org admin; SafeStart workspaces + guidebook; Leader reflection + publish sections. See `sandboxlive-sidebar.ts` and `product-context.ts`.

### Nested / competing in-content chrome

See [`nested-chrome-exceptions.md`](./nested-chrome-exceptions.md) (Program shell, teaching guide).

---

## 4. Older notes (SandboxLive / program-only model)

The following sections may still describe an earlier model where SandboxLive lived only under **`/program/sandbox/...`**. The repo now ships a first-class **`/sandboxlive`** tree; treat §4+ as **archive context** unless reconciled in a future edit.


### SandboxLive — eight “phase” workspaces (Stitch / manifest)

There is **no** dedicated `/sandboxlive/...` product route tree. SandboxLive (and cohort/recipe/future-plan) screens are **individual entries** in `stitch-templates.json`, each opened as **`/program/sandbox/<templateId>`** (or safety category where applicable).

**Phase-labeled sandbox templates in the manifest (subgroup `phase-workspaces` where noted):**

| Phase (product language) | Template `id` in manifest | Fixture file present | Routed as |
|--------------------------|---------------------------|----------------------|-----------|
| Phase 01 Boundaries | `phase_01_boundaries_workspace_movemental` | Yes | `/program/sandbox/phase_01_boundaries_workspace_movemental` |
| Phase 02 Assessment | `phase_02_assessment_sandboxlive_workspace` | Yes | `/program/sandbox/phase_02_assessment_sandboxlive_workspace` |
| *(no `phase_03` id in manifest)* | — | — | — |
| Phase 04 Iteration | `phase_04_iteration_sandboxlive_workspace` | Yes | `/program/sandbox/phase_04_iteration_sandboxlive_workspace` |
| Phase 05 Reflection | `phase_05_reflection_sandboxlive_workspace` | Yes | `/program/sandbox/phase_05_reflection_sandboxlive_workspace` |
| Phase 06 Ethics | `phase_06_ethics_review_sandboxlive_dashboard` | Yes | `/program/sandbox/phase_06_ethics_review_sandboxlive_dashboard` |
| Phase 07 Discerning adjudication | `phase_07_discerning_adjudication_workspace` | Yes | `/program/sandbox/phase_07_discerning_adjudication_workspace` |
| Phase 08 Future Plan | `phase_08_future_plan_editor_sandboxlive_workspace` | Yes | `/program/sandbox/phase_08_future_plan_editor_sandboxlive_workspace` |

**Additional SandboxLive-related sandbox templates** (same hub, not numbered “Phase 0n”): e.g. `sandboxlive_dashboard_*`, `cohort_view_sandboxlive_dashboard`, `sponsor_oversight_view_sandboxlive`, `module_02_how_to_talk_to_it_sandboxlive_dashboard`, ethics review variants, future plan aggregation/export fixtures, etc. — all **`/program/sandbox/<id>`** unless category is `safety`.

**Integration model:** Each is a **Stitch-derived JSON fixture** rendered by `ProgramDocumentView` or `SafeStartHomeView` (hero-timeline family only). **Not** a unified multi-phase SPA. **`program_engagements`** can overlay `summary_markdown` / `milestones` for the active org + template slug (`load-program-template-data.server.ts`).

### Phase 02 Assessment / “Current Reality Map”

Exposed as **`/program/sandbox/phase_02_assessment_sandboxlive_workspace`** like any other sandbox template — **not** a separate authenticated artifact route. No evidence in `src/` of a standalone “current reality map” product route disconnected from this pipeline (it would still be the same renderer).

### Recipe Library

Templates include e.g. `recipe_library_movemental_sandbox_dashboard`, `recipe_library_filtered_by_map`, `recipe_detail_strategic_memo_drafting`. **Same integration:** list links from `/program` → `/program/sandbox/<id>`. No separate “Recipe Library” app section or API surface beyond generic program + DB merge.

### Future Plan editor (Phase 08)

Template **`phase_08_future_plan_editor_sandboxlive_workspace`** exists with fixture **`phase_08_future_plan_editor_sandboxlive_workspace.content.json`**. Additional related fixtures: `future_plan_initial_aggregation`, `future_plan_drafting_editor`, `future_plan_board_export`. All are **individual program routes**, not one editor shell.

### SafeStart

- **No** separate `/safestart` route. SafeStart Stitch screens are **`safety` category** templates (subgroup `safestart-dashboard` and related), reachable as **`/program/safety/<templateId>`**.
- **Ten SafeStart-dashboard subgroup templates** in `stitch-templates.json` (IDs such as `safestart_dashboard_home_pre_kickoff`, `…_drafting_async_review`, editorial comment/ratification/steady-state views, etc.). **Board ratification** pair uses subgroup `ratification-recording` but naming includes “safestart_dashboard”.
- **Same dashboard** as Sandbox customers for navigation purposes — one `(dashboard)` shell; differentiation is **template list + persona**, not a second product shell.

---

## 5. Movement Leader surfaces

### Dedicated authenticated “Movement Leader” product

**No** separate route segment or “author dashboard” product. Movement leaders use the same `/dashboard`, `/program`, `/welcome`, onboarding URLs as other members; persona may default to `movement_leader` per `src/lib/dashboard/dashboard-persona.ts`.

### `docs/movement_leader_research/` at runtime

**No** filesystem or dynamic reads of that directory in application runtime code searched under `src/`. References appear in **comments** (e.g. `voice-audience-credentials.ts`, `committed-voices.ts`) and **docs/scripts**, not `fs.readFile` of research markdown for the dashboard.

### “Reflected understanding” / leader dashboard keywords

Repo-wide matches for phrases like “reflected-understanding,” “author dashboard,” “movement leader dashboard” occur primarily in **`docs/`**, **`docs/movement_leader_research/`**, and **scripts** — **not** in implemented dashboard routes under `src/app/(dashboard)`.

---

## 6. Internal / staff surfaces

| Route | Purpose | Gate |
|-------|---------|------|
| `/admin/onboarding` | Staff: view org onboarding summaries, unlock prep tasks | `isUserStaff` in page + layout link visibility |
| `/agent-runtime` | Staff: bind agents to corpus + prompt packs | `(studio)/layout.tsx`: login + **staff** |

**Other internal-adjacent APIs (not pages):** `/api/admin/onboarding/*`, cron onboarding reminders, etc.

### `/agent-runtime` public access

**Not publicly usable:** unauthenticated users redirect to login; non-staff users redirect to `/dashboard`. It remains a **sensitive internal surface** by URL (not linked in nav — discoverable by URL or docs).

---

## 7. Data layer for the dashboard

### Primary sources

| Layer | Role |
|-------|------|
| **Supabase / Postgres (Drizzle)** | Organizations, memberships, onboarding task rows, staff allowlist, program engagements, corpus/consent/agent onboarding APIs, etc. |
| **Local JSON** | Program fixtures: `src/lib/program/fixtures/**/*.content.json` |
| **Local JSON manifest** | `src/lib/program/data/stitch-templates.json` (template list, paths, subgroup labels) |

### Customer / tenant experience (representative tables)

Defined in `src/lib/db/schema.ts` (non-exhaustive): **`organizations`** (includes `cohort_start_date`, `cohort_size`, `cohort_id`, settings JSON for persona), **`onboarding_tasks`**, **`program_engagements`** (per `organization_id` + `template_slug`, `summary_markdown`, `milestones`), **`corpus_review_items`**, **`signed_agreements`**, **`consent_records`**, **`organization_assets`**, staff **`staff_users`**, plus broader platform tables consumed by hooks on `/agent-runtime`.

### Cohort concept

- **Org-level:** `organizations.cohort_start_date`, `cohort_size`, `cohort_id`.
- **Platform:** **`cohorts`** table and related **`cohort_sessions`**, **`cohort_discussion_messages`**, etc. (schema exists; dashboard UI does not present a full “cohort workspace” beyond copy + admin columns referencing cohort start).

---

## 8. Inconsistencies and visual issues (“visual mess” drivers)

### Conflicting visual languages (authenticated)

1. **Dashboard shell** — light `bg-section` / `bg-card`, compact top nav.
2. **Program Stitch views** — full-bleed **midnight** chrome + **SafeStart palette** (`safestart-bg`, `safestart-ink`, `pathway-accent`) inside the same session.
3. **Teaching library** — **second midnight sticky bar** + SafeStart-like reading layout, **stacked under** the dashboard header when `/dashboard` shell is active (double top hierarchy).
4. **`ProgramDocumentView` `ShellTopLinks`** — raw `<a href>` links to fixture `href` strings (may not align with Next app routes).

### `proxy.ts` / root layout mismatch

**`/program` and `/program/*` are not** in `proxy.ts`’s `dashboardShell` predicate. **Effect:** `x-movemental-shell` is **not** set for `/program`… so **`SiteHeader` + `SiteFooter` still render** from root `layout.tsx` **while** `(dashboard)/layout.tsx` also wraps the page in `DashboardShell`. **Likely triple chrome:** marketing header/footer + dashboard header + program inner shell.

**`/agent-runtime`:** Not in `dashboardShell` list → marketing **SiteHeader/SiteFooter** + studio content (staff).

### Duplicates / near-duplicates

- **`/welcome` vs `/dashboard/welcome`** — identical module export.
- **Public marketing “pathway”** (`/pathway/sandbox`, etc.) vs **`/program`** — different systems; copy on `/program` explicitly says marketing pathway pages are unrelated (confusing for humans even if intentional).

### Broken or rough UX

- Onboarding checklist: phases after **Commitment** show **“Coming soon”** (`onboarding-checklist.tsx`); most tasks beyond the few implemented steps are **placeholders**.
- Program templates: empty `sections` → visible **“No sections in this template fixture yet”** CTA (`program-document-view.tsx`).
- **No sidebar** despite Stitch dashboards often assuming left nav — program sidebar is **inside** the template chrome only.

---

## 9. Dashboard vs public site

### Deployment / URL shape

- **No `vercel.json` / `vercel.ts` in repo** from glob; canonical origin is **`NEXT_PUBLIC_SITE_URL`** (else Vercel URL / localhost) per `src/lib/site-url.ts`. Dashboard routes are **paths on the same host** (e.g. `https://<site>/dashboard`), not a separate subdomain configured in-repo.

### Top nav

- **Dashboard-flagged paths:** marketing **SiteHeader / SiteFooter hidden**; only `DashboardShell` header.
- **`/program`, `/agent-runtime`:** marketing header/footer **still shown** (bug/oversight per Section 8).

### Authenticated user on public URLs

**No** `SiteHeader` logic found that adds “Go to dashboard” or changes CTAs based on Supabase session (grep in `site-header.tsx` for `/login` / `/dashboard` returned no matches). Public pages look the same unless a future change adds session-aware nav.

---

## 10. Closest to finished vs most embarrassing

### Three closest to production-ready (within authenticated surfaces)

1. **`/dashboard`** — Clear overview, persona-aware copy, card grid, design tokens aligned with site primitives.
2. **`/dashboard/teaching/claude-skills`** — Cohesive long-form layout, TOC, progress (though visually distinct from the shell).
3. **`/admin/onboarding`** (staff) — Purpose-built table, unlock flow, consistent shadcn/table styling.

*(Honorable mention: `/agent-runtime` is functionally clear for operators, but suffers marketing chrome stacking.)*

### Three most unfinished / embarrassing

1. **`/program` when the marketing shell still wraps it** — Structural layout bug; looks like two products stitched together.
2. **Onboarding after Commitment + most `/onboarding/…` steps** — “Coming soon” / placeholder bodies; checklist links imply full flows that are not built.
3. **Program template previews** — Inconsistent depth (empty sections message, nested midnight SafeStart chrome inside light dashboard), easy to read as “broken migration” rather than intentional MVP.

---

## Architectural summary (one paragraph)

The authenticated “dashboard” today is **`(dashboard)`**: a **light, minimal top-nav shell** around **org-scoped onboarding** (checklist + a handful of real step pages + many placeholders), a **program index** that deep-links into **45 Stitch-manifest templates** rendered from **local JSON fixtures** with optional **`program_engagements`** overlays from Postgres, a **polished teaching-library article** that uses its **own midnight layout**, and **one staff admin page** for onboarding unlocks. A separate **`(studio)`** route **`/agent-runtime`** serves **staff-only** agent configuration. There is **no** dedicated SandboxLive phase router, SafeStart shell, recipe hub, future-plan product, or movement-leader author dashboard — those product ideas exist mainly as **named templates and docs**, not as a unified customer application. The most honest read: the codebase is a **capable scaffold and content pipeline** (auth, org context, fixtures, DB hooks) with **inconsistent shell and design layering**, **onboarding UX that trails the checklist**, and **program previews that read as design-system and layout collisions** rather than a single shipped workspace.
