import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  BookHighlights,
  BookHighlightsCreate,
  BookHighlightsUpdate,
  BookHighlightsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const bookHighlightsKeys = {
  all: ["bookHighlights"] as const,
  lists: () => [...bookHighlightsKeys.all, "list"] as const,
  list: (filters?: BookHighlightsFilters) => [...bookHighlightsKeys.lists(), filters] as const,
  details: () => [...bookHighlightsKeys.all, "detail"] as const,
  detail: (id: string) => [...bookHighlightsKeys.details(), id] as const,
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

export function useBookHighlightsList(filters?: BookHighlightsFilters) {
  return useQuery({
    queryKey: bookHighlightsKeys.list(filters),
    queryFn: () =>
      fetchApi<BookHighlights[]>(`/api/simplified/book-highlights${buildQueryString(filters)}`),
  });
}

export function useBookHighlights(id: string) {
  return useQuery({
    queryKey: bookHighlightsKeys.detail(id),
    queryFn: () =>
      fetchApi<BookHighlights>(`/api/simplified/book-highlights?id=${id}`),
    enabled: !!id,
  });
}

export function useBookHighlightsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: BookHighlightsCreate) =>
      fetchApi<BookHighlights>(`/api/simplified/book-highlights`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookHighlightsKeys.lists() });
    },
  });
}

export function useBookHighlightsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: BookHighlightsUpdate & { id: string }) =>
      fetchApi<BookHighlights>(`/api/simplified/book-highlights`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: bookHighlightsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: bookHighlightsKeys.detail(variables.id),
      });
    },
  });
}

export function useBookHighlightsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/book-highlights?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookHighlightsKeys.lists() });
    },
  });
}
