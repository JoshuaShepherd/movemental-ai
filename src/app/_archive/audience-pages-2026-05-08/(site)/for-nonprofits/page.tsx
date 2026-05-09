import type { Metadata } from "next";

import { AudiencePage as StudioAudiencePage } from "@/components/studio/pages/AudiencePage";

export const metadata: Metadata = {
  title: "For Nonprofits | Movemental",
  description:
    "Adopt AI without losing donor trust. The Movemental AI Pathway translated into a nonprofit context.",
};

export default function Page() {
  return (
    <StudioAudiencePage audience="nonprofits" />
  );
}
