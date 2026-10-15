import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  RealityAssessmentResponses,
  RealityAssessmentResponsesCreate,
  RealityAssessmentResponsesUpdate,
  RealityAssessmentResponsesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const realityAssessmentResponsesKeys = {
  all: ["realityAssessmentResponses"] as const,
  lists: () => [...realityAssessmentResponsesKeys.all, "list"] as const,
  list: (filters?: RealityAssessmentResponsesFilters) => [...realityAssessmentResponsesKeys.lists(), filters] as const,
  details: () => [...realityAssessmentResponsesKeys.all, "detail"] as const,
  detail: (id: string) => [...realityAssessmentResponsesKeys.details(), id] as const,
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

export function useRealityAssessmentResponsesList(filters?: RealityAssessmentResponsesFilters) {
  return useQuery({
    queryKey: realityAssessmentResponsesKeys.list(filters),
    queryFn: () =>
      fetchApi<RealityAssessmentResponses[]>(`/api/simplified/reality-assessment-responses${buildQueryString(filters)}`),
  });
}

export function useRealityAssessmentResponses(id: string) {
  return useQuery({
    queryKey: realityAssessmentResponsesKeys.detail(id),
    queryFn: () =>
      fetchApi<RealityAssessmentResponses>(`/api/simplified/reality-assessment-responses?id=${id}`),
    enabled: !!id,
  });
}

export function useRealityAssessmentResponsesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RealityAssessmentResponsesCreate) =>
      fetchApi<RealityAssessmentResponses>(`/api/simplified/reality-assessment-responses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: realityAssessmentResponsesKeys.lists() });
    },
  });
}

export function useRealityAssessmentResponsesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: RealityAssessmentResponsesUpdate & { id: string }) =>
      fetchApi<RealityAssessmentResponses>(`/api/simplified/reality-assessment-responses`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: realityAssessmentResponsesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: realityAssessmentResponsesKeys.detail(variables.id),
      });
    },
  });
}

export function useRealityAssessmentResponsesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/reality-assessment-responses?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: realityAssessmentResponsesKeys.lists() });
    },
  });
}
