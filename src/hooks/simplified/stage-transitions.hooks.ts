import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  StageTransitions,
  StageTransitionsCreate,
  StageTransitionsUpdate,
  StageTransitionsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const stageTransitionsKeys = {
  all: ["stageTransitions"] as const,
  lists: () => [...stageTransitionsKeys.all, "list"] as const,
  list: (filters?: StageTransitionsFilters) => [...stageTransitionsKeys.lists(), filters] as const,
  details: () => [...stageTransitionsKeys.all, "detail"] as const,
  detail: (id: string) => [...stageTransitionsKeys.details(), id] as const,
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

export function useStageTransitionsList(filters?: StageTransitionsFilters) {
  return useQuery({
    queryKey: stageTransitionsKeys.list(filters),
    queryFn: () =>
      fetchApi<StageTransitions[]>(`/api/simplified/stage-transitions${buildQueryString(filters)}`),
  });
}

export function useStageTransitions(id: string) {
  return useQuery({
    queryKey: stageTransitionsKeys.detail(id),
    queryFn: () =>
      fetchApi<StageTransitions>(`/api/simplified/stage-transitions?id=${id}`),
    enabled: !!id,
  });
}

export function useStageTransitionsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: StageTransitionsCreate) =>
      fetchApi<StageTransitions>(`/api/simplified/stage-transitions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: stageTransitionsKeys.lists() });
    },
  });
}

export function useStageTransitionsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: StageTransitionsUpdate & { id: string }) =>
      fetchApi<StageTransitions>(`/api/simplified/stage-transitions`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: stageTransitionsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: stageTransitionsKeys.detail(variables.id),
      });
    },
  });
}

export function useStageTransitionsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/stage-transitions?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: stageTransitionsKeys.lists() });
    },
  });
}
