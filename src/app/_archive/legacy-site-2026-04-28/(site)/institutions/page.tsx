import type { Metadata } from "next";

import { InstitutionsPageContent } from "@/components/sections/institutions/institutions-page-content";

export const metadata: Metadata = {
  title: "For Institutions",
  description:
    "For institutions navigating coherence across entities, generations, and authority in an AI-disrupted world — stakes, fragmentation shape, Safety–Sandbox–Skills–Solutions, and what becomes possible when the institution is legible again.",
};

export default function InstitutionsPage() {
  return <InstitutionsPageContent />;
}
