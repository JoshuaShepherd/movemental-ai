# Layer 2: Zod Schemas

> **Single Source of Truth for All TypeScript Types** - Runtime Validation and Type Inference

**Layer**: 2 of 6  
**Directory**: `lib/schemas/`  
**Validation**: `npx tsc --noEmit`  
**Status**: ✅ LOCKED (No TypeScript errors)

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

---

## File Structure

```
lib/schemas/
├── index.ts           # Entity schemas (Organizations, OnboardingResponses)
├── base.ts            # Base schemas (IdSchema, BaseFiltersSchema)
├── fit-check.ts       # Fit Check assessment types (domain-specific)
└── onboarding-path.ts # Onboarding path types (domain-specific)
```

### Schema File Purposes

| File | Purpose | Source |
|------|---------|--------|
| `index.ts` | Entity schemas (auto-generated from Drizzle) | Layer 1 via `drizzle-zod` |
| `base.ts` | Shared base schemas for all entities | Manual definition |
| `fit-check.ts` | Fit Check assessment types | Domain-specific (not in database) |
| `onboarding-path.ts` | Onboarding path types | Domain-specific (not in database) |

---

## Current Schemas

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

#### Organizations (Tenant Root)

```typescript
import { createSelectSchema, createInsertSchema, createUpdateSchema } from 'drizzle-zod';
import { z } from 'zod';
import * as schema from '../../db/schema';
import { BaseFiltersSchema, IdSchema } from './base';

// Select Schema (reading data)
export const OrganizationsSelectSchema = createSelectSchema(schema.organizations);
export type Organizations = z.infer<typeof OrganizationsSelectSchema>;

// Insert Schema (creating data)
export const OrganizationsInsertSchema = createInsertSchema(schema.organizations);
export type OrganizationsCreate = z.infer<typeof OrganizationsInsertSchema>;

// Update Schema (updating data)
export const OrganizationsUpdateSchema = createUpdateSchema(schema.organizations);
export type OrganizationsUpdate = z.infer<typeof OrganizationsUpdateSchema>;

// Filters Schema (querying data) - MANUAL, not auto-generated
export const OrganizationsFiltersSchema = BaseFiltersSchema.extend({
  id: IdSchema.optional(),
  slug: z.string().optional(),
  organizationType: z.string().optional(),
});
export type OrganizationsFilters = z.infer<typeof OrganizationsFiltersSchema>;
```

#### Onboarding Responses (Tenant-Scoped)

```typescript
// Select Schema
export const OnboardingResponsesSelectSchema = createSelectSchema(schema.onboardingResponses);
export type OnboardingResponses = z.infer<typeof OnboardingResponsesSelectSchema>;

// Insert Schema
export const OnboardingResponsesInsertSchema = createInsertSchema(schema.onboardingResponses);
export type OnboardingResponsesCreate = z.infer<typeof OnboardingResponsesInsertSchema>;

// Update Schema
export const OnboardingResponsesUpdateSchema = createUpdateSchema(schema.onboardingResponses);
export type OnboardingResponsesUpdate = z.infer<typeof OnboardingResponsesUpdateSchema>;

// Filters Schema
export const OnboardingResponsesFiltersSchema = BaseFiltersSchema.extend({
  id: IdSchema.optional(),
  organizationId: IdSchema.optional(),
  isComplete: z.boolean().optional(),
  currentStep: z.string().optional(),
});
export type OnboardingResponsesFilters = z.infer<typeof OnboardingResponsesFiltersSchema>;
```

### Form-Specific Schemas (Multi-Step Validation)

The `lib/schemas/index.ts` file also contains form-specific schemas for multi-step onboarding validation:

```typescript
export const VoiceContentSamplesSchema = z.object({ ... });
export const BrandAssetsSchema = z.object({ ... });
export const VisionCallingSchema = z.object({ ... });
export const AudienceUnderstandingSchema = z.object({ ... });
export const ContentInventorySchema = z.object({ ... });
export const CapacityTimelineSchema = z.object({ ... });
export const GoalsConcernsSchema = z.object({ ... });
export const DecisionsApprovalsSchema = z.object({ ... });
export const ProfileInformationSchema = z.object({ ... });

// Combined form schema for step-by-step validation
export const OnboardingFormSchema = z.object({
  step1: VoiceContentSamplesSchema,
  step2: BrandAssetsSchema,
  step3: VisionCallingSchema,
  step4: AudienceUnderstandingSchema,
  step5: ContentInventorySchema,
  step6: CapacityTimelineSchema,
  step7: GoalsConcernsSchema,
  step8: DecisionsApprovalsSchema,
  step9: ProfileInformationSchema,
});
```

