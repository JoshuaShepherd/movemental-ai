import type { Metadata } from "next";

import { StartWithSafetyContent } from "@/components/sections-mock/start-with-safety/start-with-safety-content";

export const metadata: Metadata = {
  title: "Start with Safety",
  description:
    "Safety is the foundation that makes responsible AI adoption possible. The first step of the Movemental Path: clear boundaries, shared language, and leadership alignment before adoption accelerates.",
};

export default function StartWithSafetyPage() {
  return <StartWithSafetyContent />;
}
