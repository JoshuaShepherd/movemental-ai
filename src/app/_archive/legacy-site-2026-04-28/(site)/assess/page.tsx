import type { Metadata } from "next";

import { AssessPageContent } from "@/components/sections/assess/assess-page-content";

export const metadata: Metadata = {
  title: "AI Stewardship Sequence — integrity diagnostic",
  description:
    "The AI Stewardship Sequence: Safety, Sandbox, Skills, Solutions — one operational diagnostic with stage integrity, illusion flags, and a ninety-day focus. Same item bank as the operational backbone article.",
};

export default function AssessPage() {
  return <AssessPageContent />;
}
