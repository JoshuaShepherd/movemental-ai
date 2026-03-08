---
description: Scaffold a new entity across all six layers
---

# Create New Entity

Scaffold a new entity across all six layers of the type safety chain.

## Required Information

Ask the user for:
1. **Entity name** (e.g., "courses", "lessons", "enrollments")
2. **Fields** (name, type, constraints)
3. **Is it tenant-scoped?** (needs `organizationId` field)
4. **Relationships** (foreign keys to other tables)

## Layer-by-Layer Implementation

### Layer 1: Database Schema (`db/schema.ts`)

Add the Drizzle table definition:
```typescript
export const entityName = pgTable('entity_name', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id), // if tenant-scoped
  // ... other fields
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
```

**Validate**: `npx tsc --noEmit`

### Layer 2: Zod Schemas (`lib/schemas/index.ts` or new file)

```typescript
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import * as schema from '@/db/schema';

// Auto-generate from Drizzle
export const EntitySelectSchema = createSelectSchema(schema.entityName);
export const EntityInsertSchema = createInsertSchema(schema.entityName);

// Export types
export type Entity = z.infer<typeof EntitySelectSchema>;
export type EntityCreate = z.infer<typeof EntityInsertSchema>;
export type EntityUpdate = Partial<EntityCreate>;

// Filters schema
export const EntityFiltersSchema = BaseFiltersSchema.extend({
  organizationId: IdSchema.optional(),
  // ... other filter fields
});
export type EntityFilters = z.infer<typeof EntityFiltersSchema>;
```

**Validate**: `npx tsc --noEmit`

### Layer 3: Service (`lib/services/simplified/entity-service.ts`)

Create service extending SimplifiedBaseService with Result<T> pattern.

**Validate**: `npx tsc --noEmit`

### Layer 4: API Route (`app/api/simplified/entity/route.ts`)

Create route handlers for GET, POST, PATCH, DELETE.

**Validate**: `npx tsc --noEmit`

### Layer 5: Hooks (`hooks/simplified/use-entity.ts`)

Create React Query hooks for data fetching and mutations.

**Validate**: `npx tsc --noEmit`

### Layer 6: UI Components

Create components that consume the hooks.

**Validate**: `npx tsc --noEmit`

## Final Validation

After all layers are complete:
```bash
npx tsc --noEmit
npm run lint
```

Confirm all six layers are LOCKED.
