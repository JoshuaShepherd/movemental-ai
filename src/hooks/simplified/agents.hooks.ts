import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  Agents,
  AgentsCreate,
  AgentsUpdate,
  AgentsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const agentsKeys = {
  all: ["agents"] as const,
  lists: () => [...agentsKeys.all, "list"] as const,
  list: (filters?: AgentsFilters) => [...agentsKeys.lists(), filters] as const,
  details: () => [...agentsKeys.all, "detail"] as const,
  detail: (id: string) => [...agentsKeys.details(), id] as const,
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

export function useAgentsList(filters?: AgentsFilters) {
  return useQuery({
    queryKey: agentsKeys.list(filters),
    queryFn: () =>
      fetchApi<Agents[]>(`/api/simplified/agents${buildQueryString(filters)}`),
  });
}

export function useAgents(id: string) {
  return useQuery({
    queryKey: agentsKeys.detail(id),
    queryFn: () =>
      fetchApi<Agents>(`/api/simplified/agents?id=${id}`),
    enabled: !!id,
  });
}

export function useAgentsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AgentsCreate) =>
      fetchApi<Agents>(`/api/simplified/agents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: agentsKeys.lists() });
    },
  });
}

export function useAgentsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: AgentsUpdate & { id: string }) =>
      fetchApi<Agents>(`/api/simplified/agents`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: agentsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: agentsKeys.detail(variables.id),
      });
    },
  });
}

export function useAgentsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/agents?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: agentsKeys.lists() });
    },
  });
}
