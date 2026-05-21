import Link from "next/link";

import { Cite } from "@/components/citations";

/**
 * Home (`/home-new`) — "The Movemental Path" fold.
 *
 * Sibling of `src/components/sections-mock/home/path-fold.tsx`. Identical to
 * the original in every respect EXCEPT the Stage 01 (Safety) CTA hrefs, which
 * point at `/pathway/safety` instead of `/pathway/safety` so the new
 * canonical Safety stage page receives traffic from the new home page. All
 * other stages (Sandbox / Skills / Solutions), all copy, all layout, and all
 * subcomponents stay verbatim — this file exists purely to honour the
 * non-destructive rebuild constraint.
 *
 * See `docs/_new/safety-new-changelog.md` for the rebuild log.
 */
export function PathFoldNew() {
  return (
    <section
      id="pathway"
      aria-labelledby="path-heading"
      className="bg-background px-6 py-20 md:px-10 md:py-28 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-(--container-max)">
        {/* Header row — eyebrow column + display column */}
        <div className="mb-16 grid grid-cols-1 gap-10 md:gap-16 lg:grid-cols-12 lg:mb-20">
          <div className="lg:col-span-3">
            <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
              The Movemental Path
            </p>
          </div>
          <div className="lg:col-span-8">
            <h2
              id="path-heading"
              className="font-serif italic font-normal leading-[1.05] tracking-[-0.02em] text-foreground text-[clamp(2.25rem,5vw,3.75rem)]"
            >
              A clear path for leading your organization through AI.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Most organizations jump to deployment without deciding what they
              value, or freeze and let staff decide individually
              <Cite claimId="high-performer-cohort-5-7" />. The path is the
              order — Safety first, then Sandbox, Skills, Solutions
              <Cite claimId="mckinsey-workflow-redesign" />.
            </p>
          </div>
        </div>

        {/* Path grid — Stage 01 boxed feature + Stages 02–04 parallel columns */}
        <div className="mb-16 grid grid-cols-1 lg:grid-cols-12 lg:mb-20">
          {/* Stage 01 — Safety (boxed feature) */}
          <div className="flex flex-col border border-border p-8 md:p-10 lg:col-span-4">
            <div
              aria-hidden
              className="mb-8 font-serif italic font-normal leading-none text-foreground text-[clamp(4.5rem,12vw,7.5rem)]"
            >
              01
            </div>
            <h3 className="mb-4 text-3xl font-medium leading-tight tracking-tight text-foreground md:text-4xl">
              Safety
            </h3>
            <p className="mb-8 font-serif text-[13px] italic text-muted-foreground">
              $1,000 · two weeks · ratifiable Guidebook.
            </p>
            <p className="mb-12 text-lg leading-relaxed text-foreground">
              Decide in writing what AI may and may not do in your organization,
              before anyone else decides for you.
            </p>
            <div className="mt-auto">
              <Link
                href="/pathway/safety"
                className="mb-6 inline-block w-full bg-foreground px-8 py-4 text-center text-sm font-medium uppercase tracking-eyebrow text-background transition-colors duration-200 hover:bg-primary-dim"
              >
                Begin with Safety
              </Link>
              <Link
                href="/pathway/safety"
                className="text-sm text-foreground hover:underline"
              >
                Read more &rarr;
              </Link>
            </div>
          </div>

          {/* Stages 02–04 — parallel columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:col-span-8">
            <SatelliteStage
              number="02"
              title="Sandbox"
              meta="$15,000 · four weeks · disciplined exploration"
              body="Disciplined exploration of valuable AI use cases without the risks of publication."
              href="/pathway/sandbox"
              borderRight
            />
            <SatelliteStage
              number="03"
              title="Skills"
              meta="$15,000 · eight weeks · cohort formation"
              body="Formation that produces leaders who understand AI, not just users who operate it."
              href="/pathway/skills"
              borderRight
            />
            <SatelliteStage
              number="04"
              title="Solutions"
              meta="From $30,000 · scoped deployment"
              body="AI integrated into how the organization actually runs, owned by formed people, governed by working policy."
              href="/pathway/solutions"
            />
          </div>
        </div>

        {/* Stage 01 expanded detail — governance deliverables + readiness signals */}
        <div className="mb-16 border border-border bg-section/50 p-8 md:mb-20 md:p-10">
          <p className="max-w-3xl font-serif text-lg italic leading-relaxed text-foreground md:text-xl">
            Two weeks of facilitated work that produces a board-ratifiable AI
            Organizational Guidebook in five layers your leadership can sign and
            your team can follow.
          </p>
          <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
            <div>
              <p className="mb-4 text-[11px] font-medium uppercase tracking-eyebrow text-muted-foreground">
                What this stage produces
              </p>
              <ul className="m-0 space-y-3 p-0 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                <li className="pl-0">
                  Acceptable Use Policy and Named Refusals
                </li>
                <li className="pl-0">
                  Vendor &amp; Tool Inventory and Data Classification
                </li>
                <li className="pl-0">
                  Data Handling, Disclosure, and Care Boundaries
                </li>
                <li className="pl-0">Incident Response Plan</li>
              </ul>
            </div>
            <div>
              <p className="mb-4 text-[11px] font-medium uppercase tracking-eyebrow text-muted-foreground">
                How you know it&apos;s in place
              </p>
              <ul className="m-0 space-y-3 p-0 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                <li className="pl-0">Board has ratified your AI position</li>
                <li className="pl-0">
                  Staff know what is permitted and what is not
                </li>
                <li className="pl-0">No unmanaged AI use</li>
                <li className="pl-0">
                  You can answer the question &quot;what is our AI policy?&quot;
                  in one paragraph
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-4 text-[11px] font-medium uppercase tracking-eyebrow text-muted-foreground">
                If this stage is skipped
              </p>
              <ul className="m-0 space-y-3 p-0 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                <li className="pl-0">
                  Staff create habits before standards exist
                </li>
                <li className="pl-0">Risk surfaces after damage is done</li>
                <li className="pl-0">
                  Leadership becomes reactive instead of proactive
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom doctrine — sequential-by-design line + full path link */}
        <div className="text-center">
          <p className="mx-auto mb-6 max-w-2xl font-serif italic text-foreground text-xl md:text-[1.375rem] leading-snug">
            Most organizations begin with Safety. The path is sequential because
            the work is sequential.
          </p>
          <Link
            href="/pathway"
            className="inline-block border-b border-foreground pb-1 text-sm font-medium uppercase tracking-eyebrow text-foreground transition-colors duration-200 hover:border-muted-foreground hover:text-muted-foreground"
          >
            See the full path &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

interface SatelliteStageProps {
  number: string;
  title: string;
  meta: string;
  body: string;
  href: string;
  borderRight?: boolean;
}

/**
 * Smaller "satellite" path stage (02–04). The Stitch reference puts a
 * hairline rule under the numeral and a right-side divider between columns
 * (which becomes a bottom-side divider when columns stack on mobile). The
 * body description is hidden on mobile to keep the stack scannable.
 */
function SatelliteStage({
  number,
  title,
  meta,
  body,
  href,
  borderRight,
}: SatelliteStageProps) {
  return (
    <div
      className={[
        "flex flex-col border-b border-border p-8 md:border-b-0 md:p-10",
        borderRight ? "md:border-r md:border-border" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        aria-hidden
        className="mb-8 border-b border-border pb-4 font-serif italic font-normal leading-none text-foreground/30 text-[clamp(2.75rem,6vw,4rem)]"
      >
        {number}
      </div>
      <h3 className="mb-3 font-serif text-2xl italic leading-tight tracking-tight text-foreground">
        {title}
      </h3>
      <p className="mb-4 text-[11px] font-medium uppercase tracking-eyebrow text-muted-foreground">
        {meta}
      </p>
      <p className="mb-12 hidden text-sm leading-relaxed text-muted-foreground md:block">
        {body}
      </p>
      <div className="mt-auto">
        <Link href={href} className="text-sm text-foreground hover:underline">
          Read more &rarr;
        </Link>
      </div>
    </div>
  );
}
