import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  SafetyGuidebookRatifications,
  SafetyGuidebookRatificationsCreate,
  SafetyGuidebookRatificationsUpdate,
  SafetyGuidebookRatificationsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const safetyGuidebookRatificationsKeys = {
  all: ["safetyGuidebookRatifications"] as const,
  lists: () => [...safetyGuidebookRatificationsKeys.all, "list"] as const,
  list: (filters?: SafetyGuidebookRatificationsFilters) => [...safetyGuidebookRatificationsKeys.lists(), filters] as const,
  details: () => [...safetyGuidebookRatificationsKeys.all, "detail"] as const,
  detail: (id: string) => [...safetyGuidebookRatificationsKeys.details(), id] as const,
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

export function useSafetyGuidebookRatificationsList(filters?: SafetyGuidebookRatificationsFilters) {
  return useQuery({
    queryKey: safetyGuidebookRatificationsKeys.list(filters),
    queryFn: () =>
      fetchApi<SafetyGuidebookRatifications[]>(`/api/simplified/safety-guidebook-ratifications${buildQueryString(filters)}`),
  });
}

export function useSafetyGuidebookRatifications(id: string) {
  return useQuery({
    queryKey: safetyGuidebookRatificationsKeys.detail(id),
    queryFn: () =>
      fetchApi<SafetyGuidebookRatifications>(`/api/simplified/safety-guidebook-ratifications?id=${id}`),
    enabled: !!id,
  });
}

export function useSafetyGuidebookRatificationsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SafetyGuidebookRatificationsCreate) =>
      fetchApi<SafetyGuidebookRatifications>(`/api/simplified/safety-guidebook-ratifications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: safetyGuidebookRatificationsKeys.lists() });
    },
  });
}

export function useSafetyGuidebookRatificationsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: SafetyGuidebookRatificationsUpdate & { id: string }) =>
      fetchApi<SafetyGuidebookRatifications>(`/api/simplified/safety-guidebook-ratifications`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: safetyGuidebookRatificationsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: safetyGuidebookRatificationsKeys.detail(variables.id),
      });
    },
  });
}

export function useSafetyGuidebookRatificationsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/safety-guidebook-ratifications?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: safetyGuidebookRatificationsKeys.lists() });
    },
  });
}
