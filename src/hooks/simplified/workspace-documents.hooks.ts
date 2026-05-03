import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  WorkspaceDocuments,
  WorkspaceDocumentsCreate,
  WorkspaceDocumentsUpdate,
  WorkspaceDocumentsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const workspaceDocumentsKeys = {
  all: ["workspaceDocuments"] as const,
  lists: () => [...workspaceDocumentsKeys.all, "list"] as const,
  list: (filters?: WorkspaceDocumentsFilters) => [...workspaceDocumentsKeys.lists(), filters] as const,
  details: () => [...workspaceDocumentsKeys.all, "detail"] as const,
  detail: (id: string) => [...workspaceDocumentsKeys.details(), id] as const,
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

export function useWorkspaceDocumentsList(filters?: WorkspaceDocumentsFilters) {
  return useQuery({
    queryKey: workspaceDocumentsKeys.list(filters),
    queryFn: () =>
      fetchApi<WorkspaceDocuments[]>(`/api/simplified/workspace-documents${buildQueryString(filters)}`),
  });
}

export function useWorkspaceDocuments(id: string) {
  return useQuery({
    queryKey: workspaceDocumentsKeys.detail(id),
    queryFn: () =>
      fetchApi<WorkspaceDocuments>(`/api/simplified/workspace-documents?id=${id}`),
    enabled: !!id,
  });
}

export function useWorkspaceDocumentsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: WorkspaceDocumentsCreate) =>
      fetchApi<WorkspaceDocuments>(`/api/simplified/workspace-documents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workspaceDocumentsKeys.lists() });
    },
  });
}

export function useWorkspaceDocumentsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: WorkspaceDocumentsUpdate & { id: string }) =>
      fetchApi<WorkspaceDocuments>(`/api/simplified/workspace-documents`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: workspaceDocumentsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: workspaceDocumentsKeys.detail(variables.id),
      });
    },
  });
}

export function useWorkspaceDocumentsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/workspace-documents?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workspaceDocumentsKeys.lists() });
    },
  });
}
