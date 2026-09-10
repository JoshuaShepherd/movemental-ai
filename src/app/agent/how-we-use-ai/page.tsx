import type { Metadata } from "next";

import { HowWeUseAiView } from "@/v2/components/how-we-use-ai/how-we-use-ai-view";

export const metadata: Metadata = {
  title: "How We Use AI | Movemental",
  description:
    "Where Movemental stands on AI: named refusals, the green/yellow/red framework, who stays in charge, and product choices we will not ship into the scenius network.",
  alternates: {
    canonical: "/agent/how-we-use-ai",
  },
};

export default function V2HowWeUseAiPage() {
  return <HowWeUseAiView />;
}
