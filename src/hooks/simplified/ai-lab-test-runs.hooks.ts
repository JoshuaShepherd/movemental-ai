import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  AiLabTestRuns,
  AiLabTestRunsCreate,
  AiLabTestRunsUpdate,
  AiLabTestRunsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const aiLabTestRunsKeys = {
  all: ["aiLabTestRuns"] as const,
  lists: () => [...aiLabTestRunsKeys.all, "list"] as const,
  list: (filters?: AiLabTestRunsFilters) => [...aiLabTestRunsKeys.lists(), filters] as const,
  details: () => [...aiLabTestRunsKeys.all, "detail"] as const,
  detail: (id: string) => [...aiLabTestRunsKeys.details(), id] as const,
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

export function useAiLabTestRunsList(filters?: AiLabTestRunsFilters) {
  return useQuery({
    queryKey: aiLabTestRunsKeys.list(filters),
    queryFn: () =>
      fetchApi<AiLabTestRuns[]>(`/api/simplified/ai-lab-test-runs${buildQueryString(filters)}`),
  });
}

export function useAiLabTestRuns(id: string) {
  return useQuery({
    queryKey: aiLabTestRunsKeys.detail(id),
    queryFn: () =>
      fetchApi<AiLabTestRuns>(`/api/simplified/ai-lab-test-runs?id=${id}`),
    enabled: !!id,
  });
}

export function useAiLabTestRunsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AiLabTestRunsCreate) =>
      fetchApi<AiLabTestRuns>(`/api/simplified/ai-lab-test-runs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: aiLabTestRunsKeys.lists() });
    },
  });
}

export function useAiLabTestRunsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: AiLabTestRunsUpdate & { id: string }) =>
      fetchApi<AiLabTestRuns>(`/api/simplified/ai-lab-test-runs`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: aiLabTestRunsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: aiLabTestRunsKeys.detail(variables.id),
      });
    },
  });
}

export function useAiLabTestRunsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/ai-lab-test-runs?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: aiLabTestRunsKeys.lists() });
    },
  });
}
