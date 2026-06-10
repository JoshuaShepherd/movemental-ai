"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";

import { Eyebrow } from "@/components/primitives/eyebrow";
import { Button } from "@/components/ui/button";

/**
 * Same editorial framing as org {@link OnboardingTaskShell}, without org task API completion.
 */
export function LeaderOnboardingShell({
  title,
  description,
  estimatedMinutes,
  children,
  afterCompleteHref,
  beforeMarkComplete,
}: {
  title: string;
  description: string;
  estimatedMinutes: number;
  children?: React.ReactNode;
  afterCompleteHref: string;
  beforeMarkComplete?: () => Promise<{ ok: boolean; message?: string }>;
}) {
  const router = useRouter();
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
          setBlockMessage(pre.message ?? "Complete the step above before continuing.");
          return;
        }
      }
      setDone(true);
      window.setTimeout(() => {
        router.push(afterCompleteHref);
      }, 900);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="mx-auto max-w-prose">
      <Eyebrow>Leader onboarding</Eyebrow>
      <h1 className="mt-2 text-2xl tracking-[-0.02em] text-foreground">{title}</h1>
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
          {done ? "Saved" : pending ? "Saving…" : "Continue"}
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/leader">Back to leader workspace</Link>
        </Button>
      </div>
    </div>
  );
}
