import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  UserContextProfiles,
  UserContextProfilesCreate,
  UserContextProfilesUpdate,
  UserContextProfilesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const userContextProfilesKeys = {
  all: ["userContextProfiles"] as const,
  lists: () => [...userContextProfilesKeys.all, "list"] as const,
  list: (filters?: UserContextProfilesFilters) => [...userContextProfilesKeys.lists(), filters] as const,
  details: () => [...userContextProfilesKeys.all, "detail"] as const,
  detail: (id: string) => [...userContextProfilesKeys.details(), id] as const,
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

export function useUserContextProfilesList(filters?: UserContextProfilesFilters) {
  return useQuery({
    queryKey: userContextProfilesKeys.list(filters),
    queryFn: () =>
      fetchApi<UserContextProfiles[]>(`/api/simplified/user-context-profiles${buildQueryString(filters)}`),
  });
}

export function useUserContextProfiles(id: string) {
  return useQuery({
    queryKey: userContextProfilesKeys.detail(id),
    queryFn: () =>
      fetchApi<UserContextProfiles>(`/api/simplified/user-context-profiles?id=${id}`),
    enabled: !!id,
  });
}

export function useUserContextProfilesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UserContextProfilesCreate) =>
      fetchApi<UserContextProfiles>(`/api/simplified/user-context-profiles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userContextProfilesKeys.lists() });
    },
  });
}

export function useUserContextProfilesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: UserContextProfilesUpdate & { id: string }) =>
      fetchApi<UserContextProfiles>(`/api/simplified/user-context-profiles`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: userContextProfilesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: userContextProfilesKeys.detail(variables.id),
      });
    },
  });
}

export function useUserContextProfilesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/user-context-profiles?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userContextProfilesKeys.lists() });
    },
  });
}
