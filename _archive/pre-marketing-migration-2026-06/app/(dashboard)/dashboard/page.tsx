import Link from "next/link";
import { redirect } from "next/navigation";

import { appendOrgQuery } from "@/lib/authenticated/workspace-primary-nav";
import type { DashboardPersona } from "@/lib/dashboard/dashboard-persona";
import {
  isSandboxLiveFirstHub,
  WORKSPACE_COURSES_NONE,
  type WorkspaceCourseEntitlements,
} from "@/lib/dashboard/workspace-course-entitlements";
import {
  buildOnboardingStatePayload,
  resolveDashboardContextForSessionUser,
} from "@/lib/services/onboarding/onboarding.service";
import { createClient } from "@/lib/supabase/server";
import { Calendar, LayoutGrid, ListChecks, Sparkles, Wrench } from "lucide-react";

type Destination = {
  href: string;
  title: string;
  description: string;
  icon: typeof LayoutGrid;
};

function destinationsForHub(persona: DashboardPersona, courses: WorkspaceCourseEntitlements): Destination[] {
  const program: Destination = {
    href: "/program",
    title: "Program templates",
    description:
      persona === "implementation_org"
        ? "Preview Safety and Sandbox program screens with your active organization—governance, inventory, and board-ready sequences in one library."
        : "Browse Safety and Sandbox templates from Movemental’s library. Open any template signed in; your active organization applies when you have one selected.",
    icon: LayoutGrid,
  };

  const scheduleTraining: Destination = {
    href: "/sandboxlive/cohort/schedule",
    title: "Schedule cohort training",
    description:
      "Book SandboxLive kickoff in Calendly or set the cohort date so your team shares one timeline.",
    icon: Calendar,
  };

  const assessment: Destination = {
    href: "/sandboxlive/phase/02-assessment",
    title: "Current Reality Map",
    description:
      "Phase 02: map where AI already shows up in your organization, where it does not, and what comes next—with assistant help. Your cohort sees the same workspace.",
    icon: ListChecks,
  };

  const skills: Destination = {
    href: "/dashboard/skills",
    title: "Skills",
    description:
      "Organization-scoped skills practice area. More lessons and workflows will land here over time.",
    icon: Sparkles,
  };

  const solutions: Destination = {
    href: "/dashboard/solutions",
    title: "Solutions",
    description:
      "Curated solutions your workspace can adopt next. This hub will grow as modules ship.",
    icon: Wrench,
  };

  if (isSandboxLiveFirstHub(persona, courses)) {
    const base: Destination[] = [];
    if (courses.sandbox) base.push(scheduleTraining, assessment);
    return appendOptionalSkillsSolutions(base, courses, skills, solutions);
  }

  if (persona === "implementation_org") {
    const base: Destination[] = [];
    if (courses.safety) base.push(program);
    if (courses.sandbox) base.push(scheduleTraining, assessment);
    return appendOptionalSkillsSolutions(base, courses, skills, solutions);
  }

  const base: Destination[] = [];
  if (courses.safety) base.push(program);
  return appendOptionalSkillsSolutions(base, courses, skills, solutions);
}

function appendOptionalSkillsSolutions(
  base: Destination[],
  courses: WorkspaceCourseEntitlements,
  skills: Destination,
  solutions: Destination,
): Destination[] {
  const out = [...base];
  if (courses.skills) out.push(skills);
  if (courses.solutions) out.push(solutions);
  return dedupeDestinationsByHref(out);
}

function dedupeDestinationsByHref(items: Destination[]): Destination[] {
  const seen = new Set<string>();
  return items.filter((d) => {
    if (seen.has(d.href)) return false;
    seen.add(d.href);
    return true;
  });
}

export default async function DashboardHomePage({
  searchParams,
}: {
  searchParams: Promise<{ org?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) {
    redirect("/login?next=/dashboard");
  }

  const sp = await searchParams;
  const ctx = await resolveDashboardContextForSessionUser(user.id, sp.org);
  const persona = ctx?.persona ?? "movement_leader";
  const courses: WorkspaceCourseEntitlements = ctx?.workspaceCourses ?? WORKSPACE_COURSES_NONE;

  const destinations = destinationsForHub(persona, courses).map((d) => ({
    ...d,
    href: ctx ? appendOrgQuery(d.href, ctx.slug) : d.href,
  }));

  const onboardingPayload =
    ctx?.organizationId != null ? await buildOnboardingStatePayload(ctx.organizationId) : null;

  const onboardingComplete = Boolean(onboardingPayload?.organization.onboarding_completed_at);

  return (
    <div className="flex flex-col gap-8">
      <section aria-label="Workspace shortcuts">
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {destinations.map(({ href, title, description, icon: Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className="flex h-full flex-col border-[0.5px] border-border-soft bg-card px-5 py-5 text-left transition-colors hover:bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-section"
              >
                <span className="flex size-9 items-center justify-center bg-section text-primary">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="mt-4 text-[0.95rem] font-semibold text-foreground">{title}</span>
                <span className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</span>
                <span className="mt-4 text-sm font-medium text-pathway-accent underline decoration-pathway-accent/50 decoration-[0.5px] underline-offset-4">
                  Open →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {ctx && onboardingPayload && onboardingComplete ? (
        <section className="rounded-none border border-[0.5px] border-border-soft bg-section px-5 py-4 text-sm text-muted-foreground">
          <p>
            <span className="font-medium text-foreground">Onboarding is complete</span> for{" "}
            {onboardingPayload.organization.name}. Continue in{" "}
            <Link
              href={appendOrgQuery(onboardingPayload.organization.postOnboardingHref, ctx.slug)}
              className="font-medium text-pathway-accent underline decoration-pathway-accent/50 decoration-[0.5px] underline-offset-4"
            >
              your engagement workspace
            </Link>{" "}
            or revisit the{" "}
            <Link
              href={appendOrgQuery("/welcome", ctx.slug)}
              className="font-medium text-pathway-accent underline decoration-pathway-accent/50 decoration-[0.5px] underline-offset-4"
            >
              checklist archive
            </Link>
            .
          </p>
        </section>
      ) : null}

      {!ctx ? (
        <p className="max-w-prose text-sm text-muted-foreground">
          Organization-scoped metrics and onboarding steps appear when your account is linked to a workspace. Use{" "}
          <Link
            href="/leader"
            className="font-medium text-pathway-accent underline decoration-pathway-accent/50 decoration-[0.5px] underline-offset-4"
          >
            Leader workspace
          </Link>{" "}
          for author reflection tasks, or contact Movemental if you expect an organization invite.
        </p>
      ) : null}
    </div>
  );
}
