import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { ProgramEditorialFallbackBody } from "@/components/program/program-editorial-fallback-body";
import { StitchDocumentView } from "@/components/stitch/stitch-document-view";
import { loadProgramTemplateData } from "@/lib/program/load-program-template-data.server";
import type { ProgramFixtureBase } from "@/lib/program/types/stitch-screen-family";
import {
  RATIFICATION_STEPS,
  getNextRatificationStep,
  getPreviousRatificationStep,
  getRatificationStep,
} from "@/lib/safestart/workspace-manifest";
import { createClient } from "@/lib/supabase/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ step: string }>;
}) {
  const { step } = await params;
  const entry = getRatificationStep(step);
  return {
    title: entry ? `${entry.name} · Ratification · SafeStart` : "Ratification · SafeStart",
  };
}

export default async function SafeStartRatificationStepPage({
  params,
  searchParams,
}: {
  params: Promise<{ step: string }>;
  searchParams: Promise<{ org?: string }>;
}) {
  const { step } = await params;
  const sp = await searchParams;

  const entry = getRatificationStep(step);
  if (!entry) notFound();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) {
    redirect(`/login?next=/safestart/ratification/${step}`);
  }

  let fixture: ProgramFixtureBase | null = null;
  let sourceBadge: string | undefined;
  try {
    const loaded = await loadProgramTemplateData(
      user.id,
      sp.org,
      "safety",
      entry.templateId,
    );
    fixture = loaded.fixture;
    sourceBadge = loaded.sourceBadge;
  } catch {
    fixture = null;
  }

  const previousStep = getPreviousRatificationStep(entry.slug);
  const nextStep = getNextRatificationStep(entry.slug);
  const orgQuery = sp.org ? `?org=${sp.org}` : "";

  return (
    <div className="-mx-[clamp(1.25rem,4vw,2.5rem)] -my-8 flex min-h-[calc(100dvh-4rem)] flex-col bg-safestart-bg text-safestart-ink selection:bg-pathway-accent/20">
      {/* Step header — includes inline step progress strip */}
      <header className="border-b border-safestart-hairline bg-safestart-bg">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-10 md:px-12 md:py-14">
          <Link
            href={`/safestart/ratification${orgQuery}`}
            className="self-start text-[11px] font-medium uppercase tracking-[0.1em] text-safestart-muted transition-colors hover:text-pathway-accent"
          >
            ← Board ratification
          </Link>

          {/* Step strip */}
          <ol className="flex items-center gap-2 overflow-x-auto" aria-label="Ratification steps">
            {RATIFICATION_STEPS.map((s) => {
              const isCurrent = s.slug === entry.slug;
              const isPast = s.order < entry.order;
              return (
                <li key={s.slug} className="flex shrink-0 items-center gap-2">
                  <Link
                    href={`/safestart/ratification/${s.slug}${orgQuery}`}
                    className={
                      isCurrent
                        ? "flex items-baseline gap-1.5 border-b-2 border-pathway-accent pb-1 text-[11px] font-medium uppercase tracking-[0.08em] text-safestart-ink"
                        : isPast
                          ? "flex items-baseline gap-1.5 text-[11px] uppercase tracking-[0.08em] text-safestart-muted hover:text-pathway-accent"
                          : "flex items-baseline gap-1.5 text-[11px] uppercase tracking-[0.08em] text-safestart-muted/60 hover:text-pathway-accent"
                    }
                    aria-current={isCurrent ? "step" : undefined}
                  >
                    <span className="font-serif italic tabular-nums text-pathway-accent">
                      {String(s.order).padStart(2, "0")}
                    </span>
                    <span>{s.name}</span>
                  </Link>
                  {s.order < RATIFICATION_STEPS.length ? (
                    <span aria-hidden className="text-safestart-muted/40">·</span>
                  ) : null}
                </li>
              );
            })}
          </ol>

          <div className="flex flex-col gap-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-pathway-accent">
              Step {String(entry.order).padStart(2, "0")} of {RATIFICATION_STEPS.length}
            </p>
            <h1 className="font-serif text-[clamp(2.25rem,4.5vw,2.75rem)] italic leading-[1.05] tracking-tight text-safestart-ink">
              {entry.name}
            </h1>
            <p className="max-w-[680px] text-[15px] leading-relaxed text-safestart-muted">
              {entry.produces}
            </p>
          </div>
        </div>
      </header>

      {/* Step body */}
      {fixture ? (
        <StitchDocumentView fixture={fixture} sourceBadge={sourceBadge} embedded />
      ) : (
        <ProgramEditorialFallbackBody
          variant="safestart_ratification"
          title={entry.name}
          description={entry.description}
          produces={entry.produces}
        />
      )}

      {/* Prev / Next */}
      <footer className="mt-auto border-t border-safestart-hairline bg-safestart-bg">
        <div className="mx-auto flex w-full max-w-5xl items-baseline justify-between gap-4 px-6 py-8 md:px-12">
          {previousStep ? (
            <Link
              href={`/safestart/ratification/${previousStep.slug}${orgQuery}`}
              className="flex items-baseline gap-3 text-[14px] text-safestart-ink transition-colors hover:text-pathway-accent"
            >
              <span>←</span>
              <span className="font-serif text-[16px] italic text-pathway-accent">
                {String(previousStep.order).padStart(2, "0")}
              </span>
              <span>{previousStep.name}</span>
            </Link>
          ) : (
            <Link
              href={`/safestart${orgQuery}`}
              className="text-[14px] text-safestart-ink transition-colors hover:text-pathway-accent"
            >
              ← SafeStart home
            </Link>
          )}
          {nextStep ? (
            <Link
              href={`/safestart/ratification/${nextStep.slug}${orgQuery}`}
              className="flex items-baseline gap-3 text-[14px] text-safestart-ink transition-colors hover:text-pathway-accent"
            >
              <span>{nextStep.name}</span>
              <span className="font-serif text-[16px] italic text-pathway-accent">
                {String(nextStep.order).padStart(2, "0")}
              </span>
              <span>→</span>
            </Link>
          ) : (
            <Link
              href={`/safestart/steady-state${orgQuery}`}
              className="text-[14px] text-safestart-ink transition-colors hover:text-pathway-accent"
            >
              Steady state →
            </Link>
          )}
        </div>
      </footer>
    </div>
  );
}
