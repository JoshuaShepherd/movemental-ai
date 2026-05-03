import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  ArchiveTopics,
  ArchiveTopicsCreate,
  ArchiveTopicsUpdate,
  ArchiveTopicsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const archiveTopicsKeys = {
  all: ["archiveTopics"] as const,
  lists: () => [...archiveTopicsKeys.all, "list"] as const,
  list: (filters?: ArchiveTopicsFilters) => [...archiveTopicsKeys.lists(), filters] as const,
  details: () => [...archiveTopicsKeys.all, "detail"] as const,
  detail: (id: string) => [...archiveTopicsKeys.details(), id] as const,
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

export function useArchiveTopicsList(filters?: ArchiveTopicsFilters) {
  return useQuery({
    queryKey: archiveTopicsKeys.list(filters),
    queryFn: () =>
      fetchApi<ArchiveTopics[]>(`/api/simplified/archive-topics${buildQueryString(filters)}`),
  });
}

export function useArchiveTopics(id: string) {
  return useQuery({
    queryKey: archiveTopicsKeys.detail(id),
    queryFn: () =>
      fetchApi<ArchiveTopics>(`/api/simplified/archive-topics?id=${id}`),
    enabled: !!id,
  });
}

export function useArchiveTopicsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ArchiveTopicsCreate) =>
      fetchApi<ArchiveTopics>(`/api/simplified/archive-topics`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: archiveTopicsKeys.lists() });
    },
  });
}

export function useArchiveTopicsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: ArchiveTopicsUpdate & { id: string }) =>
      fetchApi<ArchiveTopics>(`/api/simplified/archive-topics`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: archiveTopicsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: archiveTopicsKeys.detail(variables.id),
      });
    },
  });
}

export function useArchiveTopicsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/archive-topics?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: archiveTopicsKeys.lists() });
    },
  });
}
