import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  FuturePlanRatifications,
  FuturePlanRatificationsCreate,
  FuturePlanRatificationsUpdate,
  FuturePlanRatificationsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const futurePlanRatificationsKeys = {
  all: ["futurePlanRatifications"] as const,
  lists: () => [...futurePlanRatificationsKeys.all, "list"] as const,
  list: (filters?: FuturePlanRatificationsFilters) => [...futurePlanRatificationsKeys.lists(), filters] as const,
  details: () => [...futurePlanRatificationsKeys.all, "detail"] as const,
  detail: (id: string) => [...futurePlanRatificationsKeys.details(), id] as const,
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

export function useFuturePlanRatificationsList(filters?: FuturePlanRatificationsFilters) {
  return useQuery({
    queryKey: futurePlanRatificationsKeys.list(filters),
    queryFn: () =>
      fetchApi<FuturePlanRatifications[]>(`/api/simplified/future-plan-ratifications${buildQueryString(filters)}`),
  });
}

export function useFuturePlanRatifications(id: string) {
  return useQuery({
    queryKey: futurePlanRatificationsKeys.detail(id),
    queryFn: () =>
      fetchApi<FuturePlanRatifications>(`/api/simplified/future-plan-ratifications?id=${id}`),
    enabled: !!id,
  });
}

export function useFuturePlanRatificationsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FuturePlanRatificationsCreate) =>
      fetchApi<FuturePlanRatifications>(`/api/simplified/future-plan-ratifications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: futurePlanRatificationsKeys.lists() });
    },
  });
}

export function useFuturePlanRatificationsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: FuturePlanRatificationsUpdate & { id: string }) =>
      fetchApi<FuturePlanRatifications>(`/api/simplified/future-plan-ratifications`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: futurePlanRatificationsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: futurePlanRatificationsKeys.detail(variables.id),
      });
    },
  });
}

export function useFuturePlanRatificationsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/future-plan-ratifications?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: futurePlanRatificationsKeys.lists() });
    },
  });
}
