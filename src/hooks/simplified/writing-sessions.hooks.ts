import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  WritingSessions,
  WritingSessionsCreate,
  WritingSessionsUpdate,
  WritingSessionsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const writingSessionsKeys = {
  all: ["writingSessions"] as const,
  lists: () => [...writingSessionsKeys.all, "list"] as const,
  list: (filters?: WritingSessionsFilters) => [...writingSessionsKeys.lists(), filters] as const,
  details: () => [...writingSessionsKeys.all, "detail"] as const,
  detail: (id: string) => [...writingSessionsKeys.details(), id] as const,
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

export function useWritingSessionsList(filters?: WritingSessionsFilters) {
  return useQuery({
    queryKey: writingSessionsKeys.list(filters),
    queryFn: () =>
      fetchApi<WritingSessions[]>(`/api/simplified/writing-sessions${buildQueryString(filters)}`),
  });
}

export function useWritingSessions(id: string) {
  return useQuery({
    queryKey: writingSessionsKeys.detail(id),
    queryFn: () =>
      fetchApi<WritingSessions>(`/api/simplified/writing-sessions?id=${id}`),
    enabled: !!id,
  });
}

export function useWritingSessionsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: WritingSessionsCreate) =>
      fetchApi<WritingSessions>(`/api/simplified/writing-sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: writingSessionsKeys.lists() });
    },
  });
}

export function useWritingSessionsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: WritingSessionsUpdate & { id: string }) =>
      fetchApi<WritingSessions>(`/api/simplified/writing-sessions`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: writingSessionsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: writingSessionsKeys.detail(variables.id),
      });
    },
  });
}

export function useWritingSessionsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/writing-sessions?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: writingSessionsKeys.lists() });
    },
  });
}
