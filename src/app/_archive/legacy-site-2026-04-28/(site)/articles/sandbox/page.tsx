import type { Metadata } from "next";

import { ArticlesSandboxHubPageContent } from "@/components/sections/articles-sandbox-hub";

export const metadata: Metadata = {
  title: "Sandbox canon",
  description:
    "The nine-article sandbox curriculum in reading order — pattern recognition, experiments, scoring, ethics, and portfolio assembly — with links to the Sandbox Season offering.",
};

export default function SandboxCanonHubPage() {
  return <ArticlesSandboxHubPageContent />;
}
