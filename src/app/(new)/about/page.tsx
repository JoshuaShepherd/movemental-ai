import type { Metadata } from "next";

import { AboutPage } from "@/components/mv/about/about-views";
import { MvFooter } from "@/components/mv/mv-footer";
import { MvHeader } from "@/components/mv/mv-header";

export const metadata: Metadata = {
  title: "About Movemental",
  description: "How Movemental began, who does what, and what we hold to as a company.",
  alternates: { canonical: "/about" },
};

export default function AboutNewPage() {
  return (
    <>
      <MvHeader />
      <AboutPage />
      <MvFooter />
    </>
  );
}
