import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  CohortMembers,
  CohortMembersCreate,
  CohortMembersUpdate,
  CohortMembersFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const cohortMembersKeys = {
  all: ["cohortMembers"] as const,
  lists: () => [...cohortMembersKeys.all, "list"] as const,
  list: (filters?: CohortMembersFilters) => [...cohortMembersKeys.lists(), filters] as const,
  details: () => [...cohortMembersKeys.all, "detail"] as const,
  detail: (id: string) => [...cohortMembersKeys.details(), id] as const,
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

export function useCohortMembersList(filters?: CohortMembersFilters) {
  return useQuery({
    queryKey: cohortMembersKeys.list(filters),
    queryFn: () =>
      fetchApi<CohortMembers[]>(`/api/simplified/cohort-members${buildQueryString(filters)}`),
  });
}

export function useCohortMembers(id: string) {
  return useQuery({
    queryKey: cohortMembersKeys.detail(id),
    queryFn: () =>
      fetchApi<CohortMembers>(`/api/simplified/cohort-members?id=${id}`),
    enabled: !!id,
  });
}

export function useCohortMembersCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CohortMembersCreate) =>
      fetchApi<CohortMembers>(`/api/simplified/cohort-members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cohortMembersKeys.lists() });
    },
  });
}

export function useCohortMembersUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: CohortMembersUpdate & { id: string }) =>
      fetchApi<CohortMembers>(`/api/simplified/cohort-members`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: cohortMembersKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: cohortMembersKeys.detail(variables.id),
      });
    },
  });
}

export function useCohortMembersDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/cohort-members?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cohortMembersKeys.lists() });
    },
  });
}
