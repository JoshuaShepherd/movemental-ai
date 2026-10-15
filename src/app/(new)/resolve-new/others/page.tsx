import type { Metadata } from "next";
import Link from "next/link";

import { MvTaskHeader } from "@/components/mv/mv-task-header";
import { OthersResolved } from "@/components/mv/resolve/others";
import { MV_ROUTES } from "@/components/mv/routes";

export const metadata: Metadata = {
  title: "How others have resolved | Movemental",
  alternates: { canonical: "/resolve-new/others" },
};

/** How others resolved (flow document 5.6). Board: R3-Others. */
export default function OthersPage() {
  return (
    <>
      <MvTaskHeader>
        <Link href={MV_ROUTES.resolveDocument}>Back to my Resolution</Link>
      </MvTaskHeader>
      <OthersResolved />
    </>
  );
}
