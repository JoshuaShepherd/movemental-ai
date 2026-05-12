/**
 * Full-quality editorial workspace body when no Stitch HTML fixture is
 * available (missing file, or phase authored in React only). Matches the
 * SafeStart / SandboxLive paper register: hairline rules, serif display
 * rhythm, pathway accent meta.
 */

export type ProgramEditorialFallbackVariant =
  | "safestart_workspace"
  | "safestart_ratification"
  | "sandboxlive_phase";

const VARIANT_EYEBROW: Record<ProgramEditorialFallbackVariant, string> = {
  safestart_workspace: "SafeStart · Workspace",
  safestart_ratification: "SafeStart · Board ratification",
  sandboxlive_phase: "SandboxLive · Phase workspace",
};

export function ProgramEditorialFallbackBody({
  variant,
  title,
  description,
  produces,
}: {
  variant: ProgramEditorialFallbackVariant;
  title: string;
  description: string;
  produces: string;
}) {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-0 px-6 py-12 md:px-12">
      <div className="border-t border-safestart-hairline pt-10">
        <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-pathway-accent">
          {VARIANT_EYEBROW[variant]}
        </p>
        <h2 className="mt-3 font-serif text-[clamp(1.5rem,3vw,1.875rem)] italic leading-tight text-safestart-ink">
          What this surface holds
        </h2>
        <p className="mt-4 max-w-[680px] text-[15px] leading-relaxed text-safestart-muted">
          {description}
        </p>
      </div>

      <div className="my-10 border-t border-safestart-hairline" aria-hidden />

      <section className="flex flex-col gap-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-pathway-accent">
          Deliverable · {title}
        </p>
        <p className="max-w-[680px] border-l-2 border-pathway-accent pl-5 font-serif text-[18px] italic leading-relaxed text-safestart-ink">
          {produces}
        </p>
        <p className="max-w-[680px] text-[14px] leading-relaxed text-safestart-muted">
          Use the navigation above to move through the sequence. When a designed
          workspace is available, it appears here in full fidelity; until then,
          this editorial frame keeps the cohort oriented to the work product
          each step exists to produce.
        </p>
      </section>

      <div className="my-10 border-t border-safestart-hairline" aria-hidden />

      <section className="flex flex-col gap-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-safestart-muted">
          Operating note
        </p>
        <p className="max-w-[680px] text-[14px] leading-relaxed text-safestart-muted">
          Movemental captures engagement state in your organization record so
          dashboards, sponsors, and your team stay aligned on what is in flight
          and what is complete.
        </p>
      </section>
    </div>
  );
}
