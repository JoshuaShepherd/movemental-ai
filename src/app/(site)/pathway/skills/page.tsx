import type { Metadata } from "next";

import { SkillsPathwayPage } from "@/components/studio/pages/pathway/SkillsPathwayPage";

export const metadata: Metadata = {
  title: "Stage 03: Skills Development",
  description:
    "Eight weeks. Eight modules. The formational deepening that turns practitioners into discerners — Movemental Stage 03.",
};

export default function Page() {
  return <SkillsPathwayPage />;
}
