import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  AgentTraces,
  AgentTracesCreate,
  AgentTracesUpdate,
  AgentTracesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const agentTracesKeys = {
  all: ["agentTraces"] as const,
  lists: () => [...agentTracesKeys.all, "list"] as const,
  list: (filters?: AgentTracesFilters) => [...agentTracesKeys.lists(), filters] as const,
  details: () => [...agentTracesKeys.all, "detail"] as const,
  detail: (id: string) => [...agentTracesKeys.details(), id] as const,
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

export function useAgentTracesList(filters?: AgentTracesFilters) {
  return useQuery({
    queryKey: agentTracesKeys.list(filters),
    queryFn: () =>
      fetchApi<AgentTraces[]>(`/api/simplified/agent-traces${buildQueryString(filters)}`),
  });
}

export function useAgentTraces(id: string) {
  return useQuery({
    queryKey: agentTracesKeys.detail(id),
    queryFn: () =>
      fetchApi<AgentTraces>(`/api/simplified/agent-traces?id=${id}`),
    enabled: !!id,
  });
}

export function useAgentTracesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AgentTracesCreate) =>
      fetchApi<AgentTraces>(`/api/simplified/agent-traces`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: agentTracesKeys.lists() });
    },
  });
}

export function useAgentTracesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: AgentTracesUpdate & { id: string }) =>
      fetchApi<AgentTraces>(`/api/simplified/agent-traces`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: agentTracesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: agentTracesKeys.detail(variables.id),
      });
    },
  });
}

export function useAgentTracesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/agent-traces?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: agentTracesKeys.lists() });
    },
  });
}
