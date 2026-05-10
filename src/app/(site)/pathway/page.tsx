import type { Metadata } from "next";

import { PathwayOverviewTemplate } from "@/components/pathway/pathway-overview-template";
import { canonicalPageUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Movemental Path",
  description:
    "Four stages in order — Safety, Sandbox, Skills, Solutions. Why sequence matters, pricing bands, and institutional timelines.",
  alternates: { canonical: canonicalPageUrl("/pathway") },
  openGraph: {
    url: canonicalPageUrl("/pathway"),
    title: "Movemental Path — Movemental",
  },
};

export default function Page() {
  return <PathwayOverviewTemplate />;
}
