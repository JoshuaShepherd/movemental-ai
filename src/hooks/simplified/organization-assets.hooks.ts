import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  OrganizationAssets,
  OrganizationAssetsCreate,
  OrganizationAssetsUpdate,
  OrganizationAssetsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const organizationAssetsKeys = {
  all: ["organizationAssets"] as const,
  lists: () => [...organizationAssetsKeys.all, "list"] as const,
  list: (filters?: OrganizationAssetsFilters) => [...organizationAssetsKeys.lists(), filters] as const,
  details: () => [...organizationAssetsKeys.all, "detail"] as const,
  detail: (id: string) => [...organizationAssetsKeys.details(), id] as const,
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

export function useOrganizationAssetsList(filters?: OrganizationAssetsFilters) {
  return useQuery({
    queryKey: organizationAssetsKeys.list(filters),
    queryFn: () =>
      fetchApi<OrganizationAssets[]>(`/api/simplified/organization-assets${buildQueryString(filters)}`),
  });
}

export function useOrganizationAssets(id: string) {
  return useQuery({
    queryKey: organizationAssetsKeys.detail(id),
    queryFn: () =>
      fetchApi<OrganizationAssets>(`/api/simplified/organization-assets?id=${id}`),
    enabled: !!id,
  });
}

export function useOrganizationAssetsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: OrganizationAssetsCreate) =>
      fetchApi<OrganizationAssets>(`/api/simplified/organization-assets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: organizationAssetsKeys.lists() });
    },
  });
}

export function useOrganizationAssetsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: OrganizationAssetsUpdate & { id: string }) =>
      fetchApi<OrganizationAssets>(`/api/simplified/organization-assets`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: organizationAssetsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: organizationAssetsKeys.detail(variables.id),
      });
    },
  });
}

export function useOrganizationAssetsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/organization-assets?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: organizationAssetsKeys.lists() });
    },
  });
}
