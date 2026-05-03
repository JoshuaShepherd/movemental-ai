import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  PodcastEpisodes,
  PodcastEpisodesCreate,
  PodcastEpisodesUpdate,
  PodcastEpisodesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const podcastEpisodesKeys = {
  all: ["podcastEpisodes"] as const,
  lists: () => [...podcastEpisodesKeys.all, "list"] as const,
  list: (filters?: PodcastEpisodesFilters) => [...podcastEpisodesKeys.lists(), filters] as const,
  details: () => [...podcastEpisodesKeys.all, "detail"] as const,
  detail: (id: string) => [...podcastEpisodesKeys.details(), id] as const,
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

export function usePodcastEpisodesList(filters?: PodcastEpisodesFilters) {
  return useQuery({
    queryKey: podcastEpisodesKeys.list(filters),
    queryFn: () =>
      fetchApi<PodcastEpisodes[]>(`/api/simplified/podcast-episodes${buildQueryString(filters)}`),
  });
}

export function usePodcastEpisodes(id: string) {
  return useQuery({
    queryKey: podcastEpisodesKeys.detail(id),
    queryFn: () =>
      fetchApi<PodcastEpisodes>(`/api/simplified/podcast-episodes?id=${id}`),
    enabled: !!id,
  });
}

export function usePodcastEpisodesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PodcastEpisodesCreate) =>
      fetchApi<PodcastEpisodes>(`/api/simplified/podcast-episodes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: podcastEpisodesKeys.lists() });
    },
  });
}

export function usePodcastEpisodesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: PodcastEpisodesUpdate & { id: string }) =>
      fetchApi<PodcastEpisodes>(`/api/simplified/podcast-episodes`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: podcastEpisodesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: podcastEpisodesKeys.detail(variables.id),
      });
    },
  });
}

export function usePodcastEpisodesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/podcast-episodes?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: podcastEpisodesKeys.lists() });
    },
  });
}
