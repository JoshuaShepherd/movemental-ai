import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  MediaItems,
  MediaItemsCreate,
  MediaItemsUpdate,
  MediaItemsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const mediaItemsKeys = {
  all: ["mediaItems"] as const,
  lists: () => [...mediaItemsKeys.all, "list"] as const,
  list: (filters?: MediaItemsFilters) => [...mediaItemsKeys.lists(), filters] as const,
  details: () => [...mediaItemsKeys.all, "detail"] as const,
  detail: (id: string) => [...mediaItemsKeys.details(), id] as const,
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

export function useMediaItemsList(filters?: MediaItemsFilters) {
  return useQuery({
    queryKey: mediaItemsKeys.list(filters),
    queryFn: () =>
      fetchApi<MediaItems[]>(`/api/simplified/media-items${buildQueryString(filters)}`),
  });
}

export function useMediaItems(id: string) {
  return useQuery({
    queryKey: mediaItemsKeys.detail(id),
    queryFn: () =>
      fetchApi<MediaItems>(`/api/simplified/media-items?id=${id}`),
    enabled: !!id,
  });
}

export function useMediaItemsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: MediaItemsCreate) =>
      fetchApi<MediaItems>(`/api/simplified/media-items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mediaItemsKeys.lists() });
    },
  });
}

export function useMediaItemsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: MediaItemsUpdate & { id: string }) =>
      fetchApi<MediaItems>(`/api/simplified/media-items`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: mediaItemsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: mediaItemsKeys.detail(variables.id),
      });
    },
  });
}

export function useMediaItemsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/media-items?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mediaItemsKeys.lists() });
    },
  });
}
