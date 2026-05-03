import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  ContentWorkflows,
  ContentWorkflowsCreate,
  ContentWorkflowsUpdate,
  ContentWorkflowsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const contentWorkflowsKeys = {
  all: ["contentWorkflows"] as const,
  lists: () => [...contentWorkflowsKeys.all, "list"] as const,
  list: (filters?: ContentWorkflowsFilters) => [...contentWorkflowsKeys.lists(), filters] as const,
  details: () => [...contentWorkflowsKeys.all, "detail"] as const,
  detail: (id: string) => [...contentWorkflowsKeys.details(), id] as const,
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

export function useContentWorkflowsList(filters?: ContentWorkflowsFilters) {
  return useQuery({
    queryKey: contentWorkflowsKeys.list(filters),
    queryFn: () =>
      fetchApi<ContentWorkflows[]>(`/api/simplified/content-workflows${buildQueryString(filters)}`),
  });
}

export function useContentWorkflows(id: string) {
  return useQuery({
    queryKey: contentWorkflowsKeys.detail(id),
    queryFn: () =>
      fetchApi<ContentWorkflows>(`/api/simplified/content-workflows?id=${id}`),
    enabled: !!id,
  });
}

export function useContentWorkflowsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ContentWorkflowsCreate) =>
      fetchApi<ContentWorkflows>(`/api/simplified/content-workflows`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contentWorkflowsKeys.lists() });
    },
  });
}

export function useContentWorkflowsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: ContentWorkflowsUpdate & { id: string }) =>
      fetchApi<ContentWorkflows>(`/api/simplified/content-workflows`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: contentWorkflowsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: contentWorkflowsKeys.detail(variables.id),
      });
    },
  });
}

export function useContentWorkflowsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/content-workflows?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contentWorkflowsKeys.lists() });
    },
  });
}
