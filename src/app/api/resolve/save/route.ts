import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { resolutionService } from "@/lib/services/resolutions/resolution.service";

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
  selections: z
    .object({
      ticks: z.record(z.string(), z.boolean()).optional(),
      stars: z.record(z.string(), z.number()).optional(),
      skipped: z.record(z.string(), z.boolean()).optional(),
    })
    .default({}),
  hardestTheme: z.number().nullable().optional(),
  acts: z.array(z.number()).default([]),
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
    const starsConverted: Record<number, number> = {};
    if (data.selections.stars) {
      for (const [k, v] of Object.entries(data.selections.stars)) {
        starsConverted[parseInt(k, 10)] = v;
      }
    }

    const skippedConverted: Record<number, boolean> = {};
    if (data.selections.skipped) {
      for (const [k, v] of Object.entries(data.selections.skipped)) {
        skippedConverted[parseInt(k, 10)] = v;
      }
    }

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
      selections: {
        ticks: data.selections.ticks,
        stars: starsConverted,
        skipped: skippedConverted,
      },
      hardestTheme: data.hardestTheme,
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
