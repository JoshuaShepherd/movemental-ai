"use client";

import Link from "next/link";
import * as React from "react";

import { OnboardingTaskShell } from "@/components/onboarding/onboarding-task-shell";
import { useDashboardOrganizationSlug } from "@/components/dashboard/dashboard-org-context";
import { useOnboardingTaskPresentation } from "@/hooks/onboarding/use-onboarding-task-presentation";
import { Label } from "@/components/ui/label";

import { persistCohortPrep } from "@/app/(dashboard)/dashboard/onboarding/_actions/finish-onboarding-tasks";

export function CohortPrepTaskPage() {
  const slug = useDashboardOrganizationSlug();
  const { title, description, estimatedMinutes } = useOnboardingTaskPresentation("cohort_prep");
  const [read, setRead] = React.useState(false);

  const slugRef = slug;
  const beforeMarkComplete = React.useCallback(async () => {
    if (!read) {
      return { ok: false as const, message: "Confirm you have read the field guide (or equivalent prep)." };
    }
    const res = await persistCohortPrep({ organizationSlug: slugRef || undefined });
    return res.ok ? { ok: true as const } : { ok: false as const, message: res.message };
  }, [slugRef, read]);

  return (
    <OnboardingTaskShell
      taskKey="cohort_prep"
      title={title}
      description={description}
      estimatedMinutes={estimatedMinutes}
      beforeMarkComplete={beforeMarkComplete}
    >
      <div className="space-y-4 text-sm text-muted-foreground">
        <p>
          Download or read the{" "}
          <Link href="/field-guides/safety" className="text-foreground underline">
            Safety field guide
          </Link>{" "}
          before your cohort kickoff. When you are ready, confirm below.
        </p>
        <div className="flex items-start gap-3 rounded-xl bg-section px-4 py-4">
          <input
            id="cohort-read"
            type="checkbox"
            checked={read}
            onChange={(e) => setRead(e.target.checked)}
            className="mt-1 size-4 rounded border-border text-primary"
          />
          <Label htmlFor="cohort-read" className="leading-relaxed">
            I have read the Sandbox Field Guide (or the prep packet my Movemental contact sent).
          </Label>
        </div>
      </div>
    </OnboardingTaskShell>
  );
}
