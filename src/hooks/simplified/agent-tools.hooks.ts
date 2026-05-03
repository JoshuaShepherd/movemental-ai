import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  AgentTools,
  AgentToolsCreate,
  AgentToolsUpdate,
  AgentToolsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const agentToolsKeys = {
  all: ["agentTools"] as const,
  lists: () => [...agentToolsKeys.all, "list"] as const,
  list: (filters?: AgentToolsFilters) => [...agentToolsKeys.lists(), filters] as const,
  details: () => [...agentToolsKeys.all, "detail"] as const,
  detail: (id: string) => [...agentToolsKeys.details(), id] as const,
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

export function useAgentToolsList(filters?: AgentToolsFilters) {
  return useQuery({
    queryKey: agentToolsKeys.list(filters),
    queryFn: () =>
      fetchApi<AgentTools[]>(`/api/simplified/agent-tools${buildQueryString(filters)}`),
  });
}

export function useAgentTools(id: string) {
  return useQuery({
    queryKey: agentToolsKeys.detail(id),
    queryFn: () =>
      fetchApi<AgentTools>(`/api/simplified/agent-tools?id=${id}`),
    enabled: !!id,
  });
}

export function useAgentToolsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AgentToolsCreate) =>
      fetchApi<AgentTools>(`/api/simplified/agent-tools`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: agentToolsKeys.lists() });
    },
  });
}

export function useAgentToolsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: AgentToolsUpdate & { id: string }) =>
      fetchApi<AgentTools>(`/api/simplified/agent-tools`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: agentToolsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: agentToolsKeys.detail(variables.id),
      });
    },
  });
}

export function useAgentToolsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/agent-tools?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: agentToolsKeys.lists() });
    },
  });
}
