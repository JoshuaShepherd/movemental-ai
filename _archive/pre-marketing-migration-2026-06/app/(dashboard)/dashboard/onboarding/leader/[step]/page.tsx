import { notFound } from "next/navigation";

import { LeaderOnboardingStepClient } from "@/components/onboarding/leader-onboarding-step-client";
import { createClient } from "@/lib/supabase/server";
import { isLeaderOnboardingStep } from "@/lib/onboarding/leader-onboarding";
import { getMovementLeaderByEmail } from "@/lib/movement-leaders/movement-leaders.server";

export const dynamic = "force-dynamic";

export default async function LeaderOnboardingStepPage({
  params,
}: {
  params: Promise<{ step: string }>;
}) {
  const { step } = await params;
  if (!isLeaderOnboardingStep(step)) notFound();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const leader = await getMovementLeaderByEmail(user?.email ?? null);
  if (!leader) notFound();

  return <LeaderOnboardingStepClient step={step} leader={leader} />;
}
