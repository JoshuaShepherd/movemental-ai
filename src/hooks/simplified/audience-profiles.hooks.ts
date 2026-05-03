import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  AudienceProfiles,
  AudienceProfilesCreate,
  AudienceProfilesUpdate,
  AudienceProfilesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const audienceProfilesKeys = {
  all: ["audienceProfiles"] as const,
  lists: () => [...audienceProfilesKeys.all, "list"] as const,
  list: (filters?: AudienceProfilesFilters) => [...audienceProfilesKeys.lists(), filters] as const,
  details: () => [...audienceProfilesKeys.all, "detail"] as const,
  detail: (id: string) => [...audienceProfilesKeys.details(), id] as const,
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

export function useAudienceProfilesList(filters?: AudienceProfilesFilters) {
  return useQuery({
    queryKey: audienceProfilesKeys.list(filters),
    queryFn: () =>
      fetchApi<AudienceProfiles[]>(`/api/simplified/audience-profiles${buildQueryString(filters)}`),
  });
}

export function useAudienceProfiles(id: string) {
  return useQuery({
    queryKey: audienceProfilesKeys.detail(id),
    queryFn: () =>
      fetchApi<AudienceProfiles>(`/api/simplified/audience-profiles?id=${id}`),
    enabled: !!id,
  });
}

export function useAudienceProfilesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AudienceProfilesCreate) =>
      fetchApi<AudienceProfiles>(`/api/simplified/audience-profiles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: audienceProfilesKeys.lists() });
    },
  });
}

export function useAudienceProfilesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: AudienceProfilesUpdate & { id: string }) =>
      fetchApi<AudienceProfiles>(`/api/simplified/audience-profiles`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: audienceProfilesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: audienceProfilesKeys.detail(variables.id),
      });
    },
  });
}

export function useAudienceProfilesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/audience-profiles?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: audienceProfilesKeys.lists() });
    },
  });
}
