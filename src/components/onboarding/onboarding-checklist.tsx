"use client";

import Link from "next/link";

import { Eyebrow } from "@/components/primitives/eyebrow";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import type { OnboardingStateResponse } from "@/hooks/onboarding/use-onboarding-state";
import { cn } from "@/lib/utils";
import { ONBOARDING_PHASES } from "@/lib/onboarding/tasks";
import { Check, Circle } from "lucide-react";

const PHASE_TITLE: Record<string, string> = {
  commitment: "Commitment",
  identity: "Identity",
  content: "Content",
  activation: "Activation",
};

function actionLabel(uiStatus: string): string {
  if (uiStatus === "in_progress") return "Continue";
  return "Start";
}

export function OnboardingChecklist({
  data,
  variant,
}: {
  data: OnboardingStateResponse;
  variant: "panel" | "full";
}) {
  const greet = data.userFirstName?.trim() || "there";
  const cohort = data.organization.cohort_start_date
    ? new Date(data.organization.cohort_start_date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Not set yet";

  const commitmentTasks = data.tasks.filter((t) => t.phase === "commitment");

  const commitmentLeft = commitmentTasks.filter(
    (t) => t.dbStatus !== "completed" && t.dbStatus !== "skipped",
  ).length;

  const defaultOpen = ONBOARDING_PHASES;

  return (
    <div className={cn(variant === "full" && "mx-auto max-w-prose")}>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Eyebrow className="mb-2">Your onboarding</Eyebrow>
          <h3 className="text-xl font-semibold tracking-[-0.02em] text-foreground">
            Welcome, {greet}
          </h3>
        </div>
        <p className="text-sm text-muted-foreground sm:text-right">
          Your cohort starts: <span className="text-foreground">{cohort}</span>
        </p>
      </div>

      <Accordion type="multiple" defaultValue={[...defaultOpen]} className="w-full">
        {ONBOARDING_PHASES.map((phase) => {
          const summary = data.phaseSummaries.find((s) => s.phase === phase);
          const isCommitment = phase === "commitment";

          return (
            <AccordionItem key={phase} value={phase} className="border-0">
              <AccordionTrigger className="py-3 hover:no-underline">
                <span className="text-[0.95rem] font-medium text-foreground">
                  {PHASE_TITLE[phase] ?? phase}
                  <span className="ml-2 text-[0.8rem] font-normal text-muted-foreground">
                    {isCommitment
                      ? `${summary?.completed ?? 0} / ${summary?.total ?? 0} complete`
                      : "Coming soon"}
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="border-0 pb-4">
                {!isCommitment ? (
                  <p className="text-sm text-muted-foreground">
                    Additional onboarding steps for this phase will appear here after commitment tasks
                    are finished.
                  </p>
                ) : (
                  <ul className="flex flex-col gap-4">
                    {commitmentTasks.map((t) => {
                      const done = t.dbStatus === "completed" || t.dbStatus === "skipped";
                      const href = `${t.route}?org=${encodeURIComponent(data.activeSlug)}`;
                      return (
                        <li
                          key={t.key}
                          className="flex flex-col gap-3 rounded-xl bg-section px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div className="flex gap-3">
                            <span className="mt-0.5 shrink-0" aria-hidden>
                              {done ? (
                                <Check className="size-5 text-primary" strokeWidth={2.25} />
                              ) : (
                                <Circle className="size-5 text-muted-foreground" strokeWidth={1.75} />
                              )}
                            </span>
                            <div>
                              <p
                                className={cn(
                                  "text-[0.95rem] text-foreground",
                                  t.uiStatus === "available" || t.uiStatus === "in_progress"
                                    ? "font-semibold"
                                    : "font-normal",
                                )}
                              >
                                {t.title}
                              </p>
                              <p className="mt-1 text-sm text-muted-foreground">{t.description}</p>
                              {t.uiStatus === "waiting_movemental" ? (
                                <p className="mt-2 inline-block rounded-full bg-muted px-2 py-0.5 text-[0.72rem] text-muted-foreground">
                                  We are preparing this — typically ready within 48 hours
                                </p>
                              ) : null}
                            </div>
                          </div>
                          <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
                            <span className="rounded-full bg-background px-2 py-0.5 text-[0.72rem] text-muted-foreground">
                              {t.estimatedMinutes}m
                            </span>
                            {!done && t.uiStatus === "available" ? (
                              <Button variant="primary" size="sm" asChild>
                                <Link href={href}>{actionLabel(t.uiStatus)}</Link>
                              </Button>
                            ) : null}
                            {!done && t.uiStatus === "in_progress" ? (
                              <Button variant="primary" size="sm" asChild>
                                <Link href={href}>{actionLabel(t.uiStatus)}</Link>
                              </Button>
                            ) : null}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      <div className="mt-6 text-sm text-muted-foreground">
        <p>
          {commitmentLeft === 0
            ? "Commitment tasks are complete."
            : `${commitmentLeft} task${commitmentLeft === 1 ? "" : "s"} remaining in Commitment`}
        </p>
        {data.commitmentRemainingMinutes > 0 ? (
          <p className="mt-1">
            Estimated time remaining (Commitment): ~{data.commitmentRemainingMinutes} minutes
          </p>
        ) : null}
      </div>

      {variant === "panel" ? (
        <p className="mt-4 text-sm">
          <Link href={`/welcome?org=${encodeURIComponent(data.activeSlug)}`} className="text-primary hover:underline">
            Open full onboarding view →
          </Link>
        </p>
      ) : null}
    </div>
  );
}
