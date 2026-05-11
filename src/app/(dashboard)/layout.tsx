import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { OnboardingPanel } from "@/components/onboarding/onboarding-panel";
import {
  isUserStaff,
  listMembershipOrganizations,
} from "@/lib/services/onboarding/onboarding.service";
import { createClient } from "@/lib/supabase/server";

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

  const membershipsRaw = await listMembershipOrganizations(user.id);
  if (membershipsRaw.length === 0) {
    redirect("/login?reason=no_org");
  }

  const memberships = membershipsRaw.map((m) => ({
    organizationId: m.organizationId,
    orgName: m.orgName,
    orgSlug: m.orgSlug,
  }));

  const staff = await isUserStaff(user.id);
  const initialSlug = memberships[0]?.orgSlug ?? "";

  return (
    <Suspense
      fallback={<div className="min-h-dvh bg-section" aria-hidden />}
    >
      <DashboardShell
        initialOrgSlug={initialSlug}
        userEmail={user.email ?? ""}
        memberships={memberships}
        showAdminLink={staff}
      >
        <OnboardingPanel />
        {children}
      </DashboardShell>
    </Suspense>
  );
}
