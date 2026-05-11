import type { ProgramFixtureBase } from "@/lib/program/types/stitch-screen-family";
import {
  extractHeroTimelineSections,
  hasFullHeroTimelineLayout,
  toSafeStartHeroTimelineFixture,
} from "@/lib/program/normalize-hero-timeline";

import { ProgramDocumentView } from "./program-document-view";
import { SafeStartHomeView } from "./safe-start/safe-start-home-view";

export function ProgramStitchTemplateView({
  fixture,
  sourceBadge,
}: {
  fixture: ProgramFixtureBase;
  sourceBadge?: string;
}) {
  if (fixture.screenFamily === "safestart-hero-timeline") {
    const heroSections = extractHeroTimelineSections(fixture);
    if (hasFullHeroTimelineLayout(heroSections)) {
      return <SafeStartHomeView data={toSafeStartHeroTimelineFixture(fixture)} sourceBadge={sourceBadge} />;
    }
  }

  return <ProgramDocumentView fixture={fixture} sourceBadge={sourceBadge} />;
}
