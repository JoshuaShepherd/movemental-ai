"use client";

import { OnboardingTaskShell } from "@/components/onboarding/onboarding-task-shell";
import { useOnboardingTaskPresentation } from "@/hooks/onboarding/use-onboarding-task-presentation";

export function AgentOnboardingTaskPage() {
  const { title, description, estimatedMinutes, dashboardPersona } =
    useOnboardingTaskPresentation("agent_test");

  const movementLeaderBody = (
    <>
      <p>
        Exercise your agent in whatever surface Movemental assigned (embedded tester, linked workspace, or
        concierge-led session). The goal is intentional prompts, grounded citations where applicable, and a
        short note on what to tighten next—then confirm below.
      </p>
      <p>
        If you were only given API access, coordinate with your Movemental contact for the recommended entry
        point; this dashboard step stays the single place to record completion once testing is done.
      </p>
    </>
  );

  const implementationBody = (
    <>
      <p>
        Exercise your workspace in whatever surface Movemental assigned. Prefer prompts that match how you
        actually decide—governance, operations, and ministry boundaries—not generic chats.
      </p>
      <p>
        Do not paste donor exports, youth-identifiable records, or unapproved CRM dumps into unmanaged tools.
        Coordinate with your Movemental contact for the recommended entry point if needed; mark complete here
        once testing is finished.
      </p>
    </>
  );

  return (
    <OnboardingTaskShell
      taskKey="agent_test"
      title={title}
      description={description}
      estimatedMinutes={estimatedMinutes}
    >
      <div className="flex flex-col gap-3 text-sm text-muted-foreground">
        {dashboardPersona === "implementation_org" ? implementationBody : movementLeaderBody}
      </div>
    </OnboardingTaskShell>
  );
}
