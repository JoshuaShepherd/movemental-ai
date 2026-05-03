import type { Metadata } from "next";

import { WorkWithUsContent } from "@/components/sections-mock/work-with-us/work-with-us-content";

export const metadata: Metadata = {
  title: "Work With Movemental",
  description:
    "How an organization actually begins working with Movemental. The engagement model, the first step, the options, and the outcomes — for leaders ready to lead AI with clarity.",
};

export default function WorkWithUsPage() {
  return <WorkWithUsContent />;
}
