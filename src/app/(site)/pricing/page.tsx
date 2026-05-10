import type { Metadata } from "next";

import { PricingPageContent } from "@/components/sections/pricing";
import { canonicalPageUrl } from "@/lib/site-url";

const title = "Pricing";
const description =
  "Published prices for Stage 01–04 of the Movemental Path plus the Path Bundle. Network and institutional engagements scoped per conversation.";
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
  return <PricingPageContent />;
}
