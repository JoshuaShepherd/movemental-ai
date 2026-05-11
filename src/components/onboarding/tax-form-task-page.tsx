"use client";

import * as React from "react";

import { OnboardingTaskShell } from "@/components/onboarding/onboarding-task-shell";
import { useDashboardOrganizationSlug } from "@/components/dashboard/dashboard-org-context";
import { useOnboardingState } from "@/hooks/onboarding/use-onboarding-state";
import { useOnboardingTaskPresentation } from "@/hooks/onboarding/use-onboarding-task-presentation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { persistTaxFormFields } from "@/app/(dashboard)/dashboard/onboarding/_actions/finish-onboarding-tasks";

export function TaxFormTaskPage() {
  const slug = useDashboardOrganizationSlug();
  const { data } = useOnboardingState(slug || null);
  const { title, description, estimatedMinutes } = useOnboardingTaskPresentation("tax_form");
  const leaderPayments = data?.leaderPaymentsEnabled ?? false;

  const [formType, setFormType] = React.useState<"W-9" | "W-8BEN" | "not_applicable">("W-9");
  const [documentUrl, setDocumentUrl] = React.useState("");
  const [legalName, setLegalName] = React.useState("");
  const [notes, setNotes] = React.useState("");

  const slugRef = slug;
  const beforeMarkComplete = React.useCallback(async () => {
    const res = await persistTaxFormFields({
      organizationSlug: slugRef || undefined,
      formType,
      documentUrl: documentUrl || null,
      legalName: legalName || undefined,
      notes: notes || undefined,
    });
    return res.ok ? { ok: true as const } : { ok: false as const, message: res.message };
  }, [slugRef, formType, documentUrl, legalName, notes]);

  if (!leaderPayments) {
    return (
      <OnboardingTaskShell
        taskKey="tax_form"
        title={title}
        description={description}
        estimatedMinutes={estimatedMinutes}
      >
        <p className="text-sm text-muted-foreground">
          Tax documentation is not required for your engagement type. You can mark this step complete — it may
          already show as skipped automatically.
        </p>
      </OnboardingTaskShell>
    );
  }

  return (
    <OnboardingTaskShell
      taskKey="tax_form"
      title={title}
      description={description}
      estimatedMinutes={estimatedMinutes}
      beforeMarkComplete={beforeMarkComplete}
    >
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <Label>Form type</Label>
          <select
            className="flex h-10 w-full max-w-xs rounded-md border border-border bg-background px-3 text-sm text-foreground"
            value={formType}
            onChange={(e) => setFormType(e.target.value as typeof formType)}
          >
            <option value="W-9">W-9 (US)</option>
            <option value="W-8BEN">W-8BEN (non-US)</option>
            <option value="not_applicable">Not applicable</option>
          </select>
        </div>
        {formType !== "not_applicable" ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="doc">Signed form URL (PDF in storage)</Label>
              <Input id="doc" type="url" value={documentUrl} onChange={(e) => setDocumentUrl(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="legal">Legal name on form</Label>
              <Input id="legal" value={legalName} onChange={(e) => setLegalName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes to finance (optional)</Label>
              <Textarea id="notes" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>
          </>
        ) : null}
      </div>
    </OnboardingTaskShell>
  );
}
