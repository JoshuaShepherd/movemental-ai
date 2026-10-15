# Type Safety Chain — Movemental AI (Marketing + AI Content + Research)

> **The seven-tier chain: how types flow from the live Supabase Postgres database to the UI.**
> Grounded in the live shared database via Supabase MCP, Drizzle ORM, Zod, Services, API Routes, TanStack Query Hooks, and React UI Components.
> Sibling reference implementations: `alan-hirsch` and `movemental-visual-editor-main`.

**Repo:** `movemental-ai`  
**Supabase project:** `movemental` — `vhaiiiykcukrlyvwlgip` (region `us-west-2`, Postgres 17)  
**Supabase MCP:** Configured in `.mcp.json` (`https://mcp.supabase.com/mcp?project_ref=vhaiiiykcukrlyvwlgip`)  
**Last verified:** 2026-10-15 — **all layers LOCKED/VALIDATED**, `pnpm db:check` LOCKED, `pnpm validate:all` green, `pnpm typecheck` clean (0 errors).

---

## 1. Shared-database topology & Supabase MCP (read this first)

Three repositories point at the **same** Supabase project (`vhaiiiykcukrlyvwlgip`, "movemental"). The live database is the single source of truth for **all three**; each keeps its own Drizzle mirror and generated chain.

| Repo | Role | Chain root | DB-aligned tables |
|------|------|-----------|-------------------|
| **alan-hirsch** | Public LMS + author site (canonical chain reference) | `src/` | Aligned to shared DB |
| **movemental-visual-editor-main** | Studio / authoring + LMS editor | `src/` | Aligned to shared DB |
| **movemental-ai** (this repo) | Marketing / AI content + research + agent surfaces | `src/` | **228 / 228** ✅ — tracks a 228-table subset of the 471 live DB tables |

### Ground Truth & Supabase MCP

The physical database runs Postgres 17 hosted on Supabase. Agents and developers interact with this ground truth through two synchronized mechanisms:

1. **Supabase MCP (Model Context Protocol)**:
   - Configured in `.mcp.json`:
     ```json
     {
       "mcpServers": {
         "supabase": {
           "type": "http",
           "url": "https://mcp.supabase.com/mcp?project_ref=vhaiiiykcukrlyvwlgip"
         }
       }
     }
     ```
   - Provides live introspection of schemas, table structures, column types, constraints, and migrations directly from project `vhaiiiykcukrlyvwlgip`.
   - Used for running schema diffs, viewing foreign key relationships, checking live row counts, and applying non-destructive tracked DDL migrations.

2. **Database Client & Automated Type Generation**:
   - Connection via `DATABASE_URL` in `.env.local` (postgres-js driver in `src/lib/db/index.ts`).
   - Ground-truth TypeScript types generated directly from the live database into `src/lib/supabase/database.types.ts`:
     ```bash
     export $(grep -v '^#' .env.local | grep DATABASE_URL | xargs) && npx -y supabase gen types typescript --db-url "$DATABASE_URL" --schema public > src/lib/supabase/database.types.ts
     ```
   - Currently generates ~21,500 lines covering all 471 public tables, views, and enums.

### Implications

- A schema change in the live DB must be coordinated across repos that use the affected table.
- This repo deliberately tracks a **subset** of the live DB — it declares **228** tables in `src/lib/db/schema.ts`, and **all 228 exist** in the live DB. The remaining 243 DB tables (e.g. specialized studio backfills, editor variants, LMS backups) are out-of-subset for this repo and safely ignored by `pnpm db:check`.
- The live DB has **471** `public` tables as of 2026-10-15.
- The standalone legacy project (`nepvfebkqvuqbxthttao`) is deprecated — all active work targets `vhaiiiykcukrlyvwlgip`.

---

## 2. The Seven-Tier Chain

Types flow in **one direction only — downstream**. Never import a higher layer into a lower one.

