import type { Metadata } from "next";
import { EnrollForm } from "@/v2/components/enroll/enroll-form";

export const metadata: Metadata = {
  title: "Enroll in Safety Sprint | Movemental",
  description: "Start your two-week AI Safety sprint. Five plain layers ratified for your board.",
  alternates: {
    canonical: "/enroll",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function V2EnrollPage() {
  return <EnrollForm />;
}
