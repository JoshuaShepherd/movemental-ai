# Agent prompt — per-organization workspace course entitlements (nav + access)

> **Outcome.** Operators can configure **which workspace “courses” / products** an organization may use: **Safety**, **Sandbox**, **Skills**, and **Solutions**. Disabled courses **do not appear** in the workspace primary nav (and workspace dropdown when applicable) and **cannot be reached** by direct URL for that org (redirect or safe fallback — match existing `sandbox_live_focus` redirect pattern). Enabled courses behave as they do today.
>
> **Repo scope.** Execute in **`movemental-ai`**: `organizations.settings` (JSONB, no new table required unless product mandates audit columns), onboarding shell loaders, `getWorkspacePrimaryNavItems`, `(dashboard)` segment layouts, `/dashboard` hub tiles, and any product sidebar entry points that assume a module always exists.
>
> **Read first.** [`CLAUDE.md`](../../../CLAUDE.md), [`docs/design/DESIGN.md`](../../design/DESIGN.md), existing nav preset doc [`per-org-workspace-navigation.md`](./per-org-workspace-navigation.md), shell brief [`dashboard-shell-and-navigation-architecture-prompt.md`](./dashboard-shell-and-navigation-architecture-prompt.md).

## Implementation status

**Shipped in repo:** `src/lib/dashboard/workspace-course-entitlements.ts`, `workspace-course-guard.server.ts`, `loadDashboardShellMapsForUser` + `resolveDashboardContextForSessionUser` extensions, `getWorkspacePrimaryNavItems`, `AuthenticatedShell`, `/dashboard` hub filtering, layouts for `program` / `safestart` / `sandboxlive`, placeholder pages `/dashboard/skills` and `/dashboard/solutions`, Vitest unit tests under `tests/unit/lib/dashboard/` and `tests/unit/lib/authenticated/`.

**Decisions:** single `safety` flag for Program + SafeStart; Teaching library always in Tier-A nav; explicit non-empty `workspaceCourses` overrides `workspaceNavPreset`; **opt-in:** missing `workspaceCourses` ⇒ no product modules except legacy **`sandbox_live_focus`** (sandbox only); **`workspaceCourses: []`** ⇒ all modules off (preset ignored). Backfill SQL for existing orgs: see [`per-org-workspace-navigation.md`](./per-org-workspace-navigation.md).

---

## 1. Problem statement

Today, workspace visibility is mostly **binary**:

- **`organizations.settings.workspaceNavPreset`**: `"default"` vs `"sandbox_live_focus"` hides **Program and SafeStart together** and redirects those routes — it does **not** support independent toggles or a four-lane product model.
- **`organizations.settings.dashboardPersona`**: implementation vs movement-leader **framing**; it is **not** a product entitlement model.

**Product ask:** For each organization, **select** among four workspace courses — **Safety**, **Sandbox**, **Skills** (may ship later), **Solutions** (may ship later) — such that:

1. **Navbar / Tier-A workspace list** only shows enabled courses (plus shared items like Onboarding / Teaching only if product says they stay global).
2. **Deep links** to disabled courses for that org are **blocked** the same way bookmarked `/program` is handled under `sandbox_live_focus` (server-side decision using active org + membership).

---

## 2. Canonical course identifiers and route mapping

Define a **small closed enum** in TypeScript (and document the JSON contract) — suggest slug-style IDs stable for ops and SQL:

| Course id | User-facing label (nav) | Primary route prefix(es) today | Notes |
|-----------|-------------------------|----------------------------------|-------|
| `safety` | Align with existing **Program** nav label rules (`programNavLabel` from persona) | `/program`, `/program/*` | **Decision (record in code comments):** Either treat **SafeStart** (`/safestart`, `/safestart/*`) as part of `safety` for one entitlement, **or** split `safety_program` vs `safety_safestart`. **Default recommendation:** one `safety` entitlement gates **both** Program and SafeStart unless product explicitly sells them separately. |
| `sandbox` | SandboxLive / “Sandbox” per existing copy rules | `/sandboxlive`, `/sandboxlive/*` | |
| `skills` | “Skills” (or interim label) | **Placeholder** until a canonical route exists (e.g. `/dashboard/skills/*` or `/skills/*`) | Until shipped: either **omit nav item entirely** or link to a **“coming soon”** gated page only when `skills` is enabled — product choice; document chosen behavior in this file after implementation. |
| `solutions` | “Solutions” | **Placeholder** | Same as `skills`. |

