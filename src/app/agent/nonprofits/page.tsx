import type { Metadata } from "next";

import { AudienceEditionExperience } from "@/components/agent-room/audience/audience-edition/audience-edition-experience";
import { NONPROFITS_EDITION_CONFIG } from "@/components/agent-room/audience/audience-edition/nonprofits-edition-config";

export const metadata: Metadata = {
  title: "Nonprofits | Movemental",
  description:
    "AI is already inside your organization. Six truths already happening, the ordered path from Safety to Tech, and why formation comes before the tools.",
  alternates: {
    canonical: "/agent/nonprofits",
  },
};

export default function NonprofitsPage() {
  return <AudienceEditionExperience config={NONPROFITS_EDITION_CONFIG} />;
}
