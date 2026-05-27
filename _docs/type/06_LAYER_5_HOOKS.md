# Layer 5: React Hooks

> **Type-Safe Data Fetching** with React Query

**Layer**: 5 of 6  
**Directory**: `hooks/simplified/`  
**Validation**: `pnpm hooks:check` → required `{"status":"LOCKED"}` (or `npx tsc --noEmit`)  
**Status**: ✅ LOCKED (2026-02-15)

---

## Overview

React hooks provide **type-safe data fetching** and **state management** using React Query (`@tanstack/react-query`). They call API routes (Layer 4) with full type safety derived from Zod schemas (Layer 2).

### Key Principles

1. **React Query Integration**: All data fetching uses React Query
2. **Type Safety**: All types derived from Zod schemas (Layer 2)
3. **Structured Query Keys**: Consistent query key patterns for cache management
4. **Cache Invalidation**: Proper cache invalidation on mutations
5. **Error Handling**: Convert API errors to thrown exceptions for React Query
6. **Tenant Transparency**: Tenant scoping is handled by API routes automatically

---

## File Structure

```
hooks/
└── simplified/
    └── useOnboardingResponse.ts   # Onboarding response hooks
```

### React Query Provider

The React Query provider is configured in `lib/providers/query-provider.tsx`.

---

## Current Implementation

### `hooks/simplified/useOnboardingResponse.ts`

```typescript
'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  OnboardingResponses,
  OnboardingResponsesCreate,
  OnboardingResponsesUpdate,
} from '@/lib/schemas';

// Query keys for cache management
export const onboardingResponseKeys = {
  all: ['onboarding-response'] as const,
  detail: () => [...onboardingResponseKeys.all, 'detail'] as const,
};

/**
 * Hook to fetch onboarding response for current tenant
 */
export function useOnboardingResponse() {
  return useQuery<OnboardingResponses | null>({
    queryKey: onboardingResponseKeys.detail(),
    queryFn: async () => {
      const response = await fetch('/api/simplified/onboarding-responses');
      if (!response.ok) {
        throw new Error('Failed to fetch onboarding response');
      }
      const { data } = await response.json();
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to create onboarding response
 */
export function useCreateOnboardingResponse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: OnboardingResponsesCreate) => {
      const response = await fetch('/api/simplified/onboarding-responses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create onboarding response');
      }
      const { data: result } = await response.json();
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: onboardingResponseKeys.all });
    },
  });
}

/**
 * Hook to update onboarding response
 */
export function useUpdateOnboardingResponse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: OnboardingResponsesUpdate) => {
      const response = await fetch('/api/simplified/onboarding-responses', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update onboarding response');
      }
      const { data: result } = await response.json();
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: onboardingResponseKeys.all });
    },
  });
}

/**
 * Hook to complete onboarding response
 */
export function useCompleteOnboardingResponse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/simplified/onboarding-responses/complete', {
        method: 'POST',
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to complete onboarding response');
      }
      const { data: result } = await response.json();
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: onboardingResponseKeys.all });
    },
  });
}

/**
 * Hook for uploading onboarding files to Supabase Storage
 */
export function useUploadOnboardingFile() {
  return useMutation({
    mutationFn: async ({ file, type }: { file: File; type: 'photo' | 'content-sample' }) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);

      const response = await fetch('/api/onboarding/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to upload file');
      }

      const { data } = await response.json();
      return data;
    },
  });
}
```

---

## React Query Conventions

### Query Keys

Use structured query keys for predictable cache management:

```typescript
export const entityKeys = {
  all: ['entity-name'] as const,
  lists: () => [...entityKeys.all, 'list'] as const,
  list: (filters?: EntityFilters) => [...entityKeys.lists(), filters] as const,
  details: () => [...entityKeys.all, 'detail'] as const,
  detail: (id: string) => [...entityKeys.details(), id] as const,
};
```

### Hook Naming Convention

| Pattern | Usage |
|---------|-------|
| `use{Entity}` | Query hook for single entity |
| `use{Entities}` | Query hook for entity list |
| `useCreate{Entity}` | Mutation hook for create |
| `useUpdate{Entity}` | Mutation hook for update |
| `useDelete{Entity}` | Mutation hook for delete |

---

## Query Hooks

### Basic Query Hook

