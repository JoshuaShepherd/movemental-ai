import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  UserIdentityProfiles,
  UserIdentityProfilesCreate,
  UserIdentityProfilesUpdate,
  UserIdentityProfilesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const userIdentityProfilesKeys = {
  all: ["userIdentityProfiles"] as const,
  lists: () => [...userIdentityProfilesKeys.all, "list"] as const,
  list: (filters?: UserIdentityProfilesFilters) => [...userIdentityProfilesKeys.lists(), filters] as const,
  details: () => [...userIdentityProfilesKeys.all, "detail"] as const,
  detail: (id: string) => [...userIdentityProfilesKeys.details(), id] as const,
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

export function useUserIdentityProfilesList(filters?: UserIdentityProfilesFilters) {
  return useQuery({
    queryKey: userIdentityProfilesKeys.list(filters),
    queryFn: () =>
      fetchApi<UserIdentityProfiles[]>(`/api/simplified/user-identity-profiles${buildQueryString(filters)}`),
  });
}

export function useUserIdentityProfiles(id: string) {
  return useQuery({
    queryKey: userIdentityProfilesKeys.detail(id),
    queryFn: () =>
      fetchApi<UserIdentityProfiles>(`/api/simplified/user-identity-profiles?id=${id}`),
    enabled: !!id,
  });
}

export function useUserIdentityProfilesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UserIdentityProfilesCreate) =>
      fetchApi<UserIdentityProfiles>(`/api/simplified/user-identity-profiles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userIdentityProfilesKeys.lists() });
    },
  });
}

export function useUserIdentityProfilesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: UserIdentityProfilesUpdate & { id: string }) =>
      fetchApi<UserIdentityProfiles>(`/api/simplified/user-identity-profiles`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: userIdentityProfilesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: userIdentityProfilesKeys.detail(variables.id),
      });
    },
  });
}

export function useUserIdentityProfilesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/user-identity-profiles?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userIdentityProfilesKeys.lists() });
    },
  });
}
