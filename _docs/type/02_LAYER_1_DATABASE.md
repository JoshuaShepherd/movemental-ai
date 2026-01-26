# Layer 1: Database (Drizzle Schema)

> **The Single Source of Truth** for all data structures

**Layer**: 1 of 6  
**File**: `db/schema.ts`  
**Validation**: `npx tsc --noEmit`  
**Status Required**: No TypeScript errors

---

## Overview

The Drizzle schema is the **immutable source of truth** for all data structures in the application. It defines the database structure using Drizzle ORM and is the only place where new data structures originate. All other layers derive from this schema.

### Key Principles

1. **Database-First Design**: Schema matches production database exactly
2. **Migration-Based Changes**: All changes go through Drizzle migrations
3. **Type Generation**: Drizzle types are automatically inferred by TypeScript
4. **No Direct Edits**: Never edit the database directly—always use migrations

---

## Where Drizzle Schema Lives

```
db/schema.ts
```

This single file contains all table definitions for the entire application. The database connection is configured in `db/index.ts`.

---

## Migration Rules: No Direct DB Edits

**CRITICAL**: You must **never** edit the database directly. All changes must go through Drizzle migrations.

### Why Migrations Matter

1. **Version Control**: Migrations are tracked in git
2. **Reproducibility**: Same migrations work in dev, staging, production
3. **Rollback Safety**: Migrations can be reversed
4. **Team Coordination**: Everyone applies the same changes in order

### Migration Workflow

```bash
# 1. Edit db/schema.ts
# 2. Generate migration
npm run db:generate

# 3. Review generated migration file in migrations/ folder
# 4. Apply migration
npm run db:push

# 5. Validate - no TypeScript errors
npx tsc --noEmit
```

---

## Current Schema Structure

The current `db/schema.ts` contains:

### Helper Functions

```typescript
// Common field helpers
function id() {
  return uuid("id").primaryKey().defaultRandom();
}

function createdAt() {
  return timestamp("created_at", { withTimezone: true }).defaultNow().notNull();
}

function updatedAt() {
  return timestamp("updated_at", { withTimezone: true }).defaultNow().notNull();
}
```

### Organizations Table (Tenant Root)

```typescript
export const organizations = pgTable("organizations", {
  id: id(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  organizationType: text("organization_type").notNull(),
  accountOwnerId: uuid("account_owner_id").notNull(),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});
```

### Onboarding Responses Table (Tenant-Scoped)

```typescript
export const onboardingResponses = pgTable("onboarding_responses", {
  id: id(),
  organizationId: uuid("organization_id").references(() => organizations.id).notNull(),
  // ... many fields for onboarding data
  currentStep: text("current_step"),
  isComplete: boolean("is_complete").default(false),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});
```

---

## How to Add a New Entity Safely

### Step 1: Define Table in Schema

Edit `db/schema.ts`:

```typescript
import { pgTable, uuid, text, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";

// Use helper functions for common fields
export const newEntity = pgTable('new_entity', {
  id: id(),
  name: text('name').notNull(),
  organizationId: uuid('organization_id').references(() => organizations.id).notNull(),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});
```

### Step 2: Generate Migration

```bash
npm run db:generate
```

This creates a migration file. Review it to ensure it's correct.

### Step 3: Apply Migration

```bash
npm run db:push
```

This applies the migration to your database.

### Step 4: Validate

```bash
npx tsc --noEmit
# Check for TypeScript errors - no errors means types are aligned
```

### Step 5: Continue to Layer 2

Once Layer 1 has no TypeScript errors, proceed to Layer 2 (Zod schemas). See [03_LAYER_2_ZOD.md](./03_LAYER_2_ZOD.md).

---

## How Tenant/Org Scoping Should Be Handled (Conceptually)

### Multi-Tenant Architecture

In a multi-tenant system, every table that contains tenant-specific data must include an `organizationId` field.

### Pattern

