import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

import { db } from "@/lib/db";
import { staffUsers } from "@/lib/db/schema";
import { updateSessionWithUser } from "@/lib/supabase/middleware";

/**
 * Next 16 request proxy (the renamed middleware). With an `src/app` directory Next only loads it
 * from `src/proxy.ts`; the earlier root `proxy.ts` was never run.
 *
 * Scope, deliberately narrow (see `config.matcher`): gate the generated CRUD API
 * (`/api/simplified/*`) to active staff. Those routes use Drizzle over DATABASE_URL, which
 * bypasses Row Level Security, so nothing else protects them. Their only caller is the staff page
 * /agent-runtime. Fails closed: no Supabase config, no session, or a failed staff lookup → denied.
 *
 * Session refresh and shell headers on pages are not enabled here, because they never ran in
 * production and turning them on changes every page. TODO(S12-auth): decide and widen the matcher.
 */
function deny(status: 401 | 403 | 503, code: string, message: string) {
  return NextResponse.json({ error: { code, message } }, { status });
}

export async function proxy(request: NextRequest) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return deny(503, "auth_unavailable", "Authentication is not configured.");
  }

  let userId: string | null = null;
  let response: NextResponse;
  try {
    ({ response, userId } = await updateSessionWithUser(request));
  } catch {
    return deny(503, "auth_unavailable", "Authentication is unavailable.");
  }
  if (!userId) return deny(401, "unauthorized", "Sign in required.");

  let staff = false;
  try {
    const [row] = await db
      .select({ is_active: staffUsers.is_active })
      .from(staffUsers)
      .where(eq(staffUsers.user_id, userId))
      .limit(1);
    staff = Boolean(row?.is_active);
  } catch {
    staff = false;
  }
  if (!staff) return deny(403, "forbidden", "Access denied.");

  return response;
}

export const config = {
  matcher: ["/api/simplified", "/api/simplified/:path*"],
};
