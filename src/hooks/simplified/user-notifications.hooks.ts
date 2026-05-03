import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  UserNotifications,
  UserNotificationsCreate,
  UserNotificationsUpdate,
  UserNotificationsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const userNotificationsKeys = {
  all: ["userNotifications"] as const,
  lists: () => [...userNotificationsKeys.all, "list"] as const,
  list: (filters?: UserNotificationsFilters) => [...userNotificationsKeys.lists(), filters] as const,
  details: () => [...userNotificationsKeys.all, "detail"] as const,
  detail: (id: string) => [...userNotificationsKeys.details(), id] as const,
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

export function useUserNotificationsList(filters?: UserNotificationsFilters) {
  return useQuery({
    queryKey: userNotificationsKeys.list(filters),
    queryFn: () =>
      fetchApi<UserNotifications[]>(`/api/simplified/user-notifications${buildQueryString(filters)}`),
  });
}

export function useUserNotifications(id: string) {
  return useQuery({
    queryKey: userNotificationsKeys.detail(id),
    queryFn: () =>
      fetchApi<UserNotifications>(`/api/simplified/user-notifications?id=${id}`),
    enabled: !!id,
  });
}

export function useUserNotificationsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UserNotificationsCreate) =>
      fetchApi<UserNotifications>(`/api/simplified/user-notifications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userNotificationsKeys.lists() });
    },
  });
}

export function useUserNotificationsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: UserNotificationsUpdate & { id: string }) =>
      fetchApi<UserNotifications>(`/api/simplified/user-notifications`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: userNotificationsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: userNotificationsKeys.detail(variables.id),
      });
    },
  });
}

export function useUserNotificationsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/user-notifications?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userNotificationsKeys.lists() });
    },
  });
}
