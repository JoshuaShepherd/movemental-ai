import type { Metadata } from "next";
import Link from "next/link";

import { MvTaskHeader } from "@/components/mv/mv-task-header";
import { TeamView } from "@/components/mv/resolve/team-view";
import { MV_ROUTES } from "@/components/mv/routes";

export const metadata: Metadata = {
  title: "Your organization’s view",
  alternates: { canonical: "/me/people/view" },
  robots: { index: false },
};

/** An organization's view once five people have written theirs. Board: Team, with its sample counts. */
export default function TeamViewPage() {
  return (
    <>
      <MvTaskHeader>
        <Link href={MV_ROUTES.resolvePeople}>Your people</Link>
      </MvTaskHeader>
      <TeamView />
    </>
  );
}
