import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  BookReviews,
  BookReviewsCreate,
  BookReviewsUpdate,
  BookReviewsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const bookReviewsKeys = {
  all: ["bookReviews"] as const,
  lists: () => [...bookReviewsKeys.all, "list"] as const,
  list: (filters?: BookReviewsFilters) => [...bookReviewsKeys.lists(), filters] as const,
  details: () => [...bookReviewsKeys.all, "detail"] as const,
  detail: (id: string) => [...bookReviewsKeys.details(), id] as const,
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

export function useBookReviewsList(filters?: BookReviewsFilters) {
  return useQuery({
    queryKey: bookReviewsKeys.list(filters),
    queryFn: () =>
      fetchApi<BookReviews[]>(`/api/simplified/book-reviews${buildQueryString(filters)}`),
  });
}

export function useBookReviews(id: string) {
  return useQuery({
    queryKey: bookReviewsKeys.detail(id),
    queryFn: () =>
      fetchApi<BookReviews>(`/api/simplified/book-reviews?id=${id}`),
    enabled: !!id,
  });
}

export function useBookReviewsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: BookReviewsCreate) =>
      fetchApi<BookReviews>(`/api/simplified/book-reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookReviewsKeys.lists() });
    },
  });
}

export function useBookReviewsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: BookReviewsUpdate & { id: string }) =>
      fetchApi<BookReviews>(`/api/simplified/book-reviews`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: bookReviewsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: bookReviewsKeys.detail(variables.id),
      });
    },
  });
}

export function useBookReviewsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/book-reviews?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookReviewsKeys.lists() });
    },
  });
}
