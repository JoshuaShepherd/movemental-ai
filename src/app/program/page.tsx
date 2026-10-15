import type { Metadata } from "next";
import { ProgramPageContent } from "@/v2/components/program/program-page-content";

export const metadata: Metadata = {
  title: "Program & Pricing | Movemental",
  description: "Four stages in order. Every price public and flat across organizations.",
  alternates: {
    canonical: "/program",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function V2ProgramPage() {
  return <ProgramPageContent />;
}
