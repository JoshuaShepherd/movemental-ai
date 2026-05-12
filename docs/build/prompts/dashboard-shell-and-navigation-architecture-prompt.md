# Agent prompt — dashboard shell, navigation architecture, and gap closure (Movemental workspace)

> **Outcome.** A Cursor agent can read this document as the **single ordered brief** for how the authenticated **workspace** should be structured, how users should move through it, and how to close the gap between **today’s implementation** and that target—without inventing parallel route trees or breaking movement-leader vs implementation-org contracts already documented elsewhere.
>
> **Repo scope.** Execute in **`movemental-ai`** (`src/app/(dashboard)/`, `src/components/authenticated/`, `proxy.ts`, onboarding/program/sandboxlive libs). For a **separate dashboard app** repo, see [`movemental-dashboard-ui-parity-prompt.md`](./movemental-dashboard-ui-parity-prompt.md); this prompt still defines the **canonical IA and shell model** the main app should converge on.

---

## 0. Read before writing code

1. [`CLAUDE.md`](../../../CLAUDE.md) — `(dashboard)` route group, six-layer chain, semantic tokens, `proxy.ts` (not `middleware.ts`), pnpm only.
2. [`docs/design/DESIGN.md`](../../design/DESIGN.md) — authenticated surfaces still use semantic tokens; avoid competing “mini design systems” inside nested shells unless product explicitly requires it.
3. [`docs/build/strategy/movement-leaders-as-ecosystem-layer.md`](../strategy/movement-leaders-as-ecosystem-layer.md) — **Leader workspace** is definition + practitioner fit, not a fourth audience funnel; nav must not collapse “trusted voices” into org-audience parity cards.
4. Internal product vision (widgets/metrics aspiration): [`docs/business-docs/03_brand_positioning/website-vision/pages/dashboard-overview.md`](../../business-docs/03_brand_positioning/website-vision/pages/dashboard-overview.md).
5. Persona-specific dashboard behavior (do not regress): [`build-implementation-org-dashboard-architecture.md`](./build-implementation-org-dashboard-architecture.md), [`movement-leader-onboarding-flow.md`](./movement-leader-onboarding-flow.md).
6. **Current shell implementation:**
   - `src/app/(dashboard)/layout.tsx` — auth gate, org membership / leader exception, onboarding progress, delegates sidebar for SandboxLive.
   - `src/components/authenticated/authenticated-shell.tsx` — global header, org switcher, optional product sidebar, onboarding progress rail.
   - `src/lib/authenticated/product-context.ts` — maps **pathname prefixes** → `productContext` + static sidebar sections.
   - `proxy.ts` — `x-pathname`, `x-dashboard-org-slug`, `x-movemental-shell` for authenticated prefixes.
7. Reconnaissance (may be partially stale on filenames; verify in tree): [`docs/build/notes/authenticated-dashboard-surface-audit.md`](../notes/authenticated-dashboard-surface-audit.md).

---

## 1. Target architecture (full stack view)

### 1.1 Conceptual layers

| Layer | Responsibility | Movemental direction |
|-------|----------------|----------------------|
| **L0 — Platform** | Auth (Supabase SSR), session refresh, marketing vs workspace chrome | `proxy.ts` + root `layout.tsx` choose shell via `x-movemental-shell`. |
| **L1 — Workspace shell** | One persistent chrome: identity, org context, global wayfinding, support entry | **`AuthenticatedShell`** (or successor): header + optional **primary** nav + optional **in-product** sidebar + progress rail when applicable. |
| **L2 — Workspace home** | Post-login **command center**: orientation, next actions, module entry | **`/dashboard`** — should evolve from “three cards” to **tasks + metrics + module routing** per vision doc (§4 gap). |
| **L3 — Product modules** | Coherent vertical slices (SandboxLive, SafeStart, Program library, Leader, Teaching, Admin, Studio) | Each module owns **sectional IA** (sidebar or in-page tabs) and **does not** re-implement a second global header that fights L1. |
| **L4 — Data & permissions** | Org resolution, RLS, staff vs member, persona flags | Central services (`resolveActiveOrganizationId`, `resolveDashboardPersona`, onboarding service); **no** ad-hoc slug checks in leaf components. |
| **L5 — Observability & flags** | Module rollout, experiments, tenant theming | PostHog / feature flags as needed; keep **URLs stable** across personas. |

### 1.2 Ideal **navigational** architecture (IA)

Think in **three tiers** so users never wonder “which chrome is authoritative?”

**Tier A — Global workspace (always in shell header)**