### Domain-Specific Schemas

#### `lib/schemas/fit-check.ts` - Fit Check Assessment

Contains types for the Fit Check assessment that are NOT derived from the database:

```typescript
export const QuestionTypeSchema = z.enum(['likert', 'numeric', 'single', 'visual']);
export type QuestionType = z.infer<typeof QuestionTypeSchema>;

export const AnswerOptionSchema = z.object({ ... });
export type AnswerOption = z.infer<typeof AnswerOptionSchema>;

export const FitCheckQuestionSchema = z.object({ ... });
export type FitCheckQuestion = z.infer<typeof FitCheckQuestionSchema>;

export const QuestionResponseSchema = z.object({ ... });
export type QuestionResponse = z.infer<typeof QuestionResponseSchema>;

export const FitResultTierSchema = z.enum(['tier1', 'tier2', 'tier3', 'non-fit']);
export type FitResultTier = z.infer<typeof FitResultTierSchema>;

export const FitCheckResultSchema = z.object({ ... });
export type FitCheckResult = z.infer<typeof FitCheckResultSchema>;

export const AssessmentStateSchema = z.enum(['landing', 'in-progress', 'results']);
export type AssessmentState = z.infer<typeof AssessmentStateSchema>;

// Also exports: FIT_CHECK_QUESTIONS, MAX_POSSIBLE_SCORE, calculateFitResult(), getTierInfo()
```

#### `lib/schemas/onboarding-path.ts` - Onboarding Path

Contains types for the onboarding path visualization:

```typescript
export const PhaseStatusSchema = z.enum(['upcoming', 'current', 'completed']);
export type PhaseStatus = z.infer<typeof PhaseStatusSchema>;

export const PhaseActivitySchema = z.object({ ... });
export type PhaseActivity = z.infer<typeof PhaseActivitySchema>;

export const OnboardingPhaseSchema = z.object({ ... });
export type OnboardingPhase = z.infer<typeof OnboardingPhaseSchema>;

// Also exports: ONBOARDING_PHASES, getPhaseIcon(), getTotalWeeks(), getPhaseByStatus()
```

---

## The Four Schema Pattern

For each database entity, you need **exactly four schemas**:

### 1. Select Schema (Reading Data)

```typescript
export const EntitySelectSchema = createSelectSchema(schema.entity);
export type Entity = z.infer<typeof EntitySelectSchema>;
```

**Purpose**: Reading data from database (all fields as stored)  
**Use Case**: Service methods that read, API responses

### 2. Insert Schema (Creating Data)

```typescript
export const EntityInsertSchema = createInsertSchema(schema.entity);
export type EntityCreate = z.infer<typeof EntityInsertSchema>;
```

**Purpose**: Creating new records (excludes auto-generated fields like `id`, `createdAt`)  
**Use Case**: Service `create()` methods, API POST endpoints

### 3. Update Schema (Updating Data)

```typescript
export const EntityUpdateSchema = createUpdateSchema(schema.entity);
export type EntityUpdate = z.infer<typeof EntityUpdateSchema>;
```

**Purpose**: Updating existing records (all fields optional)  
**Use Case**: Service `update()` methods, API PATCH endpoints

### 4. Filters Schema (Querying Data)

```typescript
export const EntityFiltersSchema = BaseFiltersSchema.extend({
  id: IdSchema.optional(),
  organizationId: IdSchema.optional(),  // For tenant-scoped entities
  // ... other filterable fields
});
export type EntityFilters = z.infer<typeof EntityFiltersSchema>;
```

**Purpose**: Filtering and querying records  
**Use Case**: Service `findMany()` methods, API GET endpoints with query params

**Note**: Filters schemas are **NOT** auto-generated—you must define them manually.

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
2. **Form validation schemas**: Multi-step form schemas may need updates

### Example: Adding a Field

**Layer 1 Change** (`db/schema.ts`):
```typescript
export const onboardingResponses = pgTable('onboarding_responses', {
  // ... existing fields
  newField: text('new_field'),  // NEW FIELD
});
```

