import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  UserSubscriptions,
  UserSubscriptionsCreate,
  UserSubscriptionsUpdate,
  UserSubscriptionsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const userSubscriptionsKeys = {
  all: ["userSubscriptions"] as const,
  lists: () => [...userSubscriptionsKeys.all, "list"] as const,
  list: (filters?: UserSubscriptionsFilters) => [...userSubscriptionsKeys.lists(), filters] as const,
  details: () => [...userSubscriptionsKeys.all, "detail"] as const,
  detail: (id: string) => [...userSubscriptionsKeys.details(), id] as const,
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

export function useUserSubscriptionsList(filters?: UserSubscriptionsFilters) {
  return useQuery({
    queryKey: userSubscriptionsKeys.list(filters),
    queryFn: () =>
      fetchApi<UserSubscriptions[]>(`/api/simplified/user-subscriptions${buildQueryString(filters)}`),
  });
}

export function useUserSubscriptions(id: string) {
  return useQuery({
    queryKey: userSubscriptionsKeys.detail(id),
    queryFn: () =>
      fetchApi<UserSubscriptions>(`/api/simplified/user-subscriptions?id=${id}`),
    enabled: !!id,
  });
}

export function useUserSubscriptionsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UserSubscriptionsCreate) =>
      fetchApi<UserSubscriptions>(`/api/simplified/user-subscriptions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userSubscriptionsKeys.lists() });
    },
  });
}

export function useUserSubscriptionsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: UserSubscriptionsUpdate & { id: string }) =>
      fetchApi<UserSubscriptions>(`/api/simplified/user-subscriptions`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: userSubscriptionsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: userSubscriptionsKeys.detail(variables.id),
      });
    },
  });
}

export function useUserSubscriptionsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/user-subscriptions?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userSubscriptionsKeys.lists() });
    },
  });
}
