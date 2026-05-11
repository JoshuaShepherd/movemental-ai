import type { TimelineStage } from "@/lib/program/types/safe-start-hero";

/** Horizontal SafeStart engagement timeline — safestart-hero-timeline family. */
export function EngagementTimeline({ stages }: { stages: TimelineStage[] }) {
  return (
    <section className="flex flex-col gap-8 overflow-x-auto pb-4">
      <div className="relative flex min-w-max gap-4">
        <div className="absolute left-4 right-4 top-[11px] z-0 h-px bg-safestart-hairline opacity-30" />
        {stages.map((stage, idx) => (
          <div key={`${stage.stageLabel}-${idx}`} className="relative z-10 flex flex-col gap-3">
            <div className="flex items-center justify-center">
              {stage.state === "complete" ? (
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-safestart-completed bg-safestart-bg">
                  <div className="h-2 w-2 rounded-full bg-safestart-completed" />
                </div>
              ) : null}
              {stage.state === "current" ? (
                <div className="-ml-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-pathway-accent bg-safestart-bg">
                  <div className="h-3 w-3 animate-pulse rounded-full bg-pathway-accent" />
                </div>
              ) : null}
              {stage.state === "upcoming" ? (
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-safestart-hairline bg-safestart-bg opacity-60">
                  <div className="h-1.5 w-1.5 rounded-full bg-safestart-muted opacity-40" />
                </div>
              ) : null}
            </div>
            <div className="flex max-w-[14rem] flex-col gap-1">
              <span
                className={`font-headline text-base italic ${
                  stage.state === "upcoming" ? "text-safestart-muted opacity-70" : "text-pathway-accent"
                }`}
              >
                {stage.stageLabel}
              </span>
              <span
                className={`font-body text-sm ${
                  stage.state === "current" ? "font-bold text-safestart-ink" : "text-safestart-ink"
                } ${stage.state === "upcoming" ? "text-safestart-muted opacity-80" : ""}`}
              >
                {stage.title}
              </span>
              {stage.detail ? (
                <span
                  className={`font-body text-xs ${
                    stage.state === "current" ? "font-semibold text-pathway-accent" : "text-safestart-muted"
                  }`}
                >
                  {stage.detail}
                </span>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
