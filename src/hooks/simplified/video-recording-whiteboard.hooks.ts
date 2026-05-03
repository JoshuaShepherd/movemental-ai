import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  VideoRecordingWhiteboard,
  VideoRecordingWhiteboardCreate,
  VideoRecordingWhiteboardUpdate,
  VideoRecordingWhiteboardFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const videoRecordingWhiteboardKeys = {
  all: ["videoRecordingWhiteboard"] as const,
  lists: () => [...videoRecordingWhiteboardKeys.all, "list"] as const,
  list: (filters?: VideoRecordingWhiteboardFilters) => [...videoRecordingWhiteboardKeys.lists(), filters] as const,
  details: () => [...videoRecordingWhiteboardKeys.all, "detail"] as const,
  detail: (id: string) => [...videoRecordingWhiteboardKeys.details(), id] as const,
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

export function useVideoRecordingWhiteboardList(filters?: VideoRecordingWhiteboardFilters) {
  return useQuery({
    queryKey: videoRecordingWhiteboardKeys.list(filters),
    queryFn: () =>
      fetchApi<VideoRecordingWhiteboard[]>(`/api/simplified/video-recording-whiteboard${buildQueryString(filters)}`),
  });
}

export function useVideoRecordingWhiteboard(id: string) {
  return useQuery({
    queryKey: videoRecordingWhiteboardKeys.detail(id),
    queryFn: () =>
      fetchApi<VideoRecordingWhiteboard>(`/api/simplified/video-recording-whiteboard?id=${id}`),
    enabled: !!id,
  });
}

export function useVideoRecordingWhiteboardCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: VideoRecordingWhiteboardCreate) =>
      fetchApi<VideoRecordingWhiteboard>(`/api/simplified/video-recording-whiteboard`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: videoRecordingWhiteboardKeys.lists() });
    },
  });
}

export function useVideoRecordingWhiteboardUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: VideoRecordingWhiteboardUpdate & { id: string }) =>
      fetchApi<VideoRecordingWhiteboard>(`/api/simplified/video-recording-whiteboard`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: videoRecordingWhiteboardKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: videoRecordingWhiteboardKeys.detail(variables.id),
      });
    },
  });
}

export function useVideoRecordingWhiteboardDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/video-recording-whiteboard?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: videoRecordingWhiteboardKeys.lists() });
    },
  });
}
