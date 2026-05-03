import type { Metadata } from "next";

import { SandboxExemplarPageContent } from "@/components/sections/services-sandbox-exemplar";

export const metadata: Metadata = {
  title: "Sandbox Season · Composite exemplar",
  description:
    "A fictional mid-sized alliance walks Weeks 1, 6, and 12 of a Sandbox Season — charter discipline, honest scoring, and a board-ready handoff without citing any real client.",
};

export default function SandboxExemplarPage() {
  return <SandboxExemplarPageContent />;
}
