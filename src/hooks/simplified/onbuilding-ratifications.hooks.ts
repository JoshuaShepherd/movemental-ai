import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  OnbuildingRatifications,
  OnbuildingRatificationsCreate,
  OnbuildingRatificationsUpdate,
  OnbuildingRatificationsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const onbuildingRatificationsKeys = {
  all: ["onbuildingRatifications"] as const,
  lists: () => [...onbuildingRatificationsKeys.all, "list"] as const,
  list: (filters?: OnbuildingRatificationsFilters) => [...onbuildingRatificationsKeys.lists(), filters] as const,
  details: () => [...onbuildingRatificationsKeys.all, "detail"] as const,
  detail: (id: string) => [...onbuildingRatificationsKeys.details(), id] as const,
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

export function useOnbuildingRatificationsList(filters?: OnbuildingRatificationsFilters) {
  return useQuery({
    queryKey: onbuildingRatificationsKeys.list(filters),
    queryFn: () =>
      fetchApi<OnbuildingRatifications[]>(`/api/simplified/onbuilding-ratifications${buildQueryString(filters)}`),
  });
}

export function useOnbuildingRatifications(id: string) {
  return useQuery({
    queryKey: onbuildingRatificationsKeys.detail(id),
    queryFn: () =>
      fetchApi<OnbuildingRatifications>(`/api/simplified/onbuilding-ratifications?id=${id}`),
    enabled: !!id,
  });
}

export function useOnbuildingRatificationsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: OnbuildingRatificationsCreate) =>
      fetchApi<OnbuildingRatifications>(`/api/simplified/onbuilding-ratifications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: onbuildingRatificationsKeys.lists() });
    },
  });
}

export function useOnbuildingRatificationsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: OnbuildingRatificationsUpdate & { id: string }) =>
      fetchApi<OnbuildingRatifications>(`/api/simplified/onbuilding-ratifications`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: onbuildingRatificationsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: onbuildingRatificationsKeys.detail(variables.id),
      });
    },
  });
}

export function useOnbuildingRatificationsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/onbuilding-ratifications?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: onbuildingRatificationsKeys.lists() });
    },
  });
}