```typescript
export function useEntity(id: string) {
  return useQuery<Entity>({
    queryKey: entityKeys.detail(id),
    queryFn: async () => {
      const response = await fetch(`/api/simplified/entities/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch entity');
      }
      const { data } = await response.json();
      return data;
    },
    enabled: !!id, // Only fetch if id exists
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
```

### List Query Hook

```typescript
export function useEntities(filters?: EntityFilters) {
  return useQuery<Entity[]>({
    queryKey: entityKeys.list(filters),
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.limit) params.set('limit', String(filters.limit));
      if (filters?.offset) params.set('offset', String(filters.offset));
      
      const response = await fetch(`/api/simplified/entities?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch entities');
      }
      const { data } = await response.json();
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
}
```

---

## Mutation Hooks

### Create Mutation

```typescript
export function useCreateEntity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: EntityCreate) => {
      const response = await fetch('/api/simplified/entities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create entity');
      }
      const { data: result } = await response.json();
      return result as Entity;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: entityKeys.lists() });
    },
  });
}
```

### Update Mutation

```typescript
export function useUpdateEntity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: EntityUpdate }) => {
      const response = await fetch(`/api/simplified/entities/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update entity');
      }
      const { data: result } = await response.json();
      return result as Entity;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: entityKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: entityKeys.lists() });
    },
  });
}
```

### Delete Mutation

```typescript
export function useDeleteEntity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/simplified/entities/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete entity');
      }
    },
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: entityKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: entityKeys.lists() });
    },
  });
}
```

---

## Error Handling

### API Error to Exception

React Query expects errors to be thrown, not returned:

```typescript
queryFn: async () => {
  const response = await fetch('/api/...');
  
  // Throw on non-OK response
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Request failed');
  }
  
  const { data } = await response.json();
  return data;
}
```

### Using Error State in Components

```typescript
const { data, isLoading, error } = useEntity(id);

if (error) {
  return <div>Error: {error.message}</div>;
}
```

---

## Cache Management

### Default Stale Time

Use 5 minutes as default stale time:

```typescript
staleTime: 5 * 60 * 1000, // 5 minutes
```

### Cache Invalidation

Invalidate related queries after mutations:

```typescript
onSuccess: () => {
  // Invalidate all related queries
  queryClient.invalidateQueries({ queryKey: entityKeys.lists() });
  
  // Or invalidate specific detail
  queryClient.invalidateQueries({ queryKey: entityKeys.detail(id) });
  
  // Or remove from cache entirely
  queryClient.removeQueries({ queryKey: entityKeys.detail(id) });
}
```

---

## Why UI Must Never Fetch Directly

### Problems with Direct Fetching

1. **No Type Safety**: Types not enforced at fetch boundaries
2. **No Caching**: Every render triggers new fetch
3. **No Loading States**: Must manually manage loading/error states
4. **No Error Handling**: Must manually handle errors everywhere
5. **No Optimistic Updates**: Can't update UI optimistically
6. **No Automatic Refetching**: Must manually implement polling/refetch

### Benefits of Hooks + React Query

1. **Type Safety**: Types from Layer 2 schemas enforced
2. **Automatic Caching**: React Query handles caching automatically
3. **Loading States**: `isLoading`, `isError`, `isSuccess` provided
4. **Error Handling**: Errors handled consistently
5. **Optimistic Updates**: Can update UI before server responds
6. **Automatic Refetching**: Built-in refetch on focus, reconnect

---

## Validation

After making any hook changes:

```bash
npx tsc --noEmit
```

**Required Status**: No TypeScript errors (Layer 5 LOCKED)

Validation checklist:
- ✅ All hooks use React Query (`useQuery`, `useMutation`)
- ✅ All hooks use structured query keys
- ✅ All hooks handle errors (throw on failure)
- ✅ All mutations invalidate cache properly
- ✅ All types imported from `lib/schemas/`
- ✅ No TypeScript errors in hook files

---

## Rules

### ✅ Always Do

- Use React Query (`useQuery`, `useMutation`)
- Convert API errors to thrown exceptions for React Query
- Invalidate cache on mutations
- Set appropriate `staleTime` (default: 5 minutes)
- Use `enabled` for conditional queries
- Use structured query keys
- Import types from `lib/schemas/`
- Mark files as `'use client'` (client components)

### ❌ Never Do

- Fetch data directly in components (use hooks)
- Skip cache invalidation after mutations
- Define ad-hoc query key strings
- Use `any` or `unknown` types
- Forget to handle error states

---

## Troubleshooting

### Type Errors

**Problem**: TypeScript errors in hooks

**Solution**:
1. Ensure Layer 2 has no TypeScript errors
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

### Data Not Fetching

**Problem**: Query not running

**Solution**:
1. Check `enabled` prop (may be `false`)
2. Verify API route is working
3. Check network tab for request/response
4. Ensure QueryProvider wraps component

---

## Next Steps

- **Layer 6**: [07_LAYER_6_UI.md](./07_LAYER_6_UI.md) - UI components
- **Workflow**: [08_CHAIN_WORKFLOW_CHECKLIST.md](./08_CHAIN_WORKFLOW_CHECKLIST.md) - Complete workflow
- **Glossary**: [10_GLOSSARY.md](./10_GLOSSARY.md) - Term definitions

---

**Remember**: Hooks are the data fetching layer. They manage cache, loading states, and errors. Never fetch data directly in components—always use hooks.
