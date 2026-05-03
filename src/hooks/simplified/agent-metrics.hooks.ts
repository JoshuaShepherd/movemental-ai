import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  AgentMetrics,
  AgentMetricsCreate,
  AgentMetricsUpdate,
  AgentMetricsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const agentMetricsKeys = {
  all: ["agentMetrics"] as const,
  lists: () => [...agentMetricsKeys.all, "list"] as const,
  list: (filters?: AgentMetricsFilters) => [...agentMetricsKeys.lists(), filters] as const,
  details: () => [...agentMetricsKeys.all, "detail"] as const,
  detail: (id: string) => [...agentMetricsKeys.details(), id] as const,
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

export function useAgentMetricsList(filters?: AgentMetricsFilters) {
  return useQuery({
    queryKey: agentMetricsKeys.list(filters),
    queryFn: () =>
      fetchApi<AgentMetrics[]>(`/api/simplified/agent-metrics${buildQueryString(filters)}`),
  });
}

export function useAgentMetrics(id: string) {
  return useQuery({
    queryKey: agentMetricsKeys.detail(id),
    queryFn: () =>
      fetchApi<AgentMetrics>(`/api/simplified/agent-metrics?id=${id}`),
    enabled: !!id,
  });
}

export function useAgentMetricsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AgentMetricsCreate) =>
      fetchApi<AgentMetrics>(`/api/simplified/agent-metrics`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: agentMetricsKeys.lists() });
    },
  });
}

export function useAgentMetricsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: AgentMetricsUpdate & { id: string }) =>
      fetchApi<AgentMetrics>(`/api/simplified/agent-metrics`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: agentMetricsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: agentMetricsKeys.detail(variables.id),
      });
    },
  });
}

export function useAgentMetricsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/agent-metrics?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: agentMetricsKeys.lists() });
    },
  });
}
