# Stitch program surfaces (movemental-ai)

**Status:** Phase 1–2 implemented behind authenticated `(dashboard)` layout.

## URL prefix (canonical)

| Pattern | Purpose |
|---------|---------|
| `/program` | Auth-only index of Stitch templates (migration hub). |
| `/program/safety/[templateId]` | SafeStart / safety-category templates from the Stitch manifest. |
| `/program/sandbox/[templateId]` | Sandbox-category templates. |

These paths are **distinct from** public marketing routes such as `/pathway/safety`, `/pathway/sandbox`, and do **not** replace them.

## Inventory

- Template definitions are vendored from the Stitch repo at [`src/lib/program/data/stitch-templates.json`](../../src/lib/program/data/stitch-templates.json) (`manifest/templates.json`, 45 templates).
- Pilot fixture-backed screen: `safestart_dashboard_home_pre_kickoff` (`safestart-hero-timeline` family).
- Screen-family taxonomy (for parity work): see Stitch `docs/fixtures-screen-families.md` in the `movemental-stitch-dashboard` repo.

## Non-goals (do not remove or reroute)

- `(site)/**` marketing and toolkit pages.
- `/dashboard`, `/welcome`, `/onboarding/**`, `/admin/**`.
- Existing `/api/simplified/**` entities and generated hooks, except via the normal codegen pipeline when the live DB gains matching tables.

## Tenancy note

Dashboard UI selects org via `?org=<slug>` (`DashboardShell`, `DashboardOrgProvider`). Generated simplified services still scope many tables with `TENANT_ORG_ID` env ([`src/lib/tenant.ts`](../../src/lib/tenant.ts)). Program pages resolve the active org server-side for display overlays (e.g. organization name on the pilot SafeStart view). Row-backed engagement merges require a future DB table applied to the live database before adding `pgTable` exports—see [`program-engagements-db-followup.md`](program-engagements-db-followup.md).

## Hooks discipline

Layer 5 rules: [`docs/architecture/layers/05-react-hooks.md`](../architecture/layers/05-react-hooks.md). Do not hand-edit generated hook files; use `pnpm generate:hooks` after schema changes.