**Teaching library** (`/dashboard/teaching/claude-skills` today): Explicitly decide — **global** (always on for authenticated workspace), **gated by `skills`**, or **separate fifth flag**. The prompt’s default is: **tie Teaching library visibility to `skills` once Skills exists**; until then, **keep current behavior** (still visible in default strip) **or** hide only when `skills` is explicitly false — pick one and implement consistently in nav + dashboard hub.

---

## 3. Data model (`organizations.settings`)

Add a single structured key, for example:

**Option A — allowlist (recommended)**

```json
{
  "workspaceCourses": ["safety", "sandbox"]
}
```

- **Missing key** → **opt-in:** no product modules (`WORKSPACE_COURSES_NONE`), except **`workspaceNavPreset: "sandbox_live_focus"`** still maps to sandbox-only (legacy). **Backfill** SQL for orgs that need Program + Sandbox: see [`per-org-workspace-navigation.md`](./per-org-workspace-navigation.md).
- **Empty array `[]`** → **no product modules** (preset ignored). Onboarding + Teaching library + `/dashboard` remain.

**Option B — explicit booleans**

```json
{
  "workspaceCourseAccess": {
    "safety": true,
    "sandbox": true,
    "skills": false,
    "solutions": false
  }
}
```

Implement **one** option only; document SQL examples for operators in §8.

**Relationship to `workspaceNavPreset`**

- **Preferred:** `workspaceNavPreset: "sandbox_live_focus"` becomes a **preset expander** that sets the allowlist to the same effective set as today (no Program, no SafeStart; Sandbox + shared links), **or** is deprecated after migration with a one-time script/note in ops doc.
- **Required:** No conflicting behavior — if both preset and `workspaceCourses` exist, define **precedence** (e.g. explicit allowlist wins, preset ignored with dev-only warning log).

---

## 4. Resolution and plumbing

1. **Pure resolver module** (e.g. `src/lib/dashboard/workspace-course-entitlements.ts`):
   - Input: `organizations.settings` JSON + optional `organization_type` / slug if defaults depend on them.
   - Output: normalized `Set` or readonly array of enabled `WorkspaceCourseId`.
   - Zod or narrow type guards for invalid strings in JSON (ignore unknown course ids with optional telemetry).

2. **`loadDashboardShellMapsForUser`** (or adjacent onboarding service):
   - Extend the org query payload to include **resolved course entitlements per org slug** (same pattern as `workspaceNavPresetByOrgSlug` / `personaByOrgSlug`).
   - Pass into `(dashboard)/layout.tsx` → `AuthenticatedShell` props.

3. **`getWorkspacePrimaryNavItems`** (`workspace-primary-nav.ts`):
   - Accept **enabled courses** (not only `preset`), build core nav from **filtered** module list + fixed items (Onboarding, Teaching per §2 decision).
   - **Refactor:** `sandbox_live_focus` should either map to entitlements at load time or be removed after parity tests.

4. **Route guards (mandatory)**  
   For each major prefix, add or extend **server** `layout.tsx` (or shared helper called from layouts):
   - `/program` — if `safety` disabled → redirect (e.g. first enabled course hub or `/dashboard?org=` with flash/query reason).
   - `/safestart` — same if SafeStart is under `safety`.
   - `/sandboxlive` — if `sandbox` disabled.
   - Future `/skills`, `/solutions` — when routes exist.

   Reuse **`resolveActiveOrganizationId`**, **`x-dashboard-org-slug`**, and patterns from [`src/app/(dashboard)/program/layout.tsx`](../../../src/app/(dashboard)/program/layout.tsx).

