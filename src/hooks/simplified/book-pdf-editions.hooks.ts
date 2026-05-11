import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  BookPdfEditions,
  BookPdfEditionsCreate,
  BookPdfEditionsUpdate,
  BookPdfEditionsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const bookPdfEditionsKeys = {
  all: ["bookPdfEditions"] as const,
  lists: () => [...bookPdfEditionsKeys.all, "list"] as const,
  list: (filters?: BookPdfEditionsFilters) => [...bookPdfEditionsKeys.lists(), filters] as const,
  details: () => [...bookPdfEditionsKeys.all, "detail"] as const,
  detail: (id: string) => [...bookPdfEditionsKeys.details(), id] as const,
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

export function useBookPdfEditionsList(filters?: BookPdfEditionsFilters) {
  return useQuery({
    queryKey: bookPdfEditionsKeys.list(filters),
    queryFn: () =>
      fetchApi<BookPdfEditions[]>(`/api/simplified/book-pdf-editions${buildQueryString(filters)}`),
  });
}

export function useBookPdfEditions(id: string) {
  return useQuery({
    queryKey: bookPdfEditionsKeys.detail(id),
    queryFn: () =>
      fetchApi<BookPdfEditions>(`/api/simplified/book-pdf-editions?id=${id}`),
    enabled: !!id,
  });
}

export function useBookPdfEditionsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: BookPdfEditionsCreate) =>
      fetchApi<BookPdfEditions>(`/api/simplified/book-pdf-editions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookPdfEditionsKeys.lists() });
    },
  });
}

export function useBookPdfEditionsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: BookPdfEditionsUpdate & { id: string }) =>
      fetchApi<BookPdfEditions>(`/api/simplified/book-pdf-editions`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: bookPdfEditionsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: bookPdfEditionsKeys.detail(variables.id),
      });
    },
  });
}

export function useBookPdfEditionsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/book-pdf-editions?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookPdfEditionsKeys.lists() });
    },
  });
}
