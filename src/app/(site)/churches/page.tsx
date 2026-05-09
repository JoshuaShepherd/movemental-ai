import type { Metadata } from "next";

import { CaseStudyLayout } from "@/components/case-study";
import { churchesCaseStudy } from "@/components/case-study/data/churches";

export const metadata: Metadata = {
  title: "Movemental for Churches",
  description:
    "A reconstructed case study of a multisite church engaging the Movemental process — Safety, Sandbox, Skills, Solutions — through ratified governance and a formed staff.",
};

export default function Page() {
  return <CaseStudyLayout content={churchesCaseStudy} />;
}
