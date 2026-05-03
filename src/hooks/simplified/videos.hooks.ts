import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  Videos,
  VideosCreate,
  VideosUpdate,
  VideosFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const videosKeys = {
  all: ["videos"] as const,
  lists: () => [...videosKeys.all, "list"] as const,
  list: (filters?: VideosFilters) => [...videosKeys.lists(), filters] as const,
  details: () => [...videosKeys.all, "detail"] as const,
  detail: (id: string) => [...videosKeys.details(), id] as const,
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

export function useVideosList(filters?: VideosFilters) {
  return useQuery({
    queryKey: videosKeys.list(filters),
    queryFn: () =>
      fetchApi<Videos[]>(`/api/simplified/videos${buildQueryString(filters)}`),
  });
}

export function useVideos(id: string) {
  return useQuery({
    queryKey: videosKeys.detail(id),
    queryFn: () =>
      fetchApi<Videos>(`/api/simplified/videos?id=${id}`),
    enabled: !!id,
  });
}

export function useVideosCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: VideosCreate) =>
      fetchApi<Videos>(`/api/simplified/videos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: videosKeys.lists() });
    },
  });
}

export function useVideosUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: VideosUpdate & { id: string }) =>
      fetchApi<Videos>(`/api/simplified/videos`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: videosKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: videosKeys.detail(variables.id),
      });
    },
  });
}

export function useVideosDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/videos?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: videosKeys.lists() });
    },
  });
}
