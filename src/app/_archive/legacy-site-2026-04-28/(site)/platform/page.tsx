import type { Metadata } from "next";

import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { Container } from "@/components/primitives/container";
import { LogoStrip } from "@/components/primitives/logo-strip";
import { Section } from "@/components/primitives/section";
import { PlatformPageContent } from "@/components/sections/platform";
import { canonicalPageUrl } from "@/lib/site-url";

const title = "Platform";
const description =
  "Movemental as digital infrastructure: integrated library, relational graph, voice, and pathways — the foundation beneath faithful AI use. How the six-stage arc, the AI Stewardship Sequence, and engagements fit together.";
const ogTitle = "Platform — Movemental";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalPageUrl("/platform") },
  openGraph: {
    url: canonicalPageUrl("/platform"),
    title: ogTitle,
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description,
  },
};

export default function PlatformPage() {
  return (
    <>
      <Section
        id="proof"
        variant="default"
        spacing="sm"
        aria-label="Organizations our co-founders have built and led"
      >
        <Container>
          <RevealOnScroll>
            <LogoStrip
              heading="Our co-founders have built and led"
              aria-label="Organizations our co-founders have built and led"
              items={[
                { name: "Forge" },
                { name: "100 Movements" },
                { name: "Movement Leaders Collective" },
                { name: "North American Mission Board" },
              ]}
            />
          </RevealOnScroll>
        </Container>
      </Section>

      <PlatformPageContent />
    </>
  );
}
