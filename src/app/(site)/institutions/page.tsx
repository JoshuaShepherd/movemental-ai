import type { Metadata } from "next";

import { CaseStudyLayout } from "@/components/case-study";
import { institutionsCaseStudy } from "@/components/case-study/data/institutions";

export const metadata: Metadata = {
  title: "Movemental for Institutions",
  description:
    "A reconstructed case study of a graduate seminary engaging the Movemental process — three constituencies (faculty, students, board) ratifying the same seven artifacts in parallel.",
};

export default function Page() {
  return <CaseStudyLayout content={institutionsCaseStudy} />;
}
