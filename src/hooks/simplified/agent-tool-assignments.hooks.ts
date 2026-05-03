import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  AgentToolAssignments,
  AgentToolAssignmentsCreate,
  AgentToolAssignmentsUpdate,
  AgentToolAssignmentsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const agentToolAssignmentsKeys = {
  all: ["agentToolAssignments"] as const,
  lists: () => [...agentToolAssignmentsKeys.all, "list"] as const,
  list: (filters?: AgentToolAssignmentsFilters) => [...agentToolAssignmentsKeys.lists(), filters] as const,
  details: () => [...agentToolAssignmentsKeys.all, "detail"] as const,
  detail: (id: string) => [...agentToolAssignmentsKeys.details(), id] as const,
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

export function useAgentToolAssignmentsList(filters?: AgentToolAssignmentsFilters) {
  return useQuery({
    queryKey: agentToolAssignmentsKeys.list(filters),
    queryFn: () =>
      fetchApi<AgentToolAssignments[]>(`/api/simplified/agent-tool-assignments${buildQueryString(filters)}`),
  });
}

export function useAgentToolAssignments(id: string) {
  return useQuery({
    queryKey: agentToolAssignmentsKeys.detail(id),
    queryFn: () =>
      fetchApi<AgentToolAssignments>(`/api/simplified/agent-tool-assignments?id=${id}`),
    enabled: !!id,
  });
}

export function useAgentToolAssignmentsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AgentToolAssignmentsCreate) =>
      fetchApi<AgentToolAssignments>(`/api/simplified/agent-tool-assignments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: agentToolAssignmentsKeys.lists() });
    },
  });
}

export function useAgentToolAssignmentsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: AgentToolAssignmentsUpdate & { id: string }) =>
      fetchApi<AgentToolAssignments>(`/api/simplified/agent-tool-assignments`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: agentToolAssignmentsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: agentToolAssignmentsKeys.detail(variables.id),
      });
    },
  });
}

export function useAgentToolAssignmentsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/agent-tool-assignments?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: agentToolAssignmentsKeys.lists() });
    },
  });
}