```typescript
export const books = pgTable('books', {
  id: id(),
  title: text('title').notNull(),
  organizationId: uuid('organization_id')
    .references(() => organizations.id)
    .notNull(),  // Required for tenant scoping
  // ... other fields
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});
```

### Tenant Resolution Flow

1. **Middleware** resolves tenant from:
   - Subdomain (e.g., `tenant.example.com`)
   - Custom domain (e.g., `tenant.com`)
   - Path parameter (e.g., `/tenant/...`)

2. **Tenant Context** is available in:
   - Services (Layer 3)
   - Routes (Layer 4)

3. **Query Scoping** happens automatically:
   - Services filter by `organizationId` automatically
   - No manual filtering needed in queries

### Key Points

- ✅ Every tenant-scoped table includes `organizationId`
- ✅ Foreign keys reference `organizations.id`
- ✅ Services enforce tenant boundaries (see Layer 3)
- ❌ Never query without tenant context
- ❌ Never expose cross-tenant data

---

## Required Fields

Every table **MUST** include these three fields:

```typescript
{
  id: id(),                    // UUID primary key
  createdAt: createdAt(),      // Timestamp with timezone
  updatedAt: updatedAt(),      // Timestamp with timezone
}
```

These are provided by helper functions defined in the schema file.

---

## Common Patterns

### Foreign Keys

```typescript
authorId: uuid('author_id')
  .references(() => userProfiles.id)
  .notNull(),
```

### Optional Fields

```typescript
description: text('description'),  // Optional (no .notNull())
```

### Default Values

```typescript
status: text('status').default('draft'),
isActive: boolean('is_active').default(true),
```

### Unique Constraints

```typescript
slug: text('slug').notNull().unique(),
```

### JSONB Fields

```typescript
metadata: jsonb('metadata'),
socialMediaLinks: jsonb('social_media_links'),
```

---

## Validation

After making any schema changes:

```bash
npx tsc --noEmit
```

**Required Status**: No TypeScript errors

If validation fails:
1. Check for missing required fields (`id`, `createdAt`, `updatedAt`)
2. Verify migrations were applied (`npm run db:push`)
3. Check for schema alignment issues

---

## Rules

### ✅ Always Do

- Use helper functions: `id()`, `createdAt()`, `updatedAt()`
- Define foreign keys with `.references()`
- Run `npx tsc --noEmit` after EVERY schema change
- Generate migrations before applying changes
- Review migration files before applying

### ❌ Never Do

- Edit database directly (bypass migrations)
- Skip migration generation
- Proceed if TypeScript compilation fails
- Modify schema based on UI convenience
- Add fields without proper types

---

## Troubleshooting

### Migration Fails

**Problem**: `npm run db:push` fails

**Solution**:
1. Check migration file for syntax errors
2. Verify database connection
3. Check for conflicting migrations
4. Review error message for specific issue

### Validation Fails

**Problem**: `npx tsc --noEmit` shows errors

**Solution**:
1. Check for missing required fields
2. Verify all migrations were applied
3. Check for schema drift (schema.ts vs actual database)
4. Review TypeScript error messages for specific issues

### Type Errors After Schema Change

**Problem**: TypeScript errors appear after schema change

**Solution**:
1. Ensure migration was applied (`npm run db:push`)
2. Validate Layer 1 (`npx tsc --noEmit`)
3. Proceed to Layer 2—types will flow automatically

---

## Next Steps

- **Layer 2**: Read [03_LAYER_2_ZOD.md](./03_LAYER_2_ZOD.md) to understand how Zod schemas are generated from Drizzle
- **Workflow**: Read [08_CHAIN_WORKFLOW_CHECKLIST.md](./08_CHAIN_WORKFLOW_CHECKLIST.md) for complete workflow
- **Multi-Tenant**: Read [09_MULTI_TENANT_NOTES.md](./09_MULTI_TENANT_NOTES.md) for tenant scoping details

---

**Remember**: The database schema is the foundation. Get it right here, and everything else flows naturally.
