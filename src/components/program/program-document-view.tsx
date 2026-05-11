import type { ProgramFixtureBase } from "@/lib/program/types/stitch-screen-family";

import { ProgramPageHeader } from "./layout/program-page-header";
import { ProgramSectionRenderer } from "./layout/program-section-renderer";
import { ProgramShell } from "./layout/program-shell";
import { ProgramSidebarRouter } from "./layout/program-sidebar-nav";

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
        <p className="font-body text-xs text-safestart-muted">
          {breadcrumb.join(" · ")}
        </p>
      ) : null}
      {subtitle ? <h2 className="font-headline text-2xl italic text-pathway-accent">{subtitle}</h2> : null}
      {metadataStrip ? (
        <p className="rounded border border-safestart-hairline bg-safestart-surface-container px-3 py-2 font-body text-xs text-safestart-muted">
          {metadataStrip}
        </p>
      ) : null}
      {intro ? <p className="max-w-3xl font-body text-sm leading-relaxed text-safestart-ink">{intro}</p> : null}
    </div>
  );
}

function ShellTopLinks({ fixture }: { fixture: ProgramFixtureBase }) {
  const topLinks = (fixture.shell as Record<string, unknown>).topLinks as
    | Array<{ label: string; href: string }>
    | undefined;
  if (!topLinks?.length) return null;
  return (
    <nav className="flex flex-wrap gap-4 border-b border-safestart-hairline bg-safestart-surface-container px-8 py-3 font-body text-xs font-semibold uppercase tracking-widest text-safestart-muted md:px-12">
      {topLinks.map((l) => (
        <a key={l.label} className="hover:text-pathway-accent" href={l.href}>
          {l.label}
        </a>
      ))}
    </nav>
  );
}

export function ProgramDocumentView({
  fixture,
  sourceBadge,
}: {
  fixture: ProgramFixtureBase;
  sourceBadge?: string;
}) {
  const sections = (fixture.sections ?? []) as unknown[];
  const editorial = fixture.editorialThread;
  const headline =
    (fixture.page.headline && String(fixture.page.headline).trim()) ||
    (fixture.documentTitle && fixture.documentTitle.replace(/\s*-\s*Movemental\s*$/i, "").trim()) ||
    "Program template";
  const pageForHeader = { ...fixture.page, headline };

  return (
    <ProgramShell shell={fixture.shell} sourceBadge={sourceBadge}>
      <ShellTopLinks fixture={fixture} />
      <div className="flex min-h-0 flex-1">
        <ProgramSidebarRouter fixture={fixture} />
        <main className="mx-auto flex w-full max-w-5xl flex-grow flex-col gap-10 px-6 py-12 md:px-12">
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
    </ProgramShell>
  );
}
