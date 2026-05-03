import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  VideoSeries,
  VideoSeriesCreate,
  VideoSeriesUpdate,
  VideoSeriesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const videoSeriesKeys = {
  all: ["videoSeries"] as const,
  lists: () => [...videoSeriesKeys.all, "list"] as const,
  list: (filters?: VideoSeriesFilters) => [...videoSeriesKeys.lists(), filters] as const,
  details: () => [...videoSeriesKeys.all, "detail"] as const,
  detail: (id: string) => [...videoSeriesKeys.details(), id] as const,
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

export function useVideoSeriesList(filters?: VideoSeriesFilters) {
  return useQuery({
    queryKey: videoSeriesKeys.list(filters),
    queryFn: () =>
      fetchApi<VideoSeries[]>(`/api/simplified/video-series${buildQueryString(filters)}`),
  });
}

export function useVideoSeries(id: string) {
  return useQuery({
    queryKey: videoSeriesKeys.detail(id),
    queryFn: () =>
      fetchApi<VideoSeries>(`/api/simplified/video-series?id=${id}`),
    enabled: !!id,
  });
}

export function useVideoSeriesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: VideoSeriesCreate) =>
      fetchApi<VideoSeries>(`/api/simplified/video-series`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: videoSeriesKeys.lists() });
    },
  });
}

export function useVideoSeriesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: VideoSeriesUpdate & { id: string }) =>
      fetchApi<VideoSeries>(`/api/simplified/video-series`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: videoSeriesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: videoSeriesKeys.detail(variables.id),
      });
    },
  });
}

export function useVideoSeriesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/video-series?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: videoSeriesKeys.lists() });
    },
  });
}
