import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  NotebookConversations,
  NotebookConversationsCreate,
  NotebookConversationsUpdate,
  NotebookConversationsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const notebookConversationsKeys = {
  all: ["notebookConversations"] as const,
  lists: () => [...notebookConversationsKeys.all, "list"] as const,
  list: (filters?: NotebookConversationsFilters) => [...notebookConversationsKeys.lists(), filters] as const,
  details: () => [...notebookConversationsKeys.all, "detail"] as const,
  detail: (id: string) => [...notebookConversationsKeys.details(), id] as const,
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

export function useNotebookConversationsList(filters?: NotebookConversationsFilters) {
  return useQuery({
    queryKey: notebookConversationsKeys.list(filters),
    queryFn: () =>
      fetchApi<NotebookConversations[]>(`/api/simplified/notebook-conversations${buildQueryString(filters)}`),
  });
}

export function useNotebookConversations(id: string) {
  return useQuery({
    queryKey: notebookConversationsKeys.detail(id),
    queryFn: () =>
      fetchApi<NotebookConversations>(`/api/simplified/notebook-conversations?id=${id}`),
    enabled: !!id,
  });
}

export function useNotebookConversationsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: NotebookConversationsCreate) =>
      fetchApi<NotebookConversations>(`/api/simplified/notebook-conversations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notebookConversationsKeys.lists() });
    },
  });
}

export function useNotebookConversationsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: NotebookConversationsUpdate & { id: string }) =>
      fetchApi<NotebookConversations>(`/api/simplified/notebook-conversations`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: notebookConversationsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: notebookConversationsKeys.detail(variables.id),
      });
    },
  });
}

export function useNotebookConversationsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/notebook-conversations?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notebookConversationsKeys.lists() });
    },
  });
}
