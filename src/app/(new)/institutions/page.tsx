import type { Metadata } from "next";

import { AudiencePage } from "@/components/mv/audience/audience-page";
import { AUDIENCES } from "@/components/mv/audience/audiences";
import { MvFooter } from "@/components/mv/mv-footer";
import { MvHeader } from "@/components/mv/mv-header";

export const metadata: Metadata = {
  title: "For institutions, seminaries and networks | Movemental",
  description: AUDIENCES.institutions.intro[0],
  alternates: { canonical: "/institutions" },
};

/** Board: Audience-Institutions. */
export default function Page() {
  return (
    <>
      <MvHeader />
      <AudiencePage audience="institutions" />
      <MvFooter />
    </>
  );
}
