import type { Metadata } from "next";

import { HowWeUseAiPageContent } from "@/components/sections/how-we-use-ai/how-we-use-ai-page-content";
import { canonicalPageUrl } from "@/lib/site-url";

const title = "How we use AI";
const description =
  "Where Movemental stands on AI and how we use it. The values and commitments behind the work — what AI is and isn't, the test we apply to any use case, the three categories we sort use cases into, and the five commitments we keep.";
const ogTitle = "How we use AI — Movemental";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalPageUrl("/how-we-use-ai") },
  openGraph: {
    url: canonicalPageUrl("/how-we-use-ai"),
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

export default function Page() {
  return <HowWeUseAiPageContent />;
}
