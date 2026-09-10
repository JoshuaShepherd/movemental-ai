import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { getOptionalAuthUser } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Onboarding | Movemental",
  robots: { index: false, follow: false },
};

type Props = { params: Promise<{ step: string }> };

export default async function V2OnboardingStepPage({ params }: Props) {
  const { step } = await params;
  const { user } = await getOptionalAuthUser();
  if (!user) {
    redirect(`/login?next=${encodeURIComponent(`/dashboard/onboarding/${step}`)}`);
  }

  const paymentStep = step === "payment" || step === "agreement";

  return (
    <main
      style={{
        maxWidth: "42rem",
        margin: "0 auto",
        padding: "3rem 1.5rem 4rem",
      }}
    >
      <p
        style={{
          fontFamily: "monospace",
          fontSize: "0.75rem",
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          color: "var(--color-ink-band-ink-muted)",
        }}
      >
        Onboarding · {step.replace(/-/g, " ")}
      </p>
      <h1
        style={{
          marginTop: "0.75rem",
          fontSize: "1.875rem",
          lineHeight: 1.2,
          fontFamily: "var(--font-display), Georgia, serif",
          color: "var(--color-ink-band-ink)",
        }}
      >
        This step is coming soon
      </h1>
      <p
        style={{
          marginTop: "1rem",
          fontSize: "1rem",
          lineHeight: 1.6,
          color: "var(--color-ink-band-ink-muted)",
        }}
      >
        The full onboarding checklist for <strong>{step}</strong> is not on this surface yet.
        Your account is active, use the links below to keep moving.
      </p>
      <div
        style={{
          marginTop: "2.5rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        <Button asChild>
          <Link href="/dashboard/safety">Open Safety Dashboard</Link>
        </Button>
        {paymentStep ? (
          <Button asChild variant="outline">
            <Link href="/enroll">Safety enrollment</Link>
          </Button>
        ) : (
          <Button asChild variant="outline">
            <Link href="/">Back to home</Link>
          </Button>
        )}
        <Button asChild variant="ghost">
          <Link href="/agent">Talk to Movemental</Link>
        </Button>
      </div>
    </main>
  );
}
