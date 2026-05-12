import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { EditorialEmptyState } from "@/components/authenticated/editorial-empty-state";
import { StitchDocumentView } from "@/components/stitch/stitch-document-view";
import { loadProgramTemplateData } from "@/lib/program/load-program-template-data.server";
import type { ProgramFixtureBase } from "@/lib/program/types/stitch-screen-family";
import {
  getNextSandboxLivePhase,
  getSandboxLivePhase,
} from "@/lib/sandboxlive/phase-manifest";
import { createClient } from "@/lib/supabase/server";

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

  return (
    <div className="-mx-[clamp(1.25rem,4vw,2.5rem)] -my-8 flex min-h-[calc(100dvh-4rem)] flex-col bg-safestart-bg text-safestart-ink selection:bg-pathway-accent/20">
      {/* Phase header */}
      <header className="border-b border-safestart-hairline bg-safestart-bg">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 py-10 md:px-12 md:py-14">
          <Link
            href={`/sandboxlive${orgQuery}`}
            className="self-start text-[11px] font-medium uppercase tracking-[0.1em] text-safestart-muted transition-colors hover:text-pathway-accent"
          >
            ← SandboxLive
          </Link>
          <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-pathway-accent">
            Phase {phase.number} — {phase.name}
          </p>
          <h1 className="font-serif text-[clamp(2.25rem,4.5vw,2.75rem)] italic leading-[1.05] tracking-tight text-safestart-ink">
            {phase.name}
          </h1>
          <p className="max-w-[680px] text-[15px] leading-relaxed text-safestart-muted">
            {phase.produces}
          </p>
        </div>
      </header>

      {/* Workspace body */}
      {fixture ? (
        <StitchDocumentView fixture={fixture} sourceBadge={sourceBadge} embedded />
      ) : (
        <div className="mx-auto w-full max-w-3xl px-6 py-16 md:px-12">
          <EditorialEmptyState
            tone="safestart"
            eyebrow="Phase in preparation"
            title="This phase’s working surface is still being finished."
          >
            <p>
              Navigation stays available so facilitators can rehearse the journey. The full workspace for{" "}
              <span className="font-medium text-safestart-ink">
                Phase {phase.number} — {phase.name}
              </span>{" "}
              will appear here once Movemental completes the editorial pass. Until then, this is the outcome the phase is
              designed to produce:
            </p>
          </EditorialEmptyState>
          <p className="mt-6 border-l-2 border-pathway-accent pl-4 font-serif text-[18px] italic leading-relaxed text-safestart-ink">
            {phase.produces}
          </p>
        </div>
      )}

      {/* What's next */}
      <footer className="mt-auto border-t border-safestart-hairline bg-safestart-bg">
        <div className="mx-auto flex w-full max-w-5xl items-baseline justify-between gap-4 px-6 py-8 md:px-12">
          <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-safestart-muted">
            What&rsquo;s next
          </p>
          {nextPhase ? (
            <Link
              href={`/sandboxlive/phase/${nextPhase.slug}${orgQuery}`}
              className="flex items-baseline gap-3 text-[14px] text-safestart-ink transition-colors hover:text-pathway-accent"
            >
              <span className="font-serif text-[18px] italic text-pathway-accent">
                {nextPhase.number}
              </span>
              <span>{nextPhase.name} →</span>
            </Link>
          ) : (
            <Link
              href={`/sandboxlive${orgQuery}`}
              className="text-[14px] text-safestart-ink transition-colors hover:text-pathway-accent"
            >
              Back to SandboxLive →
            </Link>
          )}
        </div>
      </footer>
    </div>
  );
}
