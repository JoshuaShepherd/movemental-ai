# Layer 3: Services

## Purpose

Implement business logic and all database access via the `SimplifiedService` base class. Services return `Result<T>` and do not throw; API routes (Layer 4) call services only.

## File location

- **Base:** `src/lib/services/simplified/base.service.ts`
- **Per entity:** `src/lib/services/simplified/<kebab>.service.ts` (e.g. `contact-submissions.service.ts` for table `contactSubmissions`)

## Validation

- **Command:** `pnpm services:check`
- **Script:** `scripts/validate-services-alignment.ts`
- **Required status:** LOCKED

**What the script checks:** For every `export const <varName> = pgTable(` in `schema.ts`:
- File exists: `src/lib/services/simplified/<kebab>.service.ts` (varName converted to kebab-case).
- File content includes `extends SimplifiedService`.
- File content includes the class name `EntityService` (PascalCase of varName).
- `base.service.ts` exists in the same directory.

**Output (JSON):** `layer`, `name`, `status`, `schemaTables`, `services`, `missing`, `invalid`, `message`.

## Regeneration

```bash
pnpm generate:services
```

Runs `scripts/generate-services.ts`. **Overwrites** all entity service files and generates an `index.ts` barrel file.

## Result<T> pattern

Defined in `base.service.ts`:

```typescript
export type Ok<T> = { success: true; data: T };
export type Err = { success: false; error: { code: string; message: string } };
export type Result<T> = Ok<T> | Err;
```

Services use `this.ok(data)` and `this.fail(code, message)`; they must not throw.

## Base class methods

All methods return `Promise<Result<T>>`. Methods that access tenant-scoped tables automatically filter by `organization_id` using `getTenantOrgId()`.

| Method | Signature | Notes |
|--------|-----------|-------|
| `list` | `(filters?: TFilters) → Result<TSelect[]>` | Default limit 50, offset 0. Scoped by `organization_id` if column exists. |
| `getById` | `(id: string) → Result<TSelect \| null>` | Returns null if not found. Tenant-scoped. |
| `create` | `(data: TInsert) → Result<TSelect>` | Validates with `insertSchema.parse()`. |
| `update` | `(id: string, data: TUpdate) → Result<TSelect>` | Checks existence first. Validates with `updateSchema.parse()`. |
| `delete` | `(id: string) → Result<{ deleted: boolean }>` | Returns `{ deleted: true }` on success. |
| `getBySlug` | `(slug: string) → Result<TSelect \| null>` | Only works if table has a `slug` column. Tenant-scoped. |
| `listByColumn` | `(column, value, orderByColumn?, direction?) → Result<TSelect[]>` | Generic column filter with optional ordering. |

## Custom services

For non-CRUD business logic, add files to `src/lib/services/custom/`. Custom services are not part of the generated chain or validation.

## Rules

- Extend `SimplifiedService` with the correct table and Layer 2 schemas.
- All public methods return `Promise<Result<T>>`, never throw.
- Use Drizzle (db + table) for queries; no raw SQL in services.
