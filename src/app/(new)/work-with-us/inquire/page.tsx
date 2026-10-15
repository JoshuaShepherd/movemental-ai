import type { Metadata } from "next";
import Link from "next/link";

import { MvTaskHeader } from "@/components/mv/mv-task-header";
import { MV_ROUTES } from "@/components/mv/routes";
import { InquiryForm } from "@/components/mv/work/inquiry-form";

export const metadata: Metadata = {
  title: "Discuss your organization’s response | Movemental",
  alternates: { canonical: "/work-with-us/inquire" },
};

/** The inquiry form. Board: Work-Inquire (Oct 15, 2026). */
export default function InquirePage() {
  return (
    <>
      <MvTaskHeader>
        <Link className="mv-muted" href={MV_ROUTES.work}>
          Work with Movemental
        </Link>
      </MvTaskHeader>
      <InquiryForm />
    </>
  );
}
