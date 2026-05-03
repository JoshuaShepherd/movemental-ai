import type { Metadata } from "next";

import { MethodologyPageContent } from "@/components/sections/methodology";

export const metadata: Metadata = {
  title: "Methodology",
  description:
    "Orientation map for Movemental's public methodology: fragmentation thesis, sandbox canon, Sandbox Season offering, and pricing.",
};

export default function MethodologyPage() {
  return <MethodologyPageContent />;
}
