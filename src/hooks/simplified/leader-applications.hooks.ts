import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  LeaderApplications,
  LeaderApplicationsCreate,
  LeaderApplicationsUpdate,
  LeaderApplicationsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const leaderApplicationsKeys = {
  all: ["leaderApplications"] as const,
  lists: () => [...leaderApplicationsKeys.all, "list"] as const,
  list: (filters?: LeaderApplicationsFilters) => [...leaderApplicationsKeys.lists(), filters] as const,
  details: () => [...leaderApplicationsKeys.all, "detail"] as const,
  detail: (id: string) => [...leaderApplicationsKeys.details(), id] as const,
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

export function useLeaderApplicationsList(filters?: LeaderApplicationsFilters) {
  return useQuery({
    queryKey: leaderApplicationsKeys.list(filters),
    queryFn: () =>
      fetchApi<LeaderApplications[]>(`/api/simplified/leader-applications${buildQueryString(filters)}`),
  });
}

export function useLeaderApplications(id: string) {
  return useQuery({
    queryKey: leaderApplicationsKeys.detail(id),
    queryFn: () =>
      fetchApi<LeaderApplications>(`/api/simplified/leader-applications?id=${id}`),
    enabled: !!id,
  });
}

export function useLeaderApplicationsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: LeaderApplicationsCreate) =>
      fetchApi<LeaderApplications>(`/api/simplified/leader-applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: leaderApplicationsKeys.lists() });
    },
  });
}

export function useLeaderApplicationsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: LeaderApplicationsUpdate & { id: string }) =>
      fetchApi<LeaderApplications>(`/api/simplified/leader-applications`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: leaderApplicationsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: leaderApplicationsKeys.detail(variables.id),
      });
    },
  });
}

export function useLeaderApplicationsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/leader-applications?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: leaderApplicationsKeys.lists() });
    },
  });
}
