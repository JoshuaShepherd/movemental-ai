import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  Comments,
  CommentsCreate,
  CommentsUpdate,
  CommentsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const commentsKeys = {
  all: ["comments"] as const,
  lists: () => [...commentsKeys.all, "list"] as const,
  list: (filters?: CommentsFilters) => [...commentsKeys.lists(), filters] as const,
  details: () => [...commentsKeys.all, "detail"] as const,
  detail: (id: string) => [...commentsKeys.details(), id] as const,
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

export function useCommentsList(filters?: CommentsFilters) {
  return useQuery({
    queryKey: commentsKeys.list(filters),
    queryFn: () =>
      fetchApi<Comments[]>(`/api/simplified/comments${buildQueryString(filters)}`),
  });
}

export function useComments(id: string) {
  return useQuery({
    queryKey: commentsKeys.detail(id),
    queryFn: () =>
      fetchApi<Comments>(`/api/simplified/comments?id=${id}`),
    enabled: !!id,
  });
}

export function useCommentsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CommentsCreate) =>
      fetchApi<Comments>(`/api/simplified/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentsKeys.lists() });
    },
  });
}

export function useCommentsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: CommentsUpdate & { id: string }) =>
      fetchApi<Comments>(`/api/simplified/comments`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: commentsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: commentsKeys.detail(variables.id),
      });
    },
  });
}

export function useCommentsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/comments?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentsKeys.lists() });
    },
  });
}
