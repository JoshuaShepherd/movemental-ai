import { Fragment } from "react";

import { Container, Section } from "@/components/primitives";

import { CaseStudyHeroBand } from "./case-study-hero";
import { CaseStudyProse } from "./case-study-prose";
import { CaseStudyToc } from "./case-study-toc";
import type { CaseStudyContent } from "./types";

/**
 * `<CaseStudyLayout />` — top-level page composition for /churches,
 * /nonprofits, /institutions.
 *
 *   ┌──────────────────────────── Hero (kicker, title, lede, CTA) ───────────┐
 *   │                                                                          │
 *   │                                                                          │
 *   │  ┌──────────── 12-col grid ────────────────────────────────────────┐    │
 *   │  │  [TOC sidebar] │ [Article body, max-w-prose]                    │    │
 *   │  │   sticky       │ The situation → Stage 01 → … → Closing CTA     │    │
 *   │  └─────────────────────────────────────────────────────────────────┘    │
 *   └──────────────────────────────────────────────────────────────────────────┘
 *
 * Sections render sequentially with hairline separators between them. The TOC
 * is a client component (IntersectionObserver scroll-spy); everything else is
 * server-rendered.
 */
export function CaseStudyLayout({ content }: { content: CaseStudyContent }) {
  return (
    <>
      <CaseStudyHeroBand hero={content.hero} />

      <Section variant="default" spacing="sm" className="border-t border-border">
        <Container>
          <div className="case-study-grid">
            <aside className="case-study-grid__sidebar">
              <div className="case-study-grid__sidebar-inner">
                <CaseStudyToc sections={content.sections} />
              </div>
            </aside>

            <div className="case-study-grid__main">
              {content.sections.map((section, i) => (
                <Fragment key={section.id}>
                  {i > 0 ? (
                    <hr className="case-study-section__divider" aria-hidden />
                  ) : null}
                  <CaseStudyProse section={section} />
                </Fragment>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
