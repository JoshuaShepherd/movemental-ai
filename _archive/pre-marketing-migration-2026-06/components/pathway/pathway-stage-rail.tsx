import Link from "next/link";

import { cn } from "@/lib/utils";

type StageDef = {
  index: 1 | 2 | 3 | 4;
  href: string;
  title: string;
};

const STAGES: StageDef[] = [
  { index: 1, href: "/pathway/safety", title: "Stage 01 — Safety" },
  { index: 2, href: "/pathway/sandbox", title: "Stage 02 — Sandbox" },
  { index: 3, href: "/pathway/skills", title: "Stage 03 — Skills" },
  { index: 4, href: "/pathway/solutions", title: "Stage 04 — Solutions" },
];

export type PathwayStageRailVariant = "safety" | "sandbox" | "skills" | "solutions";

const VARIANT_ACTIVE: Record<PathwayStageRailVariant, 1 | 2 | 3 | 4> = {
  safety: 1,
  sandbox: 2,
  skills: 3,
  solutions: 4,
};

/** Per-page sublabels — aligned with `docs/html/safety-revised.html` / `sandbox-revised.html` where applicable. */
const STAGE_SUB: Record<PathwayStageRailVariant, Record<1 | 2 | 3 | 4, string>> = {
  safety: {
    1: "Governance · Commitments · Boundaries",
    2: "Bounded experimentation",
    3: "Capability across the team",
    4: "Durable deployments",
  },
  sandbox: {
    1: "Governance · Commitments · Boundaries",
    2: "Safe exploration · Tested use cases · Real organizational work",
    3: "Capability across the team",
    4: "Durable deployments",
  },
  skills: {
    1: "Governance · Commitments · Boundaries",
    2: "Safe exploration · Tested use cases · Real organizational work",
    3: "Discernment · Authorship · Stewardship",
    4: "Durable deployments",
  },
  solutions: {
    1: "Governance · Commitments · Boundaries",
    2: "Safe exploration · Tested use cases · Real organizational work",
    3: "Discernment · Authorship · Stewardship",
    4: "AI integrated into your work · Owned by your team · Governed by your policy",
  },
};

/**
 * Four-stage spine from pathway editorial templates (Safety / Sandbox revised → Skills / Solutions).
 */
export function PathwayStageRail({ variant }: { variant: PathwayStageRailVariant }) {
  const activeIndex = VARIANT_ACTIVE[variant];

  return (
    <section
      className="border-b border-border/60 bg-background px-6 pb-8 pt-10 sm:px-8 lg:px-12"
      aria-label={`Movemental Path — stage ${activeIndex} of 4`}
    >
      <div className="mx-auto w-full max-w-[var(--container-max)]">
        <p className="mb-6 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
          The Movemental Path
        </p>
        <ol className="grid grid-cols-2 gap-x-2 gap-y-6 border-b border-border/55 pb-6 md:grid-cols-4">
          {STAGES.map((s) => {
            const isActive = activeIndex === s.index;
            const isCompleted = s.index < activeIndex;
            const isUpcoming = s.index > activeIndex;

            const eyebrow = isActive ? "Active" : isCompleted ? "Completed" : "Upcoming";

            const opacityClass = isCompleted ? "opacity-70" : isUpcoming ? "opacity-50 md:opacity-[0.45]" : "";

            const titleInner = <span className="font-serif-display italic">{s.title}</span>;

            return (
              <li
                key={s.index}
                className={cn(
                  "flex flex-col border-l py-1 pl-4",
                  isActive && "border-l-2 border-pathway-accent opacity-100",
                  !isActive && "border-border/60",
                  opacityClass,
                )}
              >
                <span
                  className={cn(
                    "text-[0.6rem] font-bold uppercase tracking-eyebrow",
                    isActive ? "text-pathway-accent" : "text-muted-foreground",
                  )}
                >
                  {eyebrow}
                </span>
                {isActive ? (
                  <span className="mt-1 text-xl tracking-tight text-foreground md:text-2xl">{titleInner}</span>
                ) : (
                  <Link
                    href={s.href}
                    className="mt-1 text-xl tracking-tight text-foreground outline-none ring-pathway-accent transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background md:text-2xl"
                  >
                    {titleInner}
                  </Link>
                )}
                <span className="mt-1 text-[0.7rem] text-muted-foreground">{STAGE_SUB[variant][s.index]}</span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
