import type { Metadata } from "next";

import { AudiencePage } from "@/components/mv/audience/audience-page";
import { AUDIENCES } from "@/components/mv/audience/audiences";
import { MvFooter } from "@/components/mv/mv-footer";
import { MvHeader } from "@/components/mv/mv-header";

export const metadata: Metadata = {
  title: "For churches and ministries",
  description: AUDIENCES.churches.intro[0],
  alternates: { canonical: "/churches" },
};

/** Board: Audience-Churches. */
export default function Page() {
  return (
    <>
      <MvHeader />
      <AudiencePage audience="churches" />
      <MvFooter />
    </>
  );
}
