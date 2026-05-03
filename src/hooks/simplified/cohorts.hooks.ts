import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  Cohorts,
  CohortsCreate,
  CohortsUpdate,
  CohortsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const cohortsKeys = {
  all: ["cohorts"] as const,
  lists: () => [...cohortsKeys.all, "list"] as const,
  list: (filters?: CohortsFilters) => [...cohortsKeys.lists(), filters] as const,
  details: () => [...cohortsKeys.all, "detail"] as const,
  detail: (id: string) => [...cohortsKeys.details(), id] as const,
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

export function useCohortsList(filters?: CohortsFilters) {
  return useQuery({
    queryKey: cohortsKeys.list(filters),
    queryFn: () =>
      fetchApi<Cohorts[]>(`/api/simplified/cohorts${buildQueryString(filters)}`),
  });
}

export function useCohorts(id: string) {
  return useQuery({
    queryKey: cohortsKeys.detail(id),
    queryFn: () =>
      fetchApi<Cohorts>(`/api/simplified/cohorts?id=${id}`),
    enabled: !!id,
  });
}

export function useCohortsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CohortsCreate) =>
      fetchApi<Cohorts>(`/api/simplified/cohorts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cohortsKeys.lists() });
    },
  });
}

export function useCohortsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: CohortsUpdate & { id: string }) =>
      fetchApi<Cohorts>(`/api/simplified/cohorts`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: cohortsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: cohortsKeys.detail(variables.id),
      });
    },
  });
}

export function useCohortsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/cohorts?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cohortsKeys.lists() });
    },
  });
}
