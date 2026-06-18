import "server-only";

import type { SafetySupabaseClient } from "@/lib/safety/queries";
import type {
  AddCommentInput,
  RecordRatificationInput,
  RecordSignatureInput,
  RequestSignatureInput,
  ResolveCommentInput,
  ToggleChecklistItemInput,
  UpsertLayerBodyInput,
} from "@/lib/safety/mutations.types";

export type {
  AddCommentInput,
  RecordRatificationInput,
  RecordSignatureInput,
  RequestSignatureInput,
  ResolveCommentInput,
  ToggleChecklistItemInput,
  UpsertLayerBodyInput,
} from "@/lib/safety/mutations.types";

function nowIso(): string {
  return new Date().toISOString();
}

export async function upsertLayerBody(
  supabase: SafetySupabaseClient,
  input: UpsertLayerBodyInput,
  userId: string | null,
): Promise<void> {
  const { data: artifact, error: aErr } = await supabase
    .from("safety_artifacts")
    .select("id")
    .eq("id", input.artifact_id)
    .single();

  if (aErr || !artifact) throw new Error(aErr?.message ?? "Artifact not found.");

  const { data: latest, error: vErr } = await supabase
    .from("safety_artifact_versions")
    .select("version_number")
    .eq("artifact_id", input.artifact_id)
    .order("version_number", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (vErr) throw new Error(vErr.message);

  const versionNumber = (latest?.version_number ?? 0) + 1;

  const { error: insErr } = await supabase.from("safety_artifact_versions").insert({
    artifact_id: input.artifact_id,
    version_number: versionNumber,
    body_md: input.body_md,
    created_by_user_id: userId,
  });

  if (insErr) throw new Error(insErr.message);

  const { error: upErr } = await supabase
    .from("safety_artifacts")
    .update({ updated_at: nowIso() })
    .eq("id", input.artifact_id);

  if (upErr) throw new Error(upErr.message);
}

export async function toggleChecklistItem(
  supabase: SafetySupabaseClient,
  input: ToggleChecklistItemInput,
): Promise<void> {
  const { error } = await supabase
    .from("safety_layer_checklist_items")
    .update({ is_complete: input.is_complete })
    .eq("id", input.item_id);

  if (error) throw new Error(error.message);
}

export async function addComment(
  supabase: SafetySupabaseClient,
  input: AddCommentInput,
  userId: string | null,
): Promise<string> {
  const { data, error } = await supabase
    .from("safety_artifact_comments")
    .insert({
      guidebook_id: input.guidebook_id,
      artifact_id: input.artifact_id,
      body: input.body,
      clause_ref: input.clause_ref ?? null,
      quoted_snippet: input.quoted_snippet ?? null,
      parent_id: input.parent_id ?? null,
      author_user_id: userId,
    })
    .select("id")
    .single();

  if (error) throw new Error(error.message);
  return data.id;
}

export async function resolveComment(
  supabase: SafetySupabaseClient,
  input: ResolveCommentInput,
  userId: string | null,
): Promise<void> {
  const { error } = await supabase
    .from("safety_artifact_comments")
    .update({
      status: "resolved",
      resolved_by_user_id: userId,
      resolved_at: nowIso(),
      updated_at: nowIso(),
    })
    .eq("id", input.comment_id);

  if (error) throw new Error(error.message);
}

export async function requestSignature(
  supabase: SafetySupabaseClient,
  input: RequestSignatureInput,
): Promise<string> {
  const { data, error } = await supabase
    .from("safety_guidebook_signatures")
    .insert({
      guidebook_id: input.guidebook_id,
      signer_name: input.signer_name,
      signer_role: input.signer_role ?? null,
      signer_user_id: input.signer_user_id ?? null,
      version_number: input.version_number ?? null,
      status: "awaiting",
    })
    .select("id")
    .single();

  if (error) throw new Error(error.message);
  return data.id;
}

export async function recordSignature(
  supabase: SafetySupabaseClient,
  input: RecordSignatureInput,
): Promise<void> {
  const { error } = await supabase
    .from("safety_guidebook_signatures")
    .update({
      signature: input.signature,
      status: "signed",
      signed_at: nowIso(),
    })
    .eq("id", input.signature_id);

  if (error) throw new Error(error.message);
}

export async function recordRatification(
  supabase: SafetySupabaseClient,
  input: RecordRatificationInput,
  userId: string | null,
): Promise<string> {
  const ts = nowIso();
  const { data, error } = await supabase
    .from("safety_guidebook_ratifications")
    .insert({
      guidebook_id: input.guidebook_id,
      version_number: input.version_number,
      ratified_by_user_id: userId,
      board_chair_name: input.board_chair_name,
      board_chair_signature: input.board_chair_signature,
      facilitator_name: input.facilitator_name ?? null,
      governance_process_note: input.governance_process_note ?? null,
      notes: input.notes ?? null,
      submitted_at: ts,
      ratified_at: ts,
      signed_at: ts,
    })
    .select("id")
    .single();

  if (error) throw new Error(error.message);

  await supabase
    .from("safety_guidebooks")
    .update({
      status: "ratified",
      ratified_at: ts,
      current_version: input.version_number,
      updated_at: ts,
    })
    .eq("id", input.guidebook_id);

  return data.id;
}

export async function markRolloutReady(
  supabase: SafetySupabaseClient,
  rolloutId: string,
  opts?: { storage_path?: string; file_url?: string },
): Promise<void> {
  const { error } = await supabase
    .from("safety_rollout_artifacts")
    .update({
      status: "ready",
      storage_path: opts?.storage_path ?? null,
      file_url: opts?.file_url ?? null,
      generated_at: nowIso(),
    })
    .eq("id", rolloutId);

  if (error) throw new Error(error.message);
}

export async function logSafetyQuestion(
  supabase: SafetySupabaseClient,
  params: {
    organizationId: string;
    askedByUserId: string | null;
    question: string;
    matchedArtifactId: string | null;
    matchedClauseRef: string | null;
  },
): Promise<string> {
  const { data, error } = await supabase
    .from("safety_questions")
    .insert({
      organization_id: params.organizationId,
      asked_by_user_id: params.askedByUserId,
      question: params.question,
      matched_artifact_id: params.matchedArtifactId,
      matched_clause_ref: params.matchedClauseRef,
    })
    .select("id")
    .single();

  if (error) throw new Error(error.message);
  return data.id;
}
