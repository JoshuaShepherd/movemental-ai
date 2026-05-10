import type { Metadata } from "next";

import { TechnologyPage as StudioTechnologyPage } from "@/components/studio/pages/TechnologyPage";

export const metadata: Metadata = {
  title: "Solutions",
  description: "Stage 04 — custom agentic CMS/LMS builds and deployment.",
};

export default function Page() {
  return <StudioTechnologyPage />;
}
