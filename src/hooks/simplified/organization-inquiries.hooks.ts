import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  OrganizationInquiries,
  OrganizationInquiriesCreate,
  OrganizationInquiriesUpdate,
  OrganizationInquiriesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const organizationInquiriesKeys = {
  all: ["organizationInquiries"] as const,
  lists: () => [...organizationInquiriesKeys.all, "list"] as const,
  list: (filters?: OrganizationInquiriesFilters) => [...organizationInquiriesKeys.lists(), filters] as const,
  details: () => [...organizationInquiriesKeys.all, "detail"] as const,
  detail: (id: string) => [...organizationInquiriesKeys.details(), id] as const,
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

export function useOrganizationInquiriesList(filters?: OrganizationInquiriesFilters) {
  return useQuery({
    queryKey: organizationInquiriesKeys.list(filters),
    queryFn: () =>
      fetchApi<OrganizationInquiries[]>(`/api/simplified/organization-inquiries${buildQueryString(filters)}`),
  });
}

export function useOrganizationInquiries(id: string) {
  return useQuery({
    queryKey: organizationInquiriesKeys.detail(id),
    queryFn: () =>
      fetchApi<OrganizationInquiries>(`/api/simplified/organization-inquiries?id=${id}`),
    enabled: !!id,
  });
}

export function useOrganizationInquiriesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: OrganizationInquiriesCreate) =>
      fetchApi<OrganizationInquiries>(`/api/simplified/organization-inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: organizationInquiriesKeys.lists() });
    },
  });
}

export function useOrganizationInquiriesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: OrganizationInquiriesUpdate & { id: string }) =>
      fetchApi<OrganizationInquiries>(`/api/simplified/organization-inquiries`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: organizationInquiriesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: organizationInquiriesKeys.detail(variables.id),
      });
    },
  });
}

export function useOrganizationInquiriesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/organization-inquiries?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: organizationInquiriesKeys.lists() });
    },
  });
}
