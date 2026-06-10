import type { SafeStartHeroTimelineFixture } from "@/lib/program/types/safe-start-hero";

import { EngagementTimeline } from "./engagement-timeline";
import { PrepChecklistPanel } from "./prep-checklist-panel";
import { SafeStartRosterGrid } from "./roster-grid";

/**
 * Phase 01 chrome rationalization: the internal midnight header/footer was
 * removed in favor of the outer AuthenticatedShell. Body content remains on a
 * warm-cream surface; the negative-margin wrapper escapes the dashboard
 * layout's inner container padding so the view reads as full-width.
 */
export function SafeStartHomeView({
  data,
  sourceBadge,
}: {
  data: SafeStartHeroTimelineFixture;
  sourceBadge?: string;
}) {
  const timeline = data.sections.find((s) => s.kind === "timeline");
  const rosters = data.sections.find((s) => s.kind === "rosterColumns");
  const prep = data.sections.find((s) => s.kind === "prepChecklist");

  return (
    <div className="-mx-[clamp(1.25rem,4vw,2.5rem)] -my-8 flex min-h-[calc(100dvh-4rem)] flex-col bg-safestart-bg text-safestart-ink selection:bg-pathway-accent/20">
      <main className="mx-auto flex w-full max-w-[960px] flex-grow flex-col gap-12 px-8 py-16 md:px-16 md:py-20">
        {sourceBadge ? (
          <span className="self-start border border-safestart-hairline bg-safestart-surface-container px-2 py-1 font-body text-[10px] uppercase tracking-widest text-safestart-muted">
            {sourceBadge}
          </span>
        ) : null}
        <section className="flex flex-col gap-4">
          {data.page.eyebrow ? (
            <span className="font-body text-[11px] font-bold uppercase tracking-[0.08em] text-pathway-accent">
              {data.page.eyebrow}
            </span>
          ) : null}
          <h1 className="font-headline text-4xl italic leading-tight tracking-tight md:text-[44px]">
            {data.page.headline}
          </h1>
          {data.page.supportingCopy ? (
            <p className="max-w-[800px] font-body text-base leading-relaxed">{data.page.supportingCopy}</p>
          ) : null}
        </section>

        {timeline?.kind === "timeline" && timeline.stages.length > 0 ? (
          <>
            <hr className="my-2 border-t border-safestart-hairline opacity-50" />
            <EngagementTimeline stages={timeline.stages} />
          </>
        ) : null}

        {rosters?.kind === "rosterColumns" && rosters.columns.some((c) => c.items.length > 0) ? (
          <>
            <hr className="my-2 border-t border-safestart-hairline opacity-50" />
            <SafeStartRosterGrid columns={rosters.columns} />
          </>
        ) : null}

        {prep?.kind === "prepChecklist" && (prep.title || prep.bullets?.length) ? (
          <>
            <hr className="my-2 border-t border-safestart-hairline opacity-50" />
            <PrepChecklistPanel
              eyebrow={prep.eyebrow}
              title={prep.title}
              intro={prep.intro}
              bullets={prep.bullets}
            />
          </>
        ) : null}
      </main>
    </div>
  );
}
