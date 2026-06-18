import { readFileSync } from "node:fs";
import { join } from "node:path";

import type { Metadata } from "next";

import { AudiencePageExperience } from "@/components/agent-room/audience/audience-page-experience";
import { CHURCHES_PAGE_CONFIG_OLD } from "@/components/agent-room/audience/churches-config-old";

export const metadata: Metadata = {
  title: "Churches (archived) | Movemental",
  description:
    "Archived long-form churches page — AI is already inside your church. Letter, foundation, build explorer, and full deck.",
  robots: { index: false, follow: false },
  alternates: {
    canonical: "/agent/churches",
  },
};

export default function ChurchesOldPage() {
  const letterMarkdown = readFileSync(
    join(process.cwd(), "src/components/agent-room/audience/letters/church-letter.md"),
    "utf8",
  );

  return (
    <AudiencePageExperience config={CHURCHES_PAGE_CONFIG_OLD} letterMarkdown={letterMarkdown} />
  );
}
