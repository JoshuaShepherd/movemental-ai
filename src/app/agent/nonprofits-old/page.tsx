import { readFileSync } from "node:fs";
import { join } from "node:path";

import type { Metadata } from "next";

import { AudiencePageExperience } from "@/components/agent-room/audience/audience-page-experience";
import { NONPROFITS_PAGE_CONFIG_OLD } from "@/components/agent-room/audience/nonprofits-config-old";

export const metadata: Metadata = {
  title: "Nonprofits (archived) | Movemental",
  description:
    "Archived long-form nonprofits page — AI is already inside your organization. Letter, foundation, build explorer, and full deck.",
  robots: { index: false, follow: false },
  alternates: {
    canonical: "/agent/nonprofits",
  },
};

export default function NonprofitsOldPage() {
  const letterMarkdown = readFileSync(
    join(process.cwd(), "src/components/agent-room/audience/letters/nonprofit-letter.md"),
    "utf8",
  );

  return (
    <AudiencePageExperience config={NONPROFITS_PAGE_CONFIG_OLD} letterMarkdown={letterMarkdown} />
  );
}
