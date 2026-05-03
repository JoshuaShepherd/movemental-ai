import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  UserAssessments,
  UserAssessmentsCreate,
  UserAssessmentsUpdate,
  UserAssessmentsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const userAssessmentsKeys = {
  all: ["userAssessments"] as const,
  lists: () => [...userAssessmentsKeys.all, "list"] as const,
  list: (filters?: UserAssessmentsFilters) => [...userAssessmentsKeys.lists(), filters] as const,
  details: () => [...userAssessmentsKeys.all, "detail"] as const,
  detail: (id: string) => [...userAssessmentsKeys.details(), id] as const,
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

export function useUserAssessmentsList(filters?: UserAssessmentsFilters) {
  return useQuery({
    queryKey: userAssessmentsKeys.list(filters),
    queryFn: () =>
      fetchApi<UserAssessments[]>(`/api/simplified/user-assessments${buildQueryString(filters)}`),
  });
}

export function useUserAssessments(id: string) {
  return useQuery({
    queryKey: userAssessmentsKeys.detail(id),
    queryFn: () =>
      fetchApi<UserAssessments>(`/api/simplified/user-assessments?id=${id}`),
    enabled: !!id,
  });
}

export function useUserAssessmentsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UserAssessmentsCreate) =>
      fetchApi<UserAssessments>(`/api/simplified/user-assessments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userAssessmentsKeys.lists() });
    },
  });
}

export function useUserAssessmentsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: UserAssessmentsUpdate & { id: string }) =>
      fetchApi<UserAssessments>(`/api/simplified/user-assessments`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: userAssessmentsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: userAssessmentsKeys.detail(variables.id),
      });
    },
  });
}

export function useUserAssessmentsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/user-assessments?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userAssessmentsKeys.lists() });
    },
  });
}
