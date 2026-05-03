import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  ReflectionResponses,
  ReflectionResponsesCreate,
  ReflectionResponsesUpdate,
  ReflectionResponsesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const reflectionResponsesKeys = {
  all: ["reflectionResponses"] as const,
  lists: () => [...reflectionResponsesKeys.all, "list"] as const,
  list: (filters?: ReflectionResponsesFilters) => [...reflectionResponsesKeys.lists(), filters] as const,
  details: () => [...reflectionResponsesKeys.all, "detail"] as const,
  detail: (id: string) => [...reflectionResponsesKeys.details(), id] as const,
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

export function useReflectionResponsesList(filters?: ReflectionResponsesFilters) {
  return useQuery({
    queryKey: reflectionResponsesKeys.list(filters),
    queryFn: () =>
      fetchApi<ReflectionResponses[]>(`/api/simplified/reflection-responses${buildQueryString(filters)}`),
  });
}

export function useReflectionResponses(id: string) {
  return useQuery({
    queryKey: reflectionResponsesKeys.detail(id),
    queryFn: () =>
      fetchApi<ReflectionResponses>(`/api/simplified/reflection-responses?id=${id}`),
    enabled: !!id,
  });
}

export function useReflectionResponsesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ReflectionResponsesCreate) =>
      fetchApi<ReflectionResponses>(`/api/simplified/reflection-responses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reflectionResponsesKeys.lists() });
    },
  });
}

export function useReflectionResponsesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: ReflectionResponsesUpdate & { id: string }) =>
      fetchApi<ReflectionResponses>(`/api/simplified/reflection-responses`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: reflectionResponsesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: reflectionResponsesKeys.detail(variables.id),
      });
    },
  });
}

export function useReflectionResponsesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/reflection-responses?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reflectionResponsesKeys.lists() });
    },
  });
}
