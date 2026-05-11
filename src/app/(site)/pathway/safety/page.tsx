import type { Metadata } from "next";

import { SafetyPage } from "@/components/studio/pages/pathway/SafetyPage";
import { canonicalPageUrl } from "@/lib/site-url";

const TITLE = "Movemental | Safety — Stage 01 of the Movemental Path";
const DESCRIPTION =
  "Volume One of the Movemental Field Guides — It Starts With Safety. A free 33-page field guide for building your AI Organizational Guidebook in five layers. SafeStart is the two-week facilitated version ($1,000).";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: canonicalPageUrl("/pathway/safety") },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: canonicalPageUrl("/pathway/safety"),
  },
};

export default function Page() {
  return <SafetyPage />;
}
