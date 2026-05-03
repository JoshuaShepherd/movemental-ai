import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  Communities,
  CommunitiesCreate,
  CommunitiesUpdate,
  CommunitiesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const communitiesKeys = {
  all: ["communities"] as const,
  lists: () => [...communitiesKeys.all, "list"] as const,
  list: (filters?: CommunitiesFilters) => [...communitiesKeys.lists(), filters] as const,
  details: () => [...communitiesKeys.all, "detail"] as const,
  detail: (id: string) => [...communitiesKeys.details(), id] as const,
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

export function useCommunitiesList(filters?: CommunitiesFilters) {
  return useQuery({
    queryKey: communitiesKeys.list(filters),
    queryFn: () =>
      fetchApi<Communities[]>(`/api/simplified/communities${buildQueryString(filters)}`),
  });
}

export function useCommunities(id: string) {
  return useQuery({
    queryKey: communitiesKeys.detail(id),
    queryFn: () =>
      fetchApi<Communities>(`/api/simplified/communities?id=${id}`),
    enabled: !!id,
  });
}

export function useCommunitiesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CommunitiesCreate) =>
      fetchApi<Communities>(`/api/simplified/communities`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: communitiesKeys.lists() });
    },
  });
}

export function useCommunitiesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: CommunitiesUpdate & { id: string }) =>
      fetchApi<Communities>(`/api/simplified/communities`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: communitiesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: communitiesKeys.detail(variables.id),
      });
    },
  });
}

export function useCommunitiesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/communities?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: communitiesKeys.lists() });
    },
  });
}
