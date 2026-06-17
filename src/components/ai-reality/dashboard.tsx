import Link from "next/link";

import { getAiRealityCtaConfig } from "@/lib/ai-reality/config";
import {
  AI_REALITY_DASHBOARD_NAME,
  AI_REALITY_INSTRUMENT_NAME,
  type AiRealityOrgPayload,
  type AiRealityStage,
} from "@/lib/ai-reality/types";
import { mapStagePublicLabel } from "@/lib/ai-reality/copy";

/**
 * The AI Reality Dashboard. Renders ONLY the precomputed org payload — no
 * scoring happens here. Server component (no client state); print-friendly.
 */
export function AiRealityDashboard({
  payload,
  organizationName,
}: {
  payload: AiRealityOrgPayload;
  organizationName: string;
}) {
  const cta = getAiRealityCtaConfig();
  const divergent = new Set(payload.mostDivergentStages);

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-12 md:py-16">
      {/* ----------------------------- Header ----------------------------- */}
      <header>
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
          {AI_REALITY_INSTRUMENT_NAME}
        </p>
        <h1 className="mt-3 text-3xl leading-tight md:text-4xl">
          {organizationName}, {AI_REALITY_DASHBOARD_NAME}
        </h1>
        <p className="mt-3 text-base text-muted-foreground">
          {payload.respondedCount} of {payload.invitedCount} responded
          {payload.provisional && (
            <span className="ml-2 rounded-full border border-border px-2 py-0.5 text-xs uppercase tracking-wide text-foreground">
              Provisional
            </span>
          )}
        </p>
        {payload.provisional && (
          <p className="mt-2 text-sm text-muted-foreground">
            This is your own read so far. Invite your leadership team to see where you agree, and where
            you split.
          </p>
        )}
      </header>

      {/* ----------------------- The ordered path ------------------------- */}
      <section className="mt-12">
        <h2 className="text-sm font-semibold uppercase tracking-eyebrow text-muted-foreground">
          The path
        </h2>
        <p className="mt-2 text-base leading-relaxed text-foreground">{payload.placementLine}</p>
        {/* Ghost-number path spine (proposal §3.7, pattern A), adopts the agent
            room's numbered path vocabulary while staying a print-friendly server
            component (all scores visible; no client boundary). The full
            four-column accordion is deferred to preserve the share/print read. */}
        <ol className="mt-6 space-y-4">
          {payload.orderedPath.map((stage, i) => {
            const s = payload.stages[stage];
            const isHere = i === 0; // the first move is always Safety
            return (
              <li key={stage} className="relative pl-12">
                <span
                  aria-hidden
                  className="absolute left-0 top-0.5 bottom-0.5 w-0.5 rounded-full"
                  style={{
                    background: isHere
                      ? "var(--color-ink-band-blue)"
                      : "var(--color-ink-band-border)",
                  }}
                />
                <span
                  aria-hidden
                  className="absolute left-2.5 top-0 select-none font-mono font-semibold leading-none text-[1.75rem] tracking-[-0.03em]"
                  style={{
                    color: "var(--color-ink-band-blue)",
                    opacity: isHere ? 0.22 : 0.1,
                  }}
                >
                  {i + 1}
                </span>
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="font-medium text-foreground">
                    {stage}
                    {isHere && (
                      <span className="ml-2 font-[var(--font-ink-hand)] text-(--color-ink-band-blue)">
                        you are here
                      </span>
                    )}
                  </span>
                  <span className="tabular-nums text-muted-foreground">
                    {s.mean}%
                    {payload.respondedCount > 1 && (
                      <span className="ml-2 text-xs">· median {s.median}%</span>
                    )}
                  </span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-section">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${s.mean}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* --------------------------- Sharpest gap ------------------------- */}
      <section className="mt-12 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <h2 className="text-sm font-semibold uppercase tracking-eyebrow text-muted-foreground">
          Your sharpest gap
        </h2>
        <p className="mt-3 text-lg leading-relaxed text-foreground">{payload.dominantGapLine}</p>
      </section>

      {/* -------------------------- Team divergence ----------------------- */}
      <section className="mt-12">
        <h2 className="text-sm font-semibold uppercase tracking-eyebrow text-muted-foreground">
          Where your team agrees, and splits
        </h2>
        <p className="mt-3 text-base leading-relaxed text-foreground">{payload.divergenceLine}</p>
        {payload.respondedCount > 1 && (
          <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {payload.orderedPath.map((stage) => {
              const s = payload.stages[stage];
              return (
                <li
                  key={stage}
                  className={
                    "rounded-xl border p-4 " +
                    (divergent.has(stage as AiRealityStage)
                      ? "border-(--color-ink-band-blue) bg-section"
                      : "border-border")
                  }
                >
                  <p className="text-sm font-medium text-foreground">{stage}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    spread {s.spread} pts
                    <br />
                    {s.min}–{s.max}%
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* ---------------------------- Illusions --------------------------- */}
      {payload.illusions.length > 0 && (
        <section className="mt-12">
          <h2 className="text-sm font-semibold uppercase tracking-eyebrow text-muted-foreground">
            What to watch for
          </h2>
          <ul className="mt-4 space-y-3">
            {payload.illusions.map((ill) => (
              <li key={ill.id} className="rounded-xl border border-border bg-card p-4">
                <p className="text-base text-foreground">{ill.label}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                  {ill.unanimous
                    ? "Everyone who answered flagged this"
                    : ill.contested
                      ? `${ill.count} of ${payload.respondedCount} flagged this, not unanimous`
                      : "Flagged"}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ------------------- Leader map context (optional) ---------------- */}
      {payload.leaderMapGaps && payload.leaderMapGaps.length > 0 && (
        <section className="mt-12">
          <h2 className="text-sm font-semibold uppercase tracking-eyebrow text-muted-foreground">
            From your quick reality check
          </h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-foreground">
            {payload.leaderMapGaps.map((g, i) => (
              <li key={i}>
                <span className="font-medium">{mapStagePublicLabel(g.stage)}:</span> {g.line}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ------------------------------- CTA ------------------------------ */}
      <section className="mt-12 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <h2 className="text-lg text-foreground">One next step</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Wherever you landed, the move is the same: start with Safety.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link
            href={cta.free.href}
            className="rounded-xl border border-border p-5 transition-colors hover:bg-section"
          >
            <p className="font-medium text-foreground">{cta.free.label}</p>
            <p className="mt-1 text-sm text-muted-foreground">{cta.free.description}</p>
          </Link>
          <Link
            href={cta.paid.href}
            className="rounded-xl border border-(--color-ink-band-blue) bg-section p-5 transition-colors hover:opacity-90"
          >
            <p className="font-medium text-foreground">{cta.paid.label}</p>
            <p className="mt-1 text-sm text-muted-foreground">{cta.paid.description}</p>
          </Link>
        </div>
      </section>
    </article>
  );
}
