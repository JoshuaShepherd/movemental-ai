import type { Metadata } from "next";

import { SkillsPathwayPage } from "@/components/studio/pages/pathway/SkillsPathwayPage";
import { canonicalPageUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Movemental | Skills — Stage 03 of the Movemental Path",
  description:
    "Stage 03 — formation, not training. An eight-week cohort that produces leaders who can steward AI inside their organizations, supported by a year of platform access. $15,000 cohort + $5,000/year LMS.",
  alternates: { canonical: canonicalPageUrl("/pathway/skills") },
  openGraph: {
    title: "Movemental | Skills — Stage 03 of the Movemental Path",
    description:
      "Stage 03 — formation, not training. An eight-week cohort that produces leaders who can steward AI inside their organizations, supported by a year of platform access. $15,000 cohort + $5,000/year LMS.",
    url: canonicalPageUrl("/pathway/skills"),
  },
};

export default function Page() {
  return <SkillsPathwayPage />;
}
