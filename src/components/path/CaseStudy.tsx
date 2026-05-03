import { Container, Eyebrow, Reveal, Section } from "@/components/primitives";

import { CaseStudyPull } from "./CaseStudyPull";
import type { CaseStudyBlock, CaseStudyConfig } from "./data/case-study-types";

/**
 * CaseStudy — long-form composite story walk-through. Renders:
 * - 3-up stat tiles (gap-px hairline grid)
 * - numbered story sections, each with optional 2-col What they did/changed
 * - case__pull quotes (CaseStudyPull)
 * - case__emphasis blocks (medium-weight ink)
 * - final case__numbered list ("Why this worked")
 */
export function CaseStudy({ data }: { data: CaseStudyConfig }) {
  return (
    <Section
      variant="default"
      spacing="lg"
      id="case-study"
      aria-labelledby="case-title"
      className="border-t border-border"
    >
      <Container>
        <header className="max-w-[720px] mb-10 sm:mb-14">
          <Reveal>
            <Eyebrow withDot className="mb-5">
              {data.eyebrow}
            </Eyebrow>
          </Reveal>
          <Reveal>
            <h2
              id="case-title"
              className="font-sans font-medium tracking-display text-foreground text-[clamp(2.1rem,4vw,3.2rem)] leading-[1.05] max-w-[22ch] mb-6"
            >
              {data.title}
            </h2>
          </Reveal>
          <Reveal>
            <p className="text-[1.05rem] leading-[1.65] text-muted-foreground max-w-[60ch] [&_em]:font-serif [&_em]:italic [&_em]:font-normal">
              {data.lede}
            </p>
          </Reveal>

          <Reveal>
            <dl className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-px overflow-hidden rounded-card border border-border bg-border">
              {data.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-background p-6 sm:p-7"
                >
                  <dt className="font-serif italic font-normal text-foreground text-[clamp(1.85rem,3vw,2.4rem)] leading-none tracking-tight mb-2">
                    {stat.num}
                  </dt>
                  <dd className="text-[0.78rem] font-medium uppercase tracking-eyebrow text-muted-foreground">
                    {stat.label}
                  </dd>
                  {stat.meta && (
                    <dd className="mt-2 text-[0.92rem] leading-[1.5] text-muted-foreground">
                      {stat.meta}
                    </dd>
                  )}
                </div>
              ))}
            </dl>
          </Reveal>
        </header>

        <hr aria-hidden="true" className="border-0 border-t border-border w-16 my-10 sm:my-14" />

        <div className="space-y-10 sm:space-y-14">
          {data.sections.map((section, i) => (
            <article
              key={i}
              className="max-w-[38rem]"
              {...(section.eyebrow
                ? { "aria-labelledby": `case-step-${i}` }
                : {})}
            >
              {section.eyebrow && (
                <p className="text-[0.78rem] font-medium uppercase tracking-eyebrow text-muted-foreground mb-2">
                  {section.eyebrow}
                </p>
              )}
              <Reveal>
                <h3
                  id={section.eyebrow ? `case-step-${i}` : undefined}
                  className="font-serif italic font-normal text-foreground text-[clamp(1.85rem,3.2vw,2.5rem)] leading-[1.1] max-w-[22ch] mb-6 tracking-tight"
                >
                  {section.title}
                </h3>
              </Reveal>

              {section.intro && (
                <div className="mb-2">
                  {section.intro.map((block, b) => (
                    <CaseBlock key={b} block={block} />
                  ))}
                </div>
              )}

              {section.what && (
                <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                  <div className="border-t border-foreground pt-5">
                    <p className="font-serif italic font-normal text-foreground text-[1.18rem] leading-tight tracking-tight mb-3">
                      {section.what.didLabel}
                    </p>
                    {section.what.didBlocks.map((block, b) => (
                      <CaseBlock key={b} block={block} />
                    ))}
                  </div>
                  <div className="border-t border-foreground pt-5">
                    <p className="font-serif italic font-normal text-foreground text-[1.18rem] leading-tight tracking-tight mb-3">
                      {section.what.changedLabel}
                    </p>
                    {section.what.changedBlocks.map((block, b) => (
                      <CaseBlock key={b} block={block} />
                    ))}
                  </div>
                </div>
              )}

              {i < data.sections.length - 1 && (
                <hr
                  aria-hidden="true"
                  className="border-0 border-t border-border w-16 mt-10 sm:mt-14"
                />
              )}
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/*  CaseBlock — renders one CaseStudyBlock                                    */
/* -------------------------------------------------------------------------- */

function CaseBlock({ block }: { block: CaseStudyBlock }) {
  switch (block.kind) {
    case "p":
      return (
        <p
          className="text-[1.05rem] leading-[1.7] text-muted-foreground max-w-[62ch] mb-4 last:mb-0 [&_strong]:text-foreground [&_strong]:font-medium [&_em]:font-serif [&_em]:italic [&_em]:font-normal [&_em]:text-foreground [&_em]:text-[1.04em]"
          dangerouslySetInnerHTML={{ __html: block.text }}
        />
      );
    case "list":
      return (
        <ul className="m-0 mb-5 p-0 list-none max-w-[56ch]">
          {block.items.map((item) => (
            <li
              key={item}
              className="relative pl-6 py-1.5 text-[1.02rem] leading-[1.55] text-muted-foreground before:absolute before:left-0 before:content-['—'] before:text-ink-soft"
              dangerouslySetInnerHTML={{ __html: item }}
            />
          ))}
        </ul>
      );
    case "pull":
      return <CaseStudyPull>{block.text}</CaseStudyPull>;
    case "emphasis":
      return (
        <p
          className="text-[1.15rem] leading-[1.5] text-foreground font-medium tracking-tight mt-5 max-w-[56ch] [&_em]:font-serif [&_em]:italic [&_em]:font-normal"
          dangerouslySetInnerHTML={{ __html: block.text }}
        />
      );
    case "numbered":
      return (
        <ol className="m-0 mt-4 p-0 list-none max-w-[56ch] border-t border-border">
          {block.items.map((item, i) => (
            <li
              key={item}
              className="grid grid-cols-[2.5rem_1fr] gap-4 py-4 border-b border-border text-[1.1rem] leading-[1.4] text-foreground tracking-tight"
            >
              <span className="font-serif italic text-ink-soft text-[1.05rem]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      );
    default: {
      const exhaustiveCheck: never = block;
      return exhaustiveCheck;
    }
  }
}
