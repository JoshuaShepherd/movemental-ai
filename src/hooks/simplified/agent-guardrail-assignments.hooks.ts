import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  AgentGuardrailAssignments,
  AgentGuardrailAssignmentsCreate,
  AgentGuardrailAssignmentsUpdate,
  AgentGuardrailAssignmentsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const agentGuardrailAssignmentsKeys = {
  all: ["agentGuardrailAssignments"] as const,
  lists: () => [...agentGuardrailAssignmentsKeys.all, "list"] as const,
  list: (filters?: AgentGuardrailAssignmentsFilters) => [...agentGuardrailAssignmentsKeys.lists(), filters] as const,
  details: () => [...agentGuardrailAssignmentsKeys.all, "detail"] as const,
  detail: (id: string) => [...agentGuardrailAssignmentsKeys.details(), id] as const,
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

export function useAgentGuardrailAssignmentsList(filters?: AgentGuardrailAssignmentsFilters) {
  return useQuery({
    queryKey: agentGuardrailAssignmentsKeys.list(filters),
    queryFn: () =>
      fetchApi<AgentGuardrailAssignments[]>(`/api/simplified/agent-guardrail-assignments${buildQueryString(filters)}`),
  });
}

export function useAgentGuardrailAssignments(id: string) {
  return useQuery({
    queryKey: agentGuardrailAssignmentsKeys.detail(id),
    queryFn: () =>
      fetchApi<AgentGuardrailAssignments>(`/api/simplified/agent-guardrail-assignments?id=${id}`),
    enabled: !!id,
  });
}

export function useAgentGuardrailAssignmentsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AgentGuardrailAssignmentsCreate) =>
      fetchApi<AgentGuardrailAssignments>(`/api/simplified/agent-guardrail-assignments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: agentGuardrailAssignmentsKeys.lists() });
    },
  });
}

export function useAgentGuardrailAssignmentsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: AgentGuardrailAssignmentsUpdate & { id: string }) =>
      fetchApi<AgentGuardrailAssignments>(`/api/simplified/agent-guardrail-assignments`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: agentGuardrailAssignmentsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: agentGuardrailAssignmentsKeys.detail(variables.id),
      });
    },
  });
}

export function useAgentGuardrailAssignmentsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/agent-guardrail-assignments?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: agentGuardrailAssignmentsKeys.lists() });
    },
  });
}
