import type { Metadata } from "next";

import { ClaudeSkillsTeachingGuide } from "@/components/dashboard/teaching/claude-skills-teaching-guide";

export const metadata: Metadata = {
  title: "Understanding Claude Skills · Teaching Library",
  description:
    "A pedagogical guide to Claude Skills for leaders of mission-driven organizations. Eight chapters, structured from intuition to action.",
};

export default function UnderstandingClaudeSkillsPage() {
  return <ClaudeSkillsTeachingGuide />;
}
