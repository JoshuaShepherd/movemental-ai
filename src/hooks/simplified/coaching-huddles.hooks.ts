import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  CoachingHuddles,
  CoachingHuddlesCreate,
  CoachingHuddlesUpdate,
  CoachingHuddlesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const coachingHuddlesKeys = {
  all: ["coachingHuddles"] as const,
  lists: () => [...coachingHuddlesKeys.all, "list"] as const,
  list: (filters?: CoachingHuddlesFilters) => [...coachingHuddlesKeys.lists(), filters] as const,
  details: () => [...coachingHuddlesKeys.all, "detail"] as const,
  detail: (id: string) => [...coachingHuddlesKeys.details(), id] as const,
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

export function useCoachingHuddlesList(filters?: CoachingHuddlesFilters) {
  return useQuery({
    queryKey: coachingHuddlesKeys.list(filters),
    queryFn: () =>
      fetchApi<CoachingHuddles[]>(`/api/simplified/coaching-huddles${buildQueryString(filters)}`),
  });
}

export function useCoachingHuddles(id: string) {
  return useQuery({
    queryKey: coachingHuddlesKeys.detail(id),
    queryFn: () =>
      fetchApi<CoachingHuddles>(`/api/simplified/coaching-huddles?id=${id}`),
    enabled: !!id,
  });
}

export function useCoachingHuddlesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CoachingHuddlesCreate) =>
      fetchApi<CoachingHuddles>(`/api/simplified/coaching-huddles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: coachingHuddlesKeys.lists() });
    },
  });
}

export function useCoachingHuddlesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: CoachingHuddlesUpdate & { id: string }) =>
      fetchApi<CoachingHuddles>(`/api/simplified/coaching-huddles`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: coachingHuddlesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: coachingHuddlesKeys.detail(variables.id),
      });
    },
  });
}

export function useCoachingHuddlesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/coaching-huddles?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: coachingHuddlesKeys.lists() });
    },
  });
}