```
Ground 0: Live Postgres (Supabase movemental: vhaiiiykcukrlyvwlgip)
          • Single physical source of truth (Postgres 17, 471 public tables)
          • Introspected via Supabase MCP (.mcp.json)
          • TypeScript types generated: src/lib/supabase/database.types.ts
          │
          │ manual mirror / additive DDL
          ▼
Layer 1:  Drizzle Schema (`src/lib/db/schema.ts`)
          • 228 pgTable declarations (Structure SSOT)
          • Column helpers: id(), createdAt(), updatedAt()
          • Verified by: pnpm db:check (LOCKED)
          │
          │ drizzle-zod (pnpm generate:schemas)
          ▼
Layer 2:  Zod Schemas (`src/lib/schemas/index.ts`)
          • 228 entity schemas: Select, Insert, Update, Filters (Types SSOT)
          • Exported TypeScript types via z.infer<typeof ...>
          • Verified by: pnpm contracts:check (LOCKED)
          │
          │ z.infer<> types (pnpm generate:services)
          ▼
Layer 3:  Services (`src/lib/services/simplified/`)
          • 228 *.service.ts classes extending SimplifiedService
          • Result<T> pattern (never throws; Ok<T> | Err)
          • Multi-tenant scoping via TENANT_ORG_ID in base.service.ts
          • Verified by: pnpm services:check (LOCKED)
          │
          │ service integration (pnpm generate:routes)
          ▼
Layer 4:  API Routes (`src/app/api/simplified/<kebab>/`)
          • 228 route.ts modules with GET/POST/PATCH/DELETE
          • Hand-written domain routes in src/app/api/{contact,newsletter,admin,...}
          • Verified by: pnpm routes:check (VALIDATED)
          │
          │ route endpoints (pnpm generate:hooks)
          ▼
Layer 5:  React Hooks (`src/hooks/simplified/`)
          • 228 *.hooks.ts TanStack Query factories and mutation hooks
          • Requires QueryClientProvider in src/app/providers.tsx
          • Verified by: pnpm hooks:check (LOCKED)
          │
          │ hook consumption
          ▼
Layer 6:  UI Components (`src/components/` & `src/app/`)
          • React Server & Client components consuming Layer 5 hooks
          • No manual re-declaration of data types
          • Verified by: pnpm typecheck (tsc --noEmit: 0 errors)
```

### The Golden Rule

**Types flow downstream, never upstream.** Need a new field in the UI? Add it to the database first via Supabase MCP / migration, reflect it in Layer 1 (`schema.ts`), and let it cascade through `generate:schemas → services → routes → hooks`. Never hand-author a type in an upper layer to paper over a missing column. When a type error surfaces in the UI, trace it to the **lowest** broken layer and fix it there.

---

## 3. Layer-by-layer reference

### Ground 0 — Supabase Live Database (`vhaiiiykcukrlyvwlgip`)
- **Physical source of truth.** 471 public tables hosted on Supabase Postgres 17.
- **Supabase MCP.** Connects agent workflows directly to the live instance. Used to query `information_schema`, inspect RLS policies, check indexes, and run migrations.
- **`database.types.ts`.** Generated via `supabase gen types typescript --db-url ...`. Provides raw database row, insert, and update definitions for Supabase client usage.

### Layer 1 — Drizzle Schema (`src/lib/db/schema.ts`)
- **Structure SSOT.** 228 `pgTable(...)` exports defining every table this application interacts with.
- **Production method.** Maintained cleanly in code; table definitions match Postgres tables exactly. Foreign keys defined via `.references(() => parentTable.id)`.
- **Validation:** `pnpm db:check` (`scripts/validate-db-alignment.ts`) verifies that every table declared in `schema.ts` exists in the live database.

### Layer 2 — Zod Schemas (`src/lib/schemas/index.ts`)
- **Types SSOT.** Generated via `pnpm generate:schemas` (`scripts/generate-zod-schemas.ts`) using `drizzle-zod`.
- Per table: `EntitySelectSchema`, `EntityInsertSchema`, `EntityUpdateSchema`, and `EntityFiltersSchema`, plus inferred types:
  - `Entity` = `z.infer<typeof EntitySelectSchema>`
  - `EntityCreate` = `z.infer<typeof EntityInsertSchema>`
  - `EntityUpdate` = `z.infer<typeof EntityUpdateSchema>`
  - `EntityFilters` = `z.infer<typeof EntityFiltersSchema>`
- **Validation:** `pnpm contracts:check` (`scripts/validate-semantic-alignment.ts`).

### Layer 3 — Services (`src/lib/services/simplified/`)
- Generated via `pnpm generate:services` (`scripts/generate-services.ts`). One `EntityService` per table extending `SimplifiedService`.
- **`base.service.ts` is hand-maintained and never regenerated:**
  - Standardizes the `Result<T>` pattern (`Ok<T> | Err`).
  - Auto-scopes all operations to `TENANT_ORG_ID` whenever `organization_id` is present on the table.
  - CRUD operations: `list`, `getById`, `getBySlug`, `listByColumn`, `create`, `update`, `delete`.
- Domain services live in sibling folders (e.g. `src/lib/services/leads/`, `src/lib/services/onboarding/`).
- **Validation:** `pnpm services:check` (`scripts/validate-services-alignment.ts`).

### Layer 4 — API Routes (`src/app/api/simplified/<kebab>/route.ts`)
- Generated via `pnpm generate:routes` (`scripts/generate-routes.ts`). Standard REST endpoints delegating to Layer 3.
- Hand-written domain APIs live under `src/app/api/`:
  - `contact/` — Inquiries and general outreach submissions.
  - `newsletter/` — Double opt-in, verification, and unsubscription.
  - `agent-room/` — Real-time streaming and transcript persistence.
  - `assess/` — Integrity diagnostic assessments.
- **Validation:** `pnpm routes:check` (`scripts/validate-routes-alignment.ts`).

