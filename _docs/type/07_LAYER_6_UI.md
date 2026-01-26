# Layer 6: UI Components

> **Type-Safe Presentation Layer** consuming hooks and schemas

**Layer**: 6 of 6  
**Directory**: `components/`  
**Validation**: `npx tsc --noEmit`  
**Status**: ✅ LOCKED (No TypeScript errors)

---

## Overview

UI components provide the **user interface** using type-safe props derived from all previous layers. Components never define their own data types—they consume types from hooks and schemas, ensuring complete type safety from database to UI.

### Key Principles

1. **Type Safety**: All types derived from Zod schemas (Layer 2)
2. **Hook Integration**: All data fetching through React hooks (Layer 5)
3. **No Direct Fetching**: Never fetch data directly in components
4. **Proper Error Handling**: Handle loading and error states
5. **Form Validation**: Use React Hook Form with Zod resolvers
6. **Tenant Transparency**: Components are tenant-agnostic

---

## File Structure

```
components/
├── ui/                        # shadcn/ui components (DO NOT MODIFY)
├── ai-book-reading/           # AI book reading components
├── ai-media-lab/              # AI media lab components
├── ai-vision/                 # AI vision components
├── analytics-dashboard/       # Analytics dashboard components
├── book-purchase/             # Book purchase components
├── content-workbench/         # Content workbench components
├── course-enrollment/         # Course enrollment components
├── dashboard/                 # Dashboard components
├── e-reader/                  # E-reader components
├── fit-check/                 # Fit Check assessment components
├── homepage/                  # Homepage components
├── leader-profile/            # Leader profile components
├── legal-support/             # Legal support components
├── network-discovery/         # Network discovery components
├── onboarding/                # Onboarding components
├── onboarding-path/           # Onboarding path components
├── search/                    # Search components
├── shared/                    # Shared components (navigation, footer)
├── subscription/              # Subscription/pricing components
├── team-credibility/          # Team credibility components
├── topic-hub/                 # Topic hub components
├── user-account/              # User account components
└── why-movemental/            # Why Movemental components
```

### Component Organization

Each feature folder contains:
- `index.ts` - Barrel export for all components
- `[Component]Container.tsx` - Container component (data fetching)
- `[Component]*.tsx` - Presentational components

---

## UI Only Consumes Hooks

### ✅ Correct Pattern

```typescript
import { useOnboardingResponse } from '@/hooks/simplified/useOnboardingResponse';
import type { OnboardingResponses } from '@/lib/schemas';

export function OnboardingResponseDisplay() {
  const { data, isLoading, error } = useOnboardingResponse();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!data) return <EmptyState message="No response found" />;

  return (
    <div>
      <h2>Current Step: {data.currentStep}</h2>
      <p>Complete: {data.isComplete ? 'Yes' : 'No'}</p>
    </div>
  );
}
```

### ❌ Wrong Pattern

```typescript
// NEVER fetch directly in components
export function OnboardingResponseDisplay() {
  const [data, setData] = useState<OnboardingResponses | null>(null);

  useEffect(() => {
    fetch('/api/simplified/onboarding-responses')
      .then(res => res.json())
      .then(({ data }) => setData(data));
  }, []);

  return <div>{data?.currentStep}</div>;
}
```

---

## Avoid Leaking Types Upstream

### The Rule

**Types flow downstream, never upstream.**

### ❌ Wrong: Adding Types in UI

```typescript
// WRONG: Adding type in UI that doesn't exist in database
interface ResponseWithRating extends OnboardingResponses {
  rating: number;  // ← This doesn't exist in database!
}

export function ResponseCard({ response }: { response: ResponseWithRating }) {
  return <div>{response.rating}</div>;
}
```

### ✅ Correct: Add Type at Source

1. Add `rating` field to database schema (Layer 1)
2. Run migration: `npm run db:generate && npm run db:push`
3. Types flow automatically to Layer 2 (Zod)
4. Types flow automatically to Layer 5 (Hooks)
5. UI can now use `rating` field

---

## Loading and Error States

### Always Handle All States

```typescript
export function EntityDisplay({ id }: { id: string }) {
  const { data, isLoading, error } = useEntity(id);

  // Loading state
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Error state
  if (error) {
    return <ErrorMessage error={error} />;
  }

  // Empty state
  if (!data) {
    return <EmptyState message="Entity not found" />;
  }

  // Success state
  return <EntityContent entity={data} />;
}
```

### Component Patterns

```typescript
// Loading spinner component
function LoadingSpinner() {
  return <div className="animate-spin">Loading...</div>;
}

// Error message component
function ErrorMessage({ error }: { error: Error }) {
  return (
    <div className="text-red-500">
      <p>Error: {error.message}</p>
    </div>
  );
}

// Empty state component
function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-gray-500">
      <p>{message}</p>
    </div>
  );
}
```

---

## Form Handling

### React Hook Form + Zod

```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  OnboardingResponsesUpdateSchema,
  type OnboardingResponsesUpdate,
  type OnboardingResponses,
} from '@/lib/schemas';
import { useUpdateOnboardingResponse } from '@/hooks/simplified/useOnboardingResponse';

interface EditFormProps {
  response: OnboardingResponses;
}

export function EditOnboardingForm({ response }: EditFormProps) {
  const updateResponse = useUpdateOnboardingResponse();

  const form = useForm<OnboardingResponsesUpdate>({
    resolver: zodResolver(OnboardingResponsesUpdateSchema),
    defaultValues: {
      currentStep: response.currentStep ?? undefined,
      isComplete: response.isComplete ?? false,
    },
  });

  const onSubmit = async (data: OnboardingResponsesUpdate) => {
    try {
      await updateResponse.mutateAsync(data);
      // Success handling
    } catch (error) {
      // Error is handled by React Query
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input {...form.register('currentStep')} />
      {form.formState.errors.currentStep && (
        <span className="text-red-500">
          {form.formState.errors.currentStep.message}
        </span>
      )}
      
      <button type="submit" disabled={updateResponse.isPending}>
        {updateResponse.isPending ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
}
```

