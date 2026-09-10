import type { Metadata } from "next";
import { SafetyStageContent } from "@/v2/components/safety/safety-stage-content";

export const metadata: Metadata = {
  title: "Safety Stage | Movemental",
  description:
    "AI Safety is about human trust. Write and ratify your AI Safety Charter across five plain layers.",
  alternates: {
    canonical: "/agent/path/safety",
  },
};

export default function SafetyStagePage() {
  return <SafetyStageContent />;
}
