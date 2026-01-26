# Layer 2: Zod Schemas

> **Single Source of Truth for All TypeScript Types** - Runtime Validation and Type Inference

**Layer**: 2 of 6  
**Directory**: `lib/schemas/`  
**Validation**: `npx tsc --noEmit`  
**Status Required**: No TypeScript errors

---

## Overview

Zod schemas serve two critical purposes in the type safety chain:

1. **Runtime Validation**: Validate data at runtime to ensure it matches expected structure
2. **TypeScript Types**: Serve as the **single source of truth for all TypeScript types** via `z.infer<>`

### Key Principle: Zod = Types SSOT

**All TypeScript types in the application MUST be exported from Zod schemas.** This ensures:
- Types are always in sync with validation logic
- No manual type definitions that could drift
- Compile-time and runtime safety are aligned

### Key Schema Files

| File | Purpose |
|------|---------|
| `lib/schemas/index.ts` | Entity schemas (Organizations, OnboardingResponses) |
| `lib/schemas/base.ts` | Base schemas (IdSchema, BaseFiltersSchema) |
| `lib/schemas/fit-check.ts` | Fit Check assessment types |
| `lib/schemas/onboarding-path.ts` | Onboarding path types |

---

## The Four Schema Pattern

For each database table, you need **exactly four schemas**:

### 1. Select Schema (Reading Data)

```typescript
export const BooksSelectSchema = createSelectSchema(schema.books);
export type Books = z.infer<typeof BooksSelectSchema>;
```

**Purpose**: Reading data from database (all fields as stored)  
**Use Case**: Service methods that read, API responses

### 2. Insert Schema (Creating Data)

```typescript
export const BooksInsertSchema = createInsertSchema(schema.books);
export type BooksCreate = z.infer<typeof BooksInsertSchema>;
```

**Purpose**: Creating new records (excludes auto-generated fields like `id`, `createdAt`)  
**Use Case**: Service `create()` methods, API POST endpoints

### 3. Update Schema (Updating Data)

```typescript
export const BooksUpdateSchema = createUpdateSchema(schema.books);
export type BooksUpdate = z.infer<typeof BooksUpdateSchema>;
```

**Purpose**: Updating existing records (all fields optional)  
**Use Case**: Service `update()` methods, API PATCH endpoints

### 4. Filters Schema (Querying Data)

```typescript
export const BooksFiltersSchema = BaseFiltersSchema.extend({
  id: IdSchema.optional(),
  title: z.string().optional(),
  organizationId: IdSchema.optional(),
});
export type BooksFilters = z.infer<typeof BooksFiltersSchema>;
```

**Purpose**: Filtering and querying records  
**Use Case**: Service `findMany()` methods, API GET endpoints with query params

**Note**: Filters schemas are **not** auto-generated—you must define them manually.

---

## Current Schema Structure

### `lib/schemas/base.ts` - Base Schemas

```typescript
import { z } from 'zod';

// Base schema for IDs
export const IdSchema = z.string().uuid();

// Base filters schema that all filter schemas extend
export const BaseFiltersSchema = z.object({
  limit: z.number().int().positive().optional(),
  offset: z.number().int().nonnegative().optional(),
});
```

### `lib/schemas/index.ts` - Entity Schemas

