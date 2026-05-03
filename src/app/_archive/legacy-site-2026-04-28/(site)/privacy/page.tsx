import type { Metadata } from "next";

import { PrivacyPageContent } from "@/components/sections/legal-privacy/privacy-page-content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Movemental collects, uses, and protects information when you visit our website or get in touch about a project.",
};

export default function PrivacyPage() {
  return <PrivacyPageContent />;
}
