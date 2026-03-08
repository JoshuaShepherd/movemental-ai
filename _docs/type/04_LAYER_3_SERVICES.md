# Layer 3: Services

> **Type-Safe Business Logic** with Result<T> error handling

**Layer**: 3 of 6  
**Directory**: `lib/services/simplified/`  
**Validation**: `pnpm services:check` → required `{"status":"LOCKED"}` (or `npx tsc --noEmit`)  
**Status**: ✅ LOCKED (2026-02-15)

---

## Overview

Services implement **business logic** and **data operations** using validated Zod schemas. They provide a clean, type-safe interface between the database and the application, with explicit error handling via the `Result<T>` pattern.

### Key Principles

1. **Simplified Architecture**: Direct Drizzle integration without mapper layer
2. **Type Safety**: All types derived from Zod schemas (Layer 2)
3. **Result Pattern**: Return `Result<T>` types for explicit error handling
4. **Input Validation**: All inputs validated with Zod before operations
5. **Output Validation**: All outputs validated with Zod after operations
6. **Tenant Scoping**: All queries filter by `organizationId` for multi-tenant isolation

---

## File Structure

```
lib/services/
├── types.ts               # Result<T> and ServiceError types
├── simplified-base.ts     # Base service class
└── simplified/
    └── onboardingResponses.ts  # OnboardingResponses service
```

---

## Current Implementation

### `lib/services/types.ts` - Service Types

```typescript
// Result type for explicit error handling
export type Result<T> = 
  | { ok: true; data: T }
  | { ok: false; error: ServiceError };

export type ServiceError = {
  code: string;
  message: string;
};
```

### `lib/services/simplified-base.ts` - Base Service

```typescript
import { z } from 'zod';
import { db } from '../../db/index';
import type { Result, ServiceError } from './types';

export abstract class SimplifiedService<
  TTable,
  TSelect,
  TInsert,
  TUpdate,
  TFilters
> {
  protected abstract table: TTable;
  protected abstract selectSchema: z.ZodSchema<TSelect>;
  protected abstract insertSchema: z.ZodSchema<TInsert>;
  protected abstract updateSchema: z.ZodSchema<TUpdate>;
  protected abstract filtersSchema: z.ZodSchema<TFilters>;

  // Helper methods for Result pattern
  protected ok<T>(data: T): Result<T> {
    return { ok: true, data };
  }

  protected fail(code: string, message: string): Result<never> {
    return {
      ok: false,
      error: { code, message },
    };
  }

  // Validation helpers
  protected validateInput<T>(schema: z.ZodSchema<T>, data: unknown): T {
    return schema.parse(data);
  }

  protected validateOutput<T>(schema: z.ZodSchema<T>, data: unknown): T {
    return schema.parse(data);
  }

  // Get database instance
  protected get db() {
    return db;
  }
}
```

### `lib/services/simplified/onboardingResponses.ts` - Example Service

```typescript
import { and, eq } from 'drizzle-orm';
import { SimplifiedService } from '../simplified-base';
import {
  OnboardingResponsesSelectSchema,
  OnboardingResponsesInsertSchema,
  OnboardingResponsesUpdateSchema,
  OnboardingResponsesFiltersSchema,
  type OnboardingResponses,
  type OnboardingResponsesCreate,
  type OnboardingResponsesUpdate,
  type OnboardingResponsesFilters,
} from '../../schemas';
import { onboardingResponses } from '@/db/schema';
import type { Result } from '../types';
import { getOrganizationId } from '../../middleware/tenant';
import { NextRequest } from 'next/server';

export class OnboardingResponsesService extends SimplifiedService<
  typeof onboardingResponses,
  OnboardingResponses,
  OnboardingResponsesCreate,
  OnboardingResponsesUpdate,
  OnboardingResponsesFilters
> {
  protected table = onboardingResponses;
  protected selectSchema = OnboardingResponsesSelectSchema;
  protected insertSchema = OnboardingResponsesInsertSchema;
  protected updateSchema = OnboardingResponsesUpdateSchema;
  protected filtersSchema = OnboardingResponsesFiltersSchema;

  async getOnboardingResponse(request: NextRequest): Promise<Result<OnboardingResponses | null>> {
    // Implementation with tenant scoping...
  }

  async createOnboardingResponse(
    request: NextRequest,
    data: OnboardingResponsesCreate
  ): Promise<Result<OnboardingResponses>> {
    // Implementation with tenant scoping...
  }

  async updateOnboardingResponse(
    request: NextRequest,
    data: OnboardingResponsesUpdate
  ): Promise<Result<OnboardingResponses>> {
    // Implementation with tenant scoping...
  }

  async completeOnboardingResponse(request: NextRequest): Promise<Result<OnboardingResponses>> {
    // Implementation with tenant scoping...
  }
}

// Singleton export
export const onboardingResponsesService = new OnboardingResponsesService();
```

