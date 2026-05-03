import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  VideoRecordings,
  VideoRecordingsCreate,
  VideoRecordingsUpdate,
  VideoRecordingsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const videoRecordingsKeys = {
  all: ["videoRecordings"] as const,
  lists: () => [...videoRecordingsKeys.all, "list"] as const,
  list: (filters?: VideoRecordingsFilters) => [...videoRecordingsKeys.lists(), filters] as const,
  details: () => [...videoRecordingsKeys.all, "detail"] as const,
  detail: (id: string) => [...videoRecordingsKeys.details(), id] as const,
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

export function useVideoRecordingsList(filters?: VideoRecordingsFilters) {
  return useQuery({
    queryKey: videoRecordingsKeys.list(filters),
    queryFn: () =>
      fetchApi<VideoRecordings[]>(`/api/simplified/video-recordings${buildQueryString(filters)}`),
  });
}

export function useVideoRecordings(id: string) {
  return useQuery({
    queryKey: videoRecordingsKeys.detail(id),
    queryFn: () =>
      fetchApi<VideoRecordings>(`/api/simplified/video-recordings?id=${id}`),
    enabled: !!id,
  });
}

export function useVideoRecordingsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: VideoRecordingsCreate) =>
      fetchApi<VideoRecordings>(`/api/simplified/video-recordings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: videoRecordingsKeys.lists() });
    },
  });
}

export function useVideoRecordingsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: VideoRecordingsUpdate & { id: string }) =>
      fetchApi<VideoRecordings>(`/api/simplified/video-recordings`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: videoRecordingsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: videoRecordingsKeys.detail(variables.id),
      });
    },
  });
}

export function useVideoRecordingsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/video-recordings?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: videoRecordingsKeys.lists() });
    },
  });
}
