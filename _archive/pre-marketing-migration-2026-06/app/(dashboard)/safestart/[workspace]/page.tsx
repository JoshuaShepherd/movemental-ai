import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { ProgramEditorialFallbackBody } from "@/components/program/program-editorial-fallback-body";
import { StitchDocumentView } from "@/components/stitch/stitch-document-view";
import { loadProgramTemplateData } from "@/lib/program/load-program-template-data.server";
import type { ProgramFixtureBase } from "@/lib/program/types/stitch-screen-family";
import {
  getNextSafeStartWorkspace,
  getSafeStartWorkspace,
} from "@/lib/safestart/workspace-manifest";
import { createClient } from "@/lib/supabase/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ workspace: string }>;
}) {
  const { workspace } = await params;
  const entry = getSafeStartWorkspace(workspace);
  return {
    title: entry ? `${entry.name} · SafeStart` : "SafeStart",
  };
}

export default async function SafeStartWorkspacePage({
  params,
  searchParams,
}: {
  params: Promise<{ workspace: string }>;
  searchParams: Promise<{ org?: string }>;
}) {
  const { workspace } = await params;
  const sp = await searchParams;

  const entry = getSafeStartWorkspace(workspace);
  if (!entry) notFound();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) {
    redirect(`/login?next=/safestart/${workspace}`);
  }

  let fixture: ProgramFixtureBase | null = null;
  let sourceBadge: string | undefined;
  if (entry.templateId) {
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
  }

  const nextWorkspace = getNextSafeStartWorkspace(entry.slug);
  const orgQuery = sp.org ? `?org=${sp.org}` : "";

  return (
    <div className="-mx-[clamp(1.25rem,4vw,2.5rem)] -my-8 flex min-h-[calc(100dvh-4rem)] flex-col bg-safestart-bg text-safestart-ink selection:bg-pathway-accent/20">
      {/* Workspace header */}
      <header className="border-b border-safestart-hairline bg-safestart-bg">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 py-10 md:px-12 md:py-14">
          <Link
            href={`/safestart${orgQuery}`}
            className="self-start text-[11px] font-medium uppercase tracking-[0.1em] text-safestart-muted transition-colors hover:text-pathway-accent"
          >
            ← SafeStart
          </Link>
          <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-pathway-accent">
            Workspace {String(entry.order).padStart(2, "0")} — {entry.name}
          </p>
          <h1 className="font-serif text-[clamp(2.25rem,4.5vw,2.75rem)] italic leading-[1.05] tracking-tight text-safestart-ink">
            {entry.name}
          </h1>
          <p className="max-w-[680px] text-[15px] leading-relaxed text-safestart-muted">
            {entry.produces}
          </p>
        </div>
      </header>

      {/* Workspace body */}
      {fixture ? (
        <StitchDocumentView fixture={fixture} sourceBadge={sourceBadge} embedded />
      ) : (
        <ProgramEditorialFallbackBody
          variant="safestart_workspace"
          title={entry.name}
          description={entry.description}
          produces={entry.produces}
        />
      )}

      {/* What's next */}
      <footer className="mt-auto border-t border-safestart-hairline bg-safestart-bg">
        <div className="mx-auto flex w-full max-w-5xl items-baseline justify-between gap-4 px-6 py-8 md:px-12">
          <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-safestart-muted">
            What&rsquo;s next
          </p>
          {nextWorkspace ? (
            <Link
              href={`/safestart/${nextWorkspace.slug}${orgQuery}`}
              className="flex items-baseline gap-3 text-[14px] text-safestart-ink transition-colors hover:text-pathway-accent"
            >
              <span className="font-serif text-[18px] italic text-pathway-accent">
                {String(nextWorkspace.order).padStart(2, "0")}
              </span>
              <span>{nextWorkspace.name} →</span>
            </Link>
          ) : (
            <Link
              href={`/safestart/guidebook${orgQuery}`}
              className="text-[14px] text-safestart-ink transition-colors hover:text-pathway-accent"
            >
              Open the Guidebook →
            </Link>
          )}
        </div>
      </footer>
    </div>
  );
}
