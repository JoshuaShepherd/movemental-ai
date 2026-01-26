# Chain Workflow Checklist

> **Step-by-step execution guide** for adding/adjusting features in the type safety chain

**Version**: 2.0.0  
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
import { pgTable, uuid, text, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";

// Use helper functions for common fields
export const newEntity = pgTable('new_entity', {
  id: id(),
  name: text('name').notNull(),
  description: text('description'),
  organizationId: uuid('organization_id')
    .references(() => organizations.id)
    .notNull(),  // Required for tenant scoping
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});
```

**Commands**:
```bash
# Generate migration
npm run db:generate

# Review migration file in drizzle/ folder

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
import { createSelectSchema, createInsertSchema, createUpdateSchema } from 'drizzle-zod';
import { z } from 'zod';
import * as schema from '../../db/schema';
import { BaseFiltersSchema, IdSchema } from './base';

// ============================================================================
// New Entity Schemas
// ============================================================================

// Select Schema (reading)
export const NewEntitySelectSchema = createSelectSchema(schema.newEntity);
export type NewEntity = z.infer<typeof NewEntitySelectSchema>;

// Insert Schema (creating)
export const NewEntityInsertSchema = createInsertSchema(schema.newEntity);
export type NewEntityCreate = z.infer<typeof NewEntityInsertSchema>;

// Update Schema (updating)
export const NewEntityUpdateSchema = createUpdateSchema(schema.newEntity);
export type NewEntityUpdate = z.infer<typeof NewEntityUpdateSchema>;

// Filters Schema (querying) - MANUAL, not auto-generated
export const NewEntityFiltersSchema = BaseFiltersSchema.extend({
  id: IdSchema.optional(),
  name: z.string().optional(),
  organizationId: IdSchema.optional(),
});
export type NewEntityFilters = z.infer<typeof NewEntityFiltersSchema>;
```

**Commands**:
```bash
npx tsc --noEmit
```

**✅ Checkpoint**: No TypeScript errors before proceeding.

---

### Step 3: Layer 3 - Services

**Action**: Create service file

**File**: `lib/services/simplified/newEntity.ts`

```typescript
import { and, eq } from 'drizzle-orm';
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
} from '../../schemas';
import { newEntity } from '@/db/schema';
import type { Result } from '../types';
import { getOrganizationId } from '../../middleware/tenant';
import { NextRequest } from 'next/server';

export class NewEntityService extends SimplifiedService<
  typeof newEntity,
  NewEntity,
  NewEntityCreate,
  NewEntityUpdate,
  NewEntityFilters
> {
  protected table = newEntity;
  protected selectSchema = NewEntitySelectSchema;
  protected insertSchema = NewEntityInsertSchema;
  protected updateSchema = NewEntityUpdateSchema;
  protected filtersSchema = NewEntityFiltersSchema;

  // Implement methods with tenant scoping...
}

export const newEntityService = new NewEntityService();
```

**Commands**:
```bash
npx tsc --noEmit
```

**✅ Checkpoint**: No TypeScript errors before proceeding.

---

### Step 4: Layer 4 - API Routes

**Action**: Create route files

**Files**:
- `app/api/simplified/new-entity/route.ts` (GET list, POST create, PATCH update)
- `app/api/simplified/new-entity/[id]/route.ts` (GET detail, DELETE)

**Pattern**: Follow existing route patterns (see [05_LAYER_4_ROUTES.md](./05_LAYER_4_ROUTES.md))

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { newEntityService } from '@/lib/services/simplified/newEntity';
import { NewEntityInsertSchema } from '@/lib/schemas';
import { z } from 'zod';

export async function GET(request: NextRequest) {
  // ...
}

export async function POST(request: NextRequest) {
  // Validate input, call service, return response
}
```

**Commands**:
```bash
npx tsc --noEmit
```

**✅ Checkpoint**: No TypeScript errors before proceeding.

---

### Step 5: Layer 5 - React Hooks

**Action**: Create hook file

**File**: `hooks/simplified/useNewEntity.ts`

