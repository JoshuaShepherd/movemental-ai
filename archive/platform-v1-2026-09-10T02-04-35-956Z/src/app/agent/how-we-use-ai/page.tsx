import type { Metadata } from "next";

import { HowWeUseAiExperience } from "@/components/agent-room/how-we-use-ai/how-we-use-ai-experience";

export const metadata: Metadata = {
  title: "How We Use AI | Movemental",
  description:
    "Where Movemental stands on AI: named refusals, the green/yellow/red framework, who stays in charge, and product choices we will not ship into the scenius network.",
  alternates: {
    canonical: "/agent/how-we-use-ai",
  },
};

/** `/agent/how-we-use-ai` — transparency on AI use, refusals, and product ethics. */
export default function HowWeUseAiPage() {
  return <HowWeUseAiExperience />;
}
