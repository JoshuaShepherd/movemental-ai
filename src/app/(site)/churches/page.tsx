import type { Metadata } from "next";

import { AudienceOfferPage } from "@/components/audience";
import { churchesCaseStudy } from "@/components/case-study/data/churches";
import { canonicalPageUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Movemental for Churches",
  description:
    "A reconstructed case study of a multisite church engaging the Movemental process — Safety, Sandbox, Skills, Solutions — through ratified governance and a formed staff.",
  alternates: { canonical: canonicalPageUrl("/churches") },
};

export default function Page() {
  return <AudienceOfferPage audience="churches" caseStudy={churchesCaseStudy} />;
}
