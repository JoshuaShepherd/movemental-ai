import type { Metadata } from "next";
import { AudienceEditionView } from "@/v2/components/audience/audience-edition-view";

export const metadata: Metadata = {
  title: "AI Safety for Non-Profits | Movemental",
  description: "Protect donor trust and mission focus while navigating organizational AI adoption.",
  alternates: {
    canonical: "/agent/nonprofits",
  },
};

export default function V2NonprofitsPage() {
  return <AudienceEditionView audience="nonprofits" />;
}
