"use client";

import { OnboardingTaskShell } from "@/components/onboarding/onboarding-task-shell";
import { taskDefinitionByKey } from "@/lib/onboarding/tasks";

export function PlaceholderOnboardingStep({ taskKey }: { taskKey: string }) {
  const def = taskDefinitionByKey(taskKey);
  if (!def) return null;
  return (
    <OnboardingTaskShell
      taskKey={taskKey}
      title={def.title}
      description={def.description}
      estimatedMinutes={def.estimatedMinutes}
    >
      <p className="text-sm text-muted-foreground">
        This step&apos;s full UI is still shipping. Complete the work with your Movemental contact if
        needed, then mark complete here.
      </p>
    </OnboardingTaskShell>
  );
}
