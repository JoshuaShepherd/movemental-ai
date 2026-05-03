import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  AffiliateReferrals,
  AffiliateReferralsCreate,
  AffiliateReferralsUpdate,
  AffiliateReferralsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const affiliateReferralsKeys = {
  all: ["affiliateReferrals"] as const,
  lists: () => [...affiliateReferralsKeys.all, "list"] as const,
  list: (filters?: AffiliateReferralsFilters) => [...affiliateReferralsKeys.lists(), filters] as const,
  details: () => [...affiliateReferralsKeys.all, "detail"] as const,
  detail: (id: string) => [...affiliateReferralsKeys.details(), id] as const,
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

export function useAffiliateReferralsList(filters?: AffiliateReferralsFilters) {
  return useQuery({
    queryKey: affiliateReferralsKeys.list(filters),
    queryFn: () =>
      fetchApi<AffiliateReferrals[]>(`/api/simplified/affiliate-referrals${buildQueryString(filters)}`),
  });
}

export function useAffiliateReferrals(id: string) {
  return useQuery({
    queryKey: affiliateReferralsKeys.detail(id),
    queryFn: () =>
      fetchApi<AffiliateReferrals>(`/api/simplified/affiliate-referrals?id=${id}`),
    enabled: !!id,
  });
}

export function useAffiliateReferralsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AffiliateReferralsCreate) =>
      fetchApi<AffiliateReferrals>(`/api/simplified/affiliate-referrals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: affiliateReferralsKeys.lists() });
    },
  });
}

export function useAffiliateReferralsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: AffiliateReferralsUpdate & { id: string }) =>
      fetchApi<AffiliateReferrals>(`/api/simplified/affiliate-referrals`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: affiliateReferralsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: affiliateReferralsKeys.detail(variables.id),
      });
    },
  });
}

export function useAffiliateReferralsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/affiliate-referrals?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: affiliateReferralsKeys.lists() });
    },
  });
}
