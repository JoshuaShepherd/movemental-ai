import Link from "next/link";
import { redirect } from "next/navigation";

import { loadSafeStartEngagementState } from "@/lib/safestart/engagement.server";
import {
  GUIDEBOOK_SECTIONS,
  SAFESTART_WORKSPACES,
  type GuidebookSectionSlug,
  type SafeStartWorkspaceSlug,
} from "@/lib/safestart/workspace-manifest";
import { resolveActiveOrganizationId } from "@/lib/services/onboarding/onboarding.service";
import { createClient } from "@/lib/supabase/server";

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
  { label: string; tone: string }
> = {
  not_drafted: { label: "Not drafted", tone: "text-muted-foreground" },
  drafted: { label: "Drafted", tone: "text-foreground" },
  in_review: { label: "In review", tone: "text-pathway-accent" },
  ratified: { label: "Ratified", tone: "text-[color:var(--color-status-go)]" },
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

  return (
    <div className="flex flex-col gap-16">
      {/* Hero */}
      <section className="flex flex-col gap-4">
        <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-pathway-accent">
          SafeStart
        </span>
        <h1 className="font-serif text-[clamp(2.5rem,5.5vw,3rem)] italic leading-[1.05] tracking-tight text-foreground">
          {state.organizationName}
        </h1>
        <p className="max-w-[680px] text-[16px] leading-relaxed text-muted-foreground">
          {allRatified ? (
            <>
              Your AI Organizational Guidebook is <strong className="font-medium text-foreground">ratified</strong>. The engagement is in steady state — see the Guidebook artifact for the canonical document and the steady-state workspace for ongoing operations.
            </>
          ) : currentWorkspace ? (
            <>
              Your organization is currently in{" "}
              <strong className="font-medium text-foreground">
                {currentWorkspace.name}
              </strong>
              . {currentWorkspace.produces}
            </>
          ) : (
            <>
              Welcome to SafeStart. The engagement begins with Drafting — putting a first draft of the AI Organizational Guidebook on the page before async review opens.
            </>
          )}
        </p>
      </section>

      {/* Engagement progress */}
      <section className="flex flex-col gap-6">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-serif text-[24px] italic text-foreground">
            Engagement
          </h2>
          <span className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
            Two weeks · five workspaces
          </span>
        </div>

        <ol className="flex flex-col">
          {SAFESTART_WORKSPACES.map((workspace, idx) => {
            const status = workspaceStatusBySlug.get(workspace.slug) ?? "not_started";
            const isCurrent = workspace.slug === state.currentWorkspaceSlug;
            return (
              <li
                key={workspace.slug}
                className="flex items-baseline gap-4 border-b border-border-soft py-4 last:border-b-0"
              >
                <span className="w-8 shrink-0 font-serif text-[18px] italic text-pathway-accent">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <Link
                  href={`/safestart/${workspace.slug}${orgQuery}`}
                  className="group flex flex-1 flex-col gap-1"
                >
                  <span className="text-[15px] font-medium text-foreground group-hover:text-pathway-accent">
                    {workspace.name}
                  </span>
                  <span className="text-[13px] text-muted-foreground">
                    {workspace.description}
                  </span>
                </Link>
                <span
                  className={`shrink-0 text-[10px] font-medium uppercase tracking-[0.1em] ${
                    isCurrent
                      ? "text-pathway-accent"
                      : status === "complete"
                        ? "text-[color:var(--color-status-go)]"
                        : "text-muted-foreground"
                  }`}
                >
                  {isCurrent ? "Current" : WORKSPACE_STATUS_LABEL[status]}
                </span>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Guidebook draft status */}
      <section className="flex flex-col gap-6">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-serif text-[24px] italic text-foreground">
            AI Organizational Guidebook
          </h2>
          <span className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
            {sectionsRatified} of {sectionsTotal} ratified
          </span>
        </div>

        <ul className="grid grid-cols-1 gap-px bg-border-soft md:grid-cols-2 lg:grid-cols-5">
          {GUIDEBOOK_SECTIONS.map((section) => {
            const status = guidebookStatusBySlug.get(section.slug) ?? "not_drafted";
            const statusCopy = SECTION_STATUS_LABEL[status];
            return (
              <li key={section.slug} className="bg-card">
                <Link
                  href={`/safestart/guidebook${orgQuery}#${section.slug}`}
                  className="flex h-full flex-col gap-3 p-5 transition-colors hover:bg-section"
                >
                  <span className="font-serif text-[24px] italic leading-none text-pathway-accent">
                    {section.number}
                  </span>
                  <h3 className="text-[14px] font-medium text-foreground">{section.name}</h3>
                  <span className={`mt-auto text-[10px] font-medium uppercase tracking-[0.1em] ${statusCopy.tone}`}>
                    {statusCopy.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href={`/safestart/guidebook${orgQuery}`}
          className="self-start text-[14px] text-foreground underline decoration-pathway-accent/60 underline-offset-4 transition-colors hover:text-pathway-accent"
        >
          Open the Guidebook →
        </Link>
      </section>

      {/* Next action */}
      <section className="flex flex-col gap-4 border-t border-border-soft pt-8">
        <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
          Next required action
        </span>
        {allRatified ? (
          <p className="text-[15px] leading-relaxed text-foreground">
            No required action — the engagement is ratified. Visit the steady-state workspace if you need the ongoing operating cadence.
          </p>
        ) : currentWorkspace ? (
          <div className="flex flex-col gap-3">
            <p className="text-[15px] leading-relaxed text-foreground">
              Move forward in <strong className="font-medium">{currentWorkspace.name}</strong> — {currentWorkspace.description.toLowerCase()}
            </p>
            <Link
              href={`/safestart/${currentWorkspace.slug}${orgQuery}`}
              className="self-start bg-foreground px-5 py-2.5 text-[13px] font-medium text-background transition-opacity hover:opacity-90"
            >
              Open {currentWorkspace.name} →
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <p className="text-[15px] leading-relaxed text-foreground">
              Begin Drafting. The first task is putting a working draft of the Guidebook on the page so async review has something concrete to read.
            </p>
            <Link
              href={`/safestart/drafting${orgQuery}`}
              className="self-start bg-foreground px-5 py-2.5 text-[13px] font-medium text-background transition-opacity hover:opacity-90"
            >
              Open Drafting →
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
