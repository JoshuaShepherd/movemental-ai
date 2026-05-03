import type { Metadata } from "next";

import { EvidencePage as StudioEvidencePage } from "@/components/studio/pages/EvidencePage";

export const metadata: Metadata = {
  title: "Evidence",
  description: "Proof of practice, framework, and outcomes.",
};

export default function Page() {
  return (
    <StudioEvidencePage />
  );
}
