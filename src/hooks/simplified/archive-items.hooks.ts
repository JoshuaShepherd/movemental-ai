import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  ArchiveItems,
  ArchiveItemsCreate,
  ArchiveItemsUpdate,
  ArchiveItemsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const archiveItemsKeys = {
  all: ["archiveItems"] as const,
  lists: () => [...archiveItemsKeys.all, "list"] as const,
  list: (filters?: ArchiveItemsFilters) => [...archiveItemsKeys.lists(), filters] as const,
  details: () => [...archiveItemsKeys.all, "detail"] as const,
  detail: (id: string) => [...archiveItemsKeys.details(), id] as const,
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

export function useArchiveItemsList(filters?: ArchiveItemsFilters) {
  return useQuery({
    queryKey: archiveItemsKeys.list(filters),
    queryFn: () =>
      fetchApi<ArchiveItems[]>(`/api/simplified/archive-items${buildQueryString(filters)}`),
  });
}

export function useArchiveItems(id: string) {
  return useQuery({
    queryKey: archiveItemsKeys.detail(id),
    queryFn: () =>
      fetchApi<ArchiveItems>(`/api/simplified/archive-items?id=${id}`),
    enabled: !!id,
  });
}

export function useArchiveItemsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ArchiveItemsCreate) =>
      fetchApi<ArchiveItems>(`/api/simplified/archive-items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: archiveItemsKeys.lists() });
    },
  });
}

export function useArchiveItemsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: ArchiveItemsUpdate & { id: string }) =>
      fetchApi<ArchiveItems>(`/api/simplified/archive-items`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: archiveItemsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: archiveItemsKeys.detail(variables.id),
      });
    },
  });
}

export function useArchiveItemsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/archive-items?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: archiveItemsKeys.lists() });
    },
  });
}
