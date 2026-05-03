import type { Metadata } from "next";

import { AboutPage as StudioAboutPage } from "@/components/studio/pages/AboutPage";

export const metadata: Metadata = {
  title: "About",
  description: "Who we are and why Movemental exists.",
};

export default function Page() {
  return (
    <StudioAboutPage />
  );
}
