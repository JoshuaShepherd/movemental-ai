import { redirect } from "next/navigation";

import { loadSandboxLiveEngagementState } from "@/lib/sandboxlive/engagement.server";
import {
  SANDBOXLIVE_PHASES,
  type SandboxLivePhaseSlug,
} from "@/lib/sandboxlive/phase-manifest";
import { resolveActiveOrganizationId } from "@/lib/services/onboarding/onboarding.service";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Sponsor oversight · SandboxLive",
};

const PHASE_STATUS_TONE: Record<"not_started" | "in_progress" | "complete", string> = {
  not_started: "text-muted-foreground",
  in_progress: "text-pathway-accent",
  complete: "text-[color:var(--color-status-go)]",
};

const PHASE_STATUS_LABEL: Record<"not_started" | "in_progress" | "complete", string> = {
  not_started: "Not started",
  in_progress: "In progress",
  complete: "Complete",
};

export default async function SandboxLiveSponsorOversightPage({
  searchParams,
}: {
  searchParams: Promise<{ org?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) {
    redirect("/login?next=/sandboxlive/sponsor-oversight");
  }

  const sp = await searchParams;
  const resolved = await resolveActiveOrganizationId(user.id, sp.org);
  if (!resolved.success) {
    redirect("/dashboard");
  }

  const state = await loadSandboxLiveEngagementState(resolved.data.organizationId);
  const phaseStatusBySlug = new Map<SandboxLivePhaseSlug, "not_started" | "in_progress" | "complete">(
    state.phases.map((p) => [p.slug, p.status] as const),
  );

  const completed = state.phases.filter((p) => p.status === "complete").length;
  const inProgress = state.phases.filter((p) => p.status === "in_progress").length;
  const total = SANDBOXLIVE_PHASES.length;

  return (
    <div className="flex flex-col gap-12">
      <header className="flex flex-col gap-4">
        <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-pathway-accent">
          SandboxLive · Sponsor oversight
        </span>
        <h1 className="font-serif text-[clamp(2.25rem,4.5vw,2.75rem)] italic leading-tight tracking-tight text-foreground">
          Engagement at a glance
        </h1>
        <p className="max-w-[680px] text-[15px] leading-relaxed text-muted-foreground">
          For sponsoring denominations and networks: a summary view of how the cohort
          is moving through the eight-phase arc. When the full cohort roster is
          available, this view will aggregate across every member organization. Today
          it reflects the organization you have open in the workspace header.
        </p>
      </header>

      {/* Stat strip */}
      <section className="grid grid-cols-1 gap-px bg-border-soft md:grid-cols-3">
        <Stat label="Phases complete" value={`${completed} / ${total}`} />
        <Stat label="Phases in progress" value={`${inProgress}`} />
        <Stat
          label="Currently working on"
          value={
            state.currentPhaseSlug
              ? SANDBOXLIVE_PHASES.find((p) => p.slug === state.currentPhaseSlug)?.name ?? "—"
              : completed === total
                ? "Engagement complete"
                : "Phase 01 — Boundaries"
          }
        />
      </section>

      {/* Phase-by-phase breakdown */}
      <section className="flex flex-col gap-4">
        <h2 className="font-serif text-[20px] italic text-foreground">
          Phase-by-phase
        </h2>
        <ul className="flex flex-col">
          {SANDBOXLIVE_PHASES.map((phase) => {
            const status = phaseStatusBySlug.get(phase.slug) ?? "not_started";
            return (
              <li
                key={phase.slug}
                className="flex items-baseline gap-4 border-b border-border-soft py-4 last:border-b-0"
              >
                <span className="w-8 shrink-0 font-serif text-[18px] italic text-pathway-accent">
                  {phase.number}
                </span>
                <span className="flex-1 text-[14px] text-foreground">{phase.name}</span>
                <span
                  className={`text-[11px] font-medium uppercase tracking-[0.1em] ${PHASE_STATUS_TONE[status]}`}
                >
                  {PHASE_STATUS_LABEL[status]}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Editorial summary */}
      <section className="flex flex-col gap-4 border-t border-border-soft pt-8">
        <h2 className="font-serif text-[20px] italic text-foreground">
          Sponsor view
        </h2>
        <p className="max-w-[680px] text-[14px] leading-relaxed text-muted-foreground">
          The cohort is{" "}
          {state.currentPhaseSlug ? (
            <>
              actively working through the SandboxLive arc.{" "}
              {completed > 0
                ? `Phases ${SANDBOXLIVE_PHASES.slice(0, completed).map((p) => p.number).join(", ")} have closed; `
                : "No phases have closed yet; "}
              {inProgress > 0 ? `${inProgress} phase${inProgress === 1 ? " is" : "s are"} currently open.` : "the cohort is preparing to begin."}
            </>
          ) : completed === total ? (
            <>
              done — every phase is complete. The Future Plan is ready for board
              distribution. Review the board export before signing off on sponsorship
              continuation.
            </>
          ) : (
            <>
              not yet engaged. Phase 01 — Boundaries is the entry point.
            </>
          )}
        </p>
      </section>

      {/* Framing — single-org preview until sponsor aggregation ships */}
      <aside className="border border-border-soft bg-section p-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
          About this view
        </p>
        <p className="mt-2 max-w-[680px] text-[14px] leading-relaxed text-muted-foreground">
          Sponsor oversight currently shows the active organization only. When cohort
          rostering and sponsor permissions are available for your network or
          denomination, this page will summarize every member organization and limit
          visibility to sponsors Movemental has explicitly granted.
        </p>
      </aside>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card p-6">
      <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 font-serif text-[28px] italic leading-none text-foreground">
        {value}
      </p>
    </div>
  );
}
