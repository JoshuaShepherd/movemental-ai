import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  MediaUsageTracking,
  MediaUsageTrackingCreate,
  MediaUsageTrackingUpdate,
  MediaUsageTrackingFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const mediaUsageTrackingKeys = {
  all: ["mediaUsageTracking"] as const,
  lists: () => [...mediaUsageTrackingKeys.all, "list"] as const,
  list: (filters?: MediaUsageTrackingFilters) => [...mediaUsageTrackingKeys.lists(), filters] as const,
  details: () => [...mediaUsageTrackingKeys.all, "detail"] as const,
  detail: (id: string) => [...mediaUsageTrackingKeys.details(), id] as const,
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

export function useMediaUsageTrackingList(filters?: MediaUsageTrackingFilters) {
  return useQuery({
    queryKey: mediaUsageTrackingKeys.list(filters),
    queryFn: () =>
      fetchApi<MediaUsageTracking[]>(`/api/simplified/media-usage-tracking${buildQueryString(filters)}`),
  });
}

export function useMediaUsageTracking(id: string) {
  return useQuery({
    queryKey: mediaUsageTrackingKeys.detail(id),
    queryFn: () =>
      fetchApi<MediaUsageTracking>(`/api/simplified/media-usage-tracking?id=${id}`),
    enabled: !!id,
  });
}

export function useMediaUsageTrackingCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: MediaUsageTrackingCreate) =>
      fetchApi<MediaUsageTracking>(`/api/simplified/media-usage-tracking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mediaUsageTrackingKeys.lists() });
    },
  });
}

export function useMediaUsageTrackingUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: MediaUsageTrackingUpdate & { id: string }) =>
      fetchApi<MediaUsageTracking>(`/api/simplified/media-usage-tracking`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: mediaUsageTrackingKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: mediaUsageTrackingKeys.detail(variables.id),
      });
    },
  });
}

export function useMediaUsageTrackingDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/media-usage-tracking?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mediaUsageTrackingKeys.lists() });
    },
  });
}
