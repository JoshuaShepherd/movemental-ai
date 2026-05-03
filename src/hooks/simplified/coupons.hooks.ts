import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  Coupons,
  CouponsCreate,
  CouponsUpdate,
  CouponsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const couponsKeys = {
  all: ["coupons"] as const,
  lists: () => [...couponsKeys.all, "list"] as const,
  list: (filters?: CouponsFilters) => [...couponsKeys.lists(), filters] as const,
  details: () => [...couponsKeys.all, "detail"] as const,
  detail: (id: string) => [...couponsKeys.details(), id] as const,
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

export function useCouponsList(filters?: CouponsFilters) {
  return useQuery({
    queryKey: couponsKeys.list(filters),
    queryFn: () =>
      fetchApi<Coupons[]>(`/api/simplified/coupons${buildQueryString(filters)}`),
  });
}

export function useCoupons(id: string) {
  return useQuery({
    queryKey: couponsKeys.detail(id),
    queryFn: () =>
      fetchApi<Coupons>(`/api/simplified/coupons?id=${id}`),
    enabled: !!id,
  });
}

export function useCouponsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CouponsCreate) =>
      fetchApi<Coupons>(`/api/simplified/coupons`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: couponsKeys.lists() });
    },
  });
}

export function useCouponsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: CouponsUpdate & { id: string }) =>
      fetchApi<Coupons>(`/api/simplified/coupons`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: couponsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: couponsKeys.detail(variables.id),
      });
    },
  });
}

export function useCouponsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/coupons?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: couponsKeys.lists() });
    },
  });
}
