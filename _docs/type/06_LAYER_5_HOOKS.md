# Layer 5: React Hooks

> **Type-Safe Data Fetching** with React Query

**Layer**: 5 of 6  
**Directory**: `hooks/simplified/`  
**Validation**: `npx tsc --noEmit`  
**Status Required**: No TypeScript errors

---

## Overview

React hooks provide **type-safe data fetching** and **state management** using React Query (`@tanstack/react-query`). They call API routes (Layer 4) with full type safety derived from Zod schemas (Layer 2).

### Key Principles

1. **React Query Integration**: All data fetching uses React Query
2. **Type Safety**: All types derived from Zod schemas (Layer 2)
3. **Structured Query Keys**: Consistent query key patterns for cache management
4. **Cache Invalidation**: Proper cache invalidation on mutations
5. **Error Handling**: Convert `Result<T>` errors to thrown exceptions for React Query

---

## Current Hook Structure

```
hooks/
└── simplified/
    └── useOnboardingResponse.ts   # Onboarding response hooks
```

### React Query Provider

The React Query provider is configured in `lib/providers/query-provider.tsx`.

---

## React Query Conventions

### Query Keys

Use structured query keys for cache management:

```typescript
export const onboardingResponseKeys = {
  all: ['onboarding-responses'] as const,
  lists: () => [...onboardingResponseKeys.all, 'list'] as const,
  list: (filters?: OnboardingResponsesFilters) => [...onboardingResponseKeys.lists(), filters] as const,
  details: () => [...onboardingResponseKeys.all, 'detail'] as const,
  detail: (id: string) => [...onboardingResponseKeys.details(), id] as const,
};
```

### Query Hooks

```typescript
import { useQuery } from '@tanstack/react-query';
import type { OnboardingResponses, OnboardingResponsesFilters } from '@/lib/schemas';

export function useOnboardingResponses(filters?: OnboardingResponsesFilters) {
  return useQuery({
    queryKey: onboardingResponseKeys.list(filters),
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.limit) params.set('limit', String(filters.limit));
      if (filters?.offset) params.set('offset', String(filters.offset));
      
      const response = await fetch(`/api/simplified/onboarding-responses?${params}`);
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error.message);
      }
      return data.data as OnboardingResponses[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
```

### Mutation Hooks

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { OnboardingResponsesCreate } from '@/lib/schemas';

export function useCreateOnboardingResponse() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: OnboardingResponsesCreate) => {
      const response = await fetch('/api/simplified/onboarding-responses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error.message);
      }
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: onboardingResponseKeys.lists() });
    },
  });
}
```

---

## Hook Naming / Caching

### Naming Convention

- **Query hooks**: `use{Entity}` or `use{Entity}Query`
- **Mutation hooks**: `useCreate{Entity}`, `useUpdate{Entity}`, `useDelete{Entity}`
- **Detail hooks**: `use{Entity}(id: string)`

### Caching Strategy

- **Default staleTime**: 5 minutes
- **Cache invalidation**: On mutations, invalidate related queries
- **Query keys**: Structured for easy invalidation

---

## Why UI Must Never Fetch Directly

### Problems with Direct Fetching

1. **No Type Safety**: Types not enforced
2. **No Caching**: Every render triggers new fetch
3. **No Loading States**: Must manually manage loading/error
4. **No Error Handling**: Must manually handle errors
5. **No Optimistic Updates**: Can't update UI optimistically

### Benefits of Hooks

1. **Type Safety**: Types from Layer 2 schemas
2. **Automatic Caching**: React Query handles caching
3. **Loading States**: `isLoading`, `isError`, `isSuccess` provided
4. **Error Handling**: Errors handled automatically
5. **Optimistic Updates**: Can update UI before server responds

---

## Typical Patterns

### useEntity (List)

```typescript
import { useQuery } from '@tanstack/react-query';
import type { OnboardingResponses, OnboardingResponsesFilters } from '@/lib/schemas';

