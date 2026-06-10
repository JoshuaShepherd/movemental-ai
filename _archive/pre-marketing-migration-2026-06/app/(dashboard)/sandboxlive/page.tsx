import { redirect } from "next/navigation";

import { ActiveEngagementHome } from "@/components/sandboxlive/active-engagement-home";
import { loadSandboxLiveEngagementState } from "@/lib/sandboxlive/engagement.server";
import { type SandboxLivePhaseSlug } from "@/lib/sandboxlive/phase-manifest";
import { resolveActiveOrganizationId } from "@/lib/services/onboarding/onboarding.service";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "SandboxLive",
};

export default async function SandboxLiveHomePage({
  searchParams,
}: {
  searchParams: Promise<{ org?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) {
    redirect("/login?next=/sandboxlive");
  }

  const sp = await searchParams;
  const resolved = await resolveActiveOrganizationId(user.id, sp.org);
  if (!resolved.success) {
    redirect("/dashboard");
  }

  const state = await loadSandboxLiveEngagementState(resolved.data.organizationId);
  const phaseStatusBySlug = new Map<SandboxLivePhaseSlug, "not_started" | "in_progress" | "complete">(
    state.phases.map((p) => [p.slug, p.status] as const),
  );
  const orgQuery = sp.org ? `?org=${sp.org}` : "";

  return (
    <ActiveEngagementHome
      organizationName={state.cohortName}
      currentPhaseSlug={state.currentPhaseSlug}
      phaseStatusBySlug={phaseStatusBySlug}
      orgQuery={orgQuery}
    />
  );
}
