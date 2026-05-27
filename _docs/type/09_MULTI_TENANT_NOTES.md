# Multi-Tenant Notes

> **High-level overview** of how tenant resolution and scoping works

**Version**: 2.0.0  
**Last Updated**: January 2026

---

## Overview

This platform supports multi-tenant architecture where each organization (tenant) has isolated data. Tenant boundaries are enforced at the service layer (Layer 3), ensuring complete data isolation.

---

## How Tenant Resolution Works

### Current Implementation

**File**: `lib/middleware/tenant.ts`

```typescript
import { NextRequest } from 'next/server';
import { db } from '../../db/index';
import { organizations } from '../../db/schema';
import { eq } from 'drizzle-orm';

export async function getOrganizationId(request: NextRequest): Promise<string | null> {
  // 1. Try header first (set by middleware)
  const headerOrgId = request.headers.get('x-organization-id');
  if (headerOrgId) {
    return headerOrgId;
  }

  // 2. Try subdomain resolution
  const hostname = request.headers.get('host') || '';
  const subdomain = extractSubdomain(hostname);

  if (subdomain) {
    const [org] = await db
      .select({ id: organizations.id })
      .from(organizations)
      .where(eq(organizations.slug, subdomain))
      .limit(1);

    if (org) {
      return org.id;
    }
  }

  // 3. Fallback: return null (no tenant context)
  return null;
}

function extractSubdomain(hostname: string): string | null {
  const parts = hostname.split('.');
  if (parts.length >= 3) {
    return parts[0];
  }
  return null;
}
```

### Tenant Resolution Sources (Priority Order)

1. **Request Header**: `x-organization-id` (set by middleware)
2. **Subdomain**: `tenant.example.com` → resolves via `organizations.slug`
3. **Session**: User's current organization (future implementation)

### Resolution Flow

```
Request → Middleware → getOrganizationId() → Services → Database Query
                                    ↓
                           organizationId filter
```

---

## Where Tenant Context Is Used

### Layer 3: Services (Enforcement Layer)

**CRITICAL**: All tenant boundary enforcement happens in services.

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

    // ...
  }
}
```

### Layer 4: Routes (Pass-Through)

Routes pass the request to services. They don't handle tenant scoping directly.

```typescript
export async function GET(request: NextRequest) {
  // Service extracts tenant context from request
  const result = await onboardingResponsesService.getOnboardingResponse(request);
  // ...
}
```

### Layers 5-6: Transparent

Hooks and UI don't need to know about tenant scoping—it's handled automatically by services.

---

## What Must Be True in Services

### All Queries Must Filter by Tenant

```typescript
// ✅ CORRECT: Always filter by organizationId
const results = await db.select()
  .from(this.table)
  .where(eq(this.table.organizationId, organizationId));

// ❌ WRONG: Missing tenant filter
const results = await db.select()
  .from(this.table);
```

### All Creates Must Include Tenant

```typescript
// ✅ CORRECT: organizationId from tenant context (never from client)
const [response] = await this.db
  .insert(this.table)
  .values({
    ...validated,
    organizationId,  // From getOrganizationId(request)
  })
  .returning();

// ❌ WRONG: organizationId from client input
const [response] = await this.db
  .insert(this.table)
  .values({
    ...data,  // Client data may contain organizationId
  })
  .returning();
```

### All Updates/Deletes Must Filter by Tenant

```typescript
// ✅ CORRECT: Filter by tenant
const [response] = await this.db
  .update(this.table)
  .set(validated)
  .where(eq(this.table.organizationId, organizationId))  // ← TENANT FILTER
  .returning();

// ❌ WRONG: Only filter by ID
const [response] = await this.db
  .update(this.table)
  .set(validated)
  .where(eq(this.table.id, id))  // Missing tenant filter!
  .returning();
