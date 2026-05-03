import type { Metadata } from "next";

import { ContactPage as StudioContactPage } from "@/components/studio/pages/ContactPage";

export const metadata: Metadata = {
  title: "Talk With Us",
  description: "Let's talk about where your organization actually is — start the conversation.",
};

export default function Page() {
  return (
    <StudioContactPage />
  );
}
