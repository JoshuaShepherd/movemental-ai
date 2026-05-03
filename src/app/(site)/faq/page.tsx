import type { Metadata } from "next";

import { FaqPage as StudioFaqPage } from "@/components/studio/pages/FaqPage";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Movemental.",
};

export default function Page() {
  return (
    <StudioFaqPage />
  );
}
