import type { Metadata } from "next";

import { ChurchesEditionExperience } from "@/components/agent-room/audience/churches-edition/churches-edition-experience";
import { CHURCHES_EDITION_CONFIG } from "@/components/agent-room/audience/churches-edition/churches-edition-config";

export const metadata: Metadata = {
  title: "Churches | Movemental",
  description:
    "AI is already inside your church. Six truths already happening, the ordered path from Safety to Tech, and why formation comes before the tools.",
  alternates: {
    canonical: "/agent/churches",
  },
};

export default function ChurchesPage() {
  return <ChurchesEditionExperience config={CHURCHES_EDITION_CONFIG} />;
}
