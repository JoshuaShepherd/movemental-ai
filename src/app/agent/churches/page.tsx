import type { Metadata } from "next";
import { AudienceEditionView } from "@/v2/components/audience/audience-edition-view";

export const metadata: Metadata = {
  title: "AI Safety for Churches | Movemental",
  description: "Shepherd your church through the AI transition with theological integrity and pastoral trust.",
  alternates: {
    canonical: "/agent/churches",
  },
};

export default function V2ChurchesPage() {
  return <AudienceEditionView audience="churches" />;
}
