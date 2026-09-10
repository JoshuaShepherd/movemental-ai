import type { Metadata } from "next";

import { AboutPageView } from "@/v2/components/founders/about-page-view";
import { buildOrganizationJsonLd } from "@/lib/site-schema";

export const metadata: Metadata = {
  title: "About Movemental | Missional AI & Leadership Scenius",
  description:
    "Who we are, why we exist, and what we refuse. Fragmentation and credibility, the story behind Movemental, how we use AI on ourselves first, the founders, the network of trusted voices, and our open research.",
  alternates: {
    canonical: "/about",
  },
};

export default function V2AboutPage() {
  const jsonLd = buildOrganizationJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutPageView />
    </>
  );
}
