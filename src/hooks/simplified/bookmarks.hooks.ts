import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  Bookmarks,
  BookmarksCreate,
  BookmarksUpdate,
  BookmarksFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const bookmarksKeys = {
  all: ["bookmarks"] as const,
  lists: () => [...bookmarksKeys.all, "list"] as const,
  list: (filters?: BookmarksFilters) => [...bookmarksKeys.lists(), filters] as const,
  details: () => [...bookmarksKeys.all, "detail"] as const,
  detail: (id: string) => [...bookmarksKeys.details(), id] as const,
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

export function useBookmarksList(filters?: BookmarksFilters) {
  return useQuery({
    queryKey: bookmarksKeys.list(filters),
    queryFn: () =>
      fetchApi<Bookmarks[]>(`/api/simplified/bookmarks${buildQueryString(filters)}`),
  });
}

export function useBookmarks(id: string) {
  return useQuery({
    queryKey: bookmarksKeys.detail(id),
    queryFn: () =>
      fetchApi<Bookmarks>(`/api/simplified/bookmarks?id=${id}`),
    enabled: !!id,
  });
}

export function useBookmarksCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: BookmarksCreate) =>
      fetchApi<Bookmarks>(`/api/simplified/bookmarks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookmarksKeys.lists() });
    },
  });
}

export function useBookmarksUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: BookmarksUpdate & { id: string }) =>
      fetchApi<Bookmarks>(`/api/simplified/bookmarks`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: bookmarksKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: bookmarksKeys.detail(variables.id),
      });
    },
  });
}

export function useBookmarksDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/bookmarks?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookmarksKeys.lists() });
    },
  });
}
