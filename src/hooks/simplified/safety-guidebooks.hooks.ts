import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  SafetyGuidebooks,
  SafetyGuidebooksCreate,
  SafetyGuidebooksUpdate,
  SafetyGuidebooksFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const safetyGuidebooksKeys = {
  all: ["safetyGuidebooks"] as const,
  lists: () => [...safetyGuidebooksKeys.all, "list"] as const,
  list: (filters?: SafetyGuidebooksFilters) => [...safetyGuidebooksKeys.lists(), filters] as const,
  details: () => [...safetyGuidebooksKeys.all, "detail"] as const,
  detail: (id: string) => [...safetyGuidebooksKeys.details(), id] as const,
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

export function useSafetyGuidebooksList(filters?: SafetyGuidebooksFilters) {
  return useQuery({
    queryKey: safetyGuidebooksKeys.list(filters),
    queryFn: () =>
      fetchApi<SafetyGuidebooks[]>(`/api/simplified/safety-guidebooks${buildQueryString(filters)}`),
  });
}

export function useSafetyGuidebooks(id: string) {
  return useQuery({
    queryKey: safetyGuidebooksKeys.detail(id),
    queryFn: () =>
      fetchApi<SafetyGuidebooks>(`/api/simplified/safety-guidebooks?id=${id}`),
    enabled: !!id,
  });
}

export function useSafetyGuidebooksCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SafetyGuidebooksCreate) =>
      fetchApi<SafetyGuidebooks>(`/api/simplified/safety-guidebooks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: safetyGuidebooksKeys.lists() });
    },
  });
}

export function useSafetyGuidebooksUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: SafetyGuidebooksUpdate & { id: string }) =>
      fetchApi<SafetyGuidebooks>(`/api/simplified/safety-guidebooks`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: safetyGuidebooksKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: safetyGuidebooksKeys.detail(variables.id),
      });
    },
  });
}

export function useSafetyGuidebooksDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/safety-guidebooks?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: safetyGuidebooksKeys.lists() });
    },
  });
}