```typescript
import { createSelectSchema, createInsertSchema, createUpdateSchema } from 'drizzle-zod';
import { z } from 'zod';
import * as schema from '../../db/schema';
import { BaseFiltersSchema, IdSchema } from './base';

// ============================================================================
// Organizations Schemas
// ============================================================================

export const OrganizationsSelectSchema = createSelectSchema(schema.organizations);
export type Organizations = z.infer<typeof OrganizationsSelectSchema>;

export const OrganizationsInsertSchema = createInsertSchema(schema.organizations);
export type OrganizationsCreate = z.infer<typeof OrganizationsInsertSchema>;

export const OrganizationsUpdateSchema = createUpdateSchema(schema.organizations);
export type OrganizationsUpdate = z.infer<typeof OrganizationsUpdateSchema>;

export const OrganizationsFiltersSchema = BaseFiltersSchema.extend({
  id: IdSchema.optional(),
  slug: z.string().optional(),
  organizationType: z.string().optional(),
});
export type OrganizationsFilters = z.infer<typeof OrganizationsFiltersSchema>;

// ============================================================================
// OnboardingResponses Schemas
// ============================================================================

export const OnboardingResponsesSelectSchema = createSelectSchema(schema.onboardingResponses);
export type OnboardingResponses = z.infer<typeof OnboardingResponsesSelectSchema>;

export const OnboardingResponsesInsertSchema = createInsertSchema(schema.onboardingResponses);
export type OnboardingResponsesCreate = z.infer<typeof OnboardingResponsesInsertSchema>;

export const OnboardingResponsesUpdateSchema = createUpdateSchema(schema.onboardingResponses);
export type OnboardingResponsesUpdate = z.infer<typeof OnboardingResponsesUpdateSchema>;

export const OnboardingResponsesFiltersSchema = BaseFiltersSchema.extend({
  id: IdSchema.optional(),
  organizationId: IdSchema.optional(),
  isComplete: z.boolean().optional(),
  currentStep: z.string().optional(),
});
export type OnboardingResponsesFilters = z.infer<typeof OnboardingResponsesFiltersSchema>;
```

### `lib/schemas/fit-check.ts` - Domain-Specific Types

For types that are NOT derived from the database (like assessment questions, results tiers, etc.):

```typescript
import { z } from 'zod';

// Question types
export const QuestionTypeSchema = z.enum(['likert', 'numeric', 'single', 'visual']);
export type QuestionType = z.infer<typeof QuestionTypeSchema>;

// Answer option
export const AnswerOptionSchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.number(),
  shortcut: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
});
export type AnswerOption = z.infer<typeof AnswerOptionSchema>;

// Question
export const FitCheckQuestionSchema = z.object({
  id: z.string(),
  type: QuestionTypeSchema,
  category: z.string(),
  question: z.string(),
  subtext: z.string().optional(),
  options: z.array(AnswerOptionSchema),
  required: z.boolean().default(true),
});
export type FitCheckQuestion = z.infer<typeof FitCheckQuestionSchema>;

// Result
export const FitCheckResultSchema = z.object({
  totalScore: z.number(),
  maxPossibleScore: z.number(),
  percentageScore: z.number(),
  tier: FitResultTierSchema,
  responses: z.array(QuestionResponseSchema),
  completedAt: z.date(),
  timeToComplete: z.number(),
});
export type FitCheckResult = z.infer<typeof FitCheckResultSchema>;
```

### `lib/schemas/onboarding-path.ts` - Domain-Specific Types

```typescript
import { z } from 'zod';

export const PhaseStatusSchema = z.enum(['upcoming', 'current', 'completed']);
export type PhaseStatus = z.infer<typeof PhaseStatusSchema>;

export const OnboardingPhaseSchema = z.object({
  id: z.string(),
  number: z.number(),
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  timeEstimate: z.string(),
  weekRange: z.string(),
  icon: z.string(),
  activities: z.array(PhaseActivitySchema),
  status: PhaseStatusSchema.default('upcoming'),
});
export type OnboardingPhase = z.infer<typeof OnboardingPhaseSchema>;
```

---

## How Changes in Layer 1 Affect Layer 2

### Automatic Updates

When you change the Drizzle schema (Layer 1):

1. **Select, Insert, Update schemas** are automatically updated by `drizzle-zod`
2. **Type inference** works automatically via `z.infer<>`
3. **No manual edits needed** for basic schema changes

### Manual Updates Required

You may need to manually update:

1. **Filters schemas**: Query filters are not auto-generated
2. **Type exports**: Ensure all types are exported using `z.infer<>`

### Example: Adding a Field

**Layer 1 Change** (`db/schema.ts`):
```typescript
export const books = pgTable('books', {
  // ... existing fields
  subtitle: text('subtitle'),  // NEW FIELD
});
```

**Layer 2 Auto-Update** (`lib/schemas/index.ts`):
```typescript
// SelectSchema automatically includes 'subtitle'
export const BooksSelectSchema = createSelectSchema(schema.books);
// Type automatically includes 'subtitle'
export type Books = z.infer<typeof BooksSelectSchema>;
```

**No manual edits needed** for Select, Insert, or Update schemas!

---

## Common Failure Modes

