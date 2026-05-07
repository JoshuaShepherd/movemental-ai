import type { Metadata } from "next";

import { SandboxPage } from "@/components/studio/pages/pathway/SandboxPage";

export const metadata: Metadata = {
  title: "Sandbox Discovery",
  description: "Stage 02 — facilitated sandbox discovery and use-case sprints.",
};

export default function Page() {
  return <SandboxPage />;
}
