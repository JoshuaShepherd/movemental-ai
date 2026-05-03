import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  UserInterests,
  UserInterestsCreate,
  UserInterestsUpdate,
  UserInterestsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const userInterestsKeys = {
  all: ["userInterests"] as const,
  lists: () => [...userInterestsKeys.all, "list"] as const,
  list: (filters?: UserInterestsFilters) => [...userInterestsKeys.lists(), filters] as const,
  details: () => [...userInterestsKeys.all, "detail"] as const,
  detail: (id: string) => [...userInterestsKeys.details(), id] as const,
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

export function useUserInterestsList(filters?: UserInterestsFilters) {
  return useQuery({
    queryKey: userInterestsKeys.list(filters),
    queryFn: () =>
      fetchApi<UserInterests[]>(`/api/simplified/user-interests${buildQueryString(filters)}`),
  });
}

export function useUserInterests(id: string) {
  return useQuery({
    queryKey: userInterestsKeys.detail(id),
    queryFn: () =>
      fetchApi<UserInterests>(`/api/simplified/user-interests?id=${id}`),
    enabled: !!id,
  });
}

export function useUserInterestsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UserInterestsCreate) =>
      fetchApi<UserInterests>(`/api/simplified/user-interests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userInterestsKeys.lists() });
    },
  });
}

export function useUserInterestsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: UserInterestsUpdate & { id: string }) =>
      fetchApi<UserInterests>(`/api/simplified/user-interests`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: userInterestsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: userInterestsKeys.detail(variables.id),
      });
    },
  });
}

export function useUserInterestsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/user-interests?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userInterestsKeys.lists() });
    },
  });
}
