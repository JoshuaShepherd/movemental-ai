import { NextRequest, NextResponse } from "next/server";

import { env } from "@/lib/env";
import { runToolkitFollowupCron } from "@/lib/services/leads/toolkit-followup-cron.service";

/**
 * Scheduled day-3 / day-7 field-guide follow-ups. Run once daily (see vercel.json).
 * Protect with `Authorization: Bearer <CRON_SECRET>` (match `CRON_SECRET` in env).
 */
export async function GET(request: NextRequest) {
  const secret = env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: { code: "disabled", message: "CRON_SECRET is not configured." } },
      { status: 503 },
    );
  }

  const auth = request.headers.get("authorization")?.trim() ?? "";
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json(
      { error: { code: "unauthorized", message: "Invalid or missing cron authorization." } },
      { status: 401 },
    );
  }

  const data = await runToolkitFollowupCron(Date.now());
  return NextResponse.json({ success: true, data });
}
