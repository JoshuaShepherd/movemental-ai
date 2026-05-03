import type { Metadata } from "next";

import { AudiencePage as StudioAudiencePage } from "@/components/studio/pages/AudiencePage";

export const metadata: Metadata = {
  title: "For Institutions",
  description: "Governance-paced adoption — the pathway for seminaries and training organizations.",
};

export default function Page() {
  return (
    <StudioAudiencePage audience="institutions" />
  );
}
