# Type Safety Chain Overview

> **The Six-Layer Chain: How Types Flow from Database to UI**

**Version:** 3.0.0  
**Last Updated:** 2026-07-03  
**Status:** All layers **LOCKED/VALIDATED** — 215 entities; `pnpm validate:all` green; `pnpm typecheck` 0 errors (verified 2026-06-13).

**Operational reference:** [`../architecture/TYPE_SAFETY_CHAIN.md`](../architecture/TYPE_SAFETY_CHAIN.md)  
**Layer guides:** [`README.md`](./README.md)

---

## What is the Six-Layer Chain?

The Six-Layer Chain is a unidirectional type safety architecture that ensures complete type safety from the database schema all the way to the user interface. Types flow in one direction only: **downstream**, never upstream.

```
Layer 1: DATABASE (Drizzle Schema)     → src/lib/db/schema.ts (Structure SSOT)
   ↓ Auto-generates types via drizzle-zod
Layer 2: ZOD (Validation Schemas)      → src/lib/schemas/ (Types SSOT)
   ↓ Types exported via z.infer<>
Layer 3: SERVICES (Business Logic)     → src/lib/services/simplified/
   ↓ Uses Zod types, enforces tenant boundaries
Layer 4: ROUTES (HTTP Interface)       → src/app/api/simplified/
   ↓ Uses Zod types for validation
Layer 5: HOOKS (Data Fetching)         → src/hooks/simplified/
   ↓ Uses Zod types, React Query
Layer 6: UI (Components)               → src/components/
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

**File**: `src/lib/db/schema.ts`

The Drizzle schema is the **single source of truth for data structure**. Every field, every relationship, every constraint is defined once here. All other layers derive from this source.

### Layer 2: Zod Schemas (Types SSOT)

**Directory**: `src/lib/schemas/`

Zod schemas are the **single source of truth for all TypeScript types**. This is where:
- Database types are auto-generated via `drizzle-zod`
- All TypeScript types are exported via `z.infer<typeof Schema>`
- Runtime validation schemas are defined
- Domain-specific types (like FitCheck, OnboardingPath) are defined

**Key Files**:

| File | Purpose |
|------|---------|
| `src/lib/schemas/index.ts` | Entity schemas (Organizations, OnboardingResponses) |
| `src/lib/schemas/base.ts` | Base schemas (IdSchema, BaseFiltersSchema) |
| `src/lib/schemas/fit-check.ts` | Fit Check assessment types |
| `src/lib/schemas/onboarding-path.ts` | Onboarding path types |

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

| Layer | Path | Count | Status |
|-------|------|-------|--------|
| 1 — Drizzle | `src/lib/db/schema.ts` | 215 `pgTable` exports (hand-maintained) | **LOCKED** ✅ |
| 2 — Zod | `src/lib/schemas/index.ts` | 215 entities (Select/Insert/Update/Filters) | **LOCKED** ✅ |
| 3 — Services | `src/lib/services/simplified/` | 215 generated + `base.service.ts` | **LOCKED** ✅ |
| 4 — Routes | `src/app/api/simplified/` | 215 CRUD routes + hand-written product APIs | **VALIDATED** ✅ |
| 5 — Hooks | `src/hooks/simplified/` | 215 hook modules | **LOCKED** ✅ |
| 6 — UI | `src/components/` | Feature folders (agent-room, ink-band, …) | not validated |

**Proof:** `pnpm typecheck` — 0 errors. See [TYPE_SAFETY.md](./TYPE_SAFETY.md) and [validation/VALIDATION_STATUS.md](./validation/VALIDATION_STATUS.md).

Layer 1 has **no `generate-schema` script** in this repo — add `pgTable` definitions by hand and apply matching DDL to the shared Supabase DB. Domain logic (onboarding, agent-room, etc.) lives in sibling service/route folders, not in generated `simplified/` files.

The sections below use small illustrative examples (`organizations`, `onboardingResponses`); the live chain follows the same patterns at **215-entity scale**.

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
# Layer-specific checks (output JSON status)
pnpm db:check       # Layer 1 → LOCKED
pnpm contracts:check  # Layer 2 → LOCKED
pnpm services:check   # Layer 3 → LOCKED
pnpm routes:check     # Layer 4 → VALIDATED
pnpm hooks:check      # Layer 5 → LOCKED
pnpm validate:all     # Run all checks in sequence

# Primary validation: TypeScript compilation (includes Layer 6)
pnpm typecheck
```

This single command validates ALL layers at once. Errors will show the file and line number to identify which layer has issues.

**Quick reference**: See [08_CHAIN_WORKFLOW_CHECKLIST.md](./08_CHAIN_WORKFLOW_CHECKLIST.md#type-safety-validation-runbook) for the full validation runbook (lock-before-proceed steps, file path → layer mapping, stop criteria).

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
| 1 | `src/lib/db/schema.ts` | Database structure | Data structure |
| 2 | `src/lib/schemas/` | Zod schemas & types | **All TypeScript types** |
| 3 | `src/lib/services/simplified/` | Business logic | N/A (derives from Layer 2) |
| 4 | `src/app/api/simplified/` | HTTP endpoints | N/A (derives from Layer 2) |
| 5 | `src/hooks/simplified/` | Data fetching | N/A (derives from Layer 2) |
| 6 | `src/components/` | UI presentation | N/A (derives from Layer 2) |

### Key Commands

```bash
# Regenerate layers (Layer 1 is hand-maintained)
pnpm generate:schemas
pnpm generate:services
pnpm generate:routes
pnpm generate:hooks

# Validate
pnpm validate:all
pnpm typecheck

# Development
pnpm dev
```

---

## Documentation Index

| Document | Purpose |
|----------|---------|
| [README.md](./README.md) | Documentation index |
| [TYPE_SAFETY.md](./TYPE_SAFETY.md) | Quick status and commands |
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
