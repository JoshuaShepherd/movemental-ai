import type { Metadata } from "next";

import { SafetyNewPage } from "@/components/safety/_new/SafetyNewPage";
import { canonicalPageUrl } from "@/lib/site-url";

const TITLE = "Safety — Movemental";
const DESCRIPTION =
  "The Safety stage produces your AI Organizational Guidebook. Five layers, ratified by your board. Free Field Guide or facilitated SafeStart in two weeks.";

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
  return <SafetyNewPage />;
}
