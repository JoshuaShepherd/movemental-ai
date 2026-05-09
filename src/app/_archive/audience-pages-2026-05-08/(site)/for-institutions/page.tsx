import type { Metadata } from "next";

import { AudiencePage as StudioAudiencePage } from "@/components/studio/pages/AudiencePage";

export const metadata: Metadata = {
  title: "For Institutions | Movemental",
  description:
    "Move at the pace governance can defend. The Movemental AI Pathway translated for seminaries and training organizations.",
};

export default function Page() {
  return (
    <StudioAudiencePage audience="institutions" />
  );
}
