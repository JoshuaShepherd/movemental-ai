"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import type { AdminOnboardingOrgSummary } from "@/lib/services/onboarding/onboarding.service";
import { Button } from "@/components/ui/button";

const PREP_LABEL: Record<string, string> = {
  corpus_review: "Corpus",
  affiliates_review: "Affiliates",
  themes_review: "Themes",
  agent_test: "Agent",
};

export function AdminOnboardingClient({
  initialRows,
}: {
  initialRows: AdminOnboardingOrgSummary[];
}) {
  const router = useRouter();
  const [pending, setPending] = React.useState<string | null>(null);

  const unlock = async (organizationId: string, taskKey: string) => {
    const id = `${organizationId}:${taskKey}`;
    setPending(id);
    try {
      const res = await fetch("/api/admin/onboarding/unlock", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ organizationId, taskKey }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        window.alert((body as { error?: { message?: string } }).error?.message ?? "Unlock failed.");
        return;
      }
      router.refresh();
    } finally {
      setPending(null);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold tracking-[-0.02em] text-foreground">Onboarding</h2>
      <p className="mt-2 max-w-prose text-sm text-muted-foreground">
        Unlock Movemental-prep tasks when the leader&apos;s materials are ready. Each action is
        deliberate and single-org.
      </p>

      <div className="mt-8 overflow-x-auto rounded-xl bg-card">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead>
            <tr className="text-muted-foreground">
              <th className="px-4 py-3 font-medium">Organization</th>
              <th className="px-4 py-3 font-medium">Phase</th>
              <th className="px-4 py-3 font-medium">Last activity</th>
              <th className="px-4 py-3 font-medium">Cohort start</th>
              <th className="px-4 py-3 font-medium">Stuck</th>
              <th className="px-4 py-3 font-medium">Prep unlocks</th>
            </tr>
          </thead>
          <tbody>
            {initialRows.map((row) => (
              <tr key={row.organizationId} className="align-top text-foreground">
                <td className="px-4 py-3">
                  <div className="font-medium">{row.name}</div>
                  <div className="text-xs text-muted-foreground">{row.slug}</div>
                </td>
                <td className="px-4 py-3 capitalize text-muted-foreground">{row.currentPhaseLabel}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {row.lastActivityAt
                    ? new Date(row.lastActivityAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    : "—"}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {row.cohortStartDate
                    ? new Date(row.cohortStartDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "—"}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{row.stuck ? "Yes" : "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    {row.prepTaskStates.map((t) => {
                      const label = PREP_LABEL[t.key] ?? t.key;
                      const lockedPrep = !t.movemental_unlocked && t.status !== "missing";
                      const busy = pending === `${row.organizationId}:${t.key}`;
                      return (
                        <Button
                          key={t.key}
                          type="button"
                          variant="outline"
                          size="xs"
                          disabled={!lockedPrep || busy || t.status === "missing"}
                          onClick={() => void unlock(row.organizationId, t.key)}
                        >
                          {busy ? "…" : `${label} ready`}
                        </Button>
                      );
                    })}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
