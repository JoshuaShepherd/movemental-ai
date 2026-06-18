import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { getOptionalAuthUser } from "@/lib/supabase/server";
import {
  getEngagement,
  getGuidebook,
  getLayer,
  getRatification,
  getRoleAccess,
  listComments,
  listRolloutArtifacts,
  listSignatures,
  searchGuidebookVersions,
} from "@/lib/safety/queries";
import {
  addComment,
  logSafetyQuestion,
  markRolloutReady,
  recordRatification,
  recordSignature,
  requestSignature,
  resolveComment,
  toggleChecklistItem,
  upsertLayerBody,
} from "@/lib/safety/mutations";
import {
  addCommentSchema,
  askGuidebookQuestionSchema,
  markRolloutReadySchema,
  recordRatificationSchema,
  recordSignatureSchema,
  requestSignatureSchema,
  resolveCommentSchema,
  toggleChecklistItemSchema,
  upsertLayerBodySchema,
} from "@/lib/safety/schemas";

const OrgQuery = z.object({ organization_id: z.string().uuid() });
const GuidebookQuery = z.object({ guidebook_id: z.string().uuid() });
const ArtifactQuery = z.object({ artifact_id: z.string().uuid() });

async function authContext() {
  const { supabase, user } = await getOptionalAuthUser();
  return { supabase, userId: user?.id ?? null };
}

