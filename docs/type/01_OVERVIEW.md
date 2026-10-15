# Type Safety Chain Overview

> **The Seven-Tier Chain: How Types Flow from Database to UI**

**Version:** 3.1.0  
**Last Updated:** 2026-10-15  
**Status:** All layers **LOCKED/VALIDATED** — 228 entities; `pnpm db:check` LOCKED; `pnpm validate:all` green; `pnpm typecheck` 0 errors (verified 2026-10-15).

**Operational reference:** [`../architecture/TYPE_SAFETY_CHAIN.md`](../architecture/TYPE_SAFETY_CHAIN.md)  
**Layer guides:** [`README.md`](./README.md)

---

## What is the Seven-Tier Chain?

The Seven-Tier Chain is a unidirectional type safety architecture that guarantees complete type safety from the live Supabase database all the way to the user interface. Types flow in one direction only: **downstream**, never upstream.

```
Ground 0: SUPABASE & POSTGRES 17       → Project vhaiiiykcukrlyvwlgip (Physical SSOT)
   ↓ Introspected via Supabase MCP (.mcp.json)
   ↓ Automated type generation via Supabase CLI → src/lib/supabase/database.types.ts
Layer 1:  DRIZZLE SCHEMA (ORM)          → src/lib/db/schema.ts (Structure SSOT)
   ↓ Auto-generates schemas via drizzle-zod (pnpm generate:schemas)
Layer 2:  ZOD SCHEMAS (Validation)      → src/lib/schemas/index.ts (Types SSOT via z.infer<>)
   ↓ Types exported via z.infer<typeof Schema>
Layer 3:  SERVICES (Business Logic)     → src/lib/services/simplified/
   ↓ Uses Zod types, Result<T> pattern, enforces TENANT_ORG_ID
Layer 4:  API ROUTES (HTTP Interface)   → src/app/api/simplified/ & domain routes
   ↓ Uses Zod types for request/response validation
Layer 5:  REACT HOOKS (Data Fetching)   → src/hooks/simplified/
   ↓ Uses Zod types, TanStack React Query factories & mutations
Layer 6:  UI COMPONENTS (Presentation)  → src/components/ & src/app/
   ↓ Consumes typed hooks, zero manual interface re-declaration
```

### The Golden Rule

**Types flow downstream, NEVER upstream.**

This means:
- ✅ Database changes flow down to UI automatically
- ✅ UI needs are met by changing the database first (via Supabase MCP / migrations)
- ❌ Never add types to UI that don't exist in the database
- ❌ Never skip layers or work around the chain

---

## Single Source of Truth (SSOT) by Layer

### Ground 0: Supabase Database & Supabase MCP (Physical SSOT)

**Project:** `movemental` — `vhaiiiykcukrlyvwlgip` (us-west-2, Postgres 17)  
**MCP Config:** `.mcp.json` (`https://mcp.supabase.com/mcp?project_ref=vhaiiiykcukrlyvwlgip`)  
**Type artifact:** `src/lib/supabase/database.types.ts` (21,492 lines)

The live Supabase Postgres database is the **physical source of truth**. All tables, foreign key constraints, indexes, and row-level security policies exist here first.
- **Supabase MCP:** Enables agents to inspect schemas, table columns, constraints, and views directly, eliminating blind assumptions.
- **Automated Type Generation:** Running `supabase gen types typescript --db-url ...` extracts the exact Postgres schema into TypeScript types for any direct Supabase client interactions.

### Layer 1: Drizzle Database Schema (Structure SSOT)

**File:** `src/lib/db/schema.ts`

The Drizzle schema is the **in-code single source of truth for data structure**. Every field, relationship, and constraint used by the application is declared here as a `pgTable(...)`.
- Declares 228 tables in this repository.
- Validated against the live database with `pnpm db:check` (`scripts/validate-db-alignment.ts`), ensuring every declared table exists in Postgres.

### Layer 2: Zod Schemas (Types SSOT)

**Directory:** `src/lib/schemas/`  
**Primary file:** `src/lib/schemas/index.ts`

Zod schemas are the **single source of truth for all TypeScript application types**:
- Database types are auto-generated via `drizzle-zod` from Layer 1.
- All application TypeScript types are exported via `z.infer<typeof Schema>`:
  - `EntitySelectSchema` → `type Entity`
  - `EntityInsertSchema` → `type EntityCreate`
  - `EntityUpdateSchema` → `type EntityUpdate`
  - `EntityFiltersSchema` → `type EntityFilters`
- Runtime validation guarantees that data passing across network and service boundaries matches compile-time types.

### Layer 3: Services (Business Logic)

**Directory:** `src/lib/services/simplified/` (+ domain services)

Services provide typed data access and encapsulate business logic:
- Standardized `Result<T>` error handling (`Ok<T> | Err`). Services never throw.
- Multi-tenant security: `base.service.ts` inspects table columns and automatically filters queries by `TENANT_ORG_ID` whenever `organization_id` exists.

### Layer 4: API Routes (HTTP Interface)

**Directory:** `src/app/api/simplified/` (+ hand-written domain endpoints)

Next.js App Router handlers:
- Validate URL query parameters and JSON request bodies using Layer 2 Zod schemas.
- Delegate execution to Layer 3 services and return standardized JSON responses.

### Layer 5: React Hooks (Data Fetching & Cache)

**Directory:** `src/hooks/simplified/`

TanStack Query hooks:
- Structured query key factories (`entityVarKeys.all`, `lists()`, `list(filters)`, `details()`, `detail(id)`).
- Pre-built mutations (`useEntityCreate`, `useEntityUpdate`, `useEntityDelete`) with automatic query cache invalidation.

