import Link from "next/link";

import {
  SANDBOXLIVE_PHASES,
  type SandboxLivePhaseSlug,
} from "@/lib/sandboxlive/phase-manifest";

/**
 * SandboxLive active-engagement home — lifted from the Stitch template at
 * `public/templates/sandbox/sandboxlive_dashboard_active_engagement_state/index.html`.
 *
 * The original HTML uses MD3-style tokens (`surface`, `on-surface`, `primary`,
 * `outline-variant`, `sandbox-amber`). Those are translated to our existing
 * tokens during the lift:
 *   - bg-surface          → bg-card
 *   - text-primary        → text-foreground
 *   - text-on-surface-variant → text-muted-foreground
 *   - text-sandbox-amber  → text-pathway-accent
 *   - bg-surface-container-high → bg-section
 *   - border-outline-variant → border-border-soft
 *   - bg-[#FAF8F4]        → bg-background
 *
 * Chrome (top nav / sidebar / footer) is intentionally stripped — the outer
 * AuthenticatedShell provides them. Cohort-specific copy and metric values
 * fall back to derived data we already have; the richer cohort metrics
 * ("BOUNDARIES SIGNED 7/7") require cohort_members data that lands later.
 */

export interface ActiveEngagementHomeProps {
  organizationName: string;
  /** Index of the current phase (1-based) or null when the engagement is done. */
  currentPhaseSlug: SandboxLivePhaseSlug | null;
  phaseStatusBySlug: Map<SandboxLivePhaseSlug, "not_started" | "in_progress" | "complete">;
  orgQuery: string;
}

