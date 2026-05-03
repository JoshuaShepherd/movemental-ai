import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  AgentHandoffs,
  AgentHandoffsCreate,
  AgentHandoffsUpdate,
  AgentHandoffsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const agentHandoffsKeys = {
  all: ["agentHandoffs"] as const,
  lists: () => [...agentHandoffsKeys.all, "list"] as const,
  list: (filters?: AgentHandoffsFilters) => [...agentHandoffsKeys.lists(), filters] as const,
  details: () => [...agentHandoffsKeys.all, "detail"] as const,
  detail: (id: string) => [...agentHandoffsKeys.details(), id] as const,
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

export function useAgentHandoffsList(filters?: AgentHandoffsFilters) {
  return useQuery({
    queryKey: agentHandoffsKeys.list(filters),
    queryFn: () =>
      fetchApi<AgentHandoffs[]>(`/api/simplified/agent-handoffs${buildQueryString(filters)}`),
  });
}

export function useAgentHandoffs(id: string) {
  return useQuery({
    queryKey: agentHandoffsKeys.detail(id),
    queryFn: () =>
      fetchApi<AgentHandoffs>(`/api/simplified/agent-handoffs?id=${id}`),
    enabled: !!id,
  });
}

export function useAgentHandoffsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AgentHandoffsCreate) =>
      fetchApi<AgentHandoffs>(`/api/simplified/agent-handoffs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: agentHandoffsKeys.lists() });
    },
  });
}

export function useAgentHandoffsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: AgentHandoffsUpdate & { id: string }) =>
      fetchApi<AgentHandoffs>(`/api/simplified/agent-handoffs`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: agentHandoffsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: agentHandoffsKeys.detail(variables.id),
      });
    },
  });
}

export function useAgentHandoffsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/agent-handoffs?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: agentHandoffsKeys.lists() });
    },
  });
}
