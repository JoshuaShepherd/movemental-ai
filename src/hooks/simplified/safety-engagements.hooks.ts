import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  SafetyEngagements,
  SafetyEngagementsCreate,
  SafetyEngagementsUpdate,
  SafetyEngagementsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const safetyEngagementsKeys = {
  all: ["safetyEngagements"] as const,
  lists: () => [...safetyEngagementsKeys.all, "list"] as const,
  list: (filters?: SafetyEngagementsFilters) => [...safetyEngagementsKeys.lists(), filters] as const,
  details: () => [...safetyEngagementsKeys.all, "detail"] as const,
  detail: (id: string) => [...safetyEngagementsKeys.details(), id] as const,
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

export function useSafetyEngagementsList(filters?: SafetyEngagementsFilters) {
  return useQuery({
    queryKey: safetyEngagementsKeys.list(filters),
    queryFn: () =>
      fetchApi<SafetyEngagements[]>(`/api/simplified/safety-engagements${buildQueryString(filters)}`),
  });
}

export function useSafetyEngagements(id: string) {
  return useQuery({
    queryKey: safetyEngagementsKeys.detail(id),
    queryFn: () =>
      fetchApi<SafetyEngagements>(`/api/simplified/safety-engagements?id=${id}`),
    enabled: !!id,
  });
}

export function useSafetyEngagementsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SafetyEngagementsCreate) =>
      fetchApi<SafetyEngagements>(`/api/simplified/safety-engagements`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: safetyEngagementsKeys.lists() });
    },
  });
}

export function useSafetyEngagementsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: SafetyEngagementsUpdate & { id: string }) =>
      fetchApi<SafetyEngagements>(`/api/simplified/safety-engagements`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: safetyEngagementsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: safetyEngagementsKeys.detail(variables.id),
      });
    },
  });
}

export function useSafetyEngagementsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/safety-engagements?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: safetyEngagementsKeys.lists() });
    },
  });
}
