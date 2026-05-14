"use client";

/**
 * @see ./README.md — archived 2026-05; not mounted from layout.
 */

import * as React from "react";

import { OnboardingChecklist } from "@/components/onboarding/onboarding-checklist";
import { Button } from "@/components/ui/button";
import { useDashboardOrganizationSlug } from "@/components/dashboard/dashboard-org-context";
import { useOnboardingState } from "@/hooks/onboarding/use-onboarding-state";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export function OnboardingPanel() {
  const organizationSlug = useDashboardOrganizationSlug();
  const { data, isLoading, isError, error } = useOnboardingState(organizationSlug || null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [dismissed, setDismissed] = React.useState(false);

  React.useEffect(() => {
    if (!data?.organization.id) return;
    setDismissed(localStorage.getItem(`onboarding-dismissed-${data.organization.id}`) === "1");
  }, [data?.organization.id]);

  if (isLoading || !data) {
    return isError ? (
      <div className="mb-8 rounded-xl bg-card px-4 py-4 text-sm text-muted-foreground">
        {error?.message ?? "Could not load onboarding."}
      </div>
    ) : (
      <div className="mb-8 h-24 animate-pulse rounded-xl bg-card" aria-hidden />
    );
  }

  if (data.organization.onboarding_completed_at) {
    if (dismissed) return null;
    return (
      <div className="mb-8 flex flex-col gap-3 rounded-xl bg-card px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">You are fully onboarded — your dashboard is ready.</p>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="shrink-0 self-start sm:self-auto"
          onClick={() => {
            localStorage.setItem(`onboarding-dismissed-${data.organization.id}`, "1");
            setDismissed(true);
          }}
        >
          Dismiss
        </Button>
      </div>
    );
  }

  return (
    <section className="mb-10 rounded-xl bg-card px-4 py-5 md:px-6 md:py-6">
      <div className="flex items-start justify-between gap-3 lg:hidden">
        <p className="text-[0.78rem] font-medium uppercase tracking-eyebrow text-muted-foreground">Checklist</p>
        <button
          type="button"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? "Hide" : "Show"}
          <ChevronDown className={cn("size-4 transition-transform", mobileOpen && "rotate-180")} aria-hidden />
        </button>
      </div>

      <div className={cn("mt-2", !mobileOpen && "hidden lg:block")}>
        <OnboardingChecklist data={data} variant="panel" />
      </div>
    </section>
  );
}
