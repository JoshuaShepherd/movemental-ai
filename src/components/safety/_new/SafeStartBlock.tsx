import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Home — compressed "What SafeStart is" block.
 *
 * Replaces the full four-stage exposition (`PathFoldNew`) on the homepage.
 * The full four-stage methodology — Stage 1 boxed feature, satellites,
 * governance deliverables grid, sequence doctrine — lives on `/pathway`.
 * This block does one job: name the engagement a visitor would actually
 * buy, and link them either to that engagement or to the full path.
 *
 * The lead sentence ("Two weeks of facilitated work...") is the
 * second-strongest line on the site and lives in two places by design —
 * here, and on `/pathway`. Both quote it verbatim.
 */
export function SafeStartBlock() {
  return (
    <section
      id="safestart"
      aria-labelledby="safestart-heading"
      className="bg-background px-6 py-20 md:px-10 md:py-28 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-(--container-max)">
        <div className="grid grid-cols-1 gap-10 md:gap-16 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
              The Stage-1 engagement
            </p>
          </div>

          <div className="lg:col-span-8">
            <h2
              id="safestart-heading"
              className="font-serif italic font-normal leading-[1.05] tracking-[-0.02em] text-foreground text-[clamp(2.25rem,5vw,3.75rem)]"
            >
              What SafeStart is.
            </h2>

            <div className="mt-8 max-w-(--prose-max) space-y-6 text-[1.0625rem] leading-relaxed text-foreground md:mt-10 md:text-lg">
              <p className="font-serif text-xl italic leading-snug text-foreground md:text-[1.375rem]">
                Two weeks of facilitated work that produces a board-ratifiable
                AI Organizational Guidebook in five layers your leadership can
                sign and your team can follow.
              </p>
              <p className="text-muted-foreground">
                $1,000. Two cohort weeks. Five Guidebook layers — Statement,
                Policy, Context, Rules, Response Plans. One document your board
                can ratify and your staff can use.
              </p>
              <p className="text-muted-foreground">
                This is the entry point to Movemental. Most organizations begin
                here. The full four-stage path (Safety → Sandbox → Skills →
                Solutions) builds from this foundation.
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-4 md:mt-12 md:flex-row md:items-end md:gap-6">
              <div className="flex flex-col items-start gap-1.5">
                <Link
                  href="/contact?interest=safestart"
                  className="btn-pill btn-pill--primary px-7 py-3.5"
                  aria-label="Start SafeStart — the $1,000 facilitated engagement"
                >
                  Start SafeStart
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
                <span className="text-[12px] font-medium uppercase tracking-eyebrow text-muted-foreground">
                  $1,000 · two weeks · ratifiable Guidebook
                </span>
              </div>
              <div className="flex flex-col items-start gap-1.5">
                <Link
                  href="/pathway"
                  className="btn-pill btn-pill--ghost px-7 py-3.5"
                >
                  See the full four-stage path
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
                <span className="text-[12px] font-medium uppercase tracking-eyebrow text-muted-foreground">
                  Safety · Sandbox · Skills · Solutions
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
