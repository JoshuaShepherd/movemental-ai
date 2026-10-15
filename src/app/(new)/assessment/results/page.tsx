import type { Metadata } from "next";

import { AssessmentResults } from "@/components/mv/assessment/assessment-static";
import { MvFooter } from "@/components/mv/mv-footer";
import { MvHeader } from "@/components/mv/mv-header";
import { realityAssessmentService } from "@/lib/services/assessment/reality-assessment.service";

export const metadata: Metadata = { title: "Reality Assessment results" };

/** The gap: either live results from the database or the board's sample results. */
export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { token } = await searchParams;
  const activeToken = typeof token === "string" ? token : undefined;

  let assessmentData = null;
  let errorMsg: string | undefined;

  if (activeToken) {
    const res = await realityAssessmentService.getResults(activeToken);
    if (res.ok) {
      assessmentData = res.data;
    } else {
      errorMsg = res.error.message;
    }
  }

  return (
    <>
      <MvHeader />
      <AssessmentResults token={activeToken} data={assessmentData} error={errorMsg} />
      <MvFooter />
    </>
  );
}
