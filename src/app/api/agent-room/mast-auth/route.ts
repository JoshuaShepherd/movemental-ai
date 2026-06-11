import { NextResponse } from "next/server";

import {
  MAST_AUTH_MENUS,
  type MastAuthRole,
} from "@/lib/agent-room/mast-auth-menus";
import { getMovementLeaderByEmail } from "@/lib/movement-leaders/movement-leaders.server";
import { listMembershipOrganizations } from "@/lib/services/onboarding/onboarding.service";
import { getOptionalAuthUser } from "@/lib/supabase/server";

/**
 * Resolves the signed-in workspace menu for the agent room mast.
 * Anonymous callers receive `{ role: "signed-out" }`.
 */
export async function GET() {
  const { user } = await getOptionalAuthUser();
  if (!user?.id) {
    return NextResponse.json({ role: "signed-out" as const });
  }

  const [memberships, leader] = await Promise.all([
    listMembershipOrganizations(user.id),
    getMovementLeaderByEmail(user.email),
  ]);

  let role: MastAuthRole = "assess";
  if (memberships.length > 0) {
    role = "org";
  } else if (leader) {
    role = "leader";
  }

  return NextResponse.json({
    role,
    ...MAST_AUTH_MENUS[role],
  });
}