**Layer 2 Auto-Update** (`lib/schemas/index.ts`):
```typescript
// SelectSchema automatically includes 'newField'
export const OnboardingResponsesSelectSchema = createSelectSchema(schema.onboardingResponses);
// Type automatically includes 'newField'
export type OnboardingResponses = z.infer<typeof OnboardingResponsesSelectSchema>;
```

**Manual Update** (if new field should be filterable):
```typescript
export const OnboardingResponsesFiltersSchema = BaseFiltersSchema.extend({
  // ... existing filters
  newField: z.string().optional(),  // ADD THIS for filtering capability
});
```

---

## Common Failure Modes

### 1. Missing Type Exports

**Error**: TypeScript can't find type `Entity`

**Solution**:
```typescript
// ❌ Wrong: Schema only, no type export
export const EntitySelectSchema = createSelectSchema(schema.entity);

// ✅ Correct: Schema + type export
export const EntitySelectSchema = createSelectSchema(schema.entity);
export type Entity = z.infer<typeof EntitySelectSchema>;
```

### 2. Filters Schema Not Defined

**Error**: `EntityFilters` type not found

**Solution**: Add Filters schema manually:
```typescript
export const EntityFiltersSchema = BaseFiltersSchema.extend({
  id: IdSchema.optional(),
  organizationId: IdSchema.optional(),
});
export type EntityFilters = z.infer<typeof EntityFiltersSchema>;
```

### 3. Manual Type Definitions

**Error**: Type drift between layers

**Solution**:
```typescript
// ❌ Wrong: Manual type definition
interface Entity {
  id: string;
  title: string;
}

// ✅ Correct: Derive from Zod schema
export const EntitySelectSchema = createSelectSchema(schema.entity);
export type Entity = z.infer<typeof EntitySelectSchema>;
```

### 4. Type Inference Not Working

**Error**: TypeScript shows `any` or `unknown`

**Solution**:
```typescript
// ❌ Wrong: Direct type reference
export type Entity = EntitySelectSchema;

// ✅ Correct: Use z.infer<>
export type Entity = z.infer<typeof EntitySelectSchema>;
```

---

## Validation

After making any schema changes:

```bash
npx tsc --noEmit
```

**Required Status**: No TypeScript errors (Layer 2 LOCKED)

Validation checklist:
- ✅ All Select schemas exist for each entity
- ✅ All Insert schemas exist for each entity
- ✅ All Update schemas exist for each entity
- ✅ All Filters schemas exist for each entity
- ✅ All types are exported using `z.infer<typeof Schema>`
- ✅ All domain-specific schemas export corresponding types

---

## Rules

### ✅ Always Do

- Use `createSelectSchema`, `createInsertSchema`, `createUpdateSchema` from `drizzle-zod`
- Export BOTH schema AND inferred type for every schema
- Extend `BaseFiltersSchema` for all filters
- Use `z.infer<typeof Schema>` for type inference
- Validate after changes (`npx tsc --noEmit`)
- Keep domain-specific schemas in separate files

### ❌ Never Do

- Manually define types that duplicate Drizzle-derived types
- Define types without corresponding Zod schemas
- Skip any of the four schemas for database entities
- Use `any` or `unknown` types
- Bypass validation before proceeding to Layer 3
- Define TypeScript interfaces/types directly without Zod

---

## Troubleshooting

### Validation Fails

**Problem**: `npx tsc --noEmit` shows errors in schema files

**Solution**:
1. Check for missing type exports
2. Verify all four schemas exist (Select, Insert, Update, Filters)
3. Ensure types use `z.infer<>` pattern
4. Check Layer 1 has no errors first

### Types Not Updating

**Problem**: Types don't reflect Layer 1 changes

**Solution**:
1. Ensure Layer 1 has no TypeScript errors
2. Check that `drizzle-zod` is generating schemas correctly
3. Verify type exports use `z.infer<>`
4. Run `npx tsc --noEmit` to validate

---

## Next Steps

- **Layer 3**: [04_LAYER_3_SERVICES.md](./04_LAYER_3_SERVICES.md) - Services (business logic)
- **Workflow**: [08_CHAIN_WORKFLOW_CHECKLIST.md](./08_CHAIN_WORKFLOW_CHECKLIST.md) - Complete workflow
- **Glossary**: [10_GLOSSARY.md](./10_GLOSSARY.md) - Term definitions

---

**Remember**: Zod schemas are the single source of truth for all TypeScript types. Every type in the application should be derived from a Zod schema using `z.infer<>`. This bridges compile-time (TypeScript) and runtime (actual data) validation.