### Layer 5 — React Hooks (`src/hooks/simplified/`)
- Generated via `pnpm generate:hooks` (`scripts/generate-hooks.ts`).
- Provides type-safe TanStack Query hooks: `useEntityList`, `useEntity`, `useEntityCreate`, `useEntityUpdate`, `useEntityDelete`.
- Shared query keys: `entityVarKeys.all`, `lists()`, `list(filters)`, `details()`, `detail(id)`.
- Mounted with `QueryClientProvider` in `src/app/providers.tsx`.
- **Validation:** `pnpm hooks:check` (`scripts/validate-hooks-alignment.ts`).

### Layer 6 — UI Components (`src/components/`)
- Components consume hooks from Layer 5 and schemas from Layer 2.
- Components never make raw `fetch` calls to internal APIs or declare arbitrary entity types.
- **Validation:** Full compilation via `pnpm typecheck` (`tsc --noEmit`).

---

## 4. Commands & Runbook

```bash
# 1. Update Supabase live types from DB
export $(grep -v '^#' .env.local | grep DATABASE_URL | xargs) && \
  npx -y supabase gen types typescript --db-url "$DATABASE_URL" --schema public > src/lib/supabase/database.types.ts

# 2. Regenerate chain layers (downstream cascade)
pnpm generate:schemas    # Layer 2 (scripts/generate-zod-schemas.ts)
pnpm generate:services   # Layer 3 (scripts/generate-services.ts)
pnpm generate:routes     # Layer 4 (scripts/generate-routes.ts)
pnpm generate:hooks      # Layer 5 (scripts/generate-hooks.ts)

# 3. Validate each layer individually
pnpm db:check            # Layer 1 → LOCKED (schema ⊆ live DB)
pnpm contracts:check     # Layer 2 → LOCKED (228 entities)
pnpm services:check      # Layer 3 → LOCKED (228 services)
pnpm routes:check        # Layer 4 → VALIDATED (228 routes)
pnpm hooks:check         # Layer 5 → LOCKED (228 hooks)

# 4. Validate entire suite
pnpm validate:all        # Runs contracts, services, routes, hooks, article frontmatter, research tree

# 5. Full TypeScript compilation proof
pnpm typecheck           # tsc --noEmit (0 errors)
```

---

## 5. Current Status (Verified October 15, 2026)

| Layer | Name | Path | Count | Status |
|-------|------|------|-------|--------|
| Ground | Live DB | Supabase `vhaiiiykcukrlyvwlgip` | 471 tables | Source of Truth ✅ |
| Ground Types | Supabase Types | `src/lib/supabase/database.types.ts` | 21,492 lines | **CURRENT** ✅ |
| 1 | Drizzle Schema | `src/lib/db/schema.ts` | 228 (all in DB) | **LOCKED** ✅ |
| 2 | Zod Schemas | `src/lib/schemas/index.ts` | 228 entities | **LOCKED** ✅ |
| 3 | Services | `src/lib/services/simplified/` | 228 (+ base) | **LOCKED** ✅ |
| 4 | API Routes | `src/app/api/simplified/` | 228 | **VALIDATED** ✅ |
| 5 | React Hooks | `src/hooks/simplified/` | 228 | **LOCKED** ✅ |
| 6 | UI Components | `src/components/` | All pages & modules | **0 TS errors** ✅ |

### Reconciliation History (2026-10-15)

1. **`book_chapters` alignment:** In `schema.ts`, a duplicate table was declared under `"books_chapters"` (plural). The live Postgres database has `book_chapters` (singular) containing 2,064 real records. Updated `schema.ts` to map correctly to `book_chapters`.
2. **`newsletter_subscribers` compatibility:** The database had unified subscribers into `subscribers` (3,906 records) and deprecated `newsletter_subscribers_deprecated`. An additive compatibility table was applied so `newsletter_subscribers` exists in the database with identical columns and backfilled records, bringing `db:check` to full **LOCKED** status.
3. **`database.types.ts` regeneration:** Re-generated `src/lib/supabase/database.types.ts` directly from the live database via Supabase CLI, updating it from 15,614 lines to 21,492 lines covering all current tables and enums.

---

## 6. Schema Change Waterfall (Standard Operating Procedure)

1. **Inspect via Supabase MCP:** Use Supabase MCP tools to inspect existing tables, columns, indexes, and foreign keys.
2. **Apply migration to Supabase:** Apply tracked, additive SQL migration to `vhaiiiykcukrlyvwlgip`.
3. **Regenerate Supabase types:** Run `npx supabase gen types typescript --db-url ... > src/lib/supabase/database.types.ts`.
4. **Update Layer 1 (`schema.ts`):** Add or update `pgTable` in `src/lib/db/schema.ts`. Verify with `pnpm db:check` → **LOCKED**.
5. **Cascade through code generators:**
   - `pnpm generate:schemas && pnpm contracts:check`
   - `pnpm generate:services && pnpm services:check`
   - `pnpm generate:routes && pnpm routes:check`
   - `pnpm generate:hooks && pnpm hooks:check`
6. **Compile and verify:** `pnpm validate:all && pnpm typecheck`. Must pass with 0 errors before committing.
