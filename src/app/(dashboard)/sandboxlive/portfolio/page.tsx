import { redirect } from "next/navigation";

import { SandboxPortfolioView } from "@/components/sandboxlive/sandbox-portfolio-view";
import { resolveActiveOrganizationId } from "@/lib/services/onboarding/onboarding.service";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Use case portfolio · SandboxLive",
};

export default async function SandboxPortfolioPage({
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
    redirect(`/login?next=${encodeURIComponent(`/sandboxlive/portfolio${qs}`)}`);
  }

  const resolved = await resolveActiveOrganizationId(user.id, sp.org);
  if (!resolved.success) {
    redirect("/sandboxlive");
  }

  return <SandboxPortfolioView />;
}
