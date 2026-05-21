import type { Metadata } from "next";

import { HomeContent } from "@/components/sections-mock/home/home-content";

export const metadata: Metadata = {
  title: "A wiser way to navigate AI (archived)",
  description: "Movemental walks church and nonprofit leaders through the Movemental Path: Safety, Sandbox, Skills, Solutions, in order.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <HomeContent />
  );
}
