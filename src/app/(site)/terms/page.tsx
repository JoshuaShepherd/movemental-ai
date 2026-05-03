import type { Metadata } from "next";

import { TermsPage as StudioTermsPage } from "@/components/studio/pages/TermsPage";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of service.",
};

export default function Page() {
  return (
    <StudioTermsPage />
  );
}
