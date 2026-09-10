import type { Metadata } from "next";
import { RealityMapFlow } from "@/v2/components/assess/reality-map-flow";

export const metadata: Metadata = {
  title: "Reality Map | Movemental",
  description:
    "Find out where your organization actually stands with AI. Six honest questions, no score, no sales pitch.",
  alternates: {
    canonical: "/assess",
  },
};

export default function V2AssessPage() {
  return <RealityMapFlow />;
}
