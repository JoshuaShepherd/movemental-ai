import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  SavedArchiveViews,
  SavedArchiveViewsCreate,
  SavedArchiveViewsUpdate,
  SavedArchiveViewsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const savedArchiveViewsKeys = {
  all: ["savedArchiveViews"] as const,
  lists: () => [...savedArchiveViewsKeys.all, "list"] as const,
  list: (filters?: SavedArchiveViewsFilters) => [...savedArchiveViewsKeys.lists(), filters] as const,
  details: () => [...savedArchiveViewsKeys.all, "detail"] as const,
  detail: (id: string) => [...savedArchiveViewsKeys.details(), id] as const,
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

export function useSavedArchiveViewsList(filters?: SavedArchiveViewsFilters) {
  return useQuery({
    queryKey: savedArchiveViewsKeys.list(filters),
    queryFn: () =>
      fetchApi<SavedArchiveViews[]>(`/api/simplified/saved-archive-views${buildQueryString(filters)}`),
  });
}

export function useSavedArchiveViews(id: string) {
  return useQuery({
    queryKey: savedArchiveViewsKeys.detail(id),
    queryFn: () =>
      fetchApi<SavedArchiveViews>(`/api/simplified/saved-archive-views?id=${id}`),
    enabled: !!id,
  });
}

export function useSavedArchiveViewsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SavedArchiveViewsCreate) =>
      fetchApi<SavedArchiveViews>(`/api/simplified/saved-archive-views`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: savedArchiveViewsKeys.lists() });
    },
  });
}

export function useSavedArchiveViewsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: SavedArchiveViewsUpdate & { id: string }) =>
      fetchApi<SavedArchiveViews>(`/api/simplified/saved-archive-views`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: savedArchiveViewsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: savedArchiveViewsKeys.detail(variables.id),
      });
    },
  });
}

export function useSavedArchiveViewsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/saved-archive-views?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: savedArchiveViewsKeys.lists() });
    },
  });
}
