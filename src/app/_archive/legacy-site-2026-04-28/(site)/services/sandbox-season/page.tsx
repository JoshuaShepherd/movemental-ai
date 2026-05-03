import type { Metadata } from "next";

import { SandboxSeasonPageContent } from "@/components/sections/services-sandbox-season";

export const metadata: Metadata = {
  title: "Sandbox Season",
  description:
    "A twelve-week facilitated engagement for organizations ready to adopt AI without losing what they are for. A cohort, a portfolio, a board-ready governance stance.",
};

export default function SandboxSeasonPage() {
  return <SandboxSeasonPageContent />;
}
