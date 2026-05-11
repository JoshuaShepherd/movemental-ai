import type { Metadata } from "next";

import { StartWithSafetyContent } from "@/components/sections-mock/start-with-safety/start-with-safety-content";

export const metadata: Metadata = {
  title: "Safety Self-Assessment",
  description:
    "Seven questions, ten minutes, a read-back written to your situation. The narrower Safety-readiness check from Movemental — tells you whether Volume One is enough or whether SafeStart facilitation would accelerate the work.",
};

export default function StartWithSafetyPage() {
  return <StartWithSafetyContent />;
}
