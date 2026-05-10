import type { Metadata } from "next";

import { SandboxPage } from "@/components/studio/pages/pathway/SandboxPage";
import { canonicalPageUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Movemental | Sandbox — Stage 02 of the Movemental Path",
  description:
    "Stage 02 — safe exploration of AI inside your organization. Around ten hours of in-person training, plus a curated portfolio of tested use cases for churches, nonprofits, and institutions. $15,000.",
  alternates: { canonical: canonicalPageUrl("/pathway/sandbox") },
  openGraph: {
    title: "Movemental | Sandbox — Stage 02 of the Movemental Path",
    description:
      "Stage 02 — safe exploration of AI inside your organization. Around ten hours of in-person training, plus a curated portfolio of tested use cases for churches, nonprofits, and institutions. $15,000.",
    url: canonicalPageUrl("/pathway/sandbox"),
  },
};

export default function Page() {
  return <SandboxPage />;
}
