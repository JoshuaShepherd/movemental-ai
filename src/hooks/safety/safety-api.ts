import type {
  AskGuidebookResultVM,
  EngagementProgress,
  GuidebookSummary,
  LayerDetailVM,
  RatificationVM,
  ReviewCommentVM,
  RolloutArtifactVM,
  RoleAccessMatrixEntry,
  SignatureVM,
} from "@/lib/safety/types";
import type { CreateEnrollmentInput } from "@/lib/safety/schemas";
import type { SafetyEnrollmentRow } from "@/lib/safety/db-types";

type ApiSuccess<T> = { success: true; data: T };
type ApiError = { error: { code: string; message: string } };

async function fetchSafety<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  const json = (await res.json()) as ApiSuccess<T> | ApiError;
  if (!res.ok || "error" in json) {
    const msg = "error" in json ? json.error.message : "Request failed";
    throw new Error(msg);
  }
  return json.data;
}

async function postSafetyAction<T>(action: string, payload: unknown): Promise<T> {
  return fetchSafety<T>("/api/safety/workspace", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, payload }),
  });
}

export const safetyKeys = {
  all: ["safety"] as const,
  engagement: (orgId: string) => [...safetyKeys.all, "engagement", orgId] as const,
  guidebook: (orgId: string) => [...safetyKeys.all, "guidebook", orgId] as const,
  layer: (artifactId: string) => [...safetyKeys.all, "layer", artifactId] as const,
  comments: (guidebookId: string, artifactId?: string) =>
    [...safetyKeys.all, "comments", guidebookId, artifactId ?? "all"] as const,
  signatures: (guidebookId: string) => [...safetyKeys.all, "signatures", guidebookId] as const,
  ratification: (guidebookId: string) => [...safetyKeys.all, "ratification", guidebookId] as const,
  rollout: (guidebookId: string) => [...safetyKeys.all, "rollout", guidebookId] as const,
  roleAccess: (orgId: string) => [...safetyKeys.all, "roleAccess", orgId] as const,
  enrollment: (enrollmentId: string) => [...safetyKeys.all, "enrollment", enrollmentId] as const,
};

export function fetchEngagement(orgId: string) {
  return fetchSafety<EngagementProgress | null>(
    `/api/safety/workspace?resource=engagement&organization_id=${orgId}`,
  );
}

export function fetchGuidebook(orgId: string) {
  return fetchSafety<GuidebookSummary | null>(
    `/api/safety/workspace?resource=guidebook&organization_id=${orgId}`,
  );
}

export function fetchLayer(artifactId: string) {
  return fetchSafety<LayerDetailVM | null>(
    `/api/safety/workspace?resource=layer&artifact_id=${artifactId}`,
  );
}

export function fetchComments(guidebookId: string, artifactId?: string, openOnly?: boolean) {
  const params = new URLSearchParams({ resource: "comments", guidebook_id: guidebookId });
  if (artifactId) params.set("artifact_id", artifactId);
  if (openOnly) params.set("open_only", "1");
  return fetchSafety<ReviewCommentVM[]>(`/api/safety/workspace?${params}`);
}

export function fetchSignatures(guidebookId: string) {
  return fetchSafety<SignatureVM[]>(
    `/api/safety/workspace?resource=signatures&guidebook_id=${guidebookId}`,
  );
}

export function fetchRatification(guidebookId: string) {
  return fetchSafety<RatificationVM | null>(
    `/api/safety/workspace?resource=ratification&guidebook_id=${guidebookId}`,
  );
}

export function fetchRolloutArtifacts(guidebookId: string) {
  return fetchSafety<RolloutArtifactVM[]>(
    `/api/safety/workspace?resource=rollout&guidebook_id=${guidebookId}`,
  );
}

export function fetchRoleAccess(orgId: string) {
  return fetchSafety<RoleAccessMatrixEntry[]>(
    `/api/safety/workspace?resource=role_access&organization_id=${orgId}`,
  );
}

export function fetchEnrollment(enrollmentId: string) {
  return fetchSafety<SafetyEnrollmentRow>(
    `/api/safety/enrollment?enrollment_id=${enrollmentId}`,
  );
}

export function createEnrollment(input: CreateEnrollmentInput) {
  return fetchSafety<{ enrollmentId: string }>("/api/safety/enrollment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
}

export function updateEnrollment(enrollmentId: string, patch: Partial<CreateEnrollmentInput>) {
  return fetchSafety<SafetyEnrollmentRow>("/api/safety/enrollment", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ enrollment_id: enrollmentId, ...patch }),
  });
}

export function createCheckout(enrollmentId: string) {
  return fetchSafety<{ sessionId: string; url: string }>("/api/safety/enrollment/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ enrollment_id: enrollmentId }),
  });
}

export function askGuidebook(organizationId: string, question: string) {
  return postSafetyAction<AskGuidebookResultVM & { questionId: string }>("ask_guidebook", {
    organization_id: organizationId,
    question,
  });
}

export { postSafetyAction };
