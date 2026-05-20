import Link from "next/link";

import { FragmentationIntroHeader } from "./fragmentation-intro-header";
import {
  parseAudienceParam,
  parseFieldParam,
  parseNodeCountParam,
} from "./fragmentation-story-content";
import {
  FragmentationStoryShell,
  type FragmentationStoryShellProps,
} from "./fragmentation-story-shell";

export type FragmentationStoryPageProps = {
  searchParams: Promise<{
    audience?: string;
    field?: string;
    nodes?: string;
  }>;
};

/** Same search-param contract as `/fragmentation` — shared by the intel-surface route. */
export type FragmentationIntelStoryPageProps = FragmentationStoryPageProps;

async function getFragmentationShellProps(
  searchParams: FragmentationStoryPageProps["searchParams"]
): Promise<FragmentationStoryShellProps> {
  const sp = await searchParams;
  return {
    initialAudience: parseAudienceParam(sp.audience),
    initialField: parseFieldParam(sp.field),
    initialNodeCount: parseNodeCountParam(sp.nodes),
  };
}

export async function FragmentationStoryPageContent({
  searchParams,
}: FragmentationStoryPageProps) {
  const shellProps = await getFragmentationShellProps(searchParams);

  return (
    <main className="min-w-0 overflow-x-clip">
      <FragmentationIntroHeader
        eyebrow="The problem, visually"
        secondary={
          <p className="text-sm leading-relaxed text-inverse-foreground/65">
            Use the dock to read this arc in the shape of your organization and lean into{" "}
            <strong className="font-semibold text-inverse-foreground">informational</strong> or{" "}
            <strong className="font-semibold text-inverse-foreground">relational</strong>{" "}
            emphasis. Example permalinks:{" "}
            <Link
              href="/fragmentation?audience=nonprofit&field=relational&nodes=40"
              className="font-medium text-pathway-accent underline-offset-4 hover:underline"
            >
              nonprofit · relational · density 40
            </Link>
            {" · "}
            <Link
              href="/fragmentation?audience=church&field=informational"
              className="font-medium text-pathway-accent underline-offset-4 hover:underline"
            >
              church · informational
            </Link>
            .
          </p>
        }
      />

      <FragmentationStoryShell {...shellProps} />
    </main>
  );
}

/**
 * Full fragmentation narrative with the same dock, scroll choreography, and Part II stages as
 * `/fragmentation`. Intro copy calls out that every figure is a registered React intel surface
 * (`@/components/intel-artifacts`), not raster story art.
 */
export async function FragmentationIntelStoryPageContent({
  searchParams,
}: FragmentationIntelStoryPageProps) {
  const shellProps = await getFragmentationShellProps(searchParams);

  return (
    <main className="min-w-0 overflow-x-clip">
      <FragmentationIntroHeader
        eyebrow="The problem, visually · Intel surfaces"
        secondary={
          <p className="text-sm leading-relaxed text-inverse-foreground/65">
            Every figure on this route — sticky stage, inline chapters, scatter field, and the
            Part II stages — is rendered from the registered React intel surfaces (semantic tokens,
            audience and field aware). No raster story art. For a flat QA grid of every slug, see{" "}
            <Link
              href="/system/intel-artifacts"
              className="font-medium text-pathway-accent underline-offset-4 hover:underline"
            >
              Intel artifacts (system)
            </Link>
            .
          </p>
        }
      />

      <FragmentationStoryShell {...shellProps} />
    </main>
  );
}
