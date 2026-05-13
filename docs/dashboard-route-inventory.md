# Authenticated dashboard — post-alignment route inventory (SSOT)

**Purpose:** Single source of truth for the signed-in product surface after the dashboard alignment sequence (Prompts 01–08). Use this when scoping work, QA, or onboarding contributors.

**Chrome:** One `AuthenticatedShell` (`src/components/authenticated/authenticated-shell.tsx`) for every path that sets `x-movemental-shell: dashboard` in `proxy.ts`. Marketing `SiteHeader` / `SiteFooter` are suppressed on those routes. Root fonts: **Inter** (body/UI) and **Newsreader** via `--font-serif-display` (display headings and `<em>` emphasis in the serif register). **Instrument Serif is not loaded.** Product chrome uses **warm midnight** (`movemental-midnight` → `#141110`), **burnished amber** (`pathway-accent` → `#b8893a`) for primary actions and active chrome, **hairline rules** (`border-[0.5px]` + `border-rule` / semantic borders), **no marketing pill radius** on shell-primary buttons (`Button` variant `pathway`, `rounded-none`). No drop shadows on shell surfaces; tonal stacking and hairlines carry structure.

**Progress rail:** When leader onboarding is incomplete (`onboardingProgress` below 100), the amber rail and editorial caption render under the header for **leader workspace** users on `/leader/*`. Organization customers no longer see this rail (2026-05); use `/welcome` for the full checklist and **Documents → MOU** in the header for signing.

**Documents menu:** Signed-in users with an active organization see **Documents** in the header (midnight bar); **Memorandum of Understanding (MOU)** opens `/onboarding/agreement` (rewritten to `dashboard/onboarding/agreement`) with `AgreementSigningPanel` (org context, register link; native signing flow in product).

**Workspace courses (opt-in):** `organizations.settings.workspaceCourses` (`"safety"` \| `"sandbox"` \| `"skills"` \| `"solutions"`) is resolved per org via `resolveWorkspaceCourseEntitlements` and passed as `workspaceCoursesByOrgSlug` into `AuthenticatedShell` with `loadDashboardShellMapsForUser`. Missing key ⇒ no Program/SandboxLive/SafeStart unless legacy **`workspaceNavPreset: "sandbox_live_focus"`** (sandbox only). **`workspaceCourses: []`** ⇒ no product modules (preset ignored).

**Legacy preset:** `organizations.settings.workspaceNavPreset` (`"default"` \| `"sandbox_live_focus"`) still applies when **`workspaceCourses` is absent** — `sandbox_live_focus` enables sandbox-only strip (nav label **Sandbox** → `/sandboxlive`). With explicit non-empty `workspaceCourses`, preset is ignored for nav/guards.

**Redirects:** `(dashboard)/program/layout.tsx`, `(dashboard)/safestart/layout.tsx`, and `(dashboard)/sandboxlive/layout.tsx` redirect when the org lacks the corresponding course entitlement.

---

## Route groups and prefixes (`proxy.ts`)

| Prefix | Shell | Notes |
|--------|--------|------|
| `/dashboard`, `/dashboard/*` | Yes | Hub, teaching, onboarding steps |
| `/welcome` | Yes | Full onboarding checklist |
| `/onboarding` → rewrites | Yes | Friendly URLs to `/dashboard/onboarding/*` |
| `/admin/*` | Yes | Staff: onboarding console, leaders index, design tokens |
| `/program`, `/program/*` | Yes | Safety / Sandbox template previews; `program/layout` redirects to `/sandboxlive` when org `workspaceNavPreset` is `sandbox_live_focus` |
| `/agent-runtime` | Yes | Staff agent runtime (`(studio)` segment may add its own layout; marketing chrome still suppressed when flagged) |
| `/sandboxlive`, `/sandboxlive/*` | Yes | SandboxLive product: phases 01–08, cohort, recipes, sponsor oversight, org admin |
| `/safestart`, `/safestart/*` | Yes | SafeStart product: numbered workspaces, guidebook; `safestart/layout` redirects to `/sandboxlive` when org preset is `sandbox_live_focus` |
| `/leader`, `/leader/*` | Yes except `/leader/apply` | Leader workspace; apply route uses marketing chrome |
| `/future-plan` | Yes | Prefix reserved in proxy (alias routing if present) |

---

## Product homes (editorial register)

| Route | Product context label | Sidebar sections (labels) |
|-------|------------------------|----------------------------|
| `/sandboxlive` and deep links | **SandboxLive** (amber pill) | **Phases** (numbered 01–08), **Cohort**, optional **Organization** (admins) |
| `/safestart` | **SafeStart** | **Engagement** (numbered workspaces), **Artifact** (guidebook) |
| `/leader` (excl. apply) | **Leader** | **Author reflection** (numbered rows + publish items), **Publish** |

