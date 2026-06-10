import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { notifyAgentRoomLead } from "@/lib/email/agent-room-lead-notifications";
import { createSlidingWindowRateLimiter } from "@/lib/rate-limit-in-memory";
import { organizationInquiriesService } from "@/lib/services/simplified/organization-inquiries.service";

/**
 * Safety-dashboard full enrollment → `organization_inquiries`.
 *
 * The lightweight in-room "paid" capture (`/api/agent-room/capture`) only logs
 * interest + notifies the team. This is the full enrollment: org info AND the
 * contact person, satisfying every NOT NULL column on `organization_inquiries`.
 */

const enrollRateLimitIp = createSlidingWindowRateLimiter(5, 60 * 60 * 1000);

const EnrollSchema = z.object({
  org_name: z.string().min(1, "Organization name is required").max(200),
  contact_name: z.string().min(1, "Contact name is required").max(200),
  email: z.string().email("Valid email is required"),
  org_type: z.string().min(1, "Organization type is required").max(120),
  team_size: z.string().min(1, "Team size is required").max(80),
  current_tools: z.array(z.string().max(120)).max(50).optional(),
  message: z.string().min(1, "Tell us a little about your context").max(5000),
  timeline: z.string().min(1, "Timeline is required").max(120),
  budget_range: z.string().max(120).optional(),
});

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  if (!enrollRateLimitIp(ip)) {
    return NextResponse.json(
      { error: { code: "RATE_LIMITED", message: "Too many submissions. Please try again later." } },
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

  const parsed = EnrollSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: { code: "VALIDATION_ERROR", message: parsed.error.issues[0]?.message ?? "Validation failed" } },
      { status: 400 },
    );
  }

  const created = await organizationInquiriesService.create({
    org_name: parsed.data.org_name.trim(),
    contact_name: parsed.data.contact_name.trim(),
    email: parsed.data.email.toLowerCase().trim(),
    org_type: parsed.data.org_type.trim(),
    team_size: parsed.data.team_size.trim(),
    current_tools: parsed.data.current_tools ?? null,
    message: parsed.data.message.trim(),
    timeline: parsed.data.timeline.trim(),
    budget_range: parsed.data.budget_range?.trim() || null,
    status: "new",
  });

  if (!created.success) {
    console.error("Enrollment failed to persist:", created.error);
    return NextResponse.json(
      { error: { code: "SERVER_ERROR", message: "Something went wrong. Please try again." } },
      { status: 500 },
    );
  }

  // Heads-up to the team; full detail is on the persisted row.
  try {
    await notifyAgentRoomLead({
      leadId: created.data.id,
      kind: "enroll",
      email: parsed.data.email,
      name: parsed.data.contact_name,
      organization: parsed.data.org_name,
      source: "enroll-page",
    });
  } catch (err) {
    console.error("Enrollment notify failed (inquiry saved):", err);
  }

  return NextResponse.json({ success: true, inquiryId: created.data.id });
}
