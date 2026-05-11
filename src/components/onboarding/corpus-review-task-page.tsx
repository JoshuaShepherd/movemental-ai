"use client";

import * as React from "react";

import { OnboardingTaskShell } from "@/components/onboarding/onboarding-task-shell";
import { useDashboardOrganizationSlug } from "@/components/dashboard/dashboard-org-context";
import { taskDefinitionByKey } from "@/lib/onboarding/tasks";

type CorpusItem = {
  id: string;
  itemType: string;
  title: string;
  summary?: string;
  status: string;
};

export function CorpusReviewTaskPage() {
  const organizationSlug = useDashboardOrganizationSlug();
  const def = taskDefinitionByKey("corpus_review");
  const [items, setItems] = React.useState<CorpusItem[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!organizationSlug) return;
    let cancelled = false;
    const qs = `?org=${encodeURIComponent(organizationSlug)}`;
    void fetch(`/api/onboarding/corpus${qs}`)
      .then(async (res) => {
        const json = (await res.json()) as {
          success?: boolean;
          data?: { items?: CorpusItem[] };
          error?: { message?: string };
        };
        if (!res.ok) throw new Error(json.error?.message ?? "Could not load corpus.");
        if (!cancelled) setItems(json.data?.items ?? []);
      })
      .catch((e: unknown) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Could not load corpus.");
      });
    return () => {
      cancelled = true;
    };
  }, [organizationSlug]);

  return (
    <OnboardingTaskShell
      taskKey="corpus_review"
      title={def?.title ?? "Review your research corpus"}
      description={
        def?.description ??
        "Books, articles, and source material we have compiled. Add what is missing, flag what should not be there."
      }
      estimatedMinutes={def?.estimatedMinutes ?? 20}
    >
      {error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : items === null ? (
        <div className="h-24 animate-pulse rounded-xl bg-section" aria-hidden />
      ) : items.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No compiled corpus items are in your workspace yet. When Movemental finishes assembling your
          sources, they will appear here for review.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <li key={item.id} className="rounded-xl bg-section px-4 py-4">
              <p className="font-medium text-foreground">{item.title}</p>
              <p className="mt-1 text-xs uppercase tracking-eyebrow text-muted-foreground">
                {item.itemType} · {item.status}
              </p>
              {item.summary ? (
                <p className="mt-2 text-sm text-muted-foreground line-clamp-4">{item.summary}</p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </OnboardingTaskShell>
  );
}
