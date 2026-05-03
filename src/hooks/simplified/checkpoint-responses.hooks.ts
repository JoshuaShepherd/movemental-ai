import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  CheckpointResponses,
  CheckpointResponsesCreate,
  CheckpointResponsesUpdate,
  CheckpointResponsesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const checkpointResponsesKeys = {
  all: ["checkpointResponses"] as const,
  lists: () => [...checkpointResponsesKeys.all, "list"] as const,
  list: (filters?: CheckpointResponsesFilters) => [...checkpointResponsesKeys.lists(), filters] as const,
  details: () => [...checkpointResponsesKeys.all, "detail"] as const,
  detail: (id: string) => [...checkpointResponsesKeys.details(), id] as const,
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

export function useCheckpointResponsesList(filters?: CheckpointResponsesFilters) {
  return useQuery({
    queryKey: checkpointResponsesKeys.list(filters),
    queryFn: () =>
      fetchApi<CheckpointResponses[]>(`/api/simplified/checkpoint-responses${buildQueryString(filters)}`),
  });
}

export function useCheckpointResponses(id: string) {
  return useQuery({
    queryKey: checkpointResponsesKeys.detail(id),
    queryFn: () =>
      fetchApi<CheckpointResponses>(`/api/simplified/checkpoint-responses?id=${id}`),
    enabled: !!id,
  });
}

export function useCheckpointResponsesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CheckpointResponsesCreate) =>
      fetchApi<CheckpointResponses>(`/api/simplified/checkpoint-responses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: checkpointResponsesKeys.lists() });
    },
  });
}

export function useCheckpointResponsesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: CheckpointResponsesUpdate & { id: string }) =>
      fetchApi<CheckpointResponses>(`/api/simplified/checkpoint-responses`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: checkpointResponsesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: checkpointResponsesKeys.detail(variables.id),
      });
    },
  });
}

export function useCheckpointResponsesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/checkpoint-responses?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: checkpointResponsesKeys.lists() });
    },
  });
}
