import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  AiLabConversations,
  AiLabConversationsCreate,
  AiLabConversationsUpdate,
  AiLabConversationsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const aiLabConversationsKeys = {
  all: ["aiLabConversations"] as const,
  lists: () => [...aiLabConversationsKeys.all, "list"] as const,
  list: (filters?: AiLabConversationsFilters) => [...aiLabConversationsKeys.lists(), filters] as const,
  details: () => [...aiLabConversationsKeys.all, "detail"] as const,
  detail: (id: string) => [...aiLabConversationsKeys.details(), id] as const,
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

export function useAiLabConversationsList(filters?: AiLabConversationsFilters) {
  return useQuery({
    queryKey: aiLabConversationsKeys.list(filters),
    queryFn: () =>
      fetchApi<AiLabConversations[]>(`/api/simplified/ai-lab-conversations${buildQueryString(filters)}`),
  });
}

export function useAiLabConversations(id: string) {
  return useQuery({
    queryKey: aiLabConversationsKeys.detail(id),
    queryFn: () =>
      fetchApi<AiLabConversations>(`/api/simplified/ai-lab-conversations?id=${id}`),
    enabled: !!id,
  });
}

export function useAiLabConversationsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AiLabConversationsCreate) =>
      fetchApi<AiLabConversations>(`/api/simplified/ai-lab-conversations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: aiLabConversationsKeys.lists() });
    },
  });
}

export function useAiLabConversationsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: AiLabConversationsUpdate & { id: string }) =>
      fetchApi<AiLabConversations>(`/api/simplified/ai-lab-conversations`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: aiLabConversationsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: aiLabConversationsKeys.detail(variables.id),
      });
    },
  });
}

export function useAiLabConversationsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/ai-lab-conversations?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: aiLabConversationsKeys.lists() });
    },
  });
}
