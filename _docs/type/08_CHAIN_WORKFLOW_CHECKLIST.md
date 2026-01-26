# Chain Workflow Checklist

> **Step-by-step execution guide** for adding/adjusting features in the type safety chain

**Version**: 1.1.0  
**Last Updated**: January 2026

---

## When to Use This Checklist

Use this checklist when:
- ✅ Adding a new entity/feature
- ✅ Modifying an existing entity
- ✅ Adding fields to an entity
- ✅ Changing entity relationships
- ✅ Fixing type errors

**CRITICAL**: Follow steps in order. Never skip validation steps.

---

## Adding a New Entity

### Step 1: Layer 1 - Database Schema

**Action**: Add table definition to Drizzle schema

**File**: `db/schema.ts`

```typescript
export const newEntity = pgTable('new_entity', {
  id: id(),
  name: text('name').notNull(),
  organizationId: uuid('organization_id').references(() => organizations.id).notNull(),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});
```

**Commands**:
```bash
# Generate migration
npm run db:generate

# Review migration file in migrations/ folder

# Apply migration
npm run db:push

# Validate - no TypeScript errors
npx tsc --noEmit
```

**✅ Checkpoint**: No TypeScript errors before proceeding.

---

### Step 2: Layer 2 - Zod Schemas

**Action**: Add Zod schemas and type exports

**File**: `lib/schemas/index.ts`

```typescript
// Select Schema
export const NewEntitySelectSchema = createSelectSchema(schema.newEntity);
export type NewEntity = z.infer<typeof NewEntitySelectSchema>;

// Insert Schema
export const NewEntityInsertSchema = createInsertSchema(schema.newEntity);
export type NewEntityCreate = z.infer<typeof NewEntityInsertSchema>;

// Update Schema
export const NewEntityUpdateSchema = createUpdateSchema(schema.newEntity);
export type NewEntityUpdate = z.infer<typeof NewEntityUpdateSchema>;

// Filters Schema
export const NewEntityFiltersSchema = BaseFiltersSchema.extend({
  id: IdSchema.optional(),
  name: z.string().optional(),
  organizationId: IdSchema.optional(),
});
export type NewEntityFilters = z.infer<typeof NewEntityFiltersSchema>;
```

**Commands**:
```bash
# Validate - no TypeScript errors
npx tsc --noEmit
```

**✅ Checkpoint**: No TypeScript errors before proceeding.

---

### Step 3: Layer 3 - Services

**Action**: Create service file

**File**: `lib/services/simplified/newEntity.ts`

```typescript
import { SimplifiedService } from '../simplified-base';
import { 
  NewEntitySelectSchema, 
  NewEntityInsertSchema, 
  NewEntityUpdateSchema, 
  NewEntityFiltersSchema,
  type NewEntity,
  type NewEntityCreate,
  type NewEntityUpdate,
  type NewEntityFilters,
} from '@/lib/schemas';
import * as schema from '@/db/schema';

export class NewEntityService extends SimplifiedService<
  typeof schema.newEntity,
  NewEntity,
  NewEntityCreate,
  NewEntityUpdate,
  NewEntityFilters
> {
  protected table = schema.newEntity;
  protected selectSchema = NewEntitySelectSchema;
  protected insertSchema = NewEntityInsertSchema;
  protected updateSchema = NewEntityUpdateSchema;
  protected filtersSchema = NewEntityFiltersSchema;
}

export const newEntityService = new NewEntityService();
```

**Commands**:
```bash
# Validate - no TypeScript errors
npx tsc --noEmit
```

**✅ Checkpoint**: No TypeScript errors before proceeding.

---

### Step 4: Layer 4 - API Routes

**Action**: Create route files

**Files**:
- `app/api/simplified/new-entity/route.ts` (GET list, POST create)
- `app/api/simplified/new-entity/[id]/route.ts` (GET detail, PATCH update, DELETE delete)

**Pattern**: Follow existing route patterns (see [05_LAYER_4_ROUTES.md](./05_LAYER_4_ROUTES.md))

**Commands**:
```bash
# Validate - no TypeScript errors
npx tsc --noEmit
```

**✅ Checkpoint**: No TypeScript errors before proceeding.

---

### Step 5: Layer 5 - React Hooks

**Action**: Create hook file

**File**: `hooks/simplified/useNewEntity.ts`

**Pattern**: Follow existing hook patterns (see [06_LAYER_5_HOOKS.md](./06_LAYER_5_HOOKS.md))

**Commands**:
```bash
# Validate - no TypeScript errors
npx tsc --noEmit
```

**✅ Checkpoint**: No TypeScript errors before proceeding.

---

### Step 6: Layer 6 - UI Components

**Action**: Create component files

**Files**: `components/new-entity/`

**Pattern**: Follow existing component patterns (see [07_LAYER_6_UI.md](./07_LAYER_6_UI.md))

