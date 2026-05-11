"use client";

import * as React from "react";

import { OnboardingTaskShell } from "@/components/onboarding/onboarding-task-shell";
import { useDashboardOrganizationSlug } from "@/components/dashboard/dashboard-org-context";
import { useOnboardingTaskPresentation } from "@/hooks/onboarding/use-onboarding-task-presentation";
import { Label } from "@/components/ui/label";

import { persistConsentBlock } from "@/app/(dashboard)/dashboard/onboarding/_actions/finish-onboarding-tasks";

export function ConsentBlockTaskPage() {
  const slug = useDashboardOrganizationSlug();
  const { title, description, estimatedMinutes } = useOnboardingTaskPresentation("consent_block");
  const [agree, setAgree] = React.useState(false);

  const slugRef = slug;
  const beforeMarkComplete = React.useCallback(async () => {
    if (!agree) {
      return { ok: false as const, message: "Confirm the acknowledgment checkbox first." };
    }
    const res = await persistConsentBlock({ organizationSlug: slugRef || undefined });
    return res.ok ? { ok: true as const } : { ok: false as const, message: res.message };
  }, [slugRef, agree]);

  return (
    <OnboardingTaskShell
      taskKey="consent_block"
      title={title}
      description={description}
      estimatedMinutes={estimatedMinutes}
      beforeMarkComplete={beforeMarkComplete}
    >
      <div className="flex items-start gap-3 rounded-xl bg-section px-4 py-4">
        <input
          id="consent-ai"
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="mt-1 size-4 rounded border-border text-primary"
        />
        <Label htmlFor="consent-ai" className="text-sm leading-relaxed text-muted-foreground">
          On behalf of our organization, we acknowledge that AI-assisted work performed under this engagement
          follows our existing data governance, privacy, and communications policies. We authorize Movemental to
          reference public materials we supply for model context within the bounds of our agreement.
        </Label>
      </div>
    </OnboardingTaskShell>
  );
}
