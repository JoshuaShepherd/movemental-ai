# Program routes (`/program/**`) — auth and future role gates

## Current behavior (2026-05)

| Area | Enforcement |
|------|-------------|
| Authentication | All `/program/**` pages live under `(dashboard)`; [`src/app/(dashboard)/layout.tsx`](../../src/app/(dashboard)/layout.tsx) redirects unauthenticated users to `/login?next=…`. |
| Organization | At least one `organization_memberships` row is required by the dashboard layout; fixture loaders use [`resolveActiveOrganizationId`](../../src/lib/services/onboarding/onboarding.service.ts) for `?org=` slug resolution. |
| Board / ratification | Ratification and governance templates currently use the same membership gate as the rest of the dashboard. Tighten with product/security (e.g. `board_viewer`-only subtrees) before exposing sensitive signing flows in production. |

## URL map

- Hub: `/program`
- Safety templates: `/program/safety/[templateId]` (ids from `src/lib/program/data/stitch-templates.json` where `category === "safety"`).
- Sandbox templates: `/program/sandbox/[templateId]` (ids where `category === "sandbox"`).

Canonical template ids and screen families are listed in `src/lib/program/data/template-content-index.json` (synced from Stitch via `pnpm sync:stitch-spec`).
