import type { Metadata } from "next";

import { FaqPageContent } from "@/components/sections/faq/faq-page-content";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Straight answers on Movemental — two intelligences and integration, Safety–Sandbox–Skills–Solutions, how AI is grounded, Sandbox Season and movement-leader economics (see pricing), ownership, and how to start.",
};

export default function FaqPage() {
  return <FaqPageContent />;
}
