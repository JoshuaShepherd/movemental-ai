# Type Safety Chain Overview

> **The Six-Layer Chain: How Types Flow from Database to UI**

**Version**: 2.0.0  
**Last Updated**: January 26, 2026  
**Status**: ✅ All Layers LOCKED (No TypeScript errors - verified)

---

## What is the Six-Layer Chain?

The Six-Layer Chain is a unidirectional type safety architecture that ensures complete type safety from the database schema all the way to the user interface. Types flow in one direction only: **downstream**, never upstream.

```
Layer 1: DATABASE (Drizzle Schema)     → db/schema.ts (Structure SSOT)
   ↓ Auto-generates types via drizzle-zod
Layer 2: ZOD (Validation Schemas)      → lib/schemas/ (Types SSOT)
   ↓ Types exported via z.infer<>
Layer 3: SERVICES (Business Logic)     → lib/services/simplified/
   ↓ Uses Zod types, enforces tenant boundaries
Layer 4: ROUTES (HTTP Interface)       → app/api/simplified/
   ↓ Uses Zod types for validation
Layer 5: HOOKS (Data Fetching)         → hooks/simplified/
   ↓ Uses Zod types, React Query
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

| File | Purpose |
|------|---------|
| `lib/schemas/index.ts` | Entity schemas (Organizations, OnboardingResponses) |
| `lib/schemas/base.ts` | Base schemas (IdSchema, BaseFiltersSchema) |
| `lib/schemas/fit-check.ts` | Fit Check assessment types |
| `lib/schemas/onboarding-path.ts` | Onboarding path types |

**Critical Pattern**: All types MUST be exported from Zod schemas:

```typescript
// ✅ CORRECT: Export types from Zod schemas
export const EntitySelectSchema = createSelectSchema(schema.entity);
export type Entity = z.infer<typeof EntitySelectSchema>;

