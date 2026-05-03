import type { Metadata } from "next";

import { PathContent } from "@/components/sections-mock/path/path-content";

export const metadata: Metadata = {
  title: "The Movemental AI Path",
  description:
    "Safety, Sandbox, Skills, Solutions. Four stages, in order. A clear path for leading your organization through AI — what each step is, why it comes when it does, and what happens when the order is broken.",
};

export default function PathPage() {
  return <PathContent />;
}
