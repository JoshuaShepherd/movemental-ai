"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";

import { Eyebrow } from "@/components/primitives/eyebrow";
import { AgreementSignPage } from "@/components/onboarding/agreement-sign-page";
import { OnboardingTaskShell } from "@/components/onboarding/onboarding-task-shell";
import { useDashboardOrganizationSlug } from "@/components/dashboard/dashboard-org-context";
import { TrainingSchedulePanel } from "@/components/scheduling/training-schedule-panel";
import { Button } from "@/components/ui/button";
import { useOnboardingTaskPresentation } from "@/hooks/onboarding/use-onboarding-task-presentation";

export function AgreementTaskPage() {
  return <AgreementSignPage />;
}

export function PaymentTaskPage() {
  const { title, description, estimatedMinutes } = useOnboardingTaskPresentation("confirm_payment");

  return (
    <OnboardingTaskShell
      taskKey="confirm_payment"
      title={title}
      description={description}
      estimatedMinutes={estimatedMinutes}
    >
      <p className="text-sm text-muted-foreground">
        If you pay through an invoice or shared checkout link, confirm here once payment has been
        submitted. Stripe checkout wiring can replace this note when your billing flow is connected.
      </p>
    </OnboardingTaskShell>
  );
}

export function CohortTaskPage() {
  const organizationSlug = useDashboardOrganizationSlug();
  const { description: cohortDescription } = useOnboardingTaskPresentation("choose_cohort");
  const router = useRouter();
  const [done, setDone] = React.useState(false);

  const backHref = organizationSlug
    ? `/welcome?org=${encodeURIComponent(organizationSlug)}`
    : "/welcome";

  return (
    <div className="mx-auto max-w-3xl">
      <Eyebrow>Onboarding</Eyebrow>
      <h1 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-foreground">
        Choose your cohort start date
      </h1>
      <p className="mt-3 text-muted-foreground">{cohortDescription}</p>
      <p className="mt-2 text-sm text-muted-foreground">Estimated time: 5 minutes</p>

      <div className="mt-8">
        <TrainingSchedulePanel
          organizationSlug={organizationSlug || null}
          showManualDateAndComplete
          onManualCompleteSuccess={() => {
            setDone(true);
            window.setTimeout(() => {
              const q = organizationSlug ? `?org=${encodeURIComponent(organizationSlug)}` : "";
              router.push(`/welcome${q}`);
            }, 1400);
          }}
        />
      </div>

      {done ? (
        <p className="mt-6 text-sm font-medium text-pathway-accent">Saved — returning to your checklist…</p>
      ) : null}

      <div className="mt-8">
        <Button variant="ghost" size="sm" asChild>
          <Link href={backHref}>Back to checklist</Link>
        </Button>
      </div>
    </div>
  );
}
