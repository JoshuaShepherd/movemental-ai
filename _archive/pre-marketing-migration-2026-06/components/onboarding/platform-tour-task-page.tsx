"use client";

import Link from "next/link";
import * as React from "react";

import { OnboardingTaskShell } from "@/components/onboarding/onboarding-task-shell";
import { useDashboardOrganizationSlug } from "@/components/dashboard/dashboard-org-context";
import { useOnboardingTaskPresentation } from "@/hooks/onboarding/use-onboarding-task-presentation";
import { Label } from "@/components/ui/label";

import { persistPlatformTour } from "@/app/(dashboard)/dashboard/onboarding/_actions/finish-onboarding-tasks";

const STOPS: Array<{ key: keyof typeof initial; label: string; href: string }> = [
  { key: "sandboxlive", label: "Sandbox home", href: "/sandboxlive" },
  { key: "recipes", label: "Recipe library", href: "/sandboxlive/recipes" },
  { key: "cohort", label: "Cohort view", href: "/sandboxlive/cohort" },
  { key: "future_plan", label: "Future plan workspace", href: "/sandboxlive/phase/08-future-plan" },
  { key: "guidebook", label: "SafeStart guidebook", href: "/safestart/guidebook" },
];

const initial = {
  sandboxlive: false,
  recipes: false,
  cohort: false,
  future_plan: false,
  guidebook: false,
};

export function PlatformTourTaskPage() {
  const slug = useDashboardOrganizationSlug();
  const { title, description, estimatedMinutes } = useOnboardingTaskPresentation("platform_tour");
  const [checklist, setChecklist] = React.useState(initial);

  const slugRef = slug;
  const beforeMarkComplete = React.useCallback(async () => {
    const res = await persistPlatformTour({
      organizationSlug: slugRef || undefined,
      checklist,
    });
    return res.ok ? { ok: true as const } : { ok: false as const, message: res.message };
  }, [slugRef, checklist]);

  return (
    <OnboardingTaskShell
      taskKey="platform_tour"
      title={title}
      description={description}
      estimatedMinutes={estimatedMinutes}
      beforeMarkComplete={beforeMarkComplete}
    >
      <ul className="flex flex-col gap-4">
        {STOPS.map((s) => (
          <li key={s.key} className="flex flex-wrap items-start justify-between gap-3 rounded-xl bg-section px-4 py-3">
            <div>
              <Link href={s.href} className="font-medium text-foreground underline-offset-4 hover:underline">
                {s.label}
              </Link>
              <p className="mt-1 text-xs text-muted-foreground">{s.href}</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                id={`tour-${s.key}`}
                type="checkbox"
                checked={checklist[s.key]}
                onChange={(e) => setChecklist((c) => ({ ...c, [s.key]: e.target.checked }))}
                className="size-4 rounded border-border text-primary"
              />
              <Label htmlFor={`tour-${s.key}`} className="text-sm text-muted-foreground">
                Visited
              </Label>
            </div>
          </li>
        ))}
      </ul>
    </OnboardingTaskShell>
  );
}
