import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  CohortSessions,
  CohortSessionsCreate,
  CohortSessionsUpdate,
  CohortSessionsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const cohortSessionsKeys = {
  all: ["cohortSessions"] as const,
  lists: () => [...cohortSessionsKeys.all, "list"] as const,
  list: (filters?: CohortSessionsFilters) => [...cohortSessionsKeys.lists(), filters] as const,
  details: () => [...cohortSessionsKeys.all, "detail"] as const,
  detail: (id: string) => [...cohortSessionsKeys.details(), id] as const,
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

export function useCohortSessionsList(filters?: CohortSessionsFilters) {
  return useQuery({
    queryKey: cohortSessionsKeys.list(filters),
    queryFn: () =>
      fetchApi<CohortSessions[]>(`/api/simplified/cohort-sessions${buildQueryString(filters)}`),
  });
}

export function useCohortSessions(id: string) {
  return useQuery({
    queryKey: cohortSessionsKeys.detail(id),
    queryFn: () =>
      fetchApi<CohortSessions>(`/api/simplified/cohort-sessions?id=${id}`),
    enabled: !!id,
  });
}

export function useCohortSessionsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CohortSessionsCreate) =>
      fetchApi<CohortSessions>(`/api/simplified/cohort-sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cohortSessionsKeys.lists() });
    },
  });
}

export function useCohortSessionsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: CohortSessionsUpdate & { id: string }) =>
      fetchApi<CohortSessions>(`/api/simplified/cohort-sessions`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: cohortSessionsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: cohortSessionsKeys.detail(variables.id),
      });
    },
  });
}

export function useCohortSessionsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/cohort-sessions?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cohortSessionsKeys.lists() });
    },
  });
}
