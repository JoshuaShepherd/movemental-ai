import type { Metadata } from "next";

import { AboutPage as StudioAboutPage } from "@/components/studio/pages/AboutPage";

export const metadata: Metadata = {
  title: "About",
  description:
    "Movemental is a company built by missional practitioners for missional organizations. Meet the founders &mdash; Brad Brisco, Alan Hirsch, and Joshua Shepherd &mdash; and read the origin and commitments behind the path.",
};

export default function Page() {
  return (
    <StudioAboutPage />
  );
}
