import Link from "next/link";
import { redirect } from "next/navigation";

import { EditorialEmptyState } from "@/components/authenticated/editorial-empty-state";
import { PrintButton } from "@/components/sandboxlive/print-button";
import {
  FUTURE_PLAN_SECTIONS,
  type FuturePlanContent,
  type FuturePlanSectionSlug,
} from "@/lib/sandboxlive/future-plan.catalog";
import { loadFuturePlanState, type FuturePlanState } from "@/lib/sandboxlive/future-plan.server";
import { resolveActiveOrganizationId } from "@/lib/services/onboarding/onboarding.service";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Future Plan — Board export · SandboxLive",
};

export default async function FuturePlanExportPage({
  searchParams,
}: {
  searchParams: Promise<{ org?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) {
    redirect("/login?next=/sandboxlive/phase/08-future-plan/export");
  }

  const sp = await searchParams;
  const resolved = await resolveActiveOrganizationId(user.id, sp.org);
  if (!resolved.success) {
    redirect("/dashboard");
  }

  const state = await loadFuturePlanState(resolved.data.organizationId);
  const orgQuery = sp.org ? `?org=${sp.org}` : "";
  const now = new Date();
  const exportDate = now.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const ratifiedDate = state.latestRatification?.ratifiedAt
    ? new Date(state.latestRatification.ratifiedAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const sections = [...FUTURE_PLAN_SECTIONS].sort((a, b) => a.order - b.order);

  return (
    <div className="-mx-[clamp(1.25rem,4vw,2.5rem)] -my-8 flex min-h-[calc(100dvh-4rem)] flex-col bg-background text-foreground print:m-0 print:bg-white">
      {/* Screen-only action bar */}
      <div className="flex items-center justify-between gap-4 border-b border-border-soft bg-section px-8 py-4 print:hidden">
        <Link
          href={`/sandboxlive/phase/08-future-plan${orgQuery}`}
          className="text-[12px] font-medium uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:text-pathway-accent"
        >
          ← Back to editor
        </Link>
        <PrintButton label="Print to PDF" />
      </div>

      {/* Cover page */}
      <section
        className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-6 px-8 pt-32 pb-24 text-center print:max-w-none print:break-after-page print:px-0 print:pt-16 print:pb-16"
        aria-label="Cover"
      >
        <p
          className="font-serif text-[24px] italic leading-tight text-foreground"
          aria-label="Movemental"
        >
          movemental
        </p>
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          SandboxLive · Phase 08 · Future Plan
        </p>
        <h1 className="font-serif text-[clamp(3rem,7vw,5rem)] italic leading-[1.02] tracking-tight text-foreground">
          Future Plan
        </h1>
        <p className="font-serif text-[clamp(1.4rem,3vw,1.75rem)] italic leading-snug text-muted-foreground">
          {state.organizationName}
        </p>
        <p className="text-[12px] uppercase tracking-[0.1em] text-muted-foreground">SandboxLive cohort</p>
        <div className="mt-8 flex flex-wrap items-baseline justify-center gap-x-8 gap-y-3 border-t border-border-soft pt-6 text-[12px] text-muted-foreground">
          <Meta label="Export date">{exportDate}</Meta>
          {ratifiedDate ? <Meta label="Ratified">{ratifiedDate}</Meta> : null}
          <Meta label="Edition">v{state.currentVersion}</Meta>
          <Meta label="Status">
            <span className="capitalize">{state.status.replace(/_/g, " ")}</span>
          </Meta>
        </div>
        <p className="mt-12 max-w-[520px] font-serif text-[16px] italic leading-relaxed text-muted-foreground">
          The cumulative deliverable of the SandboxLive engagement. Suitable for board distribution.
        </p>
      </section>

      <article
        className="mx-auto w-full max-w-3xl px-8 pb-32 print:max-w-none print:px-0 print:pb-0"
        aria-label="Future Plan sections"
      >
        {sections.map((section) => (
          <section
            key={section.slug}
            className="border-t border-border-soft py-16 first:border-t-0 first:pt-0 print:break-before-page print:py-12 print:first:break-before-auto print:first:pt-0"
          >
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.15em] text-pathway-accent">
              {section.eyebrow}
            </p>
            <h2 className="mb-4 font-serif text-[clamp(2rem,4vw,2.75rem)] italic leading-[1.1] tracking-tight text-foreground">
              {section.heading}
            </h2>
            <p className="mb-10 max-w-[620px] font-serif text-[18px] italic leading-relaxed text-muted-foreground">
              {section.prompt}
            </p>
            {renderMarkdownBody(contentBody(state.content, section.slug))}
          </section>
        ))}

        <section className="border-t border-border-soft py-16 print:break-before-page print:py-12">
          <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.15em] text-pathway-accent">
            Ratification
          </p>
          <h2 className="mb-4 font-serif text-[clamp(2rem,4vw,2.75rem)] italic leading-[1.1] tracking-tight text-foreground">
            Board approval.
          </h2>
          <RatificationBlock ratification={state.latestRatification} />
        </section>
      </article>

      <footer className="mx-auto w-full max-w-3xl border-t border-border-soft px-8 py-12 text-center print:max-w-none print:px-0 print:py-8">
        <p className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
          {state.organizationName} · SandboxLive · Future Plan · v{state.currentVersion} · {exportDate}
        </p>
      </footer>
    </div>
  );
}

