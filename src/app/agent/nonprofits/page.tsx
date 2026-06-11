import { readFileSync } from "node:fs";
import { join } from "node:path";

import type { Metadata } from "next";

import { AudiencePageExperience } from "@/components/agent-room/audience/audience-page-experience";
import { NONPROFITS_PAGE_CONFIG } from "@/components/agent-room/audience/nonprofits-config";

export const metadata: Metadata = {
  title: "Nonprofits — Movemental",
  description:
    "AI is already inside your nonprofit. A you-first case for executive directors and boards: governance gaps, mission integrity, a letter for your board, and the ordered path — Safety, Sandbox, Training, Tech.",
  alternates: {
    canonical: "/agent/nonprofits",
  },
};

export default function NonprofitsPage() {
  const letterMarkdown = readFileSync(
    join(process.cwd(), "src/components/agent-room/audience/letters/nonprofit-letter.md"),
    "utf8",
  );

  return (
    <AudiencePageExperience config={NONPROFITS_PAGE_CONFIG} letterMarkdown={letterMarkdown} />
  );
}