### 1. Missing Type Exports

**Error**: TypeScript can't find type `Books`

**Problem**: Type not exported

**Solution**:
```typescript
// ❌ Wrong: Schema only, no type export
export const BooksSelectSchema = createSelectSchema(schema.books);

// ✅ Correct: Schema + type export
export const BooksSelectSchema = createSelectSchema(schema.books);
export type Books = z.infer<typeof BooksSelectSchema>;
```

### 2. Filters Schema Not Defined

**Error**: `BooksFilters` type not found

**Problem**: Filters schema missing

**Solution**: Add Filters schema:
```typescript
export const BooksFiltersSchema = BaseFiltersSchema.extend({
  id: IdSchema.optional(),
  title: z.string().optional(),
});
export type BooksFilters = z.infer<typeof BooksFiltersSchema>;
```

### 3. Schema Out of Sync with Database

**Error**: Validation fails at runtime

**Problem**: Drizzle schema changed but Zod schema not updated

**Solution**:
1. Ensure Layer 1 has no TypeScript errors (`npx tsc --noEmit`)
2. Regenerate Zod schemas (if needed)
3. Validate Layer 2 (`npx tsc --noEmit`)

### 4. Manual Type Definitions

**Error**: Type drift between layers

**Problem**: Manually defined types that don't use `z.infer<>`

**Solution**:
```typescript
// ❌ Wrong: Manual type definition
interface Books {
  id: string;
  title: string;
}

// ✅ Correct: Derive from Zod schema
export const BooksSelectSchema = createSelectSchema(schema.books);
export type Books = z.infer<typeof BooksSelectSchema>;
```

### 5. Type Inference Not Working

**Error**: TypeScript shows `any` or `unknown`

**Problem**: Not using `z.infer<>` correctly

**Solution**:
```typescript
// ❌ Wrong: Direct type reference
export type Books = BooksSelectSchema;

// ✅ Correct: Use z.infer<>
export type Books = z.infer<typeof BooksSelectSchema>;
```

---

## Validation

After making any schema changes:

```bash
npx tsc --noEmit
```

**Required Status**: No TypeScript errors

Validation checks:
- ✅ All Select schemas exist
- ✅ All Insert schemas exist
- ✅ All Update schemas exist
- ✅ All Filters schemas exist
- ✅ All types are exported using `z.infer<>`

---

## Rules

### ✅ Always Do

- Use `createSelectSchema`, `createInsertSchema`, `createUpdateSchema` from `drizzle-zod`
- Export both schema AND inferred type
- Extend `BaseFiltersSchema` for all filters
- Use `z.infer<>` for type inference
- Validate after changes (`npx tsc --noEmit`)
- Keep domain-specific schemas in separate files

### ❌ Never Do

- Manually duplicate Drizzle types
- Define types that contradict schemas
- Skip any of the four schemas
- Use `any` or `unknown` types
- Bypass validation
- Define TypeScript interfaces/types directly without Zod

---

## Troubleshooting

### Validation Fails

**Problem**: `npx tsc --noEmit` shows errors in schema files

**Solution**:
1. Check for missing type exports
2. Verify all four schemas exist (Select, Insert, Update, Filters)
3. Ensure types use `z.infer<>` pattern
4. Review TypeScript error messages for specific issues

### Types Not Updating

**Problem**: Types don't reflect Layer 1 changes

**Solution**:
1. Ensure Layer 1 has no TypeScript errors
2. Check that `drizzle-zod` is generating schemas correctly
3. Verify type exports use `z.infer<>`
4. Run `npx tsc --noEmit` to validate

---

## Next Steps

- **Layer 3**: Read [04_LAYER_3_SERVICES.md](./04_LAYER_3_SERVICES.md) to understand how services use Zod schemas
- **Workflow**: Read [08_CHAIN_WORKFLOW_CHECKLIST.md](./08_CHAIN_WORKFLOW_CHECKLIST.md) for complete workflow
- **Glossary**: Read [10_GLOSSARY.md](./10_GLOSSARY.md) for term definitions

---

**Remember**: Zod schemas are the single source of truth for all TypeScript types. Every type in the application should be derived from a Zod schema using `z.infer<>`. This bridges compile-time (TypeScript) and runtime (actual data) validation.
