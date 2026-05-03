import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  ArchiveItemRevisions,
  ArchiveItemRevisionsCreate,
  ArchiveItemRevisionsUpdate,
  ArchiveItemRevisionsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const archiveItemRevisionsKeys = {
  all: ["archiveItemRevisions"] as const,
  lists: () => [...archiveItemRevisionsKeys.all, "list"] as const,
  list: (filters?: ArchiveItemRevisionsFilters) => [...archiveItemRevisionsKeys.lists(), filters] as const,
  details: () => [...archiveItemRevisionsKeys.all, "detail"] as const,
  detail: (id: string) => [...archiveItemRevisionsKeys.details(), id] as const,
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

export function useArchiveItemRevisionsList(filters?: ArchiveItemRevisionsFilters) {
  return useQuery({
    queryKey: archiveItemRevisionsKeys.list(filters),
    queryFn: () =>
      fetchApi<ArchiveItemRevisions[]>(`/api/simplified/archive-item-revisions${buildQueryString(filters)}`),
  });
}

export function useArchiveItemRevisions(id: string) {
  return useQuery({
    queryKey: archiveItemRevisionsKeys.detail(id),
    queryFn: () =>
      fetchApi<ArchiveItemRevisions>(`/api/simplified/archive-item-revisions?id=${id}`),
    enabled: !!id,
  });
}

export function useArchiveItemRevisionsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ArchiveItemRevisionsCreate) =>
      fetchApi<ArchiveItemRevisions>(`/api/simplified/archive-item-revisions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: archiveItemRevisionsKeys.lists() });
    },
  });
}

export function useArchiveItemRevisionsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: ArchiveItemRevisionsUpdate & { id: string }) =>
      fetchApi<ArchiveItemRevisions>(`/api/simplified/archive-item-revisions`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: archiveItemRevisionsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: archiveItemRevisionsKeys.detail(variables.id),
      });
    },
  });
}

export function useArchiveItemRevisionsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/archive-item-revisions?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: archiveItemRevisionsKeys.lists() });
    },
  });
}
