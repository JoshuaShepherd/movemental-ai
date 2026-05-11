import { redirect } from "next/navigation";

import { leaderOnboardingHref } from "@/lib/onboarding/leader-onboarding";

export default function LeaderOnboardingIndexPage() {
  redirect(leaderOnboardingHref("confirm-bio"));
}