General workspace (`/dashboard`, `/welcome`, `/program`, `/admin/...`, teaching) shows **no** product pill; horizontal links remain for Program, Teaching library, Onboarding, and staff Admin links.

---

## Authenticated routes (customer- and staff-facing)

### Workspace hub & onboarding

- `/dashboard` — Overview modules (editorial cards, hairline borders, tertiary “Open →” in amber).
- `/welcome` — Onboarding checklist (loading skeleton uses square/hairline treatment).
- `/dashboard/onboarding/[step]`, `/dashboard/onboarding/leader/[step]` — Step flows; copy should stay editorial (no raw “coming soon” in customer-visible branches).
- `/onboarding/*` — Rewritten to dashboard onboarding paths.

### Teaching

- `/dashboard/teaching/claude-skills` — `ClaudeSkillsTeachingGuide`: **no** duplicate sticky midnight bar; shell header only. In-page TOC: **3px** amber active border, **13px** Inter labels, **12px** vertical padding per item.

### Program (Stitch previews)

- `/program` — Template index.
- `/program/safety/[templateId]`, `/program/sandbox/[templateId]` — Fixture-driven previews.

### SandboxLive

- `/sandboxlive` — Product home.
- `/sandboxlive/phase/[slug]` — Phase workspaces (01–08).
- `/sandboxlive/phase/08-future-plan`, `/edit`, `/export` — Future Plan surface and board export; export gaps use **`EditorialEmptyState`** (`ExportDraftGap`), not engineering placeholders.
- `/sandboxlive/recipes`, `/sandboxlive/cohort`, `/sandboxlive/sponsor-oversight` — Cohort surfaces; cohort list empty state uses **`EditorialEmptyState`**.
- `/sandboxlive/org`, `/members`, `/settings`, `/agreements`, `/billing` — Org admin; primary actions use **`Record …`** language and **`pathway`** buttons; inputs use **`rounded-none`**.

### SafeStart

- `/safestart` — Engagement home.
- `/safestart/[workspace]` — Workspace pages.
- `/safestart/ratification`, `/safestart/ratification/[step]` — Ratification flow.
- `/safestart/guidebook` — Guidebook (editorial; references Safety field guide architecture in copy).

### Leader workspace

- `/leader` — Overview and reflected-understanding essay anchor.
- `/leader/calling`, `/work`, `/voice`, `/where-it-lives`, `/network`, `/gaps` — Section pages; corpus gaps use **`EditorialEmptyState`**.
- `/leader/public-page` — Ratification client: **pathway** primaries, non–save/cancel dialog language (“Close editor”, “Not now”, “Keep published”, “Record a preview without publishing”). Public URLs: **`DashboardPublicSiteLink`** for `/movement-voice-commitments`, `/voices`, and live absolute URL when configured.
- `/leader/public-page/history` — Version list; empty state uses **`EditorialEmptyState`**.
- `/leader/sign-commitments` — Signing; public doc link uses **`DashboardPublicSiteLink`**; primary submit uses **`pathway`**; confirmation message is editorial.

### Staff / admin

- `/admin/onboarding` — Staff onboarding table.
- `/admin/leaders` — Leader index; empty tables use **`EditorialEmptyState`** (no “tables not migrated” phrasing).
- `/admin/design-tokens` — Token preview; `movemental-midnight` swatch hex **#141110**.

---

## Public site ↔ dashboard continuity

- **Marketing `/` header CTA** (`SiteHeaderCta`): Authenticated users with **both** org membership and leader workspace see **Leader workspace** as the primary pill and organization dashboard as secondary; org-only see dashboard CTA; leader-only see Leader CTA.
- **In-dashboard public references** use **`DashboardPublicSiteLink`** (amber hairline link) for routes such as `/movement-voice-commitments` and `/voices` where called for in product copy.

---

## Empty states

Customer-visible empty and “not yet” surfaces should use **`EditorialEmptyState`** (`src/components/authenticated/editorial-empty-state.tsx`) or the export-specific **`ExportDraftGap`** built on it — not dashed engineering boxes or bare “No data” lines.

---

## Design tokens touched by alignment

| Token | Role |
|-------|------|
| `--color-movemental-midnight` / `bg-movemental-midnight` | Warm midnight header + sidebar |
| `--color-pathway-accent` | Burnished amber: CTAs, active sidebar, progress rail fill |
| `--color-rule` / `--rule` | Hairline editorial rules on paper (use with `border-[0.5px]`) |

---

## Change control

When adding a new authenticated prefix, update **`proxy.ts`** (`AUTHENTICATED_PATH_PREFIXES`) and this inventory. When adding a new product shell, update **`resolveAuthenticatedShellContext`** and sidebar builders under `src/lib/authenticated/` and `src/lib/sandboxlive/`.
