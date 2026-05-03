# Layer 4: API Routes

## Purpose

Expose REST endpoints that validate requests with Zod (Layer 2) and call services (Layer 3). Handle HTTP status codes and error response shapes.

## File location

- **Per entity:** `src/app/api/simplified/<kebab>/route.ts` (e.g. `contact-submissions/route.ts` for table `contactSubmissions`)

## Validation

- **Command:** `pnpm routes:check`
- **Script:** `scripts/validate-routes-alignment.ts`
- **Required status:** VALIDATED

**What the script checks:** For every `export const <varName> = pgTable(` in `schema.ts`:
- File exists: `src/app/api/simplified/<kebab>/route.ts`.
- File content contains: `export async function GET`, `export async function POST`, `export async function PATCH`, `export async function DELETE`.

**Output (JSON):** `layer`, `name`, `status`, `schemaTables`, `routes`, `missing`, `invalid`, `message`.

## Regeneration

```bash
pnpm generate:routes
```

Runs `scripts/generate-routes.ts`. **Overwrites** all entity route files.

## HTTP methods (CRUD)

- **GET** — Parse query params into a filters object, validate with `EntityFiltersSchema.safeParse()`, call `service.list(parsed.data)`, return `{ success: true, data }`.
- **POST** — Parse JSON body with `EntityInsertSchema.safeParse()`, call `service.create(parsed.data)`, return 201 with `{ success: true, data }`.
- **PATCH** — Parse JSON body; extract `id` from body, validate remaining fields with `EntityUpdateSchema.safeParse()`, call `service.update(id, parsed.data)`, return `{ success: true, data }`. Returns 404 if `NOT_FOUND`.
- **DELETE** — Get `id` from query parameter (`?id=...`), call `service.delete(id)`, return 204 (empty body) on success. Returns 404 if `NOT_FOUND`.

## Error responses

- Invalid JSON body: 400, `{ error: { code: "INVALID_JSON", message } }`.
- Validation failure: 400, `{ error: { code: "VALIDATION_ERROR", message } }`.
- Service failure with `NOT_FOUND`: 404, `{ error: { code: "NOT_FOUND", message } }`.
- Other service failure: 500, `{ error: { code, message } }`.

## Rules

- Validate all input with Layer 2 Zod schemas before calling services.
- Do not access the database or Layer 1/2 from routes; use services only.
- Return consistent JSON shapes for success and error.