```

### Fail If No Tenant Context

```typescript
const organizationId = await getOrganizationId(request);
if (!organizationId) {
  return this.fail('NO_TENANT', 'Organization ID is required for tenant scoping');
}
```

---

## Database Schema Pattern

### Tenant-Scoped Tables

Every table that contains tenant-specific data **MUST** include:

```typescript
organizationId: uuid('organization_id')
  .references(() => organizations.id)
  .notNull(),  // Required for tenant scoping
```

### Current Tables

| Table | Tenant-Scoped | Organization Reference |
|-------|--------------|------------------------|
| `organizations` | No (tenant root) | N/A |
| `onboardingResponses` | ✅ Yes | `organizationId → organizations.id` |

---

## So Tenant Boundaries Don't Leak

### Critical Rules

1. **Never query without tenant filter**
   - ❌ `db.select().from(table)`
   - ✅ `db.select().from(table).where(eq(table.organizationId, tenantId))`

2. **Always get tenant context from request**
   - ❌ Trust `organizationId` from client input
   - ✅ Use `getOrganizationId(request)` to extract tenant

3. **Never expose cross-tenant data**
   - ❌ Return data from multiple tenants
   - ✅ Only return data from current tenant

4. **Fail gracefully when no tenant**
   - ❌ Continue with null tenant (query all data)
   - ✅ Return `NO_TENANT` error

### Security: Never Trust Client Input

```typescript
// In routes: Strip organizationId from client input
const { organizationId: _, ...dataWithoutOrgId } = validated as any;

// In services: Get organizationId from tenant context
const organizationId = await getOrganizationId(request);
```

---

## Testing Tenant Boundaries

### Test Scenarios

1. **Cross-Tenant Access**: User from Tenant A cannot access Tenant B's data
2. **Missing Tenant**: Operations fail gracefully when no tenant context
3. **Tenant Filtering**: All queries include tenant filter
4. **Tenant Isolation**: Data from different tenants never mixed

### Manual Testing

```bash
# Test with different subdomains
curl -H "Host: tenant-a.example.com" http://localhost:3000/api/simplified/onboarding-responses
curl -H "Host: tenant-b.example.com" http://localhost:3000/api/simplified/onboarding-responses

# Test with header
curl -H "x-organization-id: uuid-here" http://localhost:3000/api/simplified/onboarding-responses
```

---

## Future Enhancements

### Session-Based Tenant (TODO)

```typescript
// In lib/middleware/tenant.ts
export async function getOrganizationId(request: NextRequest): Promise<string | null> {
  // ... existing code ...

  // TODO: Try session (fallback)
  // const session = await getSession(request);
  // if (session?.user) {
  //   return session.user.currentOrganizationId;
  // }

  return null;
}
```

### Multiple Organizations per User (TODO)

Users may belong to multiple organizations. Future implementation will:
- Store user-organization relationships
- Allow users to switch between organizations
- Default to user's primary organization

---

## Summary

### Key Points

1. **Tenant Resolution**: Happens via `getOrganizationId()` from header, subdomain, or session
2. **Tenant Context**: Available in services via `getOrganizationId(request)`
3. **Tenant Filtering**: All queries filter by `organizationId` in services
4. **Service Layer**: Enforces tenant boundaries (not routes or UI)
5. **Database Schema**: All tenant-scoped tables include `organizationId`

### What You Don't Need to Worry About

- ❌ Manual tenant filtering in routes (services handle it)
- ❌ Manual tenant filtering in hooks (services handle it)
- ❌ Tenant context in UI components (services handle it)

### What You Must Do

- ✅ Include `organizationId` in all tenant-scoped tables
- ✅ Filter ALL queries by `organizationId` in services
- ✅ Get tenant context from `getOrganizationId(request)`
- ✅ Fail with `NO_TENANT` if no tenant context available
- ✅ Never trust `organizationId` from client input

---

**Remember**: Tenant boundaries are enforced at the service layer. Services automatically filter by tenant, so routes and UI don't need to worry about tenant scoping. Never trust client-provided `organizationId`—always extract it from the request context.
