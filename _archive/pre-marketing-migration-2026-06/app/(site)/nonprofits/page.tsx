import type { Metadata } from "next";

import { AudienceOfferPage } from "@/components/audience";
import { nonprofitsCaseStudy } from "@/components/case-study/data/nonprofits";
import { canonicalPageUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Movemental for Nonprofits",
  description:
    "A reconstructed case study of a faith-based nonprofit engaging the Movemental process — clinical, donor, and board considerations all in scope.",
  alternates: { canonical: canonicalPageUrl("/nonprofits") },
};

export default function Page() {
  return <AudienceOfferPage audience="nonprofits" caseStudy={nonprofitsCaseStudy} />;
}
