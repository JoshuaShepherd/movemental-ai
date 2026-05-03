import type { Metadata } from "next";

import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { Container } from "@/components/primitives/container";
import { LogoStrip } from "@/components/primitives/logo-strip";
import { Section } from "@/components/primitives/section";
import { WhoIsAMovementLeaderPageContent } from "@/components/sections/who-is-a-movement-leader";
import { canonicalPageUrl } from "@/lib/site-url";

const title = "Who is a movement leader?";
const description =
  "A working definition of movement leadership: formative, multiplying impact across domains — not follower counts, content volume, or movement theory alone. Twelve marks, honest boundaries, and links to the full movement-leaders narrative.";
const ogTitle = "Who is a movement leader? — Movemental";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalPageUrl("/who-is-a-movement-leader") },
  openGraph: {
    url: canonicalPageUrl("/who-is-a-movement-leader"),
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

export default function WhoIsAMovementLeaderPage() {
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

      <WhoIsAMovementLeaderPageContent />
    </>
  );
}
