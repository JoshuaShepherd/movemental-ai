"use client";

import Link from "next/link";
import * as React from "react";

import { CalendlyEmbed } from "@/components/scheduling/calendly-embed";
import { Button } from "@/components/ui/button";
import { withCalendlyOrgTracking } from "@/lib/scheduling/calendly-url";

type TrainingSchedulePanelProps = {
  organizationSlug: string | null;
  /** When true, show date picker + save (onboarding cohort completion). */
  showManualDateAndComplete?: boolean;
  onManualCompleteSuccess?: () => void;
  backToChecklistHref?: string;
};

/**
 * Shared Calendly embed + optional manual cohort date (onboarding).
 */
export function TrainingSchedulePanel({
  organizationSlug,
  showManualDateAndComplete = false,
  onManualCompleteSuccess,
  backToChecklistHref,
}: TrainingSchedulePanelProps) {
  const [baseUrl, setBaseUrl] = React.useState<string | null>(null);
  const [loadError, setLoadError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    const q = organizationSlug ? `?org=${encodeURIComponent(organizationSlug)}` : "";
    void fetch(`/api/onboarding/calendly-training-url${q}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Could not load scheduling URL.");
        const data = (await res.json()) as { url?: string | null };
        if (!cancelled) setBaseUrl(typeof data.url === "string" && data.url ? data.url : null);
      })
      .catch(() => {
        if (!cancelled) setLoadError("Scheduling link could not be loaded.");
      });
    return () => {
      cancelled = true;
    };
  }, [organizationSlug]);

  const embedUrl =
    baseUrl && organizationSlug ? withCalendlyOrgTracking(baseUrl, organizationSlug) : baseUrl;

  const [date, setDate] = React.useState("");
  const [pending, setPending] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [manualError, setManualError] = React.useState<string | null>(null);

  const saveManual = async () => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return;
    setPending(true);
    setManualError(null);
    try {
      const res = await fetch("/api/onboarding/cohort", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cohortStartDate: date, organizationSlug }),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: { message?: string } };
        throw new Error(j.error?.message ?? "Could not save cohort date.");
      }
      if (showManualDateAndComplete) {
        const c = await fetch("/api/onboarding/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ taskKey: "choose_cohort", organizationSlug }),
        });
        if (!c.ok) {
          const j = (await c.json().catch(() => ({}))) as { error?: { message?: string } };
          throw new Error(j.error?.message ?? "Could not mark onboarding step complete.");
        }
      }
      setDone(true);
      onManualCompleteSuccess?.();
    } catch (e) {
      setManualError(e instanceof Error ? e.message : "Save failed.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-medium tracking-tight text-foreground">Schedule with Calendly</h2>
        {loadError ? (
          <p className="text-sm text-muted-foreground">{loadError}</p>
        ) : embedUrl ? (
          <CalendlyEmbed url={embedUrl} />
        ) : (
          <p className="text-sm text-muted-foreground">
            A Calendly training link is not configured yet. Set{" "}
            <code className="rounded bg-section px-1 py-0.5 text-xs">NEXT_PUBLIC_CALENDLY_TRAINING_URL</code> or add{" "}
            <code className="rounded bg-section px-1 py-0.5 text-xs">calendly_training_url</code> to your
            organization settings. You can still set a start date manually below.
          </p>
        )}
        <p className="text-xs leading-relaxed text-muted-foreground">
          Bookings send <code className="text-[11px]">utm_content</code> with your organization slug so Movemental can
          sync your cohort start date automatically when webhooks are enabled.
        </p>
      </section>

      {showManualDateAndComplete ? (
        <section className="flex flex-col gap-4 border-t border-border pt-8">
          <h2 className="text-lg font-medium tracking-tight text-foreground">Or set start date manually</h2>
          <p className="text-sm text-muted-foreground">
            If you already agreed on a kickoff date outside Calendly, enter it here and save.
          </p>
          <label className="flex max-w-xs flex-col gap-2 text-sm text-foreground">
            <span className="font-medium">Cohort start date</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="rounded-lg bg-background px-3 py-2 text-foreground outline-none ring-1 ring-border focus-visible:ring-2 focus-visible:ring-ring"
            />
          </label>
          {manualError ? <p className="text-sm text-destructive">{manualError}</p> : null}
          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              variant="primary"
              disabled={pending || done || !date}
              onClick={() => void saveManual()}
            >
              {done ? "Saved" : pending ? "Saving…" : "Save date and mark complete"}
            </Button>
            {backToChecklistHref ? (
              <Button variant="ghost" size="sm" asChild>
                <Link href={backToChecklistHref}>Back to checklist</Link>
              </Button>
            ) : null}
          </div>
        </section>
      ) : null}
    </div>
  );
}
