import Link from "next/link";

import { editorialHome } from "@/lib/authenticated/editorial-home";
import {
  SANDBOXLIVE_PHASES,
  type SandboxLivePhaseSlug,
} from "@/lib/sandboxlive/phase-manifest";
import { cn } from "@/lib/utils";

export interface ActiveEngagementHomeProps {
  organizationName: string;
  /** Index of the current phase (1-based) or null when the engagement is done. */
  currentPhaseSlug: SandboxLivePhaseSlug | null;
  phaseStatusBySlug: Map<SandboxLivePhaseSlug, "not_started" | "in_progress" | "complete">;
  orgQuery: string;
}

/**
 * SandboxLive home — editorial register aligned with SafeStart + Leader overview.
 * @see docs/design/AUTHENTICATED_HOME_REGISTER.md
 */
export function ActiveEngagementHome({
  organizationName,
  currentPhaseSlug,
  phaseStatusBySlug,
  orgQuery,
}: ActiveEngagementHomeProps) {
  const allComplete = SANDBOXLIVE_PHASES.every(
    (p) => phaseStatusBySlug.get(p.slug) === "complete",
  );
  const untouched = SANDBOXLIVE_PHASES.every(
    (p) => phaseStatusBySlug.get(p.slug) === "not_started",
  );

  const currentPhase = currentPhaseSlug
    ? SANDBOXLIVE_PHASES.find((p) => p.slug === currentPhaseSlug)
    : null;

  const highlightSlug: SandboxLivePhaseSlug | null = allComplete
    ? null
    : untouched
      ? "01-boundaries"
      : currentPhase
        ? currentPhase.slug
        : "01-boundaries";

  const heroDisplay = allComplete
    ? "Your engagement, complete."
    : untouched
      ? "Welcome to SandboxLive."
      : currentPhase
        ? `Your cohort, in Phase ${currentPhase.number}.`
        : "Welcome to SandboxLive.";

  const heroLede = allComplete ? (
    <>
      Every phase of the eight-phase arc is closed. The Future Plan is your cumulative deliverable — the board-facing document that carries green, yellow, and red lights forward with schedule, budget, and approval.
    </>
  ) : untouched ? (
    <>
      The cohort has not yet opened Phase 01 — Boundaries. When you are ready, name what AI is for, what it is against, and which refusals the body will hold before any experimentation begins.
    </>
  ) : currentPhase ? (
    <>
      {currentPhase.produces.charAt(0).toUpperCase()}
      {currentPhase.produces.slice(1)}
    </>
  ) : (
    <>Begin with Phase 01 — Boundaries, then walk the arc in order.</>
  );

  const editorialLine = allComplete ? (
    <>
      <span className="text-muted-foreground">The cohort is in steady state — </span>
      all eight phases are marked complete; the Future Plan awaits export when you choose to distribute.
    </>
  ) : untouched ? (
    <>
      <span className="text-muted-foreground">Pre-kickoff — </span>
      no phase workspace has been opened yet; Phase 01 is the door.
    </>
  ) : currentPhase ? (
    <>
      <span className="text-muted-foreground">Active arc — </span>
      the cohort is working inside Phase {currentPhase.number} — {currentPhase.name}. Session scheduling will appear here as soon as cohort sessions are wired.
    </>
  ) : null;

  const nextItalic = allComplete
    ? "Export the Future Plan when you are ready for the board packet."
    : untouched
      ? "Open Phase 01 — Boundaries and write the cohort boundary set."
      : currentPhase
        ? `Continue in Phase ${currentPhase.number} — ${currentPhase.name}.`
        : "Open Phase 01 — Boundaries.";

  const nextHref = allComplete
    ? `/sandboxlive/phase/08-future-plan/export${orgQuery}`
    : untouched
      ? `/sandboxlive/phase/01-boundaries${orgQuery}`
      : currentPhase
        ? `/sandboxlive/phase/${currentPhase.slug}${orgQuery}`
        : `/sandboxlive/phase/01-boundaries${orgQuery}`;

  const nextCta = allComplete
    ? "Open export"
    : untouched
      ? "Open Phase 01"
      : currentPhase
        ? `Open Phase ${currentPhase.number}`
        : "Open Phase 01";

  return (
    <div className="flex flex-col">
      <section className={editorialHome.heroBand}>
        <p className={editorialHome.eyebrow}>
          SandboxLive · {organizationName}
        </p>
        <h1 className={cn(editorialHome.display, "mt-4 max-w-[min(100%,52rem)]")}>{heroDisplay}</h1>
        <p className={cn(editorialHome.lede, "mt-6")}>{heroLede}</p>
        {editorialLine ? (
          <p className={cn(editorialHome.editorialStatus, "mt-6 max-w-[40rem]")}>{editorialLine}</p>
        ) : null}
      </section>

      <div className={editorialHome.hairline} aria-hidden />

      <section className={editorialHome.bandGap}>
        <header className="flex flex-col gap-2">
          <p className={editorialHome.eyebrow}>The eight phases</p>
          <h2 className={editorialHome.bandSubhead}>Where you are, where you&apos;re going</h2>
        </header>
        <ol className="list-none p-0">
          {SANDBOXLIVE_PHASES.map((phase) => {
            const status = phaseStatusBySlug.get(phase.slug) ?? "not_started";
            const isCurrent = highlightSlug !== null && phase.slug === highlightSlug;
            return (
              <li key={phase.slug} className={editorialHome.rowWrap}>
                <Link
                  href={`/sandboxlive/phase/${phase.slug}${orgQuery}`}
                  className={cn(editorialHome.rowLink, isCurrent ? editorialHome.rowCurrent : editorialHome.rowInactive)}
                >
                  <span className={editorialHome.rowNum32}>{phase.number}</span>
                  <span className="flex min-w-0 flex-1 flex-col gap-1.5">
                    <span className={editorialHome.rowTitle22}>{phase.name}</span>
                    <span className={editorialHome.rowDesc14}>{phase.description}</span>
                    <span className={editorialHome.rowMeta11}>
                      {status === "complete" ? "Complete" : status === "in_progress" ? "In progress" : "Not started"}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      <div className={cn(editorialHome.hairline, "mt-[clamp(2.5rem,6vw,4rem)]")} aria-hidden />

      <section className={editorialHome.bandGap}>
        <header className="flex flex-col gap-2">
          <p className={editorialHome.eyebrow}>What your cohort is building toward</p>
        </header>
        <div className="flex max-w-[42rem] flex-col gap-8">
          <p className="text-[15px] leading-[1.7] text-foreground">
            The{" "}
            <Link href={`/sandboxlive/recipes${orgQuery}`} className={editorialHome.libraryLink}>
              Recipe library
            </Link>{" "}
            holds short, repeatable AI workflows — each one written as a recipe the cohort can try, refuse, or graduate into named use cases. It is the working shelf for Phase 03 onward, when experiments need to stay small and legible.
          </p>
          <p className="text-[15px] leading-[1.7] text-foreground">
            <Link href={`/sandboxlive/cohort${orgQuery}`} className={editorialHome.libraryLink}>
              Cohort view
            </Link>{" "}
            is the roster and relationship map for the leaders in the room — who is accountable for which boundary line, and where sponsorship sits when disagreement shows up later in the arc.
          </p>
          <p className="text-[15px] leading-[1.7] text-foreground">
            <Link href={`/sandboxlive/sponsor-oversight${orgQuery}`} className={editorialHome.libraryLink}>
              Sponsor oversight
            </Link>{" "}
            gives executives and board sponsors a read-only window into progress without stepping into the working rooms — enough signal to support, not enough surface to steer day-to-day craft.
          </p>
        </div>
      </section>

      <div className={cn(editorialHome.hairline, "mt-[clamp(2.5rem,6vw,4rem)]")} aria-hidden />

      <section className={cn(editorialHome.bandGap, "pb-[clamp(3rem,8vw,5rem)]")}>
        <p className={editorialHome.eyebrow}>Next required action</p>
        <p className={cn(editorialHome.editorialStatus, "mt-3 max-w-[40rem]")}>{nextItalic}</p>
        <Link href={nextHref} className={cn(editorialHome.primaryCta, "mt-6")}>
          {nextCta} →
        </Link>
      </section>
    </div>
  );
}
