import type { Metadata } from "next";

import { AudiencePage as StudioAudiencePage } from "@/components/studio/pages/AudiencePage";

export const metadata: Metadata = {
  title: "For Churches | Movemental",
  description:
    "Your church is being asked to take a position on AI. We help church leaders answer it well — through The Movemental AI Path.",
};

export default function Page() {
  return <StudioAudiencePage audience="churches" />;
}