- **Brand / home** → `/dashboard` (workspace home, not marketing `/`).
- **Org & identity** — org switcher (`?org=` contract), optional “Leader workspace” entry when applicable, email, sign out.
- **Primary destinations** — short list of **modules**, not every deep link:
  - **Program** (`/program`) — template library (Safety + Sandbox previews).
  - **SandboxLive** (`/sandboxlive` and children) — phased engagement product.
  - **SafeStart** (`/safestart` and children) — safety / ratification product lane.
  - **Onboarding** — compact checklist panel + `/welcome` full view.
  - **Teaching** — e.g. `/dashboard/teaching/claude-skills` (or a `/teaching` alias if product standardizes).
  - **Staff** — `/admin/onboarding`, `/admin/leaders`, `/admin/design-tokens`, and **`/agent-runtime`** (today in `(studio)`; ideally discoverable from staff nav when allowed).
- **Help** — single entry (docs, concierge, or mailto) once product defines it; placeholder ok if gated by flag.

**Tier B — Product context (header badge + optional sidebar)**

- When pathname is inside a product prefix, show **product label** (SandboxLive, SafeStart, Leader) and **section sidebar** (phases, cohort tools, leader reflection steps).
- Sidebar items are **manifest-driven** where possible (`sandboxlive-sidebar.ts`, phase manifests, leader sidebar constant) so new phases do not require shell edits.

**Tier C — Page-local navigation**

- Tabs, steppers, and wizards **inside** the main content column (e.g. ratification steps, onboarding task shell).

**Routing principles**

- **One workspace route group** for customer/staff tools that share auth + org: `(dashboard)` (plus `(studio)` only while agent-runtime remains a separate layout—see gap §4).
- **Stable URLs** for onboarding (`/onboarding/...` rewrites to `/dashboard/onboarding/...` per `next.config.ts`).
- **Org context** travels via **`?org=<slug>`**; server reads `x-dashboard-org-slug` from middleware for SSR decisions (SandboxLive org-admin sidebar).

### 1.3 Information architecture map (target)

```text
/dashboard                    ← Workspace home (metrics, tasks, modules)
/welcome                      ← Full onboarding checklist
/onboarding/*                 ← Task deep links (rewritten)
/program, /program/safety/*, /program/sandbox/*
/sandboxlive, /sandboxlive/phase/*, /sandboxlive/org/*, …
/safestart, /safestart/*, /safestart/guidebook
/leader, /leader/*            ← Leader workspace (exception: /leader/apply public when shipped)
/dashboard/teaching/*
/admin/*                      ← Staff surfaces
/agent-runtime                ← Staff agent tooling (today: separate layout; target: linked from staff nav)
```

---

## 2. Where we are today (as-built summary)

### 2.1 What already matches the target

- **Single consolidated shell** — `AuthenticatedShell` replaced stacked `DashboardShell` + `ProgramShell` footguns (see comment in `authenticated-shell.tsx`).
- **Path-based product sidebars** — SandboxLive (dynamic org-admin section), SafeStart, Leader resolve via `resolveAuthenticatedShellContext` + `buildSandboxLiveSidebarSections` / `buildSafeStartSidebarSections`.
- **Org switching** — Header dropdown + `DashboardOrgProvider`; `proxy.ts` passes slug into headers for server layouts.
- **Persona-aware workspace home** — `/dashboard` adjusts module order/copy via `resolveDashboardContextForSessionUser` + `destinationsForPersona` (`dashboard/page.tsx`).
- **Onboarding rail** — Progress + editorial label for org vs leader paths in `(dashboard)/layout.tsx`.
- **Leader-only accounts** — Layout allows leader paths without org membership when a `movement_leaders` row exists (see `isLeaderWorkspacePath`).

### 2.2 What is partial or fragmented

| Area | As-built behavior | Why it matters |
|------|-------------------|----------------|
| **Workspace home depth** | `/dashboard` is mostly **three destination cards** + eyebrow copy. | Vision doc expects **metrics, tasks, quick actions, announcements**—none of that is wired as first-class UI yet. |
| **Global module discovery** | Tier A nav is **minimal horizontal links** when `productContext` is null; entering SandboxLive/SafeStart hides those links in favor of product badge only. | Users on a product surface lose **one-click** access to Program / Teaching / Welcome unless they go home first—acceptable short-term, poor long-term operability. |
| **`ProductContext` type vs resolver** | `AuthenticatedShell` defines `recipes` and `future-plan` labels; **`product-context.ts` never returns those contexts** (Future Plan lives under SandboxLive phase `08-future-plan`). | Dead enum arms / confusion for future agents; either wire routes or delete unused variants. |
| **`/future-plan` in `proxy.ts`** | Prefix listed for authenticated shell; **no matching route group** under `src/app` (grep confirms). | Either implement standalone future-plan shell or **remove prefix** to avoid implying a product that does not exist. |
| **Studio vs dashboard** | `/agent-runtime` uses **`(studio)/layout.tsx`**, not `AuthenticatedShell`. | Staff experience is **split chrome**; not linked from main header (audit noted direct URL only). |
| **Nested visual systems** | Program + some teaching pages still embed **midnight / safestart** mini-chrome inside workspace content. | Works for demos but conflicts with DESIGN.md “one product” feel; track as UI debt. |
| **Documentation drift** | `authenticated-dashboard-surface-audit.md` still references **`DashboardShell`** and “no sidebar.” | Misleads agents; update audit or add banner pointing to this prompt. |

