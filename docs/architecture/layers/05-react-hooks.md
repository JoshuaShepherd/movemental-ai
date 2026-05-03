# Layer 5: React Hooks

## Purpose

Provide React Query hooks for data fetching, caching, and mutations. Hooks call Layer 4 API routes only; they do not import services or database.

## File location

- **Per entity:** `src/hooks/simplified/<kebab>.hooks.ts` (e.g. `contact-submissions.hooks.ts` for table `contactSubmissions`)
- **Shared utils:** `src/hooks/simplified/query-utils.ts`

## Validation

- **Command:** `pnpm hooks:check`
- **Script:** `scripts/validate-hooks-alignment.ts`
- **Required status:** LOCKED

**What the script checks:** For every `export const <varName> = pgTable(` in `schema.ts`:
- File exists: `src/hooks/simplified/<kebab>.hooks.ts`.
- File content contains (exact names from varName/PascalCase):
  - `<varName>Keys` (e.g. `contactSubmissionsKeys`)
  - `use<Entity>List` (e.g. `useContactSubmissionsList`)
  - `use<Entity>Create` (e.g. `useContactSubmissionsCreate`)
  - `use<Entity>Update` (e.g. `useContactSubmissionsUpdate`)
  - `use<Entity>Delete` (e.g. `useContactSubmissionsDelete`)
- `src/app/providers.tsx` exists and its content includes `QueryClientProvider`.

**Output (JSON):** `layer`, `name`, `status`, `schemaTables`, `hooks`, `missing`, `invalid`, `message`.

## Regeneration

```bash
pnpm generate:hooks
```

Runs `scripts/generate-hooks.ts`. **Overwrites** all entity hook files and generates an `index.ts` barrel file.

## Hook pattern (per entity)

- **Query keys:** e.g. `contactSubmissionsKeys = { all, lists, list(filters), details, detail(id) }` (camelCase from table varName).
- **useEntityList(filters)** — list query via `useQuery`.
- **useEntity(id)** — single-item fetch via `useQuery` with `enabled: !!id`. Generated but **not checked by the validator**.
- **useEntityCreate()** — create mutation; invalidates `lists()` keys on success.
- **useEntityUpdate()** — update mutation; sends `{ id, ...data }` in body (PATCH); invalidates both `lists()` and `detail(id)` on success.
- **useEntityDelete()** — delete mutation; invalidates `lists()` on success.

## Rules

- Use `@tanstack/react-query` only; hooks call fetch to API routes, not services.
- Mutations must invalidate the relevant query keys so lists/details stay in sync.
- Handle API errors so React Query can surface them.
