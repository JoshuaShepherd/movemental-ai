"use client";

import * as React from "react";

import { OnboardingTaskShell } from "@/components/onboarding/onboarding-task-shell";
import { useDashboardOrganizationSlug } from "@/components/dashboard/dashboard-org-context";
import { useOnboardingTaskPresentation } from "@/hooks/onboarding/use-onboarding-task-presentation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { persistBrandGuidelinesDraft } from "@/app/(dashboard)/dashboard/onboarding/_actions/finish-onboarding-tasks";

export function BrandGuidelinesTaskPage() {
  const slug = useDashboardOrganizationSlug();
  const { title, description, estimatedMinutes } = useOnboardingTaskPresentation("brand_guidelines");
  const [voice, setVoice] = React.useState("");
  const [audience, setAudience] = React.useState("");
  const [avoid, setAvoid] = React.useState("");
  const [freeText, setFreeText] = React.useState("");

  const slugRef = slug;
  const beforeMarkComplete = React.useCallback(async () => {
    const res = await persistBrandGuidelinesDraft({
      organizationSlug: slugRef || undefined,
      voiceAdjectives: voice
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      audienceDescription: audience.trim(),
      wordsToAvoid: avoid
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      freeText: freeText.trim() || undefined,
    });
    return res.ok ? { ok: true as const } : { ok: false as const, message: res.message };
  }, [slugRef, voice, audience, avoid, freeText]);

  return (
    <OnboardingTaskShell
      taskKey="brand_guidelines"
      title={title}
      description={description}
      estimatedMinutes={estimatedMinutes}
      beforeMarkComplete={beforeMarkComplete}
    >
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <Label htmlFor="voice">Voice adjectives (comma-separated)</Label>
          <Input id="voice" value={voice} onChange={(e) => setVoice(e.target.value)} placeholder="warm, precise, pastoral" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="audience">Primary audience</Label>
          <Textarea id="audience" rows={2} value={audience} onChange={(e) => setAudience(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="avoid">Words or topics to avoid (comma-separated)</Label>
          <Input id="avoid" value={avoid} onChange={(e) => setAvoid(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="md">Brand notes (markdown)</Label>
          <Textarea
            id="md"
            rows={6}
            value={freeText}
            onChange={(e) => setFreeText(e.target.value)}
            placeholder="Optional longer guidance — also saved to organization settings as markdown."
          />
        </div>
      </div>
    </OnboardingTaskShell>
  );
}
