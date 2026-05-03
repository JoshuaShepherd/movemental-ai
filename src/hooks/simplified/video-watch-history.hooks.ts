import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  VideoWatchHistory,
  VideoWatchHistoryCreate,
  VideoWatchHistoryUpdate,
  VideoWatchHistoryFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const videoWatchHistoryKeys = {
  all: ["videoWatchHistory"] as const,
  lists: () => [...videoWatchHistoryKeys.all, "list"] as const,
  list: (filters?: VideoWatchHistoryFilters) => [...videoWatchHistoryKeys.lists(), filters] as const,
  details: () => [...videoWatchHistoryKeys.all, "detail"] as const,
  detail: (id: string) => [...videoWatchHistoryKeys.details(), id] as const,
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

export function useVideoWatchHistoryList(filters?: VideoWatchHistoryFilters) {
  return useQuery({
    queryKey: videoWatchHistoryKeys.list(filters),
    queryFn: () =>
      fetchApi<VideoWatchHistory[]>(`/api/simplified/video-watch-history${buildQueryString(filters)}`),
  });
}

export function useVideoWatchHistory(id: string) {
  return useQuery({
    queryKey: videoWatchHistoryKeys.detail(id),
    queryFn: () =>
      fetchApi<VideoWatchHistory>(`/api/simplified/video-watch-history?id=${id}`),
    enabled: !!id,
  });
}

export function useVideoWatchHistoryCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: VideoWatchHistoryCreate) =>
      fetchApi<VideoWatchHistory>(`/api/simplified/video-watch-history`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: videoWatchHistoryKeys.lists() });
    },
  });
}

export function useVideoWatchHistoryUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: VideoWatchHistoryUpdate & { id: string }) =>
      fetchApi<VideoWatchHistory>(`/api/simplified/video-watch-history`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: videoWatchHistoryKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: videoWatchHistoryKeys.detail(variables.id),
      });
    },
  });
}

export function useVideoWatchHistoryDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/video-watch-history?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: videoWatchHistoryKeys.lists() });
    },
  });
}
