import type { Metadata } from "next";

import { FieldGuidePage as StudioFieldGuidePage } from "@/components/studio/pages/FieldGuidePage";

export const metadata: Metadata = {
  title: "Field guide",
  description: "The AI Stewardship Sequence in plain language.",
};

export default function Page() {
  return (
    <StudioFieldGuidePage />
  );
}
