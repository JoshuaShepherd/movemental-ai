import { EngagementTimeline } from "@/components/program/safe-start/engagement-timeline";
import { PrepChecklistPanel } from "@/components/program/safe-start/prep-checklist-panel";
import { SafeStartRosterGrid } from "@/components/program/safe-start/roster-grid";
import type { TimelineStage } from "@/lib/program/types/safe-start-hero";

type OutlineHeading = { level: number; text: string };

type OutlineSection = {
  id?: string;
  kind: "outline";
  headings: OutlineHeading[];
};

function OutlineBlock({ section }: { section: OutlineSection }) {
  return (
    <section className="border-[0.5px] border-solid border-border-soft bg-card p-6">
      <div className="flex flex-col gap-2 font-body text-sm text-foreground">
        {section.headings.map((h, i) => {
          const cls =
            h.level <= 1
              ? "font-serif text-lg font-medium leading-snug text-foreground"
              : h.level === 2
                ? "ml-0 border-l-2 border-pathway-accent pl-3 text-[15px] font-medium leading-snug text-foreground md:ml-1"
                : "ml-0 pl-3 text-sm leading-relaxed text-muted-foreground md:ml-4 md:pl-0";
          return (
            <div key={`${h.text}-${i}`} className={cls}>
              {h.text}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function DocumentSectionBlock({
  section,
}: {
  section: {
    eyebrow?: string;
    title?: string;
    body?: string[];
    cta?: { label: string; href: string };
  };
}) {
  return (
    <section className="rounded border border-safestart-hairline bg-safestart-surface-container/80 p-6">
      {section.eyebrow ? (
        <p className="font-body text-[10px] font-bold uppercase tracking-widest text-pathway-accent">
          {section.eyebrow}
        </p>
      ) : null}
      {section.title ? <h2 className="mt-2 font-headline text-2xl italic">{section.title}</h2> : null}
      <div className="mt-4 flex flex-col gap-3 font-body text-sm leading-relaxed text-safestart-ink">
        {(section.body ?? []).map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      {section.cta ? (
        <p className="mt-4">
          <a className="font-body text-sm font-semibold text-pathway-accent underline" href={section.cta.href}>
            {section.cta.label}
          </a>
        </p>
      ) : null}
    </section>
  );
}

function TableSectionBlock({
  section,
}: {
  section: {
    eyebrow?: string;
    title?: string;
    columns?: string[];
    rows?: Array<{ cells: string[] }>;
  };
}) {
  return (
    <section className="overflow-x-auto rounded border border-safestart-hairline bg-card p-4">
      {section.eyebrow ? (
        <p className="font-body text-[10px] font-bold uppercase tracking-widest text-pathway-accent">
          {section.eyebrow}
        </p>
      ) : null}
      {section.title ? <h2 className="mt-2 font-headline text-xl italic">{section.title}</h2> : null}
      <table className="mt-4 w-full border-collapse font-body text-sm">
        <thead>
          <tr className="border-b border-safestart-hairline text-left text-safestart-muted">
            {(section.columns ?? []).map((c) => (
              <th key={c} className="p-2 font-semibold">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(section.rows ?? []).map((row, ri) => (
            <tr key={ri} className="border-b border-safestart-hairline/60">
              {row.cells.map((cell, ci) => (
                <td key={ci} className="p-2 align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function CardLedgerBlock({
  section,
}: {
  section: {
    title?: string;
    cards?: Array<{
      title?: string;
      body?: string;
      meta?: string;
      category?: string;
      status?: string;
      reviewNote?: string;
    }>;
  };
}) {
  return (
    <section className="flex flex-col gap-4">
      {section.title ? <h2 className="font-headline text-xl italic">{section.title}</h2> : null}
      <div className="grid gap-4 md:grid-cols-2">
        {(section.cards ?? []).map((c, i) => (
          <div key={i} className="rounded border border-safestart-hairline bg-card p-4">
            {c.category ? (
              <p className="font-body text-[10px] font-bold uppercase tracking-widest text-safestart-muted">
                {c.category}
              </p>
            ) : null}
            {c.title ? <h3 className="mt-1 font-semibold">{c.title}</h3> : null}
            {c.status ? (
              <p className="mt-1 font-body text-xs font-semibold text-pathway-accent">{c.status}</p>
            ) : null}
            {c.body ? <p className="mt-2 font-body text-sm text-safestart-muted">{c.body}</p> : null}
            {c.reviewNote ? (
              <p className="mt-2 border-l-2 border-pathway-accent/40 pl-2 font-body text-xs italic text-safestart-muted">
                {c.reviewNote}
              </p>
            ) : null}
            {c.meta ? <p className="mt-2 font-body text-xs text-safestart-muted">{c.meta}</p> : null}
          </div>
        ))}
      </div>
    </section>
  );
}

function SplitListSectionBlock({
  section,
}: {
  section: {
    eyebrow?: string;
    title?: string;
    columns?: Array<{ title?: string; bullets?: string[]; draftField?: string }>;
  };
}) {
  return (
    <section className="rounded border border-safestart-hairline bg-card p-6">
      {section.eyebrow ? (
        <p className="font-body text-[10px] font-bold uppercase tracking-widest text-pathway-accent">
          {section.eyebrow}
        </p>
      ) : null}
      {section.title ? <h2 className="mt-2 font-headline text-2xl italic">{section.title}</h2> : null}
      <div className="mt-6 grid gap-8 md:grid-cols-2">
        {(section.columns ?? []).map((col, i) => (
          <div key={i}>
            {col.title ? <h3 className="font-body text-sm font-semibold text-safestart-ink">{col.title}</h3> : null}
            <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 font-body text-sm text-safestart-muted">
              {(col.bullets ?? []).map((b, j) => (
                <li key={j}>{b}</li>
              ))}
            </ul>
            {col.draftField ? (
              <p className="mt-3 font-mono text-[10px] text-safestart-muted/80">Field: {col.draftField}</p>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

function TimelineSectionBlock({
  section,
}: {
  section: {
    title?: string;
    stages?: TimelineStage[];
    milestones?: Array<{ label: string; state: TimelineStage["state"] }>;
  };
}) {
  let stages: TimelineStage[] = section.stages ?? [];
  if (!stages.length && section.milestones?.length) {
    stages = section.milestones.map((m, i) => ({
      stageLabel: `Step ${i + 1}`,
      title: m.label,
      state: m.state,
    }));
  }
  if (!stages.length) return null;
  return (
    <section className="flex flex-col gap-4">
      {section.title ? (
        <h2 className="font-body text-xs font-bold uppercase tracking-widest text-safestart-muted">
          {section.title}
        </h2>
      ) : null}
      <EngagementTimeline stages={stages} />
    </section>
  );
}

function RosterColumnsSectionBlock({
  section,
}: {
  section: {
    title?: string;
    columns?: Array<{ title: string; items: Array<{ name: string; subtitle?: string }> }>;
    items?: Array<{ name: string; subtitle?: string }>;
  };
}) {
  const columns =
    section.columns?.length ? section.columns : [{ title: section.title ?? "Cohort", items: section.items ?? [] }];
  if (!columns.some((c) => c.items?.length)) return null;
  return (
    <section className="flex flex-col gap-4">
      <SafeStartRosterGrid columns={columns} />
    </section>
  );
}

function GenericSection({ section }: { section: Record<string, unknown> }) {
  return (
    <section className="rounded border border-dashed border-safestart-hairline bg-card/40 p-4">
      <p className="font-mono text-xs text-safestart-muted">Section kind: {String(section.kind)}</p>
    </section>
  );
}

export function ProgramSectionRenderer({ sections }: { sections: unknown[] }) {
  return (
    <div className="flex flex-col gap-10">
      {sections.map((raw, i) => {
        if (!raw || typeof raw !== "object" || !("kind" in raw)) return null;
        const section = raw as Record<string, unknown>;
        const kind = section.kind as string;
        const key = (section.id as string) ?? `sec-${i}`;

        if (kind === "outline") {
          return <OutlineBlock key={key} section={section as unknown as OutlineSection} />;
        }
        if (kind === "documentSection") {
          return <DocumentSectionBlock key={key} section={section as never} />;
        }
        if (kind === "tableSection") {
          return <TableSectionBlock key={key} section={section as never} />;
        }
        if (kind === "splitListSection") {
          return <SplitListSectionBlock key={key} section={section as never} />;
        }
        if (kind === "cardLedger") {
          return <CardLedgerBlock key={key} section={section as never} />;
        }
        if (kind === "timeline") {
          return <TimelineSectionBlock key={key} section={section as never} />;
        }
        if (kind === "rosterColumns") {
          return <RosterColumnsSectionBlock key={key} section={section as never} />;
        }
        if (kind === "prepChecklist") {
          const p = section as unknown as {
            eyebrow?: string;
            title?: string;
            intro?: string;
            bullets?: string[];
          };
          return (
            <PrepChecklistPanel
              key={key}
              eyebrow={p.eyebrow}
              title={p.title ?? ""}
              intro={p.intro ?? ""}
              bullets={p.bullets ?? []}
            />
          );
        }
        return <GenericSection key={key} section={section} />;
      })}
    </div>
  );
}
