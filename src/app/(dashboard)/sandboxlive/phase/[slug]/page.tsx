import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { ProgramEditorialFallbackBody } from "@/components/program/program-editorial-fallback-body";
import { SandboxLivePhase03ExperimentingView } from "@/components/sandboxlive/phase-03-experimenting-view";
import { StitchDocumentView } from "@/components/stitch/stitch-document-view";
import { editorialHome } from "@/lib/authenticated/editorial-home";
import { loadProgramTemplateData } from "@/lib/program/load-program-template-data.server";
import type { ProgramFixtureBase } from "@/lib/program/types/stitch-screen-family";
import {
  getNextSandboxLivePhase,
  getSandboxLivePhase,
} from "@/lib/sandboxlive/phase-manifest";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const phase = getSandboxLivePhase(slug);
  return {
    title: phase ? `Phase ${phase.number} — ${phase.name} · SandboxLive` : "SandboxLive",
  };
}

export default async function SandboxLivePhasePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ org?: string }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;

  const phase = getSandboxLivePhase(slug);
  if (!phase) notFound();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) {
    redirect(`/login?next=/sandboxlive/phase/${slug}`);
  }

  let fixture: ProgramFixtureBase | null = null;
  let sourceBadge: string | undefined;
  if (phase.templateId) {
    try {
      const loaded = await loadProgramTemplateData(
        user.id,
        sp.org,
        "sandbox",
        phase.templateId,
      );
      fixture = loaded.fixture;
      sourceBadge = loaded.sourceBadge;
    } catch {
      fixture = null;
    }
  }

  const nextPhase = getNextSandboxLivePhase(phase.slug);
  const orgQuery = sp.org ? `?org=${sp.org}` : "";

  const phaseEyebrow =
    phase.slug === "03-experimenting"
      ? `Phase ${phase.number} · Experimenting`
      : `Phase ${phase.number} · ${phase.name}`;
  const phaseTitle = phase.slug === "03-experimenting" ? "Experimenting" : phase.name;

  return (
    <div
      className="-mx-[clamp(1.25rem,4vw,2.5rem)] -my-8 flex min-h-[calc(100dvh-4rem)] flex-col bg-background text-foreground selection:bg-primary/10"
    >
      <header className="border-b border-[0.5px] border-solid border-border-soft bg-section">
        <div className="mx-auto w-full max-w-5xl px-6 md:px-12">
          <div
            className={cn(
              "pb-[clamp(2.5rem,5vw,3.5rem)] pt-[clamp(3.25rem,6vw,4.75rem)]",
              "flex flex-col gap-4",
            )}
          >
            <Link
              href={`/sandboxlive${orgQuery}`}
              className={cn(editorialHome.textLink, "self-start text-[14px]")}
            >
              ← SandboxLive
            </Link>
            <p className={cn(editorialHome.eyebrow, "mt-2")}>{phaseEyebrow}</p>
            <h1 className={cn(editorialHome.display, "max-w-[min(100%,48rem)]")}>{phaseTitle}</h1>
            <p className={cn(editorialHome.lede, "max-w-2xl text-[15px]")}>{phase.produces}</p>
            {phase.slug === "02-assessment" ? (
              <p className="max-w-2xl text-[14px] leading-relaxed text-muted-foreground">
                <span className="text-foreground">Before group sessions: </span>
                each staff member can complete the{" "}
                <Link
                  href={`/sandboxlive/readiness${orgQuery}`}
                  className={cn(
                    editorialHome.libraryLink,
                    "font-medium text-[14px] text-foreground underline-offset-[0.2em]",
                  )}
                >
                  staff readiness check-in
                </Link>{" "}
                (about ten minutes). That intake shapes training design; it is separate from this shared map.
              </p>
            ) : null}
          </div>
        </div>
      </header>

      {/* Workspace body */}
      {phase.slug === "03-experimenting" ? (
        <SandboxLivePhase03ExperimentingView
          userId={user.id}
          orgSlug={sp.org}
          orgQuery={orgQuery}
        />
      ) : fixture ? (
        <StitchDocumentView fixture={fixture} sourceBadge={sourceBadge} embedded />
      ) : (
        <ProgramEditorialFallbackBody
          variant="sandboxlive_phase"
          title={phase.name}
          description={phase.description}
          produces={phase.produces}
        />
      )}

      <footer className="mt-auto border-t border-[0.5px] border-solid border-border-soft bg-section">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-6 py-8 sm:flex-row sm:items-baseline sm:justify-between md:px-12">
          <p className={editorialHome.eyebrow}>What&apos;s next</p>
          {nextPhase ? (
            <Link
              href={`/sandboxlive/phase/${nextPhase.slug}${orgQuery}`}
              className="group flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[15px] text-foreground transition-colors hover:text-pathway-accent"
            >
              <span className="font-serif text-[22px] italic tabular-nums text-pathway-accent group-hover:text-pathway-accent">
                {nextPhase.number}
              </span>
              <span className="font-medium underline decoration-border decoration-[0.5px] underline-offset-[0.22em] group-hover:decoration-pathway-accent/50">
                {nextPhase.name} →
              </span>
            </Link>
          ) : (
            <Link href={`/sandboxlive${orgQuery}`} className={editorialHome.textLink}>
              Back to SandboxLive →
            </Link>
          )}
        </div>
      </footer>
    </div>
  );
}
