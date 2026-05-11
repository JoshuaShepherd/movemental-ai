import Link from "next/link";
import { redirect } from "next/navigation";

import { PrintButton } from "@/components/sandboxlive/print-button";
import {
  FUTURE_PLAN_SECTIONS,
  loadFuturePlanState,
} from "@/lib/sandboxlive/future-plan.server";
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
        className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-8 px-8 pt-32 pb-24 text-center print:max-w-none print:break-after-page print:px-0 print:pt-16 print:pb-16"
        aria-label="Cover"
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[color:var(--destructive)]">
          Phase 08 — Future Plan · Export
        </p>
        <h1 className="font-serif text-[clamp(2.75rem,7vw,4.75rem)] italic leading-[1.02] tracking-tight text-foreground">
          Future Plan
        </h1>
        <p className="font-serif text-[clamp(1.4rem,3vw,1.75rem)] italic leading-snug text-muted-foreground">
          {state.organizationName}
        </p>
        <div className="mt-12 flex flex-wrap items-baseline justify-center gap-x-8 gap-y-3 border-t border-border-soft pt-8 text-[12px] text-muted-foreground">
          <div>
            <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.1em]">
              Edition
            </p>
            <p className="text-foreground">Version {state.currentVersion}</p>
          </div>
          <div>
            <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.1em]">
              Status
            </p>
            <p className="text-foreground capitalize">{state.status.replace(/_/g, " ")}</p>
          </div>
          <div>
            <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.1em]">
              Exported
            </p>
            <p className="text-foreground">{exportDate}</p>
          </div>
        </div>
        <p className="mt-12 max-w-[520px] font-serif text-[16px] italic leading-relaxed text-muted-foreground">
          The cumulative deliverable of the SandboxLive engagement.
          Six sections. Suitable for board distribution.
        </p>
      </section>

      {/* Section pages */}
      <article
        className="mx-auto w-full max-w-3xl px-8 pb-32 print:max-w-none print:px-0 print:pb-0"
        aria-label="Future Plan sections"
      >
        {FUTURE_PLAN_SECTIONS.map((section) => {
          const body = state.content[section.slug]?.body_md ?? "";
          const paragraphs = body.split(/\n{2,}/).filter(Boolean);
          return (
            <section
              key={section.slug}
              className="border-t border-border-soft py-16 first:border-t-0 first:pt-0 print:break-before-page print:py-12 print:first:break-before-auto print:first:pt-0"
            >
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.15em] text-[color:var(--destructive)]">
                {section.eyebrow}
              </p>
              <h2 className="mb-4 font-serif text-[clamp(2rem,4vw,2.75rem)] italic leading-[1.1] tracking-tight text-foreground">
                {section.heading}
              </h2>
              <p className="mb-10 max-w-[620px] font-serif text-[18px] italic leading-relaxed text-muted-foreground">
                {section.prompt}
              </p>

              {paragraphs.length > 0 ? (
                <div className="field-guide-prose">
                  {paragraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              ) : (
                <p className="border border-dashed border-border-soft bg-section p-6 text-[14px] italic text-muted-foreground print:bg-transparent">
                  This section has not been drafted yet. Open the editor and
                  write the {section.name.toLowerCase()} section before exporting
                  for the board.
                </p>
              )}
            </section>
          );
        })}
      </article>

      {/* Closing band — screen + print */}
      <footer className="mx-auto w-full max-w-3xl border-t border-border-soft px-8 py-12 text-center print:max-w-none print:px-0 print:py-8">
        <p className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
          {state.organizationName} · Future Plan · v{state.currentVersion} · {exportDate}
        </p>
      </footer>
    </div>
  );
}
