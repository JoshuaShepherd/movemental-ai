"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";

import { Eyebrow } from "@/components/primitives/eyebrow";
import { OnboardingTaskShell } from "@/components/onboarding/onboarding-task-shell";
import { useDashboardOrganizationSlug } from "@/components/dashboard/dashboard-org-context";
import { Button } from "@/components/ui/button";
import { useCompleteOnboardingTask } from "@/hooks/onboarding/use-onboarding-state";

const DOCUSIGN_URL = process.env.NEXT_PUBLIC_DOCUSIGN_ENGAGEMENT_URL;

export function AgreementTaskPage() {
  return (
    <OnboardingTaskShell
      taskKey="sign_agreement"
      title="Sign your engagement agreement"
      description="Review and sign the Master Services Agreement and Statement of Work for this engagement. When you are finished with signing, return here and mark this step complete."
      estimatedMinutes={15}
    >
      <div className="rounded-xl bg-section px-4 py-4 text-sm text-muted-foreground">
        <p>
          Signing is handled through our e-sign provider. Use the link below when your agreement is
          ready.
        </p>
        {DOCUSIGN_URL ? (
          <p className="mt-4">
            <Link href={DOCUSIGN_URL} className="font-medium text-primary hover:underline">
              Open signing envelope
            </Link>
          </p>
        ) : (
          <p className="mt-4">
            Your Movemental contact will send a signing link. Until then, you can continue by marking
            this step complete after you have signed offline.
          </p>
        )}
      </div>
    </OnboardingTaskShell>
  );
}

export function PaymentTaskPage() {
  return (
    <OnboardingTaskShell
      taskKey="confirm_payment"
      title="Confirm your payment"
      description="Confirm that payment for this engagement is arranged according to your Statement of Work."
      estimatedMinutes={5}
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
  const router = useRouter();
  const complete = useCompleteOnboardingTask(organizationSlug || null);
  const [date, setDate] = React.useState("");
  const [pending, setPending] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const saveAndComplete = async () => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return;
    setPending(true);
    try {
      const res = await fetch("/api/onboarding/cohort", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cohortStartDate: date, organizationSlug }),
      });
      if (!res.ok) throw new Error("Could not save cohort date.");
      await complete.mutateAsync({ taskKey: "choose_cohort" });
      setDone(true);
      window.setTimeout(() => {
        const q = organizationSlug ? `?org=${encodeURIComponent(organizationSlug)}` : "";
        router.push(`/welcome${q}`);
      }, 1400);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="mx-auto max-w-prose">
      <Eyebrow>Onboarding</Eyebrow>
      <h1 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-foreground">
        Choose your cohort start date
      </h1>
      <p className="mt-3 text-muted-foreground">
        Pick the cohort start date that matches your calendar. You can adjust later with Movemental if
        plans change.
      </p>
      <p className="mt-2 text-sm text-muted-foreground">Estimated time: 5 minutes</p>

      <label className="mt-8 flex flex-col gap-2 text-sm text-foreground">
        <span className="font-medium">Cohort start date</span>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="max-w-xs rounded-lg bg-background px-3 py-2 text-foreground outline-none ring-1 ring-border focus-visible:ring-2 focus-visible:ring-ring"
        />
      </label>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button
          type="button"
          variant="primary"
          disabled={pending || done || !date}
          onClick={() => void saveAndComplete()}
        >
          {done ? "Saved" : pending ? "Saving…" : "Save date and mark complete"}
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/welcome?org=${encodeURIComponent(organizationSlug)}`}>Back to checklist</Link>
        </Button>
      </div>
    </div>
  );
}
