import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  RealityAssessmentSessions,
  RealityAssessmentSessionsCreate,
  RealityAssessmentSessionsUpdate,
  RealityAssessmentSessionsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const realityAssessmentSessionsKeys = {
  all: ["realityAssessmentSessions"] as const,
  lists: () => [...realityAssessmentSessionsKeys.all, "list"] as const,
  list: (filters?: RealityAssessmentSessionsFilters) => [...realityAssessmentSessionsKeys.lists(), filters] as const,
  details: () => [...realityAssessmentSessionsKeys.all, "detail"] as const,
  detail: (id: string) => [...realityAssessmentSessionsKeys.details(), id] as const,
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

export function useRealityAssessmentSessionsList(filters?: RealityAssessmentSessionsFilters) {
  return useQuery({
    queryKey: realityAssessmentSessionsKeys.list(filters),
    queryFn: () =>
      fetchApi<RealityAssessmentSessions[]>(`/api/simplified/reality-assessment-sessions${buildQueryString(filters)}`),
  });
}

export function useRealityAssessmentSessions(id: string) {
  return useQuery({
    queryKey: realityAssessmentSessionsKeys.detail(id),
    queryFn: () =>
      fetchApi<RealityAssessmentSessions>(`/api/simplified/reality-assessment-sessions?id=${id}`),
    enabled: !!id,
  });
}

export function useRealityAssessmentSessionsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RealityAssessmentSessionsCreate) =>
      fetchApi<RealityAssessmentSessions>(`/api/simplified/reality-assessment-sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: realityAssessmentSessionsKeys.lists() });
    },
  });
}

export function useRealityAssessmentSessionsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: RealityAssessmentSessionsUpdate & { id: string }) =>
      fetchApi<RealityAssessmentSessions>(`/api/simplified/reality-assessment-sessions`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: realityAssessmentSessionsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: realityAssessmentSessionsKeys.detail(variables.id),
      });
    },
  });
}

export function useRealityAssessmentSessionsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/reality-assessment-sessions?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: realityAssessmentSessionsKeys.lists() });
    },
  });
}
