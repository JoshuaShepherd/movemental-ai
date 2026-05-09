import { Cite } from "@/components/citations";
import { BtnPill } from "@/components/sections-mock/primitives";

import { InteractivePath } from "./interactive-path";

export function PathFold() {
  return (
    <section
      className="band-section path-section"
      id="pathway"
      aria-labelledby="path-heading"
    >
      <div className="container path-section__inner">
        <header className="path-section__header">
          <p className="section-eyebrow">The Movemental AI Path</p>
          <h2 className="path-section__title" id="path-heading">
            A clear path for leading your organization through AI.
          </h2>
          <p className="path-section__intro">
            Most organizations jump straight to tech, or freeze in place
            <Cite claimId="high-performer-cohort-5-7" />. Movemental&apos;s
            path is clear, human-first, and rooted in safety.
          </p>
        </header>

        <InteractivePath />

        <div className="path-section__cta mt-12 md:mt-16">
          <BtnPill href="/pathway/safety" variant="primary">
            Start with Safety
          </BtnPill>
        </div>
      </div>
    </section>
  );
}
