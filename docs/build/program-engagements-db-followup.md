# Program engagements — database follow-up (Stitch parity)

The pilot SafeStart page (`/program/safety/safestart_dashboard_home_pre_kickoff`) ships **fixture-first** with an optional **organization name overlay** resolved from existing `organizations` + `organization_memberships` ([`resolveActiveOrganizationId`](../../src/lib/services/onboarding/onboarding.service.ts)).

Persisted milestones, summary copy, and roster merges (per Stitch `draftApiMapping` in fixture JSON) require a **tenant-scoped table** in the **live** Postgres database.

## Layer 1 rule

[`docs/architecture/layers/01-drizzle-schema.md`](../architecture/layers/01-drizzle-schema.md): **never** add `pgTable` exports to [`src/lib/db/schema.ts`](../../src/lib/db/schema.ts) until the table exists in production (or `pnpm db:check` will fail).

## Suggested table shape (after DB migration)

Illustrative SQL — adjust naming and RLS to match Movemental conventions:

```sql
create table public.program_engagements (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  template_slug text not null,
  summary_markdown text,
  milestones jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, template_slug)
);

-- Enable RLS + policies for org members (mirror patterns from docs/architecture as applicable).
```

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
