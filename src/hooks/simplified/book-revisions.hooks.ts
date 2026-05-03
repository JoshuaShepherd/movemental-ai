import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  BookRevisions,
  BookRevisionsCreate,
  BookRevisionsUpdate,
  BookRevisionsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const bookRevisionsKeys = {
  all: ["bookRevisions"] as const,
  lists: () => [...bookRevisionsKeys.all, "list"] as const,
  list: (filters?: BookRevisionsFilters) => [...bookRevisionsKeys.lists(), filters] as const,
  details: () => [...bookRevisionsKeys.all, "detail"] as const,
  detail: (id: string) => [...bookRevisionsKeys.details(), id] as const,
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

export function useBookRevisionsList(filters?: BookRevisionsFilters) {
  return useQuery({
    queryKey: bookRevisionsKeys.list(filters),
    queryFn: () =>
      fetchApi<BookRevisions[]>(`/api/simplified/book-revisions${buildQueryString(filters)}`),
  });
}

export function useBookRevisions(id: string) {
  return useQuery({
    queryKey: bookRevisionsKeys.detail(id),
    queryFn: () =>
      fetchApi<BookRevisions>(`/api/simplified/book-revisions?id=${id}`),
    enabled: !!id,
  });
}

export function useBookRevisionsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: BookRevisionsCreate) =>
      fetchApi<BookRevisions>(`/api/simplified/book-revisions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookRevisionsKeys.lists() });
    },
  });
}

export function useBookRevisionsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: BookRevisionsUpdate & { id: string }) =>
      fetchApi<BookRevisions>(`/api/simplified/book-revisions`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: bookRevisionsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: bookRevisionsKeys.detail(variables.id),
      });
    },
  });
}

export function useBookRevisionsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/book-revisions?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookRevisionsKeys.lists() });
    },
  });
}
