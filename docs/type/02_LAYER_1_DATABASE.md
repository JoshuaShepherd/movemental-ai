# Layer 1: Database (Drizzle Schema) & Supabase MCP

> **The Single Source of Truth for Data Structure**

**Layer:** 1 of 6  
**File:** `src/lib/db/schema.ts`  
**Ground Truth:** Supabase project `vhaiiiykcukrlyvwlgip` (Postgres 17, 471 public tables)  
**Supabase MCP:** Enabled via `.mcp.json` (`https://mcp.supabase.com/mcp?project_ref=vhaiiiykcukrlyvwlgip`)  
**Validation:** `pnpm db:check` → required `{"status":"LOCKED"}`  
**Status:** ✅ **LOCKED** — 228 tables in schema.ts, all present in the live database (verified 2026-10-15)  

---

## Overview

The database architecture consists of two tightly coupled anchors:

1. **Ground 0: The Live Supabase Postgres 17 Database** — The physical single source of truth. All tables, constraints, indexes, and RLS policies are maintained here.
2. **Layer 1: Drizzle Schema (`src/lib/db/schema.ts`)** — The in-code single source of truth for structure. It mirrors the database tables used by this application using Drizzle ORM.

All downstream application layers (Zod, Services, API Routes, React Hooks, and UI components) derive directly from Layer 1.

---

## Role of Supabase MCP

In this platform, **Supabase MCP** is configured in `.mcp.json`:

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

Supabase MCP serves as the interactive tool for database operations:
- **Schema Introspection:** View live table definitions, columns, data types, and nullability without guesswork.
- **Foreign Key & Relationship Verification:** Inspect exact constraint names and foreign key references before authoring Drizzle code.
- **Migration Application:** Apply tracked, non-destructive SQL migrations to the live database.
- **Row Count & Data Audits:** Check data distribution across tables (e.g. verifying `subscribers` vs `newsletter_subscribers`).

---

## Schema Conventions & Helpers

Every table declared in `src/lib/db/schema.ts` adheres to strict structural standards:

### Standard Helpers

```typescript
import { pgTable, uuid, text, timestamp, boolean, jsonb, integer } from "drizzle-orm/pg-core";

function id(name = "id") {
  return uuid(name).primaryKey().defaultRandom();
}

function createdAt(name = "created_at") {
  return timestamp(name, { withTimezone: true, mode: "string" }).defaultNow().notNull();
}

function updatedAt(name = "updated_at") {
  return timestamp(name, { withTimezone: true, mode: "string" }).defaultNow().notNull();
}
```

### Table Structure Requirements

1. **Primary Key:** Every table uses a UUID `id: id("id")`.
2. **Timestamps:** Every table declares `created_at: createdAt("created_at")` and `updated_at: updatedAt("updated_at")`.
3. **Tenant Scoping:** Every entity that belongs to an organization **MUST** declare:
   ```typescript
   organization_id: uuid("organization_id").notNull().references(() => organizations.id),
   ```
4. **Foreign Keys:** Explicitly declared with `.references(() => otherTable.id)`.

---

## Shared Database Subset Architecture

The live Supabase database is shared across three repositories:
- `movemental-ai` (this repo — public marketing, research library, and AI workflows)
- `alan-hirsch` (tenant LMS and reader application)
- `movemental-visual-editor-main` (studio and visual layout composition tools)

Because the database contains 471 public tables, `movemental-ai` explicitly declares a **228-table subset**. Tables not utilized in this repo (such as LMS backup tables or editor-specific draft versions) are safely ignored by `pnpm db:check`.

`pnpm db:check` passes (**LOCKED**) when:
$$\text{Schema Tables} \subseteq \text{Live Database Tables}$$

---

## How to Add or Update a Table

Always follow this exact bottom-up sequence:

### Step 1: Introspect & Apply Migration via Supabase MCP / DDL
1. Use Supabase MCP to inspect existing tables and confirm column types.
2. Apply an additive SQL migration:
   ```sql
   CREATE TABLE IF NOT EXISTS "my_new_table" (
     "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
     "organization_id" uuid NOT NULL REFERENCES "organizations"("id"),
     "title" text NOT NULL,
     "created_at" timestamp with time zone DEFAULT now() NOT NULL,
     "updated_at" timestamp with time zone DEFAULT now() NOT NULL
   );
   ```

### Step 2: Regenerate Supabase TypeScript Types
Run the automated type generator:
```bash
export $(grep -v '^#' .env.local | grep DATABASE_URL | xargs) && \
  npx -y supabase gen types typescript --db-url "$DATABASE_URL" --schema public > src/lib/supabase/database.types.ts
```

### Step 3: Add `pgTable` Definition to `schema.ts`
Add the table to `src/lib/db/schema.ts`:
```typescript
export const myNewTable = pgTable("my_new_table", {
  id: id("id"),
  organization_id: uuid("organization_id").notNull().references(() => organizations.id),
  title: text("title").notNull(),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});
```

### Step 4: Validate Layer 1 Alignment
```bash
pnpm db:check
```
Must output `{"layer": 1, "status": "LOCKED", ...}`.

### Step 5: Cascade Downstream
Regenerate Layers 2 through 5:
```bash
pnpm generate:schemas && pnpm contracts:check
pnpm generate:services && pnpm services:check
pnpm generate:routes && pnpm routes:check
pnpm generate:hooks && pnpm hooks:check
pnpm typecheck
```

---

## Validation Rules

- **Never** add a table to `schema.ts` before it exists in the live database.
- **Never** use ad-hoc naming discrepancies (e.g. `books_chapters` instead of `book_chapters`).
- **Never** skip `pnpm db:check` before proceeding to generate downstream layers.
