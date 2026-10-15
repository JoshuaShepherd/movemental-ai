import type { Metadata } from "next";

import { MvFooter } from "@/components/mv/mv-footer";
import { MvHeader } from "@/components/mv/mv-header";
import { WorkPage } from "@/components/mv/work/work-page";

export const metadata: Metadata = {
  title: "Work with Movemental | From conviction to working systems",
  description:
    "Organizational guidance, context reconstruction, custom platforms and agents, and ongoing stewardship, for churches, nonprofits and institutions carrying their response to AI into practice.",
  alternates: { canonical: "/work-with-us-new" },
};

/** Work with Movemental. Board: Work (Oct 15, 2026). */
export default function WorkWithUsNewPage() {
  return (
    <>
      <MvHeader />
      <WorkPage />
      <MvFooter />
    </>
  );
}
