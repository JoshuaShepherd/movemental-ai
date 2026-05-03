import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  Organizations,
  OrganizationsCreate,
  OrganizationsUpdate,
  OrganizationsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const organizationsKeys = {
  all: ["organizations"] as const,
  lists: () => [...organizationsKeys.all, "list"] as const,
  list: (filters?: OrganizationsFilters) => [...organizationsKeys.lists(), filters] as const,
  details: () => [...organizationsKeys.all, "detail"] as const,
  detail: (id: string) => [...organizationsKeys.details(), id] as const,
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

export function useOrganizationsList(filters?: OrganizationsFilters) {
  return useQuery({
    queryKey: organizationsKeys.list(filters),
    queryFn: () =>
      fetchApi<Organizations[]>(`/api/simplified/organizations${buildQueryString(filters)}`),
  });
}

export function useOrganizations(id: string) {
  return useQuery({
    queryKey: organizationsKeys.detail(id),
    queryFn: () =>
      fetchApi<Organizations>(`/api/simplified/organizations?id=${id}`),
    enabled: !!id,
  });
}

export function useOrganizationsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: OrganizationsCreate) =>
      fetchApi<Organizations>(`/api/simplified/organizations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: organizationsKeys.lists() });
    },
  });
}

export function useOrganizationsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: OrganizationsUpdate & { id: string }) =>
      fetchApi<Organizations>(`/api/simplified/organizations`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: organizationsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: organizationsKeys.detail(variables.id),
      });
    },
  });
}

export function useOrganizationsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/organizations?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: organizationsKeys.lists() });
    },
  });
}
