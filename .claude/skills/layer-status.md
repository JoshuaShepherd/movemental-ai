---
description: Check implementation status of each layer
---

# Layer Status Check

Review the implementation status of all six layers.

## Status Report

Generate a status report by checking each layer:

### Layer 1: Database (`db/schema.ts`)

- List all tables defined
- Check for pending migrations
- Verify tenant-scoped tables have `organizationId`

### Layer 2: Zod Schemas (`lib/schemas/`)

- List all exported schemas
- Verify each entity has: Select, Insert, Update, Filters schemas
- Verify types are exported via `z.infer<>`

### Layer 3: Services (`lib/services/simplified/`)

- List all service classes
- Verify Result<T> pattern is used (returns `{ ok, data/error }`)
- Check tenant scoping in queries

### Layer 4: Routes (`app/api/simplified/`)

- List all API routes
- Verify standard response format
- Check Zod validation on inputs

### Layer 5: Hooks (`hooks/simplified/`)

- List all hooks
- Verify React Query usage
- Check type imports from Layer 2

### Layer 6: UI (`components/`)

- List component directories
- Verify hooks are used for data fetching
- Check for any type imports that bypass Layer 2

## Final Validation

```bash
npx tsc --noEmit
```

## Output Format

Report status as:
- LOCKED: No TypeScript errors, all patterns correct
- UNLOCKED: Has errors or missing required patterns
- PARTIAL: Some entities complete, others missing

Example:
```
Layer 1 (Database):     LOCKED - 2 tables
Layer 2 (Zod):          LOCKED - 2 entity schemas
Layer 3 (Services):     LOCKED - 1 service
Layer 4 (Routes):       LOCKED - 2 route files
Layer 5 (Hooks):        LOCKED - 5 hooks
Layer 6 (UI):           LOCKED - 20+ component dirs
```
