import { type NextRequest, NextResponse } from "next/server";

import { backfillMapIdentity, resolveProfileIdByEmail } from "@/lib/ai-reality/persist";
import { sanitizeAuthRedirectNext } from "@/lib/auth/safe-redirect";
import { createClient } from "@/lib/supabase/server";
import { getTenantOrgId } from "@/lib/tenant";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = sanitizeAuthRedirectNext(searchParams.get("next"));

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Link any pre-auth map readback (captured anonymously with this email) to
      // the now-authenticated identity, so the unified record is identity-keyed.
      const orgId = getTenantOrgId();
      const email = data.user?.email;
      if (orgId && email) {
        try {
          const userId = await resolveProfileIdByEmail(email);
          if (userId) {
            await backfillMapIdentity({ organizationId: orgId, email, userId });
          }
        } catch (err) {
          console.error("[auth/callback] ai-reality map identity backfill skipped:", err);
        }
      }
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth`);
}
