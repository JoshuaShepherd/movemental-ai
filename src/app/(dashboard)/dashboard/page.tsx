import Link from "next/link";
import { redirect } from "next/navigation";

import { Eyebrow } from "@/components/primitives/eyebrow";
import { appendOrgQuery } from "@/lib/authenticated/workspace-primary-nav";
import type { DashboardPersona } from "@/lib/dashboard/dashboard-persona";
import type { WorkspaceNavPreset } from "@/lib/dashboard/workspace-nav-preset";
import {
  buildOnboardingStatePayload,
  resolveDashboardContextForSessionUser,
} from "@/lib/services/onboarding/onboarding.service";
import { createClient } from "@/lib/supabase/server";
import { BookOpen, Calendar, ClipboardList, LayoutGrid, ListChecks, Shield } from "lucide-react";

type Destination = {
  href: string;
  title: string;
  description: string;
  icon: typeof LayoutGrid;
};

function destinationsForHub(persona: DashboardPersona, workspaceNavPreset: WorkspaceNavPreset): Destination[] {
  const program: Destination = {
    href: "/program",
    title: "Program templates",
    description:
      persona === "implementation_org"
        ? "Safety and Sandbox screens aligned to governance, inventory, and board-ready sequences—preview each template with your active organization context."
        : "Safety and Sandbox working surfaces from Movemental’s curated template library—open any card for a signed-in preview with your active organization when one is selected.",
    icon: LayoutGrid,
  };

  const teaching: Destination = {
    href: "/dashboard/teaching/claude-skills",
    title: "Teaching library",
    description:
      "Structured guide to Claude Skills for mission-driven leaders—eight chapters from intuition through practice.",
    icon: BookOpen,
  };

  const scheduleTraining: Destination = {
    href: "/sandboxlive/cohort/schedule",
    title: "Schedule cohort training",
    description:
      "Book your Sandbox kickoff in Calendly with your organization context, or set the cohort date manually from onboarding.",
    icon: Calendar,
  };

  const onboarding: Destination = {
    href: "/welcome",
    title: "Full onboarding checklist",
    description:
      persona === "implementation_org"
        ? "Expanded checklist with cohort date and every phase—use it to align operations, programs, and development before kickoff."
        : "Open the expanded checklist with cohort date and every phase when you need it.",
    icon: ClipboardList,
  };

  const assessment: Destination = {
    href: "/assess",
    title: "Organization assessment",
    description:
      "Movemental Path integrity diagnostic for senior leaders—about 10–15 minutes before we meet; opens the public assessment flow.",
    icon: ListChecks,
  };

  const sandboxHub: Destination = {
    href: "/sandboxlive",
    title: "Sandbox",
    description:
      "Cohort phases, recipes, and roster — the working engagement surface once scheduling and assessment are underway.",
    icon: LayoutGrid,
  };

  if (persona === "implementation_org" && workspaceNavPreset === "sandbox_live_focus") {
    return [
      scheduleTraining,
      assessment,
      sandboxHub,
      teaching,
      {
        ...onboarding,
        description:
          "Optional: expanded steps, cohort date, and later phases when you need them—the MOU is under Documents in the header.",
      },
    ];
  }

  if (persona === "implementation_org") {
    return [program, scheduleTraining, onboarding, teaching];
  }
  return [program, teaching, onboarding];
}

type OnboardingTaskRow = NonNullable<
  Awaited<ReturnType<typeof buildOnboardingStatePayload>>
>["tasks"][number];

