import type { Metadata } from "next";

import { FootnotesPageClient } from "@/components/site-footnotes/footnotes-page-client";
import { EEAT_REGISTRY } from "@/lib/citations/eeat-registry";

export const metadata: Metadata = {
  title: "Claims, sources & notes",
  description:
    "Single reference for Movemental site claims, primary sources, and reader-facing notes—the same evidence layer used in citation tooltips.",
};

export default function FootnotesPage() {
  return <FootnotesPageClient entries={EEAT_REGISTRY} />;
}
