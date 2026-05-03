import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  AiLabTestFlags,
  AiLabTestFlagsCreate,
  AiLabTestFlagsUpdate,
  AiLabTestFlagsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const aiLabTestFlagsKeys = {
  all: ["aiLabTestFlags"] as const,
  lists: () => [...aiLabTestFlagsKeys.all, "list"] as const,
  list: (filters?: AiLabTestFlagsFilters) => [...aiLabTestFlagsKeys.lists(), filters] as const,
  details: () => [...aiLabTestFlagsKeys.all, "detail"] as const,
  detail: (id: string) => [...aiLabTestFlagsKeys.details(), id] as const,
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

export function useAiLabTestFlagsList(filters?: AiLabTestFlagsFilters) {
  return useQuery({
    queryKey: aiLabTestFlagsKeys.list(filters),
    queryFn: () =>
      fetchApi<AiLabTestFlags[]>(`/api/simplified/ai-lab-test-flags${buildQueryString(filters)}`),
  });
}

export function useAiLabTestFlags(id: string) {
  return useQuery({
    queryKey: aiLabTestFlagsKeys.detail(id),
    queryFn: () =>
      fetchApi<AiLabTestFlags>(`/api/simplified/ai-lab-test-flags?id=${id}`),
    enabled: !!id,
  });
}

export function useAiLabTestFlagsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AiLabTestFlagsCreate) =>
      fetchApi<AiLabTestFlags>(`/api/simplified/ai-lab-test-flags`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: aiLabTestFlagsKeys.lists() });
    },
  });
}

export function useAiLabTestFlagsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: AiLabTestFlagsUpdate & { id: string }) =>
      fetchApi<AiLabTestFlags>(`/api/simplified/ai-lab-test-flags`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: aiLabTestFlagsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: aiLabTestFlagsKeys.detail(variables.id),
      });
    },
  });
}

export function useAiLabTestFlagsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/ai-lab-test-flags?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: aiLabTestFlagsKeys.lists() });
    },
  });
}
