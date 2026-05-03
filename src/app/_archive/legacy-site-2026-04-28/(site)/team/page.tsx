import type { Metadata } from "next";

import { TeamPageContent } from "@/components/sections/team/team-page-content";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the Movemental team—formation-grounded leadership building inspectable digital infrastructure for movement leaders.",
};

export default function TeamPage() {
  return <TeamPageContent />;
}
