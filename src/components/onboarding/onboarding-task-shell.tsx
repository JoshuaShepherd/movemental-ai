"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";

import { Eyebrow } from "@/components/primitives/eyebrow";
import { useDashboardOrganizationSlug } from "@/components/dashboard/dashboard-org-context";
import { Button } from "@/components/ui/button";
import { useCompleteOnboardingTask } from "@/hooks/onboarding/use-onboarding-state";

export function OnboardingTaskShell({
  taskKey,
  title,
  description,
  estimatedMinutes,
  children,
  afterCompleteHref = "/welcome",
  beforeMarkComplete,
}: {
  taskKey: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  children?: React.ReactNode;
  afterCompleteHref?: string;
  /** When set, runs before marking the task complete — return `{ ok: false }` to block completion. */
  beforeMarkComplete?: () => Promise<{ ok: boolean; message?: string }>;
}) {
  const organizationSlug = useDashboardOrganizationSlug();
  const router = useRouter();
  const complete = useCompleteOnboardingTask(organizationSlug || null);
  const [pending, setPending] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [blockMessage, setBlockMessage] = React.useState<string | null>(null);

  const onComplete = async () => {
    setBlockMessage(null);
    setPending(true);
    try {
      if (beforeMarkComplete) {
        const pre = await beforeMarkComplete();
        if (!pre.ok) {
          setBlockMessage(pre.message ?? "Complete the checklist above before marking this step done.");
          return;
        }
      }
      await complete.mutateAsync({ taskKey });
      setDone(true);
      window.setTimeout(() => {
        const q = organizationSlug ? `?org=${encodeURIComponent(organizationSlug)}` : "";
        router.push(`${afterCompleteHref}${q}`);
      }, 1400);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="mx-auto max-w-prose">
      <Eyebrow>Onboarding</Eyebrow>
      <h1 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-foreground">{title}</h1>
      <p className="mt-3 text-muted-foreground">{description}</p>
      <p className="mt-2 text-sm text-muted-foreground">Estimated time: {estimatedMinutes} minutes</p>
      {children ? <div className="mt-8">{children}</div> : null}
      {blockMessage ? (
        <p className="mt-6 text-sm text-[color:var(--destructive)]" role="alert">
          {blockMessage}
        </p>
      ) : null}
      <div className="mt-10 flex flex-wrap gap-3">
        <Button type="button" variant="primary" disabled={pending || done} onClick={() => void onComplete()}>
          {done ? "Saved" : pending ? "Saving…" : "Mark complete"}
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link
            href={
              organizationSlug
                ? `/welcome?org=${encodeURIComponent(organizationSlug)}`
                : "/welcome"
            }
          >
            Back to checklist
          </Link>
        </Button>
      </div>
    </div>
  );
}