---

## 3. Gap statement (vision vs code)

Use this table when scoping work; each row should become a ticket or a single PR slice.

| Vision / target (`dashboard-overview.md` §Component Map) | Current repo | Gap severity |
|------------------------------------------------------------|--------------|--------------|
| Global header: tenant switcher, **notifications**, **help**, **profile** menu | Org switcher + email + sign out; staff links inline | **Medium** — missing notifications/help/profile pattern |
| Metric tiles (revenue, reach, cadence, AI QA) | Not on `/dashboard` | **High** — needs data layer + widgets + permission matrix |
| Task list (personalized, cross-module) | Onboarding tasks exist in API/panel, not unified “task inbox” on home | **High** — product decision: unify vs deep-link only |
| Quick actions (Create content, Media lab, etc.) | Card links only; no action row | **Medium** — depends on shipped modules |
| Connectedness / collaboration strip | Not present | **High** — depends on graph/social data |
| Announcements & resources | Not present | **Low–Medium** — could be static first |
| Modular tenant theming | Persona copy + some tokens; no theme switcher per tenant | **Low** for v1 |
| Feature flags for modules | Not centralized in nav config | **Medium** — introduce `nav-modules.ts` driven by flags |

---

## 4. Step-by-step solution (for a Cursor agent)

Execute **in order**. After each step, run **`pnpm typecheck`** and **`pnpm lint`**; add tests when touching permission or pathname resolution.

### Step 1 — Reconcile truth: headers, prefixes, and enums

1. Read `proxy.ts` `AUTHENTICATED_PATH_PREFIXES` and compare to **every** `src/app/(dashboard)/` top-level segment (program, sandboxlive, safestart, leader, dashboard, welcome, admin, …).
2. For each prefix, confirm: `(dashboard)/layout.tsx` runs, `x-movemental-shell` is set, and `resolveAuthenticatedShellContext` returns the intended `productContext` + sidebar (or explicit `null`).
3. **Decision record in code comments:** Either add a `README` block above `AUTHENTICATED_PATH_PREFIXES` *or* a short `docs/build/notes/dashboard-route-prefix-matrix.md` listing prefix → layout → productContext.
4. Fix **drift**:
   - Remove `/future-plan` from `proxy.ts` **or** add a real route + resolver that uses `productContext: "future-plan"` (prefer nesting under `/sandboxlive` unless product demands top-level).
   - In `authenticated-shell.tsx`, **remove unused `ProductContext` variants** *or* implement matching branches in `product-context.ts`—do not leave zombie labels.

**Stop condition:** Grep for `ProductContext` and `AUTHENTICATED_PATH_PREFIXES` shows no orphan cases.

### Step 2 — Introduce a single **workspace nav config** (data, not JSX soup)

**Goal:** Tier A links are declared once (labels, `href`s, `requiredRole`, `featureFlag`, `personaVisibility`).

1. Add e.g. `src/lib/authenticated/workspace-primary-nav.ts` exporting a typed array of nav items.
2. `AuthenticatedShell` maps that array to links (desktop) + optional overflow menu (mobile).
3. When `productContext !== null`, decide UX with product:
   - **Option A (recommended):** Always show a compact **“Workspace”** menu (popover or mega-dropdown) holding Tier A links so product surfaces are not orphaned.
   - **Option B:** Persist horizontal links under the product badge (may crowd header).

**Stop condition:** From `/sandboxlive/phase/01-…`, user can reach `/program` and `/welcome` in **two clicks or fewer** without manually editing the URL.

### Step 3 — Deepen `/dashboard` without forking routes

**Goal:** Move toward `dashboard-overview.md` while respecting [`build-implementation-org-dashboard-architecture.md`](./build-implementation-org-dashboard-architecture.md) (same URLs; persona differences are copy + ordering + visibility).

1. Add **server-loaded sections** behind feature flags or “empty state” placeholders:
   - **Next tasks** — reuse onboarding task query with **top N incomplete** items + link to `/welcome?org=…`.
   - **Metrics** — start with **one** real metric + skeleton cards for the rest (avoid fake numbers).
