import { Container, Display, Eyebrow, Prose, Reveal, Section } from "@/components/primitives";

import { HomeAudienceExamplesNewClient } from "./home-audience-examples-new-client";
import { homeAudienceExamplesNewCopy } from "./home-data";

/**
 * Parallel-safe audience application previews (Stitch HTML via embed route).
 * Placed early so examples read as applications of the same system, not separate products.
 */
export function HomeAudienceExamplesNew() {
  return (
    <Section id="audience-applications" variant="section" spacing="lg">
      <Container>
        <Reveal>
          <Eyebrow className="mb-4">{homeAudienceExamplesNewCopy.eyebrow}</Eyebrow>
          <Display size="md" as="h2" className="max-w-3xl text-balance">
            {homeAudienceExamplesNewCopy.display}
          </Display>
          <Prose className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            <p className="text-foreground">{homeAudienceExamplesNewCopy.intro}</p>
          </Prose>
        </Reveal>
        <div className="mt-12">
          <HomeAudienceExamplesNewClient />
        </div>
      </Container>
    </Section>
  );
}
