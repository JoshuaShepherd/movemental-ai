import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  ReflectionJournals,
  ReflectionJournalsCreate,
  ReflectionJournalsUpdate,
  ReflectionJournalsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const reflectionJournalsKeys = {
  all: ["reflectionJournals"] as const,
  lists: () => [...reflectionJournalsKeys.all, "list"] as const,
  list: (filters?: ReflectionJournalsFilters) => [...reflectionJournalsKeys.lists(), filters] as const,
  details: () => [...reflectionJournalsKeys.all, "detail"] as const,
  detail: (id: string) => [...reflectionJournalsKeys.details(), id] as const,
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

export function useReflectionJournalsList(filters?: ReflectionJournalsFilters) {
  return useQuery({
    queryKey: reflectionJournalsKeys.list(filters),
    queryFn: () =>
      fetchApi<ReflectionJournals[]>(`/api/simplified/reflection-journals${buildQueryString(filters)}`),
  });
}

export function useReflectionJournals(id: string) {
  return useQuery({
    queryKey: reflectionJournalsKeys.detail(id),
    queryFn: () =>
      fetchApi<ReflectionJournals>(`/api/simplified/reflection-journals?id=${id}`),
    enabled: !!id,
  });
}

export function useReflectionJournalsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ReflectionJournalsCreate) =>
      fetchApi<ReflectionJournals>(`/api/simplified/reflection-journals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reflectionJournalsKeys.lists() });
    },
  });
}

export function useReflectionJournalsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: ReflectionJournalsUpdate & { id: string }) =>
      fetchApi<ReflectionJournals>(`/api/simplified/reflection-journals`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: reflectionJournalsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: reflectionJournalsKeys.detail(variables.id),
      });
    },
  });
}

export function useReflectionJournalsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/reflection-journals?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reflectionJournalsKeys.lists() });
    },
  });
}
