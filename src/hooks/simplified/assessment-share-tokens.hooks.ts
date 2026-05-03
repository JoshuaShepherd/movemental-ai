import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  AssessmentShareTokens,
  AssessmentShareTokensCreate,
  AssessmentShareTokensUpdate,
  AssessmentShareTokensFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const assessmentShareTokensKeys = {
  all: ["assessmentShareTokens"] as const,
  lists: () => [...assessmentShareTokensKeys.all, "list"] as const,
  list: (filters?: AssessmentShareTokensFilters) => [...assessmentShareTokensKeys.lists(), filters] as const,
  details: () => [...assessmentShareTokensKeys.all, "detail"] as const,
  detail: (id: string) => [...assessmentShareTokensKeys.details(), id] as const,
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

export function useAssessmentShareTokensList(filters?: AssessmentShareTokensFilters) {
  return useQuery({
    queryKey: assessmentShareTokensKeys.list(filters),
    queryFn: () =>
      fetchApi<AssessmentShareTokens[]>(`/api/simplified/assessment-share-tokens${buildQueryString(filters)}`),
  });
}

export function useAssessmentShareTokens(id: string) {
  return useQuery({
    queryKey: assessmentShareTokensKeys.detail(id),
    queryFn: () =>
      fetchApi<AssessmentShareTokens>(`/api/simplified/assessment-share-tokens?id=${id}`),
    enabled: !!id,
  });
}

export function useAssessmentShareTokensCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AssessmentShareTokensCreate) =>
      fetchApi<AssessmentShareTokens>(`/api/simplified/assessment-share-tokens`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: assessmentShareTokensKeys.lists() });
    },
  });
}

export function useAssessmentShareTokensUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: AssessmentShareTokensUpdate & { id: string }) =>
      fetchApi<AssessmentShareTokens>(`/api/simplified/assessment-share-tokens`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: assessmentShareTokensKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: assessmentShareTokensKeys.detail(variables.id),
      });
    },
  });
}

export function useAssessmentShareTokensDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/assessment-share-tokens?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: assessmentShareTokensKeys.lists() });
    },
  });
}
