import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  DiscussionPrompts,
  DiscussionPromptsCreate,
  DiscussionPromptsUpdate,
  DiscussionPromptsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const discussionPromptsKeys = {
  all: ["discussionPrompts"] as const,
  lists: () => [...discussionPromptsKeys.all, "list"] as const,
  list: (filters?: DiscussionPromptsFilters) => [...discussionPromptsKeys.lists(), filters] as const,
  details: () => [...discussionPromptsKeys.all, "detail"] as const,
  detail: (id: string) => [...discussionPromptsKeys.details(), id] as const,
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

export function useDiscussionPromptsList(filters?: DiscussionPromptsFilters) {
  return useQuery({
    queryKey: discussionPromptsKeys.list(filters),
    queryFn: () =>
      fetchApi<DiscussionPrompts[]>(`/api/simplified/discussion-prompts${buildQueryString(filters)}`),
  });
}

export function useDiscussionPrompts(id: string) {
  return useQuery({
    queryKey: discussionPromptsKeys.detail(id),
    queryFn: () =>
      fetchApi<DiscussionPrompts>(`/api/simplified/discussion-prompts?id=${id}`),
    enabled: !!id,
  });
}

export function useDiscussionPromptsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: DiscussionPromptsCreate) =>
      fetchApi<DiscussionPrompts>(`/api/simplified/discussion-prompts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: discussionPromptsKeys.lists() });
    },
  });
}

export function useDiscussionPromptsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: DiscussionPromptsUpdate & { id: string }) =>
      fetchApi<DiscussionPrompts>(`/api/simplified/discussion-prompts`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: discussionPromptsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: discussionPromptsKeys.detail(variables.id),
      });
    },
  });
}

export function useDiscussionPromptsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/discussion-prompts?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: discussionPromptsKeys.lists() });
    },
  });
}
