import type { Metadata } from "next";
import Link from "next/link";

import { MvTaskHeader } from "@/components/mv/mv-task-header";
import { ResolveFlow } from "@/components/mv/resolve/resolve-flow";
import { MV_ROUTES } from "@/components/mv/routes";

export const metadata: Metadata = {
  title: "Write your Resolution",
  description: "Say what you believe your organization should do about AI. Fourteen questions every church, nonprofit and school needs to answer. About twelve minutes, no account.",
  alternates: { canonical: "/resolve" },
};

/**
 * Resolve: fourteen questions. Board: canvas "Resolve: Fourteen Questions", Main.
 * `?invited=sample` shows the board's invited state (fixture seam until invitations exist).
 */
export default async function ResolveNewPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  return (
    <>
      <MvTaskHeader>
        {/* Progress is kept on this device as the person goes, so leaving keeps it. */}
        <Link className="mv-muted" href={MV_ROUTES.home}>
          Save and leave
        </Link>
      </MvTaskHeader>
      <ResolveFlow invitedSample={sp.invited === "sample"} />
    </>
  );
}
