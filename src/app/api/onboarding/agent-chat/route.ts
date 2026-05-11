import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { resolveActiveOrganizationId } from "@/lib/services/onboarding/onboarding.service";
import { agentTestChat } from "@/lib/services/onboarding/onboarding-http.service";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) {
    return NextResponse.json(
      { error: { code: "unauthorized", message: "Sign in required." } },
      { status: 401 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: { code: "invalid_json", message: "Body must be JSON." } },
      { status: 400 },
    );
  }

  const organizationSlug =
    typeof body === "object" && body && "organizationSlug" in body
      ? ((body as { organizationSlug?: unknown }).organizationSlug as string | undefined)
      : undefined;

  const messages =
    typeof body === "object" && body && "messages" in body ? (body as { messages?: unknown }).messages : undefined;

  if (!Array.isArray(messages)) {
    return NextResponse.json(
      { error: { code: "validation_error", message: "messages array is required." } },
      { status: 400 },
    );
  }

  const conversationId =
    typeof body === "object" && body && "conversationId" in body
      ? ((body as { conversationId?: unknown }).conversationId as string | undefined)
      : undefined;

  const resolved = await resolveActiveOrganizationId(user.id, organizationSlug);
  if (!resolved.success) {
    return NextResponse.json({ error: resolved.error }, { status: 400 });
  }

  const result = await agentTestChat({
    organizationId: resolved.data.organizationId,
    conversationId,
    messages: messages.map((m) =>
      typeof m === "object" && m !== null
        ? {
            role: String((m as { role?: unknown }).role ?? "user"),
            content: String((m as { content?: unknown }).content ?? ""),
          }
        : { role: "user", content: "" },
    ),
  });

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ success: true, data: result.data });
}
