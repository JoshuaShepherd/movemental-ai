// Stitch: docs/build/stitch/stitch_movemental_editorial_homepage_non_profit/code.html
// Editorial nonprofit landing — hero, four linked system-build cards, midnight quote,
// current reality, before/after, interconnect copy, concrete outputs, midnight CTA.

import type { Metadata } from "next";

import { NonprofitsPageContent } from "@/components/sections/nonprofits/nonprofits-page-content";

export const metadata: Metadata = {
  title: "For Nonprofits",
  description:
    "For nonprofits navigating AI with mission, money, and memory at stake — integration is no longer optional. What is at risk, why tools alone fail, the Safety–Sandbox–Skills–Solutions path, and what becomes possible with a shared foundation.",
};

export default function NonprofitsPage() {
  return <NonprofitsPageContent />;
}
