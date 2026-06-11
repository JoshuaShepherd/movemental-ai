import { type NextRequest, NextResponse } from "next/server";

import { backfillMapIdentity, resolveProfileIdByEmail } from "@/lib/ai-reality/persist";
import { sanitizeAuthRedirectNext } from "@/lib/auth/safe-redirect";
import { linkEnrolledUser } from "@/lib/services/safety/link-enrolled-user";
import { createClient } from "@/lib/supabase/server";
import { getTenantOrgId } from "@/lib/tenant";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = sanitizeAuthRedirectNext(searchParams.get("next"), "/dashboard");
  const inquiryId = searchParams.get("inquiry");

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const email = data.user?.email;
      const authUserId = data.user?.id;

      // Safety dashboard: link provisioned enrollment → profile + membership.
      if (authUserId && email && (inquiryId || next.startsWith("/dashboard/safety"))) {
        try {
          const linked = await linkEnrolledUser({
            authUserId,
            email,
            inquiryId,
          });
          if (!linked.success && linked.error.code === "email_mismatch") {
            return NextResponse.redirect(`${origin}/signup?error=email_mismatch`);
          }
        } catch (err) {
          console.error("[auth/callback] safety enrollment link skipped:", err);
        }
      }

      // Link any pre-auth map readback (captured anonymously with this email) to
      // the now-authenticated identity, so the unified record is identity-keyed.
      const orgId = getTenantOrgId();
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
