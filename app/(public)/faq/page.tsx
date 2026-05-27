import { Metadata } from "next";
import { FaqSection } from "@/components/faq/FaqSection";

export const metadata: Metadata = {
  title: "FAQ | Movemental",
  description:
    "Frequently asked questions about Movemental: fit, philosophy, ownership, economics, time and embodiment, AI, infrastructure, credibility network, onboarding, and exit.",
  openGraph: {
    title: "FAQ | Movemental",
    description:
      "Comprehensive FAQ for movement leaders: fit, ownership, alignment, AI, and participation.",
    type: "website",
  },
};

export default function FaqPage() {
  return (
    <FaqSection
      showHeader={false}
      title="FAQ"
      groupedByCategory={true}
    />
  );
}
