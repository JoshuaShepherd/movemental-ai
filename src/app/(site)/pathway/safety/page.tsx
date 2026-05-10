import type { Metadata } from "next";

import { SafetyPage } from "@/components/studio/pages/pathway/SafetyPage";
import { canonicalPageUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Movemental | Safety — Stage 01 of the Movemental Path",
  description:
    "Stage 01 — two weeks of facilitated work. Seven decisions your board can ratify. $1,000. Net 15.",
  alternates: { canonical: canonicalPageUrl("/pathway/safety") },
  openGraph: {
    title: "Movemental | Safety — Stage 01 of the Movemental Path",
    description:
      "Stage 01 — two weeks of facilitated work. Seven decisions your board can ratify. $1,000. Net 15.",
    url: canonicalPageUrl("/pathway/safety"),
  },
};

export default function Page() {
  return <SafetyPage />;
}
