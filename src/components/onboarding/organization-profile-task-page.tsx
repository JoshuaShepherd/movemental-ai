"use client";

import * as React from "react";

import { OnboardingTaskShell } from "@/components/onboarding/onboarding-task-shell";
import { useDashboardOrganizationSlug } from "@/components/dashboard/dashboard-org-context";
import { useOnboardingState } from "@/hooks/onboarding/use-onboarding-state";
import { useOnboardingTaskPresentation } from "@/hooks/onboarding/use-onboarding-task-presentation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { persistOrganizationProfileFields } from "@/app/(dashboard)/dashboard/onboarding/_actions/finish-onboarding-tasks";

function domainFromWebsite(website: string | null | undefined): string {
  if (!website?.trim()) return "";
  return website.replace(/^https?:\/\//i, "").replace(/\/$/, "");
}

export function OrganizationProfileTaskPage() {
  const slug = useDashboardOrganizationSlug();
  const { data } = useOnboardingState(slug || null);
  const { title, description, estimatedMinutes } = useOnboardingTaskPresentation("organization_profile");
  const org = data?.organization;

  const [publicName, setPublicName] = React.useState("");
  const [primaryDomain, setPrimaryDomain] = React.useState("");
  const [primaryContactName, setPrimaryContactName] = React.useState("");
  const [primaryContactEmail, setPrimaryContactEmail] = React.useState("");
  const [secondaryContactName, setSecondaryContactName] = React.useState("");
  const [secondaryContactEmail, setSecondaryContactEmail] = React.useState("");
  const [mission, setMission] = React.useState("");
  const [city, setCity] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [aiReadiness, setAiReadiness] = React.useState<number>(3);
  const [pending, setPending] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!org) return;
    setPublicName(org.name ?? "");
    setPrimaryDomain(domainFromWebsite(org.website));
    setPrimaryContactEmail(org.contact_email ?? "");
    setMission(org.description ?? "");
    setCity(org.city ?? "");
    setCountry(org.country ?? "");
    if (typeof org.aiReadiness === "number") setAiReadiness(org.aiReadiness);
  }, [org]);

  const beforeMarkComplete = React.useCallback(async () => {
    setErr(null);
    setPending(true);
    try {
      const res = await persistOrganizationProfileFields({
        organizationSlug: slug || undefined,
        publicName,
        primaryDomain,
        primaryContactName,
        primaryContactEmail,
        secondaryContactName: secondaryContactName || undefined,
        secondaryContactEmail: secondaryContactEmail || undefined,
        mission,
        city,
        country,
        aiReadiness,
      });
      if (!res.ok) {
        setErr(res.message ?? "Could not save.");
        return { ok: false as const, message: res.message };
      }
      return { ok: true as const };
    } finally {
      setPending(false);
    }
  }, [
    slug,
    publicName,
    primaryDomain,
    primaryContactName,
    primaryContactEmail,
    secondaryContactName,
    secondaryContactEmail,
    mission,
    city,
    country,
    aiReadiness,
  ]);

  return (
    <OnboardingTaskShell
      taskKey="organization_profile"
      title={title}
      description={description}
      estimatedMinutes={estimatedMinutes}
      beforeMarkComplete={beforeMarkComplete}
    >
      <div className="flex flex-col gap-5">
        {err ? <p className="text-sm text-[color:var(--destructive)]">{err}</p> : null}
        <div className="space-y-2">
          <Label htmlFor="publicName">Organization public name</Label>
          <Input id="publicName" value={publicName} onChange={(e) => setPublicName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mission">Mission (short)</Label>
          <Textarea id="mission" rows={3} value={mission} onChange={(e) => setMission(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="primaryDomain">Primary website domain</Label>
          <Input
            id="primaryDomain"
            placeholder="example.org"
            value={primaryDomain}
            onChange={(e) => setPrimaryDomain(e.target.value)}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="city">City / region</Label>
            <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input id="country" value={country} onChange={(e) => setCountry(e.target.value)} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="pcn">Primary contact name</Label>
          <Input id="pcn" value={primaryContactName} onChange={(e) => setPrimaryContactName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pce">Primary contact email</Label>
          <Input
            id="pce"
            type="email"
            value={primaryContactEmail}
            onChange={(e) => setPrimaryContactEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="scn">Secondary contact name (optional)</Label>
          <Input id="scn" value={secondaryContactName} onChange={(e) => setSecondaryContactName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sce">Secondary contact email (optional)</Label>
          <Input id="sce" type="email" value={secondaryContactEmail} onChange={(e) => setSecondaryContactEmail(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="air">AI readiness self-rating (1 = early, 5 = very ready)</Label>
          <Input
            id="air"
            type="number"
            min={1}
            max={5}
            value={aiReadiness}
            onChange={(e) => setAiReadiness(Number(e.target.value))}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Your answers are saved when you press <strong className="text-foreground">Mark complete</strong> below.
        </p>
      </div>
    </OnboardingTaskShell>
  );
}
