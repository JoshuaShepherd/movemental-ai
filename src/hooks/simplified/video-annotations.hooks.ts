import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  VideoAnnotations,
  VideoAnnotationsCreate,
  VideoAnnotationsUpdate,
  VideoAnnotationsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const videoAnnotationsKeys = {
  all: ["videoAnnotations"] as const,
  lists: () => [...videoAnnotationsKeys.all, "list"] as const,
  list: (filters?: VideoAnnotationsFilters) => [...videoAnnotationsKeys.lists(), filters] as const,
  details: () => [...videoAnnotationsKeys.all, "detail"] as const,
  detail: (id: string) => [...videoAnnotationsKeys.details(), id] as const,
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

export function useVideoAnnotationsList(filters?: VideoAnnotationsFilters) {
  return useQuery({
    queryKey: videoAnnotationsKeys.list(filters),
    queryFn: () =>
      fetchApi<VideoAnnotations[]>(`/api/simplified/video-annotations${buildQueryString(filters)}`),
  });
}

export function useVideoAnnotations(id: string) {
  return useQuery({
    queryKey: videoAnnotationsKeys.detail(id),
    queryFn: () =>
      fetchApi<VideoAnnotations>(`/api/simplified/video-annotations?id=${id}`),
    enabled: !!id,
  });
}

export function useVideoAnnotationsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: VideoAnnotationsCreate) =>
      fetchApi<VideoAnnotations>(`/api/simplified/video-annotations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: videoAnnotationsKeys.lists() });
    },
  });
}

export function useVideoAnnotationsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: VideoAnnotationsUpdate & { id: string }) =>
      fetchApi<VideoAnnotations>(`/api/simplified/video-annotations`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: videoAnnotationsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: videoAnnotationsKeys.detail(variables.id),
      });
    },
  });
}

export function useVideoAnnotationsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/video-annotations?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: videoAnnotationsKeys.lists() });
    },
  });
}
