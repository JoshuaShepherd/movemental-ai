# Program engagements — database follow-up (Stitch parity)

The pilot SafeStart page (`/program/safety/safestart_dashboard_home_pre_kickoff`) ships **fixture-first** with an optional **organization name overlay** resolved from existing `organizations` + `organization_memberships` ([`resolveActiveOrganizationId`](../../src/lib/services/onboarding/onboarding.service.ts)).

Persisted milestones, summary copy, and roster merges (per Stitch `draftApiMapping` in fixture JSON) require a **tenant-scoped table** in the **live** Postgres database.

## Layer 1 rule

[`docs/architecture/layers/01-drizzle-schema.md`](../architecture/layers/01-drizzle-schema.md): **never** add `pgTable` exports to [`src/lib/db/schema.ts`](../../src/lib/db/schema.ts) until the table exists in production (or `pnpm db:check` will fail).

## Suggested table shape (after DB migration)

Ready-to-apply SQL (review RLS with security): [`docs/build/sql/program_engagements.sql`](./sql/program_engagements.sql).

## Downstream regeneration

After `schema.ts` matches the live DB:

```bash
pnpm generate:schemas
pnpm generate:services
pnpm generate:routes
pnpm generate:hooks
pnpm validate:all
```

## Multi-org vs `TENANT_ORG_ID`

Generated simplified services scope many tables with [`getTenantOrgId()`](../../src/lib/tenant.ts). For program CRUD that must respect `?org=`:

- Prefer **custom route handlers** that call Drizzle with `organization_id` from [`resolveActiveOrganizationId`](../../src/lib/services/onboarding/onboarding.service.ts) + session user, **or**
- Evolve tenant resolution project-wide (larger change).

Client-side org hints may use [`GET /api/program/active-org`](../../src/app/api/program/active-org/route.ts).
