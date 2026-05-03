import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  UserPersonality,
  UserPersonalityCreate,
  UserPersonalityUpdate,
  UserPersonalityFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const userPersonalityKeys = {
  all: ["userPersonality"] as const,
  lists: () => [...userPersonalityKeys.all, "list"] as const,
  list: (filters?: UserPersonalityFilters) => [...userPersonalityKeys.lists(), filters] as const,
  details: () => [...userPersonalityKeys.all, "detail"] as const,
  detail: (id: string) => [...userPersonalityKeys.details(), id] as const,
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

export function useUserPersonalityList(filters?: UserPersonalityFilters) {
  return useQuery({
    queryKey: userPersonalityKeys.list(filters),
    queryFn: () =>
      fetchApi<UserPersonality[]>(`/api/simplified/user-personality${buildQueryString(filters)}`),
  });
}

export function useUserPersonality(id: string) {
  return useQuery({
    queryKey: userPersonalityKeys.detail(id),
    queryFn: () =>
      fetchApi<UserPersonality>(`/api/simplified/user-personality?id=${id}`),
    enabled: !!id,
  });
}

export function useUserPersonalityCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UserPersonalityCreate) =>
      fetchApi<UserPersonality>(`/api/simplified/user-personality`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userPersonalityKeys.lists() });
    },
  });
}

export function useUserPersonalityUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: UserPersonalityUpdate & { id: string }) =>
      fetchApi<UserPersonality>(`/api/simplified/user-personality`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: userPersonalityKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: userPersonalityKeys.detail(variables.id),
      });
    },
  });
}

export function useUserPersonalityDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/user-personality?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userPersonalityKeys.lists() });
    },
  });
}