// ❌ WRONG: Manually define types
interface Entity { id: string; title: string; }
```

---

## Current Implementation Status

### Layer 1: Database (`db/schema.ts`)

**Tables**:
- `organizations` - Tenant root table
- `onboardingResponses` - Tenant-scoped onboarding data

**Status**: ✅ LOCKED

### Layer 2: Zod Schemas (`lib/schemas/`)

**Entity Schemas** (auto-generated from Drizzle):
- Organizations: Select, Insert, Update, Filters + types
- OnboardingResponses: Select, Insert, Update, Filters + types

**Domain-Specific Schemas**:
- Fit Check: Questions, Responses, Results
- Onboarding Path: Phases, Activities

**Status**: ✅ LOCKED

### Layer 3: Services (`lib/services/simplified/`)

**Services**:
- `OnboardingResponsesService` - Full CRUD with tenant scoping

**Status**: ✅ LOCKED

### Layer 4: Routes (`app/api/simplified/`)

**Routes**:
- `/api/simplified/onboarding-responses` - GET, POST, PATCH
- `/api/simplified/onboarding-responses/complete` - POST

**Status**: ✅ LOCKED

### Layer 5: Hooks (`hooks/simplified/`)

**Hooks**:
- `useOnboardingResponse` - Query hook
- `useCreateOnboardingResponse` - Mutation hook
- `useUpdateOnboardingResponse` - Mutation hook
- `useCompleteOnboardingResponse` - Mutation hook
- `useUploadOnboardingFile` - File upload mutation

**Status**: ✅ LOCKED

### Layer 6: UI (`components/`)

**Component Directories**: 20+ feature-specific directories

**Status**: ✅ LOCKED

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
- **Services**: Implements business logic, enforces tenant boundaries
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

---

## How Multi-Tenant Affects Queries

In a multi-tenant system, every query must be scoped to the current tenant/organization. The type safety chain ensures tenant boundaries are enforced at every layer.

### High-Level Flow

1. **Tenant Resolution**: Middleware resolves tenant from subdomain/custom domain/header
2. **Tenant Context**: Available in services via `getOrganizationId(request)`
3. **Query Scoping**: All database queries automatically filter by `organizationId`
4. **Type Safety**: Tenant ID is part of the type system, preventing cross-tenant leaks

### Where Tenant Scoping Happens

| Layer | Responsibility |
|-------|---------------|
| Layer 1 (Database) | Tables include `organizationId` field |
| Layer 2 (Zod) | Filters schemas include `organizationId` validation |
| Layer 3 (Services) | **All queries filter by tenant context** |
| Layer 4 (Routes) | Pass request to services (tenant context extracted) |
| Layer 5 (Hooks) | Transparent (tenant handled by routes/services) |
| Layer 6 (UI) | Transparent (tenant handled automatically) |

**Key Point**: Tenant boundaries are enforced at the service layer (Layer 3).

---

## Validation: Lock-Before-Proceed

Each layer must achieve validation status before proceeding to the next layer.

### Validation Command

```bash
# Primary validation: TypeScript compilation
npx tsc --noEmit
```

This single command validates ALL layers at once. Errors will show the file and line number to identify which layer has issues.

### What "LOCKED" Means

- ✅ No TypeScript errors in layer files
- ✅ All required files exist
- ✅ All structural patterns are correct
- ✅ Types are properly aligned with upstream layers

**Critical**: Never proceed to the next layer if the current layer has TypeScript errors.

---

## Quick Reference

### File Locations

| Layer | File/Directory | Purpose | SSOT For |
|-------|---------------|---------|----------|
| 1 | `db/schema.ts` | Database structure | Data structure |
| 2 | `lib/schemas/` | Zod schemas & types | **All TypeScript types** |
| 3 | `lib/services/simplified/` | Business logic | N/A (derives from Layer 2) |
| 4 | `app/api/simplified/` | HTTP endpoints | N/A (derives from Layer 2) |
| 5 | `hooks/simplified/` | Data fetching | N/A (derives from Layer 2) |
| 6 | `components/` | UI presentation | N/A (derives from Layer 2) |

### Key Commands

```bash
# Database migrations
npm run db:generate    # Generate migration
npm run db:push        # Apply migration

# Type validation
npx tsc --noEmit       # Validate all layers

# Development
npm run dev            # Start dev server
```

---

## Documentation Index

| Document | Purpose |
|----------|---------|
| [02_LAYER_1_DATABASE.md](./02_LAYER_1_DATABASE.md) | Database schema details |
| [03_LAYER_2_ZOD.md](./03_LAYER_2_ZOD.md) | Zod schemas (Types SSOT) |
| [04_LAYER_3_SERVICES.md](./04_LAYER_3_SERVICES.md) | Services layer |
| [05_LAYER_4_ROUTES.md](./05_LAYER_4_ROUTES.md) | API routes |
| [06_LAYER_5_HOOKS.md](./06_LAYER_5_HOOKS.md) | React hooks |
| [07_LAYER_6_UI.md](./07_LAYER_6_UI.md) | UI components |
| [08_CHAIN_WORKFLOW_CHECKLIST.md](./08_CHAIN_WORKFLOW_CHECKLIST.md) | Step-by-step workflow |
| [09_MULTI_TENANT_NOTES.md](./09_MULTI_TENANT_NOTES.md) | Multi-tenant details |
| [10_GLOSSARY.md](./10_GLOSSARY.md) | Term definitions |
| [11_PLATFORM_ARCHITECTURE_AT_A_GLANCE.md](./11_PLATFORM_ARCHITECTURE_AT_A_GLANCE.md) | Platform overview |
| [12_PUBLIC_SITEMAP_AND_FEATURES.md](./12_PUBLIC_SITEMAP_AND_FEATURES.md) | Public site structure |

---

**Remember**: The perfect type safety chain is not about tools—it's about discipline. Follow the waterfall. Trust the process. Never break the chain.
