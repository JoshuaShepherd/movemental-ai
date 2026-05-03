import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  UserStrengths,
  UserStrengthsCreate,
  UserStrengthsUpdate,
  UserStrengthsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const userStrengthsKeys = {
  all: ["userStrengths"] as const,
  lists: () => [...userStrengthsKeys.all, "list"] as const,
  list: (filters?: UserStrengthsFilters) => [...userStrengthsKeys.lists(), filters] as const,
  details: () => [...userStrengthsKeys.all, "detail"] as const,
  detail: (id: string) => [...userStrengthsKeys.details(), id] as const,
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

export function useUserStrengthsList(filters?: UserStrengthsFilters) {
  return useQuery({
    queryKey: userStrengthsKeys.list(filters),
    queryFn: () =>
      fetchApi<UserStrengths[]>(`/api/simplified/user-strengths${buildQueryString(filters)}`),
  });
}

export function useUserStrengths(id: string) {
  return useQuery({
    queryKey: userStrengthsKeys.detail(id),
    queryFn: () =>
      fetchApi<UserStrengths>(`/api/simplified/user-strengths?id=${id}`),
    enabled: !!id,
  });
}

export function useUserStrengthsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UserStrengthsCreate) =>
      fetchApi<UserStrengths>(`/api/simplified/user-strengths`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userStrengthsKeys.lists() });
    },
  });
}

export function useUserStrengthsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: UserStrengthsUpdate & { id: string }) =>
      fetchApi<UserStrengths>(`/api/simplified/user-strengths`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: userStrengthsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: userStrengthsKeys.detail(variables.id),
      });
    },
  });
}

export function useUserStrengthsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/user-strengths?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userStrengthsKeys.lists() });
    },
  });
}
