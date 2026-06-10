import type { Metadata } from "next";

import { AudienceOfferPage } from "@/components/audience";
import { institutionsCaseStudy } from "@/components/case-study/data/institutions";
import { canonicalPageUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Movemental for Institutions",
  description:
    "A reconstructed case study of a graduate seminary engaging the Movemental process — three constituencies (faculty, students, board) ratifying the same seven decisions in parallel.",
  alternates: { canonical: canonicalPageUrl("/institutions") },
};

export default function Page() {
  return <AudienceOfferPage audience="institutions" caseStudy={institutionsCaseStudy} />;
}