export async function GET(request: NextRequest) {
  const { supabase } = await authContext();
  const sp = request.nextUrl.searchParams;
  const resource = sp.get("resource");

  try {
    if (resource === "engagement") {
      const parsed = OrgQuery.safeParse({ organization_id: sp.get("organization_id") });
      if (!parsed.success) {
        return NextResponse.json({ error: { code: "validation_error", message: "organization_id required" } }, { status: 400 });
      }
      const data = await getEngagement(supabase, parsed.data.organization_id);
      return NextResponse.json({ success: true, data });
    }

    if (resource === "guidebook") {
      const parsed = OrgQuery.safeParse({ organization_id: sp.get("organization_id") });
      if (!parsed.success) {
        return NextResponse.json({ error: { code: "validation_error", message: "organization_id required" } }, { status: 400 });
      }
      const data = await getGuidebook(supabase, parsed.data.organization_id);
      return NextResponse.json({ success: true, data });
    }

    if (resource === "layer") {
      const parsed = ArtifactQuery.safeParse({ artifact_id: sp.get("artifact_id") });
      if (!parsed.success) {
        return NextResponse.json({ error: { code: "validation_error", message: "artifact_id required" } }, { status: 400 });
      }
      const data = await getLayer(supabase, parsed.data.artifact_id);
      return NextResponse.json({ success: true, data });
    }

    if (resource === "comments") {
      const guidebookId = sp.get("guidebook_id");
      if (!guidebookId) {
        return NextResponse.json({ error: { code: "validation_error", message: "guidebook_id required" } }, { status: 400 });
      }
      const data = await listComments(supabase, guidebookId, {
        artifactId: sp.get("artifact_id") ?? undefined,
        openOnly: sp.get("open_only") === "1",
      });
      return NextResponse.json({ success: true, data });
    }

    if (resource === "signatures") {
      const parsed = GuidebookQuery.safeParse({ guidebook_id: sp.get("guidebook_id") });
      if (!parsed.success) {
        return NextResponse.json({ error: { code: "validation_error", message: "guidebook_id required" } }, { status: 400 });
      }
      const data = await listSignatures(supabase, parsed.data.guidebook_id);
      return NextResponse.json({ success: true, data });
    }

    if (resource === "ratification") {
      const parsed = GuidebookQuery.safeParse({ guidebook_id: sp.get("guidebook_id") });
      if (!parsed.success) {
        return NextResponse.json({ error: { code: "validation_error", message: "guidebook_id required" } }, { status: 400 });
      }
      const data = await getRatification(supabase, parsed.data.guidebook_id);
      return NextResponse.json({ success: true, data });
    }

    if (resource === "rollout") {
      const parsed = GuidebookQuery.safeParse({ guidebook_id: sp.get("guidebook_id") });
      if (!parsed.success) {
        return NextResponse.json({ error: { code: "validation_error", message: "guidebook_id required" } }, { status: 400 });
      }
      const data = await listRolloutArtifacts(supabase, parsed.data.guidebook_id);
      return NextResponse.json({ success: true, data });
    }

    if (resource === "role_access") {
      const parsed = OrgQuery.safeParse({ organization_id: sp.get("organization_id") });
      if (!parsed.success) {
        return NextResponse.json({ error: { code: "validation_error", message: "organization_id required" } }, { status: 400 });
      }
      const data = await getRoleAccess(supabase, parsed.data.organization_id);
      return NextResponse.json({ success: true, data });
    }

    return NextResponse.json({ error: { code: "unknown_resource", message: "Unknown resource." } }, { status: 400 });
  } catch (e) {
    return NextResponse.json(
      { error: { code: "query_error", message: e instanceof Error ? e.message : "Query failed." } },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const { supabase, userId } = await authContext();
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: { code: "invalid_json", message: "Body must be JSON." } }, { status: 400 });
  }

  const action =
    typeof body === "object" && body !== null && "action" in body
      ? String((body as { action: string }).action)
      : "";

  const payload =
    typeof body === "object" && body !== null && "payload" in body
      ? (body as { payload: unknown }).payload
      : body;

  try {
    if (action === "upsert_layer_body") {
      const parsed = upsertLayerBodySchema.safeParse(payload);
      if (!parsed.success) {
        return NextResponse.json({ error: { code: "validation_error", message: "Invalid payload." } }, { status: 400 });
      }
      await upsertLayerBody(supabase, parsed.data, userId);
      return NextResponse.json({ success: true });
    }

    if (action === "toggle_checklist") {
      const parsed = toggleChecklistItemSchema.safeParse(payload);
      if (!parsed.success) {
        return NextResponse.json({ error: { code: "validation_error", message: "Invalid payload." } }, { status: 400 });
      }
      await toggleChecklistItem(supabase, parsed.data);
      return NextResponse.json({ success: true });
    }

    if (action === "add_comment") {
      const parsed = addCommentSchema.safeParse(payload);
      if (!parsed.success) {
        return NextResponse.json({ error: { code: "validation_error", message: "Invalid payload." } }, { status: 400 });
      }
      const id = await addComment(supabase, parsed.data, userId);
      return NextResponse.json({ success: true, data: { id } });
    }

    if (action === "resolve_comment") {
      const parsed = resolveCommentSchema.safeParse(payload);
      if (!parsed.success) {
        return NextResponse.json({ error: { code: "validation_error", message: "Invalid payload." } }, { status: 400 });
      }
      await resolveComment(supabase, parsed.data, userId);
      return NextResponse.json({ success: true });
    }

    if (action === "request_signature") {
      const parsed = requestSignatureSchema.safeParse(payload);
      if (!parsed.success) {
        return NextResponse.json({ error: { code: "validation_error", message: "Invalid payload." } }, { status: 400 });
      }
      const id = await requestSignature(supabase, parsed.data);
      return NextResponse.json({ success: true, data: { id } });
    }

    if (action === "record_signature") {
      const parsed = recordSignatureSchema.safeParse(payload);
      if (!parsed.success) {
        return NextResponse.json({ error: { code: "validation_error", message: "Invalid payload." } }, { status: 400 });
      }
      await recordSignature(supabase, parsed.data);
      return NextResponse.json({ success: true });
    }

    if (action === "record_ratification") {
      const parsed = recordRatificationSchema.safeParse(payload);
      if (!parsed.success) {
        return NextResponse.json({ error: { code: "validation_error", message: "Invalid payload." } }, { status: 400 });
      }
      const id = await recordRatification(supabase, parsed.data, userId);
      return NextResponse.json({ success: true, data: { id } });
    }

    if (action === "mark_rollout_ready") {
      const parsed = markRolloutReadySchema.safeParse(payload);
      if (!parsed.success) {
        return NextResponse.json({ error: { code: "validation_error", message: "Invalid payload." } }, { status: 400 });
      }
      await markRolloutReady(supabase, parsed.data.rollout_id, {
        storage_path: parsed.data.storage_path,
        file_url: parsed.data.file_url,
      });
      return NextResponse.json({ success: true });
    }

    if (action === "ask_guidebook") {
      const parsed = askGuidebookQuestionSchema.safeParse(payload);
      if (!parsed.success) {
        return NextResponse.json({ error: { code: "validation_error", message: "Invalid payload." } }, { status: 400 });
      }
      const match = await searchGuidebookVersions(
        supabase,
        parsed.data.organization_id,
        parsed.data.question,
      );
      const questionId = await logSafetyQuestion(supabase, {
        organizationId: parsed.data.organization_id,
        askedByUserId: userId,
        question: parsed.data.question,
        matchedArtifactId: match.artifactId,
        matchedClauseRef: match.clauseRef,
      });
      return NextResponse.json({
        success: true,
        data: {
          questionId,
          matchedArtifactId: match.artifactId,
          matchedClauseRef: match.clauseRef,
          answerSnippet: match.snippet,
        },
      });
    }

    return NextResponse.json({ error: { code: "unknown_action", message: "Unknown action." } }, { status: 400 });
  } catch (e) {
    return NextResponse.json(
      { error: { code: "mutation_error", message: e instanceof Error ? e.message : "Mutation failed." } },
      { status: 500 },
    );
  }
}
