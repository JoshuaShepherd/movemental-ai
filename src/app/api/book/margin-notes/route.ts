import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/lib/db";
import { bookMarginNotes } from "@/lib/db/schema";
import { createClient } from "@/lib/supabase/server";

const BodySchema = z.object({
  chapter_slug: z.string().min(1).max(200),
  anchor_paragraph_id: z.string().min(1).max(120),
  type: z.enum(["question", "feedback", "criticism"]),
  body: z.string().min(10).max(1000),
  contributor_display_name: z.string().min(1).max(120),
  contributor_title: z.string().max(200).optional().nullable(),
  contributor_url: z.string().url().max(500).optional().nullable().or(z.literal("")),
  contact_email: z.string().email().optional().nullable(),
  consent: z.literal(true),
});

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: { code: "INVALID_JSON", message: "Invalid JSON" } },
      { status: 400 },
    );
  }

  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: {
          code: "VALIDATION_ERROR",
          message: parsed.error.issues[0]?.message ?? "Invalid input",
        },
      },
      { status: 400 },
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const url =
    parsed.data.contributor_url && parsed.data.contributor_url.length > 0
      ? parsed.data.contributor_url
      : null;

  try {
    await db.insert(bookMarginNotes).values({
      chapter_slug: parsed.data.chapter_slug,
      anchor_paragraph_id: parsed.data.anchor_paragraph_id,
      type: parsed.data.type,
      body: parsed.data.body.trim(),
      status: "pending",
      contributor_id: user?.id ?? null,
      contributor_display_name: parsed.data.contributor_display_name.trim(),
      contributor_title: parsed.data.contributor_title?.trim() ?? null,
      contributor_url: url,
      contact_email: parsed.data.contact_email?.trim() ?? null,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[book/margin-notes]", err);
    return NextResponse.json(
      { error: { code: "SERVER_ERROR", message: "Could not submit note." } },
      { status: 500 },
    );
  }
}
