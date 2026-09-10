import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { getOptionalAuthUser } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Onboarding",
  robots: { index: false, follow: false },
};

type Props = { params: Promise<{ step: string }> };

/**
 * Friendly `/onboarding/:step` rewrite target — keeps email deep links alive until
 * the full checklist ships from archive.
 */
export default async function OnboardingStepPage({ params }: Props) {
  const { step } = await params;
  const { user } = await getOptionalAuthUser();
  if (!user) {
    redirect(`/login?next=${encodeURIComponent(`/onboarding/${step}`)}`);
  }

  const paymentStep = step === "payment" || step === "agreement";

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-12 md:py-16">
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
        Onboarding · {step.replace(/-/g, " ")}
      </p>
      <h1 className="mt-3 text-3xl leading-tight">This step is coming soon</h1>
      <p className="mt-4 text-base text-muted-foreground">
        The full onboarding checklist for <strong>{step}</strong> is not on this surface yet.
        Your account is active, use the links below to keep moving.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/welcome">Back to welcome checklist</Link>
        </Button>
        {paymentStep ? (
          <Button asChild variant="outline">
            <Link href="/enroll">Safety enrollment</Link>
          </Button>
        ) : (
          <Button asChild variant="outline">
            <Link href="/dashboard">Open dashboard</Link>
          </Button>
        )}
        <Button asChild variant="ghost">
          <Link href="/agent">Talk to Movemental</Link>
        </Button>
      </div>
    </main>
  );
}
