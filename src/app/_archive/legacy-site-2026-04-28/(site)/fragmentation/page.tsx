import type { Metadata } from "next";

import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { Container } from "@/components/primitives/container";
import { LogoStrip } from "@/components/primitives/logo-strip";
import { Section } from "@/components/primitives/section";
import { FragmentationDeck } from "@/components/sections/fragmentation-deck";
import { canonicalPageUrl } from "@/lib/site-url";

const title = "The six stages";
const description =
  "Fragmentation through Movement — and why most organizations stall at Integration: bringing informational and relational intelligence into one foundation (library, graph, voice, pathways). Walk the arc; open folders at Integration to browse sample corpus artifacts.";
const ogTitle = "The six stages — Movemental";
const ogDescription =
  "Walk Fragmentation → Integration → Activation → Formation → Multiplication → Movement. Integration is where the arc tightens — foundation before scale.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalPageUrl("/fragmentation") },
  openGraph: {
    url: canonicalPageUrl("/fragmentation"),
    title: ogTitle,
    description: ogDescription,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description: ogDescription,
  },
};

export default function FragmentationPage() {
  return (
    <>
      {/*
        Proof strip — same real co-founder affiliations as home (home-page-audit-fixes Fix 1).
        Logo assets can replace typographic pills when ready.
      */}
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

      <FragmentationDeck />
    </>
  );
}
