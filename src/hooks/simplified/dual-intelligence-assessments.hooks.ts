import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  DualIntelligenceAssessments,
  DualIntelligenceAssessmentsCreate,
  DualIntelligenceAssessmentsUpdate,
  DualIntelligenceAssessmentsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const dualIntelligenceAssessmentsKeys = {
  all: ["dualIntelligenceAssessments"] as const,
  lists: () => [...dualIntelligenceAssessmentsKeys.all, "list"] as const,
  list: (filters?: DualIntelligenceAssessmentsFilters) => [...dualIntelligenceAssessmentsKeys.lists(), filters] as const,
  details: () => [...dualIntelligenceAssessmentsKeys.all, "detail"] as const,
  detail: (id: string) => [...dualIntelligenceAssessmentsKeys.details(), id] as const,
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

export function useDualIntelligenceAssessmentsList(filters?: DualIntelligenceAssessmentsFilters) {
  return useQuery({
    queryKey: dualIntelligenceAssessmentsKeys.list(filters),
    queryFn: () =>
      fetchApi<DualIntelligenceAssessments[]>(`/api/simplified/dual-intelligence-assessments${buildQueryString(filters)}`),
  });
}

export function useDualIntelligenceAssessments(id: string) {
  return useQuery({
    queryKey: dualIntelligenceAssessmentsKeys.detail(id),
    queryFn: () =>
      fetchApi<DualIntelligenceAssessments>(`/api/simplified/dual-intelligence-assessments?id=${id}`),
    enabled: !!id,
  });
}

export function useDualIntelligenceAssessmentsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: DualIntelligenceAssessmentsCreate) =>
      fetchApi<DualIntelligenceAssessments>(`/api/simplified/dual-intelligence-assessments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: dualIntelligenceAssessmentsKeys.lists() });
    },
  });
}

export function useDualIntelligenceAssessmentsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: DualIntelligenceAssessmentsUpdate & { id: string }) =>
      fetchApi<DualIntelligenceAssessments>(`/api/simplified/dual-intelligence-assessments`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: dualIntelligenceAssessmentsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: dualIntelligenceAssessmentsKeys.detail(variables.id),
      });
    },
  });
}

export function useDualIntelligenceAssessmentsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/dual-intelligence-assessments?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: dualIntelligenceAssessmentsKeys.lists() });
    },
  });
}
