import type { Metadata } from "next";

import { HomePage as StudioHomePage } from "@/components/studio/pages/HomePage";

export const metadata: Metadata = {
  title: "A wiser way to navigate AI",
  description: "Movemental walks church and nonprofit leaders through the AI Stewardship Sequence: Safety, Sandbox, Skills, Solutions, in order.",
};

export default function Page() {
  return (
    <StudioHomePage />
  );
}
