"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type {
  OnbuildingAdminLeader,
  OnbuildingAdminSection,
  OnbuildingSectionCreate,
  OnbuildingSectionUpdate,
} from "@/lib/schemas/onbuilding-admin";

type ApiSuccess<T> = { success: true; data: T };
type ApiError = { error: { code: string; message: string } };

async function fetchAdmin<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, { credentials: "include", ...init });
  const json = (await res.json()) as ApiSuccess<T> | ApiError;
  if (!res.ok || "error" in json) {
    const msg = "error" in json ? json.error.message : "Request failed";
    throw new Error(msg);
  }
  return json.data;
}

export const onbuildingAdminKeys = {
  all: ["onbuildingAdmin"] as const,
  leaders: () => [...onbuildingAdminKeys.all, "leaders"] as const,
  sections: (leaderId: string) => [...onbuildingAdminKeys.all, "sections", leaderId] as const,
  section: (id: string) => [...onbuildingAdminKeys.all, "section", id] as const,
};

export function useOnbuildingAdminLeaders() {
  return useQuery({
    queryKey: onbuildingAdminKeys.leaders(),
    queryFn: () => fetchAdmin<{ leaders: OnbuildingAdminLeader[] }>("/api/admin/onbuilding/leaders"),
  });
}

export function useOnbuildingAdminSections(leaderId: string | null) {
  return useQuery({
    queryKey: onbuildingAdminKeys.sections(leaderId ?? "none"),
    queryFn: () =>
      fetchAdmin<{ sections: OnbuildingAdminSection[] }>(
        `/api/admin/onbuilding/sections?movementLeaderId=${leaderId}`,
      ),
    enabled: Boolean(leaderId),
  });
}

export function useOnbuildingAdminMutations(leaderId: string | null) {
  const queryClient = useQueryClient();

  const invalidate = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: onbuildingAdminKeys.leaders() }),
      leaderId
        ? queryClient.invalidateQueries({ queryKey: onbuildingAdminKeys.sections(leaderId) })
        : Promise.resolve(),
    ]);
  };

  const createSection = useMutation({
    mutationFn: (input: OnbuildingSectionCreate) =>
      fetchAdmin<{ section: OnbuildingAdminSection }>("/api/admin/onbuilding/sections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      }),
    onSuccess: invalidate,
  });

  const updateSection = useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: OnbuildingSectionUpdate }) =>
      fetchAdmin<{ section: OnbuildingAdminSection }>(`/api/admin/onbuilding/sections/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      }),
    onSuccess: invalidate,
  });

  const deleteSection = useMutation({
    mutationFn: (id: string) =>
      fetchAdmin<{ id: string }>(`/api/admin/onbuilding/sections/${id}`, { method: "DELETE" }),
    onSuccess: invalidate,
  });

  const reorderSections = useMutation({
    mutationFn: (orderedSectionIds: string[]) =>
      fetchAdmin<{ sections: OnbuildingAdminSection[] }>(
        "/api/admin/onbuilding/sections/reorder",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ movementLeaderId: leaderId, orderedSectionIds }),
        },
      ),
    onSuccess: invalidate,
  });

  const reseedSections = useMutation({
    mutationFn: () =>
      fetchAdmin<{ inserted: number }>("/api/admin/onbuilding/sections/reseed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movementLeaderId: leaderId }),
      }),
    onSuccess: invalidate,
  });

  return { createSection, updateSection, deleteSection, reorderSections, reseedSections };
}
