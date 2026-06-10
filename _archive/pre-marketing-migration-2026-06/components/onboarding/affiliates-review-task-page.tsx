"use client";

import * as React from "react";

import { OnboardingTaskShell } from "@/components/onboarding/onboarding-task-shell";
import { useDashboardOrganizationSlug } from "@/components/dashboard/dashboard-org-context";
import { useOnboardingTaskPresentation } from "@/hooks/onboarding/use-onboarding-task-presentation";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { persistAffiliatesReview } from "@/app/(dashboard)/dashboard/onboarding/_actions/finish-onboarding-tasks";

export function AffiliatesReviewTaskPage() {
  const slug = useDashboardOrganizationSlug();
  const { title, description, estimatedMinutes } = useOnboardingTaskPresentation("affiliates_review");
  const [note, setNote] = React.useState("");

  const slugRef = slug;
  const beforeMarkComplete = React.useCallback(async () => {
    const res = await persistAffiliatesReview({ organizationSlug: slugRef || undefined, note });
    return res.ok ? { ok: true as const } : { ok: false as const, message: res.message };
  }, [slugRef, note]);

  return (
    <OnboardingTaskShell
      taskKey="affiliates_review"
      title={title}
      description={description}
      estimatedMinutes={estimatedMinutes}
      beforeMarkComplete={beforeMarkComplete}
    >
      <div className="space-y-4 text-sm text-muted-foreground">
        <p>
          When Movemental prep finishes, affiliate suggestions appear in your corpus pipeline. If nothing is listed
          yet, add corrections below — we still record your review.
        </p>
        <div className="space-y-2">
          <Label htmlFor="aff-note">Corrections or notes for our team</Label>
          <Textarea id="aff-note" rows={4} value={note} onChange={(e) => setNote(e.target.value)} />
        </div>
      </div>
    </OnboardingTaskShell>
  );
}
