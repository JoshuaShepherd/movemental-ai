import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  AiRealityResults,
  AiRealityResultsCreate,
  AiRealityResultsUpdate,
  AiRealityResultsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const aiRealityResultsKeys = {
  all: ["aiRealityResults"] as const,
  lists: () => [...aiRealityResultsKeys.all, "list"] as const,
  list: (filters?: AiRealityResultsFilters) => [...aiRealityResultsKeys.lists(), filters] as const,
  details: () => [...aiRealityResultsKeys.all, "detail"] as const,
  detail: (id: string) => [...aiRealityResultsKeys.details(), id] as const,
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

export function useAiRealityResultsList(filters?: AiRealityResultsFilters) {
  return useQuery({
    queryKey: aiRealityResultsKeys.list(filters),
    queryFn: () =>
      fetchApi<AiRealityResults[]>(`/api/simplified/ai-reality-results${buildQueryString(filters)}`),
  });
}

export function useAiRealityResults(id: string) {
  return useQuery({
    queryKey: aiRealityResultsKeys.detail(id),
    queryFn: () =>
      fetchApi<AiRealityResults>(`/api/simplified/ai-reality-results?id=${id}`),
    enabled: !!id,
  });
}

export function useAiRealityResultsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AiRealityResultsCreate) =>
      fetchApi<AiRealityResults>(`/api/simplified/ai-reality-results`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: aiRealityResultsKeys.lists() });
    },
  });
}

export function useAiRealityResultsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: AiRealityResultsUpdate & { id: string }) =>
      fetchApi<AiRealityResults>(`/api/simplified/ai-reality-results`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: aiRealityResultsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: aiRealityResultsKeys.detail(variables.id),
      });
    },
  });
}

export function useAiRealityResultsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/ai-reality-results?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: aiRealityResultsKeys.lists() });
    },
  });
}
