import type { Metadata } from "next";

import { TermsPageContent } from "@/components/sections/legal-terms/terms-page-content";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing use of the Movemental website and related services.",
};

export default function TermsPage() {
  return <TermsPageContent />;
}
