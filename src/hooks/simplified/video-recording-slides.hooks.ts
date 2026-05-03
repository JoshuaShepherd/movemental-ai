import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  VideoRecordingSlides,
  VideoRecordingSlidesCreate,
  VideoRecordingSlidesUpdate,
  VideoRecordingSlidesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const videoRecordingSlidesKeys = {
  all: ["videoRecordingSlides"] as const,
  lists: () => [...videoRecordingSlidesKeys.all, "list"] as const,
  list: (filters?: VideoRecordingSlidesFilters) => [...videoRecordingSlidesKeys.lists(), filters] as const,
  details: () => [...videoRecordingSlidesKeys.all, "detail"] as const,
  detail: (id: string) => [...videoRecordingSlidesKeys.details(), id] as const,
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

export function useVideoRecordingSlidesList(filters?: VideoRecordingSlidesFilters) {
  return useQuery({
    queryKey: videoRecordingSlidesKeys.list(filters),
    queryFn: () =>
      fetchApi<VideoRecordingSlides[]>(`/api/simplified/video-recording-slides${buildQueryString(filters)}`),
  });
}

export function useVideoRecordingSlides(id: string) {
  return useQuery({
    queryKey: videoRecordingSlidesKeys.detail(id),
    queryFn: () =>
      fetchApi<VideoRecordingSlides>(`/api/simplified/video-recording-slides?id=${id}`),
    enabled: !!id,
  });
}

export function useVideoRecordingSlidesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: VideoRecordingSlidesCreate) =>
      fetchApi<VideoRecordingSlides>(`/api/simplified/video-recording-slides`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: videoRecordingSlidesKeys.lists() });
    },
  });
}

export function useVideoRecordingSlidesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: VideoRecordingSlidesUpdate & { id: string }) =>
      fetchApi<VideoRecordingSlides>(`/api/simplified/video-recording-slides`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: videoRecordingSlidesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: videoRecordingSlidesKeys.detail(variables.id),
      });
    },
  });
}

export function useVideoRecordingSlidesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/video-recording-slides?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: videoRecordingSlidesKeys.lists() });
    },
  });
}
