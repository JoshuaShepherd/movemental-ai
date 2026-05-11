import Link from "next/link";

import type { SafeStartHeroTimelineFixture } from "@/lib/program/types/safe-start-hero";

import { EngagementTimeline } from "./engagement-timeline";
import { PrepChecklistPanel } from "./prep-checklist-panel";
import { SafeStartRosterGrid } from "./roster-grid";

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
  const brand = data.shell.brandLine ?? "MOVEMENTAL";

  return (
    <div className="flex min-h-[calc(100dvh-8rem)] flex-col bg-safestart-bg text-safestart-ink selection:bg-pathway-accent/20">
      <header className="z-50 flex h-20 w-full shrink-0 items-center justify-between border-b border-safestart-hairline bg-movemental-midnight px-8 text-white md:px-12">
        <div className="font-headline text-2xl font-bold italic tracking-tighter">{brand}</div>
        <div className="flex items-center gap-4 font-body text-[13px]">
          {sourceBadge ? (
            <span className="rounded-none border border-white/20 px-2 py-1 text-[10px] uppercase tracking-widest text-white/70">
              {sourceBadge}
            </span>
          ) : null}
          {data.shell.tenantName ? <span>{data.shell.tenantName}</span> : null}
          {data.shell.tenantName ? <span className="opacity-50">•</span> : null}
          {data.shell.userInitials ? (
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/10 text-xs font-bold">
              {data.shell.userInitials}
            </div>
          ) : null}
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-[960px] flex-grow flex-col gap-12 px-8 py-16 md:px-16 md:py-20">
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

      <footer className="mt-auto flex h-20 w-full shrink-0 flex-col items-center justify-between gap-4 bg-movemental-midnight px-8 text-white md:flex-row md:px-12">
        <div className="font-headline text-lg italic">{brand}</div>
        <nav className="flex flex-wrap justify-center gap-6 font-body text-[13px]">
          {(data.shell.footerLinks ?? []).map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="opacity-80 transition-colors hover:text-pathway-accent hover:opacity-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </footer>
    </div>
  );
}
