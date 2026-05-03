import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  CourseAnnouncements,
  CourseAnnouncementsCreate,
  CourseAnnouncementsUpdate,
  CourseAnnouncementsFilters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const courseAnnouncementsKeys = {
  all: ["courseAnnouncements"] as const,
  lists: () => [...courseAnnouncementsKeys.all, "list"] as const,
  list: (filters?: CourseAnnouncementsFilters) => [...courseAnnouncementsKeys.lists(), filters] as const,
  details: () => [...courseAnnouncementsKeys.all, "detail"] as const,
  detail: (id: string) => [...courseAnnouncementsKeys.details(), id] as const,
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

export function useCourseAnnouncementsList(filters?: CourseAnnouncementsFilters) {
  return useQuery({
    queryKey: courseAnnouncementsKeys.list(filters),
    queryFn: () =>
      fetchApi<CourseAnnouncements[]>(`/api/simplified/course-announcements${buildQueryString(filters)}`),
  });
}

export function useCourseAnnouncements(id: string) {
  return useQuery({
    queryKey: courseAnnouncementsKeys.detail(id),
    queryFn: () =>
      fetchApi<CourseAnnouncements>(`/api/simplified/course-announcements?id=${id}`),
    enabled: !!id,
  });
}

export function useCourseAnnouncementsCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CourseAnnouncementsCreate) =>
      fetchApi<CourseAnnouncements>(`/api/simplified/course-announcements`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseAnnouncementsKeys.lists() });
    },
  });
}

export function useCourseAnnouncementsUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: CourseAnnouncementsUpdate & { id: string }) =>
      fetchApi<CourseAnnouncements>(`/api/simplified/course-announcements`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: courseAnnouncementsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: courseAnnouncementsKeys.detail(variables.id),
      });
    },
  });
}

export function useCourseAnnouncementsDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/simplified/course-announcements?id=${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseAnnouncementsKeys.lists() });
    },
  });
}
