# Layer 6: UI Components

> **Type-Safe Presentation Layer** consuming hooks and schemas

**Layer**: 6 of 6  
**Directory**: `components/`  
**Validation**: `npx tsc --noEmit`  
**Status Required**: No TypeScript errors

---

## Overview

UI components provide the **user interface** using type-safe props derived from all previous layers. Components never define their own data types—they consume types from hooks and schemas, ensuring complete type safety from database to UI.

### Key Principles

1. **Type Safety**: All types derived from Zod schemas (Layer 2)
2. **Hook Integration**: All data fetching through React hooks (Layer 5)
3. **No Direct Fetching**: Never fetch data directly in components
4. **Proper Error Handling**: Handle loading and error states
5. **Form Validation**: Use React Hook Form with Zod resolvers

---

## Current Component Structure

```
components/
├── ui/                    # shadcn/ui components (do not modify)
├── onboarding/           # Onboarding components
├── fit-check/            # Fit Check assessment components
├── onboarding-path/      # Onboarding path components
├── homepage/             # Homepage components
├── dashboard/            # Dashboard components
├── search/               # Search components
├── shared/               # Shared components
└── ... (many more)
```

---

## UI Only Consumes Hooks

### ✅ Correct Pattern

```typescript
import { useOnboardingResponse } from '@/hooks/simplified/useOnboardingResponse';
import type { OnboardingResponses } from '@/lib/schemas';

export function OnboardingResponsesList() {
  const { data, isLoading, error } = useOnboardingResponses();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No responses found</div>;
  
  return (
    <div>
      {data.map(response => (
        <div key={response.id}>{response.currentStep}</div>
      ))}
    </div>
  );
}
```

### ❌ Wrong Pattern

```typescript
// ❌ NEVER fetch directly in components
export function OnboardingResponsesList() {
  const [responses, setResponses] = useState([]);
  
  useEffect(() => {
    fetch('/api/simplified/onboarding-responses')
      .then(res => res.json())
      .then(data => setResponses(data.data));
  }, []);
  
  return <div>...</div>;
}
```

---

## Avoid Leaking Types Upstream

### The Rule

**Types flow downstream, never upstream.**

### ❌ Wrong: Adding Types in UI

```typescript
// ❌ WRONG: Adding type in UI that doesn't exist in database
interface ResponseWithRating extends OnboardingResponses {
  rating: number;  // ← This doesn't exist in database!
}

export function ResponseCard({ response }: { response: ResponseWithRating }) {
  return <div>{response.rating}</div>;
}
```

### ✅ Correct: Add Type at Source

1. Add `rating` field to database schema (Layer 1)
2. Types flow automatically to Layer 2 (Zod)
3. Types flow automatically to Layer 5 (Hooks)
4. UI can now use `rating` field

---

## Patterns for List/Detail/Edit Flows

### List Flow

```typescript
import { useOnboardingResponses } from '@/hooks/simplified/useOnboardingResponse';

export function ResponsesList() {
  const { data: responses, isLoading, error } = useOnboardingResponses();
  
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!responses || responses.length === 0) return <EmptyState />;
  
  return (
    <div className="grid grid-cols-3 gap-4">
      {responses.map(response => (
        <ResponseCard key={response.id} response={response} />
      ))}
    </div>
  );
}
```

### Detail Flow

```typescript
import { useOnboardingResponse, useUpdateOnboardingResponse } from '@/hooks/simplified/useOnboardingResponse';

export function ResponseDetail({ id }: { id: string }) {
  const { data: response, isLoading, error } = useOnboardingResponse(id);
  const updateResponse = useUpdateOnboardingResponse();
  
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!response) return <NotFound />;
  
  return (
    <div>
      <h1>{response.currentStep}</h1>
      <p>Complete: {response.isComplete ? 'Yes' : 'No'}</p>
      <EditResponseForm response={response} onUpdate={updateResponse.mutate} />
    </div>
  );
}
```

### Edit Flow

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OnboardingResponsesUpdateSchema, type OnboardingResponsesUpdate, type OnboardingResponses } from '@/lib/schemas';
import { useUpdateOnboardingResponse } from '@/hooks/simplified/useOnboardingResponse';

