import type { Metadata } from "next";

import { HomeConceptModernPageContent } from "@/components/sections/home/home-concept-modern-page-content";
import { canonicalPageUrl } from "@/lib/site-url";

const title = "Movemental — There is a different way to navigate AI";
const description =
  "Between fearful avoidance and reckless adoption of AI, there is a narrow way. Movemental helps organizations navigate AI with people, formation, and mission at stake.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalPageUrl("/") },
  openGraph: {
    url: canonicalPageUrl("/"),
    title,
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function HomePage() {
  return <HomeConceptModernPageContent />;
}
