import type { Metadata } from "next";

import { AssessmentQuestions } from "@/components/mv/assessment/assessment-views";
import { MvTaskHeader } from "@/components/mv/mv-task-header";

export const metadata: Metadata = { title: "The Reality Assessment | Movemental" };

/** Board: Assessment, "What your people see". */
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
        <span className="mv-muted">{name ? `Anonymous · ${name}` : "Anonymous"}</span>
      </MvTaskHeader>
      <AssessmentQuestions mode="staff" org={name} />
    </>
  );
}
