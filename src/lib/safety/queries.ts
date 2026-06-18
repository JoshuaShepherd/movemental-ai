import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/lib/supabase/database.types";
import {
  toEngagementProgress,
  toGuidebookSummary,
  toLayerDetailVM,
  toRatificationVM,
  toReviewCommentVM,
  toRolloutArtifactVM,
  toRoleAccessEntry,
  toSignatureVM,
  type EngagementProgress,
  type GuidebookSummary,
  type LayerDetailVM,
  type RatificationVM,
  type ReviewCommentVM,
  type RolloutArtifactVM,
  type RoleAccessMatrixEntry,
  type SignatureVM,
} from "@/lib/safety/types";

export type SafetySupabaseClient = SupabaseClient<Database>;

export async function getEngagement(
  supabase: SafetySupabaseClient,
  organizationId: string,
): Promise<EngagementProgress | null> {
  const { data, error } = await supabase
    .from("safety_engagements")
    .select("*")
    .eq("organization_id", organizationId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data ? toEngagementProgress(data) : null;
}

export async function getGuidebook(
  supabase: SafetySupabaseClient,
  organizationId: string,
): Promise<GuidebookSummary | null> {
  const { data: guidebook, error: gErr } = await supabase
    .from("safety_guidebooks")
    .select("*")
    .eq("organization_id", organizationId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (gErr) throw new Error(gErr.message);
  if (!guidebook) return null;

  const { data: layers, error: lErr } = await supabase
    .from("safety_artifacts")
    .select("*")
    .eq("guidebook_id", guidebook.id)
    .order("layer_order", { ascending: true });

  if (lErr) throw new Error(lErr.message);
  return toGuidebookSummary(guidebook, layers ?? []);
}

export async function listLayers(
  supabase: SafetySupabaseClient,
  guidebookId: string,
) {
  const { data, error } = await supabase
    .from("safety_artifacts")
    .select("*")
    .eq("guidebook_id", guidebookId)
    .order("layer_order", { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => row);
}

export async function getLayer(
  supabase: SafetySupabaseClient,
  artifactId: string,
): Promise<LayerDetailVM | null> {
  const { data: artifact, error: aErr } = await supabase
    .from("safety_artifacts")
    .select("*")
    .eq("id", artifactId)
    .maybeSingle();

  if (aErr) throw new Error(aErr.message);
  if (!artifact) return null;

  const { data: versions, error: vErr } = await supabase
    .from("safety_artifact_versions")
    .select("*")
    .eq("artifact_id", artifactId)
    .order("version_number", { ascending: false })
    .limit(1);

  if (vErr) throw new Error(vErr.message);

  const { data: checklist, error: cErr } = await supabase
    .from("safety_layer_checklist_items")
    .select("*")
    .eq("artifact_id", artifactId)
    .order("sort_order", { ascending: true });

  if (cErr) throw new Error(cErr.message);

  return toLayerDetailVM(artifact, versions?.[0] ?? null, checklist ?? []);
}

export async function listComments(
  supabase: SafetySupabaseClient,
  guidebookId: string,
  opts?: { artifactId?: string; openOnly?: boolean },
): Promise<ReviewCommentVM[]> {
  let query = supabase
    .from("safety_artifact_comments")
    .select("*")
    .eq("guidebook_id", guidebookId)
    .order("created_at", { ascending: true });

  if (opts?.artifactId) query = query.eq("artifact_id", opts.artifactId);
  if (opts?.openOnly) query = query.eq("status", "open");

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data ?? []).map(toReviewCommentVM);
}

export async function listSignatures(
  supabase: SafetySupabaseClient,
  guidebookId: string,
): Promise<SignatureVM[]> {
  const { data, error } = await supabase
    .from("safety_guidebook_signatures")
    .select("*")
    .eq("guidebook_id", guidebookId)
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []).map(toSignatureVM);
}

export async function getRatification(
  supabase: SafetySupabaseClient,
  guidebookId: string,
): Promise<RatificationVM | null> {
  const { data, error } = await supabase
    .from("safety_guidebook_ratifications")
    .select("*")
    .eq("guidebook_id", guidebookId)
    .order("ratified_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data ? toRatificationVM(data) : null;
}

export async function listRolloutArtifacts(
  supabase: SafetySupabaseClient,
  guidebookId: string,
): Promise<RolloutArtifactVM[]> {
  const { data, error } = await supabase
    .from("safety_rollout_artifacts")
    .select("*")
    .eq("guidebook_id", guidebookId)
    .order("kind", { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []).map(toRolloutArtifactVM);
}

export async function getRoleAccess(
  supabase: SafetySupabaseClient,
  organizationId: string,
): Promise<RoleAccessMatrixEntry[]> {
  const { data: orgRows, error: oErr } = await supabase
    .from("safety_role_access")
    .select("*")
    .eq("organization_id", organizationId);

  if (oErr) throw new Error(oErr.message);
  if (orgRows && orgRows.length > 0) {
    return orgRows.map(toRoleAccessEntry);
  }

  const { data: globalRows, error: gErr } = await supabase
    .from("safety_role_access")
    .select("*")
    .is("organization_id", null);

  if (gErr) throw new Error(gErr.message);
  return (globalRows ?? []).map(toRoleAccessEntry);
}

export async function searchGuidebookVersions(
  supabase: SafetySupabaseClient,
  organizationId: string,
  question: string,
): Promise<{ artifactId: string | null; clauseRef: string | null; snippet: string | null }> {
  const guidebook = await getGuidebook(supabase, organizationId);
  if (!guidebook || guidebook.layers.length === 0) {
    return { artifactId: null, clauseRef: null, snippet: null };
  }

  const needle = question.toLowerCase();
  for (const layer of guidebook.layers) {
    const detail = await getLayer(supabase, layer.artifactId);
    if (!detail?.bodyMd) continue;
    const idx = detail.bodyMd.toLowerCase().indexOf(needle);
    if (idx >= 0) {
      const start = Math.max(0, idx - 80);
      const end = Math.min(detail.bodyMd.length, idx + needle.length + 120);
      return {
        artifactId: layer.artifactId,
        clauseRef: layer.slug,
        snippet: detail.bodyMd.slice(start, end).trim(),
      };
    }
  }

  return { artifactId: guidebook.layers[0]?.artifactId ?? null, clauseRef: null, snippet: null };
}
