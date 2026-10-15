import type { Metadata } from "next";

import { HowWeUseAiPage } from "@/components/mv/legacy/how-we-use-ai";
import { MvFooter } from "@/components/mv/mv-footer";
import { MvHeader } from "@/components/mv/mv-header";

export const metadata: Metadata = {
  title: "How We Use AI",
  description:
    "Where Movemental stands on AI: named refusals, the green/yellow/red framework, who stays in charge, and product choices we will not ship into the scenius network.",
  alternates: {
    canonical: "/how-we-use-ai",
  },
};

export default function HowWeUseAiRoute() {
  return (
    <>
      <MvHeader />
      <HowWeUseAiPage />
      <MvFooter />
    </>
  );
}
