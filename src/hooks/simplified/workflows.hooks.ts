import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  Workflows,
  WorkflowsCreate,
  WorkflowsUpdate,
  WorkflowsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const workflowsKeys = {
  all: ["workflows"] as const,
  lists: () => [...workflowsKeys.all, "list"] as const,
  list: (filters?: WorkflowsFilters) => [...workflowsKeys.lists(), filters] as const,
  details: () => [...workflowsKeys.all, "detail"] as const,
  detail: (id: string) => [...workflowsKeys.details(), id] as const,
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

export function useWorkflowsList(filters?: WorkflowsFilters) {
  return useQuery({
    queryKey: workflowsKeys.list(filters),
    queryFn: () =>
      fetchApi<Workflows[]>(`/api/simplified/workflows${buildQueryString(filters)}`),
  });
}

export function useWorkflows(id: string) {
  return useQuery({
    queryKey: workflowsKeys.detail(id),
    queryFn: () =>
      fetchApi<Workflows>(`/api/simplified/workflows?id=${id}`),
    enabled: !!id,
  });
}

export function useWorkflowsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: WorkflowsCreate) =>
      fetchApi<Workflows>(`/api/simplified/workflows`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workflowsKeys.lists() });
    },
  });
}

export function useWorkflowsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: WorkflowsUpdate & { id: string }) =>
      fetchApi<Workflows>(`/api/simplified/workflows`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: workflowsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: workflowsKeys.detail(variables.id),
      });
    },
  });
}

export function useWorkflowsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/workflows?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workflowsKeys.lists() });
    },
  });
}
