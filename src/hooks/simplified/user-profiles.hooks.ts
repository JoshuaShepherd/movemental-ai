import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  UserProfiles,
  UserProfilesCreate,
  UserProfilesUpdate,
  UserProfilesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const userProfilesKeys = {
  all: ["userProfiles"] as const,
  lists: () => [...userProfilesKeys.all, "list"] as const,
  list: (filters?: UserProfilesFilters) => [...userProfilesKeys.lists(), filters] as const,
  details: () => [...userProfilesKeys.all, "detail"] as const,
  detail: (id: string) => [...userProfilesKeys.details(), id] as const,
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

export function useUserProfilesList(filters?: UserProfilesFilters) {
  return useQuery({
    queryKey: userProfilesKeys.list(filters),
    queryFn: () =>
      fetchApi<UserProfiles[]>(`/api/simplified/user-profiles${buildQueryString(filters)}`),
  });
}

export function useUserProfiles(id: string) {
  return useQuery({
    queryKey: userProfilesKeys.detail(id),
    queryFn: () =>
      fetchApi<UserProfiles>(`/api/simplified/user-profiles?id=${id}`),
    enabled: !!id,
  });
}

export function useUserProfilesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UserProfilesCreate) =>
      fetchApi<UserProfiles>(`/api/simplified/user-profiles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userProfilesKeys.lists() });
    },
  });
}

export function useUserProfilesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: UserProfilesUpdate & { id: string }) =>
      fetchApi<UserProfiles>(`/api/simplified/user-profiles`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: userProfilesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: userProfilesKeys.detail(variables.id),
      });
    },
  });
}

export function useUserProfilesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/user-profiles?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userProfilesKeys.lists() });
    },
  });
}
