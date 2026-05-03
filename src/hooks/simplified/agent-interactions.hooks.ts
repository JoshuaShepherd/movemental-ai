import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  AgentInteractions,
  AgentInteractionsCreate,
  AgentInteractionsUpdate,
  AgentInteractionsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const agentInteractionsKeys = {
  all: ["agentInteractions"] as const,
  lists: () => [...agentInteractionsKeys.all, "list"] as const,
  list: (filters?: AgentInteractionsFilters) => [...agentInteractionsKeys.lists(), filters] as const,
  details: () => [...agentInteractionsKeys.all, "detail"] as const,
  detail: (id: string) => [...agentInteractionsKeys.details(), id] as const,
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

export function useAgentInteractionsList(filters?: AgentInteractionsFilters) {
  return useQuery({
    queryKey: agentInteractionsKeys.list(filters),
    queryFn: () =>
      fetchApi<AgentInteractions[]>(`/api/simplified/agent-interactions${buildQueryString(filters)}`),
  });
}

export function useAgentInteractions(id: string) {
  return useQuery({
    queryKey: agentInteractionsKeys.detail(id),
    queryFn: () =>
      fetchApi<AgentInteractions>(`/api/simplified/agent-interactions?id=${id}`),
    enabled: !!id,
  });
}

export function useAgentInteractionsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AgentInteractionsCreate) =>
      fetchApi<AgentInteractions>(`/api/simplified/agent-interactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: agentInteractionsKeys.lists() });
    },
  });
}

export function useAgentInteractionsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: AgentInteractionsUpdate & { id: string }) =>
      fetchApi<AgentInteractions>(`/api/simplified/agent-interactions`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: agentInteractionsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: agentInteractionsKeys.detail(variables.id),
      });
    },
  });
}

export function useAgentInteractionsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/agent-interactions?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: agentInteractionsKeys.lists() });
    },
  });
}