export function ActiveEngagementHome({
  organizationName,
  currentPhaseSlug,
  phaseStatusBySlug,
  orgQuery,
}: ActiveEngagementHomeProps) {
  const currentPhase = currentPhaseSlug
    ? SANDBOXLIVE_PHASES.find((p) => p.slug === currentPhaseSlug)
    : null;
  const currentPhaseNumber = currentPhase ? Number(currentPhase.number) : null;
  const totalPhases = SANDBOXLIVE_PHASES.length;
  const phasesComplete = SANDBOXLIVE_PHASES.filter(
    (p) => phaseStatusBySlug.get(p.slug) === "complete",
  ).length;
  const phasesInProgress = SANDBOXLIVE_PHASES.filter(
    (p) => phaseStatusBySlug.get(p.slug) === "in_progress",
  ).length;

  const phase01 = phaseStatusBySlug.get("01-boundaries") ?? "not_started";
  const phase02 = phaseStatusBySlug.get("02-assessment") ?? "not_started";

  return (
    <div className="flex flex-col gap-16">
      {/* Section 1: Header context */}
      <header className="flex flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-soft pb-4">
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.1em]">
            <span className="font-semibold text-pathway-accent">SandboxLive dashboard</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-foreground">
              {currentPhaseNumber ? (
                <>Phase {currentPhase!.number} of 08</>
              ) : phasesComplete === totalPhases ? (
                <>Engagement complete</>
              ) : (
                <>Pre-kickoff</>
              )}
            </span>
          </div>
          <p className="hidden text-[12px] italic text-muted-foreground md:block">
            {phasesInProgress > 0
              ? `${phasesInProgress} phase${phasesInProgress === 1 ? "" : "s"} currently active.`
              : phasesComplete === totalPhases
                ? "Engagement is in steady state."
                : "Phase 01 — Boundaries is the entry point."}
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <h1 className="font-serif text-[clamp(2.5rem,5.5vw,3rem)] italic leading-[1.05] tracking-tight text-foreground">
            {phasesComplete === totalPhases ? (
              <>{organizationName}, the cohort is done.</>
            ) : currentPhase ? (
              <>Your Sandbox this week.</>
            ) : (
              <>{organizationName}, welcome to SandboxLive.</>
            )}
          </h1>
          <p className="max-w-3xl text-[17px] leading-relaxed text-foreground">
            {currentPhase ? (
              <>
                Your cohort is mid-stream — Phase {currentPhase.number} —{" "}
                <em className="font-serif not-italic text-foreground">{currentPhase.name}</em>.{" "}
                {currentPhase.produces}
              </>
            ) : phasesComplete === totalPhases ? (
              <>
                Every phase is complete. The Future Plan is your cumulative
                deliverable — open the board export when you&rsquo;re ready to
                distribute.
              </>
            ) : (
              <>
                Begin with Phase 01 — Boundaries. The cohort sets in-scope use
                cases and named refusals before any experimentation begins.
              </>
            )}
          </p>
        </div>
      </header>

      {/* Section 2: Metric strip */}
      <section className="grid grid-cols-1 border-y border-border-soft divide-y border-t md:grid-cols-4 md:divide-x md:divide-y-0 divide-border-soft">
        <Metric
          label="Phase 01 — Boundaries"
          value={phase01 === "complete" ? "Set" : phase01 === "in_progress" ? "Open" : "Not yet"}
          note={
            phase01 === "complete"
              ? "The foundation is set. The cohort has named what AI is for and against."
              : phase01 === "in_progress"
                ? "The cohort is writing the boundary set this week."
                : "Phase 01 is the first thing the cohort writes together."
          }
        />
        <Metric
          label="Phase 02 — Assessment"
          value={phase02 === "complete" ? "Mapped" : phase02 === "in_progress" ? "Mapping" : "Pending"}
          note={
            phase02 === "complete"
              ? "Current Reality Maps are complete across the cohort."
              : phase02 === "in_progress"
                ? "Members are mapping where AI already lives in their work."
                : "Phase 02 begins after Boundaries is signed."
          }
        />
        <Metric
          label="Phases complete"
          value={`${phasesComplete} / ${totalPhases}`}
          note={
            phasesComplete === 0
              ? "The arc runs eight phases over the full engagement."
              : phasesComplete === totalPhases
                ? "The full SandboxLive arc is closed."
                : `Latest closed: Phase ${String(phasesComplete).padStart(2, "0")}.`
          }
        />
        <Metric
          label="Active right now"
          value={String(phasesInProgress)}
          note={
            phasesInProgress === 0
              ? "No phases are currently in active work."
              : phasesInProgress === 1
                ? "One phase has unfinished work."
                : `${phasesInProgress} phases have unfinished work in parallel.`
          }
        />
      </section>

      {/* Section 3: Two-column dashboard */}
      <section className="grid grid-cols-1 gap-16 lg:grid-cols-3">
        <div className="flex flex-col gap-8 lg:col-span-2">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
              What&rsquo;s pending for you
            </span>
            <h2 className="font-serif text-[24px] italic text-foreground">
              {currentPhase
                ? `Three items waiting on you in Phase ${currentPhase.number}.`
                : phasesComplete === totalPhases
                  ? "Everything's closed. Nothing pending."
                  : "Begin the engagement when the cohort is ready."}
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            {currentPhase ? (
              <PendingCard
                eyebrow={`Phase ${currentPhase.number} — ${currentPhase.name.toUpperCase()}`}
                copy={currentPhase.produces}
                cta="Open the workspace"
                href={`/sandboxlive/phase/${currentPhase.slug}${orgQuery}`}
              />
            ) : null}
            <PendingCard
              eyebrow="Recipe — leadership"
              copy="Try the Strategic Memo Drafting recipe. 25 minutes, internal data."
              cta="View recipe"
              href={`/sandboxlive/recipes${orgQuery}`}
            />
            <PendingCard
              eyebrow="Teaching library"
              copy="What is a skill? An 8-chapter teaching guide for senior leaders."
              cta="Open the guide"
              href="/dashboard/teaching/claude-skills"
            />
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
              The cohort
            </span>
          </div>
          <div className="flex h-full flex-col gap-6 bg-section p-8">
            <div className="flex flex-col gap-1">
              <h3 className="font-serif text-[clamp(1.75rem,3vw,2rem)] italic leading-tight text-foreground">
                {organizationName}
              </h3>
              <p className="text-[13px] text-muted-foreground">
                {phasesComplete === totalPhases
                  ? "Engagement closed — in steady state."
                  : currentPhase
                    ? `Active in Phase ${currentPhase.number} — ${currentPhase.name}.`
                    : "Pre-kickoff. Phase 01 has not yet started."}
              </p>
            </div>
            <div className="h-px w-full bg-border-soft" />
            <div className="flex flex-1 flex-col gap-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-foreground">
                Cohort surfaces
              </span>
              <ul className="flex flex-col gap-3 text-[14px] text-foreground">
                <li>
                  <Link
                    href={`/sandboxlive/cohort${orgQuery}`}
                    className="hover:text-pathway-accent"
                  >
                    Cohort members →
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/sandboxlive/sponsor-oversight${orgQuery}`}
                    className="hover:text-pathway-accent"
                  >
                    Sponsor oversight →
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/sandboxlive/recipes${orgQuery}`}
                    className="hover:text-pathway-accent"
                  >
                    Recipe library →
                  </Link>
                </li>
              </ul>
            </div>
            <p className="mt-auto text-[12px] italic text-muted-foreground">
              Session scheduling lands when cohort_sessions is wired for SandboxLive.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Metric({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="flex flex-col gap-4 p-6">
      <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
        {label}
      </span>
      <span className="font-serif text-[32px] italic leading-none text-foreground">
        {value}
      </span>
      <p className="text-[12px] leading-relaxed text-muted-foreground">{note}</p>
    </div>
  );
}

function PendingCard({
  eyebrow,
  copy,
  cta,
  href,
}: {
  eyebrow: string;
  copy: string;
  cta: string;
  href: string;
}) {
  return (
    <div className="flex flex-col items-start justify-between gap-6 border border-border-soft bg-card p-6 md:flex-row md:items-center">
      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-foreground">
          {eyebrow}
        </span>
        <p className="text-[14px] text-foreground">{copy}</p>
      </div>
      <Link
        href={href}
        className="shrink-0 text-[11px] font-medium uppercase tracking-[0.1em] text-pathway-accent underline decoration-pathway-accent/60 underline-offset-4 transition-colors hover:text-foreground"
      >
        {cta} →
      </Link>
    </div>
  );
}