**Commands**:
```bash
# Validate - no TypeScript errors
npx tsc --noEmit
```

**✅ Checkpoint**: No TypeScript errors before proceeding.

---

### Final Validation

**Action**: Validate all layers

**Commands**:
```bash
# Validate entire project
npx tsc --noEmit
```

**✅ Final Checkpoint**: No TypeScript errors. Feature complete!

---

## Modifying an Existing Entity

### Step 1: Layer 1 - Database Schema

**Action**: Modify table definition

**File**: `db/schema.ts`

```typescript
export const onboardingResponses = pgTable('onboarding_responses', {
  // ... existing fields
  newField: text('new_field'),  // ← NEW FIELD
});
```

**Commands**:
```bash
npm run db:generate
npm run db:push
npx tsc --noEmit
```

**✅ Checkpoint**: No TypeScript errors.

---

### Step 2: Layer 2 - Zod Schemas

**Action**: Update Filters schema if needed (Select/Insert/Update auto-update)

**File**: `lib/schemas/index.ts`

```typescript
// Select/Insert/Update schemas auto-update from Drizzle
// Only update Filters if new filterable fields added

export const OnboardingResponsesFiltersSchema = BaseFiltersSchema.extend({
  // ... existing filters
  newField: z.string().optional(),  // ← NEW FILTER
});
```

**Commands**:
```bash
npx tsc --noEmit
```

**✅ Checkpoint**: No TypeScript errors.

---

### Step 3-6: Update Downstream Layers

**Action**: Update services, routes, hooks, UI to use new field

**Pattern**: Types flow automatically—just use the new field where needed

**Commands**:
```bash
npx tsc --noEmit
```

**✅ Checkpoint**: No TypeScript errors.

---

### Final Validation

```bash
npx tsc --noEmit
```

---

## Fixing Type Errors

### Step 1: Identify Root Cause

**Action**: Trace error back to source layer

**Process**:
1. Note the error message and file
2. Check which layer the file belongs to
3. Trace the type back to its source
4. Find the lowest layer with the error

**Example**:
```
UI error: "Property 'email' does not exist"
→ Check Layer 6 (UI) - uses hook
→ Check Layer 5 (Hook) - uses service
→ Check Layer 3 (Service) - uses Zod schema
→ Check Layer 2 (Zod) - uses Drizzle schema
→ Check Layer 1 (Database) - MISSING 'email' field
→ ROOT CAUSE: Layer 1
```

---

### Step 2: Fix Bottom-Up

**Action**: Fix from lowest layer with error

**Process**:
1. Fix Layer 1 (if needed)
2. Validate Layer 1: `npx tsc --noEmit` → No errors
3. Fix Layer 2 (if needed)
4. Validate Layer 2: `npx tsc --noEmit` → No errors
5. Continue through all layers
6. Validate all: `npx tsc --noEmit` → No errors

**✅ Checkpoint**: No TypeScript errors. Error resolved!

---

## Quick Reference: File Locations

| Layer | Directory/File | Purpose |
|-------|---------------|---------|
| 1 | `db/schema.ts` | Database schema |
| 2 | `lib/schemas/index.ts` | Entity Zod schemas |
| 2 | `lib/schemas/base.ts` | Base schemas |
| 2 | `lib/schemas/*.ts` | Domain-specific schemas |
| 3 | `lib/services/simplified/` | Entity services |
| 4 | `app/api/simplified/` | API routes |
| 5 | `hooks/simplified/` | React hooks |
| 6 | `components/` | UI components |

---

## Quick Reference: Validation Command

```bash
# Primary validation command
npx tsc --noEmit
```

This validates ALL layers at once. If there are errors, they will show the file and line number to help you identify which layer has issues.

---

## Common Mistakes to Avoid

### ❌ Skipping Validation

**Problem**: Proceeding to next layer without validating current layer

**Solution**: Always validate before proceeding

### ❌ Fixing Top-Down

**Problem**: Fixing UI first when error is in database

**Solution**: Always fix bottom-up (Layer 1 → 6)

### ❌ Manual Type Definitions

**Problem**: Defining types manually instead of deriving from schemas

**Solution**: Always derive types from Layer 2 schemas using `z.infer<>`

### ❌ Direct Database Edits

**Problem**: Editing database directly instead of using migrations

**Solution**: Always use migrations (`npm run db:generate` + `npm run db:push`)

---

## Success Criteria

A feature is complete when:
- ✅ No TypeScript errors (`npx tsc --noEmit` passes)
- ✅ All 6 layers have necessary files
- ✅ Types flow correctly from Layer 1 → 6
- ✅ Tenant boundaries enforced (if multi-tenant)

---

**Remember**: Follow the checklist. Validate each layer. Fix bottom-up. Trust the process.
