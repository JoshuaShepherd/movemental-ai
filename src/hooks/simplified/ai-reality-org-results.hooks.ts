import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  AiRealityOrgResults,
  AiRealityOrgResultsCreate,
  AiRealityOrgResultsUpdate,
  AiRealityOrgResultsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const aiRealityOrgResultsKeys = {
  all: ["aiRealityOrgResults"] as const,
  lists: () => [...aiRealityOrgResultsKeys.all, "list"] as const,
  list: (filters?: AiRealityOrgResultsFilters) => [...aiRealityOrgResultsKeys.lists(), filters] as const,
  details: () => [...aiRealityOrgResultsKeys.all, "detail"] as const,
  detail: (id: string) => [...aiRealityOrgResultsKeys.details(), id] as const,
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

export function useAiRealityOrgResultsList(filters?: AiRealityOrgResultsFilters) {
  return useQuery({
    queryKey: aiRealityOrgResultsKeys.list(filters),
    queryFn: () =>
      fetchApi<AiRealityOrgResults[]>(`/api/simplified/ai-reality-org-results${buildQueryString(filters)}`),
  });
}

export function useAiRealityOrgResults(id: string) {
  return useQuery({
    queryKey: aiRealityOrgResultsKeys.detail(id),
    queryFn: () =>
      fetchApi<AiRealityOrgResults>(`/api/simplified/ai-reality-org-results?id=${id}`),
    enabled: !!id,
  });
}

export function useAiRealityOrgResultsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AiRealityOrgResultsCreate) =>
      fetchApi<AiRealityOrgResults>(`/api/simplified/ai-reality-org-results`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: aiRealityOrgResultsKeys.lists() });
    },
  });
}

export function useAiRealityOrgResultsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: AiRealityOrgResultsUpdate & { id: string }) =>
      fetchApi<AiRealityOrgResults>(`/api/simplified/ai-reality-org-results`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: aiRealityOrgResultsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: aiRealityOrgResultsKeys.detail(variables.id),
      });
    },
  });
}

export function useAiRealityOrgResultsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/ai-reality-org-results?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: aiRealityOrgResultsKeys.lists() });
    },
  });
}
