import type { Metadata } from "next";
import { AudienceEditionView } from "@/v2/components/audience/audience-edition-view";

export const metadata: Metadata = {
  title: "AI Safety for Institutions | Movemental",
  description: "Institutional discernment, formation integrity, and policy frameworks for seminaries and denominations.",
  alternates: {
    canonical: "/agent/institutions",
  },
};

export default function V2InstitutionsPage() {
  return <AudienceEditionView audience="institutions" />;
}
