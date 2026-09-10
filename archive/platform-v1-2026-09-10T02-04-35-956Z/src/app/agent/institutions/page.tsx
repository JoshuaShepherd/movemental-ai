import { readFileSync } from "node:fs";
import { join } from "node:path";

import type { Metadata } from "next";

import { InstitutionsExperience } from "@/components/agent-room/institutions/institutions-experience";

export const metadata: Metadata = {
  title: "Institutions: Seminaries & Schools | Movemental",
  description:
    "AI is already inside your seminary. A you-first case for institutions: what's happening, the deeper problem, a letter for your board, and the ordered path: Safety, Sandbox, Training, Tech.",
  alternates: {
    canonical: "/agent/institutions",
  },
};

/**
 * `/agent/institutions` — long-form document surface for seminaries and
 * institutions. Left sticky sidebar, shared agent mast (Institutions highlighted
 * in the topbar), and the seminary-president letter read from disk.
 */
export default function InstitutionsPage() {
  const letterMarkdown = readFileSync(
    join(process.cwd(), "src/components/agent-room/institutions/seminary-letter.md"),
    "utf8",
  );

  return <InstitutionsExperience letterMarkdown={letterMarkdown} />;
}
