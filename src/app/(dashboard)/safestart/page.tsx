import Link from "next/link";
import { redirect } from "next/navigation";

import { editorialHome } from "@/lib/authenticated/editorial-home";
import { loadSafeStartEngagementState } from "@/lib/safestart/engagement.server";
import {
  GUIDEBOOK_SECTIONS,
  SAFESTART_WORKSPACES,
  type GuidebookSectionSlug,
  type SafeStartWorkspaceSlug,
} from "@/lib/safestart/workspace-manifest";
import { resolveActiveOrganizationId } from "@/lib/services/onboarding/onboarding.service";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "SafeStart",
};

const WORKSPACE_STATUS_LABEL: Record<"not_started" | "in_progress" | "complete", string> = {
  not_started: "Not started",
  in_progress: "In progress",
  complete: "Complete",
};

const SECTION_STATUS_LABEL: Record<
  "not_drafted" | "drafted" | "in_review" | "ratified",
  string
> = {
  not_drafted: "Not drafted",
  drafted: "Drafted",
  in_review: "In review",
  ratified: "Ratified",
};

export default async function SafeStartHomePage({
  searchParams,
}: {
  searchParams: Promise<{ org?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) {
    redirect("/login?next=/safestart");
  }

  const sp = await searchParams;
  const resolved = await resolveActiveOrganizationId(user.id, sp.org);
  if (!resolved.success) {
    redirect("/dashboard");
  }

  const state = await loadSafeStartEngagementState(resolved.data.organizationId);
  const orgQuery = sp.org ? `?org=${sp.org}` : "";

  const currentWorkspace = state.currentWorkspaceSlug
    ? SAFESTART_WORKSPACES.find((w) => w.slug === state.currentWorkspaceSlug)
    : null;

  const workspaceStatusBySlug = new Map<SafeStartWorkspaceSlug, "not_started" | "in_progress" | "complete">(
    state.workspaces.map((w) => [w.slug, w.status] as const),
  );

  const guidebookStatusBySlug = new Map<GuidebookSectionSlug, "not_drafted" | "drafted" | "in_review" | "ratified">(
    state.guidebook.map((s) => [s.slug, s.status] as const),
  );

  const sectionsRatified = state.guidebook.filter((s) => s.status === "ratified").length;
  const sectionsTotal = GUIDEBOOK_SECTIONS.length;
  const allRatified = sectionsRatified === sectionsTotal;

  const sortedWorkspaces = [...SAFESTART_WORKSPACES].sort((a, b) => a.order - b.order);

  const heroLede = allRatified
    ? "The AI Organizational Guidebook is ratified and pinned as your canonical operating document. The two-week arc has closed into steady state — the artifact stands, and ongoing cadence lives in the steady-state workspace."
    : currentWorkspace
      ? `The engagement is underway. The organization is working inside ${currentWorkspace.name} — ${currentWorkspace.produces.charAt(0).toLowerCase()}${currentWorkspace.produces.slice(1)}`
      : "The two-week SafeStart engagement opens in Drafting: a first draft of the Guidebook on the page before asynchronous review begins, so the team has something concrete to read and mark.";

  const nextActionItalic = allRatified
    ? "No required action — the Guidebook is ratified."
    : currentWorkspace
      ? `Continue in ${currentWorkspace.name}.`
      : "Begin in Drafting — put the first Guidebook draft on the page.";

  const nextHref = allRatified
    ? `/safestart/steady-state${orgQuery}`
    : currentWorkspace
      ? `/safestart/${currentWorkspace.slug}${orgQuery}`
      : `/safestart/drafting${orgQuery}`;

  const nextCtaLabel = allRatified ? "Open steady state" : currentWorkspace ? `Open ${currentWorkspace.name}` : "Open Drafting";

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className={editorialHome.heroBand}>
        <p className={editorialHome.eyebrow}>SafeStart</p>
        <h1 className={cn(editorialHome.display, "mt-4 max-w-[min(100%,52rem)]")}>{state.organizationName}</h1>
        <p className={cn(editorialHome.lede, "mt-6")}>{heroLede}</p>
      </section>

      <div className={editorialHome.hairline} aria-hidden />

      {/* Engagement */}
      <section className={editorialHome.bandGap}>
        <header className="flex flex-col gap-2">
          <p className={editorialHome.eyebrow}>Two weeks · five workspaces</p>
          <h2 className={editorialHome.bandSubhead}>Where the work happens</h2>
        </header>
        <p className={editorialHome.editorialStatus}>
          {allRatified
            ? "Every workspace in the arc has been closed; the team is in ratified steady state."
            : currentWorkspace
              ? `The arc is live — the cohort is currently in ${currentWorkspace.name}.`
              : "The arc has not opened a workspace yet; Drafting is the first room."}
        </p>
        <ol className="mt-2 list-none p-0">
          {sortedWorkspaces.map((workspace, idx) => {
            const status = workspaceStatusBySlug.get(workspace.slug) ?? "not_started";
            const isCurrent = workspace.slug === state.currentWorkspaceSlug;
            return (
              <li key={workspace.slug} className={editorialHome.rowWrap}>
                <Link
                  href={`/safestart/${workspace.slug}${orgQuery}`}
                  className={cn(editorialHome.rowLink, isCurrent ? editorialHome.rowCurrent : editorialHome.rowInactive)}
                >
                  <span className={editorialHome.rowNum32}>{String(idx + 1).padStart(2, "0")}</span>
                  <span className="flex min-w-0 flex-1 flex-col gap-1.5">
                    <span className={editorialHome.rowTitle22}>{workspace.name}</span>
                    <span className={editorialHome.rowDesc14}>{workspace.description}</span>
                    <span className={editorialHome.rowMeta11}>
                      {isCurrent ? "Current workspace — " : null}
                      {WORKSPACE_STATUS_LABEL[status]}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      <div className={cn(editorialHome.hairline, "mt-[clamp(2.5rem,6vw,4rem)]")} aria-hidden />

      {/* Guidebook */}
      <section className={editorialHome.bandGap}>
        <header className="flex flex-col gap-2">
          <p className={editorialHome.eyebrow}>The artifact</p>
          <h2 className={editorialHome.bandSubhead}>Your AI Organizational Guidebook</h2>
        </header>
        <p className={editorialHome.bandLede}>
          Five sections — Statement, Policy, Context, Rules, and Response Plans — compose one board-facing document. Drafting puts language on the page; review and ratification turn it into the organization&apos;s live commitment.
        </p>
        <ul className="mt-4 list-none p-0">
          {GUIDEBOOK_SECTIONS.map((section) => {
            const status = guidebookStatusBySlug.get(section.slug) ?? "not_drafted";
            return (
              <li key={section.slug} className={editorialHome.rowWrap}>
                <Link
                  href={`/safestart/guidebook${orgQuery}#${section.slug}`}
                  className={cn(editorialHome.rowLink, editorialHome.rowInactive)}
                >
                  <span className={editorialHome.rowNum32}>{section.number}</span>
                  <span className="flex min-w-0 flex-1 flex-col gap-1.5">
                    <span className={editorialHome.rowTitle22}>{section.name}</span>
                    <span className={editorialHome.rowDesc14}>{section.description}</span>
                    <span className={editorialHome.rowMeta11}>{SECTION_STATUS_LABEL[status]}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="mt-4">
          <Link href={`/safestart/guidebook${orgQuery}`} className={editorialHome.textLink}>
            Open the full Guidebook
          </Link>
        </p>
      </section>

      <div className={cn(editorialHome.hairline, "mt-[clamp(2.5rem,6vw,4rem)]")} aria-hidden />

      {/* Next action */}
      <section className={cn(editorialHome.bandGap, "pb-[clamp(3rem,8vw,5rem)]")}>
        <p className={editorialHome.eyebrow}>Next required action</p>
        <p className={cn(editorialHome.editorialStatus, "mt-3 max-w-[40rem]")}>{nextActionItalic}</p>
        <Link href={nextHref} className={cn(editorialHome.primaryCta, "mt-6")}>
          {nextCtaLabel} →
        </Link>
      </section>
    </div>
  );
}
