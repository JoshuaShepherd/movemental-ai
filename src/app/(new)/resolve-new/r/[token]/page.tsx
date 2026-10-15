import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MvTaskHeader } from "@/components/mv/mv-task-header";
import { SAMPLE_SHARED } from "@/components/mv/resolve/fixtures";
import { SharedResolution } from "@/components/mv/resolve/shared-resolution";
import { MV_ROUTES } from "@/components/mv/routes";

export const metadata: Metadata = {
  title: "A shared Resolution | Movemental",
};

/**
 * One shared Resolution. Board: R3-Shared.
 * TODO(back-end merge): look the token up; only the board's sample token resolves today.
 */
export default async function SharedResolutionPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  if (token !== SAMPLE_SHARED.token) notFound();
  return (
    <>
      <MvTaskHeader>
        <Link href={MV_ROUTES.resolve}>Write your own</Link>
      </MvTaskHeader>
      <SharedResolution />
    </>
  );
}