---

## Result<T> Pattern

Services **never throw errors**. Instead, they return `Result<T>` types:

```typescript
type Result<T> = 
  | { ok: true; data: T }
  | { ok: false; error: ServiceError };

// Success case
return this.ok(validatedData);

// Error case
return this.fail('ERROR_CODE', 'Error message');
```

### Why Result<T>?

1. **Explicit Error Handling**: Errors are part of the type system
2. **No Exceptions**: No try-catch chains needed at caller sites
3. **Type Safety**: TypeScript enforces error checking
4. **Composability**: Results can be chained and combined

---

## Error Codes

### Common Error Codes

| Code | Description | HTTP Status |
|------|-------------|-------------|
| `NOT_FOUND` | Entity not found | 404 |
| `VALIDATION_ERROR` | Input validation failed | 400 |
| `DB_ERROR` | Database operation failed | 500 |
| `PERMISSION_DENIED` | User lacks permission | 403 |
| `DUPLICATE_ENTRY` | Unique constraint violation | 409 |
| `NO_TENANT` | No tenant context available | 401 |

---

## Tenant Scoping

### CRITICAL: All Queries Must Filter by Tenant

Services automatically filter by `organizationId` using the tenant context from the request:

```typescript
async getOnboardingResponse(request: NextRequest): Promise<Result<OnboardingResponses | null>> {
  try {
    // 1. Get tenant context
    const organizationId = await getOrganizationId(request);
    if (!organizationId) {
      return this.fail('NO_TENANT', 'Organization ID is required for tenant scoping');
    }

    // 2. Query with tenant filter
    const [response] = await this.db
      .select()
      .from(this.table)
      .where(eq(this.table.organizationId, organizationId))  // ← TENANT FILTER
      .limit(1);

    if (!response) {
      return this.ok(null);
    }

    // 3. Validate output
    const validated = this.validateOutput(this.selectSchema, response);
    return this.ok(validated);
  } catch (error) {
    return this.fail('DB_ERROR', error instanceof Error ? error.message : 'Database error');
  }
}
```

### Tenant Context Source

The `getOrganizationId()` function in `lib/middleware/tenant.ts` resolves tenant from:

1. **Request Header**: `x-organization-id` (set by middleware)
2. **Subdomain**: Extract from hostname (e.g., `tenant.example.com`)
3. **Session**: User's current organization (fallback - future implementation)

---

## Service Method Patterns

### Get by Tenant (Single Record)

```typescript
async getOnboardingResponse(request: NextRequest): Promise<Result<OnboardingResponses | null>> {
  try {
    const organizationId = await getOrganizationId(request);
    if (!organizationId) {
      return this.fail('NO_TENANT', 'Organization ID is required for tenant scoping');
    }

    const [response] = await this.db
      .select()
      .from(this.table)
      .where(eq(this.table.organizationId, organizationId))
      .limit(1);

    if (!response) {
      return this.ok(null);
    }

    const validated = this.validateOutput(this.selectSchema, response);
    return this.ok(validated);
  } catch (error) {
    return this.fail('DB_ERROR', error instanceof Error ? error.message : 'Database error');
  }
}
```

### Create with Tenant

```typescript
async createOnboardingResponse(
  request: NextRequest,
  data: OnboardingResponsesCreate
): Promise<Result<OnboardingResponses>> {
  try {
    const organizationId = await getOrganizationId(request);
    if (!organizationId) {
      return this.fail('NO_TENANT', 'Organization ID is required for tenant scoping');
    }

    // Remove organizationId from data if present (security - never trust client input)
    const { organizationId: _, ...dataWithoutOrgId } = data as any;

    const validated = this.validateInput(this.insertSchema, dataWithoutOrgId);

    const [response] = await this.db
      .insert(this.table)
      .values({
        ...validated,
        organizationId,  // From tenant context - CRITICAL
      })
      .returning();

    const validatedOutput = this.validateOutput(this.selectSchema, response);
    return this.ok(validatedOutput);
  } catch (error) {
    return this.fail('DB_ERROR', error instanceof Error ? error.message : 'Database error');
  }
}
```

### Update with Tenant

