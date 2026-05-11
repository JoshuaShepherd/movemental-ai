import type { ProgramFixturePage } from "@/lib/program/types/stitch-screen-family";

export function ProgramPageHeader({ page }: { page: ProgramFixturePage }) {
  return (
    <section className="flex flex-col gap-4">
      {page.phaseLabel ? (
        <span className="font-body text-[11px] font-bold uppercase tracking-[0.08em] text-safestart-muted">
          {page.phaseLabel}
        </span>
      ) : null}
      {page.eyebrow ? (
        <span className="font-body text-[11px] font-bold uppercase tracking-[0.08em] text-pathway-accent">
          {page.eyebrow}
        </span>
      ) : null}
      {page.statusChip ? (
        <span className="w-fit rounded border border-safestart-hairline bg-safestart-surface-container px-2 py-1 font-body text-[10px] font-semibold uppercase tracking-widest text-safestart-muted">
          {page.statusChip}
        </span>
      ) : null}
      <h1 className="font-headline text-4xl italic leading-tight tracking-tight md:text-[44px]">
        {page.headline ?? ""}
      </h1>
      {page.supportingCopy ? (
        <p className="max-w-[800px] font-body text-base leading-relaxed">{page.supportingCopy}</p>
      ) : null}
    </section>
  );
}
