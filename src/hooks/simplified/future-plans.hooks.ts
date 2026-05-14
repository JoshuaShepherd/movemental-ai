import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  FuturePlans,
  FuturePlansCreate,
  FuturePlansUpdate,
  FuturePlansFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const futurePlansKeys = {
  all: ["futurePlans"] as const,
  lists: () => [...futurePlansKeys.all, "list"] as const,
  list: (filters?: FuturePlansFilters) => [...futurePlansKeys.lists(), filters] as const,
  details: () => [...futurePlansKeys.all, "detail"] as const,
  detail: (id: string) => [...futurePlansKeys.details(), id] as const,
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

export function useFuturePlansList(filters?: FuturePlansFilters) {
  return useQuery({
    queryKey: futurePlansKeys.list(filters),
    queryFn: () =>
      fetchApi<FuturePlans[]>(`/api/simplified/future-plans${buildQueryString(filters)}`),
  });
}

export function useFuturePlans(id: string) {
  return useQuery({
    queryKey: futurePlansKeys.detail(id),
    queryFn: () =>
      fetchApi<FuturePlans>(`/api/simplified/future-plans?id=${id}`),
    enabled: !!id,
  });
}

export function useFuturePlansCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FuturePlansCreate) =>
      fetchApi<FuturePlans>(`/api/simplified/future-plans`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: futurePlansKeys.lists() });
    },
  });
}

export function useFuturePlansUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: FuturePlansUpdate & { id: string }) =>
      fetchApi<FuturePlans>(`/api/simplified/future-plans`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: futurePlansKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: futurePlansKeys.detail(variables.id),
      });
    },
  });
}

export function useFuturePlansDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/future-plans?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: futurePlansKeys.lists() });
    },
  });
}
