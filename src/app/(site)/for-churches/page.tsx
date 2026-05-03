import type { Metadata } from "next";

import { AudiencePage as StudioAudiencePage } from "@/components/studio/pages/AudiencePage";

export const metadata: Metadata = {
  title: "For Churches",
  description: "Lead your staff into AI without losing the mission — the pathway for churches.",
};

export default function Page() {
  return (
    <StudioAudiencePage audience="churches" />
  );
}
