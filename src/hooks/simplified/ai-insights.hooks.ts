import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  AiInsights,
  AiInsightsCreate,
  AiInsightsUpdate,
  AiInsightsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const aiInsightsKeys = {
  all: ["aiInsights"] as const,
  lists: () => [...aiInsightsKeys.all, "list"] as const,
  list: (filters?: AiInsightsFilters) => [...aiInsightsKeys.lists(), filters] as const,
  details: () => [...aiInsightsKeys.all, "detail"] as const,
  detail: (id: string) => [...aiInsightsKeys.details(), id] as const,
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

export function useAiInsightsList(filters?: AiInsightsFilters) {
  return useQuery({
    queryKey: aiInsightsKeys.list(filters),
    queryFn: () =>
      fetchApi<AiInsights[]>(`/api/simplified/ai-insights${buildQueryString(filters)}`),
  });
}

export function useAiInsights(id: string) {
  return useQuery({
    queryKey: aiInsightsKeys.detail(id),
    queryFn: () =>
      fetchApi<AiInsights>(`/api/simplified/ai-insights?id=${id}`),
    enabled: !!id,
  });
}

export function useAiInsightsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AiInsightsCreate) =>
      fetchApi<AiInsights>(`/api/simplified/ai-insights`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: aiInsightsKeys.lists() });
    },
  });
}

export function useAiInsightsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: AiInsightsUpdate & { id: string }) =>
      fetchApi<AiInsights>(`/api/simplified/ai-insights`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: aiInsightsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: aiInsightsKeys.detail(variables.id),
      });
    },
  });
}

export function useAiInsightsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/ai-insights?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: aiInsightsKeys.lists() });
    },
  });
}
