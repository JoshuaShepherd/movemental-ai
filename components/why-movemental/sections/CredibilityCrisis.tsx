'use client'

import { NarrativeSection } from '../NarrativeSection'
import { NarrativeStatement } from '../NarrativeStatement'

export function CredibilityCrisis() {
  return (
    <NarrativeSection>
      <div className="space-y-16 sm:space-y-24">
        <div>
          <NarrativeStatement alignment="center">
            <strong>The Credibility Crisis</strong>
          </NarrativeStatement>
          <p className="mt-6 text-center text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Modern movement leaders are digitally fragmented.
          </p>
          <p className="mt-8 text-center text-lg sm:text-xl text-foreground max-w-2xl mx-auto font-medium">
            My best work exists. Nobody can find it. The people who trust me can&apos;t point
            others to it.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
          {/* Left column - Current Reality */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-8">
              Current Reality
            </h3>
            <ul className="space-y-4 text-lg text-foreground">
              <li>PDFs scattered across drives</li>
              <li>Sermons buried on YouTube</li>
              <li>Articles lost in archives</li>
              <li>No canonical structure</li>
              <li>No continuity</li>
              <li>No amplification</li>
            </ul>
          </div>

          {/* Right column - Impact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-8">
              Impact
            </h3>
            <ul className="space-y-4 text-lg text-foreground">
              <li>Ideas disappear</li>
              <li>No structured discoverability</li>
              <li>No network leverage</li>
              <li>No AI readiness</li>
              <li>No scalable distribution</li>
            </ul>
          </div>
        </div>
      </div>
    </NarrativeSection>
  )
}
