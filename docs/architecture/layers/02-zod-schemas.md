# Layer 2: Zod Schemas

## Purpose

Provide runtime validation and inferred types from Layer 1 using `drizzle-zod`. Used by services (Layer 3) and API routes (Layer 4) for input/output validation.

## File location

- **Generated (table-backed):** `src/lib/schemas/index.ts` — single monolithic file with all entity schemas
- **Custom (non-table):** `src/lib/schemas/<name>.ts` — hand-written schemas for non-table features

## Validation

- **Command:** `pnpm contracts:check`
- **Script:** `scripts/validate-semantic-alignment.ts`
- **Required status:** LOCKED

**What the script checks:** For every `export const <varName> = pgTable(` in `schema.ts`, it expects in `schemas/index.ts` (Entity = PascalCase of varName):
- `export const EntitySelectSchema`
- `export const EntityInsertSchema`
- `export const EntityUpdateSchema`
- `export const EntityFiltersSchema`
- `export type Entity =` (the Select type)
- `export type EntityCreate`
- `export type EntityUpdate`
- `export type EntityFilters`

**Output (JSON):** `layer`, `name`, `status`, `schemaTables`, `zodEntities`, `missing`, `message`.

## Regeneration

```bash
pnpm generate:schemas
```

Runs `scripts/generate-zod-schemas.ts` and overwrites `src/lib/schemas/index.ts` from the Drizzle schema.

## Four Schema Pattern (per entity)

1. **EntitySelectSchema** — `createSelectSchema(table)`
2. **EntityInsertSchema** — `createInsertSchema(table)`
3. **EntityUpdateSchema** — `createUpdateSchema(table)`
4. **EntityFiltersSchema** — extends `BaseFiltersSchema` with entity-specific filter fields

Inferred types: `Entity`, `EntityCreate`, `EntityUpdate`, `EntityFilters` (from the four schemas).

**BaseFiltersSchema** (in generator): `limit`, `offset`, `search` (optional). Entity filters add optional fields such as `id`, `status`, `user_id` when present in the table.

## Rules

- All schemas and types derive from Layer 1; do not add fields that don't exist in the Drizzle table.
- Use `drizzle-zod` (`createSelectSchema`, `createInsertSchema`, `createUpdateSchema`) for the four schemas.
- Keep a single `index.ts`; the validator expects all entities in one file.