function pickNextDashboardTasks(tasks: OnboardingTaskRow[], max = 5): OnboardingTaskRow[] {
  const actionable = tasks.filter((t) => t.uiStatus === "available" || t.uiStatus === "in_progress");
  const waiting = tasks.filter((t) => t.uiStatus === "waiting_movemental");
  const rest = tasks.filter(
    (t) =>
      t.uiStatus !== "available" &&
      t.uiStatus !== "in_progress" &&
      t.uiStatus !== "waiting_movemental",
  );
  return [...actionable, ...waiting, ...rest]
    .filter((t) => t.uiStatus !== "completed" && t.uiStatus !== "skipped")
    .slice(0, max);
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
  const workspaceNavPreset: WorkspaceNavPreset = ctx?.workspaceNavPreset ?? "default";

  const destinations = destinationsForHub(persona, workspaceNavPreset).map((d) => ({
    ...d,
    href:
      d.href === "/assess"
        ? "/assess"
        : ctx
          ? appendOrgQuery(d.href, ctx.slug)
          : d.href,
  }));

  const onboardingPayload =
    ctx?.organizationId != null ? await buildOnboardingStatePayload(ctx.organizationId) : null;

  const onboardingComplete = Boolean(onboardingPayload?.organization.onboarding_completed_at);
  const nextTasks =
    onboardingPayload && !onboardingComplete ? pickNextDashboardTasks(onboardingPayload.tasks) : [];

  const cohortLabel = onboardingPayload?.organization.cohort_start_date
    ? new Date(onboardingPayload.organization.cohort_start_date).toLocaleDateString(undefined, {
        dateStyle: "medium",
      })
    : null;
  const aiReadiness = onboardingPayload?.organization.aiReadiness ?? null;

  return (
    <div className="flex flex-col gap-10">
      <header className="max-w-prose">
        <Eyebrow className="mb-2">Workspace</Eyebrow>
        <h1 className="font-serif text-[clamp(1.75rem,3.5vw,2.25rem)] italic leading-tight tracking-tight text-foreground">
          Overview
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {persona === "implementation_org" && workspaceNavPreset === "sandbox_live_focus" ? (
            <>
              Your Sandbox workspace. Start with <span className="font-medium text-foreground">schedule</span> and
              the short <span className="font-medium text-foreground">assessment</span>; sign the MOU from{" "}
              <span className="font-medium text-foreground">Documents</span> in the header when counsel is ready. Use{" "}
              <span className="font-medium text-foreground">Onboarding</span> only when you need the full checklist.
            </>
          ) : persona === "implementation_org" ? (
            <>
              Your signed-in hub for organizational governance work. Use Program templates for Safety and
              Sandbox sequences, use <span className="font-medium text-foreground">Documents</span> in the header
              for the MOU, keep deeper onboarding steps in <span className="font-medium text-foreground">Onboarding</span>{" "}
              when you need the full checklist, and switch organizations in the header when you belong to more
              than one.
            </>
          ) : (
            <>
              Your signed-in hub after login. Use the header to switch organizations when you belong to more
              than one. Open <span className="font-medium text-foreground">Documents</span> in the header to
              review and sign the MOU, or use <span className="font-medium text-foreground">Onboarding</span> in
              the workspace links for the full checklist when you need it.
            </>
          )}
        </p>
      </header>

      {ctx && onboardingPayload ? (
        <section aria-labelledby="dashboard-at-a-glance-heading" className="flex flex-col gap-4">
          <h2 id="dashboard-at-a-glance-heading" className="text-[0.95rem] font-medium text-foreground">
            At a glance
          </h2>
          <ul className="grid gap-4 sm:grid-cols-3">
            <li className="border-[0.5px] border-border-soft bg-card px-5 py-4">
              <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                AI readiness (self-reported)
              </p>
              {aiReadiness != null ? (
                <p className="mt-2 font-serif text-2xl italic tabular-nums text-foreground">{aiReadiness} / 5</p>
              ) : (
                <p className="mt-2 text-sm text-muted-foreground">
                  Not captured yet—complete the profile steps in onboarding when you are ready.
                </p>
              )}
            </li>
            <li className="border-[0.5px] border-border-soft bg-card px-5 py-4">
              <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                Cohort start
              </p>
              {cohortLabel ? (
                <p className="mt-2 font-serif text-xl italic text-foreground">{cohortLabel}</p>
              ) : (
                <p className="mt-2 text-sm text-muted-foreground">
                  Set your cohort date from the onboarding checklist when your team has a kickoff window.
                </p>
              )}
            </li>
            <li className="border-[0.5px] border-border-soft bg-card px-5 py-4">
              <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                Reach &amp; revenue
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Aggregated analytics are not wired to this overview yet. When they are, key trends will appear
                here without placeholder numbers.
              </p>
            </li>
          </ul>
        </section>
      ) : null}

      {ctx &&
      onboardingPayload &&
      !onboardingComplete &&
      !(persona === "implementation_org" && workspaceNavPreset === "sandbox_live_focus") ? (
        <section aria-labelledby="dashboard-next-tasks-heading" className="flex flex-col gap-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 id="dashboard-next-tasks-heading" className="text-[0.95rem] font-medium text-foreground">
              Next onboarding steps
            </h2>
            <Link
              href={appendOrgQuery("/welcome", ctx.slug)}
              className="text-sm font-medium text-pathway-accent underline decoration-pathway-accent/50 decoration-[0.5px] underline-offset-4"
            >
              Open full checklist →
            </Link>
          </div>
          {nextTasks.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No queued tasks surfaced here—open the full checklist for status on every phase.
            </p>
          ) : (
            <ul className="flex flex-col divide-y divide-border-soft border border-[0.5px] border-border-soft bg-card">
              {nextTasks.map((task) => (
                <li
                  key={task.key}
                  className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="text-[0.95rem] font-medium text-foreground">{task.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{task.description}</p>
                    <p className="mt-2 text-[11px] uppercase tracking-[0.06em] text-muted-foreground">
                      Status: {task.uiStatus.replace(/_/g, " ")}
                    </p>
                  </div>
                  {task.uiStatus === "available" || task.uiStatus === "in_progress" ? (
                    <Link
                      href={appendOrgQuery(task.route, ctx.slug)}
                      className="mt-3 shrink-0 text-sm font-medium text-pathway-accent underline decoration-pathway-accent/50 decoration-[0.5px] underline-offset-4 sm:mt-0"
                    >
                      Continue →
                    </Link>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </section>
      ) : null}

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

      <section aria-labelledby="dashboard-modules-heading">
        <div className="flex items-center gap-2">
          <Shield className="size-4 text-muted-foreground" aria-hidden />
          <h2 id="dashboard-modules-heading" className="text-[0.95rem] font-medium text-foreground">
            Modules in this workspace
          </h2>
        </div>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
    </div>
  );
}
