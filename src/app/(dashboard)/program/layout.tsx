import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { appendOrgQuery } from "@/lib/authenticated/workspace-primary-nav";
import {
  resolveActiveOrganizationId,
  resolveWorkspaceNavPresetForSessionUser,
} from "@/lib/services/onboarding/onboarding.service";
import { createClient } from "@/lib/supabase/server";

/**
 * SandboxLive-first orgs (`workspaceNavPreset: sandbox_live_focus`) should not
 * use Program templates via bookmarked URLs — send them to SandboxLive.
 */
export default async function ProgramLayout({ children }: { children: React.ReactNode }) {
  const h = await headers();
  const orgSlug = h.get("x-dashboard-org-slug")?.trim() || null;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) {
    return children;
  }

  const preset = await resolveWorkspaceNavPresetForSessionUser(user.id, orgSlug);
  if (preset !== "sandbox_live_focus") {
    return children;
  }

  const resolved = await resolveActiveOrganizationId(user.id, orgSlug ?? undefined);
  if (!resolved.success) {
    redirect("/sandboxlive");
  }
  redirect(appendOrgQuery("/sandboxlive", resolved.data.slug));
}
