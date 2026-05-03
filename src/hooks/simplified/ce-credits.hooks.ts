import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  CeCredits,
  CeCreditsCreate,
  CeCreditsUpdate,
  CeCreditsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const ceCreditsKeys = {
  all: ["ceCredits"] as const,
  lists: () => [...ceCreditsKeys.all, "list"] as const,
  list: (filters?: CeCreditsFilters) => [...ceCreditsKeys.lists(), filters] as const,
  details: () => [...ceCreditsKeys.all, "detail"] as const,
  detail: (id: string) => [...ceCreditsKeys.details(), id] as const,
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

export function useCeCreditsList(filters?: CeCreditsFilters) {
  return useQuery({
    queryKey: ceCreditsKeys.list(filters),
    queryFn: () =>
      fetchApi<CeCredits[]>(`/api/simplified/ce-credits${buildQueryString(filters)}`),
  });
}

export function useCeCredits(id: string) {
  return useQuery({
    queryKey: ceCreditsKeys.detail(id),
    queryFn: () =>
      fetchApi<CeCredits>(`/api/simplified/ce-credits?id=${id}`),
    enabled: !!id,
  });
}

export function useCeCreditsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CeCreditsCreate) =>
      fetchApi<CeCredits>(`/api/simplified/ce-credits`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ceCreditsKeys.lists() });
    },
  });
}

export function useCeCreditsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: CeCreditsUpdate & { id: string }) =>
      fetchApi<CeCredits>(`/api/simplified/ce-credits`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ceCreditsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: ceCreditsKeys.detail(variables.id),
      });
    },
  });
}

export function useCeCreditsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/ce-credits?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ceCreditsKeys.lists() });
    },
  });
}
