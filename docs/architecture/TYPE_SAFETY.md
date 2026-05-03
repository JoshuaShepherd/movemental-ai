# Type Safety Chain Architecture

## Overview

The application uses a six-layer type safety architecture where types flow unidirectionally from the database schema through to the UI. Each layer derives its types from the layer below, ensuring consistency and preventing type drift.

## Scope of the Six-Layer Chain

The six-layer chain applies to **table-backed CRUD entities** only. Every `export const X = pgTable(...)` in `schema.ts` is expected to have a full chain: Zod schemas (Layer 2), simplified service (Layer 3), `api/simplified/[entity]` route (Layer 4), and hooks (Layer 5). Layer 6 (UI) is currently hand-built from Stitch designs and not part of the generated chain.

## Single Source of Truth

| Scope | Single source of truth | Location |
|-------|------------------------|----------|
| **Table-backed entities** | Drizzle schema | `src/lib/db/schema.ts` — must match live DB. All Layers 2–5 derive from this. |
| **Zod contracts (entities)** | Generated from schema | `src/lib/schemas/index.ts` — run `pnpm generate:schemas` from Layer 1. |
| **Services / routes / hooks** | Generated from schema | `src/lib/services/simplified/`, `src/app/api/simplified/`, `src/hooks/simplified/` |
| **Tenant config** | Tenant helper | `src/lib/tenant.ts` — `getTenantOrgId()` for org-scoped tables. |
| **Env vars** | Zod-validated env | `src/lib/env.ts` — single place for validated environment variables. |

Type flow remains **downstream only**. Lib must not import from components, hooks, or app routes.

## Unidirectional Type Flow

```
┌─────────────────────────────────────────────────────┐
│  Layer 1: Drizzle Schema (Source of Truth)           │
│  src/lib/db/schema.ts                                │
│  Validation: pnpm db:check → LOCKED                  │
├─────────────────────────────────────────────────────┤
│  Layer 2: Zod Schemas (Runtime Contracts)            │
│  src/lib/schemas/index.ts                            │
│  Validation: pnpm contracts:check → LOCKED          │
├─────────────────────────────────────────────────────┤
│  Layer 3: Services (Business Logic)                  │
│  src/lib/services/simplified/*.service.ts            │
│  Validation: pnpm services:check → LOCKED            │
├─────────────────────────────────────────────────────┤
│  Layer 4: API Routes (HTTP Endpoints)                │
│  src/app/api/simplified/[entity]/route.ts            │
│  Validation: pnpm routes:check → VALIDATED           │
├─────────────────────────────────────────────────────┤
│  Layer 5: React Hooks (Data Fetching)                │
│  src/hooks/simplified/*.hooks.ts                     │
│  Validation: pnpm hooks:check → LOCKED               │
└─────────────────────────────────────────────────────┘
```

## Layer-by-Layer Summary

| Layer | File | Purpose | Command | Required Status |
|-------|------|---------|---------|-----------------|
| 1 | `src/lib/db/schema.ts` | Drizzle pgTable definitions matching live DB | `pnpm db:check` | LOCKED |
| 2 | `src/lib/schemas/index.ts` | Zod schemas (Select, Insert, Update, Filters) + types | `pnpm contracts:check` | LOCKED |
| 3 | `src/lib/services/simplified/` | SimplifiedService CRUD with Result<T> | `pnpm services:check` | LOCKED |
| 4 | `src/app/api/simplified/` | REST routes with Zod validation | `pnpm routes:check` | VALIDATED |
| 5 | `src/hooks/simplified/` | React Query hooks per entity | `pnpm hooks:check` | LOCKED |

## Naming Conventions (Table → Layers)

Entity identity comes from **Layer 1**: each `export const <varName> = pgTable(...)` in `schema.ts` defines one entity. Names in upper layers are derived as follows:

- **Layer 1:** variable name in schema is camelCase (e.g. `contactSubmissions`).
- **Layer 2:** PascalCase for schemas and types — `ContactSubmissionsSelectSchema`, `ContactSubmissions`, `ContactSubmissionsCreate`, `ContactSubmissionsUpdate`, `ContactSubmissionsFilters`.
- **Layer 3:** file `contact-submissions.service.ts`; class `ContactSubmissionsService` (PascalCase).
- **Layer 4:** path `src/app/api/simplified/contact-submissions/route.ts` (kebab-case segment).
- **Layer 5:** file `contact-submissions.hooks.ts`; exports `contactSubmissionsKeys`, `useContactSubmissionsList`, `useContactSubmissionsCreate`, `useContactSubmissionsUpdate`, `useContactSubmissionsDelete`.

