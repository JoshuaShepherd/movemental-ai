import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { resolutionService } from "@/lib/services/resolutions/resolution.service";

const InviteRequestSchema = z.object({
  inviterEmail: z.string().email(),
  inviteeEmail: z.string().email(),
  organizationLabel: z.string().min(1),
  note: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = InviteRequestSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", details: parsed.error.issues } },
        { status: 400 }
      );
    }

    const result = await resolutionService.createInvitation(parsed.data);

    if (!result.ok) {
      return NextResponse.json(
        { error: { code: "SERVER_ERROR", message: result.error.message } },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, data: result.data });
  } catch (err) {
    return NextResponse.json(
      { error: { code: "INVALID_REQUEST", message: String(err) } },
      { status: 400 }
    );
  }
}
