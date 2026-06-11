import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { resolveDashboardContextForSessionUser } from "@/lib/services/onboarding/onboarding.service";
import { getOptionalAuthUser } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Welcome",
  robots: { index: false, follow: false },
};

/**
 * Onboarding checklist entry — linked from transactional email. Full wizard
 * ships later; this stub keeps email URLs on a real 200 surface.
 */
type WelcomePageProps = {
  searchParams: Promise<{ reason?: string }>;
};

export default async function WelcomePage({ searchParams }: WelcomePageProps) {
  const { user } = await getOptionalAuthUser();
  if (!user) {
    redirect("/login?next=/welcome");
  }

  const params = await searchParams;
  const ctx = await resolveDashboardContextForSessionUser(user.id);
  const safetyHref = ctx?.workspaceCourses.safety ? "/dashboard/safety" : null;

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-12 md:py-16">
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
        Onboarding
      </p>
      <h1 className="mt-3 text-3xl leading-tight">Welcome to Movemental</h1>
      <p className="mt-4 text-base text-muted-foreground">
        Your workspace is ready. We&apos;ll walk you through agreement, cohort selection, and
        deeper setup steps, for now, start where you need momentum most.
      </p>
      {params.reason === "no_safety_entitlement" ? (
        <p className="mt-6 border-l-2 border-[var(--color-ink-band-blue)] bg-card px-5 py-4 text-sm leading-relaxed">
          The Safety charter dashboard is not provisioned for your organization yet. If you enrolled
          recently, wait for the provisioning email, or{" "}
          <a href="mailto:josh@movemental.ai" className="text-[var(--color-ink-band-blue)] underline">
            reach out to us
          </a>
          .
        </p>
      ) : null}
      <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
        <li>· Open your dashboard to see assessment and team progress</li>
        <li>· Talk with the agent for a guided read on where you stand with AI</li>
        <li>· Enroll when you&apos;re ready for the facilitated Safety path</li>
      </ul>
      <div className="mt-10 flex flex-wrap gap-3">
        {safetyHref ? (
          <Button asChild>
            <Link href={safetyHref}>Open Safety dashboard</Link>
          </Button>
        ) : (
          <Button asChild>
            <Link href="/dashboard">Open dashboard</Link>
          </Button>
        )}
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
