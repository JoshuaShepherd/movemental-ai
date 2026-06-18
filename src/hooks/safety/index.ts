"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createCheckout,
  createEnrollment,
  fetchComments,
  fetchEngagement,
  fetchEnrollment,
  fetchGuidebook,
  fetchLayer,
  fetchRatification,
  fetchRolloutArtifacts,
  fetchRoleAccess,
  fetchSignatures,
  postSafetyAction,
  safetyKeys,
  updateEnrollment,
} from "@/hooks/safety/safety-api";
import type { CreateEnrollmentInput } from "@/lib/safety/schemas";

export function useSafetyEngagement(organizationId: string) {
  return useQuery({
    queryKey: safetyKeys.engagement(organizationId),
    queryFn: () => fetchEngagement(organizationId),
    enabled: Boolean(organizationId),
  });
}

export function useGuidebook(organizationId: string) {
  return useQuery({
    queryKey: safetyKeys.guidebook(organizationId),
    queryFn: () => fetchGuidebook(organizationId),
    enabled: Boolean(organizationId),
  });
}

export function useLayer(artifactId: string) {
  return useQuery({
    queryKey: safetyKeys.layer(artifactId),
    queryFn: () => fetchLayer(artifactId),
    enabled: Boolean(artifactId),
  });
}

export function useLayerChecklist(artifactId: string) {
  const layer = useLayer(artifactId);
  return {
    ...layer,
    data: layer.data?.checklist ?? [],
  };
}

export function useReviewComments(guidebookId: string, opts?: { artifactId?: string; openOnly?: boolean }) {
  return useQuery({
    queryKey: safetyKeys.comments(guidebookId, opts?.artifactId),
    queryFn: () => fetchComments(guidebookId, opts?.artifactId, opts?.openOnly),
    enabled: Boolean(guidebookId),
  });
}

export function useAddComment(guidebookId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: {
      artifact_id: string;
      body: string;
      clause_ref?: string;
      quoted_snippet?: string;
      parent_id?: string;
    }) =>
      postSafetyAction<{ id: string }>("add_comment", {
        guidebook_id: guidebookId,
        ...payload,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: safetyKeys.comments(guidebookId) });
    },
  });
}

export function useResolveComment(guidebookId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentId: string) =>
      postSafetyAction<void>("resolve_comment", { comment_id: commentId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: safetyKeys.comments(guidebookId) });
    },
  });
}

export function useSignatures(guidebookId: string) {
  return useQuery({
    queryKey: safetyKeys.signatures(guidebookId),
    queryFn: () => fetchSignatures(guidebookId),
    enabled: Boolean(guidebookId),
  });
}

export function useRequestSignature(guidebookId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: {
      signer_name: string;
      signer_role?: string;
      signer_user_id?: string;
      version_number?: number;
    }) =>
      postSafetyAction<{ id: string }>("request_signature", {
        guidebook_id: guidebookId,
        ...payload,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: safetyKeys.signatures(guidebookId) });
    },
  });
}

export function useRecordSignature(guidebookId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { signature_id: string; signature: string }) =>
      postSafetyAction<void>("record_signature", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: safetyKeys.signatures(guidebookId) });
    },
  });
}

export function useRatification(guidebookId: string) {
  return useQuery({
    queryKey: safetyKeys.ratification(guidebookId),
    queryFn: () => fetchRatification(guidebookId),
    enabled: Boolean(guidebookId),
  });
}

export function useRecordRatification(guidebookId: string, organizationId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: {
      version_number: number;
      board_chair_name: string;
      board_chair_signature: string;
      facilitator_name?: string;
      governance_process_note?: string;
      notes?: string;
    }) =>
      postSafetyAction<{ id: string }>("record_ratification", {
        guidebook_id: guidebookId,
        ...payload,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: safetyKeys.ratification(guidebookId) });
      queryClient.invalidateQueries({ queryKey: safetyKeys.guidebook(organizationId) });
    },
  });
}

export function useRolloutArtifacts(guidebookId: string) {
  return useQuery({
    queryKey: safetyKeys.rollout(guidebookId),
    queryFn: () => fetchRolloutArtifacts(guidebookId),
    enabled: Boolean(guidebookId),
  });
}

export function useAskGuidebook(organizationId: string) {
  return useMutation({
    mutationFn: (question: string) =>
      postSafetyAction<{
        questionId: string;
        matchedArtifactId: string | null;
        matchedClauseRef: string | null;
        answerSnippet: string | null;
      }>("ask_guidebook", { organization_id: organizationId, question }),
  });
}

export function useRoleAccess(organizationId: string) {
  return useQuery({
    queryKey: safetyKeys.roleAccess(organizationId),
    queryFn: () => fetchRoleAccess(organizationId),
    enabled: Boolean(organizationId),
  });
}

export function useEnrollment(enrollmentId: string | null) {
  return useQuery({
    queryKey: safetyKeys.enrollment(enrollmentId ?? "none"),
    queryFn: () => fetchEnrollment(enrollmentId!),
    enabled: Boolean(enrollmentId),
  });
}

export function useCreateEnrollment() {
  return useMutation({
    mutationFn: (input: CreateEnrollmentInput) => createEnrollment(input),
  });
}

export function useUpdateEnrollment(enrollmentId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (patch: Partial<CreateEnrollmentInput>) => updateEnrollment(enrollmentId, patch),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: safetyKeys.enrollment(enrollmentId) });
    },
  });
}

export function useCheckout() {
  return useMutation({
    mutationFn: (enrollmentId: string) => createCheckout(enrollmentId),
  });
}

export function useUpsertLayerBody(artifactId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body_md: string) =>
      postSafetyAction<void>("upsert_layer_body", { artifact_id: artifactId, body_md }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: safetyKeys.layer(artifactId) });
    },
  });
}

export function useToggleChecklistItem(artifactId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: { item_id: string; is_complete: boolean }) =>
      postSafetyAction<void>("toggle_checklist", params),
    onMutate: async (params) => {
      await queryClient.cancelQueries({ queryKey: safetyKeys.layer(artifactId) });
      const prev = queryClient.getQueryData<Awaited<ReturnType<typeof fetchLayer>>>(
        safetyKeys.layer(artifactId),
      );
      if (prev) {
        queryClient.setQueryData(safetyKeys.layer(artifactId), {
          ...prev,
          checklist: prev.checklist.map((item) =>
            item.id === params.item_id ? { ...item, isComplete: params.is_complete } : item,
          ),
        });
      }
      return { prev };
    },
    onError: (_e, _v, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(safetyKeys.layer(artifactId), ctx.prev);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: safetyKeys.layer(artifactId) });
    },
  });
}
