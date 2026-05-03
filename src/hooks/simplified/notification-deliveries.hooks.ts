import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  NotificationDeliveries,
  NotificationDeliveriesCreate,
  NotificationDeliveriesUpdate,
  NotificationDeliveriesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const notificationDeliveriesKeys = {
  all: ["notificationDeliveries"] as const,
  lists: () => [...notificationDeliveriesKeys.all, "list"] as const,
  list: (filters?: NotificationDeliveriesFilters) => [...notificationDeliveriesKeys.lists(), filters] as const,
  details: () => [...notificationDeliveriesKeys.all, "detail"] as const,
  detail: (id: string) => [...notificationDeliveriesKeys.details(), id] as const,
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

export function useNotificationDeliveriesList(filters?: NotificationDeliveriesFilters) {
  return useQuery({
    queryKey: notificationDeliveriesKeys.list(filters),
    queryFn: () =>
      fetchApi<NotificationDeliveries[]>(`/api/simplified/notification-deliveries${buildQueryString(filters)}`),
  });
}

export function useNotificationDeliveries(id: string) {
  return useQuery({
    queryKey: notificationDeliveriesKeys.detail(id),
    queryFn: () =>
      fetchApi<NotificationDeliveries>(`/api/simplified/notification-deliveries?id=${id}`),
    enabled: !!id,
  });
}

export function useNotificationDeliveriesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: NotificationDeliveriesCreate) =>
      fetchApi<NotificationDeliveries>(`/api/simplified/notification-deliveries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationDeliveriesKeys.lists() });
    },
  });
}

export function useNotificationDeliveriesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: NotificationDeliveriesUpdate & { id: string }) =>
      fetchApi<NotificationDeliveries>(`/api/simplified/notification-deliveries`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: notificationDeliveriesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: notificationDeliveriesKeys.detail(variables.id),
      });
    },
  });
}

export function useNotificationDeliveriesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/notification-deliveries?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationDeliveriesKeys.lists() });
    },
  });
}
