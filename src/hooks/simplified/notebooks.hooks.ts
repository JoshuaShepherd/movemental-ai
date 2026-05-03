import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  Notebooks,
  NotebooksCreate,
  NotebooksUpdate,
  NotebooksFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const notebooksKeys = {
  all: ["notebooks"] as const,
  lists: () => [...notebooksKeys.all, "list"] as const,
  list: (filters?: NotebooksFilters) => [...notebooksKeys.lists(), filters] as const,
  details: () => [...notebooksKeys.all, "detail"] as const,
  detail: (id: string) => [...notebooksKeys.details(), id] as const,
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

export function useNotebooksList(filters?: NotebooksFilters) {
  return useQuery({
    queryKey: notebooksKeys.list(filters),
    queryFn: () =>
      fetchApi<Notebooks[]>(`/api/simplified/notebooks${buildQueryString(filters)}`),
  });
}

export function useNotebooks(id: string) {
  return useQuery({
    queryKey: notebooksKeys.detail(id),
    queryFn: () =>
      fetchApi<Notebooks>(`/api/simplified/notebooks?id=${id}`),
    enabled: !!id,
  });
}

export function useNotebooksCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: NotebooksCreate) =>
      fetchApi<Notebooks>(`/api/simplified/notebooks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notebooksKeys.lists() });
    },
  });
}

export function useNotebooksUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: NotebooksUpdate & { id: string }) =>
      fetchApi<Notebooks>(`/api/simplified/notebooks`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: notebooksKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: notebooksKeys.detail(variables.id),
      });
    },
  });
}

export function useNotebooksDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/notebooks?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notebooksKeys.lists() });
    },
  });
}