function contentBody(content: FuturePlanContent, slug: FuturePlanSectionSlug): string {
  return content[slug]?.body_md ?? "";
}

function Meta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.1em]">{label}</p>
      <p className="text-foreground">{children}</p>
    </div>
  );
}

function renderMarkdownBody(body: string): React.ReactNode {
  const paragraphs = body
    .split(/\n{2,}/)
    .map((p: string) => p.trim())
    .filter(Boolean);
  if (paragraphs.length === 0) return <ExportDraftGap />;
  return (
    <div className="font-serif italic text-[18px] leading-[1.8] text-foreground">
      {paragraphs.map((p: string, i: number) => (
        <p key={i} className="mb-4 whitespace-pre-line">
          {p}
        </p>
      ))}
    </div>
  );
}

function RatificationBlock({
  ratification,
}: {
  ratification: FuturePlanState["latestRatification"];
}) {
  if (!ratification) {
    return (
      <div className="border-[0.5px] border-border-soft bg-section p-8">
        <p className="font-serif text-[18px] italic leading-relaxed text-muted-foreground">
          No ratification record yet. When the board records approval in Movemental, the ratified date and notes will
          appear here.
        </p>
      </div>
    );
  }

  const ratifiedLabel = new Date(ratification.ratifiedAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="border-[0.5px] border-border-soft bg-section p-8">
      <dl className="grid gap-4 text-[14px] text-muted-foreground sm:grid-cols-2">
        <div>
          <dt className="text-[10px] font-medium uppercase tracking-[0.1em]">Ratified</dt>
          <dd className="mt-0.5 text-foreground">{ratifiedLabel}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-medium uppercase tracking-[0.1em]">Version</dt>
          <dd className="mt-0.5 font-mono text-[13px] text-foreground">{ratification.versionId}</dd>
        </div>
        {ratification.notes ? (
          <div className="sm:col-span-2">
            <dt className="text-[10px] font-medium uppercase tracking-[0.1em]">Notes</dt>
            <dd className="mt-0.5 whitespace-pre-line text-foreground">{ratification.notes}</dd>
          </div>
        ) : null}
      </dl>
    </div>
  );
}

function ExportDraftGap() {
  return (
    <EditorialEmptyState
      eyebrow="Still in draft"
      title="This portion does not have finished copy yet."
      tone="default"
      className="max-w-2xl border border-[0.5px] border-border-soft bg-section px-5 py-6 print:border-none print:bg-transparent"
    >
      <p>
        Return to the Future Plan editor, place language in this block, then export again when the packet should read as
        complete for your board.
      </p>
    </EditorialEmptyState>
  );
}
