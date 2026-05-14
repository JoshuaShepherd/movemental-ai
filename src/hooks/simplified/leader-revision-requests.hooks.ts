import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  LeaderRevisionRequests,
  LeaderRevisionRequestsCreate,
  LeaderRevisionRequestsUpdate,
  LeaderRevisionRequestsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const leaderRevisionRequestsKeys = {
  all: ["leaderRevisionRequests"] as const,
  lists: () => [...leaderRevisionRequestsKeys.all, "list"] as const,
  list: (filters?: LeaderRevisionRequestsFilters) => [...leaderRevisionRequestsKeys.lists(), filters] as const,
  details: () => [...leaderRevisionRequestsKeys.all, "detail"] as const,
  detail: (id: string) => [...leaderRevisionRequestsKeys.details(), id] as const,
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

export function useLeaderRevisionRequestsList(filters?: LeaderRevisionRequestsFilters) {
  return useQuery({
    queryKey: leaderRevisionRequestsKeys.list(filters),
    queryFn: () =>
      fetchApi<LeaderRevisionRequests[]>(`/api/simplified/leader-revision-requests${buildQueryString(filters)}`),
  });
}

export function useLeaderRevisionRequests(id: string) {
  return useQuery({
    queryKey: leaderRevisionRequestsKeys.detail(id),
    queryFn: () =>
      fetchApi<LeaderRevisionRequests>(`/api/simplified/leader-revision-requests?id=${id}`),
    enabled: !!id,
  });
}

export function useLeaderRevisionRequestsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: LeaderRevisionRequestsCreate) =>
      fetchApi<LeaderRevisionRequests>(`/api/simplified/leader-revision-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: leaderRevisionRequestsKeys.lists() });
    },
  });
}

export function useLeaderRevisionRequestsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: LeaderRevisionRequestsUpdate & { id: string }) =>
      fetchApi<LeaderRevisionRequests>(`/api/simplified/leader-revision-requests`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: leaderRevisionRequestsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: leaderRevisionRequestsKeys.detail(variables.id),
      });
    },
  });
}

export function useLeaderRevisionRequestsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/leader-revision-requests?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: leaderRevisionRequestsKeys.lists() });
    },
  });
}