2. Keep **module cards** as secondary grid below the fold if helpful.
3. Ensure **`implementation_org`** vs **`movement_leader`** differences remain **server-side** (reuse `resolveDashboardContextForSessionUser` / persona helpers).

**Stop condition:** `/dashboard` renders real task rows when onboarding incomplete; shows honest empty states when APIs missing—no lorem metrics.

### Step 4 — Unify staff discovery for `/agent-runtime`

1. Confirm `isUserStaff` gate in `(studio)/layout.tsx` matches staff checks used in `AuthenticatedShell` (`showAdminLink`).
2. Add a **staff-only** nav item from workspace nav config: “Agent runtime” → `/agent-runtime`.
3. Optionally wrap `(studio)` content in a **slim** variant of the same header (shared component props) so staff do not feel they left the product—**do not** duplicate org switcher logic; extract shared header primitives if needed.

**Stop condition:** Staff can reach agent runtime from the shell without memorizing the URL.

### Step 5 — Sidebar extensibility contract

1. Document in `product-context.ts` header comment: **when to add a pathname branch** vs **when to push sidebar building into the product’s server layout** (e.g. per-user Leader sections).
2. If a product needs dynamic sidebars, add `resolveXSidebar(user, org): AuthenticatedSidebarSection[]` next to that product’s lib—not inside `AuthenticatedShell`.

**Stop condition:** New phase in `SANDBOXLIVE_PHASES` does not require shell code changes (already true—verify stays true).

### Step 6 — Nested chrome / token audit (polish pass)

1. Inventory pages that render **second midnight headers** inside content (`ProgramShell`, teaching guide, etc.).
2. For each, either:
   - Align to **workspace content tokens** (`bg-section`, `bg-card`, `text-foreground`), or
   - Document an explicit **exception** in DESIGN.md appendix with a path list (preferred over silent drift).

**Stop condition:** `design-audit` skill or manual pass finds no unexplained raw hex / duplicate global nav bars.

### Step 7 — Documentation hygiene

1. Update [`authenticated-dashboard-surface-audit.md`](../notes/authenticated-dashboard-surface-audit.md): replace `DashboardShell` with `AuthenticatedShell`, document sidebars, `/sandboxlive` tree, `(studio)`.
2. Add a one-line link from [`dashboard-overview.md`](../../business-docs/03_brand_positioning/website-vision/pages/dashboard-overview.md) to this prompt under Dependencies (optional—only if editors agree vision doc may reference engineering prompts).

**Stop condition:** A new agent reading the audit is not misled about sidebars or shell names.

---

## 5. Compatibility gates (non-regression)

| Gate | Check |
|------|--------|
| G1 | Movement-leader org: onboarding panel + task routes match [`movement-leader-onboarding-flow.md`](./movement-leader-onboarding-flow.md); leader workspace paths unchanged. |
| G2 | Implementation org: persona copy + module ordering per [`build-implementation-org-dashboard-architecture.md`](./build-implementation-org-dashboard-architecture.md). |
| G3 | No second parallel `(dashboard-*)` route tree for persona—**same URLs**. |
| G4 | `proxy.ts` matcher still refreshes Supabase session; `x-pathname` / `x-dashboard-org-slug` present on all authenticated layouts that read them. |
| G5 | `pnpm typecheck` + `pnpm lint` green. |

---

## 6. Explicit non-goals (this architecture pass)

- Building **Content OS**, **Media Lab**, or full **analytics warehouse** widgets—only stub hooks or empty states unless data contracts exist.
- Replacing Supabase auth or merging `(studio)` into `(dashboard)` **without** a dedicated security review.
- Changing **public marketing** IA (`(site)` nav)—out of scope.

---

## 7. Source index

| Document | Use |
|----------|-----|
| This file | Shell + navigation target + gap closure steps |
| [`build-implementation-org-dashboard-architecture.md`](./build-implementation-org-dashboard-architecture.md) | Persona behavior on shared routes |
| [`movemental-dashboard-ui-parity-prompt.md`](./movemental-dashboard-ui-parity-prompt.md) | Separate dashboard app parity |
| [`dashboard-overview.md`](../../business-docs/03_brand_positioning/website-vision/pages/dashboard-overview.md) | Aspirational home dashboard widgets |
| [`authenticated-dashboard-surface-audit.md`](../notes/authenticated-dashboard-surface-audit.md) | Route inventory (update as code changes) |

---

**Execute in order:** (1) prefix/enum truth, (2) workspace nav config + cross-product wayfinding, (3) `/dashboard` depth, (4) staff agent runtime link + optional chrome alignment, (5) sidebar contract doc, (6) nested chrome audit, (7) docs refresh.
