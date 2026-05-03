import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  NotebookSourceChunks,
  NotebookSourceChunksCreate,
  NotebookSourceChunksUpdate,
  NotebookSourceChunksFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const notebookSourceChunksKeys = {
  all: ["notebookSourceChunks"] as const,
  lists: () => [...notebookSourceChunksKeys.all, "list"] as const,
  list: (filters?: NotebookSourceChunksFilters) => [...notebookSourceChunksKeys.lists(), filters] as const,
  details: () => [...notebookSourceChunksKeys.all, "detail"] as const,
  detail: (id: string) => [...notebookSourceChunksKeys.details(), id] as const,
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

export function useNotebookSourceChunksList(filters?: NotebookSourceChunksFilters) {
  return useQuery({
    queryKey: notebookSourceChunksKeys.list(filters),
    queryFn: () =>
      fetchApi<NotebookSourceChunks[]>(`/api/simplified/notebook-source-chunks${buildQueryString(filters)}`),
  });
}

export function useNotebookSourceChunks(id: string) {
  return useQuery({
    queryKey: notebookSourceChunksKeys.detail(id),
    queryFn: () =>
      fetchApi<NotebookSourceChunks>(`/api/simplified/notebook-source-chunks?id=${id}`),
    enabled: !!id,
  });
}

export function useNotebookSourceChunksCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: NotebookSourceChunksCreate) =>
      fetchApi<NotebookSourceChunks>(`/api/simplified/notebook-source-chunks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notebookSourceChunksKeys.lists() });
    },
  });
}

export function useNotebookSourceChunksUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: NotebookSourceChunksUpdate & { id: string }) =>
      fetchApi<NotebookSourceChunks>(`/api/simplified/notebook-source-chunks`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: notebookSourceChunksKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: notebookSourceChunksKeys.detail(variables.id),
      });
    },
  });
}

export function useNotebookSourceChunksDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/notebook-source-chunks?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notebookSourceChunksKeys.lists() });
    },
  });
}
