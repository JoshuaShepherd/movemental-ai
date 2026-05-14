import type { ProgramFixtureBase } from "@/lib/program/types/stitch-screen-family";

import { ProgramPageHeader } from "@/components/program/layout/program-page-header";
import { ProgramSectionRenderer } from "@/components/program/layout/program-section-renderer";
import { ProgramSidebarRouter } from "@/components/program/layout/program-sidebar-nav";

/**
 * Renderer for any Stitch-derived JSON fixture. Renamed from ProgramDocumentView
 * in Phase 02 because the same renderer is used by /program, /sandboxlive,
 * /safestart, and other product shells — "program" was misleading.
 *
 * Body content only: sidebar router and main
 * column on a warm-cream surface. Outer AuthenticatedShell provides chrome.
 */

function RichPageIntro({ fixture }: { fixture: ProgramFixtureBase }) {
  const page = fixture.page as Record<string, unknown>;
  const breadcrumb = page.breadcrumb as string[] | undefined;
  const subtitle = page.subtitle as string | undefined;
  const metadataStrip = page.metadataStrip as string | undefined;
  const intro = page.intro as string | undefined;

  if (!breadcrumb?.length && !subtitle && !metadataStrip && !intro) return null;

  return (
    <div className="flex flex-col gap-4">
      {breadcrumb?.length ? (
        <p className="font-body text-xs text-muted-foreground">{breadcrumb.join(" · ")}</p>
      ) : null}
      {subtitle ? <h2 className="font-headline text-2xl italic text-pathway-accent">{subtitle}</h2> : null}
      {metadataStrip ? (
        <p className="border-[0.5px] border-solid border-border-soft bg-muted/40 px-3 py-2 font-body text-xs text-muted-foreground">
          {metadataStrip}
        </p>
      ) : null}
      {intro ? (
        <p className="max-w-3xl font-body text-sm leading-relaxed text-muted-foreground">{intro}</p>
      ) : null}
    </div>
  );
}

export function StitchDocumentView({
  fixture,
  sourceBadge,
  embedded = false,
}: {
  fixture: ProgramFixtureBase;
  sourceBadge?: string;
  /**
   * When true, the view assumes the caller is already providing a full-bleed
   * surface (background + escape from the dashboard inner container) and
   * renders body content only. Defaults to false so the legacy /program
   * routes keep their full-width chrome.
   */
  embedded?: boolean;
}) {
  const sections = (fixture.sections ?? []) as unknown[];
  const editorial = fixture.editorialThread;
  const headline =
    (fixture.page.headline && String(fixture.page.headline).trim()) ||
    (fixture.documentTitle && fixture.documentTitle.replace(/\s*-\s*Movemental\s*$/i, "").trim()) ||
    "Program template";
  const pageForHeader = { ...fixture.page, headline };

  const body = (
    <>
      <div className={embedded ? "flex min-h-0 flex-1 bg-section" : "flex min-h-0 flex-1"}>
        <ProgramSidebarRouter fixture={fixture} />
        <main
          className={
            embedded
              ? "mx-auto flex w-full max-w-5xl grow flex-col gap-10 bg-card px-6 py-12 md:px-12"
              : "mx-auto flex w-full max-w-5xl grow flex-col gap-10 px-6 py-12 md:px-12"
          }
        >
          {sourceBadge ? (
            <p className="self-start border-[0.5px] border-solid border-border-soft bg-muted/45 px-2 py-1 font-body text-[10px] uppercase tracking-widest text-muted-foreground">
              {sourceBadge}
            </p>
          ) : null}
          {editorial?.variant ? (
            <p className="font-body text-[10px] font-bold uppercase tracking-widest text-pathway-accent">
              Editorial · {editorial.variant}
            </p>
          ) : null}
          <ProgramPageHeader page={pageForHeader} />
          <RichPageIntro fixture={fixture} />
          {sections.length === 0 ? (
            <section
              className="rounded border border-safestart-hairline bg-safestart-surface-container/80 p-6 font-body text-sm text-safestart-muted"
              aria-live="polite"
            >
              <p className="font-medium text-safestart-ink">No sections in this template fixture yet.</p>
              <p className="mt-2 leading-relaxed">
                The route is valid, but <code className="rounded bg-white/80 px-1 text-xs">{fixture.templateId}</code>{" "}
                has no <code className="rounded bg-white/80 px-1 text-xs">sections</code> array. Add fixture content
                under <code className="rounded bg-white/80 px-1 text-xs">src/lib/program/fixtures/</code> or report a
                migration gap to Movemental.
              </p>
            </section>
          ) : (
            <ProgramSectionRenderer sections={sections} />
          )}
        </main>
      </div>
    </>
  );

  if (embedded) {
    return body;
  }

  return (
    <div className="-mx-[clamp(1.25rem,4vw,2.5rem)] -my-8 flex min-h-[calc(100dvh-4rem)] flex-col bg-safestart-bg text-safestart-ink selection:bg-pathway-accent/20">
      {body}
    </div>
  );
}
