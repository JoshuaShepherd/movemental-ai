import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  PodcastSeries,
  PodcastSeriesCreate,
  PodcastSeriesUpdate,
  PodcastSeriesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const podcastSeriesKeys = {
  all: ["podcastSeries"] as const,
  lists: () => [...podcastSeriesKeys.all, "list"] as const,
  list: (filters?: PodcastSeriesFilters) => [...podcastSeriesKeys.lists(), filters] as const,
  details: () => [...podcastSeriesKeys.all, "detail"] as const,
  detail: (id: string) => [...podcastSeriesKeys.details(), id] as const,
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

export function usePodcastSeriesList(filters?: PodcastSeriesFilters) {
  return useQuery({
    queryKey: podcastSeriesKeys.list(filters),
    queryFn: () =>
      fetchApi<PodcastSeries[]>(`/api/simplified/podcast-series${buildQueryString(filters)}`),
  });
}

export function usePodcastSeries(id: string) {
  return useQuery({
    queryKey: podcastSeriesKeys.detail(id),
    queryFn: () =>
      fetchApi<PodcastSeries>(`/api/simplified/podcast-series?id=${id}`),
    enabled: !!id,
  });
}

export function usePodcastSeriesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PodcastSeriesCreate) =>
      fetchApi<PodcastSeries>(`/api/simplified/podcast-series`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: podcastSeriesKeys.lists() });
    },
  });
}

export function usePodcastSeriesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: PodcastSeriesUpdate & { id: string }) =>
      fetchApi<PodcastSeries>(`/api/simplified/podcast-series`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: podcastSeriesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: podcastSeriesKeys.detail(variables.id),
      });
    },
  });
}

export function usePodcastSeriesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/podcast-series?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: podcastSeriesKeys.lists() });
    },
  });
}
