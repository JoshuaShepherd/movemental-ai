import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  SitePages,
  SitePagesCreate,
  SitePagesUpdate,
  SitePagesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const sitePagesKeys = {
  all: ["sitePages"] as const,
  lists: () => [...sitePagesKeys.all, "list"] as const,
  list: (filters?: SitePagesFilters) => [...sitePagesKeys.lists(), filters] as const,
  details: () => [...sitePagesKeys.all, "detail"] as const,
  detail: (id: string) => [...sitePagesKeys.details(), id] as const,
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

export function useSitePagesList(filters?: SitePagesFilters) {
  return useQuery({
    queryKey: sitePagesKeys.list(filters),
    queryFn: () =>
      fetchApi<SitePages[]>(`/api/simplified/site-pages${buildQueryString(filters)}`),
  });
}

export function useSitePages(id: string) {
  return useQuery({
    queryKey: sitePagesKeys.detail(id),
    queryFn: () =>
      fetchApi<SitePages>(`/api/simplified/site-pages?id=${id}`),
    enabled: !!id,
  });
}

export function useSitePagesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SitePagesCreate) =>
      fetchApi<SitePages>(`/api/simplified/site-pages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sitePagesKeys.lists() });
    },
  });
}

export function useSitePagesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: SitePagesUpdate & { id: string }) =>
      fetchApi<SitePages>(`/api/simplified/site-pages`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: sitePagesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: sitePagesKeys.detail(variables.id),
      });
    },
  });
}

export function useSitePagesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/site-pages?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sitePagesKeys.lists() });
    },
  });
}
