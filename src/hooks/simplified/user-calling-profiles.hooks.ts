import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  UserCallingProfiles,
  UserCallingProfilesCreate,
  UserCallingProfilesUpdate,
  UserCallingProfilesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const userCallingProfilesKeys = {
  all: ["userCallingProfiles"] as const,
  lists: () => [...userCallingProfilesKeys.all, "list"] as const,
  list: (filters?: UserCallingProfilesFilters) => [...userCallingProfilesKeys.lists(), filters] as const,
  details: () => [...userCallingProfilesKeys.all, "detail"] as const,
  detail: (id: string) => [...userCallingProfilesKeys.details(), id] as const,
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

export function useUserCallingProfilesList(filters?: UserCallingProfilesFilters) {
  return useQuery({
    queryKey: userCallingProfilesKeys.list(filters),
    queryFn: () =>
      fetchApi<UserCallingProfiles[]>(`/api/simplified/user-calling-profiles${buildQueryString(filters)}`),
  });
}

export function useUserCallingProfiles(id: string) {
  return useQuery({
    queryKey: userCallingProfilesKeys.detail(id),
    queryFn: () =>
      fetchApi<UserCallingProfiles>(`/api/simplified/user-calling-profiles?id=${id}`),
    enabled: !!id,
  });
}

export function useUserCallingProfilesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UserCallingProfilesCreate) =>
      fetchApi<UserCallingProfiles>(`/api/simplified/user-calling-profiles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userCallingProfilesKeys.lists() });
    },
  });
}

export function useUserCallingProfilesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: UserCallingProfilesUpdate & { id: string }) =>
      fetchApi<UserCallingProfiles>(`/api/simplified/user-calling-profiles`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: userCallingProfilesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: userCallingProfilesKeys.detail(variables.id),
      });
    },
  });
}

export function useUserCallingProfilesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/user-calling-profiles?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userCallingProfilesKeys.lists() });
    },
  });
}
