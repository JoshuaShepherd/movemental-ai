import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  HandoffEvents,
  HandoffEventsCreate,
  HandoffEventsUpdate,
  HandoffEventsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const handoffEventsKeys = {
  all: ["handoffEvents"] as const,
  lists: () => [...handoffEventsKeys.all, "list"] as const,
  list: (filters?: HandoffEventsFilters) => [...handoffEventsKeys.lists(), filters] as const,
  details: () => [...handoffEventsKeys.all, "detail"] as const,
  detail: (id: string) => [...handoffEventsKeys.details(), id] as const,
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

export function useHandoffEventsList(filters?: HandoffEventsFilters) {
  return useQuery({
    queryKey: handoffEventsKeys.list(filters),
    queryFn: () =>
      fetchApi<HandoffEvents[]>(`/api/simplified/handoff-events${buildQueryString(filters)}`),
  });
}

export function useHandoffEvents(id: string) {
  return useQuery({
    queryKey: handoffEventsKeys.detail(id),
    queryFn: () =>
      fetchApi<HandoffEvents>(`/api/simplified/handoff-events?id=${id}`),
    enabled: !!id,
  });
}

export function useHandoffEventsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: HandoffEventsCreate) =>
      fetchApi<HandoffEvents>(`/api/simplified/handoff-events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: handoffEventsKeys.lists() });
    },
  });
}

export function useHandoffEventsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: HandoffEventsUpdate & { id: string }) =>
      fetchApi<HandoffEvents>(`/api/simplified/handoff-events`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: handoffEventsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: handoffEventsKeys.detail(variables.id),
      });
    },
  });
}

export function useHandoffEventsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/handoff-events?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: handoffEventsKeys.lists() });
    },
  });
}
