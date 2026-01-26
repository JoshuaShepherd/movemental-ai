---
description: Verify multi-tenant isolation is properly enforced
---

# Tenant Isolation Check

Verify that multi-tenant boundaries are properly enforced across all layers.

## Checklist

### Layer 1: Database Schema

Check that tenant-scoped tables include `organizationId`:
```bash
# Search for tables that might need tenant scoping
```

Read `db/schema.ts` and verify:
- [ ] All tenant-scoped tables have `organizationId` field
- [ ] Foreign key references `organizations.id`
- [ ] Field is marked `notNull()`

### Layer 2: Zod Schemas

Check `lib/schemas/` for:
- [ ] Filter schemas include `organizationId` validation
- [ ] `organizationId` uses `IdSchema` (UUID validation)

### Layer 3: Services (Critical Layer)

Check `lib/services/simplified/` for:
- [ ] All queries filter by `organizationId`
- [ ] No queries can bypass tenant context
- [ ] `getOrganizationId()` is called in service methods

Search for potential leaks:
```typescript
// Look for queries without organizationId filter
// Look for .findMany() or .findFirst() without where clause
```

### Layer 4: Routes

Check `app/api/simplified/` for:
- [ ] Tenant context extracted via `getOrganizationId(request)`
- [ ] Organization ID passed to service methods
- [ ] No direct database access (must go through services)

### Layer 5-6: Hooks & UI

These layers should be transparent to tenant scoping (handled by routes/services).

## Red Flags to Look For

1. **Direct database queries** in routes or hooks (bypassing services)
2. **Missing organizationId** in WHERE clauses
3. **Hardcoded organization IDs** instead of using context
4. **Cross-tenant data leakage** in JOINs or subqueries

## Verification Commands

```bash
# Search for potential tenant leaks
grep -r "findMany\|findFirst" lib/services/ --include="*.ts"
grep -r "organizationId" lib/services/ --include="*.ts"
```

Report any tenant isolation issues found.
