import type { Metadata } from "next";

import { EightPatternsPageContent } from "@/components/sections/methodology-eight-patterns";

export const metadata: Metadata = {
  title: "Eight patterns where value hides",
  description:
    "Movemental's eight-pattern scan for AI value in real organizational work — shape, example domains, value type, and typical trap for each pattern.",
};

export default function EightPatternsMethodologyPage() {
  return <EightPatternsPageContent />;
}
