import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { AuthenticatedShell } from "@/components/authenticated/authenticated-shell";
import { resolveAuthenticatedShellContext } from "@/lib/authenticated/product-context";
import type { OnboardingShellKind } from "@/lib/onboarding/shell-progress-labels";
import { computeLeaderOnboardingProgressPercentSync } from "@/lib/onboarding/shell-progress-core";
import { isSandboxLiveOrgAdminRole } from "@/lib/organizations/org-membership-role";
import {
  getMovementLeaderByEmail,
  hasSignedVoiceCommitments,
} from "@/lib/movement-leaders/movement-leaders.server";
import { buildSandboxLiveSidebarSections } from "@/lib/sandboxlive/sandboxlive-sidebar";
import {
  isUserStaff,
  listMembershipOrganizations,
  loadDashboardShellMapsForUser,
  resolveActiveOrganizationId,
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
  const { personaByOrgSlug, workspaceCoursesByOrgSlug } = await loadDashboardShellMapsForUser(user.id);

  const { productContext, sidebar } = resolveAuthenticatedShellContext(pathname);

  let resolvedSidebar = sidebar;
  if (pathname === "/sandboxlive" || pathname.startsWith("/sandboxlive/")) {
    const orgSlugFromHeader = h.get("x-dashboard-org-slug")?.trim() || null;
    let showOrgAdmin = false;
    if (membershipsRaw.length > 0) {
      const r = await resolveActiveOrganizationId(user.id, orgSlugFromHeader);
      if (r.success) {
        const row = membershipsRaw.find((m) => m.orgSlug === r.data.slug);
        if (row) {
          showOrgAdmin = isSandboxLiveOrgAdminRole(row.membershipRole, {
            isAccountOwner: row.accountOwnerId != null && row.accountOwnerId === user.id,
          });
        }
      }
    }
    resolvedSidebar = buildSandboxLiveSidebarSections({ includeOrganizationAdmin: showOrgAdmin });
  }

  const leaderProductPath = isLeaderWorkspacePath(pathname);
  let onboardingProgress: number | undefined;
  let onboardingShellKind: OnboardingShellKind | undefined;

  if (leaderProductPath && leaderRow) {
    const signed = await hasSignedVoiceCommitments(leaderRow.id);
    const leaderPct = computeLeaderOnboardingProgressPercentSync(leaderRow, signed);
    if (leaderPct !== null) {
      onboardingProgress = leaderPct;
      onboardingShellKind = "leader";
    }
  }

  return (
    <Suspense fallback={<div className="min-h-dvh bg-section" aria-hidden />}>
      <AuthenticatedShell
        initialOrgSlug={initialSlug}
        userEmail={user.email ?? ""}
        memberships={memberships}
        personaByOrgSlug={personaByOrgSlug}
        workspaceCoursesByOrgSlug={workspaceCoursesByOrgSlug}
        showAdminLink={staff}
        productContext={productContext}
        sidebar={resolvedSidebar}
        onboardingProgress={onboardingProgress}
        onboardingShellKind={onboardingShellKind}
        hasLeaderWorkspace={Boolean(leaderRow)}
        workspaceFallbackLabel={
          memberships.length === 0 && leaderRow ? leaderRow.full_name : null
        }
      >
        {children}
      </AuthenticatedShell>
    </Suspense>
  );
}