```typescript
'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { NewEntity, NewEntityCreate, NewEntityUpdate, NewEntityFilters } from '@/lib/schemas';

export const newEntityKeys = {
  all: ['new-entity'] as const,
  lists: () => [...newEntityKeys.all, 'list'] as const,
  list: (filters?: NewEntityFilters) => [...newEntityKeys.lists(), filters] as const,
  details: () => [...newEntityKeys.all, 'detail'] as const,
  detail: (id: string) => [...newEntityKeys.details(), id] as const,
};

export function useNewEntities(filters?: NewEntityFilters) {
  return useQuery<NewEntity[]>({ /* ... */ });
}

export function useNewEntity(id: string) {
  return useQuery<NewEntity>({ /* ... */ });
}

export function useCreateNewEntity() {
  return useMutation({ /* ... */ });
}

// etc.
```

**Commands**:
```bash
npx tsc --noEmit
```

**✅ Checkpoint**: No TypeScript errors before proceeding.

---

### Step 6: Layer 6 - UI Components

**Action**: Create component files

**Directory**: `components/new-entity/`

**Pattern**: Follow existing component patterns (see [07_LAYER_6_UI.md](./07_LAYER_6_UI.md))

```typescript
import { useNewEntities } from '@/hooks/simplified/useNewEntity';

export function NewEntityList() {
  const { data, isLoading, error } = useNewEntities();
  // Handle loading, error, empty states
  // Render data
}
```

**Commands**:
```bash
npx tsc --noEmit
```

**✅ Checkpoint**: No TypeScript errors before proceeding.

---

### Final Validation

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
  newField: z.string().optional(),  // ← NEW FILTER (if needed)
});
```

**Commands**:
```bash
npx tsc --noEmit
```

**✅ Checkpoint**: No TypeScript errors.

---

### Steps 3-6: Update Downstream Layers

**Action**: Update services, routes, hooks, UI to use new field

**Pattern**: Types flow automatically—just use the new field where needed

**Commands**:
```bash
npx tsc --noEmit
```

**✅ Checkpoint**: No TypeScript errors.

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
→ Check Layer 5 (Hook) - uses route
→ Check Layer 4 (Route) - uses service
→ Check Layer 3 (Service) - uses Zod schema
→ Check Layer 2 (Zod) - uses Drizzle schema
→ Check Layer 1 (Database) - MISSING 'email' field
→ ROOT CAUSE: Layer 1
```

---

### Step 2: Fix Bottom-Up

**Action**: Fix from lowest layer with error

**Process**:
1. Fix Layer 1 (if needed) → Validate: `npx tsc --noEmit`
2. Fix Layer 2 (if needed) → Validate: `npx tsc --noEmit`
3. Fix Layer 3 (if needed) → Validate: `npx tsc --noEmit`
4. Fix Layer 4 (if needed) → Validate: `npx tsc --noEmit`
5. Fix Layer 5 (if needed) → Validate: `npx tsc --noEmit`
6. Fix Layer 6 (if needed) → Validate: `npx tsc --noEmit`

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
| 3 | `lib/services/simplified-base.ts` | Base service class |
| 3 | `lib/services/types.ts` | Result<T>, ServiceError |
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

**Solution**: Always validate before proceeding: `npx tsc --noEmit`

### ❌ Fixing Top-Down

**Problem**: Fixing UI first when error is in database

**Solution**: Always fix bottom-up (Layer 1 → 6)

### ❌ Manual Type Definitions

**Problem**: Defining types manually instead of deriving from schemas

**Solution**: Always derive types from Layer 2 schemas using `z.infer<>`

### ❌ Direct Database Edits

**Problem**: Editing database directly instead of using migrations

**Solution**: Always use migrations (`npm run db:generate` + `npm run db:push`)

### ❌ Trusting Client Input

**Problem**: Using `organizationId` from client input

**Solution**: Always extract tenant from request via `getOrganizationId(request)`

---

## Success Criteria

A feature is complete when:
- ✅ No TypeScript errors (`npx tsc --noEmit` passes)
- ✅ All 6 layers have necessary files
- ✅ Types flow correctly from Layer 1 → 6
- ✅ Tenant boundaries enforced (all queries filter by `organizationId`)
- ✅ All types exported from Zod schemas using `z.infer<>`

---

**Remember**: Follow the checklist. Validate each layer. Fix bottom-up. Trust the process.
