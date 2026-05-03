import type { Metadata } from "next";

import { AudiencePage as StudioAudiencePage } from "@/components/studio/pages/AudiencePage";

export const metadata: Metadata = {
  title: "For Nonprofits",
  description: "Adopt AI without losing donor trust — the pathway for nonprofits.",
};

export default function Page() {
  return (
    <StudioAudiencePage audience="nonprofits" />
  );
}
