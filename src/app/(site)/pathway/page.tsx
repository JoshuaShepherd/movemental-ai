import type { Metadata } from "next";

import { PathwayOverviewPage as StudioPathwayOverviewPage } from "@/components/studio/pages/PathwayOverviewPage";

export const metadata: Metadata = {
  title: "The Pathway",
  description: "The Movemental AI Pathway — foundations, lab, training, and technology in sequence.",
};

export default function Page() {
  return (
    <StudioPathwayOverviewPage />
  );
}
