"use client";

import * as React from "react";

import { OnboardingTaskShell } from "@/components/onboarding/onboarding-task-shell";
import { useDashboardOrganizationSlug } from "@/components/dashboard/dashboard-org-context";
import { useOnboardingState } from "@/hooks/onboarding/use-onboarding-state";
import { useOnboardingTaskPresentation } from "@/hooks/onboarding/use-onboarding-task-presentation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { persistOrganizationImages } from "@/app/(dashboard)/dashboard/onboarding/_actions/finish-onboarding-tasks";

export function ImagesUploadTaskPage() {
  const slug = useDashboardOrganizationSlug();
  const { data } = useOnboardingState(slug || null);
  const { title, description, estimatedMinutes } = useOnboardingTaskPresentation("images_upload");
  const org = data?.organization;

  const [logoUrl, setLogoUrl] = React.useState("");
  const [headshotUrl, setHeadshotUrl] = React.useState("");

  React.useEffect(() => {
    if (!org) return;
    setLogoUrl(org.logo_url ?? "");
    setHeadshotUrl(org.leader_headshot_url ?? "");
  }, [org]);

  const slugRef = slug;
  const beforeMarkComplete = React.useCallback(async () => {
    const res = await persistOrganizationImages({
      organizationSlug: slugRef || undefined,
      logoUrl: logoUrl || null,
      leaderHeadshotUrl: headshotUrl || null,
    });
    return res.ok ? { ok: true as const } : { ok: false as const, message: res.message };
  }, [slugRef, logoUrl, headshotUrl]);

  return (
    <OnboardingTaskShell
      taskKey="images_upload"
      title={title}
      description={description}
      estimatedMinutes={estimatedMinutes}
      beforeMarkComplete={beforeMarkComplete}
    >
      <div className="flex flex-col gap-5 text-sm text-muted-foreground">
        <p>Paste public URLs (for example from Supabase Storage or your CDN). File-picker uploads can replace these fields later.</p>
        <div className="space-y-2">
          <Label htmlFor="logo">Organization logo URL</Label>
          <Input id="logo" type="url" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} placeholder="https://…" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="headshot">Primary leader headshot URL</Label>
          <Input
            id="headshot"
            type="url"
            value={headshotUrl}
            onChange={(e) => setHeadshotUrl(e.target.value)}
            placeholder="https://…"
          />
        </div>
      </div>
    </OnboardingTaskShell>
  );
}
