import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  SafetyEnrollments,
  SafetyEnrollmentsCreate,
  SafetyEnrollmentsUpdate,
  SafetyEnrollmentsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const safetyEnrollmentsKeys = {
  all: ["safetyEnrollments"] as const,
  lists: () => [...safetyEnrollmentsKeys.all, "list"] as const,
  list: (filters?: SafetyEnrollmentsFilters) => [...safetyEnrollmentsKeys.lists(), filters] as const,
  details: () => [...safetyEnrollmentsKeys.all, "detail"] as const,
  detail: (id: string) => [...safetyEnrollmentsKeys.details(), id] as const,
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

export function useSafetyEnrollmentsList(filters?: SafetyEnrollmentsFilters) {
  return useQuery({
    queryKey: safetyEnrollmentsKeys.list(filters),
    queryFn: () =>
      fetchApi<SafetyEnrollments[]>(`/api/simplified/safety-enrollments${buildQueryString(filters)}`),
  });
}

export function useSafetyEnrollments(id: string) {
  return useQuery({
    queryKey: safetyEnrollmentsKeys.detail(id),
    queryFn: () =>
      fetchApi<SafetyEnrollments>(`/api/simplified/safety-enrollments?id=${id}`),
    enabled: !!id,
  });
}

export function useSafetyEnrollmentsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SafetyEnrollmentsCreate) =>
      fetchApi<SafetyEnrollments>(`/api/simplified/safety-enrollments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: safetyEnrollmentsKeys.lists() });
    },
  });
}

export function useSafetyEnrollmentsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: SafetyEnrollmentsUpdate & { id: string }) =>
      fetchApi<SafetyEnrollments>(`/api/simplified/safety-enrollments`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: safetyEnrollmentsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: safetyEnrollmentsKeys.detail(variables.id),
      });
    },
  });
}

export function useSafetyEnrollmentsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/safety-enrollments?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: safetyEnrollmentsKeys.lists() });
    },
  });
}
