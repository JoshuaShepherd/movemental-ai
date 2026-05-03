import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  EventRegistrations,
  EventRegistrationsCreate,
  EventRegistrationsUpdate,
  EventRegistrationsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const eventRegistrationsKeys = {
  all: ["eventRegistrations"] as const,
  lists: () => [...eventRegistrationsKeys.all, "list"] as const,
  list: (filters?: EventRegistrationsFilters) => [...eventRegistrationsKeys.lists(), filters] as const,
  details: () => [...eventRegistrationsKeys.all, "detail"] as const,
  detail: (id: string) => [...eventRegistrationsKeys.details(), id] as const,
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

export function useEventRegistrationsList(filters?: EventRegistrationsFilters) {
  return useQuery({
    queryKey: eventRegistrationsKeys.list(filters),
    queryFn: () =>
      fetchApi<EventRegistrations[]>(`/api/simplified/event-registrations${buildQueryString(filters)}`),
  });
}

export function useEventRegistrations(id: string) {
  return useQuery({
    queryKey: eventRegistrationsKeys.detail(id),
    queryFn: () =>
      fetchApi<EventRegistrations>(`/api/simplified/event-registrations?id=${id}`),
    enabled: !!id,
  });
}

export function useEventRegistrationsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: EventRegistrationsCreate) =>
      fetchApi<EventRegistrations>(`/api/simplified/event-registrations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: eventRegistrationsKeys.lists() });
    },
  });
}

export function useEventRegistrationsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: EventRegistrationsUpdate & { id: string }) =>
      fetchApi<EventRegistrations>(`/api/simplified/event-registrations`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: eventRegistrationsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: eventRegistrationsKeys.detail(variables.id),
      });
    },
  });
}

export function useEventRegistrationsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/event-registrations?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: eventRegistrationsKeys.lists() });
    },
  });
}
