import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  WritingSessionFeedback,
  WritingSessionFeedbackCreate,
  WritingSessionFeedbackUpdate,
  WritingSessionFeedbackFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const writingSessionFeedbackKeys = {
  all: ["writingSessionFeedback"] as const,
  lists: () => [...writingSessionFeedbackKeys.all, "list"] as const,
  list: (filters?: WritingSessionFeedbackFilters) => [...writingSessionFeedbackKeys.lists(), filters] as const,
  details: () => [...writingSessionFeedbackKeys.all, "detail"] as const,
  detail: (id: string) => [...writingSessionFeedbackKeys.details(), id] as const,
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

export function useWritingSessionFeedbackList(filters?: WritingSessionFeedbackFilters) {
  return useQuery({
    queryKey: writingSessionFeedbackKeys.list(filters),
    queryFn: () =>
      fetchApi<WritingSessionFeedback[]>(`/api/simplified/writing-session-feedback${buildQueryString(filters)}`),
  });
}

export function useWritingSessionFeedback(id: string) {
  return useQuery({
    queryKey: writingSessionFeedbackKeys.detail(id),
    queryFn: () =>
      fetchApi<WritingSessionFeedback>(`/api/simplified/writing-session-feedback?id=${id}`),
    enabled: !!id,
  });
}

export function useWritingSessionFeedbackCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: WritingSessionFeedbackCreate) =>
      fetchApi<WritingSessionFeedback>(`/api/simplified/writing-session-feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: writingSessionFeedbackKeys.lists() });
    },
  });
}

export function useWritingSessionFeedbackUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: WritingSessionFeedbackUpdate & { id: string }) =>
      fetchApi<WritingSessionFeedback>(`/api/simplified/writing-session-feedback`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: writingSessionFeedbackKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: writingSessionFeedbackKeys.detail(variables.id),
      });
    },
  });
}

export function useWritingSessionFeedbackDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/writing-session-feedback?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: writingSessionFeedbackKeys.lists() });
    },
  });
}
