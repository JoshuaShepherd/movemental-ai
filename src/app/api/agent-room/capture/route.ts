import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/lib/db";
import { contactSubmissions, newsletterSubscribers } from "@/lib/db/schema";
import { notifyAgentRoomLead } from "@/lib/email/agent-room-lead-notifications";
import {
  notifyContactInbox,
  sendContactSubmitterAck,
} from "@/lib/email/contact-notifications";
import { recordFieldGuideLead } from "@/lib/leads/field-guide-lead";
import { createSlidingWindowRateLimiter } from "@/lib/rate-limit-in-memory";
import { agentRoomLeadsService } from "@/lib/services/simplified/agent-room-leads.service";
import { getTenantOrgId } from "@/lib/tenant";

/**
 * Agent-room capture endpoint — the single network boundary behind the
 * `submitLead` seam in `src/lib/agent-room/capture.ts`.
 *
 * Always logs one durable, tenant-scoped row in `agent_room_leads`, then fans
 * out by `kind` to the specialized surfaces (reusing their existing services /
 * email helpers — never duplicating their logic):
 *   - free    → field-guide newsletter upsert + day-0 PDF email
 *   - map     → newsletter upsert (source `assessment-map`); map email is Phase 7
 *   - paid    → internal team notify (full enrollment is `/api/agent-room/enroll`)
 *   - discuss → contact_submissions + inbox/ack emails
 *
 * The lead-log insert is the source of truth; fan-out failures are caught and
 * logged, never lost.
 */

const captureRateLimitIp = createSlidingWindowRateLimiter(10, 60 * 60 * 1000);

const CaptureSchema = z.object({
  kind: z.enum(["map", "paid", "free", "discuss"]),
  email: z.string().email("Valid email is required"),
  first: z.string().max(120).optional(),
  name: z.string().max(200).optional(),
  org: z.string().max(200).optional(),
  role: z.string().max(160).optional(),
  source: z.string().max(80).optional(),
  sessionId: z.string().max(120).optional(),
  anonId: z.string().max(120).optional(),
  mapAnswers: z.any().optional(),
  metadata: z.any().optional(),
});

type CaptureInput = z.infer<typeof CaptureSchema>;

async function upsertNewsletterLead(orgId: string, email: string, source: string, name?: string | null) {
  const emailNorm = email.toLowerCase().trim();
  const ts = new Date().toISOString();
  const existing = await db
    .select({ id: newsletterSubscribers.id })
    .from(newsletterSubscribers)
    .where(and(eq(newsletterSubscribers.email, emailNorm), eq(newsletterSubscribers.organization_id, orgId)))
    .limit(1);
  if (existing[0]) {
    await db
      .update(newsletterSubscribers)
      .set({ source, name: name ?? undefined, status: "confirmed", confirmed_at: ts, updated_at: ts })
      .where(eq(newsletterSubscribers.id, existing[0].id));
    return;
  }
  await db.insert(newsletterSubscribers).values({
    email: emailNorm,
    name: name ?? null,
    source,
    organization_id: orgId,
    status: "confirmed",
    confirmed_at: ts,
  });
}

async function fanOut(input: CaptureInput, orgId: string, leadId: string): Promise<void> {
  const email = input.email.toLowerCase().trim();
  const org = input.org?.trim() || null;
  const name = input.name?.trim() || input.first?.trim() || null;

  switch (input.kind) {
    case "free":
      await recordFieldGuideLead({
        orgId,
        email,
        organization: org,
        fieldGuide: "safety",
        source: input.source ?? "agent-room",
      });
      return;

    case "map":
      await upsertNewsletterLead(orgId, email, "assessment-map", org);
      await notifyAgentRoomLead({ leadId, kind: "map", email, name, organization: org, source: input.source });
      return;

    case "paid":
      await notifyAgentRoomLead({
        leadId,
        kind: "paid",
        email,
        name,
        organization: org,
        role: input.role,
        source: input.source,
      });
      return;

    case "discuss": {
      const [row] = await db
        .insert(contactSubmissions)
        .values({
          name: name ?? "Agent room visitor",
          email,
          organization: org ?? undefined,
          audience_segment: "Organization / institution",
          message:
            `Discuss hand-off from the agent room.` +
            (input.role ? `\nRole: ${input.role}` : "") +
            (input.source ? `\nSource: ${input.source}` : ""),
        })
        .returning({ id: contactSubmissions.id });
      if (row?.id) {
        const payload = {
          submissionId: row.id,
          name: name ?? "Agent room visitor",
          email,
          organization: org ?? undefined,
          audience_segment: "Organization / institution",
          message: "Discuss hand-off from the agent room.",
        };
        await Promise.all([notifyContactInbox(payload), sendContactSubmitterAck(payload)]);
      }
      return;
    }
  }
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  if (!captureRateLimitIp(ip)) {
    return NextResponse.json(
      { error: { code: "RATE_LIMITED", message: "Too many attempts. Please try again later." } },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: { code: "INVALID_JSON", message: "Request body must be valid JSON" } },
      { status: 400 },
    );
  }

  const parsed = CaptureSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: { code: "VALIDATION_ERROR", message: parsed.error.issues[0]?.message ?? "Validation failed" } },
      { status: 400 },
    );
  }

  const orgId = getTenantOrgId();
  if (!orgId) {
    return NextResponse.json(
      {
        error: {
          code: "TENANT_NOT_CONFIGURED",
          message: "Set TENANT_ORG_ID so agent-room captures can be stored.",
        },
      },
      { status: 503 },
    );
  }

  const input = parsed.data;

  // 1) Durable lead log — the source of truth. Tenant-stamped explicitly.
  const created = await agentRoomLeadsService.create({
    organization_id: orgId,
    kind: input.kind,
    email: input.email.toLowerCase().trim(),
    first_name: input.first?.trim() || null,
    name: input.name?.trim() || null,
    organization: input.org?.trim() || null,
    role: input.role?.trim() || null,
    source: input.source ?? "agent-room",
    session_id: input.sessionId ?? null,
    anon_id: input.anonId ?? null,
    map_answers: input.mapAnswers ?? null,
    metadata: input.metadata ?? null,
    status: "new",
  });

  if (!created.success) {
    console.error("Agent-room capture failed to persist lead:", created.error);
    return NextResponse.json(
      { error: { code: "SERVER_ERROR", message: "Something went wrong. Please try again." } },
      { status: 500 },
    );
  }

  // 2) Fan out to specialized surfaces — never lose the logged row on failure.
  try {
    await fanOut(input, orgId, created.data.id);
  } catch (err) {
    console.error(`Agent-room capture fan-out failed for kind=${input.kind} (lead saved):`, err);
  }

  return NextResponse.json({ success: true, leadId: created.data.id });
}
