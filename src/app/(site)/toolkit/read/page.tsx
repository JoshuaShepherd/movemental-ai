import type { Metadata } from "next";

import { ToolkitReadContent } from "@/components/sections-mock/toolkit-read/toolkit-read-content";
import { canonicalPageUrl } from "@/lib/site-url";

const title = "It Starts With Safety — read the toolkit";
const description =
  "The full Movemental Safety field guide on the web: why governance precedes deployment, the seven decisions, the 15-question self-assessment your leadership team takes together, the named refusals, and the two-week facilitated engagement.";
const ogTitle = "It Starts With Safety — Movemental field guide";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalPageUrl("/toolkit/read") },
  openGraph: {
    url: canonicalPageUrl("/toolkit/read"),
    title: ogTitle,
    description,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description,
  },
};

export default function Page() {
  return <ToolkitReadContent />;
}
