import { readFileSync } from "node:fs";
import { join } from "node:path";

import type { Metadata } from "next";

import { AudiencePageExperience } from "@/components/agent-room/audience/audience-page-experience";
import { CHURCHES_PAGE_CONFIG } from "@/components/agent-room/audience/churches-config";

export const metadata: Metadata = {
  title: "Churches — Movemental",
  description:
    "AI is already inside your church. A you-first case for pastors and elders: what's happening, the deeper problem, a letter for your leadership team, and the ordered path — Safety, Sandbox, Training, Tech.",
  alternates: {
    canonical: "/agent/churches",
  },
};

export default function ChurchesPage() {
  const letterMarkdown = readFileSync(
    join(process.cwd(), "src/components/agent-room/audience/letters/church-letter.md"),
    "utf8",
  );

  return <AudiencePageExperience config={CHURCHES_PAGE_CONFIG} letterMarkdown={letterMarkdown} />;
}
