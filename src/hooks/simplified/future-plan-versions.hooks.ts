import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  FuturePlanVersions,
  FuturePlanVersionsCreate,
  FuturePlanVersionsUpdate,
  FuturePlanVersionsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const futurePlanVersionsKeys = {
  all: ["futurePlanVersions"] as const,
  lists: () => [...futurePlanVersionsKeys.all, "list"] as const,
  list: (filters?: FuturePlanVersionsFilters) => [...futurePlanVersionsKeys.lists(), filters] as const,
  details: () => [...futurePlanVersionsKeys.all, "detail"] as const,
  detail: (id: string) => [...futurePlanVersionsKeys.details(), id] as const,
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

export function useFuturePlanVersionsList(filters?: FuturePlanVersionsFilters) {
  return useQuery({
    queryKey: futurePlanVersionsKeys.list(filters),
    queryFn: () =>
      fetchApi<FuturePlanVersions[]>(`/api/simplified/future-plan-versions${buildQueryString(filters)}`),
  });
}

export function useFuturePlanVersions(id: string) {
  return useQuery({
    queryKey: futurePlanVersionsKeys.detail(id),
    queryFn: () =>
      fetchApi<FuturePlanVersions>(`/api/simplified/future-plan-versions?id=${id}`),
    enabled: !!id,
  });
}

export function useFuturePlanVersionsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FuturePlanVersionsCreate) =>
      fetchApi<FuturePlanVersions>(`/api/simplified/future-plan-versions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: futurePlanVersionsKeys.lists() });
    },
  });
}

export function useFuturePlanVersionsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: FuturePlanVersionsUpdate & { id: string }) =>
      fetchApi<FuturePlanVersions>(`/api/simplified/future-plan-versions`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: futurePlanVersionsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: futurePlanVersionsKeys.detail(variables.id),
      });
    },
  });
}

export function useFuturePlanVersionsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/future-plan-versions?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: futurePlanVersionsKeys.lists() });
    },
  });
}
