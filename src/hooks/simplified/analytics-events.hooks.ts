import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  AnalyticsEvents,
  AnalyticsEventsCreate,
  AnalyticsEventsUpdate,
  AnalyticsEventsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const analyticsEventsKeys = {
  all: ["analyticsEvents"] as const,
  lists: () => [...analyticsEventsKeys.all, "list"] as const,
  list: (filters?: AnalyticsEventsFilters) => [...analyticsEventsKeys.lists(), filters] as const,
  details: () => [...analyticsEventsKeys.all, "detail"] as const,
  detail: (id: string) => [...analyticsEventsKeys.details(), id] as const,
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

export function useAnalyticsEventsList(filters?: AnalyticsEventsFilters) {
  return useQuery({
    queryKey: analyticsEventsKeys.list(filters),
    queryFn: () =>
      fetchApi<AnalyticsEvents[]>(`/api/simplified/analytics-events${buildQueryString(filters)}`),
  });
}

export function useAnalyticsEvents(id: string) {
  return useQuery({
    queryKey: analyticsEventsKeys.detail(id),
    queryFn: () =>
      fetchApi<AnalyticsEvents>(`/api/simplified/analytics-events?id=${id}`),
    enabled: !!id,
  });
}

export function useAnalyticsEventsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AnalyticsEventsCreate) =>
      fetchApi<AnalyticsEvents>(`/api/simplified/analytics-events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: analyticsEventsKeys.lists() });
    },
  });
}

export function useAnalyticsEventsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: AnalyticsEventsUpdate & { id: string }) =>
      fetchApi<AnalyticsEvents>(`/api/simplified/analytics-events`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: analyticsEventsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: analyticsEventsKeys.detail(variables.id),
      });
    },
  });
}

export function useAnalyticsEventsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/analytics-events?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: analyticsEventsKeys.lists() });
    },
  });
}
