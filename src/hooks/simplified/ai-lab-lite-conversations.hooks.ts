import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  AiLabLiteConversations,
  AiLabLiteConversationsCreate,
  AiLabLiteConversationsUpdate,
  AiLabLiteConversationsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const aiLabLiteConversationsKeys = {
  all: ["aiLabLiteConversations"] as const,
  lists: () => [...aiLabLiteConversationsKeys.all, "list"] as const,
  list: (filters?: AiLabLiteConversationsFilters) => [...aiLabLiteConversationsKeys.lists(), filters] as const,
  details: () => [...aiLabLiteConversationsKeys.all, "detail"] as const,
  detail: (id: string) => [...aiLabLiteConversationsKeys.details(), id] as const,
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

export function useAiLabLiteConversationsList(filters?: AiLabLiteConversationsFilters) {
  return useQuery({
    queryKey: aiLabLiteConversationsKeys.list(filters),
    queryFn: () =>
      fetchApi<AiLabLiteConversations[]>(`/api/simplified/ai-lab-lite-conversations${buildQueryString(filters)}`),
  });
}

export function useAiLabLiteConversations(id: string) {
  return useQuery({
    queryKey: aiLabLiteConversationsKeys.detail(id),
    queryFn: () =>
      fetchApi<AiLabLiteConversations>(`/api/simplified/ai-lab-lite-conversations?id=${id}`),
    enabled: !!id,
  });
}

export function useAiLabLiteConversationsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AiLabLiteConversationsCreate) =>
      fetchApi<AiLabLiteConversations>(`/api/simplified/ai-lab-lite-conversations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: aiLabLiteConversationsKeys.lists() });
    },
  });
}

export function useAiLabLiteConversationsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: AiLabLiteConversationsUpdate & { id: string }) =>
      fetchApi<AiLabLiteConversations>(`/api/simplified/ai-lab-lite-conversations`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: aiLabLiteConversationsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: aiLabLiteConversationsKeys.detail(variables.id),
      });
    },
  });
}

export function useAiLabLiteConversationsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/ai-lab-lite-conversations?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: aiLabLiteConversationsKeys.lists() });
    },
  });
}
