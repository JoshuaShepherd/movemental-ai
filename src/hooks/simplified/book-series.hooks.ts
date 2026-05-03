import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  BookSeries,
  BookSeriesCreate,
  BookSeriesUpdate,
  BookSeriesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const bookSeriesKeys = {
  all: ["bookSeries"] as const,
  lists: () => [...bookSeriesKeys.all, "list"] as const,
  list: (filters?: BookSeriesFilters) => [...bookSeriesKeys.lists(), filters] as const,
  details: () => [...bookSeriesKeys.all, "detail"] as const,
  detail: (id: string) => [...bookSeriesKeys.details(), id] as const,
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

export function useBookSeriesList(filters?: BookSeriesFilters) {
  return useQuery({
    queryKey: bookSeriesKeys.list(filters),
    queryFn: () =>
      fetchApi<BookSeries[]>(`/api/simplified/book-series${buildQueryString(filters)}`),
  });
}

export function useBookSeries(id: string) {
  return useQuery({
    queryKey: bookSeriesKeys.detail(id),
    queryFn: () =>
      fetchApi<BookSeries>(`/api/simplified/book-series?id=${id}`),
    enabled: !!id,
  });
}

export function useBookSeriesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: BookSeriesCreate) =>
      fetchApi<BookSeries>(`/api/simplified/book-series`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookSeriesKeys.lists() });
    },
  });
}

export function useBookSeriesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: BookSeriesUpdate & { id: string }) =>
      fetchApi<BookSeries>(`/api/simplified/book-series`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: bookSeriesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: bookSeriesKeys.detail(variables.id),
      });
    },
  });
}

export function useBookSeriesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/book-series?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookSeriesKeys.lists() });
    },
  });
}
