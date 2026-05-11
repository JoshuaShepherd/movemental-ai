"use client";

import * as React from "react";

import { OnboardingTaskShell } from "@/components/onboarding/onboarding-task-shell";
import { useDashboardOrganizationSlug } from "@/components/dashboard/dashboard-org-context";
import { useOnboardingTaskPresentation } from "@/hooks/onboarding/use-onboarding-task-presentation";
import { Label } from "@/components/ui/label";

import { persistOrientation } from "@/app/(dashboard)/dashboard/onboarding/_actions/finish-onboarding-tasks";

export function OrientationTaskPage() {
  const slug = useDashboardOrganizationSlug();
  const { title, description, estimatedMinutes } = useOnboardingTaskPresentation("orientation");
  const [read, setRead] = React.useState(false);

  const slugRef = slug;
  const beforeMarkComplete = React.useCallback(async () => {
    if (!read) {
      return { ok: false as const, message: "Confirm you have completed the orientation read-through." };
    }
    const res = await persistOrientation({ organizationSlug: slugRef || undefined });
    return res.ok ? { ok: true as const } : { ok: false as const, message: res.message };
  }, [slugRef, read]);

  return (
    <OnboardingTaskShell
      taskKey="orientation"
      title={title}
      description={description}
      estimatedMinutes={estimatedMinutes}
      beforeMarkComplete={beforeMarkComplete}
    >
      <div className="space-y-4 text-sm text-muted-foreground">
        <p>
          Orientation covers what Movemental is, how cohorts run, and what success looks like. When your Movemental
          contact shares a video or doc link, open it here — this checkbox confirms you have reviewed it.
        </p>
        <div className="flex items-start gap-3 rounded-xl bg-section px-4 py-4">
          <input
            id="orient-read"
            type="checkbox"
            checked={read}
            onChange={(e) => setRead(e.target.checked)}
            className="mt-1 size-4 rounded border-border text-primary"
          />
          <Label htmlFor="orient-read" className="leading-relaxed">
            I have completed the orientation materials my Movemental contact provided (or the linked overview).
          </Label>
        </div>
      </div>
    </OnboardingTaskShell>
  );
}
