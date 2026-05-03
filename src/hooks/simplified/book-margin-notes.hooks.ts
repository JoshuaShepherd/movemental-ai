import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  BookMarginNotes,
  BookMarginNotesCreate,
  BookMarginNotesUpdate,
  BookMarginNotesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const bookMarginNotesKeys = {
  all: ["bookMarginNotes"] as const,
  lists: () => [...bookMarginNotesKeys.all, "list"] as const,
  list: (filters?: BookMarginNotesFilters) => [...bookMarginNotesKeys.lists(), filters] as const,
  details: () => [...bookMarginNotesKeys.all, "detail"] as const,
  detail: (id: string) => [...bookMarginNotesKeys.details(), id] as const,
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

export function useBookMarginNotesList(filters?: BookMarginNotesFilters) {
  return useQuery({
    queryKey: bookMarginNotesKeys.list(filters),
    queryFn: () =>
      fetchApi<BookMarginNotes[]>(`/api/simplified/book-margin-notes${buildQueryString(filters)}`),
  });
}

export function useBookMarginNotes(id: string) {
  return useQuery({
    queryKey: bookMarginNotesKeys.detail(id),
    queryFn: () =>
      fetchApi<BookMarginNotes>(`/api/simplified/book-margin-notes?id=${id}`),
    enabled: !!id,
  });
}

export function useBookMarginNotesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: BookMarginNotesCreate) =>
      fetchApi<BookMarginNotes>(`/api/simplified/book-margin-notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookMarginNotesKeys.lists() });
    },
  });
}

export function useBookMarginNotesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: BookMarginNotesUpdate & { id: string }) =>
      fetchApi<BookMarginNotes>(`/api/simplified/book-margin-notes`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: bookMarginNotesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: bookMarginNotesKeys.detail(variables.id),
      });
    },
  });
}

export function useBookMarginNotesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/book-margin-notes?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookMarginNotesKeys.lists() });
    },
  });
}
