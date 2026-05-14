import {
  blueprintItems,
  solutionsArc,
  solutionsDoneWatch,
  solutionsProduces,
} from "../data/shared";
import { StageDetail } from "../StageDetail";

/**
 * SolutionsContent — Stage 04 panel body.
 *
 * Renders: intro + Not/But pivot → Custom AI Build Blueprint (6-row 2-col
 * grid) → "What this can produce" hairline list → "Why this matters" prose
 * pair → 4-step verb arc with italic-serif capstone.
 */
export function SolutionsContent() {
  return (
    <div className="mt-10 sm:mt-14 max-w-[40rem]">
      <p className="text-base leading-[1.65] text-muted-foreground max-w-[56ch] mb-6 [&_strong]:text-foreground [&_strong]:font-medium">
        Solutions is the stage where the technology finally becomes central —{" "}
        <strong>but not first.</strong> By this point, your organization has
        clarified its boundaries, tested real use cases, trained its people,
        and learned where AI creates value without compromising trust.
      </p>

      {/* Not / But pivot */}
      <div className="mb-10 sm:mb-12 pt-5 border-t border-foreground grid gap-3 max-w-[50ch]">
        <p className="grid grid-cols-[3.4rem_1fr] gap-3 items-baseline text-[1.05rem] leading-[1.5] text-muted-foreground tracking-tight">
          <span className="font-serif italic text-ink-soft text-base">Not:</span>
          <span>“What AI tool should we buy?”</span>
        </p>
        <p className="grid grid-cols-[3.4rem_1fr] gap-3 items-baseline text-[1.05rem] leading-[1.5] text-foreground tracking-tight">
          <span className="font-serif italic text-foreground text-base">But:</span>
          <span>
            <em className="font-serif italic font-normal text-foreground">
              “What should we build around the way our organization actually
              works?”
            </em>
          </span>
        </p>
      </div>

      {/* Blueprint */}
      <p className="inline-flex items-center gap-2.5 text-[0.78rem] font-medium uppercase tracking-eyebrow text-muted-foreground mb-3">
        <span aria-hidden="true" className="inline-block w-[22px] h-px bg-foreground" />
        The custom AI build blueprint
      </p>
      <p className="text-base leading-[1.65] text-muted-foreground max-w-[56ch] mb-6">
        A custom AI solution is designed around six things.
      </p>
      <ol className="m-0 mb-10 sm:mb-12 p-0 list-none grid grid-cols-1 min-[720px]:grid-cols-2 border-t border-border">
        {blueprintItems.map((item) => (
          <li
            key={item.num}
            className="grid grid-cols-[4.5rem_1fr] gap-4 items-start py-4 border-b border-border"
          >
            <span className="font-serif italic text-ink-soft text-base pt-0.5">
              {item.num}
            </span>
            <div>
              <p className="font-serif italic text-foreground text-[1.2rem] leading-[1.2] mb-1.5">
                {item.name}
              </p>
              <p className="text-[0.95rem] leading-[1.55] text-muted-foreground max-w-[52ch]">
                {item.desc}
              </p>
            </div>
          </li>
        ))}
      </ol>

      {/* What this can produce */}
      <p className="inline-flex items-center gap-2.5 text-[0.78rem] font-medium uppercase tracking-eyebrow text-muted-foreground mb-3">
        <span aria-hidden="true" className="inline-block w-[22px] h-px bg-foreground" />
        What this can produce
      </p>
      <ul className="m-0 mb-10 sm:mb-12 p-0 list-none border-t border-border">
        {solutionsProduces.map((produce) => (
          <li
            key={produce}
            className="grid grid-cols-[1.5rem_1fr] gap-3 items-start py-2.5 border-b border-border text-foreground text-base leading-[1.5] tracking-tight"
          >
            <span aria-hidden="true" className="text-ink-soft">
              —
            </span>
            <span>{produce}</span>
          </li>
        ))}
      </ul>

      {/* Why this matters */}
      <p className="inline-flex items-center gap-2.5 text-[0.78rem] font-medium uppercase tracking-eyebrow text-muted-foreground mb-3">
        <span aria-hidden="true" className="inline-block w-[22px] h-px bg-foreground" />
        Why this matters
      </p>
      <div className="mb-10 sm:mb-12">
        <p className="text-[1.05rem] leading-[1.65] text-muted-foreground max-w-[58ch] mb-4 [&_strong]:text-foreground [&_strong]:font-medium">
          Tools built too early amplify confusion. Tools built after the first
          three stages <strong>amplify clarity.</strong>
        </p>
        <p className="text-[1.05rem] leading-[1.65] text-muted-foreground max-w-[58ch] [&_em]:font-serif [&_em]:italic [&_em]:font-normal [&_em]:text-foreground">
          By this point, AI is no longer a tool floating above the
          organization. It becomes{" "}
          <em>
            infrastructure shaped around the people, mission, data, and
            decisions
          </em>{" "}
          that already define the work.
        </p>
      </div>

      {/* Four-verb arc */}
      <div className="max-w-[38rem]">
        {solutionsArc.map((step) => (
          <p
            key={step.lead}
            className="text-[1.05rem] leading-[1.7] text-muted-foreground max-w-[56ch] mb-7 last:mb-0"
          >
            <span className="font-serif italic font-normal text-foreground text-[1.22em] mr-2">
              {step.lead}
            </span>
            {step.body}
          </p>
        ))}
        <p className="font-serif italic font-normal text-foreground text-[clamp(1.2rem,1.8vw,1.45rem)] leading-[1.4] max-w-[48ch] pl-5 border-l border-foreground mt-10">
          When this works, the organization stops re-explaining itself to
          itself.
        </p>
      </div>

      <StageDetail data={solutionsDoneWatch} />
    </div>
  );
}
