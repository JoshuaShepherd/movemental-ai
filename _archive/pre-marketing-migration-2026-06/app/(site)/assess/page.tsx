import type { Metadata } from "next";

import { AssessPage as StudioAssessPage } from "@/components/studio/pages/AssessPage";

export const metadata: Metadata = {
  title: "Integrity Diagnostic",
  description: "Where is your organization actually starting? A short diagnostic for senior leaders.",
};

export default function Page() {
  return (
    <StudioAssessPage />
  );
}
