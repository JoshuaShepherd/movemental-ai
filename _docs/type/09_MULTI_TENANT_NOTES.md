# Multi-Tenant Notes

> **High-level overview** of how tenant resolution and scoping works

**Version**: 1.1.0  
**Last Updated**: January 2026

---

## Overview

This platform supports multi-tenant architecture where each organization (tenant) has isolated data. Tenant boundaries are enforced at the service layer (Layer 3), ensuring complete data isolation.

---

## How Tenant Resolution Generally Works

### Tenant Resolution Sources

Tenants are resolved from one of these sources (in priority order):

1. **Subdomain**: `tenant.example.com` → resolves to tenant with `subdomain = "tenant"`
2. **Custom Domain**: `tenant.com` → resolves to tenant with `custom_domain = "tenant.com"`
3. **Path Parameter**: `/tenant/...` → resolves to tenant from path (if implemented)
4. **Session**: User's current organization from session (fallback)

### Resolution Flow

```
Request → Middleware → Tenant Resolution → Tenant Context → Services
```

1. **Middleware** intercepts request
2. **Extracts hostname/subdomain** from request
3. **Queries database** for matching organization
4. **Sets tenant context** in request
5. **Services** use tenant context for all queries

---

## Where Tenant Context Typically Comes From

### Middleware (Next.js)

**File**: `lib/middleware/tenant.ts` or `middleware.ts`

**Process**:
1. Extract subdomain/custom domain from request
2. Query `organizations` table for matching tenant
3. Set tenant context in request headers/cookies
4. Pass tenant context to services

### Services (Layer 3)

**Directory**: `lib/services/simplified/`

**Process**:
1. Get tenant context via `getTenantContext()`
2. Automatically filter all queries by `organizationId`
3. Enforce tenant boundaries in all operations

---

## What Must Be True in Services/Routes

### Services (Layer 3)

**Requirements**:
- ✅ All queries filter by `organizationId`
- ✅ All creates include `organizationId`
- ✅ All updates filter by `organizationId`
- ✅ All deletes filter by `organizationId`
- ✅ Fail if no tenant context available

**Pattern**:
```typescript
async findMany(filters?: Filters): Promise<Result<Entity[]>> {
  const tenantContext = await getTenantContext();
  if (!tenantContext) {
    return this.fail('NO_TENANT', 'No tenant context found');
  }
  
  // Always filter by tenant
  const results = await db.select()
    .from(this.table)
    .where(and(
      eq(this.table.organizationId, tenantContext.id),  // ← Tenant filter
      // ... other filters
    ));
  
  return this.ok(results);
}
```

### Routes (Layer 4)

**Requirements**:
- ✅ Tenant context available from middleware
- ✅ No manual tenant filtering needed (services handle it)
- ✅ Tenant context passed to services automatically

**Pattern**:
```typescript
export async function GET(req: NextRequest) {
  // Tenant context already set by middleware
  // Services automatically filter by tenant
  const result = await booksService.findMany(filters);
  // ...
}
```

---

## So Tenant Boundaries Don't Leak

### Critical Rules

1. **Never query without tenant filter**
   - ❌ `db.select().from(books)` (missing tenant filter)
   - ✅ `db.select().from(books).where(eq(books.organizationId, tenantId))`

2. **Always get tenant context**
   - ❌ Assume tenant context exists
   - ✅ Check for tenant context and fail if missing

3. **Never expose cross-tenant data**
   - ❌ Return data from multiple tenants
   - ✅ Only return data from current tenant

4. **Validate tenant in all operations**
   - ❌ Skip tenant validation for "admin" operations
   - ✅ Always validate tenant, even for admins

### Service Layer Enforcement

**Key Point**: Tenant boundaries are enforced at the **service layer** (Layer 3), not at the route layer (Layer 4) or UI layer (Layer 6).

**Why**: 
- Services are the single point of data access
- Routes and UI don't need to worry about tenant scoping
- All queries automatically filtered by tenant

---

## Database Schema Pattern

### Tenant-Scoped Tables

Every table that contains tenant-specific data must include:

```typescript
organizationId: uuid('organization_id')
  .references(() => organizations.id)
  .notNull(),  // Required for tenant scoping
```

### Example

```typescript
export const books = pgTable('books', {
  id: id(),
  title: text('title').notNull(),
  organizationId: uuid('organization_id')
    .references(() => organizations.id)
    .notNull(),  // ← Tenant scoping
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});
```

---

## Tenant Context API

### Getting Tenant Context

```typescript
import { getTenantContext } from '@/lib/tenant/context';

const tenantContext = await getTenantContext();
if (!tenantContext) {
  // No tenant context - fail operation
  return this.fail('NO_TENANT', 'No tenant context found');
}

// Use tenantContext.id for filtering
```

### Tenant Context Structure

```typescript
type TenantContext = {
  id: string;              // Organization ID
  name: string;            // Organization name
  subdomain: string;       // Subdomain (e.g., "tenant")
  customDomain?: string;   // Custom domain (e.g., "tenant.com")
  isActive: boolean;        // Whether tenant is active
  planId?: string;         // Subscription plan ID
  settings: Record<string, any>;  // Tenant settings
  features: string[];      // Enabled features
};
```

---

## Testing Tenant Boundaries

### Test Scenarios

1. **Cross-Tenant Access**: User from Tenant A cannot access Tenant B's data
2. **Missing Tenant**: Operations fail gracefully when no tenant context
3. **Tenant Filtering**: All queries include tenant filter
4. **Tenant Isolation**: Data from different tenants never mixed

### Test Pattern

```typescript
// Test: User from Tenant A cannot access Tenant B's data
const tenantA = await createTenant('tenant-a');
const tenantB = await createTenant('tenant-b');

const bookA = await createBook({ organizationId: tenantA.id });
const bookB = await createBook({ organizationId: tenantB.id });

// Set tenant context to Tenant A
setTenantContext(tenantA);

// Try to access Tenant B's book
const result = await booksService.findById(bookB.id);

// Should fail or return empty (tenant boundary enforced)
expect(result.ok).toBe(false);
```

---

## Summary

### Key Points

1. **Tenant Resolution**: Happens in middleware from subdomain/custom domain
2. **Tenant Context**: Available in services via `getTenantContext()`
3. **Tenant Filtering**: All queries automatically filter by `organizationId`
4. **Service Layer**: Enforces tenant boundaries (not routes or UI)
5. **Database Schema**: All tenant-scoped tables include `organizationId`

### What You Don't Need to Worry About

- ❌ Manual tenant filtering in routes (services handle it)
- ❌ Manual tenant filtering in UI (services handle it)
- ❌ Tenant context in components (services handle it)

### What You Must Do

- ✅ Include `organizationId` in all tenant-scoped tables
- ✅ Filter all queries by `organizationId` in services
- ✅ Get tenant context in services before querying
- ✅ Fail if no tenant context available

---

**Remember**: Tenant boundaries are enforced at the service layer. Services automatically filter by tenant, so routes and UI don't need to worry about tenant scoping.
