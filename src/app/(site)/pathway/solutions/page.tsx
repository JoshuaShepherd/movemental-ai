import type { Metadata } from "next";

import { SolutionsPathwayPage } from "@/components/studio/pages/pathway/SolutionsPathwayPage";
import { canonicalPageUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: {
    absolute: "Movemental | Solutions — Stage 04 of the Movemental Path",
  },
  description:
    "Stage 04 — AI integrated into how your organization actually runs, owned by formed people, governed by working policy. Scoped per engagement. From $30,000.",
  alternates: { canonical: canonicalPageUrl("/pathway/solutions") },
  openGraph: {
    title: "Movemental | Solutions — Stage 04 of the Movemental Path",
    description:
      "Stage 04 — AI integrated into how your organization actually runs, owned by formed people, governed by working policy. Scoped per engagement. From $30,000.",
    url: canonicalPageUrl("/pathway/solutions"),
  },
};

export default function Page() {
  return <SolutionsPathwayPage />;
}