export function EditResponseForm({ 
  response, 
  onUpdate 
}: { 
  response: OnboardingResponses; 
  onUpdate: (data: { id: string; data: OnboardingResponsesUpdate }) => void;
}) {
  const form = useForm<OnboardingResponsesUpdate>({
    resolver: zodResolver(OnboardingResponsesUpdateSchema),
    defaultValues: {
      currentStep: response.currentStep,
      isComplete: response.isComplete,
    },
  });
  
  const onSubmit = (data: OnboardingResponsesUpdate) => {
    onUpdate({ id: response.id, data });
  };
  
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input {...form.register('currentStep')} />
      {form.formState.errors.currentStep && (
        <span>{form.formState.errors.currentStep.message}</span>
      )}
      <button type="submit">Save</button>
    </form>
  );
}
```

---

## How to Keep UI Adaptable Across Tenants

### Tenant-Agnostic Components

UI components should be **tenant-agnostic**. Tenant scoping happens automatically in services (Layer 3).

### Pattern

```typescript
// ✅ Correct: UI doesn't know about tenants
export function ResponsesList() {
  const { data: responses } = useOnboardingResponses();  // ← Automatically filtered by tenant
  // UI just renders responses - tenant scoping is transparent
  return <div>{responses.map(r => <ResponseCard key={r.id} response={r} />)}</div>;
}
```

### Why This Works

1. **Services filter by tenant** (Layer 3)
2. **Routes don't need tenant logic** (Layer 4)
3. **Hooks call routes** (Layer 5)
4. **UI just renders** (Layer 6)

Tenant boundaries are enforced at the service layer, so UI components don't need to worry about tenant scoping.

---

## Form Handling

### React Hook Form + Zod

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OnboardingResponsesInsertSchema, type OnboardingResponsesCreate } from '@/lib/schemas';
import { useCreateOnboardingResponse } from '@/hooks/simplified/useOnboardingResponse';

export function CreateResponseForm() {
  const createResponse = useCreateOnboardingResponse();
  
  const form = useForm<OnboardingResponsesCreate>({
    resolver: zodResolver(OnboardingResponsesInsertSchema),
    defaultValues: {
      currentStep: 'step1',
      isComplete: false,
    },
  });
  
  const onSubmit = async (data: OnboardingResponsesCreate) => {
    try {
      await createResponse.mutateAsync(data);
      form.reset();
    } catch (error) {
      // Error handled by React Query
    }
  };
  
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input {...form.register('currentStep')} />
      {form.formState.errors.currentStep && (
        <span>{form.formState.errors.currentStep.message}</span>
      )}
      <button type="submit" disabled={createResponse.isPending}>
        {createResponse.isPending ? 'Creating...' : 'Create Response'}
      </button>
    </form>
  );
}
```

---

## Validation

After making any UI changes:

```bash
npx tsc --noEmit
```

**Required Status**: No TypeScript errors

Validation checks:
- ✅ All components use hooks for data fetching
- ✅ All component props properly typed
- ✅ No direct data fetching in components
- ✅ Forms use React Hook Form with Zod resolvers
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

### ❌ Never Do

- Fetch data directly in components
- Define types that contradict schemas
- Skip error/loading state handling
- Use `any` or `unknown` types
- Modify `components/ui/` (shadcn/ui managed)

---

## Troubleshooting

### Type Errors

**Problem**: TypeScript errors in components

**Solution**:
1. Ensure Layer 2 has no TypeScript errors (`npx tsc --noEmit`)
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

---

## Next Steps

- **Workflow**: Read [08_CHAIN_WORKFLOW_CHECKLIST.md](./08_CHAIN_WORKFLOW_CHECKLIST.md) for complete workflow
- **Multi-Tenant**: Read [09_MULTI_TENANT_NOTES.md](./09_MULTI_TENANT_NOTES.md) for tenant scoping details
- **Glossary**: Read [10_GLOSSARY.md](./10_GLOSSARY.md) for term definitions

---

**Remember**: UI is the presentation layer. It renders data, handles user interactions, and displays states. Never fetch data directly or define types that don't exist in the database.
