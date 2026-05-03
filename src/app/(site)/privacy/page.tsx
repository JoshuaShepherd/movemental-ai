import type { Metadata } from "next";

import { PrivacyPage as StudioPrivacyPage } from "@/components/studio/pages/PrivacyPage";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Movemental privacy policy.",
};

export default function Page() {
  return (
    <StudioPrivacyPage />
  );
}
