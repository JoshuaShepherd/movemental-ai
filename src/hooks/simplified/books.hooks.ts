import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  Books,
  BooksCreate,
  BooksUpdate,
  BooksFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const booksKeys = {
  all: ["books"] as const,
  lists: () => [...booksKeys.all, "list"] as const,
  list: (filters?: BooksFilters) => [...booksKeys.lists(), filters] as const,
  details: () => [...booksKeys.all, "detail"] as const,
  detail: (id: string) => [...booksKeys.details(), id] as const,
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

export function useBooksList(filters?: BooksFilters) {
  return useQuery({
    queryKey: booksKeys.list(filters),
    queryFn: () =>
      fetchApi<Books[]>(`/api/simplified/books${buildQueryString(filters)}`),
  });
}

export function useBooks(id: string) {
  return useQuery({
    queryKey: booksKeys.detail(id),
    queryFn: () =>
      fetchApi<Books>(`/api/simplified/books?id=${id}`),
    enabled: !!id,
  });
}

export function useBooksCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: BooksCreate) =>
      fetchApi<Books>(`/api/simplified/books`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: booksKeys.lists() });
    },
  });
}

export function useBooksUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: BooksUpdate & { id: string }) =>
      fetchApi<Books>(`/api/simplified/books`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: booksKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: booksKeys.detail(variables.id),
      });
    },
  });
}

export function useBooksDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/books?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: booksKeys.lists() });
    },
  });
}
