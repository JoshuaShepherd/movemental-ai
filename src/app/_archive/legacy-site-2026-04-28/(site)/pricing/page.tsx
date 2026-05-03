import type { Metadata } from "next";

import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { Container } from "@/components/primitives/container";
import { LogoStrip } from "@/components/primitives/logo-strip";
import { Section } from "@/components/primitives/section";
import { PricingPageContent } from "@/components/sections/pricing";
import { canonicalPageUrl } from "@/lib/site-url";

const title = "Pricing";
const description =
  "Published Sandbox Season fees by organization zone, milestone-weighted payments, and how transparent pricing supports integration work — scope discipline as the product.";
const ogTitle = "Pricing — Movemental";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalPageUrl("/pricing") },
  openGraph: {
    url: canonicalPageUrl("/pricing"),
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

export default function PricingPage() {
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

      <PricingPageContent />
    </>
  );
}
