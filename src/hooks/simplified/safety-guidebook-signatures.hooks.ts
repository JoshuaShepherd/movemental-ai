import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  SafetyGuidebookSignatures,
  SafetyGuidebookSignaturesCreate,
  SafetyGuidebookSignaturesUpdate,
  SafetyGuidebookSignaturesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const safetyGuidebookSignaturesKeys = {
  all: ["safetyGuidebookSignatures"] as const,
  lists: () => [...safetyGuidebookSignaturesKeys.all, "list"] as const,
  list: (filters?: SafetyGuidebookSignaturesFilters) => [...safetyGuidebookSignaturesKeys.lists(), filters] as const,
  details: () => [...safetyGuidebookSignaturesKeys.all, "detail"] as const,
  detail: (id: string) => [...safetyGuidebookSignaturesKeys.details(), id] as const,
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

export function useSafetyGuidebookSignaturesList(filters?: SafetyGuidebookSignaturesFilters) {
  return useQuery({
    queryKey: safetyGuidebookSignaturesKeys.list(filters),
    queryFn: () =>
      fetchApi<SafetyGuidebookSignatures[]>(`/api/simplified/safety-guidebook-signatures${buildQueryString(filters)}`),
  });
}

export function useSafetyGuidebookSignatures(id: string) {
  return useQuery({
    queryKey: safetyGuidebookSignaturesKeys.detail(id),
    queryFn: () =>
      fetchApi<SafetyGuidebookSignatures>(`/api/simplified/safety-guidebook-signatures?id=${id}`),
    enabled: !!id,
  });
}

export function useSafetyGuidebookSignaturesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SafetyGuidebookSignaturesCreate) =>
      fetchApi<SafetyGuidebookSignatures>(`/api/simplified/safety-guidebook-signatures`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: safetyGuidebookSignaturesKeys.lists() });
    },
  });
}

export function useSafetyGuidebookSignaturesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: SafetyGuidebookSignaturesUpdate & { id: string }) =>
      fetchApi<SafetyGuidebookSignatures>(`/api/simplified/safety-guidebook-signatures`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: safetyGuidebookSignaturesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: safetyGuidebookSignaturesKeys.detail(variables.id),
      });
    },
  });
}

export function useSafetyGuidebookSignaturesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/safety-guidebook-signatures?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: safetyGuidebookSignaturesKeys.lists() });
    },
  });
}
