import type { Metadata } from "next";

import { AudiencePage as StudioAudiencePage } from "@/components/studio/pages/AudiencePage";

export const metadata: Metadata = {
  title: "For Churches | Movemental",
  description:
    "Lead your staff into AI without losing the mission. The Movemental AI Pathway translated into a church context.",
};

export default function Page() {
  return (
    <StudioAudiencePage audience="churches" />
  );
}
