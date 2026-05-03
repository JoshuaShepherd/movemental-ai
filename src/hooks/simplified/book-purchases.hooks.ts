import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  BookPurchases,
  BookPurchasesCreate,
  BookPurchasesUpdate,
  BookPurchasesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const bookPurchasesKeys = {
  all: ["bookPurchases"] as const,
  lists: () => [...bookPurchasesKeys.all, "list"] as const,
  list: (filters?: BookPurchasesFilters) => [...bookPurchasesKeys.lists(), filters] as const,
  details: () => [...bookPurchasesKeys.all, "detail"] as const,
  detail: (id: string) => [...bookPurchasesKeys.details(), id] as const,
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

export function useBookPurchasesList(filters?: BookPurchasesFilters) {
  return useQuery({
    queryKey: bookPurchasesKeys.list(filters),
    queryFn: () =>
      fetchApi<BookPurchases[]>(`/api/simplified/book-purchases${buildQueryString(filters)}`),
  });
}

export function useBookPurchases(id: string) {
  return useQuery({
    queryKey: bookPurchasesKeys.detail(id),
    queryFn: () =>
      fetchApi<BookPurchases>(`/api/simplified/book-purchases?id=${id}`),
    enabled: !!id,
  });
}

export function useBookPurchasesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: BookPurchasesCreate) =>
      fetchApi<BookPurchases>(`/api/simplified/book-purchases`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookPurchasesKeys.lists() });
    },
  });
}

export function useBookPurchasesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: BookPurchasesUpdate & { id: string }) =>
      fetchApi<BookPurchases>(`/api/simplified/book-purchases`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: bookPurchasesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: bookPurchasesKeys.detail(variables.id),
      });
    },
  });
}

export function useBookPurchasesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/book-purchases?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookPurchasesKeys.lists() });
    },
  });
}
