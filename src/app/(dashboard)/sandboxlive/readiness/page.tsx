import { redirect } from "next/navigation";

import { ReadinessIntakeWizard } from "@/components/sandboxlive/readiness-intake-wizard";
import { loadSandboxLiveOrgProfile } from "@/lib/sandboxlive/org-admin.server";
import { loadReadinessSubmission } from "@/lib/sandboxlive/readiness-intake.server";
import { resolveActiveOrganizationId } from "@/lib/services/onboarding/onboarding.service";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Staff readiness check-in · SandboxLive",
};

export default async function SandboxLiveReadinessPage({
  searchParams,
}: {
  searchParams: Promise<{ org?: string }>;
}) {
  const sp = await searchParams;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) {
    const qs = sp.org ? `?org=${encodeURIComponent(sp.org)}` : "";
    redirect(`/login?next=${encodeURIComponent(`/sandboxlive/readiness${qs}`)}`);
  }

  const resolved = await resolveActiveOrganizationId(user.id, sp.org);
  if (!resolved.success) {
    redirect("/sandboxlive");
  }

  const [orgProfile, existing] = await Promise.all([
    loadSandboxLiveOrgProfile(resolved.data.organizationId),
    loadReadinessSubmission(resolved.data.organizationId, user.id),
  ]);

  const organizationName = orgProfile?.name ?? "your organization";
  const orgQuery = sp.org ? `?org=${sp.org}` : "";

  return (
    <ReadinessIntakeWizard
      orgSlug={resolved.data.slug}
      orgQuery={orgQuery}
      organizationName={organizationName}
      existingSubmission={
        existing
          ? {
              answers: existing.answers,
              submittedAt: existing.submittedAt,
              updatedAt: existing.updatedAt,
            }
          : null
      }
    />
  );
}
