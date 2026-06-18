"use client";

import { useGuidebook, useSafetyEngagement } from "@/hooks/safety";

type Props = {
  organizationId: string;
};

/**
 * Dashboard overview — engagement progress strip + guidebook layer cards.
 * Drop into SafeStart Stitch shells once those routes exist.
 */
export function SafeStartOverview({ organizationId }: Props) {
  const engagement = useSafetyEngagement(organizationId);
  const guidebook = useGuidebook(organizationId);

  if (engagement.isLoading || guidebook.isLoading) {
    return (
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Loading SafeStart workspace…
      </p>
    );
  }

  if (engagement.isError || guidebook.isError) {
    return (
      <p className="text-sm text-destructive">
        {engagement.error?.message ?? guidebook.error?.message ?? "Could not load SafeStart data."}
      </p>
    );
  }

  if (!engagement.data && !guidebook.data) {
    return (
      <p className="text-sm text-muted-foreground">
        No SafeStart engagement yet. Complete enrollment to provision your guidebook.
      </p>
    );
  }

  const e = engagement.data;
  const g = guidebook.data;

  return (
    <div className="space-y-8">
      {e ? (
        <section aria-label="Engagement progress">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
            SafeStart · Step {e.currentStep} of 6
          </p>
          <p className="mt-2 text-lg font-medium capitalize">{e.status.replace(/_/g, " ")}</p>
          {e.dashboardProvisionedAt ? (
            <p className="mt-1 text-sm text-muted-foreground">
              Dashboard provisioned {new Date(e.dashboardProvisionedAt).toLocaleDateString()}
            </p>
          ) : null}
        </section>
      ) : null}

      {g ? (
        <section aria-label="Guidebook layers">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
            {g.title}
          </p>
          <ul className="mt-4 divide-y divide-border border border-border rounded-lg">
            {g.layers.map((layer) => (
              <li key={layer.artifactId} className="flex items-start justify-between gap-4 px-4 py-3">
                <div>
                  <p className="font-medium">{layer.title}</p>
                  {layer.deck ? (
                    <p className="mt-0.5 text-sm italic text-muted-foreground">{layer.deck}</p>
                  ) : null}
                </div>
                <span className="shrink-0 font-mono text-[0.65rem] uppercase tracking-wide text-muted-foreground">
                  {layer.reviewStatus.replace(/_/g, " ")}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
