import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  RealityAssessmentPredictions,
  RealityAssessmentPredictionsCreate,
  RealityAssessmentPredictionsUpdate,
  RealityAssessmentPredictionsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const realityAssessmentPredictionsKeys = {
  all: ["realityAssessmentPredictions"] as const,
  lists: () => [...realityAssessmentPredictionsKeys.all, "list"] as const,
  list: (filters?: RealityAssessmentPredictionsFilters) => [...realityAssessmentPredictionsKeys.lists(), filters] as const,
  details: () => [...realityAssessmentPredictionsKeys.all, "detail"] as const,
  detail: (id: string) => [...realityAssessmentPredictionsKeys.details(), id] as const,
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

export function useRealityAssessmentPredictionsList(filters?: RealityAssessmentPredictionsFilters) {
  return useQuery({
    queryKey: realityAssessmentPredictionsKeys.list(filters),
    queryFn: () =>
      fetchApi<RealityAssessmentPredictions[]>(`/api/simplified/reality-assessment-predictions${buildQueryString(filters)}`),
  });
}

export function useRealityAssessmentPredictions(id: string) {
  return useQuery({
    queryKey: realityAssessmentPredictionsKeys.detail(id),
    queryFn: () =>
      fetchApi<RealityAssessmentPredictions>(`/api/simplified/reality-assessment-predictions?id=${id}`),
    enabled: !!id,
  });
}

export function useRealityAssessmentPredictionsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RealityAssessmentPredictionsCreate) =>
      fetchApi<RealityAssessmentPredictions>(`/api/simplified/reality-assessment-predictions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: realityAssessmentPredictionsKeys.lists() });
    },
  });
}

export function useRealityAssessmentPredictionsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: RealityAssessmentPredictionsUpdate & { id: string }) =>
      fetchApi<RealityAssessmentPredictions>(`/api/simplified/reality-assessment-predictions`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: realityAssessmentPredictionsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: realityAssessmentPredictionsKeys.detail(variables.id),
      });
    },
  });
}

export function useRealityAssessmentPredictionsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/reality-assessment-predictions?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: realityAssessmentPredictionsKeys.lists() });
    },
  });
}
