import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  PerformanceMetrics,
  PerformanceMetricsCreate,
  PerformanceMetricsUpdate,
  PerformanceMetricsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const performanceMetricsKeys = {
  all: ["performanceMetrics"] as const,
  lists: () => [...performanceMetricsKeys.all, "list"] as const,
  list: (filters?: PerformanceMetricsFilters) => [...performanceMetricsKeys.lists(), filters] as const,
  details: () => [...performanceMetricsKeys.all, "detail"] as const,
  detail: (id: string) => [...performanceMetricsKeys.details(), id] as const,
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

export function usePerformanceMetricsList(filters?: PerformanceMetricsFilters) {
  return useQuery({
    queryKey: performanceMetricsKeys.list(filters),
    queryFn: () =>
      fetchApi<PerformanceMetrics[]>(`/api/simplified/performance-metrics${buildQueryString(filters)}`),
  });
}

export function usePerformanceMetrics(id: string) {
  return useQuery({
    queryKey: performanceMetricsKeys.detail(id),
    queryFn: () =>
      fetchApi<PerformanceMetrics>(`/api/simplified/performance-metrics?id=${id}`),
    enabled: !!id,
  });
}

export function usePerformanceMetricsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PerformanceMetricsCreate) =>
      fetchApi<PerformanceMetrics>(`/api/simplified/performance-metrics`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: performanceMetricsKeys.lists() });
    },
  });
}

export function usePerformanceMetricsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: PerformanceMetricsUpdate & { id: string }) =>
      fetchApi<PerformanceMetrics>(`/api/simplified/performance-metrics`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: performanceMetricsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: performanceMetricsKeys.detail(variables.id),
      });
    },
  });
}

export function usePerformanceMetricsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/performance-metrics?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: performanceMetricsKeys.lists() });
    },
  });
}
