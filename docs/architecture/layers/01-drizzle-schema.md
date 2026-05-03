# Layer 1: Drizzle Schema

## Purpose

Define the database schema as TypeScript using Drizzle ORM `pgTable` definitions. This is the **single source of truth** for all types; Layers 2–5 derive from it.

## File location

- **Single file:** `src/lib/db/schema.ts`

## Validation

- **Command:** `pnpm db:check`
- **Script:** `scripts/validate-db-alignment.ts`
- **Required status:** LOCKED

**What the script checks:** Counts every `export const X = pgTable(` and `export const X: Type = pgTable(` in `schema.ts`. Compares this count to `information_schema.tables` (public schema, BASE TABLE) in the live database. LOCKED when the two counts are equal; otherwise UNLOCKED and exits 1.

**Output (JSON):** `layer`, `name`, `status`, `schemaTables`, `dbTables`, `message`.

## Regeneration

- **Migrations:** Use `pnpm drizzle:gen` and `pnpm drizzle:push` for migration-based workflow.
- Schema is maintained by hand; add tables here first, then generate downstream layers.

## Rules

- Table and column names must match the live database exactly.
- Preserve foreign keys with `.references()`.
- Never add tables or columns that don't exist in the live database.
- Never change the schema to satisfy an upper layer; fix at Layer 1 or DB and regenerate downward.
- Export every table so Layers 2–5 can reference it.
