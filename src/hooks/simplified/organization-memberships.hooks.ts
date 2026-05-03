import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  OrganizationMemberships,
  OrganizationMembershipsCreate,
  OrganizationMembershipsUpdate,
  OrganizationMembershipsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const organizationMembershipsKeys = {
  all: ["organizationMemberships"] as const,
  lists: () => [...organizationMembershipsKeys.all, "list"] as const,
  list: (filters?: OrganizationMembershipsFilters) => [...organizationMembershipsKeys.lists(), filters] as const,
  details: () => [...organizationMembershipsKeys.all, "detail"] as const,
  detail: (id: string) => [...organizationMembershipsKeys.details(), id] as const,
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

export function useOrganizationMembershipsList(filters?: OrganizationMembershipsFilters) {
  return useQuery({
    queryKey: organizationMembershipsKeys.list(filters),
    queryFn: () =>
      fetchApi<OrganizationMemberships[]>(`/api/simplified/organization-memberships${buildQueryString(filters)}`),
  });
}

export function useOrganizationMemberships(id: string) {
  return useQuery({
    queryKey: organizationMembershipsKeys.detail(id),
    queryFn: () =>
      fetchApi<OrganizationMemberships>(`/api/simplified/organization-memberships?id=${id}`),
    enabled: !!id,
  });
}

export function useOrganizationMembershipsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: OrganizationMembershipsCreate) =>
      fetchApi<OrganizationMemberships>(`/api/simplified/organization-memberships`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: organizationMembershipsKeys.lists() });
    },
  });
}

export function useOrganizationMembershipsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: OrganizationMembershipsUpdate & { id: string }) =>
      fetchApi<OrganizationMemberships>(`/api/simplified/organization-memberships`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: organizationMembershipsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: organizationMembershipsKeys.detail(variables.id),
      });
    },
  });
}

export function useOrganizationMembershipsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/organization-memberships?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: organizationMembershipsKeys.lists() });
    },
  });
}
