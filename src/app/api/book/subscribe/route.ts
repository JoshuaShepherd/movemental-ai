import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { sendBookSubscriberWelcome } from "@/lib/book-email";
import { db } from "@/lib/db";
import { bookEmailSubscribers } from "@/lib/db/schema";

const BodySchema = z.object({
  email: z.string().email(),
  lens: z.enum(["movement-leaders", "churches", "nonprofits", "institutions"]),
  source: z.enum(["lens_selector", "chapter_end", "pdf_export"]),
  chapter_slug: z.string().max(200).optional().nullable(),
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

  try {
    await db.insert(bookEmailSubscribers).values({
      email: parsed.data.email.toLowerCase().trim(),
      lens: parsed.data.lens,
      source: parsed.data.source,
      chapter_slug: parsed.data.chapter_slug ?? null,
    });

    const welcome = await sendBookSubscriberWelcome({
      email: parsed.data.email.trim(),
      lens: parsed.data.lens,
      source: parsed.data.source,
      chapterSlug: parsed.data.chapter_slug,
    });
    if (!welcome.ok) {
      console.error("[book/subscribe] welcome email failed:", welcome.error);
    }

    return NextResponse.json({ success: true, emailSent: welcome.ok });
  } catch (err) {
    console.error("[book/subscribe]", err);
    return NextResponse.json(
      { error: { code: "SERVER_ERROR", message: "Could not save subscription." } },
      { status: 500 },
    );
  }
}
