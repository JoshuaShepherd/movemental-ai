import type { Metadata } from "next";

import { AssessmentResults } from "@/components/mv/assessment/assessment-static";
import { MvFooter } from "@/components/mv/mv-footer";
import { MvHeader } from "@/components/mv/mv-header";

export const metadata: Metadata = { title: "Reality Assessment results, an example | Movemental" };

/** The gap, with the board's sample results. Board: Assessment, "The gap". */
export default function ResultsPage() {
  return (
    <>
      <MvHeader />
      <AssessmentResults />
      <MvFooter />
    </>
  );
}
