import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  NotebookSources,
  NotebookSourcesCreate,
  NotebookSourcesUpdate,
  NotebookSourcesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const notebookSourcesKeys = {
  all: ["notebookSources"] as const,
  lists: () => [...notebookSourcesKeys.all, "list"] as const,
  list: (filters?: NotebookSourcesFilters) => [...notebookSourcesKeys.lists(), filters] as const,
  details: () => [...notebookSourcesKeys.all, "detail"] as const,
  detail: (id: string) => [...notebookSourcesKeys.details(), id] as const,
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

export function useNotebookSourcesList(filters?: NotebookSourcesFilters) {
  return useQuery({
    queryKey: notebookSourcesKeys.list(filters),
    queryFn: () =>
      fetchApi<NotebookSources[]>(`/api/simplified/notebook-sources${buildQueryString(filters)}`),
  });
}

export function useNotebookSources(id: string) {
  return useQuery({
    queryKey: notebookSourcesKeys.detail(id),
    queryFn: () =>
      fetchApi<NotebookSources>(`/api/simplified/notebook-sources?id=${id}`),
    enabled: !!id,
  });
}

export function useNotebookSourcesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: NotebookSourcesCreate) =>
      fetchApi<NotebookSources>(`/api/simplified/notebook-sources`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notebookSourcesKeys.lists() });
    },
  });
}

export function useNotebookSourcesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: NotebookSourcesUpdate & { id: string }) =>
      fetchApi<NotebookSources>(`/api/simplified/notebook-sources`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: notebookSourcesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: notebookSourcesKeys.detail(variables.id),
      });
    },
  });
}

export function useNotebookSourcesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/notebook-sources?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notebookSourcesKeys.lists() });
    },
  });
}
