import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  AgentInstances,
  AgentInstancesCreate,
  AgentInstancesUpdate,
  AgentInstancesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const agentInstancesKeys = {
  all: ["agentInstances"] as const,
  lists: () => [...agentInstancesKeys.all, "list"] as const,
  list: (filters?: AgentInstancesFilters) => [...agentInstancesKeys.lists(), filters] as const,
  details: () => [...agentInstancesKeys.all, "detail"] as const,
  detail: (id: string) => [...agentInstancesKeys.details(), id] as const,
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

export function useAgentInstancesList(filters?: AgentInstancesFilters) {
  return useQuery({
    queryKey: agentInstancesKeys.list(filters),
    queryFn: () =>
      fetchApi<AgentInstances[]>(`/api/simplified/agent-instances${buildQueryString(filters)}`),
  });
}

export function useAgentInstances(id: string) {
  return useQuery({
    queryKey: agentInstancesKeys.detail(id),
    queryFn: () =>
      fetchApi<AgentInstances>(`/api/simplified/agent-instances?id=${id}`),
    enabled: !!id,
  });
}

export function useAgentInstancesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AgentInstancesCreate) =>
      fetchApi<AgentInstances>(`/api/simplified/agent-instances`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: agentInstancesKeys.lists() });
    },
  });
}

export function useAgentInstancesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: AgentInstancesUpdate & { id: string }) =>
      fetchApi<AgentInstances>(`/api/simplified/agent-instances`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: agentInstancesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: agentInstancesKeys.detail(variables.id),
      });
    },
  });
}

export function useAgentInstancesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/agent-instances?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: agentInstancesKeys.lists() });
    },
  });
}
