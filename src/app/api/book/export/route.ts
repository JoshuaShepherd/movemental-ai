import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { sendBookExportConfirmation } from "@/lib/book-email";
import { db } from "@/lib/db";
import { bookEmailSubscribers } from "@/lib/db/schema";

const BodySchema = z.object({
  email: z.string().email(),
  lens: z.enum(["movement-leaders", "churches", "nonprofits", "institutions"]),
  format: z.enum(["pdf", "epub"]).default("pdf"),
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
      source: "pdf_export",
    });

    const emailed = await sendBookExportConfirmation({
      email: parsed.data.email.trim(),
      lens: parsed.data.lens,
      format: parsed.data.format,
    });
    if (!emailed.ok) {
      console.error("[book/export] confirmation email failed:", emailed.error);
    }

    return NextResponse.json({ success: true, emailSent: emailed.ok });
  } catch (err) {
    console.error("[book/export]", err);
    return NextResponse.json(
      { error: { code: "SERVER_ERROR", message: "Could not process export request." } },
      { status: 500 },
    );
  }
}
