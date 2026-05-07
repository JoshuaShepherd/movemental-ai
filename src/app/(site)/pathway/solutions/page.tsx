import type { Metadata } from "next";

import { TechnologyPage as StudioTechnologyPage } from "@/components/studio/pages/TechnologyPage";

export const metadata: Metadata = {
  title: "Solutions Deployment",
  description: "Stage 04 — custom agentic builds, integration, activation, and multiplication.",
};

export default function Page() {
  return <StudioTechnologyPage />;
}
