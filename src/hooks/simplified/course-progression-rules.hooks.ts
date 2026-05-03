import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  CourseProgressionRules,
  CourseProgressionRulesCreate,
  CourseProgressionRulesUpdate,
  CourseProgressionRulesFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const courseProgressionRulesKeys = {
  all: ["courseProgressionRules"] as const,
  lists: () => [...courseProgressionRulesKeys.all, "list"] as const,
  list: (filters?: CourseProgressionRulesFilters) => [...courseProgressionRulesKeys.lists(), filters] as const,
  details: () => [...courseProgressionRulesKeys.all, "detail"] as const,
  detail: (id: string) => [...courseProgressionRulesKeys.details(), id] as const,
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

export function useCourseProgressionRulesList(filters?: CourseProgressionRulesFilters) {
  return useQuery({
    queryKey: courseProgressionRulesKeys.list(filters),
    queryFn: () =>
      fetchApi<CourseProgressionRules[]>(`/api/simplified/course-progression-rules${buildQueryString(filters)}`),
  });
}

export function useCourseProgressionRules(id: string) {
  return useQuery({
    queryKey: courseProgressionRulesKeys.detail(id),
    queryFn: () =>
      fetchApi<CourseProgressionRules>(`/api/simplified/course-progression-rules?id=${id}`),
    enabled: !!id,
  });
}

export function useCourseProgressionRulesCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CourseProgressionRulesCreate) =>
      fetchApi<CourseProgressionRules>(`/api/simplified/course-progression-rules`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseProgressionRulesKeys.lists() });
    },
  });
}

export function useCourseProgressionRulesUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: CourseProgressionRulesUpdate & { id: string }) =>
      fetchApi<CourseProgressionRules>(`/api/simplified/course-progression-rules`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: courseProgressionRulesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: courseProgressionRulesKeys.detail(variables.id),
      });
    },
  });
}

export function useCourseProgressionRulesDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/course-progression-rules?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseProgressionRulesKeys.lists() });
    },
  });
}
