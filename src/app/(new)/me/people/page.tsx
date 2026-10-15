import type { Metadata } from "next";
import Link from "next/link";

import { MvTaskHeader } from "@/components/mv/mv-task-header";
import { YourPeople } from "@/components/mv/resolve/your-people";
import { MV_ROUTES } from "@/components/mv/routes";

export const metadata: Metadata = {
  title: "Your people",
  alternates: { canonical: "/me/people" },
};

/** Your people (flow document 5.4). Board: R4-People. */
export default function PeoplePage() {
  return (
    <>
      <MvTaskHeader>
        <Link href={MV_ROUTES.resolveDocument}>My Resolution</Link>
      </MvTaskHeader>
      <YourPeople />
    </>
  );
}
