# Prompt: Per-organization workspace navigation (what each org “should” see)

**Problem statement:** Some orgs (e.g. Youth Front / SandboxLive-first) should not see the full **Program** + **SafeStart** strip when the engagement is not a full Safety / SafeStart arc.

**Shipped:** Tier-A nav and guards use **`organizations.settings.workspaceCourses`** (string[] allowlist: `safety`, `sandbox`, `skills`, `solutions`) via [`resolveWorkspaceCourseEntitlements`](../../src/lib/dashboard/workspace-course-entitlements.ts), with legacy **`workspaceNavPreset`** (`"default"` \| `"sandbox_live_focus"`) folded in when `workspaceCourses` is absent. Nav: [`getWorkspacePrimaryNavItems`](../../src/lib/authenticated/workspace-primary-nav.ts). Data: [`loadDashboardShellMapsForUser`](../../src/lib/services/onboarding/onboarding.service.ts) → [`(dashboard)/layout.tsx`](../../src/app/(dashboard)/layout.tsx) → [`AuthenticatedShell`](../../src/components/authenticated/authenticated-shell.tsx). Redirects: [`(dashboard)/program/layout.tsx`](../../src/app/(dashboard)/program/layout.tsx), [`(dashboard)/safestart/layout.tsx`](../../src/app/(dashboard)/safestart/layout.tsx), [`(dashboard)/sandboxlive/layout.tsx`](../../src/app/(dashboard)/sandboxlive/layout.tsx).

**Granular four-course entitlements (Safety / Sandbox / Skills / Solutions):** not covered by persona or preset alone — see [`per-org-workspace-course-entitlements.md`](./per-org-workspace-course-entitlements.md).

---

## Operational — set or change an org in Supabase (SQL)

Merge into existing `settings` JSON (replace `your-org-slug` with the real `organizations.slug`):

**Legacy SandboxLive-first strip** (same effect as before `workspaceCourses` existed):

```sql
UPDATE organizations
SET settings = COALESCE(settings, '{}'::jsonb)
  || jsonb_build_object(
    'workspaceNavPreset', 'sandbox_live_focus',
    'dashboardPersona', 'implementation_org'
  )
WHERE slug = 'your-org-slug';
```

**Explicit four-course allowlist** (overrides preset when non-empty; **required** for Program/SandboxLive/SafeStart unless `sandbox_live_focus` alone should enable sandbox):

```sql
UPDATE organizations
SET settings = COALESCE(settings, '{}'::jsonb)
  || jsonb_build_object(
    'workspaceCourses', jsonb_build_array('sandbox', 'skills'),
    'dashboardPersona', 'implementation_org'
  )
WHERE slug = 'your-org-slug';
```

**Backfill** orgs that should keep the old implicit “safety + sandbox” strip:

```sql
UPDATE organizations
SET settings = COALESCE(settings, '{}'::jsonb)
  || jsonb_build_object('workspaceCourses', jsonb_build_array('safety', 'sandbox'))
WHERE settings->'workspaceCourses' IS NULL
  AND (settings->>'workspaceNavPreset' IS NULL OR settings->>'workspaceNavPreset' <> 'sandbox_live_focus');
```

To drop only the allowlist (resolver: no modules unless `sandbox_live_focus` preset):

```sql
UPDATE organizations
SET settings = settings - 'workspaceCourses'
WHERE slug = 'your-org-slug';
```

To drop the preset key (revert preset-driven strip):

```sql
UPDATE organizations
SET settings = settings - 'workspaceNavPreset'
WHERE slug = 'your-org-slug';
```

---

## How navigation is controlled (no MCP magic)

1. **Application code** reads org rows from Supabase; MCP is not the source of truth for nav shape.
2. **`resolveWorkspaceCourseEntitlements`** (`src/lib/dashboard/workspace-course-entitlements.ts`) — **`workspaceCourses`** is opt-in; legacy **`workspaceNavPreset: sandbox_live_focus`** still enables sandbox-only when the array is absent; empty **`[]`** means no product modules.
3. **`getWorkspacePrimaryNavItems`** — builds Tier-A links from entitlements (Program + SafeStart when `safety`; SandboxLive when `sandbox`; Skills/Solutions when enabled; always Onboarding + Teaching library).
4. **`loadDashboardShellMapsForUser`** returns `personaByOrgSlug`, `workspaceNavPresetByOrgSlug` (legacy / introspection), and **`workspaceCoursesByOrgSlug`** → [`(dashboard)/layout.tsx`](../../src/app/(dashboard)/layout.tsx) → [`AuthenticatedShell`](../../src/components/authenticated/authenticated-shell.tsx).
5. **Route guards:** [`(dashboard)/program/layout.tsx`](../../src/app/(dashboard)/program/layout.tsx), [`(dashboard)/safestart/layout.tsx`](../../src/app/(dashboard)/safestart/layout.tsx), [`(dashboard)/sandboxlive/layout.tsx`](../../src/app/(dashboard)/sandboxlive/layout.tsx); Skills/Solutions gated in their pages under `/dashboard/skills` and `/dashboard/solutions`.

---

## Design history (options A–C)

The original preset-only shape is documented above. **Granular courses** use Option A (`workspaceCourses` string array) plus preset as fallback when the array is absent.

---

## Concrete behavior for `sandbox_live_focus` (unchanged when no explicit `workspaceCourses`)

1. **Program / SafeStart:** Hidden from the workspace strip; `/program` and `/safestart` redirect away (now unified with **`safety: false`** entitlements).
2. **Sandbox:** Nav label **Sandbox** (product pill can still read SandboxLive).
3. **Onboarding:** Link to `/welcome` remains.
4. **Dashboard:** [`dashboard/page.tsx`](../../src/app/(dashboard)/dashboard/page.tsx) uses **`isSandboxLiveFirstHub`** (implementation org + no safety + sandbox) for the same hub ordering as before.

---

## QA checklist

- [ ] Switch org in header: nav updates to that org’s entitlements.
- [ ] Staff users: staff links still appear after the core list.
- [ ] Bookmarked `/program` or `/safestart` with `safety` off redirects to first available module (`/sandboxlive` or `/dashboard`).
- [ ] `workspaceCourses` explicit array overrides `workspaceNavPreset`.

---

## Related files

- `src/lib/dashboard/workspace-course-entitlements.ts`
- `src/lib/dashboard/workspace-course-guard.server.ts`
- `src/components/authenticated/authenticated-shell.tsx`
- `src/lib/authenticated/workspace-primary-nav.ts`
- `src/lib/dashboard/workspace-nav-preset.ts`
- `src/lib/dashboard/dashboard-persona.ts`
- `src/lib/services/onboarding/onboarding.service.ts`
- `src/app/(dashboard)/layout.tsx`
- `src/app/(dashboard)/program/layout.tsx`, `src/app/(dashboard)/safestart/layout.tsx`, `src/app/(dashboard)/sandboxlive/layout.tsx`
- `src/app/(dashboard)/dashboard/page.tsx`
- `src/app/(dashboard)/dashboard/skills/page.tsx`, `src/app/(dashboard)/dashboard/solutions/page.tsx`
