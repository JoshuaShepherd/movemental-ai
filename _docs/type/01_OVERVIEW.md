# Type Safety Chain Overview

> **The Six-Layer Chain: How Types Flow from Database to UI**

**Version**: 1.1.0  
**Last Updated**: January 2026

---

## What is the Six-Layer Chain?

The Six-Layer Chain is a unidirectional type safety architecture that ensures complete type safety from the database schema all the way to the user interface. Types flow in one direction only: **downstream**, never upstream.

```
Layer 1: DATABASE (Drizzle Schema)     → db/schema.ts
   ↓ Auto-generates types
Layer 2: ZOD (Validation Schemas)      → lib/schemas/ (SSOT for all TypeScript types)
   ↓ Types exported via z.infer<>
Layer 3: SERVICES (Business Logic)     → lib/services/simplified/
   ↓ Uses Zod types
Layer 4: ROUTES (HTTP Interface)       → app/api/simplified/
   ↓ Uses Zod types
Layer 5: HOOKS (Data Fetching)         → hooks/simplified/
   ↓ Uses Zod types
Layer 6: UI (Components)               → components/
```

### The Golden Rule

**Types flow downstream, NEVER upstream.**

This means:
- ✅ Database changes flow down to UI automatically
- ✅ UI needs are met by changing the database first
- ❌ Never add types to UI that don't exist in the database
- ❌ Never skip layers or work around the chain

---

## Single Source of Truth (SSOT) by Layer

### Layer 1: Database Schema (Structure SSOT)

**File**: `db/schema.ts`

The Drizzle schema is the **single source of truth for data structure**. Every field, every relationship, every constraint is defined once here. All other layers derive from this source.

### Layer 2: Zod Schemas (Types SSOT)

**Directory**: `lib/schemas/`

Zod schemas are the **single source of truth for all TypeScript types**. This is where:
- Database types are auto-generated via `drizzle-zod`
- All TypeScript types are exported via `z.infer<typeof Schema>`
- Runtime validation schemas are defined
- Domain-specific types (like FitCheck, OnboardingPath) are defined

**Key Files**:
- `lib/schemas/index.ts` - Entity schemas (Organizations, OnboardingResponses)
- `lib/schemas/base.ts` - Base schemas (IdSchema, BaseFiltersSchema)
- `lib/schemas/fit-check.ts` - Fit Check assessment types
- `lib/schemas/onboarding-path.ts` - Onboarding path types

**Critical Pattern**: All types MUST be exported from Zod schemas:

```typescript
// ✅ CORRECT: Export types from Zod schemas
export const BooksSelectSchema = createSelectSchema(schema.books);
export type Books = z.infer<typeof BooksSelectSchema>;

// ❌ WRONG: Manually define types
interface Books { id: string; title: string; }
```

---

## Why Types Flow Downstream

### 1. Single Source of Truth

The database schema (Layer 1) defines structure, and Zod schemas (Layer 2) export all types. All other layers derive from these sources.

**Benefit**: When you need to add a field, you add it once at the database level, types auto-update in Zod, and flow through all layers.

### 2. Type Safety Guarantees

By enforcing unidirectional flow, we guarantee:
- **Compile-time safety**: TypeScript catches errors before code runs
- **Runtime safety**: Zod validates data at runtime
- **No type drift**: Types can't become out of sync between layers
- **Refactoring confidence**: Changes cascade safely through all layers

### 3. Architectural Integrity

The chain enforces clear separation of concerns:
- **Database**: Defines structure
- **Zod**: Defines types and validates data
- **Services**: Implements business logic
- **Routes**: Provides HTTP interface
- **Hooks**: Manages data fetching
- **UI**: Renders presentation

Each layer has a specific role and cannot be skipped.

---

## What "Fix Bottom-Up" Means

When you encounter a type error at any layer, you **must** fix it from the bottom (Layer 1) up, not from the top down.

### ❌ Wrong Approach (Top-Down)

```
UI shows error: "Property 'email' does not exist"
→ Add 'email' to component interface
→ Add 'email' to hook return type
→ Add 'email' to service return type
→ Add 'email' to Zod schema
→ Add 'email' to database schema
```

**Problem**: This creates type drift and breaks the chain.

### ✅ Correct Approach (Bottom-Up)

```
1. UI shows error: "Property 'email' does not exist"
2. Trace back: Where does this type come from?
3. Find root: Database schema is missing 'email' field
4. Fix at source: Add 'email' to database schema (Layer 1)
5. Generate migration: npm run db:generate
6. Apply migration: npm run db:push
7. Validate Layer 1: npx tsc --noEmit → No errors ✅
8. Layer 2 auto-updates (drizzle-zod picks up change)
9. Validate Layer 2: npx tsc --noEmit → No errors ✅
10. Types flow automatically to Layers 3-6
11. Error resolved with type safety maintained ✅
```

**Benefit**: Types flow naturally downstream, maintaining architectural integrity.

---

## How Multi-Tenant Affects Queries

In a multi-tenant system, every query must be scoped to the current tenant/organization. The type safety chain ensures tenant boundaries are enforced at every layer.

### High-Level Flow

