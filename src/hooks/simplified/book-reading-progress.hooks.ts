import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  BookReadingProgress,
  BookReadingProgressCreate,
  BookReadingProgressUpdate,
  BookReadingProgressFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const bookReadingProgressKeys = {
  all: ["bookReadingProgress"] as const,
  lists: () => [...bookReadingProgressKeys.all, "list"] as const,
  list: (filters?: BookReadingProgressFilters) => [...bookReadingProgressKeys.lists(), filters] as const,
  details: () => [...bookReadingProgressKeys.all, "detail"] as const,
  detail: (id: string) => [...bookReadingProgressKeys.details(), id] as const,
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

export function useBookReadingProgressList(filters?: BookReadingProgressFilters) {
  return useQuery({
    queryKey: bookReadingProgressKeys.list(filters),
    queryFn: () =>
      fetchApi<BookReadingProgress[]>(`/api/simplified/book-reading-progress${buildQueryString(filters)}`),
  });
}

export function useBookReadingProgress(id: string) {
  return useQuery({
    queryKey: bookReadingProgressKeys.detail(id),
    queryFn: () =>
      fetchApi<BookReadingProgress>(`/api/simplified/book-reading-progress?id=${id}`),
    enabled: !!id,
  });
}

export function useBookReadingProgressCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: BookReadingProgressCreate) =>
      fetchApi<BookReadingProgress>(`/api/simplified/book-reading-progress`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookReadingProgressKeys.lists() });
    },
  });
}

export function useBookReadingProgressUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: BookReadingProgressUpdate & { id: string }) =>
      fetchApi<BookReadingProgress>(`/api/simplified/book-reading-progress`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: bookReadingProgressKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: bookReadingProgressKeys.detail(variables.id),
      });
    },
  });
}

export function useBookReadingProgressDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/book-reading-progress?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookReadingProgressKeys.lists() });
    },
  });
}