---

## Tenant-Agnostic Components

### Why Tenant-Agnostic?

UI components should be **tenant-agnostic**. Tenant scoping happens automatically:

1. **Services (Layer 3)** filter by `organizationId`
2. **Routes (Layer 4)** pass request to services
3. **Hooks (Layer 5)** call routes
4. **UI (Layer 6)** just renders data

### Pattern

```typescript
// ✅ Correct: UI doesn't know about tenants
export function OnboardingProgress() {
  // Automatically filtered by tenant in services
  const { data } = useOnboardingResponse();

  // UI just renders - tenant scoping is transparent
  return (
    <div>
      <h2>Onboarding Progress</h2>
      <p>Step: {data?.currentStep}</p>
    </div>
  );
}
```

---

## Common Patterns

### List Component

```typescript
import { useEntities } from '@/hooks/simplified/useEntities';

export function EntityList() {
  const { data: entities, isLoading, error } = useEntities();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!entities?.length) return <EmptyState message="No entities found" />;

  return (
    <div className="grid grid-cols-3 gap-4">
      {entities.map(entity => (
        <EntityCard key={entity.id} entity={entity} />
      ))}
    </div>
  );
}
```

### Detail Component

```typescript
import { useEntity } from '@/hooks/simplified/useEntity';

interface EntityDetailProps {
  id: string;
}

export function EntityDetail({ id }: EntityDetailProps) {
  const { data: entity, isLoading, error } = useEntity(id);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!entity) return <NotFound />;

  return (
    <div>
      <h1>{entity.title}</h1>
      <p>{entity.description}</p>
    </div>
  );
}
```

### Create Component

```typescript
import { useCreateEntity } from '@/hooks/simplified/useEntity';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EntityInsertSchema, type EntityCreate } from '@/lib/schemas';

export function CreateEntityForm() {
  const createEntity = useCreateEntity();

  const form = useForm<EntityCreate>({
    resolver: zodResolver(EntityInsertSchema),
  });

  const onSubmit = async (data: EntityCreate) => {
    try {
      await createEntity.mutateAsync(data);
      form.reset();
    } catch (error) {
      // Error handled by React Query
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Form fields */}
      <button type="submit" disabled={createEntity.isPending}>
        Create
      </button>
    </form>
  );
}
```

---

## shadcn/ui Components

### Location

`components/ui/` contains shadcn/ui components.

### ❌ DO NOT MODIFY

These components are managed by shadcn and should not be modified directly:
- `button.tsx`
- `card.tsx`
- `dropdown-menu.tsx`
- `progress.tsx`
- etc.

### Adding New shadcn Components

```bash
npx shadcn@latest add [component-name]
```

---

## Validation

After making any UI changes:

```bash
npx tsc --noEmit
```

**Required Status**: No TypeScript errors (Layer 6 LOCKED)

Validation checklist:
- ✅ All components use hooks for data fetching
- ✅ All component props properly typed
- ✅ No direct data fetching in components
- ✅ Forms use React Hook Form with Zod resolvers
- ✅ Loading, error, and empty states handled
- ✅ No TypeScript errors in component files

---

## Rules

### ✅ Always Do

- Use hooks from Layer 5 for ALL data fetching
- Handle loading, error, and empty states
- Use `zodResolver` for form validation
- Derive all types from Layer 2 schemas
- Properly type all component props
- Import types from `lib/schemas/`
- Use `'use client'` directive for client components

### ❌ Never Do

- Fetch data directly in components
- Define types that contradict schemas
- Skip error/loading state handling
- Use `any` or `unknown` types
- Modify `components/ui/` (shadcn/ui managed)
- Add types in UI that don't exist in database

---

## Troubleshooting

### Type Errors

**Problem**: TypeScript errors in components

**Solution**:
1. Ensure Layer 2 has no TypeScript errors
2. Verify types are imported from Layer 2 schemas
3. Check that hook return types match expected types
4. Review TypeScript error messages

### Data Not Loading

**Problem**: Component shows no data

**Solution**:
1. Check hook is called correctly
2. Verify API route is working
3. Check React Query DevTools for cache state
4. Ensure loading/error states are handled

### Form Validation Not Working

**Problem**: Form accepts invalid data

**Solution**:
1. Check `zodResolver` is properly configured
2. Verify schema matches form fields
3. Check for validation errors in `form.formState.errors`

---

## Next Steps

- **Workflow**: [08_CHAIN_WORKFLOW_CHECKLIST.md](./08_CHAIN_WORKFLOW_CHECKLIST.md) - Complete workflow
- **Multi-Tenant**: [09_MULTI_TENANT_NOTES.md](./09_MULTI_TENANT_NOTES.md) - Tenant scoping details
- **Glossary**: [10_GLOSSARY.md](./10_GLOSSARY.md) - Term definitions

---

**Remember**: UI is the presentation layer. It renders data, handles user interactions, and displays states. Never fetch data directly or define types that don't exist in the database.
