import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { resolutionService } from "@/lib/services/resolutions/resolution.service";

const LineSchema = z.object({
  label: z.string().max(80),
  text: z.string().max(400),
  others: z.array(z.string().max(400)).max(8),
});

const SaveResolutionRequestSchema = z.object({
  email: z.string().email().optional().nullable(),
  orgType: z.string().optional(),
  orgLabel: z.string().optional().transform((s) => (s && s.trim()) ? s.trim() : "our organization"),
  visibility: z.enum(["private", "link", "public"]).optional(),
  researchConsent: z.boolean().optional(),
  countInOrg: z.boolean().optional(),
  displayName: z.string().optional().nullable(),
  roleText: z.string().optional().nullable(),
  orgRole: z.string().optional().nullable(),
  /** Resolve v3: the fourteen questions. Own words never reach the server. */
  v2: z.object({
    sector: z.enum(["church", "nonprofit", "school", "network"]),
    picks: z.record(
      z.string().regex(/^q\d{2}$/),
      z.object({
        ticks: z.array(z.string().regex(/^q\d{2}[a-z]$/)).max(8),
        star: z.string().regex(/^q\d{2}[a-z]$/).nullable(),
        choice: z.string().regex(/^q\d{2}[a-z]$/).nullable(),
        none: z.boolean(),
      }),
    ),
    hardest: z.string().max(8).nullable(),
    hardestText: z.string().max(400),
    beliefs: z.array(LineSchema).max(4),
    parts: z.array(z.object({ name: z.string().max(80), rows: z.array(LineSchema).max(8) })).max(6),
  }),
  acts: z.array(z.string().max(200)).max(8).default([]),
  twoMinutes: z.string().optional(),
  lines: z.array(z.string()).default([]),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = SaveResolutionRequestSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", details: parsed.error.issues } },
        { status: 400 }
      );
    }

    const { data } = parsed;

    const result = await resolutionService.saveResolution({
      email: data.email,
      orgType: data.orgType,
      orgLabel: data.orgLabel,
      visibility: data.visibility,
      researchConsent: data.researchConsent,
      countInOrg: data.countInOrg,
      displayName: data.displayName,
      roleText: data.roleText,
      orgRole: data.orgRole,
      v2: data.v2,
      acts: data.acts,
      twoMinutes: data.twoMinutes,
      lines: data.lines,
    });

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
