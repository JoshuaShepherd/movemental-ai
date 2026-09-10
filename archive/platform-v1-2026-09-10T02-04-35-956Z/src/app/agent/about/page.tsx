import type { Metadata } from "next";

import { AboutExperience } from "@/components/agent-room/about/about-experience";
import { buildOrganizationJsonLd } from "@/lib/site-schema";

export const metadata: Metadata = {
  title: "About Movemental",
  description:
    "Who we are, why we exist, and what we refuse. Fragmentation and credibility, the story behind Movemental, how we use AI on ourselves first, the founders, the network of trusted voices, and our open research.",
  alternates: {
    canonical: "/agent/about",
  },
};

/** `/agent/about` — the why and the ethic behind Movemental. */
export default function AboutPage() {
  const jsonLd = buildOrganizationJsonLd();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutExperience />
    </>
  );
}
