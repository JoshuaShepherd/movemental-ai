import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  VideoRecordingSegments,
  VideoRecordingSegmentsCreate,
  VideoRecordingSegmentsUpdate,
  VideoRecordingSegmentsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const videoRecordingSegmentsKeys = {
  all: ["videoRecordingSegments"] as const,
  lists: () => [...videoRecordingSegmentsKeys.all, "list"] as const,
  list: (filters?: VideoRecordingSegmentsFilters) => [...videoRecordingSegmentsKeys.lists(), filters] as const,
  details: () => [...videoRecordingSegmentsKeys.all, "detail"] as const,
  detail: (id: string) => [...videoRecordingSegmentsKeys.details(), id] as const,
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

export function useVideoRecordingSegmentsList(filters?: VideoRecordingSegmentsFilters) {
  return useQuery({
    queryKey: videoRecordingSegmentsKeys.list(filters),
    queryFn: () =>
      fetchApi<VideoRecordingSegments[]>(`/api/simplified/video-recording-segments${buildQueryString(filters)}`),
  });
}

export function useVideoRecordingSegments(id: string) {
  return useQuery({
    queryKey: videoRecordingSegmentsKeys.detail(id),
    queryFn: () =>
      fetchApi<VideoRecordingSegments>(`/api/simplified/video-recording-segments?id=${id}`),
    enabled: !!id,
  });
}

export function useVideoRecordingSegmentsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: VideoRecordingSegmentsCreate) =>
      fetchApi<VideoRecordingSegments>(`/api/simplified/video-recording-segments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: videoRecordingSegmentsKeys.lists() });
    },
  });
}

export function useVideoRecordingSegmentsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: VideoRecordingSegmentsUpdate & { id: string }) =>
      fetchApi<VideoRecordingSegments>(`/api/simplified/video-recording-segments`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: videoRecordingSegmentsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: videoRecordingSegmentsKeys.detail(variables.id),
      });
    },
  });
}

export function useVideoRecordingSegmentsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/video-recording-segments?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: videoRecordingSegmentsKeys.lists() });
    },
  });
}
