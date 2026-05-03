import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  WritingStylePreferences,
  WritingStylePreferencesCreate,
  WritingStylePreferencesUpdate,
  WritingStylePreferencesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const writingStylePreferencesKeys = {
  all: ["writingStylePreferences"] as const,
  lists: () => [...writingStylePreferencesKeys.all, "list"] as const,
  list: (filters?: WritingStylePreferencesFilters) => [...writingStylePreferencesKeys.lists(), filters] as const,
  details: () => [...writingStylePreferencesKeys.all, "detail"] as const,
  detail: (id: string) => [...writingStylePreferencesKeys.details(), id] as const,
};

// ---- Fetch Helpers ----

async function fetchApi<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  const json = await res.json();
  if (!res.ok || json.error) {
    throw new Error(json.error?.message ?? "Request failed");
  }
  return json.data;
}

// ---- Hooks ----

export function useWritingStylePreferencesList(filters?: WritingStylePreferencesFilters) {
  return useQuery({
    queryKey: writingStylePreferencesKeys.list(filters),
    queryFn: () =>
      fetchApi<WritingStylePreferences[]>(`/api/simplified/writing-style-preferences${buildQueryString(filters)}`),
  });
}

export function useWritingStylePreferences(id: string) {
  return useQuery({
    queryKey: writingStylePreferencesKeys.detail(id),
    queryFn: () =>
      fetchApi<WritingStylePreferences>(`/api/simplified/writing-style-preferences?id=${id}`),
    enabled: !!id,
  });
}

export function useWritingStylePreferencesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: WritingStylePreferencesCreate) =>
      fetchApi<WritingStylePreferences>(`/api/simplified/writing-style-preferences`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: writingStylePreferencesKeys.lists() });
    },
  });
}

export function useWritingStylePreferencesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: WritingStylePreferencesUpdate & { id: string }) =>
      fetchApi<WritingStylePreferences>(`/api/simplified/writing-style-preferences`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: writingStylePreferencesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: writingStylePreferencesKeys.detail(variables.id),
      });
    },
  });
}

export function useWritingStylePreferencesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/writing-style-preferences?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: writingStylePreferencesKeys.lists() });
    },
  });
}
