import type { Metadata } from "next";

import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { Container } from "@/components/primitives/container";
import { LogoStrip } from "@/components/primitives/logo-strip";
import { Section } from "@/components/primitives/section";
import { MovementLeadersPageContent } from "@/components/sections/movement-leaders/movement-leaders-page-content";
import { canonicalPageUrl } from "@/lib/site-url";

const title = "For Movement Leaders";
const description =
  "Infrastructure for the individual whose life's work is a body of ideas — integrating informational and relational intelligence, scenius, and succession so the work carries forward. Five failures, five moves, and a clear invitation.";
const ogTitle = "For Movement Leaders — Movemental";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalPageUrl("/movement-leaders") },
  openGraph: {
    url: canonicalPageUrl("/movement-leaders"),
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

export default function MovementLeadersPage() {
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

      <MovementLeadersPageContent />
    </>
  );
}
