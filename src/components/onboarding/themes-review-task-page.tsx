"use client";

import * as React from "react";

import { OnboardingTaskShell } from "@/components/onboarding/onboarding-task-shell";
import { useDashboardOrganizationSlug } from "@/components/dashboard/dashboard-org-context";
import { useOnboardingTaskPresentation } from "@/hooks/onboarding/use-onboarding-task-presentation";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { persistThemesReview } from "@/app/(dashboard)/dashboard/onboarding/_actions/finish-onboarding-tasks";

export function ThemesReviewTaskPage() {
  const slug = useDashboardOrganizationSlug();
  const { title, description, estimatedMinutes } = useOnboardingTaskPresentation("themes_review");
  const [note, setNote] = React.useState("");

  const slugRef = slug;
  const beforeMarkComplete = React.useCallback(async () => {
    const res = await persistThemesReview({ organizationSlug: slugRef || undefined, note });
    return res.ok ? { ok: true as const } : { ok: false as const, message: res.message };
  }, [slugRef, note]);

  return (
    <OnboardingTaskShell
      taskKey="themes_review"
      title={title}
      description={description}
      estimatedMinutes={estimatedMinutes}
      beforeMarkComplete={beforeMarkComplete}
    >
      <div className="space-y-4 text-sm text-muted-foreground">
        <p>
          Detected editorial themes will surface here after corpus prep. Leave guidance for your Movemental editor if
          themes need correction.
        </p>
        <div className="space-y-2">
          <Label htmlFor="th-note">Theme corrections or affirmations</Label>
          <Textarea id="th-note" rows={4} value={note} onChange={(e) => setNote(e.target.value)} />
        </div>
      </div>
    </OnboardingTaskShell>
  );
}
