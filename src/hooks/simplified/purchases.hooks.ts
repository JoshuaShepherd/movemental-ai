import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  Purchases,
  PurchasesCreate,
  PurchasesUpdate,
  PurchasesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const purchasesKeys = {
  all: ["purchases"] as const,
  lists: () => [...purchasesKeys.all, "list"] as const,
  list: (filters?: PurchasesFilters) => [...purchasesKeys.lists(), filters] as const,
  details: () => [...purchasesKeys.all, "detail"] as const,
  detail: (id: string) => [...purchasesKeys.details(), id] as const,
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

export function usePurchasesList(filters?: PurchasesFilters) {
  return useQuery({
    queryKey: purchasesKeys.list(filters),
    queryFn: () =>
      fetchApi<Purchases[]>(`/api/simplified/purchases${buildQueryString(filters)}`),
  });
}

export function usePurchases(id: string) {
  return useQuery({
    queryKey: purchasesKeys.detail(id),
    queryFn: () =>
      fetchApi<Purchases>(`/api/simplified/purchases?id=${id}`),
    enabled: !!id,
  });
}

export function usePurchasesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PurchasesCreate) =>
      fetchApi<Purchases>(`/api/simplified/purchases`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: purchasesKeys.lists() });
    },
  });
}

export function usePurchasesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: PurchasesUpdate & { id: string }) =>
      fetchApi<Purchases>(`/api/simplified/purchases`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: purchasesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: purchasesKeys.detail(variables.id),
      });
    },
  });
}

export function usePurchasesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/purchases?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: purchasesKeys.lists() });
    },
  });
}