Conversion: **camelCase** → **PascalCase** (first letter uppercase); **camelCase** → **kebab-case** (e.g. `contactSubmissions` → `contact-submissions`).

## Validation Script Output

Each script prints **JSON** to stdout and exits with **0** on success, **1** on failure.

| Command | Success status | Exit 0 when |
|---------|----------------|-------------|
| `pnpm db:check` | LOCKED | `schemaTables === dbTables` |
| `pnpm contracts:check` | LOCKED | No missing Zod exports for any table |
| `pnpm services:check` | LOCKED | Every table has a service file extending SimplifiedService; base.service.ts exists |
| `pnpm routes:check` | VALIDATED | Every table has a route with GET, POST, PATCH, DELETE |
| `pnpm hooks:check` | LOCKED | Every table has hooks file with required exports; QueryClientProvider in providers.tsx |

## Code Generation

All generators read `schema.ts`, extract table definitions, and **overwrite** output files. They also generate an `index.ts` barrel file that re-exports all generated entities.

| Layer | Command | Script | Output | Overwrites |
|-------|---------|--------|--------|------------|
| 2 | `pnpm generate:schemas` | `scripts/generate-zod-schemas.ts` | `src/lib/schemas/index.ts` | Yes (single file) |
| 3 | `pnpm generate:services` | `scripts/generate-services.ts` | `src/lib/services/simplified/*.service.ts` + `index.ts` | Yes (all entity files + index) |
| 4 | `pnpm generate:routes` | `scripts/generate-routes.ts` | `src/app/api/simplified/*/route.ts` | Yes (all route files) |
| 5 | `pnpm generate:hooks` | `scripts/generate-hooks.ts` | `src/hooks/simplified/*.hooks.ts` + `index.ts` | Yes (all hook files + index) |

**Important:** Running a generator replaces all entity files with fresh output from the schema. If you have customized a generated file, those changes will be lost. For custom logic, use the `custom/` directories instead (`src/lib/services/custom/`, `src/hooks/custom/`, `src/app/api/custom/`).

## Lock-Before-Proceed Protocol

Before working on any layer N, all layers < N must pass validation:
1. Run the validation command for each lower layer
2. If any layer is UNLOCKED, fix it first
3. Only proceed to layer N when all lower layers pass
4. After modifying any layer, re-validate from that layer upward

## Error Fixing Protocol

1. **Trace to source**: Identify the lowest layer where the error originates (the first failing layer when running `pnpm validate:all`).
2. **Fix bottom-up**: Always fix the lowest affected layer first.
3. **Re-validate upward**: After fixing, run that layer's command, then run each higher layer (or run `pnpm validate:all` again).
4. **Never fix upstream**: Do not modify a lower layer to accommodate an upper layer's needs.

## How to Fix Errors by Layer

| Layer | If it fails | What to do |
|-------|--------------|------------|
| 1 | `schemaTables` ≠ `dbTables` | Align `src/lib/db/schema.ts` with the live DB: add or remove `pgTable` exports to match, or run DB migrations and regenerate schema. See [01-drizzle-schema.md](layers/01-drizzle-schema.md). |
| 2 | `missing` > 0 | Run `pnpm generate:schemas` or fix exports in `src/lib/schemas/index.ts`. See [02-zod-schemas.md](layers/02-zod-schemas.md). |
| 3 | `missing` or `invalid` | Run `pnpm generate:services` to scaffold. See [03-services.md](layers/03-services.md). |
| 4 | Missing route or handlers | Run `pnpm generate:routes` to scaffold. See [04-api-routes.md](layers/04-api-routes.md). |
| 5 | Missing hooks or exports | Run `pnpm generate:hooks` to scaffold. See [05-react-hooks.md](layers/05-react-hooks.md). |

## Key Files

- **Schema:** `src/lib/db/schema.ts`
- **Zod:** `src/lib/schemas/index.ts`
- **Base service:** `src/lib/services/simplified/base.service.ts`
- **Drizzle config:** `drizzle.config.ts`
- **Tenant:** `src/lib/tenant.ts`
- **Env:** `src/lib/env.ts`
- **Validation scripts:** `scripts/validate-*.ts`
- **Generation scripts:** `scripts/generate-*.ts`
