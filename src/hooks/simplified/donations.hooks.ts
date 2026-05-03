import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  Donations,
  DonationsCreate,
  DonationsUpdate,
  DonationsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const donationsKeys = {
  all: ["donations"] as const,
  lists: () => [...donationsKeys.all, "list"] as const,
  list: (filters?: DonationsFilters) => [...donationsKeys.lists(), filters] as const,
  details: () => [...donationsKeys.all, "detail"] as const,
  detail: (id: string) => [...donationsKeys.details(), id] as const,
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

export function useDonationsList(filters?: DonationsFilters) {
  return useQuery({
    queryKey: donationsKeys.list(filters),
    queryFn: () =>
      fetchApi<Donations[]>(`/api/simplified/donations${buildQueryString(filters)}`),
  });
}

export function useDonations(id: string) {
  return useQuery({
    queryKey: donationsKeys.detail(id),
    queryFn: () =>
      fetchApi<Donations>(`/api/simplified/donations?id=${id}`),
    enabled: !!id,
  });
}

export function useDonationsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: DonationsCreate) =>
      fetchApi<Donations>(`/api/simplified/donations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: donationsKeys.lists() });
    },
  });
}

export function useDonationsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: DonationsUpdate & { id: string }) =>
      fetchApi<Donations>(`/api/simplified/donations`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: donationsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: donationsKeys.detail(variables.id),
      });
    },
  });
}

export function useDonationsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/donations?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: donationsKeys.lists() });
    },
  });
}
