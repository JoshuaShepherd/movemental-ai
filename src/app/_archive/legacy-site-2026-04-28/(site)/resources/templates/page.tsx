import type { Metadata } from "next";

import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { Container } from "@/components/primitives/container";
import { LogoStrip } from "@/components/primitives/logo-strip";
import { Section } from "@/components/primitives/section";
import { ResourcesTemplatesPageContent } from "@/components/sections/resources-templates";
import { canonicalPageUrl } from "@/lib/site-url";

const title = "Sandbox template pack";
const description =
  "Request Movemental's Sandbox Season template pack — charter, pattern scan, experiment brief, scoring sheet, flag paragraph, and portfolio — aligned with Safety · Sandbox · Skills · Solutions and integration-ready artifacts.";
const ogTitle = "Sandbox template pack — Movemental";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalPageUrl("/resources/templates") },
  openGraph: {
    url: canonicalPageUrl("/resources/templates"),
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

export default function ResourcesTemplatesPage() {
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

      <ResourcesTemplatesPageContent />
    </>
  );
}
