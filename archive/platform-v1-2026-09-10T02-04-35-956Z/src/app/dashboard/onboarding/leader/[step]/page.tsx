import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { getOptionalAuthUser } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Leader onboarding",
  robots: { index: false, follow: false },
};

type Props = { params: Promise<{ step: string }> };

/** Rewrite target for `/onboarding/leader/:step`. */
export default async function LeaderOnboardingStepPage({ params }: Props) {
  const { step } = await params;
  const { user } = await getOptionalAuthUser();
  if (!user) {
    redirect(`/login?next=${encodeURIComponent(`/onboarding/leader/${step}`)}`);
  }

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-12 md:py-16">
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
        Leader onboarding · {step.replace(/-/g, " ")}
      </p>
      <h1 className="mt-3 text-3xl leading-tight">This step is coming soon</h1>
      <p className="mt-4 text-base text-muted-foreground">
        Leader onboarding for <strong>{step}</strong> will return on a future release. Continue
        from your welcome checklist or the agent room.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/welcome">Welcome checklist</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/agent">Talk to Movemental</Link>
        </Button>
      </div>
    </main>
  );
}
