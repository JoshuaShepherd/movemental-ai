import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  AgentRoomLeads,
  AgentRoomLeadsCreate,
  AgentRoomLeadsUpdate,
  AgentRoomLeadsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const agentRoomLeadsKeys = {
  all: ["agentRoomLeads"] as const,
  lists: () => [...agentRoomLeadsKeys.all, "list"] as const,
  list: (filters?: AgentRoomLeadsFilters) => [...agentRoomLeadsKeys.lists(), filters] as const,
  details: () => [...agentRoomLeadsKeys.all, "detail"] as const,
  detail: (id: string) => [...agentRoomLeadsKeys.details(), id] as const,
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

export function useAgentRoomLeadsList(filters?: AgentRoomLeadsFilters) {
  return useQuery({
    queryKey: agentRoomLeadsKeys.list(filters),
    queryFn: () =>
      fetchApi<AgentRoomLeads[]>(`/api/simplified/agent-room-leads${buildQueryString(filters)}`),
  });
}

export function useAgentRoomLeads(id: string) {
  return useQuery({
    queryKey: agentRoomLeadsKeys.detail(id),
    queryFn: () =>
      fetchApi<AgentRoomLeads>(`/api/simplified/agent-room-leads?id=${id}`),
    enabled: !!id,
  });
}

export function useAgentRoomLeadsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AgentRoomLeadsCreate) =>
      fetchApi<AgentRoomLeads>(`/api/simplified/agent-room-leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: agentRoomLeadsKeys.lists() });
    },
  });
}

export function useAgentRoomLeadsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: AgentRoomLeadsUpdate & { id: string }) =>
      fetchApi<AgentRoomLeads>(`/api/simplified/agent-room-leads`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: agentRoomLeadsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: agentRoomLeadsKeys.detail(variables.id),
      });
    },
  });
}

export function useAgentRoomLeadsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/agent-room-leads?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: agentRoomLeadsKeys.lists() });
    },
  });
}