### Layer 6: UI Components (Presentation)

**Directory:** `src/components/` and `src/app/`

Presentation layer:
- Consumes Layer 5 hooks for data fetching and state.
- Forms use `react-hook-form` with `@hookform/resolvers/zod` utilizing Layer 2 Zod schemas.
- Zero ad-hoc type authoring.

---

## Current Implementation Status (Verified October 15, 2026)

| Layer | Path | Count | Status | Command |
|-------|------|-------|--------|---------|
| Ground 0 | Supabase `vhaiiiykcukrlyvwlgip` | 471 tables | Physical SSOT | Supabase MCP |
| Ground Types | `src/lib/supabase/database.types.ts` | 21,492 lines | **CURRENT** ✅ | `supabase gen types` |
| 1 — Drizzle | `src/lib/db/schema.ts` | 228 `pgTable` exports | **LOCKED** ✅ | `pnpm db:check` |
| 2 — Zod | `src/lib/schemas/index.ts` | 228 entities | **LOCKED** ✅ | `pnpm contracts:check` |
| 3 — Services | `src/lib/services/simplified/` | 228 services + `base.service.ts` | **LOCKED** ✅ | `pnpm services:check` |
| 4 — Routes | `src/app/api/simplified/` | 228 routes + domain APIs | **VALIDATED** ✅ | `pnpm routes:check` |
| 5 — Hooks | `src/hooks/simplified/` | 228 hook modules | **LOCKED** ✅ | `pnpm hooks:check` |
| 6 — UI | `src/components/` & `src/app/` | Feature folders & pages | **0 TS errors** ✅ | `pnpm typecheck` |

---

## What "Fix Bottom-Up" Means

When you encounter a type error at any layer, you **must** trace it to its source and fix it from the bottom up, never top down.

### ❌ Wrong Approach (Top-Down)

```
UI shows error: "Property 'organization_name' does not exist on type 'Lead'"
→ Hand-add 'organization_name?: string' to UI props interface
→ Add optional field to hook
→ Add optional field to service
→ Add field to Zod schema
→ Realize database doesn't even have the column!
```
*Result:* Type drift, hidden bugs, runtime runtime failures.

### ✅ Correct Approach (Bottom-Up)

```
1. UI needs field 'organization_name'.
2. Inspect live DB with Supabase MCP: does column exist?
3. If not, author and apply tracked additive migration in Supabase.
4. Add column to pgTable definition in src/lib/db/schema.ts (Layer 1).
5. Run pnpm db:check → LOCKED.
6. Run pnpm generate:schemas && pnpm contracts:check → Layer 2 picks it up via drizzle-zod.
7. Run pnpm generate:services && pnpm services:check → Layer 3 updated.
8. Run pnpm generate:routes && pnpm routes:check → Layer 4 updated.
9. Run pnpm generate:hooks && pnpm hooks:check → Layer 5 updated.
10. Consume new field in UI with full compile-time autocomplete and safety.
11. Run pnpm typecheck → 0 errors.
```

---

## Multi-Tenant Security & Scoping

Multi-tenant data isolation is strictly enforced at Layer 3:
1. Every tenant-scoped table includes `organization_id: uuid("organization_id").notNull().references(() => organizations.id)`.
2. `base.service.ts` checks if the table has an `organization_id` column. If so, every query automatically injects `where(eq(table.organization_id, tenantOrgId))`.
3. If `TENANT_ORG_ID` is unset, operations fail closed with a descriptive runtime error.
4. UI components never need to manually supply tenant IDs for scoped entity operations.

---

## Documentation Index

| Document | Purpose |
|----------|---------|
| [README.md](./README.md) | Documentation index & quick commands |
| [TYPE_SAFETY.md](./TYPE_SAFETY.md) | Validation status & summary matrix |
| [02_LAYER_1_DATABASE.md](./02_LAYER_1_DATABASE.md) | Database schema & Supabase MCP details |
| [03_LAYER_2_ZOD.md](./03_LAYER_2_ZOD.md) | Zod schemas (Types SSOT) |
| [04_LAYER_3_SERVICES.md](./04_LAYER_3_SERVICES.md) | Services layer & Result<T> pattern |
| [05_LAYER_4_ROUTES.md](./05_LAYER_4_ROUTES.md) | API routes & domain endpoints |
| [06_LAYER_5_HOOKS.md](./06_LAYER_5_HOOKS.md) | TanStack Query React hooks |
| [07_LAYER_6_UI.md](./07_LAYER_6_UI.md) | UI components integration |
| [08_CHAIN_WORKFLOW_CHECKLIST.md](./08_CHAIN_WORKFLOW_CHECKLIST.md) | Step-by-step entity creation runbook |
| [09_MULTI_TENANT_NOTES.md](./09_MULTI_TENANT_NOTES.md) | Multi-tenant scoping and TENANT_ORG_ID |
| [10_GLOSSARY.md](./10_GLOSSARY.md) | Architectural terms and definitions |
| [11_PLATFORM_ARCHITECTURE_AT_A_GLANCE.md](./11_PLATFORM_ARCHITECTURE_AT_A_GLANCE.md) | High-level system overview |
| [12_PUBLIC_SITEMAP_AND_FEATURES.md](./12_PUBLIC_SITEMAP_AND_FEATURES.md) | Post-cutover public route inventory |
| [validation/VALIDATION_STATUS.md](./validation/VALIDATION_STATUS.md) | Exact validation snapshot and command outputs |
