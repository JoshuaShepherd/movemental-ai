import Link from "next/link";
import { redirect } from "next/navigation";

import { Eyebrow } from "@/components/primitives/eyebrow";
import { TrainingSchedulePanel } from "@/components/scheduling/training-schedule-panel";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { resolveActiveOrganizationId } from "@/lib/services/onboarding/onboarding.service";

export const metadata = { title: "Schedule training · SandboxLive" };

export default async function SandboxLiveCohortSchedulePage({
  searchParams,
}: {
  searchParams: Promise<{ org?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) {
    redirect("/login?next=/sandboxlive/cohort/schedule");
  }

  const sp = await searchParams;
  const resolved = await resolveActiveOrganizationId(user.id, sp.org);
  if (!resolved.success) {
    redirect("/dashboard");
  }

  const { slug: organizationSlug } = resolved.data;
  const orgQuery = `?org=${encodeURIComponent(organizationSlug)}`;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10">
      <header className="flex flex-col gap-4">
        <Eyebrow className="text-pathway-accent">SandboxLive · Cohort</Eyebrow>
        <h1 className="font-serif text-[clamp(2rem,4vw,2.5rem)] italic leading-tight tracking-tight text-foreground">
          Schedule your training cohort
        </h1>
        <p className="max-w-prose text-[15px] leading-relaxed text-muted-foreground">
          Book your team&apos;s Sandbox training kickoff in Calendly. Your organization slug is sent with the booking
          so we can sync your cohort start date when webhooks are enabled. You can also set the date manually from{" "}
          <Link
            href={`/onboarding/cohort${orgQuery}`}
            className="font-medium text-primary underline underline-offset-4"
          >
            onboarding
          </Link>
          .
        </p>
      </header>

      <TrainingSchedulePanel organizationSlug={organizationSlug} />

      <div>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/sandboxlive/cohort${orgQuery}`}>← Cohort overview</Link>
        </Button>
      </div>
    </div>
  );
}
