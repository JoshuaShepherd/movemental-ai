# Layer 3: Services

> **Type-Safe Business Logic** with Result<T> error handling

**Layer**: 3 of 6  
**Directory**: `lib/services/simplified/`  
**Validation**: `npx tsc --noEmit`  
**Status Required**: No TypeScript errors

---

## Overview

Services implement **business logic** and **data operations** using validated Zod schemas. They provide a clean, type-safe interface between the database and the application, with explicit error handling via the `Result<T>` pattern.

### Key Principles

1. **Simplified Architecture**: Direct Drizzle integration without mapper layer
2. **Type Safety**: All types derived from Zod schemas (Layer 2)
3. **Result Pattern**: Return `Result<T>` types for explicit error handling
4. **Input Validation**: All inputs validated with Zod before operations
5. **Output Validation**: All outputs validated with Zod after operations
6. **Base Class Extension**: All services extend `SimplifiedService` base class

---

## Current Service Structure

### `lib/services/types.ts` - Service Types

```typescript
// Result type for explicit error handling
export type Result<T> = 
  | { ok: true; data: T }
  | { ok: false; error: ServiceError };

export interface ServiceError {
  code: string;
  message: string;
}
```

### `lib/services/simplified-base.ts` - Base Service

Contains the base service class that all entity services extend.

### `lib/services/simplified/onboardingResponses.ts` - Example Service

```typescript
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
} from '@/lib/schemas';

// Service implementation...
```

---

## Service Conventions

### Result<T> Pattern

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
2. **No Exceptions**: No try-catch needed—errors are returned
3. **Type Safety**: TypeScript enforces error handling
4. **Composability**: Results can be chained and combined

---

## Error Handling

### Service Error Types

```typescript
// Common error codes
'NOT_FOUND'        // Entity not found
'VALIDATION_ERROR' // Input validation failed
'DB_ERROR'         // Database operation failed
'PERMISSION_DENIED' // User lacks permission
'DUPLICATE_ENTRY'  // Unique constraint violation
'NO_TENANT'        // No tenant context available
```

### Error Handling Pattern

```typescript
async findById(id: string): Promise<Result<OnboardingResponses>> {
  try {
    // Validate input
    const validatedId = z.string().uuid().parse(id);
    
    // Query database
    const result = await db.select()
      .from(this.table)
      .where(eq(this.table.id, validatedId))
      .limit(1);
    
    if (result.length === 0) {
      return this.fail('NOT_FOUND', `Entity with id ${id} not found`);
    }
    
    // Validate output
    const validated = this.validateOutput(this.selectSchema, result[0]);
    return this.ok(validated);
  } catch (error) {
    return this.fail('DB_ERROR', error instanceof Error ? error.message : String(error));
  }
}
```

---

## How Services Should Enforce Tenant Boundaries

### Automatic Tenant Filtering

Services automatically filter by tenant context:

```typescript
async findMany(filters?: OnboardingResponsesFilters): Promise<Result<OnboardingResponses[]>> {
  const tenantContext = await getTenantContext();
  
  if (!tenantContext) {
    return this.fail('NO_TENANT', 'No tenant context found');
  }
  
  // Automatically add tenant filter
  const tenantFilters = {
    ...filters,
    organizationId: tenantContext.id,  // ← Tenant boundary enforced
  };
  
  // Query with tenant filter
  const results = await db.select()
    .from(this.table)
    .where(and(
      eq(this.table.organizationId, tenantContext.id),  // ← Always filter by tenant
      // ... other filters
    ));
  
  return this.ok(results);
}
```

### Key Points

- ✅ **Always filter by `organizationId`** in queries
- ✅ **Get tenant context** from `getTenantContext()`
- ✅ **Fail if no tenant** context is available
- ❌ **Never query** without tenant filter
- ❌ **Never expose** cross-tenant data

---

## Typical Patterns

### findById

```typescript
async findById(id: string): Promise<Result<OnboardingResponses>> {
  try {
    const validatedId = z.string().uuid().parse(id);
    const tenantContext = await getTenantContext();
    
    const result = await db.select()
      .from(this.table)
      .where(and(
        eq(this.table.id, validatedId),
        eq(this.table.organizationId, tenantContext.id)  // ← Tenant filter
      ))
      .limit(1);
    
    if (result.length === 0) {
      return this.fail('NOT_FOUND', `Entity not found`);
    }
    
    const validated = this.validateOutput(this.selectSchema, result[0]);
    return this.ok(validated);
  } catch (error) {
    return this.fail('DB_ERROR', error.message);
  }
}
```

### list (findMany)

