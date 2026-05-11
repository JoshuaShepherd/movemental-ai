import { notFound } from "next/navigation";

import { CorpusReviewTaskPage } from "@/components/onboarding/corpus-review-task-page";
import { PlaceholderOnboardingStep } from "@/components/onboarding/placeholder-onboarding-step";
import {
  AgreementTaskPage,
  CohortTaskPage,
  PaymentTaskPage,
} from "@/components/onboarding/phase1-task-pages";
import { OnboardingTaskShell } from "@/components/onboarding/onboarding-task-shell";
import { ONBOARDING_TASKS, taskDefinitionByKey } from "@/lib/onboarding/tasks";

export const dynamic = "force-dynamic";

const STEP_TO_TASK_KEY: Record<string, string> = {};
for (const t of ONBOARDING_TASKS) {
  const seg = t.route.replace(/^\/onboarding\//, "");
  STEP_TO_TASK_KEY[seg] = t.key;
}

function AgentTaskPage() {
  const def = taskDefinitionByKey("agent_test");
  return (
    <OnboardingTaskShell
      taskKey="agent_test"
      title={def?.title ?? "Test your AI agent"}
      description={
        def?.description ??
        "Your personal AI agent is ready. Test it, give feedback, and approve."
      }
      estimatedMinutes={def?.estimatedMinutes ?? 15}
    >
      <p className="text-sm text-muted-foreground">
        The interactive agent tester is not wired to this page yet. When Movemental enables your test
        session, use the flow they share; you can still mark this step complete here once you have
        finished testing.
      </p>
    </OnboardingTaskShell>
  );
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
      return <AgentTaskPage />;
    default:
      return <PlaceholderOnboardingStep taskKey={taskKey} />;
  }
}
