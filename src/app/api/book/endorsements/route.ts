import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/lib/db";
import { bookEndorsements } from "@/lib/db/schema";
import { getChapterSlugs } from "@/lib/book";

const slugSet = new Set(getChapterSlugs());

const BodySchema = z.object({
  quote: z.string().min(10).max(500),
  endorser_name: z.string().min(1).max(120),
  endorser_title: z.string().min(1).max(200),
  endorser_org: z.string().max(200).optional().nullable(),
  audience_lens: z
    .enum(["movement-leaders", "churches", "nonprofits", "institutions", "other"])
    .optional()
    .nullable(),
  chapter_slug: z.string().max(200).optional().nullable(),
  endorser_avatar_url: z.string().url().max(2000).optional().nullable().or(z.literal("")),
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

  const rawSlug = parsed.data.chapter_slug?.trim();
  const chapter_slug = rawSlug && slugSet.has(rawSlug) ? rawSlug : null;

  const avatar =
    parsed.data.endorser_avatar_url && parsed.data.endorser_avatar_url.length > 0
      ? parsed.data.endorser_avatar_url
      : null;

  try {
    await db.insert(bookEndorsements).values({
      quote: parsed.data.quote.trim(),
      endorser_name: parsed.data.endorser_name.trim(),
      endorser_title: parsed.data.endorser_title.trim(),
      endorser_org: parsed.data.endorser_org?.trim() ?? null,
      audience_lens: parsed.data.audience_lens ?? null,
      chapter_slug,
      endorser_avatar_url: avatar,
      status: "pending",
      featured: false,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[book/endorsements]", err);
    return NextResponse.json(
      { error: { code: "SERVER_ERROR", message: "Could not save endorsement." } },
      { status: 500 },
    );
  }
}
