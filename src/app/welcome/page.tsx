import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { getOptionalAuthUser } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Welcome",
  robots: { index: false, follow: false },
};

/**
 * Onboarding checklist entry — linked from transactional email. Full wizard
 * ships later; this stub keeps email URLs on a real 200 surface.
 */
export default async function WelcomePage() {
  const { user } = await getOptionalAuthUser();
  if (!user) {
    redirect("/login?next=/welcome");
  }

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-12 md:py-16">
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
        Onboarding
      </p>
      <h1 className="mt-3 text-3xl leading-tight">Welcome to Movemental</h1>
      <p className="mt-4 text-base text-muted-foreground">
        Your workspace is ready. We&apos;ll walk you through agreement, cohort selection, and
        deeper setup steps — for now, start where you need momentum most.
      </p>
      <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
        <li>· Open your dashboard to see assessment and team progress</li>
        <li>· Talk with the agent for a guided read on where you stand with AI</li>
        <li>· Enroll when you&apos;re ready for the facilitated Safety path</li>
      </ul>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/dashboard">Open dashboard</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/agent">Talk to Movemental</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/enroll">Enroll in Safety</Link>
        </Button>
      </div>
    </main>
  );
}
