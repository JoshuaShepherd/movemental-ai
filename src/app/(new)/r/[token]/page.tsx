import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MvTaskHeader } from "@/components/mv/mv-task-header";
import { SAMPLE_SHARED } from "@/components/mv/resolve/fixtures";
import { SharedResolution } from "@/components/mv/resolve/shared-resolution";
import { MV_ROUTES } from "@/components/mv/routes";
import { resolutionService } from "@/lib/services/resolutions/resolution.service";

export const metadata: Metadata = {
  title: "A shared Resolution",
};

/**
 * One shared Resolution. Board: R3-Shared.
 * Looks token up in live database; falls back to canonical sample if sample token is requested.
 */
export default async function SharedResolutionPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  // Check live database
  const result = await resolutionService.getByShareToken(token);
  if (result.ok && result.data) {
    return (
      <>
        <MvTaskHeader>
          <Link href={MV_ROUTES.resolve}>Write your own</Link>
        </MvTaskHeader>
        <SharedResolution data={result.data} />
      </>
    );
  }

  // Fallback to board's canonical sample token
  if (token === SAMPLE_SHARED.token) {
    return (
      <>
        <MvTaskHeader>
          <Link href={MV_ROUTES.resolve}>Write your own</Link>
        </MvTaskHeader>
        <SharedResolution />
      </>
    );
  }

  notFound();
}
