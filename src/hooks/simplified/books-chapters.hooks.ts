import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  BooksChapters,
  BooksChaptersCreate,
  BooksChaptersUpdate,
  BooksChaptersFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const booksChaptersKeys = {
  all: ["booksChapters"] as const,
  lists: () => [...booksChaptersKeys.all, "list"] as const,
  list: (filters?: BooksChaptersFilters) => [...booksChaptersKeys.lists(), filters] as const,
  details: () => [...booksChaptersKeys.all, "detail"] as const,
  detail: (id: string) => [...booksChaptersKeys.details(), id] as const,
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

export function useBooksChaptersList(filters?: BooksChaptersFilters) {
  return useQuery({
    queryKey: booksChaptersKeys.list(filters),
    queryFn: () =>
      fetchApi<BooksChapters[]>(`/api/simplified/books-chapters${buildQueryString(filters)}`),
  });
}

export function useBooksChapters(id: string) {
  return useQuery({
    queryKey: booksChaptersKeys.detail(id),
    queryFn: () =>
      fetchApi<BooksChapters>(`/api/simplified/books-chapters?id=${id}`),
    enabled: !!id,
  });
}

export function useBooksChaptersCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: BooksChaptersCreate) =>
      fetchApi<BooksChapters>(`/api/simplified/books-chapters`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: booksChaptersKeys.lists() });
    },
  });
}

export function useBooksChaptersUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: BooksChaptersUpdate & { id: string }) =>
      fetchApi<BooksChapters>(`/api/simplified/books-chapters`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: booksChaptersKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: booksChaptersKeys.detail(variables.id),
      });
    },
  });
}

export function useBooksChaptersDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/books-chapters?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: booksChaptersKeys.lists() });
    },
  });
}