export function useOnboardingResponses(filters?: OnboardingResponsesFilters) {
  return useQuery({
    queryKey: onboardingResponseKeys.list(filters),
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.limit) params.set('limit', String(filters.limit));
      if (filters?.offset) params.set('offset', String(filters.offset));
      if (filters?.isComplete !== undefined) params.set('isComplete', String(filters.isComplete));
      
      const response = await fetch(`/api/simplified/onboarding-responses?${params}`);
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error.message);
      }
      
      return data.data as OnboardingResponses[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
```

### useEntity(id) (Detail)

```typescript
export function useOnboardingResponse(id: string) {
  return useQuery({
    queryKey: onboardingResponseKeys.detail(id),
    queryFn: async () => {
      const response = await fetch(`/api/simplified/onboarding-responses/${id}`);
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error.message);
      }
      
      return data.data as OnboardingResponses;
    },
    enabled: !!id, // Only fetch if id exists
    staleTime: 5 * 60 * 1000,
  });
}
```

### useCreateEntity

```typescript
export function useCreateOnboardingResponse() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: OnboardingResponsesCreate) => {
      const response = await fetch('/api/simplified/onboarding-responses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error.message);
      }
      
      return result.data as OnboardingResponses;
    },
    onSuccess: () => {
      // Invalidate list queries
      queryClient.invalidateQueries({ queryKey: onboardingResponseKeys.lists() });
    },
  });
}
```

### useUpdateEntity

```typescript
export function useUpdateOnboardingResponse() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: OnboardingResponsesUpdate }) => {
      const response = await fetch(`/api/simplified/onboarding-responses/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error.message);
      }
      
      return result.data as OnboardingResponses;
    },
    onSuccess: (data, variables) => {
      // Invalidate detail query
      queryClient.invalidateQueries({ queryKey: onboardingResponseKeys.detail(variables.id) });
      // Invalidate list queries
      queryClient.invalidateQueries({ queryKey: onboardingResponseKeys.lists() });
    },
  });
}
```

### useDeleteEntity

```typescript
export function useDeleteOnboardingResponse() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/simplified/onboarding-responses/${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error.message);
      }
    },
    onSuccess: (_, id) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: onboardingResponseKeys.detail(id) });
      // Invalidate list queries
      queryClient.invalidateQueries({ queryKey: onboardingResponseKeys.lists() });
    },
  });
}
```

---

## Validation

After making any hook changes:

```bash
npx tsc --noEmit
```

**Required Status**: No TypeScript errors

Validation checks:
- ✅ All hooks use React Query
- ✅ All hooks use structured query keys
- ✅ All hooks handle errors properly
- ✅ All mutations invalidate cache
- ✅ No TypeScript errors in hook files

---

## Rules

### ✅ Always Do

- Use React Query (`useQuery`, `useMutation`)
- Convert API errors to thrown errors for React Query
- Invalidate cache on mutations
- Set appropriate `staleTime` (default: 5 minutes)
- Use `enabled` for conditional queries
- Use structured query keys
- Import types from `lib/schemas/`

### ❌ Never Do

- Fetch data directly in components
- Skip cache invalidation
- Define custom query key strings
- Use `any` or `unknown` types

---

## Troubleshooting

### Type Errors

**Problem**: TypeScript errors in hooks

**Solution**:
1. Ensure Layer 2 has no TypeScript errors (`npx tsc --noEmit`)
2. Verify types are imported from Layer 2 schemas
3. Check that API response types match Layer 2 types
4. Review TypeScript error messages

### Cache Not Updating

**Problem**: UI doesn't update after mutation

**Solution**:
1. Ensure mutations invalidate related queries
2. Check query keys are structured correctly
3. Verify `onSuccess` callbacks are set
4. Check React Query DevTools for cache state

---

## Next Steps

- **Layer 6**: Read [07_LAYER_6_UI.md](./07_LAYER_6_UI.md) to understand how UI consumes hooks
- **Workflow**: Read [08_CHAIN_WORKFLOW_CHECKLIST.md](./08_CHAIN_WORKFLOW_CHECKLIST.md) for complete workflow
- **Glossary**: Read [10_GLOSSARY.md](./10_GLOSSARY.md) for term definitions

---

**Remember**: Hooks are the data fetching layer. They manage cache, loading states, and errors. Never fetch data directly in components.
