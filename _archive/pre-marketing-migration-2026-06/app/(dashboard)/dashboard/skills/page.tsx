import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { Eyebrow } from "@/components/primitives/eyebrow";
import { appendOrgQuery } from "@/lib/authenticated/workspace-primary-nav";
import { resolveDashboardContextForSessionUser } from "@/lib/services/onboarding/onboarding.service";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Skills · Workspace",
  description: "Organization-scoped skills workspace (starter hub).",
};

export default async function DashboardSkillsPage({
  searchParams,
}: {
  searchParams: Promise<{ org?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) {
    redirect("/login?next=/dashboard/skills");
  }

  const sp = await searchParams;
  const ctx = await resolveDashboardContextForSessionUser(user.id, sp.org);
  if (!ctx?.workspaceCourses.skills) {
    redirect(ctx ? appendOrgQuery("/dashboard", ctx.slug) : "/dashboard");
  }

  return (
    <div className="max-w-prose">
      <Eyebrow className="mb-2">Workspace</Eyebrow>
      <h1 className="font-serif text-[clamp(1.5rem,3vw,2rem)] italic leading-tight text-foreground">Skills</h1>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        This organization has the Skills course enabled. The full skills experience is not wired here yet—use
        this page as a placeholder while product and engineering ship the dedicated flows.
      </p>
    </div>
  );
}
