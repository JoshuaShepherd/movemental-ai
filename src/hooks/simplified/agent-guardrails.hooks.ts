import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  AgentGuardrails,
  AgentGuardrailsCreate,
  AgentGuardrailsUpdate,
  AgentGuardrailsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const agentGuardrailsKeys = {
  all: ["agentGuardrails"] as const,
  lists: () => [...agentGuardrailsKeys.all, "list"] as const,
  list: (filters?: AgentGuardrailsFilters) => [...agentGuardrailsKeys.lists(), filters] as const,
  details: () => [...agentGuardrailsKeys.all, "detail"] as const,
  detail: (id: string) => [...agentGuardrailsKeys.details(), id] as const,
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

export function useAgentGuardrailsList(filters?: AgentGuardrailsFilters) {
  return useQuery({
    queryKey: agentGuardrailsKeys.list(filters),
    queryFn: () =>
      fetchApi<AgentGuardrails[]>(`/api/simplified/agent-guardrails${buildQueryString(filters)}`),
  });
}

export function useAgentGuardrails(id: string) {
  return useQuery({
    queryKey: agentGuardrailsKeys.detail(id),
    queryFn: () =>
      fetchApi<AgentGuardrails>(`/api/simplified/agent-guardrails?id=${id}`),
    enabled: !!id,
  });
}

export function useAgentGuardrailsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AgentGuardrailsCreate) =>
      fetchApi<AgentGuardrails>(`/api/simplified/agent-guardrails`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: agentGuardrailsKeys.lists() });
    },
  });
}

export function useAgentGuardrailsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: AgentGuardrailsUpdate & { id: string }) =>
      fetchApi<AgentGuardrails>(`/api/simplified/agent-guardrails`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: agentGuardrailsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: agentGuardrailsKeys.detail(variables.id),
      });
    },
  });
}

export function useAgentGuardrailsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/agent-guardrails?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: agentGuardrailsKeys.lists() });
    },
  });
}
