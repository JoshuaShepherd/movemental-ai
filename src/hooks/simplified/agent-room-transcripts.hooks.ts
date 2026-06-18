import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  AgentRoomTranscripts,
  AgentRoomTranscriptsCreate,
  AgentRoomTranscriptsUpdate,
  AgentRoomTranscriptsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const agentRoomTranscriptsKeys = {
  all: ["agentRoomTranscripts"] as const,
  lists: () => [...agentRoomTranscriptsKeys.all, "list"] as const,
  list: (filters?: AgentRoomTranscriptsFilters) => [...agentRoomTranscriptsKeys.lists(), filters] as const,
  details: () => [...agentRoomTranscriptsKeys.all, "detail"] as const,
  detail: (id: string) => [...agentRoomTranscriptsKeys.details(), id] as const,
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

export function useAgentRoomTranscriptsList(filters?: AgentRoomTranscriptsFilters) {
  return useQuery({
    queryKey: agentRoomTranscriptsKeys.list(filters),
    queryFn: () =>
      fetchApi<AgentRoomTranscripts[]>(`/api/simplified/agent-room-transcripts${buildQueryString(filters)}`),
  });
}

export function useAgentRoomTranscripts(id: string) {
  return useQuery({
    queryKey: agentRoomTranscriptsKeys.detail(id),
    queryFn: () =>
      fetchApi<AgentRoomTranscripts>(`/api/simplified/agent-room-transcripts?id=${id}`),
    enabled: !!id,
  });
}

export function useAgentRoomTranscriptsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AgentRoomTranscriptsCreate) =>
      fetchApi<AgentRoomTranscripts>(`/api/simplified/agent-room-transcripts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: agentRoomTranscriptsKeys.lists() });
    },
  });
}

export function useAgentRoomTranscriptsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: AgentRoomTranscriptsUpdate & { id: string }) =>
      fetchApi<AgentRoomTranscripts>(`/api/simplified/agent-room-transcripts`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: agentRoomTranscriptsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: agentRoomTranscriptsKeys.detail(variables.id),
      });
    },
  });
}

export function useAgentRoomTranscriptsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/agent-room-transcripts?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: agentRoomTranscriptsKeys.lists() });
    },
  });
}
