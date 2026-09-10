import type { Metadata } from "next";

import { AudienceEditionExperience } from "@/components/agent-room/audience/audience-edition/audience-edition-experience";
import { CHURCHES_EDITION_CONFIG } from "@/components/agent-room/audience/audience-edition/churches-edition-config";

export const metadata: Metadata = {
  title: "Churches | Movemental",
  description:
    "AI is already inside your church. Six truths already happening, the ordered path from Safety to Tech, and why formation comes before the tools.",
  alternates: {
    canonical: "/agent/churches",
  },
};

export default function ChurchesPage() {
  return <AudienceEditionExperience config={CHURCHES_EDITION_CONFIG} />;
}
