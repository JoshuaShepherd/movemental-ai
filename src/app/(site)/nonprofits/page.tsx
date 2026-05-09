import type { Metadata } from "next";

import { CaseStudyLayout } from "@/components/case-study";
import { nonprofitsCaseStudy } from "@/components/case-study/data/nonprofits";

export const metadata: Metadata = {
  title: "Movemental for Nonprofits",
  description:
    "A reconstructed case study of a faith-based nonprofit engaging the Movemental process — clinical, donor, and board considerations all in scope.",
};

export default function Page() {
  return <CaseStudyLayout content={nonprofitsCaseStudy} />;
}
