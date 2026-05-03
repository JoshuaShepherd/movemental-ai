import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  ArchiveCollections,
  ArchiveCollectionsCreate,
  ArchiveCollectionsUpdate,
  ArchiveCollectionsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const archiveCollectionsKeys = {
  all: ["archiveCollections"] as const,
  lists: () => [...archiveCollectionsKeys.all, "list"] as const,
  list: (filters?: ArchiveCollectionsFilters) => [...archiveCollectionsKeys.lists(), filters] as const,
  details: () => [...archiveCollectionsKeys.all, "detail"] as const,
  detail: (id: string) => [...archiveCollectionsKeys.details(), id] as const,
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

export function useArchiveCollectionsList(filters?: ArchiveCollectionsFilters) {
  return useQuery({
    queryKey: archiveCollectionsKeys.list(filters),
    queryFn: () =>
      fetchApi<ArchiveCollections[]>(`/api/simplified/archive-collections${buildQueryString(filters)}`),
  });
}

export function useArchiveCollections(id: string) {
  return useQuery({
    queryKey: archiveCollectionsKeys.detail(id),
    queryFn: () =>
      fetchApi<ArchiveCollections>(`/api/simplified/archive-collections?id=${id}`),
    enabled: !!id,
  });
}

export function useArchiveCollectionsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ArchiveCollectionsCreate) =>
      fetchApi<ArchiveCollections>(`/api/simplified/archive-collections`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: archiveCollectionsKeys.lists() });
    },
  });
}

export function useArchiveCollectionsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: ArchiveCollectionsUpdate & { id: string }) =>
      fetchApi<ArchiveCollections>(`/api/simplified/archive-collections`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: archiveCollectionsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: archiveCollectionsKeys.detail(variables.id),
      });
    },
  });
}

export function useArchiveCollectionsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/archive-collections?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: archiveCollectionsKeys.lists() });
    },
  });
}
