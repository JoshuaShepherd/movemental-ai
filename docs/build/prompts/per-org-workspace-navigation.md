# Prompt: Per-organization workspace navigation (what each org “should” see)

**Problem statement:** Some orgs (e.g. Youth Front / SandboxLive-first) should not see the full **Program** + **SafeStart** strip when the engagement is not a full Safety / SafeStart arc.

**Shipped:** `organizations.settings.workspaceNavPreset` (`"default"` \| `"sandbox_live_focus"`). Resolver: [`src/lib/dashboard/workspace-nav-preset.ts`](../../src/lib/dashboard/workspace-nav-preset.ts). Nav: [`getWorkspacePrimaryNavItems`](../../src/lib/authenticated/workspace-primary-nav.ts). Data: [`loadDashboardShellMapsForUser`](../../src/lib/services/onboarding/onboarding.service.ts) → [`(dashboard)/layout.tsx`](../../src/app/(dashboard)/layout.tsx) → [`AuthenticatedShell`](../../src/components/authenticated/authenticated-shell.tsx). Redirects: [`(dashboard)/program/layout.tsx`](../../src/app/(dashboard)/program/layout.tsx), [`(dashboard)/safestart/layout.tsx`](../../src/app/(dashboard)/safestart/layout.tsx).

---

## Operational — set or change an org in Supabase (SQL)

Merge into existing `settings` JSON (replace `your-org-slug` with the real `organizations.slug`):

```sql
UPDATE organizations
SET settings = COALESCE(settings, '{}'::jsonb)
  || jsonb_build_object(
    'workspaceNavPreset', 'sandbox_live_focus',
    'dashboardPersona', 'implementation_org'
  )
WHERE slug = 'your-org-slug';
```

To drop the preset key (revert to default strip):

```sql
UPDATE organizations
SET settings = settings - 'workspaceNavPreset'
WHERE slug = 'your-org-slug';
```

---

## How navigation is controlled (no MCP magic)

1. **Application code** reads org rows from Supabase; MCP is not the source of truth for nav shape.
2. **`getWorkspacePrimaryNavItems`** — when **`preset === "sandbox_live_focus"`**, Program and SafeStart are omitted; first link is **Sandbox** → `/sandboxlive`. Staff links still append when `showStaff` is true.
3. **`loadDashboardShellMapsForUser`** returns `personaByOrgSlug` and `workspaceNavPresetByOrgSlug` in one query. **`loadDashboardPersonaMapForUser`** remains a thin wrapper for callers that only need persona.
4. **Persona** still comes from `organizations.settings.dashboardPersona` and `organization_type` / slug rules in [`dashboard-persona.ts`](../../src/lib/dashboard/dashboard-persona.ts). The Program label (`Safety & Sandbox` vs `Program`) is unused when the preset omits Program.

---

## Design history (options A–C)

The implemented shape matches **Option C (hybrid)**: code defines the `sandbox_live_focus` list; the org row stores the preset key in JSON. Options A/B in earlier drafts are superseded by this file for ops purposes.

---

## Concrete behavior for `sandbox_live_focus`

1. **Program / SafeStart:** Hidden from the workspace strip; `/program` and `/safestart` redirect to `/sandboxlive?org=…`.
2. **Sandbox:** Nav label **Sandbox** (product pill can still read SandboxLive).
3. **Onboarding:** Link to `/welcome` remains.
4. **Dashboard:** [`dashboard/page.tsx`](../../src/app/(dashboard)/dashboard/page.tsx) foregrounds schedule, `/assess`, Sandbox hub, teaching, and demoted onboarding for `implementation_org` + `sandbox_live_focus`.

---

## QA checklist

- [ ] Switch org in header: nav updates to that org’s preset.
- [ ] Staff users: staff links still appear after the core list.
- [ ] Bookmarked `/program` or `/safestart` with `sandbox_live_focus` redirects to SandboxLive with `?org=`.

---

## Related files

- `src/components/authenticated/authenticated-shell.tsx`
- `src/lib/authenticated/workspace-primary-nav.ts`
- `src/lib/dashboard/workspace-nav-preset.ts`
- `src/lib/dashboard/dashboard-persona.ts`
- `src/lib/services/onboarding/onboarding.service.ts`
- `src/app/(dashboard)/layout.tsx`
- `src/app/(dashboard)/program/layout.tsx`, `src/app/(dashboard)/safestart/layout.tsx`
- `src/app/(dashboard)/dashboard/page.tsx`
