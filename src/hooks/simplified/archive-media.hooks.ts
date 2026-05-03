import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  ArchiveMedia,
  ArchiveMediaCreate,
  ArchiveMediaUpdate,
  ArchiveMediaFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const archiveMediaKeys = {
  all: ["archiveMedia"] as const,
  lists: () => [...archiveMediaKeys.all, "list"] as const,
  list: (filters?: ArchiveMediaFilters) => [...archiveMediaKeys.lists(), filters] as const,
  details: () => [...archiveMediaKeys.all, "detail"] as const,
  detail: (id: string) => [...archiveMediaKeys.details(), id] as const,
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

export function useArchiveMediaList(filters?: ArchiveMediaFilters) {
  return useQuery({
    queryKey: archiveMediaKeys.list(filters),
    queryFn: () =>
      fetchApi<ArchiveMedia[]>(`/api/simplified/archive-media${buildQueryString(filters)}`),
  });
}

export function useArchiveMedia(id: string) {
  return useQuery({
    queryKey: archiveMediaKeys.detail(id),
    queryFn: () =>
      fetchApi<ArchiveMedia>(`/api/simplified/archive-media?id=${id}`),
    enabled: !!id,
  });
}

export function useArchiveMediaCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ArchiveMediaCreate) =>
      fetchApi<ArchiveMedia>(`/api/simplified/archive-media`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: archiveMediaKeys.lists() });
    },
  });
}

export function useArchiveMediaUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: ArchiveMediaUpdate & { id: string }) =>
      fetchApi<ArchiveMedia>(`/api/simplified/archive-media`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: archiveMediaKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: archiveMediaKeys.detail(variables.id),
      });
    },
  });
}

export function useArchiveMediaDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/archive-media?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: archiveMediaKeys.lists() });
    },
  });
}
