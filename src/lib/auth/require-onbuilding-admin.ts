import "server-only";

import { NextResponse } from "next/server";

import { isUserStaff } from "@/lib/services/onboarding/onboarding.service";
import { createClient } from "@/lib/supabase/server";

export const ONBUILDING_ADMIN_EMAIL = "josh@movemental.ai" as const;

export type OnbuildingAdminContext = {
  authUserId: string;
  email: string;
};

export async function requireOnbuildingAdmin(): Promise<
  OnbuildingAdminContext | { error: NextResponse }
> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) {
    return {
      error: NextResponse.json(
        { error: { code: "unauthorized", message: "Sign in required." } },
        { status: 401 },
      ),
    };
  }

  const email = (user.email ?? "").trim().toLowerCase();
  if (email !== ONBUILDING_ADMIN_EMAIL) {
    return {
      error: NextResponse.json(
        { error: { code: "forbidden", message: "Access denied." } },
        { status: 403 },
      ),
    };
  }

  const staff = await isUserStaff(user.id);
  if (!staff) {
    return {
      error: NextResponse.json(
        { error: { code: "forbidden", message: "Access denied." } },
        { status: 403 },
      ),
    };
  }

  return { authUserId: user.id, email };
}