```typescript
async updateOnboardingResponse(
  request: NextRequest,
  data: OnboardingResponsesUpdate
): Promise<Result<OnboardingResponses>> {
  try {
    const organizationId = await getOrganizationId(request);
    if (!organizationId) {
      return this.fail('NO_TENANT', 'Organization ID is required for tenant scoping');
    }

    // Remove organizationId from data if present (security)
    const { organizationId: _, ...dataWithoutOrgId } = data as any;

    const validated = this.validateInput(this.updateSchema, dataWithoutOrgId);

    const [response] = await this.db
      .update(this.table)
      .set({
        ...validated,
        updatedAt: new Date(),  // Auto-update timestamp
      })
      .where(eq(this.table.organizationId, organizationId))  // ← TENANT FILTER
      .returning();

    if (!response) {
      return this.fail('NOT_FOUND', 'Onboarding response not found');
    }

    const validatedOutput = this.validateOutput(this.selectSchema, response);
    return this.ok(validatedOutput);
  } catch (error) {
    return this.fail('DB_ERROR', error instanceof Error ? error.message : 'Database error');
  }
}
```

---

## Adding a New Service

### Step 1: Create Service File

Create `lib/services/simplified/entityName.ts`:

```typescript
import { and, eq } from 'drizzle-orm';
import { SimplifiedService } from '../simplified-base';
import {
  EntitySelectSchema,
  EntityInsertSchema,
  EntityUpdateSchema,
  EntityFiltersSchema,
  type Entity,
  type EntityCreate,
  type EntityUpdate,
  type EntityFilters,
} from '../../schemas';
import { entity } from '@/db/schema';
import type { Result } from '../types';
import { getOrganizationId } from '../../middleware/tenant';
import { NextRequest } from 'next/server';

export class EntityService extends SimplifiedService<
  typeof entity,
  Entity,
  EntityCreate,
  EntityUpdate,
  EntityFilters
> {
  protected table = entity;
  protected selectSchema = EntitySelectSchema;
  protected insertSchema = EntityInsertSchema;
  protected updateSchema = EntityUpdateSchema;
  protected filtersSchema = EntityFiltersSchema;

  // Implement methods...
}

export const entityService = new EntityService();
```

### Step 2: Validate

```bash
npx tsc --noEmit
```

---

## Validation

After making any service changes:

```bash
npx tsc --noEmit
```

**Required Status**: No TypeScript errors (Layer 3 LOCKED)

Validation checklist:
- ✅ Service extends `SimplifiedService`
- ✅ All methods return `Result<T>`
- ✅ All inputs validated with Zod
- ✅ All outputs validated with Zod
- ✅ All queries filter by tenant (`organizationId`)
- ✅ Singleton exported

---

## Rules

### ✅ Always Do

- Extend `SimplifiedService` base class
- Return `Result<T>` from ALL methods (never throw)
- Validate inputs with Zod schemas before operations
- Validate outputs with Zod schemas after operations
- Export singleton instance: `export const entityService = new EntityService()`
- Filter ALL queries by `organizationId` (tenant scoping)
- Handle errors explicitly with `this.fail()`
- Import types from `lib/schemas/`

### ❌ Never Do

- Throw errors (use `Result<T>`)
- Bypass input/output validation
- Define custom types (derive from schemas)
- Query without tenant filter
- Access database directly from routes/components
- Trust `organizationId` from client input

---

## Troubleshooting

### Type Errors

**Problem**: TypeScript errors in service

**Solution**:
1. Ensure Layer 2 has no TypeScript errors (`npx tsc --noEmit`)
2. Verify types are imported from Layer 2 schemas
3. Check that `Result<T>` is used correctly
4. Review TypeScript error messages

### Tenant Boundary Errors

**Problem**: Cross-tenant data leaks

**Solution**:
1. Ensure all queries filter by `organizationId`
2. Verify `getOrganizationId()` is called before every query
3. Check that tenant context is available
4. Review service methods for missing tenant filters

---

## Next Steps

- **Layer 4**: [05_LAYER_4_ROUTES.md](./05_LAYER_4_ROUTES.md) - API routes
- **Workflow**: [08_CHAIN_WORKFLOW_CHECKLIST.md](./08_CHAIN_WORKFLOW_CHECKLIST.md) - Complete workflow
- **Multi-Tenant**: [09_MULTI_TENANT_NOTES.md](./09_MULTI_TENANT_NOTES.md) - Tenant scoping details

---

**Remember**: Services are the business logic layer. They enforce rules, validate data, and maintain tenant boundaries. Never skip validation or tenant filtering.
