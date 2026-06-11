import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

import { AiRealityDashboard } from "@/components/ai-reality/dashboard";
import { getOrgDashboardPayload } from "@/lib/ai-reality/persist";
import { AI_REALITY_DASHBOARD_NAME } from "@/lib/ai-reality/types";
import { db } from "@/lib/db";
import { organizations } from "@/lib/db/schema";
import { getOptionalAuthUser } from "@/lib/supabase/server";
import { getTenantOrgId } from "@/lib/tenant";

export const metadata: Metadata = {
  title: AI_REALITY_DASHBOARD_NAME,
  robots: { index: false, follow: false },
};

/**
 * The org AI Reality Dashboard for the authenticated leader. Org scope =
 * TENANT_ORG_ID (the tenant IS the org), so the same page serves the public
 * front door and a named engagement. Reads ONLY the precomputed org payload.
 */
export default async function AiRealityDashboardPage() {
  const { user } = await getOptionalAuthUser();
  if (!user) {
    redirect("/assess");
  }

  const orgId = getTenantOrgId();
  if (!orgId) {
    return (
      <main className="mx-auto w-full max-w-2xl px-4 py-20">
        <h1 className="text-2xl">Dashboard not configured</h1>
        <p className="mt-3 text-muted-foreground">
          Set <code>TENANT_ORG_ID</code> to enable the {AI_REALITY_DASHBOARD_NAME}.
        </p>
      </main>
    );
  }

  const payload = await getOrgDashboardPayload(orgId);
  if (!payload) {
    return (
      <main className="mx-auto w-full max-w-2xl px-4 py-20">
        <h1 className="text-3xl leading-tight">No results yet.</h1>
        <p className="mt-4 text-base text-muted-foreground">
          Take the assessment, then invite your team — your dashboard builds itself as responses arrive.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/agent/assessment"
            className="rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Take the assessment
          </Link>
          <Link
            href="/agent/invite"
            className="rounded-md border border-border px-4 py-2.5 text-sm font-medium text-foreground"
          >
            Invite your team
          </Link>
        </div>
      </main>
    );
  }

  const [org] = await db
    .select({ name: organizations.name })
    .from(organizations)
    .where(eq(organizations.id, orgId))
    .limit(1);

  return <AiRealityDashboard payload={payload} organizationName={org?.name ?? "Your organization"} />;
}
