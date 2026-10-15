import type { Metadata } from "next";

import { AssessmentQuestions } from "@/components/mv/assessment/assessment-views";
import { MvTaskHeader } from "@/components/mv/mv-task-header";

export const metadata: Metadata = { title: "The Reality Assessment" };

/** Board: Assessment, "Leader predicts". */
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { org } = await searchParams;
  const name = typeof org === "string" ? org : undefined;
  return (
    <>
      <MvTaskHeader>
        <span className="mv-muted">{name ? `${name} · Reality Assessment` : "Reality Assessment"}</span>
      </MvTaskHeader>
      <AssessmentQuestions mode="leader" org={name} />
    </>
  );
}
