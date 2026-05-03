import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  DigitalBadges,
  DigitalBadgesCreate,
  DigitalBadgesUpdate,
  DigitalBadgesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const digitalBadgesKeys = {
  all: ["digitalBadges"] as const,
  lists: () => [...digitalBadgesKeys.all, "list"] as const,
  list: (filters?: DigitalBadgesFilters) => [...digitalBadgesKeys.lists(), filters] as const,
  details: () => [...digitalBadgesKeys.all, "detail"] as const,
  detail: (id: string) => [...digitalBadgesKeys.details(), id] as const,
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

export function useDigitalBadgesList(filters?: DigitalBadgesFilters) {
  return useQuery({
    queryKey: digitalBadgesKeys.list(filters),
    queryFn: () =>
      fetchApi<DigitalBadges[]>(`/api/simplified/digital-badges${buildQueryString(filters)}`),
  });
}

export function useDigitalBadges(id: string) {
  return useQuery({
    queryKey: digitalBadgesKeys.detail(id),
    queryFn: () =>
      fetchApi<DigitalBadges>(`/api/simplified/digital-badges?id=${id}`),
    enabled: !!id,
  });
}

export function useDigitalBadgesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: DigitalBadgesCreate) =>
      fetchApi<DigitalBadges>(`/api/simplified/digital-badges`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: digitalBadgesKeys.lists() });
    },
  });
}

export function useDigitalBadgesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: DigitalBadgesUpdate & { id: string }) =>
      fetchApi<DigitalBadges>(`/api/simplified/digital-badges`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: digitalBadgesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: digitalBadgesKeys.detail(variables.id),
      });
    },
  });
}

export function useDigitalBadgesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/digital-badges?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: digitalBadgesKeys.lists() });
    },
  });
}
