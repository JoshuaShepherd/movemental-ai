import type { Metadata } from "next";

import { AssessmentIntro } from "@/components/mv/assessment/assessment-static";
import { MvFooter } from "@/components/mv/mv-footer";
import { MvHeader } from "@/components/mv/mv-header";

export const metadata: Metadata = {
  title: "The Reality Assessment | Movemental",
  description:
    "Find out what is actually happening, before you decide what should. Leaders predict, your people answer anonymously, and you see the gap. Free.",
  alternates: { canonical: "/assessment" },
};

/** The Reality Assessment explainer and start. Board: Assessment. */
export default function AssessmentNewPage() {
  return (
    <>
      <MvHeader />
      <AssessmentIntro />
      <MvFooter />
    </>
  );
}
