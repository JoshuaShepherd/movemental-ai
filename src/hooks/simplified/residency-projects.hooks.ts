import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  ResidencyProjects,
  ResidencyProjectsCreate,
  ResidencyProjectsUpdate,
  ResidencyProjectsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const residencyProjectsKeys = {
  all: ["residencyProjects"] as const,
  lists: () => [...residencyProjectsKeys.all, "list"] as const,
  list: (filters?: ResidencyProjectsFilters) => [...residencyProjectsKeys.lists(), filters] as const,
  details: () => [...residencyProjectsKeys.all, "detail"] as const,
  detail: (id: string) => [...residencyProjectsKeys.details(), id] as const,
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

export function useResidencyProjectsList(filters?: ResidencyProjectsFilters) {
  return useQuery({
    queryKey: residencyProjectsKeys.list(filters),
    queryFn: () =>
      fetchApi<ResidencyProjects[]>(`/api/simplified/residency-projects${buildQueryString(filters)}`),
  });
}

export function useResidencyProjects(id: string) {
  return useQuery({
    queryKey: residencyProjectsKeys.detail(id),
    queryFn: () =>
      fetchApi<ResidencyProjects>(`/api/simplified/residency-projects?id=${id}`),
    enabled: !!id,
  });
}

export function useResidencyProjectsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ResidencyProjectsCreate) =>
      fetchApi<ResidencyProjects>(`/api/simplified/residency-projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: residencyProjectsKeys.lists() });
    },
  });
}

export function useResidencyProjectsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: ResidencyProjectsUpdate & { id: string }) =>
      fetchApi<ResidencyProjects>(`/api/simplified/residency-projects`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: residencyProjectsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: residencyProjectsKeys.detail(variables.id),
      });
    },
  });
}

export function useResidencyProjectsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/residency-projects?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: residencyProjectsKeys.lists() });
    },
  });
}
