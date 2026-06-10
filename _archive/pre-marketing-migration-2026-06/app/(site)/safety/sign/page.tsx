import type { Metadata } from "next";

import { SafetySignPage } from "@/components/safety/safety-sign-page";
import { canonicalPageUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Sign Your Safety Engagement",
  description:
    "Review the Safety engagement scope, sign electronically, and your Safety Dashboard goes live within one business day.",
  alternates: { canonical: canonicalPageUrl("/safety/sign") },
  openGraph: {
    url: canonicalPageUrl("/safety/sign"),
    title: "Sign Your Safety Engagement — Movemental",
  },
};

export default function Page() {
  return <SafetySignPage />;
}
