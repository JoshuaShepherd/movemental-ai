import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  NotebookArtifacts,
  NotebookArtifactsCreate,
  NotebookArtifactsUpdate,
  NotebookArtifactsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const notebookArtifactsKeys = {
  all: ["notebookArtifacts"] as const,
  lists: () => [...notebookArtifactsKeys.all, "list"] as const,
  list: (filters?: NotebookArtifactsFilters) => [...notebookArtifactsKeys.lists(), filters] as const,
  details: () => [...notebookArtifactsKeys.all, "detail"] as const,
  detail: (id: string) => [...notebookArtifactsKeys.details(), id] as const,
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

export function useNotebookArtifactsList(filters?: NotebookArtifactsFilters) {
  return useQuery({
    queryKey: notebookArtifactsKeys.list(filters),
    queryFn: () =>
      fetchApi<NotebookArtifacts[]>(`/api/simplified/notebook-artifacts${buildQueryString(filters)}`),
  });
}

export function useNotebookArtifacts(id: string) {
  return useQuery({
    queryKey: notebookArtifactsKeys.detail(id),
    queryFn: () =>
      fetchApi<NotebookArtifacts>(`/api/simplified/notebook-artifacts?id=${id}`),
    enabled: !!id,
  });
}

export function useNotebookArtifactsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: NotebookArtifactsCreate) =>
      fetchApi<NotebookArtifacts>(`/api/simplified/notebook-artifacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notebookArtifactsKeys.lists() });
    },
  });
}

export function useNotebookArtifactsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: NotebookArtifactsUpdate & { id: string }) =>
      fetchApi<NotebookArtifacts>(`/api/simplified/notebook-artifacts`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: notebookArtifactsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: notebookArtifactsKeys.detail(variables.id),
      });
    },
  });
}

export function useNotebookArtifactsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/notebook-artifacts?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notebookArtifactsKeys.lists() });
    },
  });
}
