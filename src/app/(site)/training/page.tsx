import type { Metadata } from "next";

import { TrainingPage as StudioTrainingPage } from "@/components/studio/pages/TrainingPage";

export const metadata: Metadata = {
  title: "AI Training for Mission-Driven Organizations",
  description:
    "Most AI training transfers techniques. Movemental forms judgment. Both matter; the difference matters more — particularly for churches, nonprofits, and institutions.",
};

export default function Page() {
  return <StudioTrainingPage />;
}