1. **Tenant Resolution**: Middleware resolves tenant from subdomain/custom domain/path
2. **Tenant Context**: Tenant ID is available in services and routes
3. **Query Scoping**: All database queries automatically filter by tenant ID
4. **Type Safety**: Tenant ID is part of the type system, preventing cross-tenant leaks

### Where Tenant Scoping Happens

- **Layer 1 (Database)**: Tables include `organizationId` field
- **Layer 2 (Zod)**: Filters schemas include `organizationId` validation
- **Layer 3 (Services)**: All queries automatically filter by tenant context
- **Layer 4 (Routes)**: Tenant context extracted from request
- **Layer 5 (Hooks)**: Tenant context passed through API calls
- **Layer 6 (UI)**: UI never directly accesses tenant—it's handled automatically

**Key Point**: The type safety chain ensures tenant boundaries are enforced at the service layer, preventing accidental cross-tenant data access.

---

## Validation: Lock-Before-Proceed

Each layer must achieve validation status before proceeding to the next layer.

### Validation Commands

```bash
# Primary validation: TypeScript compilation
npx tsc --noEmit       # Validates ALL layers at once

# Layer-specific validation (if scripts exist)
npm run db:check         # Layer 1: Database
npm run contracts:check  # Layer 2: Zod
npm run services:check   # Layer 3: Services
npm run routes:check     # Layer 4: Routes
npm run hooks:check      # Layer 5: Hooks
npm run ui:check         # Layer 6: UI

# Or validate all at once (if script exists)
npm run validate:all
```

**Note**: Most validation happens via TypeScript compilation (`npx tsc --noEmit`). Layer-specific scripts may not all be implemented yet.

### What "LOCKED" Means

- ✅ All required files exist
- ✅ All structural patterns are correct
- ✅ No TypeScript errors in layer files
- ✅ Types are properly aligned with upstream layers

**Critical**: Never proceed to the next layer if the current layer has TypeScript errors.

---

## Quick Reference

| Layer | File/Directory | Purpose | SSOT For |
|-------|---------------|---------|----------|
| 1 | `db/schema.ts` | Database structure | Data structure |
| 2 | `lib/schemas/` | Zod schemas & types | **All TypeScript types** |
| 3 | `lib/services/simplified/` | Business logic | N/A (derives from Layer 2) |
| 4 | `app/api/simplified/` | HTTP endpoints | N/A (derives from Layer 2) |
| 5 | `hooks/simplified/` | Data fetching | N/A (derives from Layer 2) |
| 6 | `components/` | UI presentation | N/A (derives from Layer 2) |

---

## Key Schema Files

### `lib/schemas/index.ts` - Entity Schemas

Contains all entity schemas auto-generated from Drizzle:

```typescript
// Organizations
export const OrganizationsSelectSchema = createSelectSchema(schema.organizations);
export type Organizations = z.infer<typeof OrganizationsSelectSchema>;
export type OrganizationsCreate = z.infer<typeof OrganizationsInsertSchema>;
export type OrganizationsUpdate = z.infer<typeof OrganizationsUpdateSchema>;
export type OrganizationsFilters = z.infer<typeof OrganizationsFiltersSchema>;

// OnboardingResponses
export const OnboardingResponsesSelectSchema = createSelectSchema(schema.onboardingResponses);
export type OnboardingResponses = z.infer<typeof OnboardingResponsesSelectSchema>;
// ... etc
```

### `lib/schemas/base.ts` - Base Schemas

Contains shared base schemas:

```typescript
export const IdSchema = z.string().uuid();
export const BaseFiltersSchema = z.object({
  limit: z.number().int().positive().optional(),
  offset: z.number().int().nonnegative().optional(),
});
```

### `lib/schemas/fit-check.ts` - Domain-Specific Types

Contains domain-specific schemas not derived from database:

```typescript
export const FitCheckQuestionSchema = z.object({ ... });
export type FitCheckQuestion = z.infer<typeof FitCheckQuestionSchema>;

export const FitCheckResultSchema = z.object({ ... });
export type FitCheckResult = z.infer<typeof FitCheckResultSchema>;
```

### `lib/schemas/onboarding-path.ts` - Domain-Specific Types

Contains onboarding path schemas:

```typescript
export const OnboardingPhaseSchema = z.object({ ... });
export type OnboardingPhase = z.infer<typeof OnboardingPhaseSchema>;
```

---

## Next Steps

- **Layer 1**: Read [02_LAYER_1_DATABASE.md](./02_LAYER_1_DATABASE.md) to understand database schema and migrations
- **Layer 2**: Read [03_LAYER_2_ZOD.md](./03_LAYER_2_ZOD.md) to understand Zod schemas and type exports
- **Workflow**: Read [08_CHAIN_WORKFLOW_CHECKLIST.md](./08_CHAIN_WORKFLOW_CHECKLIST.md) for step-by-step execution guide
- **Multi-Tenant**: Read [09_MULTI_TENANT_NOTES.md](./09_MULTI_TENANT_NOTES.md) for tenant scoping details

---

**Remember**: The perfect type safety chain is not about tools—it's about discipline. Follow the waterfall. Trust the process. Never break the chain.
