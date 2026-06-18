import { NextRequest, NextResponse } from "next/server";

import { requireOnbuildingAdmin } from "@/lib/auth/require-onbuilding-admin";
import { OnbuildingSectionReseedSchema } from "@/lib/schemas/onbuilding-admin";
import { reseedSectionsFromCorpus } from "@/lib/services/onbuilding/onbuilding-sections-admin.service";

export async function POST(request: NextRequest) {
  const auth = await requireOnbuildingAdmin();
  if ("error" in auth) return auth.error;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: { code: "invalid_json", message: "Body must be JSON." } },
      { status: 400 },
    );
  }

  const parsed = OnbuildingSectionReseedSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: { code: "validation_error", message: parsed.error.issues[0]?.message ?? "Invalid body." } },
      { status: 400 },
    );
  }

  const result = await reseedSectionsFromCorpus(auth.authUserId, parsed.data.movementLeaderId);
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ success: true, data: result.data });
}
