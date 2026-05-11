import { notFound } from "next/navigation";

import { AgentOnboardingTaskPage } from "@/components/onboarding/agent-onboarding-task-page";
import { CorpusReviewTaskPage } from "@/components/onboarding/corpus-review-task-page";
import { PlaceholderOnboardingStep } from "@/components/onboarding/placeholder-onboarding-step";
import {
  AgreementTaskPage,
  CohortTaskPage,
  PaymentTaskPage,
} from "@/components/onboarding/phase1-task-pages";
import { ONBOARDING_TASKS } from "@/lib/onboarding/tasks";

export const dynamic = "force-dynamic";

const STEP_TO_TASK_KEY: Record<string, string> = {};
for (const t of ONBOARDING_TASKS) {
  const seg = t.route.replace(/^\/onboarding\//, "");
  STEP_TO_TASK_KEY[seg] = t.key;
}

export default async function DashboardOnboardingStepPage({
  params,
}: {
  params: Promise<{ step: string }>;
}) {
  const { step } = await params;
  const taskKey = STEP_TO_TASK_KEY[step];
  if (!taskKey) notFound();

  switch (step) {
    case "agreement":
      return <AgreementTaskPage />;
    case "payment":
      return <PaymentTaskPage />;
    case "cohort":
      return <CohortTaskPage />;
    case "corpus":
      return <CorpusReviewTaskPage />;
    case "agent":
      return <AgentOnboardingTaskPage />;
    default:
      return <PlaceholderOnboardingStep taskKey={taskKey} />;
  }
}
