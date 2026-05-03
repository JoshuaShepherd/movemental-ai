import type { Metadata } from "next";

import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { Container } from "@/components/primitives/container";
import { LogoStrip } from "@/components/primitives/logo-strip";
import { Section } from "@/components/primitives/section";
import { ServicesHubPageContent } from "@/components/sections/services-hub";
import { canonicalPageUrl } from "@/lib/site-url";

const title = "Services";
const description =
  "Movemental engagements across the AI Stewardship Sequence — Sandbox Season, Safety and Skills scoping, and Solutions advisory — aligned with the six-stage arc and integration-first foundation work.";
const ogTitle = "Services — Movemental";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalPageUrl("/services") },
  openGraph: {
    url: canonicalPageUrl("/services"),
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

export default function ServicesPage() {
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

      <ServicesHubPageContent />
    </>
  );
}