```typescript
async findMany(filters?: OnboardingResponsesFilters): Promise<Result<OnboardingResponses[]>> {
  try {
    const tenantContext = await getTenantContext();
    const validatedFilters = this.validateInput(this.filtersSchema, filters);
    
    const conditions = [
      eq(this.table.organizationId, tenantContext.id)  // ← Tenant filter
    ];
    
    // Add other filters...
    if (validatedFilters.isComplete !== undefined) {
      conditions.push(eq(this.table.isComplete, validatedFilters.isComplete));
    }
    
    const results = await db.select()
      .from(this.table)
      .where(and(...conditions))
      .limit(validatedFilters.limit || 20)
      .offset(validatedFilters.offset || 0);
    
    const validated = results.map(r => this.validateOutput(this.selectSchema, r));
    return this.ok(validated);
  } catch (error) {
    return this.fail('DB_ERROR', error.message);
  }
}
```

### create

```typescript
async create(data: OnboardingResponsesCreate): Promise<Result<OnboardingResponses>> {
  try {
    const tenantContext = await getTenantContext();
    const validated = this.validateInput(this.insertSchema, data);
    
    // Automatically add tenant ID
    const insertData = {
      ...validated,
      organizationId: tenantContext.id,  // ← Tenant ID added
    };
    
    const [result] = await db.insert(this.table)
      .values(insertData)
      .returning();
    
    const validatedOutput = this.validateOutput(this.selectSchema, result);
    return this.ok(validatedOutput);
  } catch (error) {
    return this.fail('DB_ERROR', error.message);
  }
}
```

### update

```typescript
async update(id: string, data: OnboardingResponsesUpdate): Promise<Result<OnboardingResponses>> {
  try {
    const tenantContext = await getTenantContext();
    const validated = this.validateInput(this.updateSchema, data);
    
    const [result] = await db.update(this.table)
      .set({
        ...validated,
        updatedAt: new Date(),  // ← Auto-update timestamp
      })
      .where(and(
        eq(this.table.id, id),
        eq(this.table.organizationId, tenantContext.id)  // ← Tenant filter
      ))
      .returning();
    
    if (!result) {
      return this.fail('NOT_FOUND', `Entity not found`);
    }
    
    const validatedOutput = this.validateOutput(this.selectSchema, result);
    return this.ok(validatedOutput);
  } catch (error) {
    return this.fail('DB_ERROR', error.message);
  }
}
```

### delete

```typescript
async delete(id: string): Promise<Result<void>> {
  try {
    const tenantContext = await getTenantContext();
    
    const result = await db.delete(this.table)
      .where(and(
        eq(this.table.id, id),
        eq(this.table.organizationId, tenantContext.id)  // ← Tenant filter
      ))
      .returning();
    
    if (result.length === 0) {
      return this.fail('NOT_FOUND', `Entity not found`);
    }
    
    return this.ok(undefined);
  } catch (error) {
    return this.fail('DB_ERROR', error.message);
  }
}
```

---

## Validation

After making any service changes:

```bash
npx tsc --noEmit
```

**Required Status**: No TypeScript errors

Validation checks:
- ✅ All services extend `SimplifiedService`
- ✅ All methods return `Result<T>`
- ✅ All inputs validated with Zod
- ✅ All outputs validated with Zod
- ✅ No TypeScript errors in service files

---

## Rules

### ✅ Always Do

- Extend `SimplifiedService` base class
- Return `Result<T>` from ALL methods (never throw)
- Validate inputs/outputs with Zod schemas
- Export singleton instance
- Filter by tenant in all queries
- Handle errors explicitly
- Import types from `lib/schemas/`

### ❌ Never Do

- Throw errors (use `Result<T>`)
- Bypass validation
- Define custom types (derive from schemas)
- Query without tenant filter
- Access database directly from routes/components

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
2. Verify `getTenantContext()` is called
3. Check that tenant context is available
4. Review service methods for missing tenant filters

---

## Next Steps

- **Layer 4**: Read [05_LAYER_4_ROUTES.md](./05_LAYER_4_ROUTES.md) to understand how routes call services
- **Workflow**: Read [08_CHAIN_WORKFLOW_CHECKLIST.md](./08_CHAIN_WORKFLOW_CHECKLIST.md) for complete workflow
- **Multi-Tenant**: Read [09_MULTI_TENANT_NOTES.md](./09_MULTI_TENANT_NOTES.md) for tenant scoping details

---

**Remember**: Services are the business logic layer. They enforce rules, validate data, and maintain tenant boundaries. Never skip validation or tenant filtering.
