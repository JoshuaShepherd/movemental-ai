import type { Metadata } from "next";

import { TrainingPage as StudioTrainingPage } from "@/components/studio/pages/TrainingPage";

export const metadata: Metadata = {
  title: "Skills Development",
  description: "Mile Marker 03 — cohorts and self-paced fluency for your team.",
};

export default function Page() {
  return (
    <StudioTrainingPage />
  );
}