5. **`src/app/(dashboard)/dashboard/page.tsx`**
   - Filter **`destinationsForHub`** (and any persona branches) so tiles match entitlements — no card linking to a blocked route.

6. **`product-context.ts` / sidebars**
   - If user is inside a product path they are not entitled to, guards should run **before** sidebar renders; optionally clear misleading sidebars by redirecting early.

7. **`proxy.ts`**
   - No change required unless product adds new authenticated prefixes that need headers; keep org slug header contract.

---

## 5. Definition of done

- [ ] **Types + resolver** for course ids; unknown JSON does not crash SSR.
- [ ] **Nav + dropdown** (if present) only list enabled courses for the **active** org; switching org in header updates the list.
- [ ] **Direct navigation** to a disabled course with valid session + org context **redirects or blocks** (consistent status/UX with existing program/safestart preset redirects).
- [ ] **`/dashboard`** hub tiles never advertise disabled courses.
- [ ] **Backward compatibility:** Orgs with only `dashboardPersona` / legacy `workspaceNavPreset` behave as today until settings are migrated.
- [ ] **Docs:** This file’s §8 updated with example `UPDATE organizations …` SQL; link from [`per-org-workspace-navigation.md`](./per-org-workspace-navigation.md) if preset is superseded or aliased.
- [ ] **Tests:** Unit tests for resolver + `getWorkspacePrimaryNavItems` matrix; at least one integration or layout test for “disabled safety → `/program` redirects”.

---

## 6. QA checklist (manual)

- [ ] Org A: only `sandbox` → sees Sandbox in nav, not Program/SafeStart; `/program` redirects.
- [ ] Org B: `safety` + `sandbox` → full parity with current default strip (labels per persona).
- [ ] Org C: legacy `workspaceNavPreset: sandbox_live_focus`, no new key → same as today after migration rules applied.
- [ ] Staff links unchanged and still gated by `showStaff`.
- [ ] Leader workspace paths (if any share these modules) do not leak disabled products.

---

## 7. Operational — example SQL (Supabase)

After implementation, operators merge into `settings` (allowlist example):

```sql
UPDATE organizations
SET settings = COALESCE(settings, '{}'::jsonb)
  || jsonb_build_object(
    'workspaceCourses', jsonb_build_array('sandbox', 'skills')
  )
WHERE slug = 'your-org-slug';
```

To remove explicit gating and fall back to resolver defaults (if defaults = all shipped courses):

```sql
UPDATE organizations
SET settings = settings - 'workspaceCourses'
WHERE slug = 'your-org-slug';
```

Adjust key/array name to match the implemented Option A/B.

---

## 8. Non-goals (unless separately scoped)

- Stripe / plan-driven auto-provisioning of entitlements (can read same JSON from a future webhook).
- RLS redesign — org membership stays as today; this is **workspace routing + nav**, not row-level course enrollment.
- Renaming all marketing “SafeStart” copy — only **access + nav**.

---

## 9. Related files (verify paths after refactors)

- `src/lib/authenticated/workspace-primary-nav.ts`
- `src/lib/dashboard/workspace-nav-preset.ts`
- `src/lib/services/onboarding/onboarding.service.ts`
- `src/app/(dashboard)/layout.tsx`
- `src/components/authenticated/authenticated-shell.tsx`
- `src/app/(dashboard)/dashboard/page.tsx`
- `src/app/(dashboard)/program/layout.tsx`, `src/app/(dashboard)/safestart/layout.tsx`, `(dashboard)/sandboxlive/...` layout chain
- `docs/build/prompts/per-org-workspace-navigation.md` — update when preset is folded into entitlements

---

## 10. Open questions for the implementing agent (resolve before merge)

1. **SafeStart vs Program:** single `safety` flag or two product lines?
2. **Skills vs Teaching library** until Skills ships: shared flag, separate, or teaching stays global?
3. **Empty allowlist** semantics and **default** when key is missing (full vs minimal safe default).

Record answers in a short “Decisions” subsection at the top of this file or in the PR description.
