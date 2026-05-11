import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { AuthenticatedShell } from "@/components/authenticated/authenticated-shell";
import { OnboardingPanel } from "@/components/onboarding/onboarding-panel";
import { resolveAuthenticatedShellContext } from "@/lib/authenticated/product-context";
import { getMovementLeaderByEmail } from "@/lib/movement-leaders/movement-leaders.server";
import {
  isUserStaff,
  listMembershipOrganizations,
  loadDashboardPersonaMapForUser,
} from "@/lib/services/onboarding/onboarding.service";
import { createClient } from "@/lib/supabase/server";

function isLeaderWorkspacePath(pathname: string): boolean {
  if (pathname === "/leader/apply") return false;
  return pathname === "/leader" || pathname.startsWith("/leader/");
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) {
    const h = await headers();
    const path = h.get("x-pathname") ?? "/dashboard";
    redirect(`/login?next=${encodeURIComponent(path)}`);
  }

  const h = await headers();
  const pathname = h.get("x-pathname") ?? "/dashboard";

  const membershipsRaw = await listMembershipOrganizations(user.id);
  const leaderRow = await getMovementLeaderByEmail(user.email ?? "");

  if (membershipsRaw.length === 0) {
    if (!(isLeaderWorkspacePath(pathname) && leaderRow)) {
      redirect("/login?reason=no_org");
    }
  }

  const memberships = membershipsRaw.map((m) => ({
    organizationId: m.organizationId,
    orgName: m.orgName,
    orgSlug: m.orgSlug,
  }));

  const staff = await isUserStaff(user.id);
  const initialSlug = memberships[0]?.orgSlug ?? "";
  const personaByOrgSlug = await loadDashboardPersonaMapForUser(user.id);

  const { productContext, sidebar } = resolveAuthenticatedShellContext(pathname);

  const showOnboardingPanel = !pathname.startsWith("/leader");

  return (
    <Suspense fallback={<div className="min-h-dvh bg-section" aria-hidden />}>
      <AuthenticatedShell
        initialOrgSlug={initialSlug}
        userEmail={user.email ?? ""}
        memberships={memberships}
        personaByOrgSlug={personaByOrgSlug}
        showAdminLink={staff}
        productContext={productContext}
        sidebar={sidebar}
        hasLeaderWorkspace={Boolean(leaderRow)}
        workspaceFallbackLabel={
          memberships.length === 0 && leaderRow ? leaderRow.full_name : null
        }
      >
        {showOnboardingPanel ? <OnboardingPanel /> : null}
        {children}
      </AuthenticatedShell>
    </Suspense>
  );
}
