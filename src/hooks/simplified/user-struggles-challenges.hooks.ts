import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  UserStrugglesChallenges,
  UserStrugglesChallengesCreate,
  UserStrugglesChallengesUpdate,
  UserStrugglesChallengesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const userStrugglesChallengesKeys = {
  all: ["userStrugglesChallenges"] as const,
  lists: () => [...userStrugglesChallengesKeys.all, "list"] as const,
  list: (filters?: UserStrugglesChallengesFilters) => [...userStrugglesChallengesKeys.lists(), filters] as const,
  details: () => [...userStrugglesChallengesKeys.all, "detail"] as const,
  detail: (id: string) => [...userStrugglesChallengesKeys.details(), id] as const,
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

export function useUserStrugglesChallengesList(filters?: UserStrugglesChallengesFilters) {
  return useQuery({
    queryKey: userStrugglesChallengesKeys.list(filters),
    queryFn: () =>
      fetchApi<UserStrugglesChallenges[]>(`/api/simplified/user-struggles-challenges${buildQueryString(filters)}`),
  });
}

export function useUserStrugglesChallenges(id: string) {
  return useQuery({
    queryKey: userStrugglesChallengesKeys.detail(id),
    queryFn: () =>
      fetchApi<UserStrugglesChallenges>(`/api/simplified/user-struggles-challenges?id=${id}`),
    enabled: !!id,
  });
}

export function useUserStrugglesChallengesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UserStrugglesChallengesCreate) =>
      fetchApi<UserStrugglesChallenges>(`/api/simplified/user-struggles-challenges`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userStrugglesChallengesKeys.lists() });
    },
  });
}

export function useUserStrugglesChallengesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: UserStrugglesChallengesUpdate & { id: string }) =>
      fetchApi<UserStrugglesChallenges>(`/api/simplified/user-struggles-challenges`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: userStrugglesChallengesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: userStrugglesChallengesKeys.detail(variables.id),
      });
    },
  });
}

export function useUserStrugglesChallengesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/user-struggles-challenges?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userStrugglesChallengesKeys.lists() });
    },
  });
}
