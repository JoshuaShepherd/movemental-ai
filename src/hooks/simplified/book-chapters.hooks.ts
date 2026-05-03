import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  BookChapters,
  BookChaptersCreate,
  BookChaptersUpdate,
  BookChaptersFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const bookChaptersKeys = {
  all: ["bookChapters"] as const,
  lists: () => [...bookChaptersKeys.all, "list"] as const,
  list: (filters?: BookChaptersFilters) => [...bookChaptersKeys.lists(), filters] as const,
  details: () => [...bookChaptersKeys.all, "detail"] as const,
  detail: (id: string) => [...bookChaptersKeys.details(), id] as const,
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

export function useBookChaptersList(filters?: BookChaptersFilters) {
  return useQuery({
    queryKey: bookChaptersKeys.list(filters),
    queryFn: () =>
      fetchApi<BookChapters[]>(`/api/simplified/book-chapters${buildQueryString(filters)}`),
  });
}

export function useBookChapters(id: string) {
  return useQuery({
    queryKey: bookChaptersKeys.detail(id),
    queryFn: () =>
      fetchApi<BookChapters>(`/api/simplified/book-chapters?id=${id}`),
    enabled: !!id,
  });
}

export function useBookChaptersCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: BookChaptersCreate) =>
      fetchApi<BookChapters>(`/api/simplified/book-chapters`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookChaptersKeys.lists() });
    },
  });
}

export function useBookChaptersUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: BookChaptersUpdate & { id: string }) =>
      fetchApi<BookChapters>(`/api/simplified/book-chapters`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: bookChaptersKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: bookChaptersKeys.detail(variables.id),
      });
    },
  });
}

export function useBookChaptersDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/book-chapters?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookChaptersKeys.lists() });
    },
  });
}
